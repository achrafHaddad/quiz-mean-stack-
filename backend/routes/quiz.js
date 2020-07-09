const express = require("express");
const passport = require("passport");
const Quiz = require("../model/quizSchema");
const User = require("../model/userSchema");

const router = express.Router();

// get all quizzes
router.get(
  "/",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    const quizzes = await Quiz.find().populate("coachId", { password: 0 });

    res.send(quizzes);
  }
);

// get quiz by its id
router.get(
  "/detail/:id",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id);
      res.send(quiz);
    } catch {
      res.send("error");
    }
  }
);

// get quizzes by id of the coach
router.get(
  "/:id",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.user._id, {
        password: 0,
      }).populate("quiz");

      // if (user._id !== req.params.id)
      //   return res.send({ message: "false entry" });
      // // console.log(user.id);

      // const quiz = await Quiz.find().where("_id").in(user.quiz).exec();

      res.send(user);
    } catch {
      res.send("id coach api error");
    }
  }
);

// get quizzes by id of candidate
router.get(
  "/candidat/:id",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    const user = await User.findById(req.params.id, { password: 0 }).populate([
      "result.answerId",
      "quiz",
    ]);

    res.send(user);
  }
);

// post a quiz
router.post(
  "/",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    const user = await User.findById(req.user.user);
    const quiz = new Quiz(req.body);

    const result = await quiz.save();
    await Quiz.findByIdAndUpdate(result._id, { coachId: user._id });

    await User.findByIdAndUpdate(user._id, { $push: { quiz: result._id } });

    res.send(result);
  }
);

// edit a quiz
router.put(
  "/edit/:id",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    const user = await User.findById(req.user.user);

    const quiz = user.quiz.find((u) => u == req.params.id);

    if (!quiz) return res.send({ message: "not Authorized" });
    const result = await Quiz.findByIdAndUpdate(req.params.id, req.body);

    res.send(result);
  }
);

// delete a quiz
router.delete(
  "/:id",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    const user = await User.findById(req.user.user);

    const id = user.quiz.find((q) => q._id == req.params.id);
    console.log(id);

    if (!id) return res.send({ message: "not Authorized" });

    await Quiz.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(req.user.user, {
      $pull: { quiz: req.params.id },
    });

    res.send({ message: "deleted" });
  }
);

module.exports = router;
