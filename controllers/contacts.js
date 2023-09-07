const contacts = require("../models/contacts");
const { HttpError, HttpResponse, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(HttpResponse("success", 200, result));
};

const getById = async (req, res) => {
  const { contactId } = req.params;

  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(HttpResponse("success", 200, result));
};

const add = async (req, res) => {
  const result = await contacts.addContact(req.body);
  if (!result) {
    throw HttpError();
  }
  res.status(201).json(HttpResponse("success", 201, result));
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;

  const result = await contacts.removeContact(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(HttpResponse("success", 200, result));
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(HttpResponse("success", 200, result));
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
