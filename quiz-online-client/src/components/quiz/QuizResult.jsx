import React from "react";
import { useLocation } from "react-router-dom";

const QuizResult=()=>{
    const location=useLocation()
    const { quizQuestions,totalScore }=location.state;
    const numOfQuestion=quizQuestions.length
    const percentage=Math.round((totalScore/numOfQuestion)*100)
    const handleRetakeQuiz=()=>{
        alert("oops this functionality was not implemented yet!!")
    }
    return(
        <section className="container mt-5">
            <h4>Your Quiz Result Summary</h4>
            <hr/>

            <h5 className="text-info">You answered {totalScore} out of {numOfQuestion} questions Correctly</h5>
            <p>Your total score is {percentage}%.</p>
            <button className="btn btn-primary btn-sm" onClick={handleRetakeQuiz}>Retake this Quiz</button>
        </section>
    )
}
export default QuizResult