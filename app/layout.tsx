import type { Metadata } from "next";
import "./globals.css";
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
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
