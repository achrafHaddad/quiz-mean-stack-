const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/userSchema");

const router = express.Router();

router.get("/", async (req, res) => {
  let users = await User.find();

  res.send(users);
});

// get users by quiz id
router.get("/:quizId", async (req, res) => {
  const user = await User.find({ quiz: req.params.quizId }, { password: 0 });
  res.send(user);
});

// get only candidates by quiz id
router.get("/candidate/:quizId", async (req, res) => {
  const user = await User.find(
    { quiz: req.params.quizId, role: "candidat" },
    { password: 0 }
  );
  res.send(user);
});

router.post("/signup", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role == true ? "coach" : "candidat",
  });
  const unique = await User.findOne({ email: req.body.email });
  if (unique) return res.status(400).send({ message: "email already in use" });

  let salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.send(user);
});

router.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("wrong email or password");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.send("wrong email or password");

  let token = jwt.sign(
    {
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
    "secret"
  );

  res.send({ token: token });
});

module.exports = router;
