const fs = require("fs/promises");
const path = require("path");
const contactPath = path.join(__dirname, "../", "models", "contacts.json");

const updateContacts = (newContacts) =>
  fs.writeFile(contactPath, JSON.stringify(newContacts));

module.exports = {
  updateContacts,
};
