import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {

  const { products, router, t } = useAppContext()

  return (
    <div className="flex flex-col items-center pt-14">
      <div className="flex items-center justify-between w-full">
        <p className="text-2xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-emerald-500">{t('popularProducts')}</p>
        <button onClick={() => { router.push('/all-products') }} className="md:hidden text-xs px-4 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition">{t('seeMore')}</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {products.map((product, index) => <ProductCard key={index} product={product} />)}
      </div>
      <button onClick={() => { router.push('/all-products') }} className="hidden md:inline-flex px-12 py-2.5 border rounded-full text-gray-600 hover:bg-slate-50/90 transition">
        {t('seeMore')}
      </button>
    </div>
  );
};

export default HomeProducts;
