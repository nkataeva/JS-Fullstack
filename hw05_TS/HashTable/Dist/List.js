class Node {
    constructor(login, passwd) {
        this.login = login;
        this.passwd = passwd;
        this.next = null;
    }
    printNode() {
        console.log(`${this.login}: ${this.passwd},`);
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
    add(login, passwd) {
        var _a, _b;
        const newNode = new Node(login, passwd);
        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = this.head;
            return this;
        }
        else {
            if (((_a = this.find(newNode.login)) === null || _a === void 0 ? void 0 : _a.login) && ((_b = this.find(newNode.login)) === null || _b === void 0 ? void 0 : _b.login) == login) {
                throw new Error("Такой логин уже существует!");
            }
            else {
                this.tail.next = newNode;
                this.tail = newNode;
                return this;
            }
        }
    }
    find(login) {
        if (this.head == null) {
            return null;
        }
        let node = this.head;
        while (node != null) {
            if (node.login === login) {
                return node;
            }
            node = node.next;
        }
        return null;
    }
    change(login, newlogin) {
        if (this.head == null) {
            return null;
        }
        let node = this.head;
        while (node != null) {
            if (node.login === login) {
                node.login = newlogin;
            }
            node = node.next;
        }
        return this;
    }
    delete(login) {
        var _a;
        if (this.head == null) {
            return null;
        }
        let deletedNode = null;
        if (this.head.login == login) {
            deletedNode = this.head;
            this.head = this.head.next;
        }
        let currentNode = this.head;
        if (currentNode != null) {
            while (currentNode.next != null) {
                if (currentNode.next.login == login) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                }
                else {
                    currentNode = currentNode.next;
                }
            }
        }
        if (((_a = this.tail) === null || _a === void 0 ? void 0 : _a.login) == login) {
            this.tail = currentNode;
        }
        return this;
    }
}
//# sourceMappingURL=List.js.map