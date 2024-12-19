import React from 'react';

const JacketCard = ({ image, title, price }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg relative" style={{ width: '305px' }}>
            {/* Image */}
            <div style={{ height: '435px' }} className="overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
            {/* Content */}
            <div className="p-4">
                {/* Price */}
                <div className="mt-2">
                    <span className="text-xl font-semibold">{price}</span>
                </div>
                {/* Title */}
                <h3 className="text-sm text-gray-700 mt-1">{title}</h3>
            </div>
        </div>
    );
};

export default JacketCard;
