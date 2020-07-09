const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  name: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  result: [
    {
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      },
      responses: [
        {
          choice: String,
          score: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Answer", answerSchema);
