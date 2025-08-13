const ClothingItem = require("../models/clothingItem");
const {
  NotFoundError,
  ValidationError,
  InternalSeverError,
} = require("../utils/errors");

module.exports.getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(() => next(new InternalSeverError("Internal server error")));
};

module.exports.createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new ValidationError("Validaiton failed"));
      }
      return next(new InternalSeverError("Internal server error"));
    });
};

module.exports.deleteClothingItem = (req, res, next) => {
  ClothingItem.findByIdAndDelete(req.params.itemId)
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
