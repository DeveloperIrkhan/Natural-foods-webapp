import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";
import AdminnAreaNav from "@/components/Admin/AdminnAreaNav";
import { ToastContainer } from "react-toastify";
// export const metadata: Metadata = {
//   title: {
//     template: "admin panel | eshopping Store",
//     default: "admin panel | eshopping Store"
//   },
//   description: "Online Store for Shopping."
// };
export const metadata: Metadata = {
  title: "Admin Panel | Khalis Foods",
  description: "Khalis Foods"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <ToastContainer />
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-primary-color">Admin Panel</h1>
        </div>
        <div className="p-4 space-y-2">
          <Link
            href="/dashboard"
            className="block px-4 py-2 rounded hover:bg-blue-50"
          >
            Dashboard
          </Link>
          <Link
            href="/admin-blogs"
            className="block px-4 py-2 rounded hover:bg-blue-50"
          >
            Add blogs
          </Link>
          <Link
            href="/products"
            className="block px-4 py-2 rounded hover:bg-blue-50"
          >
            Products
          </Link>
          <Link
            href="/products/add-product"
            className="block px-4 py-2 rounded hover:bg-blue-50"
          >
            Add Product
          </Link>
          <Link
            href="/products/add-category"
            className="block px-4 py-2 rounded hover:bg-blue-50"
          >
            Add Category
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Admin Area</h2>
          <AdminnAreaNav />
        </header>
        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
