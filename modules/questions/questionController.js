const { default: mongoose } = require("mongoose");
const Questions = require("./Questions");

const questionController = {};

questionController.addNew = async (req, res) => {
  const question_body = req.body;
  const question = new Questions(question_body);
  await question.save();

  return res.status(200).json(question);
};

questionController.getQuestions = async (req, res) => {
  const questions = await Questions.find({});

  return res.status(200).json(questions);
};

questionController.getQuestion = async (req, res) => {
  const solvedQuestions = req.body.solved;

  if (
    solvedQuestions &&
    Array.isArray(solvedQuestions) &&
    solvedQuestions.length &&
    solvedQuestions.length < 5
  ) {
    console.log("Solved Array");
    const solved = await Questions.find({ _id: { $in: solvedQuestions } })
      .sort({ hardness_level: -1 })
      .limit(1);
    console.log("Max Lvl: ", solved[0]?.hardness_level);
    const solvedids = await solvedQuestions.map((q) =>
      mongoose.Types.ObjectId(q)
    );
    let hardness_match = [];
    if (solved[0]?.hardness_level !== 5) {
      hardness_match.push({
        $match: { hardness_level: { $gt: solved[0]?.hardness_level } },
      });
    }
    console.log(solvedQuestions);

    const questions = await Questions.aggregate([
      {
        $match: {
          _id: { $nin: solvedids },
        },
      },
      ...hardness_match,
      { $sample: { size: 1 } },
      {
        $lookup: {
          from: "answers",
          localField: "answer_options",
          foreignField: "_id",
          as: "answer_options",
        },
      },
      {
        $lookup: {
          from: "answers",
          localField: "correct_answer",
          foreignField: "_id",
          as: "correct_answer",
        },
      },
      { $unwind: { path: "$correct_answer" } },
    ]);
    return res.status(200).json(questions);
  }
  console.log("Unsovlved any");
  const questions = await Questions.aggregate([
    // {
    //   // $match: {
    //   //   _id: { $nin: solvedQuestions },
    //   //   hardness_level: { $gt: solved[0]?.hardness_level },
    //   // },
    // },
    { $sample: { size: 1 } },
    {
      $lookup: {
        from: "answers",
        localField: "answer_options",
        foreignField: "_id",
        as: "answer_options",
      },
    },
    {
      $lookup: {
        from: "answers",
        localField: "correct_answer",
        foreignField: "_id",
        as: "correct_answer",
      },
    },
    { $unwind: { path: "$correct_answer" } },
  ]);
  return res.status(200).json(questions);
};

module.exports = questionController;
