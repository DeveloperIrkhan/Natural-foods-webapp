import { IProduct } from "@/interfaces/product.interface";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

interface ISamillerCardProps {
  product: IProduct;
  LinkTo: string;
}
const SamillerCard = ({ product, LinkTo }: ISamillerCardProps) => {
  const percentageSaved = Math.round(
    ((product.price - product.discountPrice) / product.price) * 100
  );

  return (
    <Link href={`/product-details/${LinkTo}`} className={"p-0 m-0"}>
      <AnimatePresence>
        <div className="group">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
            className={`relative max-w-[300px] min-w-[200px] mt-0 bg-white rounded-lg shadow-md hover:bg-slate-50 duration-300 group-hover:shadow-lg`}
          >
            {product.discountPrice > 0 ? (
              <div
                className="bg-primary-color text-white p-1 
          rounded-md text-[10px] absolute z-10 top-2 left-3"
              >
                save {percentageSaved} %
              </div>
            ) : (
              <></>
            )}
            <div className="w-full h-[40vmin] overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full rounded-t-lg h-full object-center transition-transform duration-500 ease-in-out transform group-hover:rotate-6 group-hover:scale-110"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="py-3"
            >
              <p className="text-center text-black text-sm font-semibold tracking-wide">
                {product.name}
              </p>
              <p className="flex gap-3 items-center justify-center text-center card-title-fonts text-gray-800 text-sm">
                <span className="text-gray-600 font-semibold">
                  PKR: {product.discountPrice > 0 ? product.discountPrice : ""}
                </span>
                <span
                  className={`${
                    product.discountPrice
                      ? "line-through text-red-400"
                      : "text-gray-700 font-bold"
                  }`}
                >
                  {product.price}
                </span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </AnimatePresence>
    </Link>
  );
};

export default SamillerCard;
