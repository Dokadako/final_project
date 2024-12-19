import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import JacketCard from "./JacketCard";

function Home() {
    const { products, wishlist, addToWishlist, removeFromWishlist } = useStore();

    const isProductInWishlist = (productId) => {
        return wishlist.some(item => item.id === productId);
    };

    return (
        <div className="container mx-auto p-4 ">
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="grid grid-cols-4 gap-6 mt-4">
                {products.map((product) => (
                    <div key={product.id} className="relative bg-white rounded shadow hover:shadow-lg transition-shadow duration-300 " style={{ width: '305px' }}>
                        <Link to={`/product/${product.id}`} className="block">
                            <div className="h-full">
                            <JacketCard
                                image={product.image}
                                title={product.title}
                                price={product.price}
                            />
                        </div>
                    </Link>
                    <button
                    className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center ${
                    isProductInWishlist(product.id) ? "bg-red-500" : "bg-gray-200"
                    }`}
                    onClick={() => {
                    isProductInWishlist(product.id)
                        ? removeFromWishlist(product.id)
                        : addToWishlist(product);
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
