const clothingItems = require("../models/clothingItem");
const { NotFoundError } = require("../utils/NotFoundError");
const { ValidationError } = require("../utils/ValidationError");
const { InternalSeverError } = require("../utils/InternalServerError");

module.exports.likeItem = (req, res, next) => {
  clothingItems
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item ID not found"));
      }
      if (err.name === "CastError") {
        return next(new ValidationError("Invalid user ID format"));
      }
      return next(new InternalSeverError("Internal server error"));
    });
};

module.exports.dislikeItem = (req, res, next) => {
  clothingItems
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item ID not found"));
      }
      if (err.name === "CastError") {
        return next(new ValidationError("Invalid user ID format"));
      }
      return next(new InternalSeverError("Internal server error"));
    });
};
