import React from "react";
const AnswerOptions=({question,isChecked,handleAnswerChange,handleCheckboxChange})=>{
if(!question){
    return <div>No Question Available</div>
}

const {id, questionType ,choices }=question;
if(questionType==="single"){
    return (
    <div>
        {choices.sort().map((choice,index)=>(
            <div key={choice} className='form-check mb-3'>
            <input className='form-check-input' type="radio" id={choice} name={question.id} value={choice} checked={isChecked(question.id,choice)} onChange={()=>handleAnswerChange(id,choice)}/>                
            <label htmlFor={choice} className='form-check-label ms-2'>{choice}</label>
                </div>
        ))}
    </div>
)}
else if(questionType==="multiple"){
    return(
        <div>
        <p>Select all that apply</p>
        {choices.sort().map((choice,index)=>(
            <div key={choice} className='form-check mb-3'>
            <input className='form-check-input' type="checkbox" name={question.id} id={choice} value={choice} checked={isChecked(question.id,choice)} onChange={()=>handleCheckboxChange(id,choice)}/>                
            <label htmlFor={choice} className='form-check-label ms-2'>{choice}</label>
                </div>
        ))}
        </div>
    )
}
else{
    return null
}
}

  

export default AnswerOptions