import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

function Home() {
    const { products } = useStore();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="grid grid-cols-2 gap-4 mt-4">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-bold">{product.name}</h2>
                        <p>${product.price}</p>
                        <Link to={`/product/${product.id}`}>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
