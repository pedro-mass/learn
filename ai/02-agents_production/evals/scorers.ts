import type { Scorer } from 'autoevals'

// you would think that Scorer<AIMessage, {}> would be better, but because it's run in an array of scorers, you could actually limit yourself to one type of scorer
export const ToolCallMatch: Scorer<any, {}> = async ({
  // input,
  output,
  expected,
}) => {
  const isAssistant = output.role === 'assistant'
  const hasToolCalls =
    Array.isArray(output.tool_calls) && output.tool_calls.length === 1
  const toolCallNameMatch =
    output.tool_calls?.[0]?.function?.name ===
    expected?.tool_calls?.[0]?.function?.name

  const score = isAssistant && hasToolCalls && toolCallNameMatch ? 1 : 0

  return {
    name: 'ToolCallMatch',
    score,
  }
}
