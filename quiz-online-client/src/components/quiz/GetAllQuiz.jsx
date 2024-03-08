import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteQuestion, getAllQuestion } from "../../../utils/QuizService";
const  GetAllQuiz=()=>{
    const [question,setQuestion]=useState([{id:"",question:"",correctAnswers:"",choices:[]}])
    const[isLoading,setIsLoading]=useState(true)
    const[isQuestionDeleted,setIsQuestionDeleted]=useState(false)
    const[deleteSuccessMessage,setDeleteSuccessMessage]=useState("");

    useEffect(()=>{
        fetchAllQuestion()
    },[])

    const fetchAllQuestion=async()=>{
        try {
            const data = await getAllQuestion()
            setQuestion(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete=async(id)=>{
        try {
            await deleteQuestion(id)
            setQuestion(question.filter((question)=> question.id !==id))
            setIsQuestionDeleted(true)
            setDeleteSuccessMessage("Question deleted successfully!")
        } catch (error) {
            console.log(error)
        }
        setTimeout(()=>{
            setDeleteSuccessMessage("")
        },4000)
    }


    if(isLoading){
        return <div>Loading....</div>
    }
    return (
        <section className="container">
            <div className="row mt-5">
                <div className="col-md-6 mb-2md-mb-0" style={{color:"GrayText"}}>
                    <h4>All Quiz Questions</h4>
                </div>
                <div className="col-md-4 d-flex justify-content-end">
                <Link to={"/create-quiz"}>
                    <FaPlus/>Add Question
                </Link>
                </div>
            </div>
            <hr/>
            {isQuestionDeleted&&<div className="alert alert-success">{deleteSuccessMessage}</div>}
            {question.map((question,index)=>(
                <div>
                    <h4 style={{color:"GrayText"}}>{`${index+1}`}.{question.question}</h4>
                <ul>
                    {question.choices.map((choice,index)=>{
                        <li key={index}>{choice}</li>
                    })}
                </ul>
                <p className="text-success">Correct Answer:{question.correctAnswers}</p>
                <div className="btn-group mb-4">
                    <Link to={`/update-quiz/${question.id}`}>
                        <button className="btn btn-sm btn-outline-warning mr-2">Edit Question</button>
                    </Link>
                    <button className="btn btn-outline-danger btn-sm" 
                    onClick={()=>(handleDelete(question.id))}
                    >
                    Delete Question
                    </button>
                </div>
                </div>
            ))}
        </section>
    )
}
export default GetAllQuiz