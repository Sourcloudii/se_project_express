const User = require("../models/user");
const { NotFoundError } = require("../utils/NotFoundError");
const { ValidationError } = require("../utils/ValidationError");
const { InternalSeverError } = require("../utils/InternalServerError");

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item ID not found"));
      }
      if (err.name === "CastError") {
        return next(new ValidationError("Invalid user ID format"));
      }
      return next(new InternalSeverError("Internal server error"));
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new ValidationError("Validaiton failed"));
      }
      return next(new InternalSeverError("Internal server error"));
    });
};
