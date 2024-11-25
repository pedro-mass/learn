import { cookies } from 'next/headers'
import { COOKIE_NAME } from './constants'
import { redirect } from 'next/navigation'
import { getUserFromToken } from './authTools'
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  const token = cookies().get(COOKIE_NAME)
  if (!token) return redirect('/signin')

  const user = await getUserFromToken(token)
  if (!user) return redirect('/signin')

  return user
})
