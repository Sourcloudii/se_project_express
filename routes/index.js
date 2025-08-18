const router = require("express").Router();
const { NotFoundError } = require("../utils/NotFoundError");

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const likesRouter = require("./likes");

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);
router.use("/items", likesRouter);

router.use((req, res, next) => next(new NotFoundError("Item Not Found")));

module.exports = router;
