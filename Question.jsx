import React, {useEffect} from "react";

export default function Question(props) {
  const styles = {
    backgroundColor: "#D6DBF5",
  };

  const allAnswer = props.allAnswer.map((answer) => (
    <div
      key={answer.id}
      className="answer"
      style={answer.isSelected ? styles : {}}
     onClick={() => !props.quizCompleted && props.onSelected(props.quizId,answer.id)}
    >
      {answer.answer}
    </div>
  ));

  return (
    <div>
      <h4>{props.question}</h4>
      {allAnswer}
      <hr />
    </div>
  );
}
