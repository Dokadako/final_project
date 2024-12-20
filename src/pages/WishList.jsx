import React from "react";
import { useStore } from "../context/StoreContext";
import { API_URL } from "../API";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Wishlist() {
    const { wishlist, removeFromWishlist } = useStore();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Wishlist</h1>
            {wishlist.length === 0 ? (
                <p>Your wishlist is empty!</p>
            ) : (
                <ul className="mt-4 space-y-4">
                    {wishlist.map((item, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center bg-white p-4 rounded shadow"
                        >
                            {/* Wrap the image in a Link to make it clickable */}
                            <Link to={`/product/${item.id}`} className="block">
                                <div className="w-24 h-24 overflow-hidden rounded">
                                    <img
                                        src={
                                            item.imageUrls.length
                                                ? `${API_URL}/files/${item.imageUrls[0]}`
                                                : null
                                        }
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </Link>
                            <div className="flex-grow ml-4">
                <span className="text-xl font-bold text-gray-800">
                  {item.name}
                </span>
                                <p className="text-lg text-gray-600">{item.price}₸</p>
                            </div>
                            <button
                                className="bg-red-500 text-white px-4 py-1 rounded"
                                onClick={() => removeFromWishlist(item.id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Wishlist;