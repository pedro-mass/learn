import type { AIMessage } from '../types'
import { openai } from './ai'
import { zodFunction } from 'openai/helpers/zod'

export const runLLM = async ({
  messages,
  tools,
}: {
  messages: AIMessage[]
  tools: any[]
}) => {
  const formattedTools = tools.map(zodFunction)

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.1, // how creative the model is, higher = more creative | reduces the randomness of the model
    messages,
    tools: formattedTools,
    tool_choice: 'auto', // let the AI figure it out
    parallel_tool_calls: false, // easier to debug
  })

  return response.choices[0].message
}
