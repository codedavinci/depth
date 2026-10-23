import { DoublyLinkedlist, DoublyNode } from "./data_structure";

const node = new DoublyNode<number, string>(1, "foo");
const node2 = new DoublyNode<number, string>(2, "bar");

const dList = new DoublyLinkedlist<number, string>();

dList.addToFront(node);
dList.addToBack(node2);

console.log(dList);
