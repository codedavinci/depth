export class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class DoublyNode<K, V> {
  key: K;
  value: V;
  prev: DoublyNode<K, V> | null = null;
  next: DoublyNode<K, V> | null = null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}
