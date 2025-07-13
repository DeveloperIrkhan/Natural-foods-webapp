"use client";
import React, { useState } from "react";
import UserOrderCard from "./UserOrderCard";
import { useCartStore } from "@/features/cart/cartStore";
import { Textsm } from "../PageTitle";
import PriceFormater from "../PriceFormater";

interface IOrderDetailsProps {
  onSubmitOrder: () => void;
}
const OrderDetails = ({ onSubmitOrder }: IOrderDetailsProps) => {
  const { getCartAmount, getDiscountTotal, shippingcharges } = useCartStore();

  let subtotal = Number(getCartAmount());
  let discount = Number(getDiscountTotal());
  let shippingcharge = subtotal === 0 ? 0 : shippingcharges;
  let total = subtotal - discount + shippingcharge;
  const [paymentMethod, setpaymentMethod] = useState("Cash on delivary");
  return (
    <UserOrderCard cardTitle="More Details">
      <div className="px-2 md:px-4 py-2 md:py-4">
        <Textsm className="text-gray-700 text-[20px] font-bold">
          Order Summary
        </Textsm>

        <hr className="my-5" />

        <hr className="my-5" />
        <div className="flex flex-col font- font-semibold text-[15px]">
          <div className="flex items-center justify-between">
            <p>Subtotal</p>
            <PriceFormater amount={subtotal} className="" />
          </div>
          {discount !== 0 && (
            <div className="flex items-center justify-between">
              <p>Discount</p>
              <PriceFormater amount={discount} className="text-red-500" />
            </div>
          )}
          <div className="flex items-center justify-between">
            <p>Shipping</p>
            <PriceFormater amount={shippingcharges} className="font-semibold" />
          </div>
        </div>
        <hr className="my-5" />
        <Textsm className="">
          <PriceFormater
            amount={total}
            className="text-gray-700 text-[20px] font-bold"
          />
        </Textsm>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <p>Payment method</p>
        <div className="flex gap-3">
          <div
            onClick={() => setpaymentMethod("Cash on delivary")}
            className="h-7 bg-gray-100 cursor-pointer flex justify-center gap-x-3 items-center border border-gray-400 p-7"
          >
            <span
              className={`w-4 h-4 rounded-full hoverEffect ${
                paymentMethod === "Cash on delivary"
                  ? "bg-primary-color"
                  : "bg-white"
              }`}
            ></span>{" "}
            <p>Cash on delivary</p>
          </div>
          <div
            onClick={() => setpaymentMethod("Stripe")}
            className="h-7 bg-gray-100 cursor-pointer flex justify-center gap-x-3 items-center border border-gray-400 p-7"
          >
            <span
              className={`w-4 h-4 rounded-full hoverEffect ${
                paymentMethod === "Stripe" ? "bg-primary-color" : "bg-white"
              }`}
            ></span>{" "}
            <p>Stripe</p>
          </div>
          <div
            onClick={() => setpaymentMethod("RazorPay")}
            className="h-7 bg-gray-100 cursor-pointer flex justify-center gap-x-3 items-center border border-gray-400 p-7"
          >
            <span
              className={`w-4 h-4 rounded-full hoverEffect ${
                paymentMethod === "RazorPay" ? "bg-primary-color" : "bg-white"
              }`}
            ></span>{" "}
            <p>RazorPay</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={onSubmitOrder}
          disabled={total === 0}
          className={` text-white w-full md:w-2/5 py-3 custom-button ${
            total === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-800 cursor-pointer"
          }`}
        >
          Proceed to checkout
        </button>
      </div>
    </UserOrderCard>
  );
};

export default OrderDetails;
