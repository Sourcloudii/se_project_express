const router = require("express").Router();

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const likesRouter = require("./likes");

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);
router.use("/items", likesRouter);

router.use((req, res) => {
  res.status(404).send({message: "Requested resource not found"});
});

module.exports = router;
