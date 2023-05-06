package edu.brown.cs32.server;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import edu.brown.cs.student.sprint3.server.handlers.SaveGameData;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import spark.Request;
import spark.Response;
import spark.QueryParamsMap;

public class SaveGameDataTest {

    private SaveGameData handler = new SaveGameData();

    @Test
    public void testHandleMissingParameters() {
        Request request = Mockito.mock(Request.class);
        Response response = Mockito.mock(Response.class);
        QueryParamsMap queryParams = Mockito.mock(QueryParamsMap.class);

        Mockito.when(request.queryMap()).thenReturn(queryParams);
        Mockito.when(queryParams.hasKey("gameID")).thenReturn(false);
        Mockito.when(queryParams.hasKey("userID")).thenReturn(false);
        Mockito.when(queryParams.hasKey("score")).thenReturn(false);

        String result = (String) handler.handle(request, response);
        assertTrue(result.contains("error_bad_request"));
        assertTrue(result.contains("Missing required parameters"));
    }

    @Test
    public void testHandleInvalidScore() {
        Request request = Mockito.mock(Request.class);
        Response response = Mockito.mock(Response.class);
        QueryParamsMap queryParams = Mockito.mock(QueryParamsMap.class);

        Mockito.when(request.queryMap()).thenReturn(queryParams);
        Mockito.when(queryParams.hasKey("gameID")).thenReturn(true);
        Mockito.when(queryParams.hasKey("userID")).thenReturn(true);
        Mockito.when(queryParams.hasKey("score")).thenReturn(true);
        Mockito.when(queryParams.value("gameID")).thenReturn("1");
        Mockito.when(queryParams.value("userID")).thenReturn("1");
        Mockito.when(queryParams.value("score")).thenReturn("invalid");

        String result = (String) handler.handle(request, response);
        assertTrue(result.contains("error_bad_request"));
        assertTrue(result.contains("Invalid score parameter"));
    }

    @Test
    public void testHandleValidRequest() {
        Request request = Mockito.mock(Request.class);
        Response response = Mockito.mock(Response.class);
        QueryParamsMap queryParams = Mockito.mock(QueryParamsMap.class);

        Mockito.when(request.queryMap()).thenReturn(queryParams);
        Mockito.when(queryParams.hasKey("gameID")).thenReturn(true);
        Mockito.when(queryParams.hasKey("userID")).thenReturn(true);
        Mockito.when(queryParams.hasKey("score")).thenReturn(true);
        Mockito.when(queryParams.value("gameID")).thenReturn("1");
        Mockito.when(queryParams.value("userID")).thenReturn("1");
        Mockito.when(queryParams.value("score")).thenReturn("100");

        String result = (String) handler.handle(request, response);
        assertTrue(result.contains("success"));
        assertTrue(handler.savedScores.containsKey("1"));
        assertTrue(handler.savedScores.get("1").containsKey("1"));
        assertEquals(handler.savedScores.get("1").get("1"), (Integer) 100);
    }
}
