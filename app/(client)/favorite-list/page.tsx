"use client";
import Container from "@/components/Container";
import FavoriteItemsCard from "@/components/Favorites/FavoriteItemsCard";
import { useCartStore } from "@/features/cart/cartStore";
import {
  IFavItemStore,
  useFavoriteItemsStore
} from "@/features/favoriteitems/favoriteitemsStore";
import { useProductsStore } from "@/features/product/productStore";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { images } from "@/public/ImagesUrls";
import { Button } from "@/components/ui/button";
const Page = () => {
  const { favItems, addToFavorite } = useFavoriteItemsStore();
  const { addToCart } = useCartStore();
  const { products } = useProductsStore();
  const [visibleProducts, setVisibleProducts] = useState<IFavItemStore[]>([]);
  useEffect(() => {
    setVisibleProducts(favItems.slice(0, 2));
  }, [favItems]);
  const favoriteProducts = useMemo(() => {
    return visibleProducts
      .map((fav) => products.find((product) => product._id === fav.productId))
      .filter(Boolean);
  }, [visibleProducts, products]);
  const loadMore = () => {
    setVisibleProducts((prev) => favItems.slice(0, prev.length + 2));
    // setVisibleProducts((prev) => Math.min(prev + 4, favItems.length));
  };
  useEffect(() => {
    console.log(
      "visibleProducts",
      visibleProducts.length,
      "favoriteProducts",
      favoriteProducts.length,
      "favItems",
      favItems.length
    );
  }, [visibleProducts, favoriteProducts]);
  return (
    <Container className="">
      <div className="flex justify-center items-center w-full my-12 flex-wrap gap-4">
        {favoriteProducts.length > 0 ? (
          favoriteProducts.map((item) => {
            if (!item) return null;
            return (
              <div key={item._id}>
                <FavoriteItemsCard
                  product={item}
                  addToCart={addToCart}
                  addToFav={addToFavorite}
                />
              </div>
            );
          })
        ) : (
          <div className="flex justify-center items-center w-full">
            <div className="flex bg-white space-y-2 shadow-md p-4 backdrop-blur-sm w-full rounded-md max-w-lg flex-col items-center justify-center text-center px-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut"
                }}
                className="relative w-48 h-48 mx-auto"
              >
                <Image
                  src={images.EmptyFavCart}
                  alt="shopping-cart"
                  layout="fill"
                  objectFit="contain"
                  className="drop-shadow-lg"
                />
              </motion.div>
              <h2 className="text-xl font-semibold">
                Your favorite list is empty
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                It look like you haven't added anything to your favorite list
                yet, let's change that and find some amazing product for you!
              </p>
              <Link
                href="/our-shop"
                className="block rounded-full custom-button hoverEffect 
                  border font-semibold border-gray-600 bg-gray-100 hover:bg-primary-color 
                  hover:shadow-[0_5px_10px_rgba(0_0_0/0.3)] text-gray-600 hover:border-primary-color hover:text-white px-4 py-2 duration-300"
              >
                continue shopping
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="w-full text-center">
        {visibleProducts.length !== favItems.length ? (
          <Button
            className="hover:bg-primary-color hover:text-white custom-button text-gray-300"
            variant="outline"
            onClick={() => loadMore()}
          >
            Load More...
          </Button>
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
};

export default Page;
