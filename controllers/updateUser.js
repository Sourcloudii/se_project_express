const User = require("../models/user");
const { NotFoundError } = require("../utils/NotFoundError");
const { ValidationError } = require("../utils/ValidationError");
const { InternalServerError } = require("../utils/InternalServerError");

module.exports.updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      }
      if (err.name === "ValidationError") {
        return next(new ValidationError("Invalid user ID format"));
      }
      return next(new InternalServerError("Internal server error"));
    });
};
