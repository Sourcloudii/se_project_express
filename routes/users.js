const router = require("express").Router();
const { getUserById, createUser } = require("../controllers/users");

router.get("/:userId", getUserById);
router.post("/", createUser);

module.exports = router;
