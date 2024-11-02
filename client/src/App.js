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
import Mycontext from "./Mycontext/index.js"; 
import Signup from "./Pages/Signup/index.js";
import Checkout from "./Pages/Checkout/index.js";
import OrderSummary from "./Pages/OrderSummary/index.js";
import SuccessfulPayment from "./Pages/SuccessfulPayment/index.js";
import OrderHistory from "./Pages/OrderHistory";
import ForgetPassword from "./Pages/ForgetPassword";
import ChangePassword from "./Pages/ChangePassword";
import Chatbot from "../src/Components/Chatbot";
import Account from "./Pages/Account/index.js";
import AIassistance from "../src/Components/Aiassistance";
import { Toaster } from "react-hot-toast";
import NotFound from "./Pages/NotFount";
// import '../'

function App() {
  const [issetHeaderFooter, setisHeaderFooter] = useState(true);
  const [username, setUsername] = useState(null);
   const [productquery, setProductQuery] = useState("");
 const [cartCount, setCartCount] = useState(0);
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
    productquery,
    setProductQuery,
    cartCount,
    setCartCount

  };

  return (
    <BrowserRouter>
 
        <Chatbot/>
         <Toaster
        position="top-center"
        toastOptions={{
          style: {
            zIndex: 99999,
            top: "20%",
          },
        }}
      />
      <Mycontext.Provider value={values}>
        {issetHeaderFooter && <Header />}
        <Routes>
           <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/Cart" element={<Cart username={username} />} />
                <Route path="/Login" element={<Login setUsername={setUsername} />} />
                <Route path="/Signup" element={<Signup setUsername={setUsername} />} />
                <Route path="/Checkout" element={<Checkout />} />
                <Route path="/OrderSummary" element={<OrderSummary/>} />
                <Route path="/payment/complete" element={<SuccessfulPayment />} />
                <Route path="/OrderHistory" element={<OrderHistory username={username} />} />
                <Route path="/ForgetPassword" element={<ForgetPassword setUsername={setUsername} />} />
                <Route path="/ChangePassword" element={<ChangePassword username={username} />} />
                <Route path="/Account" element={<Account />} />
                <Route path="*" element={<NotFound />} />
        </Routes>
        {issetHeaderFooter && <Footer />}
      </Mycontext.Provider>
    </BrowserRouter>
  );
}

export default App;
