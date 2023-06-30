import { Request, Response, NextFunction } from 'express';
import { readFromFile, writeToFile } from '../utils/fileUtils';
// import { validateData } from '../schemas/contactScheme';

export interface Contact {
  id: number,
  firstName: string,
  lastName: string,
  phone: string,
  email: string
}

export const getContacts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await readFromFile();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await readFromFile();
    const contact = contacts.find((c: Contact) => c.id === Number(req.params.id));
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ error: 'Контакт не найден' });
    }
  } catch (error) {
    next(error);
  }
};

export const getContactByFirstName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await readFromFile();
    const contact = contacts.find((c: Contact) => c.firstName.toLowerCase() === req.params.firstName.toLowerCase());
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ error: 'Контакт не найден' });
    }
  } catch (error) {
    next(error);
  }
};


export const getContactByLastName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await readFromFile();
    const contact = contacts.find((c: Contact) => c.lastName.toLowerCase() === req.params.lastName.toLowerCase());
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ error: 'Контакт не найден' });
    }
  } catch (error) {
    next(error);
  }
};

export const sortContactsByFirstNameAsc = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await readFromFile();
    const sortedContacts = contacts.sort((a: Contact, b: Contact) => a.firstName.localeCompare(b.lastName));
    res.json(sortedContacts);
  } catch (error) {
    next(error);
  }
};

export const sortContactsByFirstNameDesc = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await readFromFile();
    const sortedContacts = contacts.sort((a: Contact, b: Contact) => b.firstName.localeCompare(a.lastName));
    res.json(sortedContacts);
  } catch (error) {
    next(error);
  }
};

//сортировка по адресу и фамилии аналогичны..

export const addContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);
    const contacts = await readFromFile();
    contacts.push(req.body);
    await writeToFile(contacts);
    res.status(201).json({ message: 'Контакт добавлен' });
  } catch (error) {
    next(error);
  }
}

export const deleteContactByLastName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await readFromFile();
    const filteredContacts = contacts.filter((c: Contact) => c?.lastName.toLowerCase() !== req.params.lastName.toLowerCase());
    console.log(filteredContacts)
    await writeToFile(filteredContacts);
    res.json({ message: 'Контакт удален' });
  } catch (error) {
    next(error);
  }
};

export const deleteAllContacts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await writeToFile([])
      res.json({ message: 'Все контакты удалены'});
  } catch (error) {
    next(error)
  }
}