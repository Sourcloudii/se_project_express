const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const { InternalServerError } = require("./utils/InternalServerError");

const { login, createUser } = require("./controllers/users");
const { getClothingItems } = require("./controllers/clothingItems");
const auth = require("./middlewares/auth");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error);

app.use(express.json());
app.use(cors());

app.post("/signin", login);
app.post("/signup", createUser);
app.get("/items", getClothingItems);

app.use(auth);
app.use("/", mainRouter);

app.use((err, req, res, next) => {
  console.error(err);
  if (!err.statusCode) {
    return next(new InternalServerError("Internal server error"));
  }
  return res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
