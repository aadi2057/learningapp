const mongoose = require("mongoose");
const schema = mongoose.Schema;

const AnswerSchema = new schema(
  {
    option_number: { type: Number, min: 1, max: 4 },
    answer_text: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = Answers = mongoose.model("answers", AnswerSchema);
