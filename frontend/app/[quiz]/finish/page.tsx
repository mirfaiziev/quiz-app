"use client"
import { getAnswers, storedAnswers } from "@/lib/storage"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react"

export default function FinishPage() {
  const defaultAnswers:storedAnswers = {}
  const [answers, setAnswers] = useState(defaultAnswers);  

  useEffect(() => {
    const answers = getAnswers()
    if (answers === null) {
      redirect("/")
      return
    }
    setAnswers(answers)

  }, [])

  if (Object.keys(answers).length === 0) {
    return (<h1>Looging for your answers...</h1>)
  }

  return (
    <section>
      <h1>Your answers:</h1>
      <ul>
      {Object.entries(answers).map(([key, value]) => {
        return (<li>{key} - {value}</li>)
      })}
       </ul>
       <br/>
       <a href="https://buy.stripe.com/test_14kbM75Fxb4203m288"
        className="buy-button bg-blue-500 hover-bg-blue-700 text-white py-2 px-4 rounded"
       >
        Get results
       </a>
    </section>
  )
}