"use client";
import React, { useState } from "react";
import { Textsm } from "../PageTitle";
import UserOrderCard from "./UserOrderCard";
import OrderDetails from "./OrderDetails";
import { useCartStore } from "@/features/cart/cartStore";
import { usePostOrderMutation } from "@/features/Order/OrderAPI";
import { toast } from "react-toastify";
import LoadingScreen from "../Loading/LoadingScreen";

interface IUserOrderCardProps {
  name: string;
  email: string;
  phoneNumber: string;
}
const UserOrder = ({ name, email, phoneNumber }: IUserOrderCardProps) => {
  const [userName, setUserName] = useState<string>(name);
  const [userEmail, setUserEmail] = useState<string>(email);
  const [userAddress, setUserAddress] = useState<string>("");
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>(
    phoneNumber ? phoneNumber : ""
  );
  const { getCartAmount, getDiscountTotal, shippingcharges, items, resetCart } =
    useCartStore();
  let subtotal = Number(getCartAmount());
  let discount = Number(getDiscountTotal());
  let totalAmount = subtotal - discount + shippingcharges;

  const [postOrder, { isLoading }] = usePostOrderMutation();

  const handleOrderSubmit = async () => {
    const orderData = {
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
    };

    try {
      const response = await postOrder(orderData).unwrap();
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setUserName("");
      setUserEmail("");
      setUserAddress("");
      setUserPhoneNumber("");
      resetCart();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-10">
      {isLoading && <LoadingScreen />}
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
                  type="email"
                  placeholder="Enter Your Email"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className="custom-input"
                />
                <input
                  id="userEmail"
                  name="userEmail"
                  type="text"
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
        <OrderDetails onSubmitOrder={handleOrderSubmit} />
      </div>
    </div>
  );
};

export default UserOrder;
