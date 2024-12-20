import React, { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { useStore } from "../context/StoreContext";
import axios from "axios";
import { API_URL } from "../API";

function Product() {
    const { id } = useParams();
    const { cart, setCart, wishlist, addToWishlist, removeFromWishlist } = useStore();
    const [product, setProduct] = useState()
    const navigate = useNavigate();

    const fetchProduct = async (id) => {
        var product = (await axios.get(API_URL + "/products/" + id)).data;
        setProduct(product)
    }

    useEffect(() => {
        fetchProduct(id)
    }, [])



    const isInWishlist = wishlist.some(item => item.id === id);
    const isInCart = cart.some(item => item.id === id);

    const handleCartToggle = () => {
        if (isInCart) {
            setCart((prev) => prev.filter((item) => item.id !== id));
        } else {
            setCart((prev) => [...prev, product]);
        }
    };

    if (!product) return <p>Product not found!</p>;

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <button onClick={() => navigate(-1)} className="flex items-center">
                    <img src="/images/back-button.png" alt="back"
                         className="h-10 transition-all duration-500 hover:scale-105"/>
                </button>
            </div>
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="md:w-1/2 max-w-md h-128 overflow-hidden">
                    <img src={product.imageUrls.length ? API_URL + "/files/" + product.imageUrls[0] : null} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="md:w-1/2 p-6 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                    </div>
                    <div className="flex space-x-4">
                        <p className="text-xl font-semibold text-gray-800 mb-4">{product.price}₸</p>
                        <button
                            className={`bg-${isInCart ? 'red' : 'green'}-500 hover:bg-${isInCart ? 'red' : 'green'}-600 text-white px-6 py-3 rounded transition duration-300`}
                            onClick={handleCartToggle}
                        >
                            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                        </button>
                        <button
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${isInWishlist ? "bg-red-500" : "bg-gray-200"}`}
                            onClick={() => {
                                isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
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