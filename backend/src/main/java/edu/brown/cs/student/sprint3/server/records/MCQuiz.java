package edu.brown.cs.student.sprint3.server.records;

import java.util.List;
import java.util.Set;

public record MCQuiz(List<MCQuestion> questions) {

    public record MCQuestion(String question, String funFact, Set<String> ans, String corrAns, String imgPath) {

    }
}
