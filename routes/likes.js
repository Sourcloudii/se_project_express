const router = require("express").Router();

const { likeItem, dislikeItem } = require("../controllers/likes");
const { validateItemId } = require("../middlewares/validation");

router.put("/:itemId/likes", validateItemId, likeItem);
router.delete("/:itemId/likes", validateItemId, dislikeItem);

module.exports = router;