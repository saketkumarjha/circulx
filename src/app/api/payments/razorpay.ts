import { NextResponse } from "next/server";
import razorpay from "@/lib/razorpay.server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { amount, currency = "INR", receipt } = await request.json();

    // Create a Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    });

    return NextResponse.json({ razorpayOrderId: razorpayOrder.id });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ error: "Error creating Razorpay order" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await request.json();

    // Verify the payment signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, error: "Invalid payment signature" });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ success: false, error: "Error verifying payment" }, { status: 500 });
  }
}