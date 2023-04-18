package edu.brown.cs.student.sprint3.server.handlers;

import edu.brown.cs.student.sprint3.server.game.Game;
import edu.brown.cs.student.sprint3.server.json.GeoData;
import edu.brown.cs.student.sprint3.server.json.MapState;
import edu.brown.cs.student.sprint3.server.responses.GeoResponses;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.*;

/**
 * This is the SearchGeoHandler. It handles the api call to "searchgeo", which returns
 * a list of Features within a specified search query.
 */
public class GetGameStateHandler implements Route {

    HashMap<String, Game> activeGames;

    /**
     * This is the constructor.
     */
    public GetGameStateHandler() {
        activeGames = new HashMap<>();
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
        String gameID;
        Map<String, Object> jsonMap = new LinkedHashMap<>();

        //if too many query parameters
        int numQueries = request.queryParams().size();
        if (numQueries > 1) {
            jsonMap.put("result", "error_bad_request");
            jsonMap.put("message", "Too many queries. Usage: 'getgamestate?gameID=[Game ID]");
            return new GeoResponses.GeoSuccessResponse(jsonMap).serialize();
        }

        QueryParamsMap qp = request.queryMap();
        gameID = qp.value("gameid");

        if (activeGames.containsKey(gameID))
        {
            activeGames.get(gameID).turn++;
        }
        else
        {
            activeGames.put(gameID, new Game());
        }

        jsonMap.put("message", "Game " + gameID + " loaded.");
        jsonMap.put("turn", activeGames.get(gameID).turn);

        return new GeoResponses.GeoSuccessResponse(jsonMap).serialize();
    }
}
