"use client";
import BarChart from "@/components/Admin/BarChart";
import DashboardCard from "@/components/Admin/DashboardCard";
import ManageProduct from "@/components/Admin/ManageProduct";
import PieChart from "@/components/Admin/PieChart";
import { useGetProductQuery } from "@/features/product/productAPI";
import { IProduct } from "@/interfaces/product.interface";
import { useEffect } from "react";

const page = () => {
  const { data } = useGetProductQuery();

  useEffect(() => {
    console.log(data?.products);
  }, [data?.products]);
  return (
    <main className="grid grid-cols-2 md:grid-cols-4 gap-3 my-3 mx-2">
      <DashboardCard
        className="bg-primary-color/20"
        totalNumber={data?.products?.length || 0}
        heading="Total Products"
        text="total products"
      />
      <DashboardCard
        className="bg-text-color/20"
        totalNumber={50}
        heading="Total Orders"
        text="Total Orders"
      />
      <DashboardCard
        className="bg-accent-color/20"
        totalNumber={56}
        heading="Total Shiped"
        text="Total Shiped"
      />
      <DashboardCard
        className="bg-muted-color/20"
        totalNumber={43}
        heading="Total Pending"
        text="Total Pending"
      />
      <ManageProduct
        shortText="Manage"
        productName="Blogs"
        className="cursor-pointer hoverEffect bg-amber-100 hover:bg-amber-200"
        linkTo="/dashboard/manage-blogs/"
      />
      <ManageProduct shortText="Manage" productName="Products" linkTo="" />
      <ManageProduct shortText="Manage" productName="Categories" linkTo="" />
      <ManageProduct shortText="Manage" productName="Orders" linkTo="" />

      <PieChart value={60} totalCount={300} chartTitle="Product Reviews" />
      <PieChart value={135} totalCount={300} chartTitle="Shipping" />
      <PieChart value={205} totalCount={300} chartTitle="Total Sales" />
      <PieChart value={258} totalCount={300} chartTitle="Total Revenue" />
      <BarChart value={50} totalCount={300} chartTitle="Product Reviews" />
      <BarChart value={138} totalCount={300} chartTitle="Shipping" />
      <BarChart value={200} totalCount={300} chartTitle="Total Sales" />
      <BarChart value={250} totalCount={300} chartTitle="Product Reviews" />
    </main>
  );
};

export default page;
