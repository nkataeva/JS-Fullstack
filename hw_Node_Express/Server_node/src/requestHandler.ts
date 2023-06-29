import { IncomingMessage, ServerResponse } from "http";
import { Contact } from "./dataHandler";
import {
    getAllContacts,
    getContactByFirstName,
    getContactById,
    getContactByLastName,
    sortContactsByAddressDesc,
    sortContactsByAddressAsc,
    sortContactsByFirstNameAsc,
    sortContactsByFirstNameDesc,
    addContact,
    deleteContactById,
    deleteContactsByLastName,
    clearContacts
} from './dataHandler'


export async function handleRequest(req: IncomingMessage, res: ServerResponse) {
    const { method, url } = req;
    let statusCode = 200;
    let responseBody;

    if (method === 'GET') {
        if (url === '/contacts') {
            // получить все контакты
            responseBody = await getAllContacts();
            console.log(JSON.stringify(responseBody));
        } else if (url?.startsWith('/contacts?id=')) {
            // получить контакт по id
            const id = parseInt(url.split('=')[1]);
            responseBody = await getContactById(id);
        } else if (url?.startsWith('/contacts?firstName=')) {
            // получить контакт по имени
            const firstName = decodeURIComponent(url.split('=')[1]);
            responseBody = await getContactByFirstName(firstName);
        } else if (url?.startsWith('/contacts?lastName=')) {
            // получить контакт по фамилии
            const lastName = decodeURIComponent(url.split('=')[1]);
            responseBody = await getContactByLastName(lastName);
        } else if (url === '/contacts?sortByFirstName=asc') {
            // получить сортировку по имени по возрастанию
            responseBody = await sortContactsByFirstNameAsc();
        } else if (url === '/contacts?sortByFirstName=desc') {
            // получить сортировку по имени по убыванию
            responseBody = sortContactsByFirstNameDesc();
        } else if (url === '/contacts?sortByEmail=asc') {
            // получить сортировку по адресу по возрастанию
            responseBody = await sortContactsByAddressAsc();
        } else if (url === '/contacts?sortByEmail=desc') {
            // получить сортировку по адресу по убыванию
            responseBody = await sortContactsByAddressDesc();
        }
    } else if (method === 'POST' && url === '/contacts') {
        // добавить новый контакт 
        let requestData = '';
        req.on('data', (chunk) => {
            requestData += chunk;
        });
        req.on('end', async () => {
            const newContact: Contact = JSON.parse(requestData);
            await addContact(newContact);
            responseBody = newContact;
        });
    } else if (method === 'DELETE') {
        if (url?.startsWith('/contacts?id=')) {
            // удалить контакт по id
            const id = parseInt(url.split('=')[1]);
            await deleteContactById(id);
        } else if (url?.startsWith('/contacts?lastName=')) {
            // удалить контакт по фамилии
            const lastName = decodeURIComponent(url.split('=')[1]);
            await deleteContactsByLastName(lastName);
        } else if (url === '/contacts') {
            // удалить все контакты
            await clearContacts();
        }
    }
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    console.log(JSON.stringify(responseBody));
    res.end(JSON.stringify(responseBody));
}