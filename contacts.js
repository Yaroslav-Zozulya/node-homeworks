const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    return JSON.parse(await fs.readFile(contactPath, "utf-8"));
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);

    return result || null;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);

    if (idx === -1) {
      return null;
    }

    const [result] = contacts.splice(idx, 1);
    updateContacts(contacts);

    return result;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
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
  } catch (error) {
    return null;
  }
}

function updateContacts(newContacts) {
  fs.writeFile(contactPath, JSON.stringify(newContacts));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
