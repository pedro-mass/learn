export function jumpingOnClouds (clouds) {
  // 0: safe
  // 1: bad
  // can jump: number of current cloud + 1/2
  // can always win

  let index = 0
  const path = []

  while (index < clouds.length - 1) {
    const safeClouds = getSafeClouds(clouds, index)
    if (!safeClouds || safeClouds.length === 0) {
      break
    }
    // naive solution, use the furthest distance
    const nextCloud = Math.max(...safeClouds)

    path.push(nextCloud)
    index = nextCloud
  }

  return path.length
}

export function getSafeClouds (clouds, position) {
  const jumpRange = [1, 2]

  return jumpRange
    .map(range => range + position)
    .filter(location => location < clouds.length)
    .filter(location => clouds[location] === 0)
}
