import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "../Container";
import LoadingScreen from "../Loading/LoadingScreen";
import HomeCard from "../Cards-Components/HomeCard";
import NoItemFounnd from "../NoItemFounnd";
interface IProductType {
  _id: string;
  name: string;
  category: string;
  images: string[];
  inStock: boolean;
  productStatus: string;
  slug: string;
  price: number;
  discountPrice: number;
  description: string;
}
interface ICategory {
  _id: string;
  name: string;
  description: string;
}
interface IHomeTabBar {
  selectedTab: string;
  onTabSelected: (tab: string) => void;
}
const HomeTabBar = ({ selectedTab, onTabSelected }: IHomeTabBar) => {
  const [products, setProducts] = useState<IProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<ICategory[]>([]);

  const fetchCategory = async () => {
    try {
      setIsLoading(true);
      const categories = await axios.get("/api/category");
      setCategory(categories?.data?.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/product");
        const data = response.data;
        if (data.success) {
          let productData = data.product;
          console.log(productData);
          const latestProducts = productData
            .sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 6);
          if (selectedTab === "See all") {
            setProducts(latestProducts);
          } else {
            setProducts(
              latestProducts.filter(
                (item: any) => item.category === selectedTab
              )
            );
          }
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedTab]);
  return (
    <Container className="m-5">
      {isLoading && (
        <LoadingScreen
          text="please wait products is fetching...!"
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
              key={item._id || `${item.name}-${index}`}
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
                  key={product._id + index}
                  id={product._id}
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
