package edu.brown.cs32.server;

import edu.brown.cs.student.sprint3.server.handlers.QuizHandler;
import edu.brown.cs.student.sprint3.server.records.MCQuiz;
import edu.brown.cs.student.sprint3.server.responses.GeoResponses;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import spark.Request;
import spark.Response;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class QuizHandlerTest {

    private QuizHandler quizHandler;
    private Request request;
    private Response response;

    @BeforeEach
    void setUp() {
        quizHandler = new QuizHandler();
        request = mock(Request.class);
        response = mock(Response.class);
    }

    @Test
    void testHandleReturnsQuiz() throws Exception {
        Object result = quizHandler.handle(request, response);
        assertNotNull(result);
        assertTrue(result instanceof GeoResponses.GeoSuccessResponse);
        GeoResponses.GeoSuccessResponse successResponse = (GeoResponses.GeoSuccessResponse) result;
        Map<String, Object> jsonMap = successResponse.jsonMap();
        assertNotNull(jsonMap.get("quiz"));
        assertTrue(jsonMap.get("quiz") instanceof MCQuiz);
        MCQuiz quiz = (MCQuiz) jsonMap.get("quiz");
        List<MCQuiz.MCQuestion> questions = quiz.questions();
        assertEquals(5, questions.size());
    }

    @Test
    void testQuizQuestionsContainCorrectAnswer() throws Exception {
        Object result = quizHandler.handle(request, response);
        GeoResponses.GeoSuccessResponse successResponse = (GeoResponses.GeoSuccessResponse) result;
        Map<String, Object> jsonMap = successResponse.jsonMap();
        MCQuiz quiz = (MCQuiz) jsonMap.get("quiz");
        List<MCQuiz.MCQuestion> questions = quiz.questions();
        for (MCQuiz.MCQuestion question : questions) {
            Set<String> answers = question.ans();
            assertTrue(answers.contains(question.corrAns()));
        }
    }

    @Test
    void testQuizQuestionsContainFourChoices() throws Exception {
        Object result = quizHandler.handle(request, response);
        GeoResponses.GeoSuccessResponse successResponse = (GeoResponses.GeoSuccessResponse) result;
        Map<String, Object> jsonMap = successResponse.jsonMap();
        MCQuiz quiz = (MCQuiz) jsonMap.get("quiz");
        List<MCQuiz.MCQuestion> questions = quiz.questions();
        for (MCQuiz.MCQuestion question : questions) {
            Set<String> answers = question.ans();
            assertEquals(4, answers.size());
        }
    }

    @Test
    void testQuizQuestionsContainNoDuplicates() throws Exception {
        Object result = quizHandler.handle(request, response);
        GeoResponses.GeoSuccessResponse successResponse = (GeoResponses.GeoSuccessResponse) result;
        Map<String, Object> jsonMap = successResponse.jsonMap();
        MCQuiz quiz = (MCQuiz) jsonMap.get("quiz");
        List<MCQuiz.MCQuestion> questions = quiz.questions();
        Set<String> allChoices = new HashSet<>();
        for (MCQuiz.MCQuestion question : questions) {
            Set<String> answers = question.ans();
            for (String answer : answers) {
                assertFalse(allChoices.contains(answer));
                allChoices.add(answer);
            }
        }
    }


    //Basic fuzz test

    @Test
    public void testFuzz() throws Exception {
        Random rand = new Random();
        for (int i = 0; i < 100; i++) {
            String input = generateInput(rand);
            quizHandler.handle(request, response);
        }
    }

    private String generateInput(Random rand) {
        // Generate a random input to the QuizHandler
        // generate random query parameters for the MET_API_HAS_IMAGES_URL
        // For example:
        String[] queries = {"painting", "sculpture", "drawing", "photograph", "print"};
        String query = queries[rand.nextInt(queries.length)];
        return "/quiz?query=" + query;
    }

}
