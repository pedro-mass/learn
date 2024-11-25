import 'server-only'
import { delay } from './delay'
import { db } from '@/db/db'
import { attendees, events, rsvps } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'
import { memoize } from 'nextjs-better-unstable-cache'

export const getAttendeesCountForDashboard = memoize(
  async (userId: string) => {
    await delay() // simulate network delay

    const counts = await db
      .select({
        totalAttendees: sql<number>`count(distinct ${attendees.id})`,
      })
      .from(events)
      .leftJoin(rsvps, eq(rsvps.eventId, events.id))
      .leftJoin(attendees, eq(attendees.id, rsvps.attendeeId))
      .where(eq(events.createdById, userId))
      .groupBy(events.id)
      .execute()

    const total = counts.reduce((acc, count) => acc + count.totalAttendees, 0)
    return total
  },
  {
    persist: true,
    revalidateTags: () => ['dashboard:attendees'],
    suppressWarnings: true, // warnings would be about using this function in a client component BUT this warnings is already covered by `import 'server-only`
    log: ['datacache', 'verbose', 'dedupe'],
    logid: 'dashboard:attendees',
  }
)
