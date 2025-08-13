const router = require("express").Router();

const {
  createClothingItem,
  getClothingItems,
  deleteClothingItem,
} = require("../controllers/clothingItems");

router.post("/", createClothingItem);
router.get("/", getClothingItems);
router.delete("/:itemId", deleteClothingItem);

module.exports = router;
