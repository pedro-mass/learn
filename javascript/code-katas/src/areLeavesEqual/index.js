export function depthFirstSearch (tree) {
  let refValue

  function checkNode (node) {
    for (const leaf of Object.values(node)) {
      if (isObject(leaf)) {
        if (!checkNode(leaf)) {
          return false
        }
        continue
      }

      if (refValue === undefined) {
        refValue = leaf
        continue
      }

      if (refValue !== leaf) {
        return false
      }
    }
    return true
  }

  return checkNode(tree)
}

export function breadthFirstSearch (tree) {
  let refValue
  const queue = []
  queue.push(tree)
  while (queue.length > 0) {
    const node = queue.shift()

    if (isObject(node)) {
      queue.push(...Object.values(node))
      continue
    }

    if (refValue === undefined) {
      refValue = node
      continue
    }

    if (node !== refValue) {
      return false
    }
  }

  return true
}

export function dfsWithoutRecursion (tree) {
  let refValue
  const stack = []
  stack.push(tree)
  while (stack.length > 0) {
    const node = stack.pop()

    if (isObject(node)) {
      stack.push(...Object.values(node))
      continue
    }

    if (refValue === undefined) {
      refValue = node
      continue
    }

    if (node !== refValue) {
      return false
    }
  }

  return true
}

function isObject (obj) {
  return typeof obj === 'object'
}
