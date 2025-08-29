import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const Footer = () => {
  const { t, lang, toggleLanguage } = useAppContext();
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white mt-16 border-t border-gray-200/70">
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 text-gray-600">
        <div className="md:w-2/4 space-y-4 max-w-xl">
          <Image className="w-32" src={assets.logo} alt="logo" />
          <p className="text-sm leading-6 whitespace-pre-line">{t('footerAbout')}</p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">{t('company')}</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">{t('home')}</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">{t('aboutUs')}</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">{t('contactUs')}</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">{t('privacyPolicy')}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">{t('getInTouch')}</h2>
            <div className="text-sm space-y-2">
              <p>+95 12345678</p>
              <p>contact@EcoHive.dev</p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5 px-6 md:px-16 lg:px-32 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-200 text-xs md:text-[13px] text-gray-500">
        <p>© 2025 EcoHive.dev · All rights reserved.</p>
        <div className="flex items-center gap-3">
          <button onClick={toggleLanguage} className="text-xs border px-3 py-1.5 rounded-full hover:bg-gray-100 transition">{lang === 'en' ? 'မြန်မာ' : 'English'}</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;