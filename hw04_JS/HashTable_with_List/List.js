/**
 * Узел списка
 */
class Node {
    constructor(login, passwd) {
        this.login = login;
        this.passwd = passwd;
        this.next = null;
    }

    printNode() {
        console.log(this.login + ": " + this.passwd + ", ");
    }
}

/**
 * Односвязный список, хранящий уникальные логины и хешированные пароли
 */
export class List {
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
     * Вставка узла в конец списка, если логин у узла уникальный
     * @param {*} login значение узла, по которому строится узел
     * @returns экземпляр класса (сам объект)
     */
    add(login, passwd) {
        const newNode = new Node(login, passwd);
        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = this.head;
            return this;
        } else {
            if (this.find(newNode.login)?.login && this.find(newNode.login).login == login) {
                throw new Error("Такой логин уже существует!");
            } else {
                // присваиваем следующему элементу конца новый элемент  
                this.tail.next = newNode; 
                // переопределяем конец на новый элемент
                this.tail = newNode;
                return this;
            }
        }
    }

    /**
     * Функция поиска элемента по заданному значению
     * @param {*} login заданное значение
     * @returns элемент с переданным логином 
     */
    find(login) {
        if (this.head == null) {
            return null;
        }
        let node = this.head;
        while(node != null) {
            if (node.login === login) {
                return node;
            }
            node = node.next;
        }
        return this;
    }

    /**
     * Изменяет все элементы в списке по заданному значению, возвращает null
     * @param {*} login значение, которое будет заменено
     * @param {*} newlogin новое значение узла
     * @returns экземпляр класса (сам объект)
     */
    change(login, newlogin) {
        if (this.head == null) {
            return null;
        }
        let node = this.head;
        while(node != null) {
            if (node.login === login) {
                node.login = newlogin;
            }
            node = node.next;
        }
        return this;
    }

    /**
     * Удаление элемента в списке по заданному значению
     * @param {*} login значение, по которому будет удален узел
     * @returns экземпляр класса (сам объект)
     */
    delete(login) {
        if (this.head == null) {
            return null;
        }
        let deletedNode = null;
        // удаление начального узла
        if (this.head.login == login) {
            deletedNode = this.head;
            this.head = this.head.next;
            
        }
        // удаляем элементы по значению в списке
        let currentNode = this.head;
        if (currentNode != null) {
            while (currentNode.next != null) {
                if (currentNode.next.login == login) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }
        // удаляем конец списка
        if (this.tail.login == login) {
            this.tail = currentNode;
        }
        return this;
    }
    
}

// "тесты"
// let list = new List();
// list.add("qwerty", 1324).add(false, 5453).add(12345, 2355).add("AAAA", 53).add(12345, 43);
// list.change(12345, 909);
// console.log("Длина списка:" + list.length());
// list.find("AAAA").printNode();
// list.delete("AAAA").delete("909").delete("qwerty");

// console.log("Оставшийся список:")
// list.printList();