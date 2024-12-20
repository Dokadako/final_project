import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import JacketCard from "./JacketCard";

function Home() {
    const { products, wishlist, addToWishlist, removeFromWishlist } = useStore();

    // Пагинация
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const totalPages = Math.ceil(products.length / productsPerPage);
    const isProductInWishlist = (productId) => wishlist.some((item) => item.id === productId);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - 4);
        const endPage = Math.min(totalPages, currentPage + 4);
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const handleScrollToProducts = () => {
        const productsSection = document.getElementById("products-section");
        productsSection.scrollIntoView({ behavior: "smooth" });
    };

    // Категории одежды
    const categories = [
        "Jackets", "Sweaters", "Jeans", "T-shirts", "Dresses", "Shoes", "Accessories"
    ];

    return (
        <div className="flex flex-col min-h-screen text-white font-montserrat">
            {/* Main content */}
            <div className="w-full">
                {currentPage === 1 && (
                    <section className="h-screen flex flex-col items-center justify-center wave-background">
                        <img src="/images/masculino_logo.svg" alt="Masculino" className="w-[1200px] h-auto" />
                        <button onClick={handleScrollToProducts} className="mt-6 bg-[#aa783d] hover:bg-[#8a5f31] text-white px-8 py-4 rounded-lg font-montserrat text-lg transition-all duration-200 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-2xl">
                            Shop Now
                        </button>
                    </section>
                )}
                {/* Navbar */}
                <nav className="bg-[#101010] px-5 py-2">
                    <ul className="flex space-x-8 justify-center">
                        {categories.map((category, index) => (
                            <li key={index} className="text-gray-400 hover:text-white transition-colors duration-300">
                                <Link to={`/${category}`}>{category}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                {/* Products Section */}
                <section id="products-section" className="container mx-auto p-4 mt-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                        {currentProducts.map((product) => (
                            <div key={product.id} className="relative bg-white text-black rounded shadow hover:shadow-lg transition-shadow duration-300" style={{ width: "305px" }}>
                                <Link to={`/product/${product.id}`} className="block">
                                    <div className="h-full">
                                        <JacketCard image={product.image} title={product.title} price={product.price} />
                                    </div>
                                </Link>
                                <button className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center ${isProductInWishlist(product.id) ? "bg-red-500" : "bg-gray-200"}`}
                                        onClick={() => { isProductInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product); }}>
                                    <img src="https://svg.moda/assets/img/icons/like.svg" alt="Like" className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                    {/* Пагинация */}
                    <div className="flex justify-center mt-6">
                        <nav>
                            <ul className="flex list-style-none">
                                <li className="mx-1">
                                    <button onClick={() => paginate(Math.max(currentPage - 1, 1))} className="px-3 py-2 border rounded bg-white hover:bg-gray-200 text-black"> &lt; </button>
                                </li>
                                {getPageNumbers().map((pageNumber) => (
                                    <li key={pageNumber} className={`mx-1 ${currentPage === pageNumber ? "text-[#a97442]" : "text-black"}`}>
                                        <button onClick={() => paginate(pageNumber)} className={`px-3 py-2 border rounded ${currentPage === pageNumber ? "bg-[#a97442] text-white" : "bg-white hover:bg-gray-200"}`}>
                                            {pageNumber}
                                        </button>
                                    </li>
                                ))}
                                <li className="mx-1">
                                    <button onClick={() => paginate(Math.min(currentPage + 1, totalPages))} className="px-3 py-2 border rounded bg-white hover:bg-gray-200 text-black"> &gt; </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;