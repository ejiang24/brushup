package edu.brown.cs.student.sprint3.server.records;

import java.util.List;
import java.util.Set;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.List;

public record MCQuiz(List<MCQuestion> questions) {

    public record MCQuestion(String question, String funFact, Set<String> ans, String corrAns, String imgPath) {

    }

    public static MCQuiz deserialize(String json) {
        Gson gson = new Gson();
        Type type = new TypeToken<MCQuiz>(){}.getType();
        return gson.fromJson(json, type);
    }
}
