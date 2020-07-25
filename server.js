if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const Mongoose = require("mongoose");

const app = express();
const indexRouter = require("./routes/index");
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layouts");
app.use(expressLayouts);
app.use(express.static("public"));

app.use("/", indexRouter);

Mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = Mongoose.connection;
db.on("error", () => console.error("error thrown"));
db.once("open ", () => console.log("connected to mongoooose"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`server conected in ${PORT}`));
