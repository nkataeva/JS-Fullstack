/**
 * Узел списка
 */
 class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }

    printNode() {
        console.log(this.value);
    }
}

/**
 * Односвязный список
 */
class List {
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
        let node = this.head;
        while (node != null) {
            count++;
            node = node.next;
        }
        return count;
    }

    /**
     * Вставка узла в конец списка
     * @param {*} value значение узла, по которому строится узел
     * @returns экземпляр класса (сам объект)
     */
    add(value) {
        const newNode = new Node(value);
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
     * @param {*} value заданное значение
     * @returns первый встретившийся в списке элемент с заданным значением 
     */
    find(value) {
        if (this.head == null) {
            return null;
        }
        let node = this.head;
        while(node != null) {
            if (node.value === value) {
                return node;
            }
            node = node.next;
        }
        return this;
    }

    /**
     * Изменяет все элементы в списке по заданному значению, возвращает null
     * @param {*} value значение, которое будет заменено
     * @param {*} newValue новое значение узла
     * @returns экземпляр класса (сам объект)
     */
    change(value, newValue) {
        if (this.head == null) {
            return null;
        }
        let node = this.head;
        while(node != null) {
            if (node.value === value) {
                node.value = newValue;
            }
            node = node.next;
        }
        return this;
    }

    /**
     * Удаление всех элементов в списке по заданному значению
     * @param {*} value значение, по которому будут удалены узлы
     * @returns экземпляр класса (сам объект)
     */
    delete(value) {
        if (this.head == null) {
            return null;
        }
        let deletedNode = null;
        // удаление начального узла
        if (this.head.value == value) {
            deletedNode = this.head;
            this.head = this.head.next;
        }
        // удаляем элементы по значению в списке
        let currentNode = this.head;
        if (currentNode != null) {
            while (currentNode.next != null) {
                if (currentNode.next.value == value) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }
        // удаляем конец списка
        if (this.tail.value == value) {
            this.tail = currentNode;
        }
        return this;
    }
    
}

// "тесты"
let list = new List();
list.add("qwerty").add(false).add(12345).add("AAAA").add("234erfd3").add(12345);
list.change(12345, 909);
console.log("Длина списка:" + list.length());
list.find("AAAA").printNode();
list.delete("AAAA").delete("909").delete("qwerty");

console.log("Оставшийся список:")
list.printList();