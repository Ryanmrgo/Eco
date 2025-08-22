"use client";
import React from "react";
import Footer from "@/components/Footer";

const Contact = () => (
  <>
    <main className="px-6 md:px-16 lg:px-32 py-10 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="max-w-2xl text-lg text-center mb-6">
        Have questions, feedback, or need support? Reach out to the EcoHive team and we’ll be happy to help!
      </p>
      <ul className="list-disc text-left max-w-xl mx-auto text-base">
        <li>Email: <a href="mailto:support@ecohive.com" className="text-green-700 underline">support@ecohive.com</a></li>
        <li>Phone: <a href="tel:+1234567890" className="text-green-700 underline">+1 234 567 890</a></li>
        <li>Address: 123 Green Street, Clean City, Country</li>
      </ul>
    </main>
    <Footer />
  </>
);

export default Contact;
