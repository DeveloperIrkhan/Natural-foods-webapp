import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Navbar-components/Header";
import Footer from "@/components/FooterSection/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import ClientHydration from "@/components/ClientHydration";
export const metadata: Metadata = {
  title: "Welcome | Khalis Foods",
  description: "Khalis Foods"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <ClientHydration />
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </ClerkProvider>
  );
}
