import React, { useState }from "react";
import Main from "./Main";
import Quiz from "./Quiz";

export default function App() {
  const [showQuizComponent, setShowQuizComponent] = React.useState(false)
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

function redirect(category, difficulty){
  setCategory(category);
  setDifficulty(difficulty);
  setShowQuizComponent(true)
}
  return (
    <div>
      {!showQuizComponent ? (
        <Main onButtonClick={redirect} />
      ) : (
        <Quiz category={category}
        difficulty={difficulty}
        />
      )}
    </div>
  )
}
