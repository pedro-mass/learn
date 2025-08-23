import type { ToolFn } from '../../types'
import { z } from 'zod'
import { queryMovies } from '../rag/query'

export const movieSearchToolDefinition = {
  name: 'movieSearch',
  parameters: z.object({
    query: z.string().describe('query used to vector search on movies'),
  }),
  description:
    'use this tool to find movies or answer questions about movies and their metada like score, rating, costs, director, actors, and more.',
}

type Args = z.infer<typeof movieSearchToolDefinition.parameters>

export const movieSearch: ToolFn<Args, string> = async ({ toolArgs }) => {
  // const { query, genre, director } = toolArgs

  // const filters = {
  //   ...(genre && { genre }),
  //   ...(director && { director }),
  // }

  let results
  try {
    results = await queryMovies({ query: toolArgs.query })
  } catch (error) {
    console.error(error)
    return 'Error: Could not query the db to get movies.'
  }

  const formattedResults = results.map((result) => ({
    title: result.metadata?.title,
    year: result.metadata?.year,
    genre: result.metadata?.genre,
    director: result.metadata?.director,
    actors: result.metadata?.actors,
    rating: result.metadata?.rating,
    description: result.data,
  }))

  return JSON.stringify(formattedResults, null, 2)
}
