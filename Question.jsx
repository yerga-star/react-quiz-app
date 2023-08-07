import React, { useEffect } from "react";

export default function Question(props) {

  const checkedAnswers = props.checkedAnswers
  const styles = {
    backgroundColor: "#D6DBF5",
  };

  const allAnswer = props.allAnswer.map((answer) => (
    <div
      key={answer.id}
      className="answer"
      style={answer.isSelected ? styles : answer.id === props.correctAnswerId && checkedAnswers ? { backgroundColor: "#8DDC8D", color: "#ffffff" } : {}}
      onClick={() => !props.quizCompleted && props.onSelected(props.quizId, answer.id)}
    >
      {answer.answer}
    </div>
  ));

  const checkAnswerStyle = {
    backgroundColor: "#8DDC8D",
    color: "#ffffff",
  };

  return (
    <div>
      <h4>{props.question}</h4>
      {allAnswer}
      <hr />
    </div>
  );
}
