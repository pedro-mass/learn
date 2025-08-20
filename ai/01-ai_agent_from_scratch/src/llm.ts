import type { AIMessage } from '../types'
import { openai } from './ai'

export const runLLM = async ({ messages }: { messages: AIMessage[] }) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.1, // how creative the model is, higher = more creative | reduces the randomness of the model
    messages,
  })

  return response.choices[0].message.content
}
