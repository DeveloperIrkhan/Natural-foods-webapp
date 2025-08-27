"use client";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import SectionHeading from "@/components/SectionHeading";
import {
  useGetAllOrdersQuery,
  useUpdatePaymentStatusMutation
} from "@/features/Order/OrderAPI";
import { useProductsStore } from "@/features/product/productStore";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";

const Page = () => {
  const { data, isLoading } = useGetAllOrdersQuery();
  const { products } = useProductsStore();
  const [updatePaymentStatus] = useUpdatePaymentStatusMutation();
  useEffect(() => {
    console.log(updatePaymentStatus);
  }, [data]);
  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await updatePaymentStatus({
        orderId: orderId,
        paymentStatus: newStatus
      }).unwrap();
      console.log("response:", response);
      console.log("Payment status updated:", newStatus);
    } catch (error) {
      console.log("Failed to update status:", error);
    }
  };
  return (
    <div>
      {isLoading && <LoadingScreen text="please wait we are fetching orders" />}
      <SectionHeading
        textColor="text-primary-color"
        lineColor="bg-primary-color"
        title="Users Orders"
        subtitle="Orders Placed by users"
      />

      <div className="flex flex-col gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          {data?.orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col gap-4 h-full"
            >
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {order.userInfo[0]?.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {order.userInfo[0]?.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.userInfo[0]?.contact}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Trash2 className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700" />
                </div>
              </div>

              {/* Products (take remaining space) */}
              <div className="space-y-3 flex-1">
                {order.products.map((singleProduct) => {
                  const product = products.find(
                    (pro) => pro._id === singleProduct.productId
                  );

                  return (
                    product && (
                      <div
                        key={singleProduct.productId}
                        className="flex items-center gap-3 border rounded-lg p-3"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {singleProduct.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-700">
                          Rs {product.discountPrice || product.price}
                        </p>
                      </div>
                    )
                  );
                })}
              </div>

              {/* Bottom Section (always at bottom) */}
              <div className="border-t pt-3 text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-semibold">Shipping Address:</span>{" "}
                  {order.shippingAddress}
                </p>
                <p>
                  <span className="font-semibold">Total Amount:</span> Rs{" "}
                  {order.totalAmount}
                </p>

                <div className="flex items-center gap-2">
                  <span className="font-semibold">Payment Status:</span>
                  <select
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    defaultValue={order.paymentStatus}
                    className={`px-2 py-1 rounded-md text-sm border ${
                      order.paymentStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                        : "bg-green-100 text-primary-color border-primary-color"
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
