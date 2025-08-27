import connectDB from "@/app/dbConfig/DbConnection";
import { Order } from "@/app/models/order.model";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  try {
    await connectDB();
    const { email } = params;
    const userOrders = await Order.find({ "userInfo.email": email });

    if (userOrders.length > 0) {
      return NextResponse.json(
        {
          success: true,
          orders: userOrders,
          message: "Orders fetched successfully"
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: true, message: "No orders found for this email" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching orders", error },
      { status: 500 }
    );
  }
}
