'use client'

import { useState } from 'react'
import VerificationForm from '../forms/verification.form'
import RegisterForm from '../forms/register.form'

export default function RegistrationSection() {
  const [isVerifying, setIsVerifying] = useState(false)

  return (
    <>
      {isVerifying ? (
        <VerificationForm />
      ) : (
        <RegisterForm setIsVerifying={setIsVerifying} />
      )}
    </>
  )
}
