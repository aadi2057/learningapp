const express = require("express");
const questionController = require("../../modules/questions/questionController");
const router = express.Router();

router.get("/", questionController.getQuestions);
router.post("/", questionController.addNew);
router.get("/getquestion", questionController.getQuestion);

module.exports = router;
