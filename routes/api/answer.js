const express = require("express");
const answerController = require("../../modules/answers/answersController");
const router = express.Router();

router.get("/", answerController.getAll);
router.post("/", answerController.addNew);

module.exports = router;
