import 'bootstrap/dist/css/bootstrap.min.css';
import "./Css-files/Header.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Headers";
import Home from "./Pages/Home";
import ProductDetail from './Pages/ProductDetails/index.js';
import Footer from './Pages/Home/Footer';
import Cart from './Pages/Cart/index.js';
import Login from './Pages/Login/index.js';
import { useState } from 'react';
import Mycontext from './Mycontext/index.js';  // Corrected import
import Signup from './Pages/Signup/index.js';
function App() {
    const [issetHeaderFooter, setisHeaderFooter] = useState(true);
    const values = {
        issetHeaderFooter,
        setisHeaderFooter
    };

    return (
        <BrowserRouter>
            <Mycontext.Provider value={values}>
                { issetHeaderFooter && <Header /> }
                <Routes> 
                    <Route path='/' element={<Home />} /> 
                    <Route path='/cat/:id' element={<ProductDetail />} /> 
                    <Route path='/Cart' element={<Cart />} /> 
                    <Route path='/Login' element={<Login />} /> 
                    <Route path='/Signup' element={<Signup />} /> 
                </Routes>
                {issetHeaderFooter&&<Footer />}
            </Mycontext.Provider>
        </BrowserRouter>
    );
}

export default App;
