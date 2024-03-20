import Success from "@/components/custom/Success"
import { cookies } from "next/headers"

interface SearchParams {
  token: string
}

export default function SuccessPage() {
  const token = cookies().get('payment-token')?.value || ''
  return (
    <Success token={token} />
  )
}