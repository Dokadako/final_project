import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import JacketCard from "./JacketCard";
import { API_URL } from "../API";
import axios from "axios";

function Filters({ onApplyFilters }) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetch(API_URL + "/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
            });
        fetch(API_URL + "/brands")
            .then((res) => res.json())
            .then((data) => {
                setBrands(data);
            });
    }, []);

    const handleApplyFilters = () => {
        onApplyFilters(search, category, brand, priceFrom, priceTo);
    };

    return (
        <div className="p-4 border rounded bg-yellow-700">
            <div className="mb-4 p-4 border rounded bg-yellow-700">
                <label
                    htmlFor="category-select"
                    className="black block font-bold mb-2"
                >
                    Категория:
                </label>
                {categories ? (
                    <select
                        id="category-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border rounded text-black"
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                ) : (
                    "Loading..."
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="brand-input" className="block font-bold mb-2">
                    Бренд:
                </label>
                {brands ? (
                    <select
                        id="brand-select"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full p-2 border rounded text-black"
                    >
                        <option value="">Выберите бренд</option>
                        {brands.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                ) : (
                    "Loading..."
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="search-input" className="block font-bold mb-2">
                    Поиск:
                </label>
                <input
                    type="text"
                    id="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Введите запрос..."
                    className="w-full p-2 border rounded text-black"
                />
                <label className="block font-bold mb-2">Цена:</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        value={priceFrom}
                        onChange={(e) => setPriceFrom(e.target.value)}
                        placeholder="От"
                        className="flex-1 p-2 border rounded text-black"
                    />
                    <input
                        type="number"
                        value={priceTo}
                        onChange={(e) => setPriceTo(e.target.value)}
                        placeholder="До"
                        className="flex-1 p-2 border rounded text-black"
                    />
                </div>
            </div>
            <button
                onClick={handleApplyFilters}
                className="w-full p-2 bg-[#0a0a0a] text-white rounded"
            >
                Применить фильтры
            </button>
        </div>
    );
}

function Home() {
    const { wishlist, addToWishlist, removeFromWishlist } = useStore();
    const [products, setProducts] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    const pageSize = 8;

    const fetchProducts = async (
        page,
        size,
        searchText,
        categoryId,
        brandId,
        minPrice,
        maxPrice
    ) => {
        let url = `${API_URL}/products?page=${page - 1}&size=${size}`;
        if (searchText) url += `&searchText=${encodeURIComponent(searchText)}`;
        if (categoryId) url += `&categoryId=${categoryId}`;
        if (brandId) url += `&brandId=${brandId}`;
        if (minPrice) url += `&minPrice=${minPrice}`;
        if (maxPrice) url += `&maxPrice=${maxPrice}`;

        const response = await axios.get(url);
        setProducts(response.data);
        setTotalPages(response.data.totalPages);
    };

    useEffect(() => {
        fetchProducts(
            currentPage,
            pageSize,
            search,
            category,
            brand,
            priceFrom,
            priceTo
        );
    }, [currentPage, search, category, brand, priceFrom, priceTo]);

    const handleScrollToProducts = () => {
        const productsSection = document.getElementById("products-section");
        productsSection.scrollIntoView({ behavior: "smooth" });
    };

    const handleFilters = (
        searchText,
        categoryId,
        brandId,
        minPrice,
        maxPrice
    ) => {
        setSearch(searchText);
        setCategory(categoryId);
        setBrand(brandId);
        setPriceFrom(minPrice);
        setPriceTo(maxPrice);
        setCurrentPage(1); // Reset to first page when filters change
    };

    const isProductInWishlist = (productId) =>
        wishlist.some((item) => item.id === productId);

    const getPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - 4);
        const endPage = Math.min(totalPages, currentPage + 4);
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    if (!products || !products.content) return "Loading";

    return (
        <div className="flex flex-col min-h-screen text-white font-montserrat">
            {/* Hero Section */}
            {currentPage === 1 && (
                <section className="h-screen flex flex-col items-center justify-center wave-background">
                    <img
                        src="/images/masculino_logo.svg"
                        alt="Masculino"
                        className="w-[1200px] h-auto"
                    />
                    <button
                        onClick={handleScrollToProducts}
                        className="mt-6 bg-[#aa783d] hover:bg-[#8a5f31] text-white px-8 py-4 rounded-lg font-montserrat text-lg transition-all duration-200 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-2xl"
                    >
                        Shop Now
                    </button>
                </section>
            )}

            {/* Filters */}
            <section className="container mx-auto p-4">
                <Filters onApplyFilters={handleFilters} />
            </section>

            {/* Products Section */}
            <section id="products-section" className="container mx-auto p-4 mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                    {products.content.map((product) => (
                        <div
                            key={product.id}
                            className="relative bg-white text-black rounded shadow hover:shadow-lg transition-shadow duration-300"
                            style={{ width: "305px" }}
                        >
                            <Link to={`/product/${product.id}`} className="block">
                                <div className="h-full">
                                    <JacketCard
                                        image={product.imageUrls[0]}
                                        name={product.name}
                                        price={product.price}
                                    />
                                </div>
                            </Link>
                            <button
                                className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center ${
                                    isProductInWishlist(product.id)
                                        ? "bg-red-500"
                                        : "bg-gray-200"
                                }`}
                                onClick={() => {
                                    isProductInWishlist(product.id)
                                        ? removeFromWishlist(product.id)
                                        : addToWishlist(product);
                                }}
                            >
                                <img
                                    src="https://svg.moda/assets/img/icons/like.svg"
                                    alt="Like"
                                    className="w-4 h-4"
                                />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6">
                    <nav>
                        <ul className="flex list-style-none">
                            <li className="mx-1">
                                <button
                                    onClick={() => {
                                        if (currentPage > 1) {
                                            setCurrentPage(currentPage - 1);
                                        }
                                    }}
                                    className="px-3 py-2 border rounded bg-white hover:bg-gray-200 text-black"
                                >
                                    &lt;
                                </button>
                            </li>
                            {getPageNumbers().map((pageNumber) => (
                                <li
                                    key={pageNumber}
                                    className={`mx-1 ${
                                        currentPage === pageNumber
                                            ? "text-[#a97442]"
                                            : "text-black"
                                    }`}
                                >
                                    <button
                                        onClick={() => setCurrentPage(pageNumber)}
                                        className={`px-3 py-2 border rounded ${
                                            currentPage === pageNumber
                                                ? "bg-[#a97442] text-white"
                                                : "bg-white hover:bg-gray-200"
                                        }`}
                                    >
                                        {pageNumber}
                                    </button>
                                </li>
                            ))}
                            <li className="mx-1">
                                <button
                                    onClick={() => {
                                        if (currentPage < totalPages) {
                                            setCurrentPage(currentPage + 1);
                                        }
                                    }}
                                    className="px-3 py-2 border rounded bg-white hover:bg-gray-200 text-black"
                                >
                                    &gt;
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
        </div>
    );
}

export default Home;