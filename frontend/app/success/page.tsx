import Success from "@/components/custom/Success"

interface SearchParams {
  token: string
}

export default function SuccessPage({searchParams} : {searchParams: SearchParams}) {
  // todo: get read of token in url, set it in cookie
  return (
    <Success token={searchParams.token} />
  )
}