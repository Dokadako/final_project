import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import JacketCard from './JacketCard';

function Home() {
    const { products, wishlist, addToWishlist, removeFromWishlist } = useStore();

    const isProductInWishlist = (productId) => {
        return wishlist.some(item => item.id === productId);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold">Products</h1>
            {/* Responsive grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                {products.map((product) => (
                    <div key={product.id} className="relative bg-white rounded shadow hover:shadow-lg transition-shadow duration-300 mx-auto">
                        <Link to={`/product/${product.id}`} className="block">
                            <div className="h-full">
                                <JacketCard image={product.image} title={product.title} price={product.price} />
                            </div>
                        </Link>
                        <button
                            className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center ${isProductInWishlist(product.id) ? "bg-red-500" : "bg-gray-200"}`}
                            onClick={() => {
                                isProductInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product);
                            }}
                        >
                            <img src="https://svg.moda/assets/img/icons/like.svg" alt="Like" className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;