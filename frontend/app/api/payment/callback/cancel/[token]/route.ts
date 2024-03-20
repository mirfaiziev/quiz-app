import { getFullUrl } from "@/lib/url"
import { NextApiRequest } from "next"
import { redirect } from "next/navigation"

async function GET(request: NextApiRequest) {
 
  redirect(getFullUrl(''))
}

export {GET}