import { Console } from "console";
import { readFromFile, writeToFile } from "./fileHandler";

export interface Contact {
    id: number,
    firstName: string,
    lastName: string,
    phone: string,
    email: string
}

// Получить все контакты
export async function getAllContacts(): Promise<Contact[]> {
    return readFromFile();
}

// Получить контакт по id
export async function getContactById(id: number): Promise<Contact | undefined> {
    const contacts = await readFromFile();
    return contacts.find((contact) => contact.id === id);
}

// Получить контакт по имени
export async function getContactByFirstName(firstName: string): Promise<Contact | undefined> {
    const contacts = await readFromFile();
    return contacts.find((contact) => contact.firstName === firstName);
}

// Получить контакт по фамилии
export async function getContactByLastName(lastName: string): Promise<Contact | undefined> {
    const contacts = await readFromFile();
    return contacts.find((contact) => contact.lastName === lastName);
}

// Сортировка контактов по имени (по возрастанию)
export async function sortContactsByFirstNameAsc(): Promise<Contact[]> {
    const contacts = await readFromFile();
    return contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
}

// Сортировка контактов по имени (по убыванию)
export async function sortContactsByFirstNameDesc(): Promise<Contact[]> {
    const contacts = await readFromFile();
    return contacts.sort((a, b) => b.firstName.localeCompare(a.firstName));
}

// // Сортировка контактов по фамилии (по возрастанию)
// export async function sortContactsByLastNameAsc(): Promise<Contact[]> {
//     const contacts = await readFromFile();
//     return contacts.sort((a, b) => a.lastName.localeCompare(b.lastName));
// }

// // Сортировка контактов по фамилии (по убыванию)
// export async function sortContactsByLastNameDesc(): Promise<Contact[]> {
//     const contacts = await readFromFile();
//     return contacts.sort((a, b) => b.lastName.localeCompare(a.lastName));
// }

// Сортировка контактов по адресу по возрастанию
export async function sortContactsByAddressAsc(): Promise<Contact[]> {
    const contacts = await readFromFile();
    return contacts.sort((a, b) => a.email.localeCompare(b.email));
}

// Сортировка контактов по адресу по возрастанию
export async function sortContactsByAddressDesc(): Promise<Contact[]> {
    const contacts = await readFromFile();
    return contacts.sort((a, b) => b.email.localeCompare(a.email));
}

// Добавить новый контакт
export async function addContact(contact: Contact): Promise<void> {
    const contacts = await readFromFile();
    contacts.push(contact);
    await writeToFile(contacts);
}

// Удалить контакт по id
export async function deleteContactById(id: number): Promise<void> {
    let contacts = await readFromFile();
    contacts = contacts.filter((contact) => contact.id !== id);
    await writeToFile(contacts);
}

// Удалить контакт по фамилии
export async function deleteContactsByLastName(lastName: string): Promise<void> {
    let contacts = await readFromFile();
    contacts = contacts.filter((contact) => contact.lastName !== lastName);
    await writeToFile(contacts);
}

// Очистить всю книгу
export async function clearContacts(): Promise<void> {
    await writeToFile([]);
}