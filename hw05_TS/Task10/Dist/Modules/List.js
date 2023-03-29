class Node {
    constructor(vertex, weight) {
        this.vertex = vertex;
        this.weight = weight;
        this.next = null;
    }
    printNode() {
        console.log(this.vertex + ", " + this.weight);
    }
}
export class List {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    printList() {
        let node = this.head;
        while (node != null) {
            node.printNode();
            node = node.next;
        }
    }
    length() {
        if (this.head == null) {
            return 0;
        }
        let count = 0;
        let node = this.head;
        while (node != null) {
            count++;
            node = node.next;
        }
        return count;
    }
    add(vertex, weight) {
        const newNode = new Node(vertex, weight);
        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        else {
            this.tail.next = newNode;
            this.tail = newNode;
            return this;
        }
    }
    find(vertex) {
        if (this.head == null) {
            return null;
        }
        let node = this.head;
        while (node != null) {
            if (node.vertex === vertex) {
                return node;
            }
            node = node.next;
        }
        return null;
    }
    change(vertex, newValue) {
        if (this.head == null) {
            return null;
        }
        let node = this.head;
        while (node != null) {
            if (node.vertex === vertex) {
                node.weight = newValue;
            }
            node = node.next;
        }
        return this;
    }
    delete(vertex) {
        var _a;
        if (this.head == null) {
            return null;
        }
        let deletedNode = null;
        if (this.head.vertex == vertex) {
            deletedNode = this.head;
            this.head = this.head.next;
        }
        let currentNode = this.head;
        if (currentNode != null) {
            while (currentNode.next != null) {
                if (currentNode.next.vertex == vertex) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                }
                else {
                    currentNode = currentNode.next;
                }
            }
        }
        if (((_a = this.tail) === null || _a === void 0 ? void 0 : _a.vertex) == vertex) {
            this.tail = currentNode;
        }
        return this;
    }
}
//# sourceMappingURL=List.js.map