import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import TextField from "@mui/material/TextField";
import "../../Css-files/Checkout.css";
import { fetchDataFromApi, postData, editData } from "../../api";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress, Button } from "@mui/material";
import { Toaster, toast } from "react-hot-toast";
const username = localStorage.getItem("username");

const countries = [
  "United States",
  "Canada",
  "Mexico",
  "United Kingdom",
  "Germany",
  "France",
  "India",
  "China",
  "Japan",
  "Brazil",
];

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const initialCartItems = state?.cartItems || [];
  const initialQuantities = state?.quantities || [];

  const [formFields, setFormFields] = useState({
    username: "",
    fullname: "",
    lastname: "",
    phone: "",
    address: "",
    country: "",
    state: "",
    city: "",
    email: "",
  });

  const [quantities, setQuantities] = useState(initialQuantities);
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [suggestions, setSuggestions] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [data, setData] = useState({});
  console.log(initialCartItems);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (username) {
          setFormFields((prevFields) => ({
            ...prevFields,
            username: username,
          }));

          const res = await fetchDataFromApi(`/api/checkout/${username}`);
          if (res && res.order && res.order.orderDetails) {
            setHasData(true);
            setData(res.order);
            setFormFields((prevFields) => ({
              ...prevFields,
              ...res.order.orderDetails,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : countries.filter((country) =>
          country.toLowerCase().startsWith(inputValue)
        );
  };

  const onChangeCountry = (event, { newValue }) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      country: newValue,
    }));
  };

  const total = cartItems.reduce(
    (sum, item, index) =>
      sum + (quantities[index] > 0 ? quantities[index] * item.price : 0),
    0
  );

  const handleUpdateUserDetails = async () => {
    if (!validateForm()) return;

    try {
      const shippingDetails = createShippingDetails();

      if (!validateShippingDetails(shippingDetails)) return;

      const orderDetails = {
        fullname: formFields.fullname,
        lastname: formFields.lastname,
        phone: formFields.phone,
        address: formFields.address,
        country: formFields.country,
        state: formFields.state,
        city: formFields.city,
        email: formFields.email,
      };

      const response = await editData(`/api/checkout/${username}`, {
        username: username,
        orderDetails,
        shippingDetails,
      });

      if (response.success) {
        toast.success("Updated successfully");
      } else {
        toast.error("Failed to update " + response.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating. Please try again.");
    }
  };

  const handleConfirmPayment = async () => {
    if (!validateForm()) return;

    try {
      const shippingDetails = createShippingDetails();

      if (!validateShippingDetails(shippingDetails)) return;

      const orderDetails = {
        fullname: formFields.fullname,
        lastname: formFields.lastname,
        phone: formFields.phone,
        address: formFields.address,
        country: formFields.country,
        state: formFields.state,
        city: formFields.city,
        email: formFields.email,
      };

      const response = await postData("/api/checkout/create", {
        username: username,
        orderDetails,
        shippingDetails,
      });

      if (response.success) {
        toast.success("Order placed successfully!");
        navigate("/OrderSummary");
      } else {
        toast.error("Failed to place the order: " + response.message);
      }
    } catch (error) {
      toast.error(
        "An error occurred while placing the order. Please try again."
      );
    }
  };

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value >= 0 ? value : 0;
    setQuantities(newQuantities);
  };

  const handleRemoveItem = (index) => {
    const newCartItems = [...cartItems];
    const newQuantities = [...quantities];
    newCartItems.splice(index, 1);
    newQuantities.splice(index, 1);
    setCartItems(newCartItems);
    setQuantities(newQuantities);
  };

  const validateForm = () => {
    const requiredFields = [
      "fullname",
      "lastname",
      "phone",
      "address",
      "country",
      "state",
      "city",
      "email",
    ];
    for (let field of requiredFields) {
      if (!formFields[field]) {
        toast.error(`Please fill in the ${field} field.`);
        return false;
      }
    }
    return true;
  };

  const validateShippingDetails = (shippingDetails) => {
    if (!Array.isArray(shippingDetails) || shippingDetails.length === 0) {
      toast.error("Please add at least one item to the shipping details.");
      return false;
    }
    return true;
  };

  const createShippingDetails = () =>
    cartItems.map((item, index) => {
      const quantity = quantities[index] || 0;
      const subtotal = item.price * quantity;
      const shipping = item.shipping || 10;

      return {
        id: item._id,
        name: item.name,
        price: item.price,
        quantity,
        subtotal,
        total: subtotal + shipping,
        shipping,
      };
    });
  const goBack = () => {
    navigate("/cart");
  };
  return (
    <div className="checkout-container">
      <Button className="back-button" onClick={goBack}>
        Go Back
      </Button>
      <h2>Checkout</h2>
      <div className="checkout-content">
        <div className="form-section">
          <h3>Shipping Information</h3>
          <div className="input-group">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              name="username"
              value={formFields.username}
              onChange={onChangeInput}
            />
            <TextField
              label="First name"
              variant="outlined"
              fullWidth
              name="fullname"
              value={formFields.fullname}
              onChange={onChangeInput}
            />
            <TextField
              label="Last name"
              variant="outlined"
              fullWidth
              name="lastname"
              value={formFields.lastname}
              onChange={onChangeInput}
            />
          </div>
          <TextField
            label="Phone number"
            variant="outlined"
            fullWidth
            margin="normal"
            name="phone"
            value={formFields.phone}
            onChange={onChangeInput}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            name="address"
            value={formFields.address}
            onChange={onChangeInput}
          />
          <div className="input-group">
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={(suggestion) => suggestion}
              renderSuggestion={(suggestion) => <div>{suggestion}</div>}
              inputProps={{
                placeholder: "Country",
                value: formFields.country,
                onChange: onChangeCountry,
              }}
            />
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              name="city"
              value={formFields.city}
              onChange={onChangeInput}
            />
          </div>
          <TextField
            label="State"
            variant="outlined"
            fullWidth
            margin="normal"
            name="state"
            value={formFields.state}
            onChange={onChangeInput}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formFields.email}
            onChange={onChangeInput}
          />
          {hasData && (
            <button className="update-button" onClick={handleUpdateUserDetails}>
              Update Details
            </button>
          )}
        </div>

        <div className="order-details-1">
          <h3>Order details</h3>
          <div className="order-summary">
            <div className="order-item">
              <p>
                <strong>Item</strong>
              </p>
              <p>
                <strong>Price</strong>
              </p>
            </div>
            {cartItems.map((item, index) => (
              <div className="order-item" key={item._id}>
                <p>{item.name}</p>
                <p className="qr-button">
                  <input
                    type="number"
                    min="0"
                    value={quantities[index]}
                    onChange={(e) =>
                      handleQuantityChange(index, Number(e.target.value))
                    }
                    className="quantity-input"
                  />
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <DeleteIcon />
                  </button>
                </p>
                <p>₹{item.price * quantities[index]}</p>
              </div>
            ))}
            <hr />
            <div className="order-summary-total">
              <p>
                <strong>Subtotal:</strong> ₹{total}
              </p>
              <p>
                <strong>Shipping:</strong> ₹10
              </p>
              <p>
                <strong>Total:</strong> ₹{total + 10}
              </p>
            </div>
          </div>
          <button className="confirm-button" onClick={handleConfirmPayment}>
            Confirm payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
