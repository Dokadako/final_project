import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-black text-white fixed bottom-0 left-0 w-full p-4 text-center">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Логотип и краткое описание */}
                <div className="mb-4 md:mb-0">
                    <Link to="/" className="flex items-center space-x-2">
                        <img
                            src="/images/web_logo-removebg-preview.png" // Путь к логотипу
                            alt="Logo"
                            className="h-10 w-85"
                        />

                    </Link>
                    <p className="text-gray-400 mt-2">
                        Your one-stop shop for all your needs.
                    </p>
                </div>



                {/* Социальные сети */}
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition"
                    >
                        <img
                            src="/images/communication.png" // Путь к иконке Facebook
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
                            src="/images/twitter.png" // Путь к иконке Twitter
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
                            src="/images/social.png" // Путь к иконке Instagram
                            alt="Instagram"
                            className="h-8 w-8"
                        />
                    </a>
                </div>
            </div>

            {/* Нижняя часть футера */}
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
                <p>&copy; 2024 MASCULINO. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;