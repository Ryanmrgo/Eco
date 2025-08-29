"use client"
import React, { useState } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {

  const { isSeller, router, user, toggleLanguage, lang, t } = useAppContext();
  const { openSignIn } = useClerk()

  const [mobileOpen, setMobileOpen] = useState(false)

  const NavLinks = ({ onClick }) => (
    <>
      <Link onClick={onClick} href="/" className="nav-link">{t('home')}</Link>
      <Link onClick={onClick} href="/all-products" className="nav-link">{t('shop')}</Link>
      <Link onClick={onClick} href="/about-us" className="nav-link">{t('aboutUs')}</Link>
      <Link onClick={onClick} href="/contact" className="nav-link">{t('contactUs')}</Link>
      <Link onClick={onClick} href="/report-waste" className="nav-link text-green-700 font-medium">{t('reportWaste')}</Link>
      {user && <button onClick={() => { router.push('/seller'); onClick?.() }} className="pill-btn hidden sm:inline-flex">{t('sellerDashboard')}</button>}
      <button onClick={() => { toggleLanguage(); onClick?.() }} className="pill-btn border-gray-300">{lang === 'en' ? 'မြန်မာ' : 'English'}</button>
    </>
  )

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 text-gray-700 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 py-3">
        <div className="flex items-center gap-4">
          <button aria-label="Toggle menu" className="md:hidden p-2 rounded-md hover:bg-gray-100 active:scale-95 transition" onClick={() => setMobileOpen(o => !o)}>
            <span className="block w-5 h-0.5 bg-gray-800 mb-1"></span>
            <span className="block w-5 h-0.5 bg-gray-800 mb-1"></span>
            <span className="block w-5 h-0.5 bg-gray-800"></span>
          </button>
          <Image
            className="cursor-pointer w-28 md:w-32 select-none"
            onClick={() => router.push('/')} 
            src={assets.logo}
            alt="logo"
            priority
          />
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10 text-sm font-medium">
          <NavLinks />
        </div>

        {/* Account / user actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label={t('cart')} labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label={t('myOrders')} labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition text-sm font-medium">
              <Image src={assets.user_icon} alt="user icon" />
              {t('account')}
            </button>
          )}
        </div>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-3">
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label={t('home')} labelIcon={<HomeIcon />} onClick={() => router.push('/')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label={t('products')} labelIcon={<BoxIcon />} onClick={() => router.push('/all-products')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label={t('cart')} labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label={t('myOrders')} labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
              <Image src={assets.user_icon} alt="user icon" />
              {t('account')}
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown panel */}
      {mobileOpen && (
        <div className="md:hidden animate-in slide-in-from-top-2 duration-200 origin-top border-t border-gray-200 bg-white px-4 pb-4 pt-2 flex flex-col gap-3 text-sm font-medium shadow-lg">
          <NavLinks onClick={() => setMobileOpen(false)} />
          {user && (
            <div className="flex gap-2 pt-1">
              <button onClick={() => { router.push('/cart'); setMobileOpen(false) }} className="pill-btn flex-1">{t('cart')}</button>
              <button onClick={() => { router.push('/my-orders'); setMobileOpen(false) }} className="pill-btn flex-1">{t('myOrders')}</button>
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        .nav-link { @apply relative px-1 hover:text-gray-900 transition; }
        .nav-link::after { content:''; @apply absolute left-0 -bottom-1 h-0.5 w-0 bg-green-600 transition-all; }
        .nav-link:hover::after { @apply w-full; }
        .pill-btn { @apply text-xs border px-4 py-1.5 rounded-full hover:bg-gray-100 transition whitespace-nowrap; }
        .animate-in.slide-in-from-top-2 { animation: slideDown .25s ease; }
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0);} }
      `}</style>
    </nav>
  );
};

export default Navbar;