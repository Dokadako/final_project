import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartCount = 0; // Replace with dynamic state or props if needed

    const categories = ["Electronics", "Clothing", "Home & Kitchen", "Books", "Toys"];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="bg-black text-white fixed top-0 left-0 w-full shadow-md p-4 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left: Categories Menu */}
                <div className="relative">
                    <button
                        onClick={toggleMenu}
                        className="flex items-center text-gray-300 hover:text-white font-medium"
                    >
                        <img
                            src="/images/logo1-removebg-preview.png"
                            alt="Menu"
                            className="h-10 w-9 mr-2"
                        />
                        Categories
                    </button>
                    {isMenuOpen && (
                        <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-48 z-10">
                            <ul className="py-2">
                                {categories.map((category, index) => (
                                    <li key={index}>
                                        <Link
                                            to={`/category/${category.toLowerCase()}`}
                                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                                            onClick={closeMenu}
                                        >
                                            {category}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Center: Logo */}
                <Link to="/" className="text-center">
                    <img
                        src="/images/Marc-removebg-preview.png"
                        alt="Logo"
                        className="h-10 w-auto"
                    />
                </Link>

                {/* Right: Navigation Links */}
                <div className="flex items-center space-x-6">
                    <Link to="/cart" className="relative text-gray-300 hover:text-white">
                        <img
                            src="/images/shopping-cart.png"
                            alt="Cart"
                            className="w-8 h-8"
                        />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <Link to="/wishlist" className="text-gray-300 hover:text-white">
                        <img
                            src="/images/heart.png"
                            alt="Wishlist"
                            className="w-8 h-8"
                        />
                    </Link>


                    <Link
                        to="/register"
                        className="bg-yellow-700 text-white px-4 py-2 rounded-lg hover:bg-yellow-900 transition"
                    >
                        Login
                    </Link>
                    <Link to="/profile" className="flex items-center">
                        <img
                            src="/images/user.png"
                            alt="Profile"
                            className="h-8 w-8"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
