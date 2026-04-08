'use client'
import React from "react";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const WishlistPage = () => {
    const { products, wishlist, user, router } = useAppContext();

    if (!user) {
        return (
            <>
                <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
                    <p className="text-xl text-gray-600 mb-4">Please log in to view your wishlist.</p>
                    <button onClick={() => router.push('/')} className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                        Go Home
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    const wishlistProducts = products.filter(p => wishlist.includes(p._id));

    return (
        <>
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                <div className="flex flex-col pt-12 w-full">
                    <p className="text-2xl font-medium">My Wishlist</p>
                    <div className="w-16 h-0.5 bg-green-600 rounded-full mt-1 mb-4"></div>
                    <p className="text-sm text-gray-500 mb-6">{wishlistProducts.length} saved item{wishlistProducts.length !== 1 ? 's' : ''}</p>
                </div>
                {wishlistProducts.length === 0 ? (
                    <div className="flex flex-col items-center w-full py-24 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <p className="text-lg">Your wishlist is empty.</p>
                        <button onClick={() => router.push('/all-products')} className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                            Browse Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-14 w-full">
                        {wishlistProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default WishlistPage;
