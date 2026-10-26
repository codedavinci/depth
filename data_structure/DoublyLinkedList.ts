import { DoublyNode } from "./shared";

export class DoublyLinkedlist<K, V> {
  private readonly head: DoublyNode<K, V>;
  private readonly tail: DoublyNode<K, V>;
  size = 0;

  constructor() {
    this.head = new DoublyNode<K, V>(undefined as K, undefined as V);
    this.tail = new DoublyNode<K, V>(undefined as K, undefined as V);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }

  //// O(1)
  addToFront(node: DoublyNode<K, V>): void {
    const first = this.head.next!;

    node.prev = this.head;
    node.next = first;

    this.head.next = node;
    first.prev = node;

    this.size++;
  }

  // O(1)
  addToBack(node: DoublyNode<K, V>): void {
    const last = this.tail.prev!;

    node.prev = last;
    node.next = this.tail;

    last.next = node;
    this.tail.prev = node;

    this.size++;
  }

  // O(1): this is the reason prev exists
  remove(node: DoublyNode<K, V>): boolean {
    if (!node.prev || !node.next) return false;

    const before = node.prev!;
    const after = node.next!;

    before.next = after;
    after.prev = before;

    node.prev = null;
    node.next = null;

    this.size--;

    return true;
  }
  // O(1)
  moveToFront(node: DoublyNode<K, V>): void {
    if (this.head.next === node) return;
    if (!this.remove(node)) return;
    this.addToFront(node);
  }

  // O(1)
  moveToBack(node: DoublyNode<K, V>): void {
    if (this.tail.prev === node) return;
    if (!this.remove(node)) return;
    this.addToBack(node);
  }

  // O(1)
  removeFirst(): DoublyNode<K, V> | undefined {
    const first = this.head.next!;
    return this.remove(first) ? first : undefined;
  }

  removeLast(): DoublyNode<K, V> | undefined {
    const last = this.tail.prev!;
    return this.remove(last) ? last : undefined;
  }

  toArray(): V[] {
    const result: V[] = [];
    let current = this.head.next!;

    while (current !== this.tail) {
      result.push(current.value);
      current = current.next!;
    }

    return result;
  }

  toArrayReverse(): V[] {
    const result: V[] = [];
    let current = this.tail.prev!;

    while (current !== this.head) {
      result.push(current.value);
      current = current.prev!;
    }
    return result;
  }

  keys(): K[] {
    const result: K[] = [];
    let current = this.head.next!;
    while (current !== this.tail) {
      result.push(current.key);
      current = current.next!;
    }
    return result;
  }
}
