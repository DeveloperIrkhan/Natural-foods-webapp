import connectDB from "@/app/dbConfig/DbConnection";
import { Order } from "@/app/models/order.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const newOrder = await Order.create(body);
    console.log(newOrder);
    return NextResponse.json(
      { success: true, message: "order successfully placed", order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creating order", error },
      { status: 500 }
    );
  }
}
