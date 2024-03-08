package com.soabee.quizonline.controller;

import com.soabee.quizonline.model.Question;
import com.soabee.quizonline.service.IQuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.CREATED;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuestionController {
    private final IQuestionService questionService;
    @PostMapping("/create-new-question")
    public ResponseEntity<Question> createQuestion(@Valid @RequestBody Question question){
        Question createdQuestion = questionService.createQuestion(question);
        return ResponseEntity.status(CREATED).body(createdQuestion);
    }

    @GetMapping("/all-questions")
    public ResponseEntity<List<Question>> getAllQuestion(){
        List<Question> questions=questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }
    @GetMapping("/question/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        Optional<Question> theQuestion=questionService.getQuestionById(id);
        if(theQuestion.isPresent()){
            return ResponseEntity.ok(theQuestion.get());
        }
        else{
            throw new ChangeSetPersister.NotFoundException();
        }
    }
    @PutMapping("/question/{id}/update")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id,@RequestBody Question question) throws ChangeSetPersister.NotFoundException {
        Question updateQuestion=questionService.updateQuestion(id,question);
        return ResponseEntity.ok(updateQuestion);
    }

    @DeleteMapping("/question/{id}/delete")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/subjects")
    public ResponseEntity<List<String>> getAllSubjects(){
        List<String> subjects=questionService.getAllSubjects();
        return ResponseEntity.ok(subjects);
    }
    @GetMapping("/quiz/fetch-questions-for-user")
    public ResponseEntity<List<Question>> getQuestionForUser(@RequestParam Integer numOfQuestion,@RequestParam String subject){
    List<Question> allQuestion=questionService.getQuestionsForUser(numOfQuestion,subject);
    List<Question> mutableQuestions=new ArrayList<>(allQuestion);
    Collections.shuffle(mutableQuestions);

    int availableQuestions=Math.min(numOfQuestion,mutableQuestions.size());
    List<Question> randomQuestions=mutableQuestions.subList(0,availableQuestions);
    return ResponseEntity.ok(randomQuestions);

    }

}