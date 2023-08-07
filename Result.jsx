import React, { useState, useEffect } from "react";

export default function Result(props) {
    const result = props.result;
    const [storedScore, setStoredScore] = useState(0);

    useEffect(() => {
        // Set initial highest score to local storage when the component first mounts
        if (!localStorage.getItem("hs")) {
            localStorage.setItem("hs", result.toString());
            setStoredScore(result);
        } else {
            const scoreFromLocalStorage = parseInt(localStorage.getItem("hs")) || 0;

            // Compare the current score with the previous highest score
            if (result > scoreFromLocalStorage) {
                // Update local storage with the new highest score
                localStorage.setItem("hs", result.toString());
                setStoredScore(result);
            } else {
                setStoredScore(scoreFromLocalStorage);
            }
        }
    }, [result]);

    return (
        <>
            <div className="qsn-div">
                <h4>Your result is: {result}/20</h4>
                <h4>Your highest score is: {storedScore}/20</h4>
            </div>

            <div className="btn-container">
                <button className="btn-start btn-check-ans" onClick={props.handleClick}>
                    Retake Test
                </button>
            </div>
        </>
    );
}
