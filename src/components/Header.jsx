import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="bg-[#0a0a0a] text-white w-full p-4 top-0 left-0 z-50 shadow-md font-montserrat">
            <div className="container mx-auto flex justify-between items-center px-[30px]">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img
                        src="/images/logo_small.png"
                        alt="Logo"
                        className="h-12"
                    />
                </Link>

                <div className="flex md:flex items-center space-x-4 lg:space-x-16 text-xl">
                    <Link to="/"
                          className="relative text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110">
                        <img src="/images/home-agreement.png" alt="Home"
                             className="w-6 h-6 transition-transform duration-300 hover:scale-125"/>
                    </Link>
                    <Link to="/cart"
                          className="relative text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110">
                        <img src="/images/shopping-cart.png" alt="Cart"
                             className="w-6 h-6 transition-transform duration-300 hover:scale-125"/>
                    </Link>
                    <Link to="/wishlist"
                          className="relative text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110">
                        <img src="/images/heart.png" alt="Wishlist"
                             className="w-6 h-6 transition-transform duration-300 hover:scale-125"/>
                    </Link>
                    <Link to="/register"
                          className="bg-[#aa783d] text-white px-4 py-2 rounded-lg hover:bg-yellow-900 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
                        Login
                    </Link>
                    <Link to="/profile"
                          className="relative text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110">
                        <img src="/images/user.png" alt="Profile"
                             className="w-6 h-6 transition-transform duration-300 hover:scale-125"/>
                    </Link>
                </div>
            </div>
        </header>
    )
        ;
}

export default Header;
