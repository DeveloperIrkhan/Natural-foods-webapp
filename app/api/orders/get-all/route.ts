import connectDB from "@/app/dbConfig/DbConnection";
import { Order } from "@/app/models/order.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find({});
    if (orders && orders.length > 0) {
      return NextResponse.json(
        {
          success: true,
          orders,
          message: "Order fetched successfully"
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: true, message: "no order found" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error while fetching Orders", error },
      { status: 500 }
    );
  }
}
