"use client"
import { getAnswers, storedAnswers } from "@/lib/storage"
import { useEffect, useState } from "react"

export default function ResultPage() {
  const [answers, setAnswers] = useState({});  

  useEffect(() => {
    const answers = getAnswers()
    if (answers !== null) {
      setAnswers(answers)
    }
  }, [])

  if (Object.keys(answers).length === 0) {
    return (<h1>Looging for your answers...</h1>)
  }

  return (
    <section>
      <h1>Your answers:</h1>
      <ul>
      {Object.entries(answers).map(([key, value])=> {
        return (<li key={key}>{key} = {value} </li>)
      })}
       </ul>
       
    </section>
  )
}