const Anwers = require("./Anwers");

const answerController = {};

answerController.addNew = async (req, res) => {
  const body = req.body;
  const answer = new Anwers(body);
  await answer.save();

  return res.status(200).json(answer);
};

answerController.getAll = async (req, res) => {
  const answers = await Anwers.find({});

  return res.status(200).json(answers);
};

module.exports = answerController;
