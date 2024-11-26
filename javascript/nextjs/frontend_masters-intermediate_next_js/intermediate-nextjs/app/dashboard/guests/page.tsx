import { getGuestList } from '@/utils/attendees'
import { getCurrentUser } from '@/utils/users'

export default async function Page() {
  const user = await getCurrentUser()
  const guests = await getGuestList(user.id)

  return (
    <div>
      {guests.map((guest) => (
        <div key={guest.id}>{guest.name}</div>
      ))}
    </div>
  )
}
