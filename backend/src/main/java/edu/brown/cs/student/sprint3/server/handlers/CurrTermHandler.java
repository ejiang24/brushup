package edu.brown.cs.student.sprint3.server.handlers;

import edu.brown.cs.student.sprint3.server.json.MapState;
import edu.brown.cs.student.sprint3.server.responses.GeoResponses;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * This is the CurrTermHandler. It handles the API call to "currterm" which returns
 * the most recent search query.
 */
public class CurrTermHandler implements Route {

    private final MapState state;

    /**
     * constructor
     * @param state
     */
    public CurrTermHandler(MapState state) {
        this.state = state;
    }

    /**
     * Called when api call is made. Gets current term from state.
     * @param request
     * @param response
     * @return - response
     */
    @Override
    public Object handle(Request request, Response response) {
        Map<String, Object> jsonMap = new LinkedHashMap<>();
        int numQueries = request.queryParams().size();

        //if any query parameters
        if (numQueries > 0) {
            jsonMap.put("result", "error_bad_request");
            jsonMap.put("message", "Should be zero query parameters. Usage: '/currterm");
            return new GeoResponses.GeoSuccessResponse(jsonMap).serialize();
        }

        try {
            String currTerm = this.state.getCurrTerm();
            jsonMap.put("result", "success");
            jsonMap.put("data", currTerm);
            return new GeoResponses.GeoSuccessResponse(jsonMap).serialize();
        } catch (Exception e) {
            jsonMap.put("result", "error_bad_request");
            jsonMap.put("message", e.getMessage());
            return new GeoResponses.GeoSuccessResponse(jsonMap).serialize();
        }
    }
}
