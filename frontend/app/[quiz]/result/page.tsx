'use client'
import SimpleResult from "@/components/custom/SimpleResult";
import { use, useEffect, useState } from "react";



export default function ResultPage() {
  const [result, setResult] = useState("")

  
  useEffect(() => {
    fetch('/api/result', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"json":"true"})
    })
    .then(res => res.json())
    .then(res => {
      setResult(res)

    })

  }, [])

  return (
    result === ""
    ? 'loading...' 
    : <SimpleResult text={"ololo"}/>
  )
}