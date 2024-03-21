'use client'
import Loader from "@/components/custom/Loader";
import SimpleResult from "@/components/custom/SimpleResult";
import { getAnswers } from "@/lib/storage";
import { useEffect, useState } from "react";


export default function ResultPage() {
  const [result, setResult] = useState("")


  useEffect(() => {
    const answers = getAnswers()

    fetch('/api/result', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers)
    })
    .then(res => res.json())
    .then(res => {
      setResult(res)
    })

  }, [])

  return (
    result === ""
    ? <Loader />
    : <SimpleResult text={"ololo"}/>
  )
}