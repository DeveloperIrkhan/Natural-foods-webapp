import React, { useEffect, useMemo } from "react";
import Container from "../Container";
import HomeCard from "../Cards-Components/HomeCard";
import NoItemFounnd from "../NoItemFounnd";
import { useCategoryStore } from "@/features/category/categoryStore";
import { useProductsStore } from "@/features/product/productStore";
interface IHomeTabBar {
  selectedTab: string;
  onTabSelected: (tab: string) => void;
}

const HomeTabBar = ({ selectedTab, onTabSelected }: IHomeTabBar) => {
  const { categories } = useCategoryStore();
  const { products, setProducts } = useProductsStore();
  // Set products to redux
  useEffect(() => {
    if (products && products.length === 0) {
      const latest = [...products]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 6);
      setProducts(latest);
    }
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    if (!products.length) return [];
    if (selectedTab === "See all") return products;
    return products.filter((product) => product.category === selectedTab);
  }, [products, selectedTab]);

  //for accessing cartItems

  return (
    <Container className="m-5">
      <div className="flex flex-wrap justify-between my-3">
        <div className="flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item._id}
              onClick={() => onTabSelected(item._id)}
              className={`border border-primary-color px-2 py-1 text-sm md:px-4 md:py-2 rounded-full
                  hoverEffect hover:bg-primary-color hover:text-white ${
                    selectedTab === item._id
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
          className={`border border-primary-color px-2 py-1 text-sm md:px-4 md:py-2 rounded-full
              hoverEffect hover:bg-primary-color hover:text-white ${
                selectedTab === "See all"
                  ? "bg-primary-color text-white"
                  : "bg-primary-color/20"
              }`}
        >
          See all
        </button>
      </div>

      {/* Products */}
      <div className="w-full flex justify-center items-center">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 [@media(max-width:950px)]:grid-cols-1 md:grid-cols-2 lg:gap-4 md:gap-3 gap-2 justify-center items-center">
            {filteredProducts.map((product) => (
              <HomeCard
                key={product._id}
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
        ) : (
          <div className="md:my-6 my-3 w-full flex items-start justify-start">
            <NoItemFounnd selectedTab={selectedTab} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default HomeTabBar;
