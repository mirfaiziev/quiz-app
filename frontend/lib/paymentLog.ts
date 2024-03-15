import crypto from "crypto"
import { prismadb } from "./prismadb"

enum State {
  Init = "init",
  Paid = "paid",
}

export async function createPaymentLog(): Promise<string> {
    const token = crypto.randomBytes(20).toString('hex') + (new Date().getTime())

    await prismadb.paymentLog.create({
      data: { token: token, state: State.Init }
    })

    return token
}

export async function markPaymentPaid(token: string, email: string) {
  const paymentLog = await prismadb.paymentLog.findUnique({
    where: {
      token: token,
      state: State.Init
    }
  })

  if (paymentLog) {
    await prismadb.paymentLog.update({
      where: {
        id: paymentLog.id
      },
      data: {
        state: State.Paid,
        email: email
      }
    })

  } else {
    console.log('[UPDATE PAYMENT ERROR]: cannot find init payment by token', token)
  }
}

export async function isPaymentPaid(token: string): Promise<boolean> {
  const isPaymentPaid = await prismadb.paymentLog.findFirst({
    where: {token: token, state: State.Paid}
  })

  if (isPaymentPaid) {
    return true
  }

  return false
}