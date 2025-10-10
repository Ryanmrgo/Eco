import ClerkAdminRedirect from "@/components/ClerkAdminRedirect";

export default function SignInRedirectWrapper({ children }) {
  return (
    <>
      <ClerkAdminRedirect />
      {children}
    </>
  );
}
