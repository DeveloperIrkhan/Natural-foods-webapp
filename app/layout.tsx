import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dynamic Admin Title | MyApp",
  };
}
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex w-full flex-col min-h-screen">
          <StoreProvider>
            <main className="flex-1">
              <ToastContainer position="top-right" autoClose={3000} />
              {children}
            </main>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
