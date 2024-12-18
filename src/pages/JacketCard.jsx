import React from 'react';

const JacketCard = ({ image, title, price, oldPrice, discount, rating }) => {
    const formatNumber = (number) => {
        return new Intl.NumberFormat('ru-RU').format(number); // Используем локаль 'ru-RU' для пробелов
    };
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg w-64">
            {/* Image */}
            <div className="h-72 overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Discount */}
                {discount && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{discount}%
          </span>
                )}

                {/* Price */}
                <div className="mt-2">
                    <span className="text-xl font-semibold">${formatNumber(price)} ₸</span>
                    {oldPrice && (
                        <span className="text-gray-400 text-sm line-through ml-2">
              {oldPrice} ₸
            </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-sm text-gray-700 mt-1">{title}</h3>

                {/* Rating */}
                <div className="flex mt-2">
                    {[...Array(5)].map((_, index) => (
                        <span
                            key={index}
                            className={`${
                                index < rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                        >
                            ★
                        </span>
                    ))}
                    <span className="text-gray-500 text-xs ml-2">{rating}</span>
                </div>
            </div>
        </div>
    );
};

export default JacketCard;
