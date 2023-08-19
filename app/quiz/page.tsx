"use client";
import { useState, useRef } from "react";
import { quiz } from "../data.js";

export default function Quiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean>("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<null | number>(
    null
  );
  const [answerCheckedAndCorrect, setAnswerCheckedAndCorrect] = useState<
    null | boolean
  >(null);

  const ref = useRef<HTMLLIElement>(null);
  const [showResult, setShowResult] = useState(false);
  const [color, setColor] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [result, setResult] = useState<{
    score: number;
    correctAnswers: number;
    wrongAnswers: number;
  }>({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];
  const onAnswerSelected = (answer: string, idx: number) => {
    setAnswerCheckedAndCorrect(false);
    setChecked(true);
    setSelectedAnswerIndex(idx);
    setCurrentAnswer(answer);
    answer === correctAnswer
      ? setSelectedAnswer(true)
      : setSelectedAnswer(false);
  };

  const checkAnswer = () => {
    // console.log(currentAnswer);
    currentAnswer === correctAnswer
      ? setAnswerCheckedAndCorrect(true)
      : setAnswerCheckedAndCorrect(false);
    // ref.current?.className = "green";
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };
  return (
    <div className="container">
      <h1>Quiz Page</h1>
      <div>
        <h2>
          Question:{activeQuestion + 1}
          <span>/{questions.length}</span>
        </h2>
      </div>
      <div>
        {!showResult ? (
          <div className="quiz-container">
            <h3>{questions[activeQuestion].question}</h3>
            {answers.map((answer, idx) => (
              <li
                ref={ref}
                key={idx}
                onClick={() => onAnswerSelected(answer, idx)}
                className={
                  selectedAnswerIndex === idx
                    ? answerCheckedAndCorrect
                      ? "li-selected green"
                      : "li-selected"
                    : "li-hover"
                }
              >
                <span>{answer}</span>
              </li>
            ))}
            {checked ? (
              <div>
                <button onClick={() => checkAnswer()} className="btn">
                  Check Answer
                </button>
                <button onClick={() => nextQuestion()} className="btn">
                  {activeQuestion === question.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => nextQuestion()}
                disabled
                className="btn-disabled"
              >
                {activeQuestion === question.length - 1 ? "Finish" : "Next"}
              </button>
            )}
          </div>
        ) : (
          <div className="quiz-container">
            <h3>Results</h3>
            <h3>Overall {(result.score / 25) * 100}%</h3>
            <p>
              Total Questions: <span>{questions.length}</span>
            </p>
            <p>
              Total Score: <span>{result.score}</span>
            </p>
            <p>
              Correct Answers: <span>{result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers: <span>{result.wrongAnswers}</span>
            </p>
            <button onClick={() => window.location.reload()}>Restart</button>
          </div>
        )}
      </div>
    </div>
  );
}
