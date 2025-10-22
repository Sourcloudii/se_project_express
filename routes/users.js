const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");
const { updateUser } = require("../controllers/updateUser");
const { validateUserUpdate } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validateUserUpdate, updateUser);

module.exports = router;
