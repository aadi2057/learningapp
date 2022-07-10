import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { fetchQuestion } from "./api";

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [question, setQuestion] = useState();
  const [solved, setSolved] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fetch = () => {
    fetchQuestion(solved, setQuestion, setisLoading);
  };
  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    setIsSubmitted(false);
    setSelectedAnswer(null);
  }, [question]);

  const handleSubmit = (answerId) => {
    if (
      question.correct_answer._id === answerId &&
      !solved.includes(answerId)
    ) {
      setSolved((prevstate) => [...prevstate, question._id]);
    }
    setIsSubmitted(true);
  };
  // useEffect(() => {
  //   console.log(solved);
  //   console.log(question);
  // }, [solved]);
  // // console.log(question);
  const sortAnswers = (a, b) => {
    return a.option_number - b.option_number;
  };
  if (!question) return "Loading";
  return (
    <div className="h-screen">
      <div className="flex flex-col w-full shadow-md items-start px-6 py-4">
        <h1 className="text-2xl font-bold text-indigo-500">acharya</h1>
      </div>
      <div className="flex flex-col items-center justify-start w-full mt-20 ">
        <div className="flex flex-col items-start justify-center gap-y-4 w-4/5 flex-wrap">
          <span className="text-2xl font-semibold ">MCQs</span>
          <span className="rounded-sm border-2 border-rose-500 text-rose-500 text-xs p-0.5 block max-w-fit">
            Hardness Level: {question.hardness_level}
          </span>
          <div className="flex flex-row items-center font-semibold flex-wrap">
            <span>Ques:&nbsp; </span>
            <span>{question.question}</span>
          </div>
          <div className="flex flex-col gap-2 w-full items-start justify-start">
            {question?.answer_options?.sort(sortAnswers).map((answer) => (
              <button
                key={answer._id}
                disabled={isSubmitted}
                onClick={() => setSelectedAnswer(answer._id)}
                className={`p-2 rounded transition ease-in-out duration-300 ${
                  selectedAnswer === answer._id
                    ? isSubmitted
                      ? question.correct_answer._id === answer._id
                        ? "border-2 border-green-500 text-green-500 hover:bg-green-100"
                        : "border-2 border-rose-500 text-rose-500 hover:bg-rose-100"
                      : "border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-100"
                    : "hover:bg-gray-100"
                } w-full text-left`}
              >
                {answer.option_number}.&nbsp;
                {answer.answer_text}{" "}
              </button>
            ))}
          </div>
          <div className="flex flex-row justify-between w-full">
            {/* <button className="py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 transition ease-in-out shadow-md">
              Previous
            </button> */}
            <button
              onClick={() => handleSubmit(selectedAnswer)}
              className=" py-2 px-4 bg-violet-500 hover:bg-violet-600 transition ease-in-out text-white shadow-md rounded-md "
            >
              Submit
            </button>
            <button
              onClick={() => fetch()}
              className=" py-2 px-4 bg-sky-500 hover:bg-sky-600 transition ease-in-out text-white shadow-md rounded-md "
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
