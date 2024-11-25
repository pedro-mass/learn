'use server'

import { signin, signup } from '@/utils/authTools'
import { COOKIE_NAME } from '@/utils/constants'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const registerUser = async (prevState: any, formData: FormData) => {
  const data = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  try {
    const { token } = await signup(data)
    cookies().set(COOKIE_NAME, token)
  } catch (error) {
    console.error(error)
    return { message: 'Failed to sign you up' }
  }

  redirect('/dashboard')
}

export const signinUser = async (prevState: any, formData: FormData) => {
  const data = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  try {
    const { token } = await signin(data)
    cookies().set(COOKIE_NAME, token)
  } catch (error) {
    console.error(error)
    return { message: 'Failed to sign you in' }
  }

  redirect('/dashboard')
}
