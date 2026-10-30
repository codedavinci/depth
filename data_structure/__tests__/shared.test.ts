import { DoublyNode, ListNode } from "../shared";

describe("ListNode", () => {
  it("stores the value and starts with no next", () => {
    const node = new ListNode(42);
    expect(node.value).toBe(42);
    expect(node.next).toBeNull();
  });

  it("can be linked to another node", () => {
    const a = new ListNode("a");
    const b = new ListNode("b");
    a.next = b;
    expect(a.next).toBe(b);
    expect(b.next).toBeNull();
  });
});

describe("DoublyNode", () => {
  it("stores key and value and starts unlinked", () => {
    const node = new DoublyNode(1, "foo");
    expect(node.key).toBe(1);
    expect(node.value).toBe("foo");
    expect(node.prev).toBeNull();
    expect(node.next).toBeNull();
  });
});
