import React, { useState } from "react";

export default function Main(props) {

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("any");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  return (
    <div className="main-div">
      <h1>My Quiz</h1>
      <p>
        Take some Quiz and measure your knowledge and grab some additional
        more!
        <br />
        Good luck and you are ready to go.
      </p>
      <div className="dropdown-container">
        <select className="category-dropdown" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="any">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="17">Science &amp; Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="30">Science: Gadgets</option>
        </select>
        <select className="category-dropdown" value={selectedDifficulty} onChange={handleDifficultyChange}>
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

      </div>
      <div className="btn-start-container">
        <button className="btn-start" onClick={() => props.onButtonClick(selectedCategory,selectedDifficulty)}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}