// const _ = require('lodash')

class BNode {
  constructor (value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

/**
 * BFS vs DFS
 * - time complexity
 *  - same, b/c we're visiting all the same nodes
 * - space:
 *  - deep trees: BFS, less space on heap
 *  - wide trees: DFS, less space on queue (visited queue)
 *
 * DFS:
 * - in-order: gives an ordered list
 * - pre-order: snapshot of the tree, allows to rebuild the tree
 * - post-order:
 */

class BinarySearchTree {
  constructor () {
    this.root = null
  }

  insert (value) {
    const newNode = new BNode(value)

    if (this.root === null) {
      this.root = newNode
      return this
    }

    let current = this.root
    while (true) {
      if (value === current.value) {
        return undefined
      }

      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode
          return this
        }
        current = current.left
        continue
      }

      if (value > current.value) {
        if (current.right === null) {
          current.right = newNode
          return this
        }
        current = current.right
        continue
      }
    }
  }

  includes (value) {
    if (this.root === null) {
      return false
    }

    let current = this.root
    while (current) {
      if (current.value === value) {
        return true
      }

      if (value < current.value) {
        current = current.left
        continue
      }

      current = current.right
    }

    return false
  }

  /**
   * create a queue and a variable to store the values of nodes visited
   * place root in the queue
   * loop until the queue is empty
   * dequeue/shift off the queue, push value into return value
   * if there is left: add to queue
   * if there is a right: add to queue
   */
  breadFirst () {
    const queue = []
    const visited = []

    queue.push(this.root)
    while (queue.length > 0) {
      const node = queue.shift()

      visited.push(node.value)

      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }

    return visited
  }

  // DFS: easier to do w/recursion
  depthFirstPreOrder () {
    // create variable to store visited
    const visited = []

    // helper that accepts a node
    function traverse (node) {
      // Pre: adding to queue immediately
      visited.push(node.value)

      if (node.left) {
        traverse(node.left)
      }

      if (node.right) {
        traverse(node.right)
      }
    }
    traverse(this.root)

    return visited
  }
  depthFirstInOrder () {
    // create variable to store visited
    const visited = []

    // helper that accepts a node
    function traverse (node) {
      if (node.left) {
        traverse(node.left)
      }

      // In-ORDER: add after All of left
      visited.push(node.value)

      if (node.right) {
        traverse(node.right)
      }
    }
    traverse(this.root)

    return visited
  }
  depthFirstPostOrder () {
    // create variable to store visited
    const visited = []

    // helper that accepts a node
    function traverse (node) {
      if (node.left) {
        traverse(node.left)
      }

      if (node.right) {
        traverse(node.right)
      }

      // POST: adding to queue at end
      visited.push(node.value)
    }
    traverse(this.root)

    return visited
  }

  get DFS_TYPES () {
    return ({
      inOrder: 'inOrder',
      preOrder: 'preOrder',
      postOrder: 'postOrder',
    })
  }

  depthFirst (type = this.DFS_TYPES.inOrder) {
    const TYPES = {
      [this.DFS_TYPES.inOrder]: [left, add, right],
      [this.DFS_TYPES.preOrder]: [add, left, right],
      [this.DFS_TYPES.postOrder]: [left, right, add],
    }
    const operations = TYPES[type] || TYPES[this.DFS_TYPES.inOrder]

    const visited = []
    function traverse (node) {
      operations.forEach(fn => fn({ traverse, node, visited }))
    }

    function add ({ node, visited }) {
      visited.push(node.value)
    }

    function left ({ traverse, node }) {
      if (node.left) {
        traverse(node.left)
      }
    }

    function right ({ traverse, node }) {
      if (node.right) {
        traverse(node.right)
      }
    }

    traverse(this.root)
    return visited
  }
}

//        10
//    5       13
//  2   7   11  16

const tree = new BinarySearchTree()
tree.insert(10)
tree.insert(6)
tree.insert(15)
tree.insert(3)
tree.insert(8)
tree.insert(20)
console.log({
  // tree: JSON.stringify(tree, null, 2),
  bfs: tree.breadFirst(),
  'dfs-Pre-1': tree.depthFirstPreOrder(),
  'dfs-pre-2': tree.depthFirst(tree.DFS_TYPES.preOrder),
  'dfs-In-1': tree.depthFirstInOrder(),
  'dfs-in-2': tree.depthFirst(tree.DFS_TYPES.inOrder),
  'dfs-in-3': tree.depthFirst(),
  'dfs-Post-1': tree.depthFirstPostOrder(),
  'dfs-post-2': tree.depthFirst(tree.DFS_TYPES.postOrder),
})
