import { getOneEvent } from '@/utils/event'
import { getCurrentUser } from '@/utils/users'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getCurrentUser()
  const event = await getOneEvent(user.id, params.id)

  if (!event) redirect('/dashboard/events')

  return <div>{event.name}</div>
}
