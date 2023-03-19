// const _ = require('lodash')

class BNode {
  constructor (value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

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
}

//        10
//    5       13
//  2   7   11  16

const tree = new BinarySearchTree()
tree.insert(10)
tree.insert(5)
tree.insert(13)
tree.insert(11)
tree.insert(2)
tree.insert(16)
tree.insert(7)
tree.insert(3)
console.log(JSON.stringify({ 77: tree.includes(77), 5: tree.includes(5) }, null, 2))
