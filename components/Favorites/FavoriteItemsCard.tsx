import { useCartStore } from "@/features/cart/cartStore";
import { IProduct } from "@/interfaces/product.interface";
import React from "react";

interface props {
  product: IProduct;
  addToCart: (productId: string) => void;
  addToFav: (productId: string) => void;
}
const FavoriteItemsCard = ({ product, addToCart, addToFav }: props) => {
  const { items, removeFromCart } = useCartStore();
  const isInCart = items.some((item) => item.productId === product._id);
  return (
    <div className="bg-white border min-w-sm max-w-sm shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col group">
      <div className="h-52 w-full overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-3">
            {product.description}
          </p>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2">
            {product.discountPrice > 0 ? (
              <div className="flex gap-3 items-center">
                <span className="text-red-600 font-bold text-lg">
                  Rs. {product.discountPrice}
                </span>
                <span className="text-primary-color line-through text-sm">
                  Rs. {product.price}
                </span>
              </div>
            ) : (
              <>
                <span className="text-primary-color font-bold text-lg">
                  Rs. {product.price}
                </span>
              </>
            )}
          </div>

          <p
            className={`text-sm mt-2 ${
              product.inStock > 0 ? "text-black" : "text-red-500"
            }`}
          >
            {product.inStock > 0
              ? `In Stock (${product.inStock})`
              : "Out of Stock"}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0">
        <button
          onClick={() => addToFav(product._id)}
          className="w-full border hover:bg-primary-color hover:text-white border-primary-color text-primary-color py-2 rounded-lg hover:bg-opacity-90 transition"
        >
          Remove from favorities
        </button>
      </div>
      <div className="p-4 pt-0">
        {!isInCart ? (
          <button
            onClick={() => addToCart(product._id)}
            className={`w-full bg-primary-color text-white py-2 rounded-lg hover:bg-opacity-90 transition 
              ${product.inStock === 0 && "opacity-50"}`}
            disabled={product.inStock === 0}
          >
            {product.inStock > 0 ? "Add to Cart" : "Sold Out"}
          </button>
        ) : (
          <button
            disabled={product.inStock === 0}
            onClick={() => removeFromCart(product._id)}
            className="w-full bg-red-400 text-white py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            Remove from Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default FavoriteItemsCard;
