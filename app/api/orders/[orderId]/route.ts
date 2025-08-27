import connectDB from "@/app/dbConfig/DbConnection";
import { Order } from "@/app/models/order.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ orderId: string }> }
) {
  try {
    await connectDB();
    const { orderId } = await context.params;
    const { paymentStatus } = await req.json();
    if (!paymentStatus) {
      return NextResponse.json(
        {
          sucess: false,
          message: "paymentStatus is required"
        },
        { status: 400 }
      );
    }

    const updateOrder = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus },
      { new: true }
    );
    if (!updateOrder) {
      return NextResponse.json(
        {
          sucess: false,
          message: "no order found"
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Payment status updated successfully",
        order: updateOrder
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Order not found" },
      { status: 404 }
    );
  }
}
