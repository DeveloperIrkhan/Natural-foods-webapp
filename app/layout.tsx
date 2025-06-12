import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dynamic Admin Title | MyApp"
  };
}
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <div className="flex flex-col min-h-screen">
          <StoreProvider>
            <main className="flex-1">{children}</main>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
