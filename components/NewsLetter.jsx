import React from "react";
import { useAppContext } from "@/context/AppContext";

const NewsLetter = () => {
  const { t } = useAppContext();
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 pt-20 pb-24 bg-gradient-to-br from-emerald-50 via-white to-green-50 rounded-2xl mt-20 shadow-inner">
      <h1 className="md:text-4xl text-2xl font-semibold tracking-tight max-w-2xl leading-snug bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-emerald-500">
        {t('subscribeHeadline')}
      </h1>
      <p className="md:text-base text-sm text-gray-600 max-w-2xl px-6">
        {t('subscribeSub')}
      </p>
      <form onSubmit={(e)=> e.preventDefault()} className="flex flex-col sm:flex-row items-stretch justify-center max-w-2xl w-full gap-3 sm:gap-0 mt-4">
        <input
          className="border border-gray-300 sm:rounded-l-full sm:rounded-r-none rounded-full h-12 md:h-14 outline-none flex-1 px-5 text-gray-600 focus:ring-2 focus:ring-green-500/40 focus:border-green-500/40 shadow-sm"
          type="email"
          required
          placeholder={t('subscribePlaceholder')}
        />
        <button className="md:px-10 px-8 h-12 md:h-14 text-white bg-green-600 hover:bg-green-500 transition font-medium rounded-full sm:rounded-r-full sm:rounded-l-none shadow">
          {t('subscribeButton')}
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
