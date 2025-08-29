"use client";
import React from "react";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const AboutUs = () => {
  const { t } = useAppContext();
  return (
    <>
      <main className="px-6 md:px-16 lg:px-32 py-16 min-h-screen flex flex-col items-center">
        <div className="max-w-3xl w-full text-center space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-emerald-500">{t('aboutHeadline')}</h1>
          <p className="text-lg leading-relaxed text-gray-700">{t('aboutBody')}</p>
          <ul className="text-left grid gap-3 bg-white/70 backdrop-blur rounded-xl p-6 shadow border border-gray-200 text-base">
            <li className="pl-2 relative before:content-['•'] before:absolute before:-left-2 before:text-green-600">{t('aboutPoint1')}</li>
            <li className="pl-2 relative before:content-['•'] before:absolute before:-left-2 before:text-green-600">{t('aboutPoint2')}</li>
            <li className="pl-2 relative before:content-['•'] before:absolute before:-left-2 before:text-green-600">{t('aboutPoint3')}</li>
            <li className="pl-2 relative before:content-['•'] before:absolute before:-left-2 before:text-green-600">{t('aboutPoint4')}</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
