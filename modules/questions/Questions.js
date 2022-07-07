const mongoose = require("mongoose");
const schema = mongoose.Schema;

const QuestionSchema = new schema(
  {
    hardness_level: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Hardness level is required"],
    },
    question: { type: String },
    answer_options: [{ type: schema.Types.ObjectId, ref: "answers" }],
    correct_answer: { type: schema.Types.ObjectId, ref: "answers" },
  },
  {
    timestamps: true,
  }
);

module.exports = Questions = mongoose.model("questions", QuestionSchema);
