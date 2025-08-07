"use client";
import React, { useEffect, useState } from "react";
import { Textsm } from "../PageTitle";
import UserOrderCard from "./UserOrderCard";
import { useCartStore } from "@/features/cart/cartStore";
import { usePostOrderMutation } from "@/features/Order/OrderAPI";
import { toast } from "react-toastify";
import LoadingScreen from "../Loading/LoadingScreen";
import PriceFormater from "../PriceFormater";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IUserOrderData } from "@/interfaces/product.interface";

interface IUserOrderCardProps {
  name: string;
  email: string;
  phoneNumber: string;
  userId?: string;
}
const UserOrder = ({
  name,
  email,
  phoneNumber,
  userId
}: IUserOrderCardProps) => {
  const [userName, setUserName] = useState<string>(name);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>(email);
  const [userAddress, setUserAddress] = useState<string>("");
  const [shippingcharges, setShippingcharges] = useState<number>(0);
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>(
    phoneNumber ? phoneNumber : ""
  );
  const [paymentMethod, setpaymentMethod] = useState("COD");
  const [postOrder, { isLoading: PostOrderLoading }] = usePostOrderMutation();

  const { getCartAmount, getDiscountTotal, items, resetCart } = useCartStore();
  const router = useRouter();
  let subtotal = Number(getCartAmount());
  let discount = Number(getDiscountTotal());
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    if (items.length > 0) {
      setShippingcharges(500);
    } else {
      setShippingcharges(0);
    }
  }, [items]);
  let totalAmount = subtotal - discount + shippingcharges;
  useEffect(() => {
    const baseTotal = subtotal - discount;
    const shipping = items.length > 0 && baseTotal <= 2500 ? 500 : 0;
    setShippingcharges(shipping);
    setTotal(baseTotal + shipping);
  }, [subtotal, discount, items]);

  useEffect(() => {
    console.log("totalAmount", totalAmount);
    console.log("total", total);
  }, [totalAmount, total]);

  const handleOrderSubmit = async () => {
    const userOrderData: IUserOrderData = {
      metaData: {
        orderNumber: crypto.randomUUID(),
        user: userName,
        customerEmail: userEmail,
        clerkUserId: userId!,
        address: userAddress
      },
      orderData: {
        products: items.map((item) => ({
          productId: item.productId,
          quantity: item.Quantity
        })),
        userInfo: {
          name: userName,
          email: userEmail,
          contact: userPhoneNumber
        },
        totalAmount,
        shippingAddress: userAddress,
        paymentStatus: "pending"
      }
    };

    try {
      setIsLoading(true);
      if (paymentMethod === "COD") {
        const response = await postOrder(userOrderData).unwrap();
        console.log("response", response);
        if (response.success === true) {
          console.log("order placed successfully");
          toast.success(response?.message);
        }
      }

      if (paymentMethod === "Stripe") {
        const response = await axios.post(
          "/api/orders/create-checkout-session",
          { userOrderData }
        );
        console.log("response", response);
        if (response?.data.url) {
          router.push(response?.data.url);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUserName("");
      setUserEmail("");
      setUserAddress("");
      setUserPhoneNumber("");
      resetCart();
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-10">
      {(isLoading || PostOrderLoading) && (
        <LoadingScreen text="hold on! we're working on your order" />
      )}
      <div className="md:w-2/4 w-full">
        <UserOrderCard cardTitle="User Information">
          <div className="mb-6">
            <div className="flex justify-center items-center m-3 gap-3">
              <img
                className="w-20 border-r-2 border-primary-color"
                src="/Logo.png"
                alt="logo"
              />
              <Textsm className="text-primary-color text-2xl tracking-widest font-bold">
                Khalis Foods
              </Textsm>
            </div>
          </div>

          <div>
            <div className="w-3/4 m-auto">
              <Textsm className="text-primary-color text-lg font-bold my-3">
                User Info
              </Textsm>
              <div className="flex flex-col justify-center items-center space-y-2">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  placeholder="Enter Your Email"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className="custom-input"
                />
                <input
                  id="userEmail"
                  name="userEmail"
                  type="email"
                  placeholder="Enter Your Email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                  className="custom-input"
                />
                <input
                  id="userPhoneNumber"
                  name="userPhoneNumber"
                  type="text"
                  placeholder="Enter Your Phone Number"
                  value={userPhoneNumber}
                  onChange={(e) => setUserPhoneNumber(e.target.value)}
                  required
                  className="custom-input"
                />
                <textarea
                  id="userAddress"
                  name="userAddress"
                  placeholder="Enter Your Shipping Address"
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  required
                  className="custom-input"
                />
              </div>
            </div>
          </div>
        </UserOrderCard>
      </div>
      <div className="md:w-2/4 w-full">
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
                <PriceFormater
                  amount={shippingcharges}
                  className="font-semibold"
                />
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
                onClick={() => setpaymentMethod("COD")}
                className="h-7 max-w-max bg-gray-100 cursor-pointer flex justify-center gap-x-3 items-center border border-gray-400 p-7"
              >
                <span
                  className={`w-4 h-4 rounded-full hoverEffect ${
                    paymentMethod === "COD" ? "bg-primary-color" : "bg-white"
                  }`}
                ></span>{" "}
                <p className="tracking-wide">Cash on delivary</p>
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
                <p className="tracking-widest">Stripe</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => handleOrderSubmit()}
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
      </div>
    </div>
  );
};

export default UserOrder;
