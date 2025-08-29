"use client";
import React from "react";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const Contact = () => {
  const { t } = useAppContext();
  return (
    <>
      <main className="px-6 md:px-16 lg:px-32 py-16 min-h-screen flex flex-col items-center">
        <div className="max-w-3xl w-full text-center space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-emerald-500">{t('contactHeadline')}</h1>
          <p className="text-lg leading-relaxed text-gray-700">{t('contactBody')}</p>
          <div className="grid gap-4 md:grid-cols-3 text-left bg-white/70 backdrop-blur rounded-xl p-6 shadow border border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{t('contactEmail')}</p>
              <a href="mailto:support@ecohive.com" className="text-green-700 hover:underline break-all">support@ecohive.com</a>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{t('contactPhone')}</p>
              <a href="tel:+1234567890" className="text-green-700 hover:underline">+1 234 567 890</a>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{t('contactAddress')}</p>
              <p>123 Green Street<br/>Clean City<br/>Country</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
