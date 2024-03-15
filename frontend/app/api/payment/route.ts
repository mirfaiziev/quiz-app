
import {stripe} from "@/lib/payment"
import { createPaymentLog as createPaymentLogToken } from "@/lib/paymentLog";
import { NextResponse } from "next/server";

async function POST() {
  const token = await createPaymentLogToken()

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: process.env.STRIPE_RESULT_PRICE_ID,
        quantity: 1,
      }
    ],
    success_url: "http://localhost:3000/success?token="+token,
    client_reference_id: token
   // cancel_url: "http://localhost:3000/cancel",
  });

  return NextResponse.json({ url: session.url });
}

export {POST}