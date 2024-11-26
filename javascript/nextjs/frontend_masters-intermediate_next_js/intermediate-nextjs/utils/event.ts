import { db } from '@/db/db'
import { delay } from './delay'
import { and, asc, eq } from 'drizzle-orm'
import { events } from '@/db/schema'
import { memoize } from 'nextjs-better-unstable-cache'

export const TAGS = {
  list: 'events',
  single: 'event',
  dashboard: 'dashboard:events',
} as const

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
    revalidateTags: () => [TAGS.dashboard, TAGS.list],
    persist: true,
    // suppressWarnings: true,
    // log: ['datacache', 'verbose', 'dedupe'],
    // logid: tag,
  }
)

export const getAllEvents = memoize(
  async (userId: string) => {
    await delay()

    return db.query.events.findMany({
      where: eq(events.createdById, userId),
      orderBy: [asc(events.startOn)],
    })
  },
  {
    persist: true,
    revalidateTags: () => [TAGS.list],
    suppressWarnings: true,
    logid: TAGS.list,
  }
)

export const getOneEvent = memoize(
  async (userId: string, eventId: string) => {
    await delay()

    return db.query.events.findFirst({
      where: and(eq(events.createdById, userId), eq(events.id, eventId)),
    })
  },
  {
    persist: true,
    revalidateTags: (userId, eventId) => [TAGS.single, eventId],
    suppressWarnings: true,
    logid: TAGS.single,
  }
)
