var express = require("express");
var router = express.Router();

/* GET home page. */
const answerRoutes = require("./api/answer");
router.use("/answers", answerRoutes);

const questionRoutes = require("./api/questions");
router.use("/questions", questionRoutes);

module.exports = router;
