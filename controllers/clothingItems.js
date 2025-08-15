const ClothingItem = require("../models/clothingItem");
const { NotFoundError } = require("../utils/NotFoundError");
const { ValidationError } = require("../utils/ValidationError");
const { InternalSeverError } = require("../utils/InternalServerError");

module.exports.getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(() => next(new InternalSeverError("Internal server error")));
};

module.exports.createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.send({ data: item }))
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
