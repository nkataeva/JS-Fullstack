/**
 * Узел списка смежностей графа
 */
 class Node {
    vertex: string;
    weight: number;
    next: Node | null;
    constructor(vertex: string, weight: number) {
        this.vertex = vertex;
        this.weight = weight;
        this.next = null;
    }

    printNode() {
        console.log(this.vertex + ", " + this.weight);
    }
}

/**
 * Односвязный список смежностей графа
 */
export class List {
    head: Node | null;
    tail: Node | null;

    constructor() {    
        this.head = null;
        this.tail = null;
    }

    printList() {
        let node = this.head;
        while(node != null) {
            node.printNode();
            node = node.next;
        }
    }

    /**
     * Определяет количество узлов в списке
     * @returns количество узлов
     */
    length() {
        if (this.head == null) {
            return 0;
        }
        let count = 0;
        let node: Node | null = this.head;
        while (node != null) {
            count++;
            node = node.next;
        }
        return count;
    }

    /**
     * Вставка узла в конец списка
     * @param {*} vertex значение узла, по которому строится узел
     * @returns экземпляр класса (сам объект)
     */
    add(vertex: string, weight: number): List {
        const newNode = new Node(vertex, weight);
        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        } else {
          // присваиваем следующему элементу конца новый элемент  
          this.tail.next = newNode; 
          // переопределяем конец на новый элемент
          this.tail = newNode; 
          return this;
        }
    }

    /**
     * Функция поиска элемента по заданному значению
     * @param {*} vertex заданное значение
     * @returns первый встретившийся в списке элемент с заданным значением 
     */
    find(vertex: string) : Node | null {
        if (this.head == null) {
            return null;
        }
        let node: Node | null = this.head;
        while(node != null) {
            if (node.vertex === vertex) {
                return node;
            }
            node = node.next;
        }
        return null;
    }

    /**
     * Изменяет все элементы в списке по заданному значению, возвращает null
     * @param {*} vertex значение, которое будет заменено
     * @param {*} newValue новое значение узла
     * @returns экземпляр класса (сам объект)
     */
    change(vertex: string, newValue: number): List | null {
        if (this.head == null) {
            return null;
        }
        let node: Node | null = this.head;
        while(node != null) {
            if (node.vertex === vertex) {
                node.weight = newValue;
            }
            node = node.next;
        }
        return this;
    }

    /**
     * Удаление всех элементов в списке по заданному значению
     * @param {*} vertex значение, по которому будут удалены узлы
     * @returns экземпляр класса (сам объект)
     */
    delete(vertex: string): List | null {
        if (this.head == null) {
            return null;
        }
        let deletedNode: Node | null = null;
        // удаление начального узла
        if (this.head.vertex == vertex) {
            deletedNode = this.head;
            this.head = this.head.next;
        }
        // удаляем элементы по значению в списке
        let currentNode = this.head;
        if (currentNode != null) {
            while (currentNode.next != null) {
                if (currentNode.next.vertex == vertex) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }
        // удаляем конец списка
        if (this.tail?.vertex == vertex) {
            this.tail = currentNode;
        }
        return this;
    }
    
}