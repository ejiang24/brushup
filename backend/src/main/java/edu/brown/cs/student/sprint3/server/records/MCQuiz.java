package edu.brown.cs.student.sprint3.server.records;

import java.util.*;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.List;

public record MCQuiz(List<MCQuestion> questions) {

    public record MCQuestion(String question, String funFact, Set<String> ans, String corrAns, String imgPath) {

    }

    public static MCQuiz parse(String jsonString) {
        Gson gson = new Gson();
        QuizData data = gson.fromJson(jsonString, QuizData.class);
        List<Question> questionList = Arrays.asList(data.quiz.questions);
        List<MCQuestion> questions = questionList.stream()
                .map(question -> new MCQuestion(
                        question.question,
                        question.funFact,
                        new HashSet<>(Arrays.asList(question.ans)),
                        question.corrAns,
                        question.imgPath))
                .toList();
        return new MCQuiz(questions);
    }

    private static class QuizData {
        String result;
        Quiz quiz;
    }

    private static class Quiz {
        Question[] questions;
    }

    private static class Question {
        String question;
        String funFact;
        String[] ans;
        String corrAns;
        String imgPath;
    }
}
