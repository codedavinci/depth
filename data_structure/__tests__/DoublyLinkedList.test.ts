import { DoublyLinkedlist } from "../DoublyLinkedList";
import { DoublyNode } from "../shared";

const node = (key: number) => new DoublyNode(key, `v${key}`);

describe("DoublyLinkedlist", () => {
  let list: DoublyLinkedlist<number, string>;

  beforeEach(() => {
    list = new DoublyLinkedlist<number, string>();
  });

  it("starts empty", () => {
    expect(list.size).toBe(0);
    expect(list.toArray()).toEqual([]);
    expect(list.toArrayReverse()).toEqual([]);
    expect(list.keys()).toEqual([]);
  });

  it("addToFront prepends nodes", () => {
    list.addToFront(node(1));
    list.addToFront(node(2));
    expect(list.keys()).toEqual([2, 1]);
    expect(list.size).toBe(2);
  });

  it("addToBack appends nodes", () => {
    list.addToBack(node(1));
    list.addToBack(node(2));
    expect(list.toArray()).toEqual(["v1", "v2"]);
    expect(list.toArrayReverse()).toEqual(["v2", "v1"]);
  });

  it("remove unlinks a node in the middle", () => {
    const [a, b, c] = [node(1), node(2), node(3)];
    [a, b, c].forEach((n) => list.addToBack(n));

    expect(list.remove(b)).toBe(true);
    expect(list.keys()).toEqual([1, 3]);
    expect(list.size).toBe(2);
    expect(b.prev).toBeNull();
    expect(b.next).toBeNull();
  });

  it("remove returns false for a node not in the list", () => {
    expect(list.remove(node(1))).toBe(false);
    expect(list.size).toBe(0);
  });

  it("remove returns false when removing the same node twice", () => {
    const a = node(1);
    list.addToBack(a);
    expect(list.remove(a)).toBe(true);
    expect(list.remove(a)).toBe(false);
    expect(list.size).toBe(0);
  });

  it("moveToFront moves an existing node to the head", () => {
    const [a, b, c] = [node(1), node(2), node(3)];
    [a, b, c].forEach((n) => list.addToBack(n));

    list.moveToFront(c);
    expect(list.keys()).toEqual([3, 1, 2]);
    expect(list.size).toBe(3);
  });

  it("moveToFront is a no-op for the first node or a detached node", () => {
    const a = node(1);
    list.addToBack(a);
    list.addToBack(node(2));

    list.moveToFront(a);
    list.moveToFront(node(99));
    expect(list.keys()).toEqual([1, 2]);
    expect(list.size).toBe(2);
  });

  it("moveToBack moves an existing node to the tail", () => {
    const [a, b, c] = [node(1), node(2), node(3)];
    [a, b, c].forEach((n) => list.addToBack(n));

    list.moveToBack(a);
    expect(list.keys()).toEqual([2, 3, 1]);
    expect(list.size).toBe(3);
  });

  it("moveToBack is a no-op for the last node or a detached node", () => {
    const b = node(2);
    list.addToBack(node(1));
    list.addToBack(b);

    list.moveToBack(b);
    list.moveToBack(node(99));
    expect(list.keys()).toEqual([1, 2]);
    expect(list.size).toBe(2);
  });

  it("removeFirst and removeLast return the removed nodes", () => {
    const [a, b, c] = [node(1), node(2), node(3)];
    [a, b, c].forEach((n) => list.addToBack(n));

    expect(list.removeFirst()).toBe(a);
    expect(list.removeLast()).toBe(c);
    expect(list.keys()).toEqual([2]);
    expect(list.size).toBe(1);
  });

  it("removeFirst and removeLast return undefined on an empty list", () => {
    expect(list.removeFirst()).toBeUndefined();
    expect(list.removeLast()).toBeUndefined();
    expect(list.size).toBe(0);
  });
});
