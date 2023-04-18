package edu.brown.cs.student.sprint3.server.handlers;

import edu.brown.cs.student.sprint3.server.json.GeoData;
import edu.brown.cs.student.sprint3.server.responses.GeoResponses.GeoSuccessResponse;
import java.util.LinkedHashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

import edu.brown.cs.student.sprint3.server.json.MapState;

/**
 * This is the GeoJSONHandler. It handles the api call to "geodata", which returns the entire,
 * unfiltered dataset.
 */
public class GeoJSONHandler implements Route {

    private MapState geoJSONWrapper;

    /**
     * THOUGHTS: need to pass the filereader and the record into a json reader
     */

    /**
     * This is the constructor.
     * @param wrapper - state
     */
    public GeoJSONHandler(MapState wrapper) {
        this.geoJSONWrapper = wrapper;
    }

    /**
     * This is the handler. It is called when the request is made.
     * @param request - request
     * @param response - response
     * @return - serialized JSONMap as a response
     */
    @Override
    public Object handle(Request request, Response response) {
        int numQueries = request.queryParams().size();
        Map<String, Object> jsonMap = new LinkedHashMap<>();

        if (numQueries > 0) {
            jsonMap.put("result", "error_bad_request");
            jsonMap.put("message", "Should be zero query parameters. Usage: '/geojson");
            return new GeoSuccessResponse(jsonMap).serialize();
        }

        try {
            GeoData data = this.geoJSONWrapper.getGeoJSON();
            jsonMap.put("result", "success");
            jsonMap.put("data", data);
            return new GeoSuccessResponse(jsonMap).serialize();
            // User requested a non-existent file in the allowed directory

        } catch (Exception e) {
            jsonMap.put("result", "error_bad_request");
            jsonMap.put("message", e.getMessage());

            return new GeoSuccessResponse(jsonMap).serialize();
        }
    }

}