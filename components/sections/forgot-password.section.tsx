'use client'

import { useState } from 'react'
import ForgotPasswordForm from '../forms/forgot-password.form'
import VerificationForm from '../forms/verification.form'
import RecoveryPasswordForm from '../forms/recovery-password.form'
import { useForgotPassword } from '@/hooks/use-forgot-password'

export default function ForgotPasswordSection() {
  const { step } = useForgotPassword()

  return (
    <>
      {step === 'first' && <ForgotPasswordForm />}
      {step === 'second' && <VerificationForm />}
      {step === 'last' && <RecoveryPasswordForm />}
    </>
  )
}
