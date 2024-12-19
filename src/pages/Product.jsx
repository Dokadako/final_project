import React from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../context/StoreContext";

function Product() {
    const { id } = useParams();
    const { products, addToCart, wishlist, addToWishlist, removeFromWishlist } = useStore();
    const product = products.find((p) => p.id === id);

    const isInWishlist = wishlist.some(item => item.id === id);

    if (!product) return <p>Product not found!</p>;

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <Link to="/" className="text-blue-500 hover:underline">← Back to Products</Link>
            </div>
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="md:w-1/2 max-w-md h-128 overflow-hidden">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="md:w-1/2 p-6 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                    </div>
                    <div className="flex space-x-4">
                        <p className="text-xl font-semibold text-gray-800 mb-4">{product.price}</p>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded transition duration-300"
                            onClick={() => addToCart(product)}
                        >
                            Add to Cart
                        </button>
                        <button
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isInWishlist ? "bg-red-500" : "bg-gray-200"
                            }`}
                            onClick={() => {
                                isInWishlist
                                    ? removeFromWishlist(product.id)
                                    : addToWishlist(product);
                            }}
                        >
                            <img src="https://svg.moda/assets/img/icons/like.svg" alt="Like" className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;