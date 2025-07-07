import React from "react";

type Props = {
  id: string;
  // cartProductSize: string;
  Quantity: number;
  incrementCartQuantity: (id: string) => void;
  decrementCartQuantity: (id: string) => void;
  // incrementCartQuantity: (id: string, cartProductSize: string) => void;
  // decrementCartQuantity: (id: string, cartProductSize: string) => void;
};

const IncrementAndDecrementQuantity = ({
  id,
  Quantity,
  // cartProductSize,
  incrementCartQuantity,
  decrementCartQuantity
}: Props) => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="flex border rounded-full overflow-hidden w-full">
          <button
            onClick={() => decrementCartQuantity(id)}
            className="flex flex-1 justify-center items-center px-3 py-1 hover:bg-secondary-color duration-200 font-bold hover:text-white"
          >
            -
          </button>
          <span className="font-semibold flex flex-1  justify-center items-center px-4 py-1">
            {Quantity}
          </span>
          <button
            onClick={() => incrementCartQuantity(id)}
            className="flex flex-1 justify-center items-center px-3 py-1 hover:bg-secondary-color duration-200 font-bold hover:text-white"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncrementAndDecrementQuantity;
