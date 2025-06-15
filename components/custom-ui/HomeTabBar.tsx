import React, { useEffect, useMemo } from "react";
import Container from "../Container";
import LoadingScreen from "../Loading/LoadingScreen";
import HomeCard from "../Cards-Components/HomeCard";
import NoItemFounnd from "../NoItemFounnd";
import { useGetProductQuery } from "@/features/product/productAPI";
import { useGetCategoryQuery } from "@/features/category/categoryAPI";
import { useAppDispatch, useAppSelector } from "@/store/hook";
// import { setCategories } from "@/features/category/categorySlice";
// import { setProductArray } from "@/features/product/productSlice";
import { useCategoryStore } from "@/features/category/categoryStore";
import { useProductsStore } from "@/features/product/productStore";
import { useCartStore } from "@/features/cart/cartStore";
import { getWithExpiry } from "@/app/helpers/localStorage";
interface IHomeTabBar {
  selectedTab: string;
  onTabSelected: (tab: string) => void;
}

const HomeTabBar = ({ selectedTab, onTabSelected }: IHomeTabBar) => {
  const { categories, setCategories } = useCategoryStore();
  const { products, setProducts } = useProductsStore();
  // const storedCategories = useAppSelector(
  //   (state) => state.categoryState.categories
  // );
  // const storedProducts = useAppSelector((state) => state.productSlice.products);

  const {
    data: Products,
    isLoading: productsLoading,
    isSuccess: isProductsSuccess
  } = useGetProductQuery(undefined, {
    skip: products.length > 0
  });

  const { data: Categories, isSuccess: isCategoriesSuccess } =
    useGetCategoryQuery(undefined, {
      skip: categories.length > 0
    });

  // Set categories to redux
  useEffect(() => {
    if (
      isCategoriesSuccess &&
      Categories?.categories &&
      categories.length === 0
    ) {
      setCategories(Categories.categories);
    }
  }, [isCategoriesSuccess, Categories]);

  // Set products to redux
  useEffect(() => {
    if (isProductsSuccess && Products?.products && products.length === 0) {
      const latest = [...Products.products]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 6);
      setProducts(latest);
    }
  }, [isProductsSuccess, Products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    if (!products.length) return [];
    if (selectedTab === "See all") return products;
    return products.filter((product) => product.category === selectedTab);
  }, [products, selectedTab]);

  //for accessing cartItems

  return (
    <Container className="m-5">
      {productsLoading && (
        <LoadingScreen text="Please wait, we are contacting the database!" />
      )}

      {/* Tabs */}
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
