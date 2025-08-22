"use client";
import React from "react";
import Footer from "@/components/Footer";

const AboutUs = () => (
  <>
    <main className="px-6 md:px-16 lg:px-32 py-10 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="max-w-2xl text-lg text-center mb-6">
        EcoHive is an innovative e-commerce platform that not only connects buyers and sellers for a wide range of products, but also empowers the community to report waste issues directly to municipal authorities. Our unique waste reporting system lets users tag locations on a map, making it easy to highlight environmental concerns and contribute to a cleaner city. Shop, report, and make a difference with EcoHive!
      </p>
      <ul className="list-disc text-left max-w-xl mx-auto text-base">
        <li>Buy and sell products easily and securely.</li>
        <li>Report waste by tagging locations on an interactive map.</li>
        <li>All reports are sent to municipal authorities for action.</li>
        <li>Join us in making your city cleaner and greener!</li>
      </ul>
    </main>
    <Footer />
  </>
);

export default AboutUs;
