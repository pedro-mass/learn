import { addMessages, getMessages, saveToolResponse } from './memory'
import { runApprovalCheck, runLLM } from './llm'
import { showLoader, logMessage } from './ui'
import { runTool } from './toolRunner'
import type { AIMessage } from '../types'
import { generateImageToolDefinition } from './tools/generateImage'

const handleImageApprovalFlow = async (
  history: AIMessage[],
  userMessage: string
) => {
  // const lastMessage = history[history.length - 1]
  const lastMessage = history.at(-1)
  const toolCall = lastMessage?.tool_calls?.[0]

  if (
    !toolCall ||
    toolCall.function.name !== generateImageToolDefinition.name
  ) {
    return
  }

  const loader = showLoader(`Processing approval...`)
  const approved = await runApprovalCheck(userMessage)

  if (approved) {
    loader.update(`executing tool: ${toolCall.function.name}`)
    const toolResponse = await runTool(toolCall, userMessage)

    loader.update(`done: ${toolCall.function.name}`)
    await saveToolResponse(toolCall.id, toolResponse)
  } else {
    await saveToolResponse(
      toolCall.id,
      'User did not approve image generation at this time.'
    )
  }

  loader.stop()

  return true
}

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string
  tools: any[]
}) => {
  const history = await getMessages()
  const isApproval = await handleImageApprovalFlow(history, userMessage)

  if (!isApproval) {
    await addMessages([{ role: 'user', content: userMessage }])
  }

  const loader = showLoader('🤔')

  while (true) {
    const history = await getMessages()
    const response = await runLLM({ messages: history, tools })

    await addMessages([response])

    if (response.content) {
      loader.stop()
      logMessage(response)
      return getMessages()
    }

    if (response.tool_calls) {
      const toolCall = response.tool_calls[0]
      logMessage(response)
      loader.update(`executing: ${toolCall.function.name}`)

      if (toolCall.function.name === generateImageToolDefinition.name) {
        loader.update('need user approval')
        loader.stop()
        return getMessages()
      }

      const toolResponse = await runTool(toolCall, userMessage)
      await saveToolResponse(toolCall.id, toolResponse)
      loader.update(`done: ${toolCall.function.name}`)
    }
  }
}
