import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

const BannerBackground = () => (
  <>
    <Image
      src={assets.mapMDY}
      alt="banner_background"
      fill
      className="object-cover z-0 rounded-xl"
    />
    <div className="absolute inset-0 bg-[#E6E9F2] opacity-40 z-10 rounded-xl"></div>
  </>
);

const BannerText = () => {
  const { t } = useAppContext();
  return (
    <div className="flex flex-col items-start justify-center text-left space-y-2 px-4 md:px-0">
      <h2 className="text-2xl md:text-3xl font-semibold max-w-[320px] leading-snug">
        {t('reportBannerTitle')}
      </h2>
      <p className="max-w-[360px] font-medium text-gray-700/70 text-sm md:text-base">
        {t('reportBannerSubtitle')}
      </p>
      <Link href="/report-waste" className="group flex items-center justify-center gap-1 px-10 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full text-white shadow hover:shadow-md hover:from-green-500 hover:to-emerald-400 transition">
        {t('report')}
        <Image
          className="group-hover:translate-x-1 transition"
          src={assets.arrow_icon_white}
          alt="arrow_icon_white"
        />
      </Link>
    </div>
  );
};

const BannerImage = () => (
  <>
    <Image
      className="hidden md:block max-w-80"
      src={assets.map_icon}
      alt="map"
    />
    <Image
      className="md:hidden"
      src={assets.map_icon}
      alt="recycle_image"
    />
  </>
);

const Banner = () => {
  return (
  <div className="relative flex flex-col md:flex-row items-center justify-between md:pl-20 py-1 md:py-0 bg-[#E6E9F2] my-16 rounded-xl overflow-hidden h-80 shadow-inner">
      <BannerBackground />
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-between w-full h-full">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 md:p-8 max-w-lg">
          <BannerText />
        </div>
        <BannerImage />
      </div>
    </div>
  );
};

export default Banner;