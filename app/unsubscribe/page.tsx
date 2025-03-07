'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const UnsubscribeContent = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [isUnsubscribed, setIsUnsubscribed] = useState(false)

  useEffect(() => {
    if (token) {
      fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      }).then(() => {
        setIsUnsubscribed(true)
      })
    }
  }, [token])

  if (!token) {
    return <div>Token not found in URL.</div>
  }

  return (
    <div className="flex justify-center items-center">
      {isUnsubscribed
        ? "You have successfully unsubscribed from PhysioMedix's monthly newsletter"
        : "Unsubscribing..."}
    </div>
  )
}

const Unsubscribe = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UnsubscribeContent />
    </Suspense>
  )
}

export default Unsubscribe
