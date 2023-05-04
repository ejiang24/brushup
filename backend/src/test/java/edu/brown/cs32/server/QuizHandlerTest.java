package edu.brown.cs32.server;

import edu.brown.cs.student.sprint3.server.handlers.QuizHandler;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.IOException;

import spark.Spark;
import spark.utils.IOUtils;

import java.net.HttpURLConnection;
import java.net.URL;

import static org.junit.jupiter.api.Assertions.*;

public class QuizHandlerTest {

    @BeforeAll
    public static void setUp() throws Exception {
        QuizHandler handler = new QuizHandler();
        Spark.port(4567);
        Spark.post("/makequiz", handler);
        Spark.awaitInitialization();
    }

    @AfterAll
    public static void tearDown() throws Exception {
        Spark.stop();
    }

    @Test
    public void testDummyHandler() {
        TestResponse res = request("POST", "/makequiz");
        assertEquals(200, res.status);
        assertTrue(res.body.contains("quiz"));
    }

    private TestResponse request(String method, String path) {
        try {
            URL url = new URL("http://localhost:4567" + path);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod(method);
            connection.setDoOutput(true);
            connection.connect();
            String body = IOUtils.toString(connection.getInputStream());
            return new TestResponse(connection.getResponseCode(), body);
        } catch (IOException e) {
            e.printStackTrace();
            fail("Sending request failed: " + e.getMessage());
            return null;
        }
    }

    private record TestResponse(int status, String body) {
    }
}
