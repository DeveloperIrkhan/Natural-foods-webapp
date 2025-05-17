import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Navbar-components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import Carousel from "@/components/Carousel/Carousel";
export const metadata: Metadata = {
  title: {
    template: "eShopping Store.",
    default: "online Store"
  },
  description: "Online Store for Shopping."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="">
          <Header />
          <Carousel/>
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
