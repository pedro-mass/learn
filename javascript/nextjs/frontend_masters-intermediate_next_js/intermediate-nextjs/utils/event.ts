import { db } from '@/db/db'
import { delay } from './delay'
import { asc, eq } from 'drizzle-orm'
import { events } from '@/db/schema'
import { memoize } from 'nextjs-better-unstable-cache'

export const getEventsForDashboard = memoize(
  async (userId: string) => {
    await delay()

    const data = await db.query.events.findMany({
      where: eq(events.createdById, userId),
      columns: {
        id: true,
        name: true,
        startOn: true,
        status: true,
      },
      with: {
        rsvps: true, // could destructure this too?
      },
      limit: 5,
      orderBy: [asc(events.startOn)],
    })

    return data ?? []
  },
  {
    revalidateTags: () => ['dashboard:events'],
    persist: true,
    // suppressWarnings: true,
    // log: ['datacache', 'verbose', 'dedupe'],
    // logid: 'dashboard:events',
  }
)
