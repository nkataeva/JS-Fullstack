import express, { Router } from 'express';
import {
    getContacts,
    getContactById,
    getContactByFirstName,
    getContactByLastName,
    sortContactsByFirstNameAsc,
    sortContactsByFirstNameDesc,
    addContact,
    deleteContactByLastName,
    deleteAllContacts
} from '../controllers/contactsController';

export const router: Router = express.Router();

router.get('/', getContacts);
router.get('/sortFirstNameAsc', sortContactsByFirstNameAsc)
router.get('/sortFirstNameDesc', sortContactsByFirstNameDesc)
router.get('/:id', getContactById);
router.get('/firstName/:firstName', getContactByFirstName);
router.get('/lastName/:lastName', getContactByLastName);
//сортировка по адресу и фамилии аналогичны..

router.post('/', express.json(), addContact);

router.delete('/lastName/:lastName', deleteContactByLastName);
router.delete('/deleteAll', deleteAllContacts)
