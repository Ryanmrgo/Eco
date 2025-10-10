"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// This component should be rendered on your sign-in success page or in a layout that only appears after sign-in
export default function ClerkAdminRedirect() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user?.publicMetadata?.role === "admin") {
      router.push("/admin/dashboard");
    }
  }, [isSignedIn, user, router]);

  return null;
}
