/**
 * Узел бинарного дерева поиска
 */
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    printValue() {
        console.log(this.value);
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

    heightTree(root) {
        return 1 + Math.max(
            root.left !== null ? this.heightTree(root.left) : 0,
            root.right !== null ? this.heightTree(root.right) : 0
        );
    }

    find(node, value) {
        if (node === null) {
            return null;
        } else if (value < node.value) {
            return this.find(node.left, value);
        } else if (value > node.value) {
            return this.find(node.right, value);
        } else {
            return node;
        }
    }

    print() {
        let currentNode = this.root;
        this.printSubtree(currentNode);
    }

    printSubtree(node) {
        // прямой обход
        if (node != null) {
            if (node.left != null) {
                this.printSubtree(node.left);
            }
            node.printValue();
            if (node.right != null) {
                this.printSubtree(node.right);
            }
        }
    }

    minNode(node) {
        if (node.left == null) {
            return node;
        } else {
            return this.minNode(node.left);
        }
    }

    delete(value) {
        this.deleteNode(this.root, value);
        return this;
    }

    deleteNode(node, value) {
        if (node == null) {
            return null;
        }

        if (value > node.value && node.right) {
            node.right = this.deleteNode(node.right, value);
            return node;
        } else if (value < node.value && node.left) {
            node.left = this.deleteNode(node.left, value);
            return node;
        } else {

            // узел без потомков
            if (node.right == null && node.right == null) {
                node = null;
                return node;
            }

            // узел с одним потомком
            if (node.left == null) {
                node = node.right;
                return node;
            } else if (node.right == null) {
                node = node.left;
                return node;
            }

            //узел с двумя потомками
            let replc = this.minNode(node.right);
            node.value = replc.value;
            node.right = this.deleteNode(node.right, replc.value);
            return node;
        }
    }
}

// тест-драйв
let tree = new BinaryTree();
tree.add(6).add(10).add(3).add(12).add(19).add(17).add(2).add(4).add(11).add(25);
tree.print();
console.log("Height: " + tree.heightTree(tree.root));
console.log(tree.find(tree.root, 19));
tree.delete(12);
tree.print();

console.log("Height: " + tree.heightTree(tree.root));
tree.delete(6);
tree.print();
console.log("Height: " + tree.heightTree(tree.root));
console.log(tree.root);