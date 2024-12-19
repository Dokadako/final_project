import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import JacketCard from "./JacketCard";

function Home() {
    const { products } = useStore();

    return (
        <div className="container mx-auto p-4 ">
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="grid grid-cols-4 gap-6 mt-4">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="block bg-white rounded shadow hover:shadow-lg transition-shadow duration-300 w-64"
                    >
                        <div className="h-full">
                            <JacketCard
                                image={product.image}
                                title={product.title}
                                price={product.price}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Home;
