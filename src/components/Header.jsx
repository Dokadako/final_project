import React from "react";
import { Link } from "react-router-dom";

function Header() {
    // Пример количества товаров в корзине
    const cartCount = 0; // Замените на динамическое значение, если есть состояние

    return (
        <header className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Логотип с текстом */}
                <div className="flex items-center space-x-2">
                    <Link to="/" className="flex items-center">
                        <img
                            src="/images/logo.jpg" // Путь к логотипу
                            alt="Logo"
                            className="h-10 w-10"
                        />
                        <span className="text-lg font-bold text-gray-800">SHOPPER</span>
                    </Link>
                </div>

                {/* Центр: Ссылка Home */}
                <nav>
                    <Link
                        to="/"
                        className="text-gray-600 text-lg font-medium hover:text-gray-800"
                    >
                        Home
                    </Link>
                </nav>

                {/* Правая сторона: Корзина, Login, Профиль */}
                <div className="flex items-center space-x-6">
                    {/* Корзина */}
                    <Link
                        to="/cart"
                        className="relative text-gray-600 hover:text-gray-800"
                    >
                        <img
                            src="/images/cart.svg" // Путь к локальному файлу SVG
                            alt="Cart"
                            className="w-15 h-10"
                        />
                        {/* Индикатор количества товаров */}
                        {cartCount >= 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Кнопка Login */}
                    <Link
                        to="/register"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Login
                    </Link>

                    {/* Кнопка Профиль */}
                    <Link to="/profile" className="flex items-center">
                        <img
                            src="/images/profile.svg" // Путь к изображению профиля
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
