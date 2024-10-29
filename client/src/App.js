import "bootstrap/dist/css/bootstrap.min.css";
import "./Css-files/Header.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Headers";
import Home from "./Pages/Home";
import ProductDetail from "./Pages/ProductDetails/index.js";
import Footer from "./Pages/Home/Footer";
import Cart from "./Pages/Cart/index.js";
import Login from "./Pages/Login/index.js";
import { useState } from "react";
import Mycontext from "./Mycontext/index.js"; // Corrected import
import Signup from "./Pages/Signup/index.js";
import Checkout from "./Pages/Checkout/index.js";
import OrderSummary from "./Pages/OrderSummary/index.js";
import SuccessfulPayment from "./Pages/SuccessfulPayment/index.js";
import OrderHistory from "./Pages/OrderHistory";
import ForgetPassword from "./Pages/ForgetPassword";
import ChangePassword from "./Pages/ChangePassword";
function App() {
  const [issetHeaderFooter, setisHeaderFooter] = useState(true);
  const [alertBox, setAlertBox] = useState({
    open: false,
    error: false,
    msg: "",
    severity: "success",
  });
  const values = {
    issetHeaderFooter,
    setisHeaderFooter,
    setAlertBox,
    alertBox,
  };

  return (
    <BrowserRouter>
    
      <Mycontext.Provider value={values}>
        {issetHeaderFooter && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/Cart/:username" element={<Cart />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/OrderSummary" element={<OrderSummary />} />
         <Route path="/payment/complete" element={<SuccessfulPayment />} />
         <Route path="OrderHistory/:username" element={<OrderHistory />} />
         <Route path="ForgetPassword" element={<ForgetPassword />} />
         <Route path="ChangePassword/:username" element={<ChangePassword />} />

        </Routes>
        {issetHeaderFooter && <Footer />}
      </Mycontext.Provider>
    </BrowserRouter>
  );
}

export default App;
