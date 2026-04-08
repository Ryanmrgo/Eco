import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {

    const { router, t, toggleWishlist, isInWishlist } = useAppContext()

    return (
        <div
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
        >
            <div className="cursor-pointer group relative bg-gray-100 rounded-xl w-full h-52 flex items-center justify-center overflow-hidden ring-1 ring-gray-200/60 shadow-sm">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full rounded-lg"
                    width={800}
                    height={800}
                />
                <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product._id) }}
                    className={`absolute top-2 right-2 bg-white/90 backdrop-blur p-2 rounded-full shadow border border-white hover:scale-105 active:scale-95 transition ${isInWishlist(product._id) ? 'text-red-500' : 'text-gray-400'}`}
                    aria-label={isInWishlist(product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    {isInWishlist(product._id) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    ) : (
                        <Image
                            className="h-3 w-3"
                            src={assets.heart_icon}
                            alt="heart_icon"
                        />
                    )}
                </button>
            </div>

            <p className="md:text-base font-medium pt-2 w-full truncate">{product.name}</p>
            <p className="text-xs text-gray-400">{product.productType}</p>
            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>
            <p className="w-full text-xs text-gray-700 font-semibold">Qty: {product.quantity}</p>
            <div className="flex items-center gap-2">
                <p className="text-xs">{4.5}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={index}
                            className="h-3 w-3"
                            src={
                                index < Math.floor(4)
                                    ? assets.star_icon
                                    : assets.star_dull_icon
                            }
                            alt="star_icon"
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-semibold tracking-tight">MMK {product.offerPrice}</p>
                <button className=" max-sm:hidden px-4 py-1.5 text-gray-600 border border-gray-300 rounded-full text-xs hover:bg-gray-100 transition">
                    {t('buyNow')}
                </button>
            </div>
        </div>
    )
}

export default ProductCard