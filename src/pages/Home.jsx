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
                    <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="block bg-white rounded shadow hover:shadow-lg transition-shadow duration-300" style={{ width: '305px' }}
                    >
                        <div className="h-full">
                            <JacketCard
                                image={product.image}
                                title={product.title}
                                price={product.price}
                                isInWishlist={isProductInWishlist(product.id)}
                                onToggleWishlist={() => {
                                    isProductInWishlist(product.id)
                                        ? removeFromWishlist(product.id)
                                        : addToWishlist(product);
                                }}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Home;
