import React from 'react';

const JacketCard = ({ image, title, price }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg relative"
             style={{width: '100%', maxWidth: '260px'}}>
            <div className="aspect-w-3 aspect-h-4 overflow-hidden relative" style={{height: '370px'}}>
                <img src={image} alt={title} className="w-full h-full object-cover"/>
            </div>
            <div className="p-3">
                <span className="text-lg font-semibold">{price}</span>
                <h3 className="text-xs text-gray-700 mt-1">{title}</h3>
            </div>
        </div>
    );
};

export default JacketCard;