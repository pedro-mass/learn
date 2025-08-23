import { Index as UpstashIndex } from '@upstash/vector'

// Initialize Upstash Vector client
const index = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL as string,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN as string,
})
// index is for global data
// index.namespace can be used for data that is specific to a certain user
// e.g. index.namespace('user_123').query({ data: 'query', topK: 5 })
// you could also add the userId to the metadata, and filter on that
// namespace works better as a database level partition

type MovieMetadata = {
  title?: string
  year?: string
  genre?: string
  director?: string
  actors?: string
  rating?: string
  votes?: string
  revenue?: string
  metascore?: string
}

export const queryMovies = async ({
  query,
  filters,
  topK = 5,
}: {
  query: string
  filters?: any
  topK?: number
}) => {
  // Build filter string if filters provided
  // this is a naive implementation, but it's good enough for now
  // let filterStr = ''
  // if (filters) {
  //   const filterParts = Object.entries(filters)
  //     .filter(([_, value]) => value !== undefined)
  //     .map(([key, value]) => `${key}='${value}'`)

  //   if (filterParts.length > 0) {
  //     filterStr = filterParts.join(' AND ')
  //   }
  // }

  // Query the vector store
  const results = await index.query({
    data: query,
    topK,
    // filter: filterStr || undefined,
    includeMetadata: true,
    includeData: true,
  })

  return results
}
