const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const fn = (req, res, next) => {
    const isBodyEmpty = Object.keys(req.body).length === 0;
    if (isBodyEmpty) {
      return next(HttpError(400, "missing fields"));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return fn;
};

module.exports = {
  validateBody,
};
