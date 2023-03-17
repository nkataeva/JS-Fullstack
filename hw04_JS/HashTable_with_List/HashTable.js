import {List} from './List.js'
import {generate} from 'password-hash'
/**
 * Хеш таблица с разрешением коллизий методом цепочек
 */
class HashTable {
    constructor(size) {
        this.bucket = new Array(size).fill(null);
        this.count = 0;
    }

    /**
     * Хеш-функция для вычисления индекса(хеш логина)
     * @param {*} login логин, который будет хешироваться
     * @returns хешированный логин
     */
    hashLogin(login) {
        let hash = 0;
        for (let i = 0; i < login.length; i++) {
            hash += login.charCodeAt(i);
        }
        // console.log("login: " + login);
        // console.log("code: " + hash);
        // console.log("hash: " + hash % this.bucket.length);
        return hash % this.bucket.length;
    }

    /**
     * Вычисляет хеш пароля, который будет храниться в таблице
     * @param {*} passwd значение пароля
     * @returns хешированный пароль
     */
    hashPasswd(passwd) {
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
    add(login, passwd) {
        const index = this.hashLogin(login);
        const hashPasswd = this.hashPasswd(passwd);
        if (this.bucket[index] == null) {
            this.bucket[index] = new List();
            this.bucket[index].add(login, hashPasswd);
            this.count++;
        } else {
            try {
                this.bucket[index].add(login, hashPasswd);
                } catch (e) {
                    console.error(e);
                }
            this.count++;
        }
        return this;
    }

    /**
     * Возращает узел списка, хранящийся в таблице под индексом хешированного логина
     * @param {*} login значение логина
     * @returns узел списка
     */
    find(login) {
        const index = this.hashLogin(login);
        return this.bucket[index].find(login);
    }


}

let table = new HashTable(10);
table.add("iloveyou2", "password").add("kam034", "qwerty").add("iloveyou", "fuckyou");
table.printTable();
// console.log("AAAAAAA")
// console.log(table.find("iloveyou"));
//console.log(table.bucket);