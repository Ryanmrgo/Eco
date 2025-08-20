"use client";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import React from "react";

export default function ClientNavbarWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith("/seller")) return null;
  return <Navbar />;
}
