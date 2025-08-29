import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";

const HeaderSlider = () => {
  const { isSignedIn } = useUser();
  const { t } = useAppContext();

  const sliderData = [
    {
      id: 1,
      title: t('welcomeTitle'),
      offer: t('welcomeOffer'),
      buttonText1: t('login'),
      buttonText2: t('signUp'),
      imgSrc: assets.recycle_logo,
    },
    {
      id: 2,
      title: t('buySellTitle'),
      offer: t('buySellOffer'),
      buttonText1: t('shopNow'),
      buttonText2: t('exploreDeals'),
      imgSrc: assets.recycle,
    },
    {
      id: 3,
      title: t('exploreHandmade'),
      offer: t('handmadeOffer'),
      buttonText1: t('orderNow'),
      buttonText2: t('exploreDeals'),
      imgSrc: assets.handmade_basket,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-orange-600 pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {slide.title}
              </h1>
              {(slide.id !== 1 || !isSignedIn) && (
                <div className="flex items-center mt-4 md:mt-6 ">
                  {slide.id === 1 && !isSignedIn ? (
                    <>
                      <SignInButton mode="modal">
                        <button className="md:px-10 px-7 md:py-2.5 py-2 bg-green-600 rounded-full text-white font-medium hover:bg-green-500 transition">
                          {slide.buttonText1}
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button className="group flex items-center gap-2 px-6 py-2.5 font-medium ">
                          {slide.buttonText2}
                          <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon} alt="arrow_icon" />
                        </button>
                      </SignUpButton>
                    </>
                  ) : (
                    <>
                      {slide.id === 2 ? (
                        <>
                          <a href="/all-products">
                            <button className="md:px-10 px-7 md:py-2.5 py-2 bg-green-600 rounded-full text-white font-medium hover:bg-green-500 transition">
                              {slide.buttonText1}
                            </button>
                          </a>
                          <button className="group flex items-center gap-2 px-6 py-2.5 font-medium ">
                            {slide.buttonText2}
                            <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon} alt="arrow_icon" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="md:px-10 px-7 md:py-2.5 py-2 bg-green-600 rounded-full text-white font-medium hover:bg-green-500 transition">
                            {slide.buttonText1}
                          </button>
                          <button className="group flex items-center gap-2 px-6 py-2.5 font-medium ">
                            {slide.buttonText2}
                            <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon} alt="arrow_icon" />
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center flex-1 justify-center">
              <Image
                className="md:w-72 w-48"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                priority={index === 0}
                sizes="(max-width: 768px) 50vw, 300px"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-green-600" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
