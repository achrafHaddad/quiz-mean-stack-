const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const quiz = require("./routes/quiz");
const user = require("./routes/user");
const answer = require("./routes/answer");
require("./routes/passport");

mongoose
  .connect("mongodb://localhost/quiz", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log("error", err));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/quiz", quiz);
app.use("/user", user);
app.use("/answer", answer);

const port = process.env.PORT || 3000;

app.set("port", port);

app.listen(port);
