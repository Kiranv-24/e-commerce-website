import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import TextField from '@mui/material/TextField';
import '../../Css-files/Checkout.css';

const countries = [
  "United States", "Canada", "Mexico", "United Kingdom", 
  "Germany", "France", "India", "China", "Japan", "Brazil"
];

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const initialCartItems = state?.cartItems || [];
  const initialQuantities = state?.quantities || [];

  const [formFields, setFormFields] = useState({
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

  useEffect(() => {
      const fetchUserData = async () => {
          try {
              const response = await fetch('/api/user/details');
              const data = await response.json();
              if (data) {
                  setFormFields(data);
              }
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
      };
      fetchUserData();
  }, []);

  const onChangeInput = (e) => {
      const { name, value } = e.target;
      setFormFields(prevFields => ({
          ...prevFields,
          [name]: value
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
      return inputLength === 0 ? [] : countries.filter(
          country => country.toLowerCase().startsWith(inputValue)
      );
  };

  const onChangeCountry = (event, { newValue }) => {
      setFormFields(prevFields => ({
          ...prevFields,
          country: newValue
      }));
  };

  const total = cartItems.reduce((sum, item, index) => 
      sum + (quantities[index] > 0 ? quantities[index] * item.price : 0),
      0
  );

  const handleUpdateUserDetails = async () => {
      try {
          const response = await fetch('/api/user/update', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formFields),
          });
          const result = await response.json();
          if (result.success) {
              alert('User details updated successfully!');
          }
      } catch (error) {
          console.error('Error updating user details:', error);
      }
  };

  const handleConfirmPayment = async () => {
      // Integrate your payment processing logic here (e.g., Razorpay)
      try {
          // Example payment logic here
          navigate("/OrderSummary");
          console.log("Shipping Information:", formFields);
          console.log("Cart Items:", cartItems);
      } catch (error) {
          console.error("Payment error:", error);
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

  return (
      <div className="checkout-container">
          <h2>Checkout</h2>
          <div className="checkout-content">
              <div className="form-section">
                  <h3>Shipping Information</h3>
                  <div className="input-group">
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
                          getSuggestionValue={suggestion => suggestion}
                          renderSuggestion={suggestion => <div>{suggestion}</div>}
                          inputProps={{
                              placeholder: "Country",
                              value: formFields.country,
                              onChange: onChangeCountry
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
                  <button className="update-button" onClick={handleUpdateUserDetails}>
                      Update Details
                  </button>
              </div>

              <div className="order-details">
                  <h3>Order details</h3>
                  <div className="order-summary">
                      <div className="order-item">
                          <p><strong>Item</strong></p>
                          <p><strong>Price</strong></p>
                      </div>
                      {cartItems.map((item, index) => (
                          <div className="order-item" key={item._id}>
                              <p>{item.name}</p>
                              <p>
                                  <input
                                      type="number"
                                      min="0"
                                      value={quantities[index]}
                                      onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                                      className="quantity-input"
                                  />
                                  <button className="remove-button" onClick={() => handleRemoveItem(index)}>Remove</button>
                              </p>
                              <p>₹{item.price * quantities[index]}</p>
                          </div>
                      ))}
                      <hr />
                      <div className="order-summary-total">
                          <p><strong>Subtotal:</strong> ₹{total}</p>
                          <p><strong>Shipping:</strong> ₹10</p>
                          <p><strong>Total:</strong> ₹{total + 10}</p>
                      </div>
                  </div>
                  <button className="confirm-button" onClick={handleConfirmPayment}>Confirm payment</button>
              </div>
          </div>
      </div>
  );
};

export default Checkout;
