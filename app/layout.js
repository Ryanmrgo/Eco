import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { cookies } from "next/headers";


import ClientNavbarWrapper from "@/components/ClientNavbarWrapper";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })


export const metadata = {
  title: "EcoHive",
  description: "E-Commerce with Next.js ",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const initialLang = cookieStore.get('eco-lang')?.value === 'my' ? 'my' : 'en';
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased text-gray-700`} >
          <AppContextProvider initialLang={initialLang}>
            <Toaster />
            <ClientNavbarWrapper />
            {children}
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
