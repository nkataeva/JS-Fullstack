import { List } from './List.js';
import { generate } from 'password-hash';
class HashTable {
    constructor(size) {
        this.bucket = new Array(size).fill(null);
    }
    hashLogin(login) {
        let hash = 0;
        for (let i = 0; i < login.length; i++) {
            hash += login.charCodeAt(i);
        }
        return hash % this.bucket.length;
    }
    hashPasswd(passwd) {
        const hashedPassword = generate(passwd);
        return hashedPassword;
    }
    printTable() {
        for (let i = 0; i < this.bucket.length; i++) {
            if (this.bucket[i] == null) {
                console.log("|" + i + "| : ");
            }
            else {
                console.log("|" + i + "| :  ");
                this.bucket[i].printList();
            }
        }
    }
    add(login, passwd) {
        const index = this.hashLogin(login);
        const hashPasswd = this.hashPasswd(passwd);
        if (this.bucket[index] == null) {
            this.bucket[index] = new List();
            this.bucket[index].add(login, hashPasswd);
        }
        else {
            try {
                this.bucket[index].add(login, hashPasswd);
            }
            catch (e) {
                console.error(e);
            }
        }
        return this;
    }
    find(login) {
        const index = this.hashLogin(login);
        return this.bucket[index].find(login);
    }
    change(login, newPasswd) {
        let node = this.find(login);
        if (node != null) {
            node.passwd = this.hashPasswd(newPasswd);
        }
        else {
            throw new Error("Не существует такого элемента");
        }
        return this;
    }
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
    delete(login) {
        table.bucket[this.hashLogin(login)].delete(login);
        return this;
    }
}
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
//# sourceMappingURL=HashTable.js.map