const router = require("express").Router();
const { getCurrentUser, createUser, login } = require("../controllers/users");
const { updateUser } = require("../controllers/updateUser");

router.get("/me", getCurrentUser);
router.post("/signin", login);
router.post("/signup", createUser);
router.patch("/me", updateUser);

module.exports = router;
