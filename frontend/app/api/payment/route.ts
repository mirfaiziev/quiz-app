
import {stripe} from "@/lib/payment"
import { createPaymentLog as createPaymentLogToken } from "@/lib/paymentLog";
import { getFullUrl } from "@/lib/url";
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
    success_url: getFullUrl('/api/payment/callback/success/'+token),
    client_reference_id: token,
    cancel_url: getFullUrl('/api/payment/callback/cancel/'+token),
  });

  return NextResponse.json({ url: session.url });
}

export {POST}