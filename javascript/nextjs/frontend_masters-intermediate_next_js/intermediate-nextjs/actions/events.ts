'use server'

import { db } from '@/db/db'
import { events } from '@/db/schema'
import { delay } from '@/utils/delay'
import { TAGS as EVENT_TAGS } from '@/utils/event'
import { getCurrentUser } from '@/utils/users'
import randomName from '@scaleway/random-name'
import { revalidateTag } from 'next/cache'

// use server says that the client can use this file, and it will execute on the server
// versus `import 'server-only'` which would not be available to the client

export async function createNewEvent() {
  await delay(1000)

  const user = await getCurrentUser()

  await db.insert(events).values({
    startOn: new Date().toUTCString(),
    createdById: user.id,
    isPrivate: false,
    name: randomName('event', ' '),
  })

  // todo: invalidate the events tag
  revalidateTag(EVENT_TAGS.list)
  // revalidateTag(EVENT_TAGS.dashboard)
}
