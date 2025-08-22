import z from 'zod'
import type { ToolFn } from '../../types'

export const dadJokeToolDefinition = {
  name: 'get_dad_joke',
  parameters: z.object({}), // creator's choice to get around past problems with OpenAI's tool calling
  description: 'Get a dad joke',
}

type Args = z.infer<typeof dadJokeToolDefinition.parameters>

export const dadJoke: ToolFn<Args, string> = async () => {
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  })
  return ((await res.json()) as { joke: string }).joke
}
