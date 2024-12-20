import React, { useState } from "react";
import { useStore } from "../context/StoreContext";


const Checkout = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        cardNumber: "",
        expiryDate: "",
        cvc: "",
        billingAddress: "",
        postCode: "",
        country: "",
    });
    const { cart } = useStore();

    const total = cart.reduce(
        (sum, item) => sum + parseFloat(item.price),
        0
    );

    const [errors, setErrors] = useState({});

    // Функция для проверки каждого поля
    const validateForm = () => {
        const newErrors = {};

        // Проверка имени
        if (!/^[A-Za-z]+$/.test(formData.firstName)) {
            newErrors.firstName = "First name must contain only letters.";
        }

        if (!/^[A-Za-z]+$/.test(formData.lastName)) {
            newErrors.lastName = "Last name must contain only letters.";
        }

        // Проверка почтового индекса
        if (!/^\d{6}$/.test(formData.postCode)) {
            newErrors.postCode = "Post code must be 6 digits.";
        }

        // Проверка номера карты
        if (!/^\d{16}$/.test(formData.cardNumber)) {
            newErrors.cardNumber = "Card number must contain 16 digits.";
        }

        // Проверка срока действия карты (MM/YY)
        if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
            newErrors.expiryDate = "Expiry date must be in MM/YY format.";
        }

        // Проверка CVC
        if (!/^\d{3}$/.test(formData.cvc)) {
            newErrors.cvc = "CVC must contain 3 digits.";
        }

        // Проверка телефона (можно изменить под вашу страну)
        if (!/^\+?\d{10,15}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be valid.";
        }

        // Если есть ошибки, возвращаем их, иначе пустой объект
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Функция для предотвращения ввода цифр в имя и фамилию
    const handleNameInput = (e) => {
        // Только буквы и пробелы
        if (/[^a-zA-Z\s]/.test(e.key)) {
            e.preventDefault();
        }
    };

    // Функция для предотвращения ввода цифр в номер карты
    const handleCardInput = (e) => {
        if (/\D/.test(e.key)) {  // Препятствует вводу всего, кроме цифр
            e.preventDefault();
        }
    };

    // Функция для предотвращения ввода цифр в срок карты (MM/YY)
    const handleExpiryInput = (e) => {
        // Use a regex to allow only digits and slashes
        if (!/[0-9/]/.test(e.key)) {
            e.preventDefault();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form Data:", formData);
        }
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat("ru-RU").format(number);
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100">
            <h1 className="text-3xl font-bold text-center mb-6">Checkout, total = {formatNumber(total)}</h1>
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Info Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-700">Personal Information</h2>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    onKeyPress={handleNameInput} // Применяем фильтрацию
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md mt-1"
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    onKeyPress={handleNameInput} // Применяем фильтрацию
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md mt-1"
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">Phone Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-600">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                            />
                        </div>
                    </div>

                    {/* Card Details Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-700">Card Details</h2>
                        <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-600">Card Number</label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                onKeyPress={handleCardInput} // Применяем фильтрацию
                                required
                                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                                maxLength="16"
                            />
                            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-600">MM/YY</label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    onKeyPress={handleExpiryInput} // Применяем фильтрацию
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md mt-1"
                                    maxLength="5"
                                    placeholder="MM/YY"
                                />
                                {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="cvc" className="block text-sm font-medium text-gray-600">CVC</label>
                                <input
                                    type="text"
                                    id="cvc"
                                    name="cvc"
                                    value={formData.cvc}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md mt-1"
                                    maxLength="3"
                                />
                                {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Billing Address Section */}
                <div className="mt-8 space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Billing Address</h2>
                    <div>
                        <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-600">Billing Address</label>
                        <input
                            type="text"
                            id="billingAddress"
                            name="billingAddress"
                            value={formData.billingAddress}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="postCode" className="block text-sm font-medium text-gray-600">Post Code</label>
                        <input
                            type="text"
                            id="postCode"
                            name="postCode"
                            value={formData.postCode}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                        />
                        {errors.postCode && <p className="text-red-500 text-sm">{errors.postCode}</p>}
                    </div>
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-600">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;