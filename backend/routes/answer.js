const express = require("express");
const passport = require("passport");
const User = require("../model/userSchema");
const Answer = require("../model/answerScema");
const Quiz = require("../model/quizSchema");
const bodyParser = require("body-parser");

const router = express.Router();

// get all the answers
router.get(
  "/",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    const result = await Answer.find();

    res.send(result);
  }
);

//get answer by id user and id quiz
router.get("/:userId/:qId", async (req, res) => {
  const eleUser = await Answer.find({
    userId: req.params.userId,
  }).populate("result.quizId");

  let eleQuiz = eleUser.find(
    (ele) => ele.result[0].quizId._id == req.params.qId
  );
  // console.log(eleQuiz);

  res.send(eleQuiz);
});

// get connected user's answers
router.get(
  "/user",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    const id = req.user.user;
    const result = await Answer.findById(id);

    res.send(result);
  }
);

// post an answer
router.post(
  "/:quiz",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    const answer = new Answer({
      userId: req.user.user._id,
      result: {
        quizId: req.params.quiz,
        responses: req.body,
      },
    });
    const resp = await answer.save();
    console.log(req.user.user._id);

    const index = resp.result[0].responses.length - 1;

    await User.findByIdAndUpdate(req.user.user._id, {
      $push: {
        result: [
          {
            score: resp.result[0].responses[index].score,
            quizId: req.params.quiz,
            answerId: answer._id,
          },
        ],
        quiz: req.params.quiz,
      },
    });

    res.send(answer);
  }
);

module.exports = router;
