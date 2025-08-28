const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");
const { updateUser } = require("../controllers/updateUser");

router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

module.exports = router;
