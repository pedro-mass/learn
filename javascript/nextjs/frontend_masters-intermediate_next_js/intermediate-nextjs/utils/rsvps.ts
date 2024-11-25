import { db } from '@/db/db'
import { delay } from './delay'
import { desc, eq, inArray } from 'drizzle-orm'
import { attendees, events, rsvps } from '@/db/schema'
import { memoize } from 'nextjs-better-unstable-cache'

export const getRsvpsForDashboard = memoize(
  async (userId: string) => {
    await delay()

    const userEvents = await db.query.events.findMany({
      where: eq(events.createdById, userId),
      columns: {
        id: true,
      },
    })

    const userEventIds = userEvents.map((event) => event.id)
    if (!userEventIds.length) return []

    const data = await db
      .selectDistinct()
      .from(attendees)
      .where(inArray(rsvps.eventId, userEventIds))
      .leftJoin(rsvps, eq(rsvps.attendeeId, attendees.id))
      .leftJoin(events, eq(events.id, rsvps.eventId))
      .orderBy(desc(rsvps.createdAt))
      .execute()

    // return data ?? []
    return data
  },
  {
    persist: true,
    revalidateTags: () => ['dashboard:rsvps'],
  }
)
