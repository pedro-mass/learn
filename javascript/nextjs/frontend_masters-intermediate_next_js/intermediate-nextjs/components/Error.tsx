export function Error({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error)
  return (
    <div>
      <h2>Something bad happened :( </h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
