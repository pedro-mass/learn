import OpenAI from 'openai'

export type AIMessage =
  | OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam
  | { role: 'user'; content: string }
  | { role: 'tool'; content: string; tool_call_id: string }

export interface ToolFn<A = any, T = any> {
  (input: { userMessage: string; toolArgs: A }): Promise<T>
}
export interface Score {
  name: string
  score: number
}

export interface Run {
  input: string
  output: {
    role: string
    content: string | null
    tool_calls?: any[]
    refusal: null
  }
  expected: string
  scores: Score[]
  createdAt: string
}

export interface Set {
  runs: Run[]
  score: number
  createdAt: string
}

export interface Experiment {
  name: string
  sets: Set[]
}

export interface Results {
  experiments: Experiment[]
}
