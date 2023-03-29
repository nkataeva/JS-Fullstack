import {List} from './List.js'
import {generate} from 'password-hash'

/**
 * Хеш таблица с разрешением коллизий методом цепочек
 */
class HashTable {
    bucket: Array<List>;

    constructor(size: number) {
        this.bucket = new Array(size).fill(null);
    }

    /**
     * Хеш-функция для вычисления индекса(хеш логина)
     * @param {*} login логин, который будет хешироваться
     * @returns хешированный логин
     */
    hashLogin(login: string) {
        let hash = 0;
        for (let i = 0; i < login.length; i++) {
            hash += login.charCodeAt(i);
        }
        return hash % this.bucket.length;
    }

    /**
     * Вычисляет хеш пароля, который будет храниться в таблице
     * @param {*} passwd значение пароля
     * @returns хешированный пароль
     */
    hashPasswd(passwd: string) {
        const hashedPassword = generate(passwd);
        return hashedPassword;
    }

    /**
     * Выводит всю таблицу в консоль
     */
    printTable() {
        for (let i = 0; i < this.bucket.length; i++) {
            if (this.bucket[i] == null) {
                console.log("|" + i + "| : ")
            } else {
            console.log("|" + i + "| :  ");
            this.bucket[i].printList();
            }
        }
    }

    /**
     * Добавляет в таблицу логин и хешированный пароль под индексом хешированного логина
     * @param {*} login значение логина
     * @param {*} passwd значение пароля
     * @returns экземпляр класса(сам объект)
     */
    add(login: string, passwd: string): HashTable {
        const index = this.hashLogin(login);
        const hashPasswd = this.hashPasswd(passwd);
        if (this.bucket[index] == null) {
            this.bucket[index] = new List();
            this.bucket[index].add(login, hashPasswd);
        } else {
            try {
                this.bucket[index].add(login, hashPasswd);
                } catch (e) {
                    console.error(e);
                }
        }
        return this;
    }

    /**
     * Возращает узел списка, хранящийся в таблице под индексом хешированного логина
     * @param {*} login значение логина
     * @returns узел списка
     */
    find(login: string) {
        const index = this.hashLogin(login);
        return this.bucket[index].find(login);
    }

    /**
     * Изменяет значение хешированного пароля на новый хешированный пароль
     * @param {*} login логин, у которого надо изменить пароль
     * @param {*} newPasswd новый пароль
     * @returns экземпляр класса(сам объект)
     */
    change(login:string, newPasswd: string) {
        let node = this.find(login)
        if (node != null) {
            node.passwd = this.hashPasswd(newPasswd);
        } else {
            throw new Error("Не существует такого элемента");
        }
        return this;
    }

    /**
     * Определяет количество элементов(узлов) в таблице
     * @returns число элементов в таблице
     */
    countElements() {
        let count = 0;
        for (let i = 0; i < this.bucket.length; i++) {
            if (this.bucket[i] == null) {
                continue;
            }
            count += this.bucket[i].length();
        }
        return count;
    }

    /**
     * Удаляет узел по заданному логину
     * @param {*} login значение логина
     * @returns экземпляр класса(сам объект)
     */
    delete(login: string) {
        table.bucket[this.hashLogin(login)].delete(login);
        return this;
    }
}


// "тестики"
let table = new HashTable(10);
table.add("iloveyou2", "password").add("kam034", "qwerty").add("iloveyou", "fuckyou").add("sia08", "sunduk316");
table.printTable();
console.log(table.countElements());
table.delete("iloveyou2");
table.printTable();
console.log(table.countElements());
table.add("iloveyou2", "password");
table.printTable();
console.log(table.countElements());

table.change("iloveyou", "qwerty");
table.printTable();
console.log(table.find("iloveyou"));