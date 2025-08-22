import type { ToolFn } from '../../types'
import { z } from 'zod'
import fetch from 'node-fetch'

export const redditToolDefinition = {
  name: 'reddit',
  parameters: z.object({}),
  description: 'get the latest posts from reddit',
}

type Args = z.infer<typeof redditToolDefinition.parameters>

export const reddit: ToolFn<Args, string> = async () => {
  const res = await fetch('https://www.reddit.com/r/nba.json')
  const { data } = (await res.json()) as {
    data: {
      children: {
        data: {
          title: string
          url: string
          subreddit_name_prefixed: string
          author: string
          ups: number
        }[]
      }[]
    }
  }

  const relevantInfo = data.children.map((child: any) => ({
    title: child.data.title,
    link: child.data.url,
    subreddit: child.data.subreddit_name_prefixed,
    author: child.data.author,
    upvotes: child.data.ups,
  }))

  return JSON.stringify(relevantInfo, null, 2) // creator believes that this helps the LLM for some reason - he likes treating the LLM like a human, and this would help a human read it
}
