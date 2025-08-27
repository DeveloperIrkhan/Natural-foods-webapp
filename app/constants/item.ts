import { Order } from "@/app/models/order.model";
import Product from "@/app/models/productModel";
import { IProduct, IUserOrderData } from "@/interfaces/product.interface";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil"
});

interface IProductItems {
  productId: string;
  quantity: number;
}

export async function POST(req: Request) {
  const { userOrderData }: { userOrderData: IUserOrderData } = await req.json();

  try {
    // 1. Find existing Stripe customer or use email
    const customers = await stripe.customers.list({
      email: userOrderData.metaData.customerEmail,
      limit: 1
    });

    // 2. Get all products and filter selected ones
    const products = await Product.find({});
    const selectedProducts: IProduct[] = products.filter((product) =>
      userOrderData.orderData.products.some(
        (prod: any) => prod.productId === product._id.toString()
      )
    );

    // 3. Calculate subtotal
    let calculatedTotal = 0;
    selectedProducts.forEach((product) => {
      const cartItem = userOrderData.orderData.products.find(
        (item) => item.productId === product._id.toString()
      );
      const quantity = cartItem?.quantity ?? 1;
      const price = product.discountPrice || product.price;
      calculatedTotal += price * quantity;
    });

    // 4. Add shipping charges
    const shippingCharges = calculatedTotal > 3000 ? 0 : 500;
    const finalTotalAmount = calculatedTotal + shippingCharges;

    console.log("calculatedTotal:", calculatedTotal);
    console.log("shippingCharges:", shippingCharges);
    console.log("finalTotalAmount:", finalTotalAmount);

    // 5. Create Stripe line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    selectedProducts.forEach((item) => {
      const matchedProduct = userOrderData.orderData.products.find(
        (prod: any) => prod.productId === item._id.toString()
      );
      const quantity = matchedProduct?.quantity || 1;
      const unitPrice = item.discountPrice ?? item.price;

      lineItems.push({
        price_data: {
          currency: "PKR",
          unit_amount: Math.round(unitPrice * 100),
          product_data: {
            name: item.name,
            description: item.description,
            images: item.images && item.images.length > 0 ? [item.images[0]] : [],
            metadata: {
              id: item._id.toString()
            }
          }
        },
        quantity
      });
    });

    // 6. Add shipping as separate item if needed
    if (shippingCharges > 0) {
      lineItems.push({
        price_data: {
          currency: "PKR",
          unit_amount: shippingCharges * 100,
          product_data: {
            name: "Shipping Charges",
            description: "Shipping fee under PKR 3000"
          }
        },
        quantity: 1
      });
    }

    // 7. Create checkout session
    const customerId = customers.data.length > 0 ? customers.data[0].id : "";

    const sessionpayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        customer_id: customerId,
        orderNumber: userOrderData.metaData?.orderNumber,
        customerName: userOrderData.metaData?.user,
        customerEmail: userOrderData.metaData?.customerEmail,
        address: userOrderData.metaData?.address
      },
      mode: "payment",
      payment_method_types: ["card"],
      invoice_creation: { enabled: true },
      line_items: lineItems,
      success_url: `${process.env.NEXT_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${userOrderData.metaData.orderNumber}`,
      cancel_url: `${process.env.NEXT_APP_URL}/cancel`
    };

    if (customerId) {
      sessionpayload.customer = customerId;
    } else {
      sessionpayload.customer_email = userOrderData.metaData?.customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionpayload);

    // 8. Save order to database
    const savingOrder = {
      products: userOrderData.orderData.products.map((item: IProductItems) => ({
        productId: item.productId,
        quantity: item.quantity
      })),
      userInfo: {
        name: userOrderData.orderData.userInfo.name,
        email: userOrderData.orderData.userInfo.email,
        contact: userOrderData.orderData.userInfo.contact
      },
      totalAmount: userOrderData.orderData.totalAmount,
      shippingAddress: userOrderData.orderData.shippingAddress,
      paymentStatus: userOrderData.orderData.paymentStatus
    };

    console.log("Saving Order:", savingOrder);
    await Order.create(savingOrder);

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe session error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
