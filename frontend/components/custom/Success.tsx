'use client'
import { useEffect, useRef, useState } from "react"

interface SuccessProps{
  token: string
}

export default function Success({token}: SuccessProps) {
  const [isPaid, setIsPaid] = useState(false)
  // Creating a ref  
  const intervalRef : { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    const poll = () => {
      fetch("/api/payment/paid/"+token, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((response) => {
        if (response.success === true) {
          stopPolling()
          setIsPaid(true)
        } 
      })
    }

    const startPolling = () => {
      intervalRef.current = setInterval(poll, 1000);
    };
    const stopPolling = () => {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    };
    startPolling();

    return () => stopPolling()
  
  }, [])

  return (!isPaid
    ? <AwaitingPayment /> 
    : <ShowResult />
    )
}

function AwaitingPayment() {
  return (<h1>Awaiting Payment</h1>)
}

function ShowResult() {
  return (<h1>Вы поц</h1>)
}