import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

// About Section
const FooterAbout = () => (
  <div className="w-4/5">
    <Image className="w-28 md:w-32" src={assets.logo} alt="logo" />
    <p className="text-sm">
      Eco-Hive is a digital marketplace that aims to simplify environmentalism.
      Waste can be given a new lease of life through shopping, selling, and
      recycling recyclable raw materials and reused handmade things. Using
      geotagged images, citizens may also report recyclable trash in public
      areas, assisting municipal collectors in recycling more quickly and
      maintaining clean streets. By bringing together individuals, companies,
      and municipal services, Eco-Hive promotes better urban living, a circular
      economy, and community involvement.
    </p>
  </div>
);

// Company Links
const FooterLinks = () => {
  const links = ["Home", "About us", "Contact us", "Privacy policy"];
  return (
    <div className="w-1/2 flex items-center justify-start md:justify-center">
      <div>
        <h2 className="font-medium text-gray-900 mb-5">Company</h2>
        <ul className="text-sm space-y-2">
          {links.map((link, idx) => (
            <li key={idx}>
              <a className="hover:underline transition" href="#">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Contact Info
const FooterContact = () => {
  const phones = ["+95 91234567"];
  return (
    <div className="w-1/2 flex items-start justify-start md:justify-center">
      <div>
        <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
        <div className="text-sm space-y-2">
          {phones.map((phone, idx) => (
            <p key={idx}>{phone}</p>
          ))}
          <p>contact@EcoHive.dev</p>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <FooterAbout />
        <FooterLinks />
        <FooterContact />
      </div>
      <p className="py-4 text-center text-xs md:text-sm">
        Copyright 2025 © EcoHive.dev All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;