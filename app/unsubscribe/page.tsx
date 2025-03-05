'use client'

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'


const Unsubscribe = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {


    fetch("/api/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    })
  }, [token])

  return (
    <div className={"flex justify-center items-center"}>You have successfully unsubscribed from PhysioMedix&apos;s monthly newsletter</div>
  )
}
export default Unsubscribe
