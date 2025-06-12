import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "../Container";
import LoadingScreen from "../Loading/LoadingScreen";
import HomeCard from "../Cards-Components/HomeCard";
import NoItemFounnd from "../NoItemFounnd";
import { ICategoryModel, IProductModel } from "@/interfaces/product.interface";
import { useGetProductQuery } from "@/features/product/productAPI";
import { useGetCategoryQuery } from "@/features/category/categoryAPI";

interface IHomeTabBar {
  selectedTab: string;
  onTabSelected: (tab: string) => void;
}
const HomeTabBar = ({ selectedTab, onTabSelected }: IHomeTabBar) => {
  const [products, setProducts] = useState<IProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<ICategoryModel[]>([]);

  const {
    data: Products,
    isLoading: productsLoading,
    error: productsError,
    isError: isProductsError,
    isSuccess: isProductsSuccess
  } = useGetProductQuery();

  const {
    data: Categories,
    isLoading: categoriesLoading,
    error: categoriesError,
    isError: isCategoriesError,
    isSuccess: isCategoriesSuccess
  } = useGetCategoryQuery();

  useEffect(() => {
    setIsLoading(productsLoading);
  }, [productsLoading]);

  useEffect(() => {
    if (isProductsError) {
      console.error("Error fetching products:", productsError);
    }
    if (isProductsSuccess && Products.products) {
      console.log("API response for latestProducts:", Products);

      const latestProducts = [...Products.products]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 6);
      if (selectedTab === "See all") {
        setProducts(latestProducts);
      } else {
        setProducts(
          latestProducts.filter((item: any) => item.category === selectedTab)
        );
      }
    }
  }, [isProductsSuccess, selectedTab]);

  useEffect(() => {
    if (isCategoriesError) {
      console.error("Error fetching categories:", categoriesError);
    }

    if (isCategoriesSuccess && Categories?.categories) {
      console.log("API response for categories:", Categories);
      const latestCategories = [...Categories.categories];
      setCategory(latestCategories);
    }
  }, [isCategoriesSuccess, Categories]);

  return (
    <Container className="m-5">
      {isLoading && (
        <LoadingScreen
          text="please wait we are contacting with database!"
          onComplete={() => {
            if (products && products.length > 0) {
              setIsLoading(false);
            }
          }}
        />
      )}
      <div className="flex flex-wrap justify-between my-3">
        <div className="flex flex-wrap gap-3">
          {category.map((item, index) => (
            <button
              key={item._id.toString() || `${item.name}-${index}`}
              onClick={() => onTabSelected(`${item._id}`)}
              className={`border border-primary-colorpx-2 py-1 text-sm md:px-4 md:py-2 rounded-full
                hoverEffect hover:bg-primary-color hover:text-white ${
                  selectedTab === item.name
                    ? "bg-primary-color text-white"
                    : "bg-primary-color/20"
                }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <button
          onClick={() => onTabSelected("See all")}
          className={`border border-primary-color  px-2 py-1 text-sm md:px-4 md:py-2 rounded-full
                hoverEffect hover:bg-primary-color hover:text-white ${
                  selectedTab === "See all"
                    ? "bg-primary-color text-white"
                    : "bg-primary-color/20"
                }`}
        >
          See all
        </button>
      </div>

      {products && products.length ? (
        <>
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4 md:gap-3 gap-2">
              {products.map((product, index) => (
                <HomeCard
                  key={product._id.toString()}
                  _id={product._id}
                  slug={product.slug}
                  productStatus={product.productStatus}
                  image={product.images}
                  price={product.price}
                  discountPrice={product.discountPrice}
                  inStock={product.inStock}
                  title={product.name}
                  description={product.description}
                  buttonText="Add to Cart"
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="md:my-6 my-3 flex items-start justify-start">
          <NoItemFounnd />
        </div>
      )}
    </Container>
  );
};

export default HomeTabBar;
