const handleMongooseError = (status = 400, message = "Bad request") => {
  const fn = (error, data, next) => {
    error.status = status;
    error.message = message;
    next();
  };
  return fn;
};

module.exports = {
  handleMongooseError,
};
