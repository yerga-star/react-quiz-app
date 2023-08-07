import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import he from "he";
import Question from "./Question";
import Result from "./Result";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faArrowLeft, faArrowRight, faClock} from "@fortawesome/free-solid-svg-icons";

export default function Quiz(props) {
  const [test, setTest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState([]);
  const [result, setResult] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(''); // Initial time in seconds
  const [reload, setReload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOffline, setIsOffline] = useState(false);

  const questionsPerPage = 5;
  const totalPages = 4;
  const selectedCategory = props.category;
  const selectedDifficulty = props.difficulty;

  useEffect(() => {
    console.log(selectedCategory,selectedDifficulty)
    if (!window.navigator.onLine) {
      setIsOffline(true);
    } else {
      setIsOffline(false);
    }
    async function getQuiz() {
      let url = ""
      if (selectedCategory === "all" && selectedDifficulty === "any") {
        url = "https://opentdb.com/api.php?amount=20&type=multiple"
      } else if (selectedCategory === "all") {
        url = `https://opentdb.com/api.php?amount=20&difficulty=${selectedDifficulty}&type=multiple`
      } else if (selectedDifficulty == "any") {
        url = `https://opentdb.com/api.php?amount=20&category=${selectedCategory}&type=multiple`
      }
      else {
        url = `https://opentdb.com/api.php?amount=20&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`
      }
      console.log(url)
      const res = await fetch(url);
      const data = await res.json();

      // Decode the HTML entities in the response
      const decodedData = {
        ...data,
        results: data.results.map((result) => {
          const decodedResult = {
            ...result,
            id: nanoid(),
            question: he.decode(result.question),
            correct_answer: {
              answer: he.decode(result.correct_answer),
              id: nanoid(),
              isSelected: false,
            },
            incorrect_answers: result.incorrect_answers.map((answer) => ({
              answer: he.decode(answer),
              id: nanoid(),
              isSelected: false,
            })),
          };

          decodedResult.allAnswer = [
            ...decodedResult.incorrect_answers,
            decodedResult.correct_answer,
          ].sort(() => Math.random() - 0.5);
          return decodedResult;
        }),
      };

      setTest(decodedData.results);
      setIsLoading(false);
      setRemainingTime(1200);
    }
    getQuiz();
  }, [reload]);

  useEffect(() => {
    if (!quizCompleted && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [remainingTime, quizCompleted]);

  useEffect(() => {
    if (remainingTime === 0) {
      setQuizCompleted(true);
    }
  }, [remainingTime]);


  function userAnswer(qsnId, ansId) {
    setUserAnswers((prevUserAnswers) => {
      const isQuestionMarked = prevUserAnswers.some(
        (answer) => answer.qsnId === qsnId
      );

      if (isQuestionMarked) {
        const updatedUserAnswers = prevUserAnswers.filter(
          (answer) => !(answer.qsnId === qsnId)
        );

        const isAnswerMarked = prevUserAnswers.some(
          (answer) => answer.qsnId === qsnId && answer.ansId === ansId
        );

        if (isAnswerMarked) {
          return updatedUserAnswers;
        } else {
          updatedUserAnswers.push({ qsnId, ansId });
          return updatedUserAnswers;
        }
      } else {
        return [...prevUserAnswers, { qsnId, ansId }];
      }
    });

    setTest((prevTest) =>
      prevTest.map((testItem) =>
        testItem.id === qsnId
          ? {
            ...testItem,
            allAnswer: testItem.allAnswer.map((answer) =>
              answer.id === ansId
                ?
                {
                  ...answer,
                  isSelected: !answer.isSelected
                }
                : {
                  ...answer,
                  isSelected: false
                })
          }
          : testItem
      )
    );
  }

  function checkAnswers() {
    if (remainingTime > 0) {

      const result = userAnswers.reduce((acc, userAns) => {
        const { qsnId, ansId } = userAns;
        const correspondingTest = test.find(
          (testItem) => testItem.id === qsnId
        );
        if (correspondingTest && ansId === correspondingTest.correct_answer.id) {
          return acc + 1;
        }
        return acc;
      }, 0);
      setResult(result);
      setQuizCompleted(true);
    }
    setRemainingTime('')

  }

  function newQuiz() {
    setIsLoading(true);
    setCurrentPage(1);
    setQuizCompleted(false);
    setReload(!reload);
    
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const isLastPage = currentPage === totalPages;
  const isFirstPage = currentPage === 1;

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const qsn = test.length > 0 && (
    <div>
      {test.slice((currentPage - 1) * questionsPerPage, currentPage * questionsPerPage).map((quiz) => (
        <Question
          key={quiz.id}
          quizId={quiz.id}
          question={quiz.question}
          allAnswer={quiz.allAnswer}
          onSelected={userAnswer}
          quizCompleted={quizCompleted}
        />
      ))}
      {/* Next and Prev buttons */}
      <div className="btn-container">
        {!isFirstPage && (
          <button className="btn-start btn-prev" onClick={goToPrevPage} disabled={currentPage === 1}>
            <FontAwesomeIcon icon={faArrowLeft} /> Prev
          </button>)}
        {!isLastPage && (
          <button className="btn-start btn-home" onClick={() => window.location.reload()}>
            <FontAwesomeIcon icon={faHome} /> Home
          </button>
        )}
        {!isLastPage && (
          <button className="btn-start btn-next" onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next <FontAwesomeIcon icon={faArrowRight} />
          </button>)}
        {isLastPage && (
          <button className="btn-start btn-check-ans" onClick={checkAnswers} hidden={quizCompleted}>
            Check Answers
          </button>
        )}

      </div>

    </div>
  );

  const resultComponent = quizCompleted ? (<div className="result-container">
    <Result result={result} handleClick={newQuiz} />
  </div>) : (<div className="timer-container">
  <p><FontAwesomeIcon icon={faClock} />Time Remaining</p><p> {minutes}:{seconds < 10 ? "0" : ""}{seconds}</p>
  </div>);

  return (
    <>
      {isOffline ? (
        <p>No internet connection. Please check your connection and try again.</p>
      ) : (
        <div className="quiz-container">
          <div className="qsn-container">
            {isLoading ? <div className="spinner"></div> : qsn}
          </div>
          {resultComponent}
        </div>)}
    </>
  );
}
