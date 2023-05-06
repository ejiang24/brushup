package edu.brown.cs.student.sprint3.server.handlers;

import edu.brown.cs.student.sprint3.server.responses.GeoResponses;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.*;

/**
 * Proof of concept handler for sending data to backend after a quiz
 */
public class SaveGameData implements Route {


    public Map<String, Map<String, Integer>> savedScores; //user -> game -> score
    /**
     * This is the constructor.
     */
    public SaveGameData() {
        savedScores = new HashMap<>(); //TODO: persistent data storage
    }

    /**
     * Handles the request for the search endpoint.
     *
     * @param request the request
     * @param response the response
     * @return the response to the request
     */
    @Override
    public Object handle(Request request, Response response) {
        String userID;
        String gameID;
        int score;
        Map<String, Object> jsonMap = new LinkedHashMap<>();

        QueryParamsMap qp = request.queryMap();

        if (!qp.hasKey("gameID") || !qp.hasKey("userID") || !qp.hasKey("score")) {
            jsonMap.put("result", "error_bad_request");
            jsonMap.put("message", "Missing required parameters. Usage: 'savegamedata?userID=[User ID]&gameID=[Game ID]&score=[Score]");
            return new GeoResponses.GeoSuccessResponse(jsonMap).serialize();
        }

        gameID = qp.value("gameID");
        userID = qp.value("userID");

        try {
            score = Integer.parseInt(qp.value("score"));
        } catch (NumberFormatException e) {
            jsonMap.put("result", "error_bad_request");
            jsonMap.put("message", "Invalid score parameter. Score must be an integer.");
            return new GeoResponses.GeoSuccessResponse(jsonMap).serialize();
        }

        if (savedScores.get(userID) == null) {
            savedScores.put(userID, new HashMap<String, Integer>());
        }

        savedScores.get(userID).put(gameID, score);

        jsonMap.put("result", "success");
        return new GeoResponses.GeoSuccessResponse(jsonMap).serialize();
    }
}
