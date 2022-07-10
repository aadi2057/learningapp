import axios from "axios";

export const fetchQuestion = (solvedQuestions, setQuestion, setLoading) => {
  setLoading(true);
  return axios
    .get("/questions/getquestion", { params: { solved: solvedQuestions } })
    .then(({ data }) => {
      console.log(data);
      setQuestion(data[0]);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
};
