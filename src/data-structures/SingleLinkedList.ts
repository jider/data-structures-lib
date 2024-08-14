import type {SllNullableNode} from './types'

export class Node {
  public next: SllNullableNode = null

  constructor(public value: any) {
  }
}


export class SingleLinkedList {
  public length: number
  public head: SllNullableNode = null
  public tail: SllNullableNode = null

  constructor() {
    this.length = 0
  }

  get(idx: number) {
    if (!this.head || idx < 0 || idx >= this.length) return null

    let counter = 0
    let node: SllNullableNode = this.head
    while (counter < idx) {
      node = node.next!
      counter++
    }
    return node
  }

  insert(idx: number, value: any) {
    if (idx < 0 || idx > this.length) return false
    if (idx === 0) return !!this.unshift(value)
    if (idx === this.length) return !!this.push(value)

    const prevNode = this.get(idx - 1)!
    const newNode = new Node(value)
    newNode.next = prevNode.next
    prevNode.next = newNode
    this.length += 1
    return true
  }

  pop() {
    if (!this.head) return undefined

    let currentNode = this.head
    let newTail = currentNode
    while (currentNode.next) {
      newTail = currentNode
      currentNode = currentNode.next
    }
    this.tail = newTail
    this.tail.next = null
    this.length -= 1
    if (this.length === 0) {
      this.head = this.tail = null
    }

    return currentNode
  }

  push(value: any) {
    const newNode = new Node(value)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail!.next = newNode
      this.tail = newNode
    }

    this.length += 1

    return this
  }

  remove(idx: number) {
    if (idx < 0 || idx >= this.length) return undefined
    if (idx === 0) return !!this.shift()
    if (idx === this.length - 1) return !!this.pop()

    const prevNode = this.get(idx - 1)!
    const nodeToRemove = prevNode.next
    prevNode.next = nodeToRemove!.next
    this.length -= 1
    return nodeToRemove
  }

  reverse() {
    let node = this.head
    this.head = this.tail
    this.tail = node

    let prevNode = null
    let nextNode = null
    while (node) {
      nextNode = node.next
      node.next = prevNode
      prevNode = node
      node = nextNode
    }
    return this
  }

  set(idx: number, value: any) {
    const node = this.get(idx)
    if (node) {
      node.value = value
      return true
    }
    return false
  }

  shift() {
    if (!this.head) return undefined

    const currentHead = this.head
    this.head = this.head.next
    this.length -= 1
    if (this.length === 0) {
      this.head = this.tail = null
    }

    return currentHead
  }

  traverse() {
    let currentNode = this.head
    while (currentNode) {
      console.log(currentNode.value)
      currentNode = currentNode.next
    }
  }

  unshift(value: any) {
    const newHead = new Node(value)
    if (!this.head) {
      this.head = this.tail = newHead
    } else {
      newHead.next = this.head
      this.head = newHead
    }

    this.length += 1

    return this
  }
}
