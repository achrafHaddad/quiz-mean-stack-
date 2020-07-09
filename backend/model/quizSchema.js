const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  time: { type: Number, required: true },
  coachId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  questions: [
    {
      question: { type: String, required: true },
      rep1: { type: String, required: true },
      rep2: { type: String, required: true },
      rep3: { type: String, required: true },
      rep4: { type: String, required: true },
      correctAnswer: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);
