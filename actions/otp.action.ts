'use server'

import { appwriteConfig, databases } from '@/lib/appwrite'
import { transporter } from '@/lib/nodemailer'
import otpTemplate from '@/lib/otp-template'
import { Response } from '@/types'
import { ID, Query } from 'appwrite'
import bcryptjs from 'bcryptjs'

export async function sendOtp(email: string): Promise<Response<null>> {
  try {
    const otp = Math.floor(Math.random() * (1000000 - 100000) + 100000)
    const hashedOtp = await bcryptjs.hash(otp.toString(), 10)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

    const existingOtp = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.otpsCollectionId,
      [Query.equal('email', email)]
    )

    if (existingOtp.documents.length > 0) {
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.otpsCollectionId,
        existingOtp.documents.at(0)?.$id!,
        { otp: hashedOtp, expiresAt }
      )
    } else {
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.otpsCollectionId,
        ID.unique(),
        { email, otp: hashedOtp, expiresAt }
      )
    }

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `ArxPro | Verification code`,
      html: otpTemplate(otp),
    })

    return { status: 200, message: 'Verification code sent successfully', data: null }
  } catch (error) {
    console.error('Error sending OTP:', error)
    return { status: 500, message: 'Something went wrong', data: null }
  }
}

export async function verifyOtp(email: string, otp: string): Promise<Response<null>> {
  try {
    const userOtps = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.otpsCollectionId,
      [Query.equal('email', email)]
    )
    const userOtp = userOtps.documents.at(0)

    if (new Date(userOtp?.expiresAt).getTime() < new Date().getTime())
      return { status: 400, message: 'Verification code is expired', data: null }

    const correctOtp = await bcryptjs.compare(otp, userOtp?.otp)
    if (!correctOtp) return { status: 401, message: 'Incorrect verification code', data: null }

    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.otpsCollectionId,
      userOtp?.$id!
    )

    return { status: 200, message: 'Verified successfully', data: null }
  } catch (error) {
    console.error('Error verifying OTP:', error)
    return { status: 500, message: 'Something went wrong', data: null }
  }
}
