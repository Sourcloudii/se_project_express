const router = require("express").Router();
const { validateClothingItem, validateItemId } = require("../middlewares/validation");

const {
  createClothingItem,
  getClothingItems,
  deleteClothingItem,
} = require("../controllers/clothingItems");

router.post("/", validateClothingItem, createClothingItem);
router.get("/", getClothingItems);
router.delete("/:itemId", validateItemId, deleteClothingItem);

module.exports = router;
