const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { InternalServerError } = require("./utils/InternalServerError.js");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error);

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "6895c1b30e79afc842de55d5",
  };
  next();
});
app.use("/", mainRouter);

app.use((err, req, res, next) => {
  console.error(err);
  if (!err.statusCode) {
    return next(new InternalServerError("Internal sever error"));
  }
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
