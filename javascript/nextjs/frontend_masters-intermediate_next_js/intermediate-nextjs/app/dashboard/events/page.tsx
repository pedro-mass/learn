import { getAllEvents } from '@/utils/event'
import { getCurrentUser } from '@/utils/users'
import Link from 'next/link'

export default async function Page() {
  const user = await getCurrentUser()
  const events = await getAllEvents(user.id)

  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>
          <Link href={`/dashboard/events/${event.id}`}>{event.name}</Link>
        </div>
      ))}
    </div>
  )
}
