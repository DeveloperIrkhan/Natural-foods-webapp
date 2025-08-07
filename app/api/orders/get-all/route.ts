
// export async function GET(req: Request) {
//   try {
//     const orders = await Order.find({});
//     if (orders) {
//       return (
//         NextResponse.json({
//           success: true,
//           orders,
//           message: "Order fetched successfully"
//         }),
//         { status: 200 }
//       );
//     } else {
//       return NextResponse.json(
//         { success: true, message: "no order found" },
//         { status: 201 }
//       );
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Error while fetching Orders", error },
//       { status: 500 }
//     );
//   }
// }