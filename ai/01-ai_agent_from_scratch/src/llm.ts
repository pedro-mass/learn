import { openai } from './ai'

export const runLLM = async ({ userMessage }: { userMessage: string }) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.1, // how creative the model is, higher = more creative | reduces the randomness of the model
    messages: [
      {
        role: 'user',
        content: userMessage,
      },
    ],
  })

  return response.choices[0].message.content
}
