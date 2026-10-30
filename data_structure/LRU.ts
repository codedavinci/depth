import { DoublyLinkedlist, DoublyNode } from "./";

export class LRUCache<K, V> {
  private readonly map = new Map<K, DoublyNode<K, V>>();
  private readonly cachedList = new DoublyLinkedlist<K, V>();

  constructor(private readonly capacity: number) {
    if (!Number.isInteger(capacity) || capacity < 1) {
      throw new RangeError(
        `Capacity must be a positive integer, got ${capacity}`,
      );
    }
  }

  get size() {
    return this.map.size;
  }

  get(key: K): V | null {
    const node = this.map.get(key);
    if (!node) return null;

    this.cachedList.moveToFront(node);
    return node.value;
  }

  update(key: K, value: V): void {
    const existing = this.map.get(key);

    /** if found just update and do nothing else */
    if (existing) {
      existing.value = value;
      this.cachedList.moveToFront(existing);
      return;
    }

    /** if capacity has reached limit evict one*/
    if (this.cachedList.size === this.capacity) {
      const evicted = this.cachedList.removeLast();
      if (evicted) this.map.delete(evicted.key);
    }

    /** create a new one after maintenance of the cache list order */

    const node = new DoublyNode(key, value);
    this.cachedList.addToFront(node);
    this.map.set(key, node);
  }

  keys(): K[] {
    return this.cachedList.keys();
  }
}
