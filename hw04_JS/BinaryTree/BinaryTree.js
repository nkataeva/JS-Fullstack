/**
 * Узел бинарного дерева поиска
 */
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

/**
 * Бинарное дерево поиска
 */
class BinaryTree {
    constructor() {
        this.root = null;
    }

    /**
     * Добавление элемента в дерево
     * @param {*} value значение узла
     * @returns экземпляр класса (сам объект)
     */
    add(value) {
        let newNode = new Node(value);
        if (this.root == null) {
            this.root = newNode;
            return this;
        } else {
            this.addNode(this.root, newNode);
        }
        return this;
    }

    /**
     * Добавление элемента после конкретного узла
     * @param {*} currentNode текущий узел
     * @param {*} newNode новый узел
     * @returns экземпляр класса (сам объект)
     */
    addNode(currentNode, newNode) {
        if (currentNode.value > newNode.value) {
            if (currentNode.left == null) {
                currentNode.left = newNode;
                return this;
            } else {
                this.addNode(currentNode.left, newNode);
            }
        } else {
            if (currentNode.right == null) {
                currentNode.right = newNode;
                return this;
            } else {
                this.addNode(currentNode.right, newNode);
            }
        }
    }

    count() {
        let count = 0;
        let currentNode = this.root;
        let left = null;
        while (currentNode != null) {
            count++;
            currentNode = currentNode.left;
        }
        return count;
    }

    print() {
        let currentNode = this.root;
        if (currentNode != null) {
            
        }
    }
}

let tree = new BinaryTree();
tree.add(6).add(10).add(3).add(12);
console.log(tree);
console.log(tree.count());