package edu.brown.cs.student.sprint3.server.records;

import java.util.List;

public record MCQuiz(List<MCQuestion> questions) {

    public record MCQuestion(String question, String funFact, List<String> ans, String corrAns) {

    }
}
