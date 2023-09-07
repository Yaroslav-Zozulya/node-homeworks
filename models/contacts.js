const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { updateContacts } = require("../helpers");

const contactPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactPath, "utf-8"));
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);

  if (idx === -1) {
    return null;
  }

  const [result] = contacts.splice(idx, 1);
  updateContacts(contacts);

  return result;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  updateContacts(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };

  updateContacts(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
