const User = require("../models/user");
const {
  NotFoundError,
  ValidationError,
  InternalSeverError,
} = require("../utils/errors");

module.exports.getUsers = (req, res, next) => {
  console.log("GET all users");
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => next(new InternalSeverError("Internal server error")));
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError("Item ID not found");
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err instanceof NotFoundError) {
        return res.status(err.statusCode).send({ message: err.message });
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
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new ValidationError("Validaiton failed"));
      }
      return next(new InternalSeverError("Internal server error"));
    });
};
