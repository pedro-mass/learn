import 'dotenv/config'
import { Index as UpstashIndex } from '@upstash/vector'
import { parse } from 'csv-parse/sync'
import fs from 'fs'
import path from 'path'
import ora from 'ora'

// Initialize Upstash Vector client
const index = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL as string,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN as string,
})

// Function to index IMDB movie data
export async function indexMovieData() {
  const spinner = ora('Reading movie data...').start()

  // Read and parse CSV file
  // if this was a big file, we would need to stream it in chunks
  const csvPath = path.join(process.cwd(), 'src/rag/imdb_movie_dataset.csv')
  const csvData = fs.readFileSync(csvPath, 'utf-8')
  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
  })

  spinner.text = 'Starting movie indexing...'

  // Index each movie
  for (const movie of records) {
    spinner.text = `Indexing movie: ${movie.Title}`
    //  since this text is small, we didn't have to worry about a chunking strategy
    const text = `${movie.Title}. ${movie.Genre}. ${movie.Description}`

    try {
      // creator chose to do this one at a time, but we could've passed in an array of movies
      // he did this for dramtic effect
      await index.upsert({
        id: movie.Title, // Using Rank as unique ID
        // data is what you want to use for search
        data: text, // Text will be automatically embedded
        metadata: {
          title: movie.Title,
          year: Number(movie.Year),
          genre: movie.Genre,
          director: movie.Director,
          actors: movie.Actors,
          rating: Number(movie.Rating),
          votes: Number(movie.Votes),
          revenue: Number(movie.Revenue),
          metascore: Number(movie.Metascore),
        },
      })
    } catch (error) {
      spinner.fail(`Error indexing movie ${movie.Title}`)
      console.error(error)
    }
  }

  spinner.succeed('All movies indexed!')
}
indexMovieData()
