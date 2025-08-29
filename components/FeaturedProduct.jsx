import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const products = [
  {
    id: 1,
    image: assets.cardCase,
    title: "CardBoard Pencil Case",
    description: "Keep your stationery organized in an eco-friendly way with this durable cardboard pencil case. Lightweight, sustainable, and perfect for everyday use.",
  },
  {
    id: 2,
    image: assets.cupHolder,
    title: "Crochet Cupholder",
    description: "Add a touch of handmade charm to your drinks with this crochet cupholder. Reusable, stylish, and designed to keep your hands comfortable while holding hot or cold beverages.",
  },
  {
    id: 3,
    image: assets.bracelet, 
    title: "Bracelets",
    description: "Express your style with personalized beaded bracelets. Handmade, customizable, and crafted to reflect your unique personality or a perfect gift for someone special.",
  },
];

const FeaturedProduct = () => {
  const { t } = useAppContext();
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-emerald-500">{t('mostBuyProducts')}</p>
        <div className="w-28 h-0.5 bg-gradient-to-r from-green-600 to-emerald-400 mt-3 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group">
            <Image
              src={image}
              alt={title}
              className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
            />
            <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
              <p className="font-medium text-xl lg:text-2xl">{title}</p>
              <p className="text-sm lg:text-base leading-5 max-w-60">
                {description}
              </p>
              <button className="flex items-center gap-1.5 bg-green-600 px-4 py-2 rounded-full hover:bg-green-500 transition shadow">
                {t('buyNow')} <Image className="h-3 w-3" src={assets.redirect_icon} alt="Redirect Icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
