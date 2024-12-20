import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-[#0a0a0a] text-white w-full py-2 text-sm mt-auto">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <Link to="/" className="flex items-center space-x-2">
                        <img
                            src="/images/web_logo-removebg-preview.png"
                            alt="Logo"
                            className="h-10 w-85"
                        />
                    </Link>
                    <p className="text-gray-400 mt-1 text-xs">Your one-stop shop for all your needs.</p>
                </div>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition"
                    >
                        <img
                            src="/images/communication.png"
                            alt="Facebook"
                            className="h-8 w-8"
                        />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition"
                    >
                        <img
                            src="/images/twitter.png"
                            alt="Twitter"
                            className="h-8 w-8"
                        />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition"
                    >
                        <img
                            src="/images/social.png"
                            alt="Instagram"
                            className="h-8 w-8"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;