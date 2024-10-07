import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Headers";
import Home from "./Pages/Home";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes> 
                <Route path='/' element={<Home />} /> 
            </Routes>
        </BrowserRouter>
    );
}

export default App;
