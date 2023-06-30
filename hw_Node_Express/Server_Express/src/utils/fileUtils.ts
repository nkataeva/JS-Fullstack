import fs from "fs";
import { Contact } from "../controllers/contactsController";

const dataFilePath = './MOCK_DATA.json';

export function readFromFile(): Promise<Contact[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(dataFilePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        })
    })
}

export function writeToFile(data: Contact[]): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile(dataFilePath, JSON.stringify(data), 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
} 