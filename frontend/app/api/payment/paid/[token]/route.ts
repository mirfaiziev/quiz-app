import { isPaymentPaid } from "@/lib/paymentLog"
import { NextApiRequest } from "next"
import { NextResponse } from "next/server"

type Params = {
  token: string
}

async function GET(request: NextApiRequest, context:{params:Params}) {
  const paidPayment = await isPaymentPaid(context.params.token)
  return NextResponse.json({ success: paidPayment })
}

export {GET}