import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <Link to="/">Online Store</Link>
                </h1>
                <nav className="flex gap-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/cart" className="hover:underline">Cart</Link>
                    <Link to="/register" className="hover:underline">Register</Link>
                    <Link to="/profile" className="hover:underline">Profile</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
