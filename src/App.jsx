import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PasswordReset from './PasswordReset';
import Wishlist from "./pages/WishList";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout_page";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen flex flex-col bg-gray-100">
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/product/:id" element={<Product/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/wishlist" element={<Wishlist/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/reset-password" element={<PasswordReset/>}/>
                        <Route path="/checkout" element={<Checkout/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
