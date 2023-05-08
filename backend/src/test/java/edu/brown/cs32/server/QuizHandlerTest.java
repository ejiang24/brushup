package edu.brown.cs32.server;

import edu.brown.cs.student.sprint3.server.handlers.CacheManager;
import edu.brown.cs.student.sprint3.server.handlers.QuizHandler;
import edu.brown.cs.student.sprint3.server.records.MCQuiz;
import edu.brown.cs.student.sprint3.server.records.SearchResult;
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
        quizHandler = new QuizHandler(new CacheManager<SearchResult>());
        request = mock(Request.class);
        response = mock(Response.class);
    }

    @Test
    void testHandleReturnsQuiz() throws Exception {
        Object result = quizHandler.handle(request, response);
        MCQuiz quiz = MCQuiz.parse(result.toString());
        assertNotNull(quiz);
        List<MCQuiz.MCQuestion> questions = quiz.questions();
        assertEquals(5, questions.size());
    }

    @Test
    void testQuizQuestionsContainCorrectAnswer() throws Exception {
        Object result = quizHandler.handle(request, response);
        MCQuiz quiz = MCQuiz.parse(result.toString());
        List<MCQuiz.MCQuestion> questions = quiz.questions();
        for (MCQuiz.MCQuestion question : questions) {
            Set<String> answers = question.ans();
            assertTrue(answers.contains(question.corrAns()));
        }
    }

    @Test
    void testQuizQuestionsContainFourChoices() throws Exception {
        Object result = quizHandler.handle(request, response);
        MCQuiz quiz = MCQuiz.parse(result.toString());
        List<MCQuiz.MCQuestion> questions = quiz.questions();
        for (MCQuiz.MCQuestion question : questions) {
            Set<String> answers = question.ans();
            assertEquals(4, answers.size());
        }
    }

    @Test
    void testQuizQuestionsContainNoDuplicates() throws Exception {
        Object result = quizHandler.handle(request, response);
        MCQuiz quiz = MCQuiz.parse(result.toString());
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
}
