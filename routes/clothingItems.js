const router = require("express").Router();

const {
  createClothingItem,
  getClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");

router.post("/", createClothingItem);
router.get("/", getClothingItem);
router.delete("/:itemId", deleteClothingItem);

module.exports = router;
