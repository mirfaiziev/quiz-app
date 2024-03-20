import { NextApiRequest } from "next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type Params = {
  token: string
}

async function GET(request: NextApiRequest, context:{params:Params}) {
  cookies().set({
    name: 'payment-token',
    value: context.params.token,
  })

  redirect('/success')
}

export {GET}