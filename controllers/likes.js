const clothingItems = require("../models/clothingItem");
const {
  NotFoundError,
  ValidationError,
  InternalSeverError,
} = require("../utils/errors");

module.exports.likeItem = (req, res, next) => {
  clothingItems
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      throw new NotFoundError("Item ID not found");
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return res.status(err.statusCode).send({ message: err.message });
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
    .orFail(() => {
      throw new NotFoundError("Item ID not found");
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return res.status(err.statusCode).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return next(new ValidationError("Invalid user ID format"));
      }
      return next(new InternalSeverError("Internal server error"));
    });
};
