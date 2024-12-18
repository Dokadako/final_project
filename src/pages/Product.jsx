import React from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../context/StoreContext";

function Product() {
    const { id } = useParams();
    const { products, addToCart } = useStore();
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) return <p>Product not found!</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="mt-2">{product.description}</p>
            <p className="mt-2 text-lg">${product.price}</p>
            <button
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                onClick={() => addToCart(product)}
            >
                Add to Cart
            </button>
        </div>
    );
}

export default Product;
