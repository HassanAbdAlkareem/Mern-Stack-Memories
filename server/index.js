const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.URL_MONGODB)
  .then(() => console.log("connect to db"))
  .catch((error) => console.log("failde co nnect to db" + error));

const routerPost = require("./routes/Posts");
const routerAuth = require("./routes/Auth");

app.use("/api/posts", routerPost);
app.use("/api/user", routerAuth);

app.listen(process.env.PORT || 5000, () => {
  console.log("server runing");
});
