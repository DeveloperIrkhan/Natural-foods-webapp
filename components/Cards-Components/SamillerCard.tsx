import { IProduct } from "@/interfaces/product.interface";
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
    <Link className={"p-0 m-0"} href={LinkTo}>
      <div
        className={`relative min-w-[2vmin] group mt-0 bg-white rounded-lg shadow-md hover:bg-slate-50 duration-300`}
      >
        {product.discountPrice > 0 ? (
          <div className="bg-primary-color text-white px-2 py-1 rounded-md uppercase text-sm absolute z-10 top-2 left-3">
            save {percentageSaved} %
          </div>
        ) : (
          <></>
        )}
        <div className="w-full h-[40vmin] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-center transition-transform duration-500 ease-in-out transform group-hover:rotate-3 group-hover:scale-110"
          />
        </div>
        <div className="py-3">
          <p className="text-center text-black">{product.name}</p>
          <p className="text-center card-title-fonts text-gray-800 text-sm">
            <span className="text-gray-600 font-bold mx-2">
              {product.discountPrice > 0 ? product.discountPrice : ""}
            </span>
            <span
              className={`${
                product.discountPrice
                  ? "line-through text-yellow-400"
                  : "text-gray-700 font-bold"
              }`}
            >
              {product.price}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SamillerCard;
