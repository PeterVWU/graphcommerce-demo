// hooks/useAgeVerification.ts
import { useState, useEffect } from 'react'

export function useAgeVerification() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null)

  useEffect(() => {
    const storedVerification = localStorage.getItem('ageVerified')
    setIsVerified(storedVerification === 'true')
  }, [])

  const verifyAge = (value: boolean) => {
    localStorage.setItem('ageVerified', value.toString())
    setIsVerified(value)
  }

  return { isVerified, verifyAge }
}
