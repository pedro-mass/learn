import type OpenAI from 'openai'

const getWeather = () => `hot, 90deg`

export const runTool = async (
  toolCall: OpenAI.Chat.ChatCompletionMessageToolCall,
  userMessage: string
  //, userId: string // can be used to limit what the user has access to
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  }

  switch (toolCall.function.name) {
    case 'get_weather':
      return getWeather(input)
    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`)
  }
}
