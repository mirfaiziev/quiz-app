
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import getRawBody from "raw-body";
const stripe = new Stripe( process.env.STRIPE_SECRET_KEY || "", {
  apiVersion:"2023-10-16"
})


async function GET(request: NextApiRequest) {
	return new Response("Method Not Allowed", {status: 405})
}

async function POST(
  request: Request
) {
  try {
    	// Request Body.
		const rawBody = await request.text();
		const body = JSON.parse(rawBody);

		let event;

    	// Verify the webhook signature
		try {
			const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
			if (!stripeWebhookSecret) {
				throw new Error("STRIPE_WEBHOOK_SECRET not set");
			}

			const sig = request.headers.get("Stripe-Signature");
			if (!sig) {
				throw new Error("Stripe Signature missing");
			}

			// Assuming you have a Stripe instance configured
			event = Stripe.webhooks.constructEvent(rawBody, sig, stripeWebhookSecret);
		} catch (err) {
			console.error(`⚠️  Webhook signature verification failed.`, err);
			return new Response(
				JSON.stringify({ error: "Webhook signature verification failed" }),
				{
					status: 400,
				}
			);
		}

    console.log("event.type", JSON.stringify(event.type));

    if (event.type === "checkout.session.completed") {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        (event.data.object as any).id,
        {
          expand: ["line_items"],
        }
      );
      const lineItems = sessionWithLineItems.line_items;

      if (!lineItems) {
        return new Response("Internal Server Error", {status: 500})
      }

      try {
        // Save the data, change customer account info, etc
        console.log("Fullfill the order with custom logic");
        console.log("data", lineItems.data);
        console.log(
          "customer email",
          (event.data.object as any).customer_details.email
        );
        console.log("created", (event.data.object as any).created);
      } catch (error) {
        console.log("Handling when you're unable to save an order");
      }
    }

    return new Response(null, {status:200})
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {status: 500})
  }
}

export {GET, POST}