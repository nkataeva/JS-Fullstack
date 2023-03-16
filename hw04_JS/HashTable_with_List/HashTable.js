import {List} from './List.js'
import {generate} from 'password-hash'
/**
 * Хеш таблица с расрешением коллизий методом цепочек
 */
class HashTable {
    constructor(size) {
        this.bucket = new Array(size).fill(null);
        this.count = 0;
    }

    /**
     * Хеш-функция
     * @param {*} login ключ, который будет хешироваться
     * @returns значение хэша
     */
    hashLogin(login) {
        let hash = 0;
        for (let i = 0; i < login.length; i++) {
            hash += login.charCodeAt(i);
        }
        console.log(hash % this.bucket.length);
        return hash % this.bucket.length;
    }

    hashPasswd(passwd) {
        const hashedPassword = generate(passwd);
        return hashedPassword;
    }

    add(login, passwd) {
        const index = this.hashLogin(login);
        const hashPasswd = this.hashPasswd(passwd);
        if (this.bucket[index] == null) {
            this.bucket[index] = new List();
            try {
            this.bucket[index].add(login, hashPasswd);
            } catch (e) {
                console.log(e.message);
            }
            this.count++;
        } else {
            try {
                this.bucket[index].add(login, hashPasswd);
                } catch (e) {
                    console.log(e.message);
                }
            this.count++;
        }
        return this;
    }

    find(login) {
        const index = this.hashLogin(login);
        return this.bucket[index].find(login);
    }


}

let table = new HashTable(50);
table.add("iloveyou", "password").add("kam034", "qwerty").add("iloveyou", "fuckyou");
for (let i of table.bucket) {
    console.log(i);
}
console.log(table.find("kam034"));
//console.log(table.bucket);