
'use client'
import React from "react";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {

    const { products } = useAppContext();
    const [typeFilter, setTypeFilter] = React.useState('All');
    const filteredProducts = typeFilter === 'All' ? products : products.filter(p => p.productType === typeFilter);

    return (
        <>
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full pt-12">
                    <div>
                        <p className="text-2xl font-medium">All products</p>
                        <div className="w-16 h-0.5 bg-green-600 rounded-full"></div>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <label className="mr-2 font-medium">Product Type:</label>
                        <select
                            className="border rounded px-2 py-1"
                            value={typeFilter}
                            onChange={e => setTypeFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Refined">Refined</option>
                            <option value="Raw">Raw</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
                    {filteredProducts.map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;
