'use client'

import { initLocalStorage } from "@/lib/storage"
import { getStartUrl } from "@/lib/url"
import { notFound, redirect } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    const startUrl = getStartUrl()
    if (!startUrl) {
      return notFound()
    }

    initLocalStorage()
    redirect(startUrl)  
  }, [])
  
  return (
    <></>
  )
}
