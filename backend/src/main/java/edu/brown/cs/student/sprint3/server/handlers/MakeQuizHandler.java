package edu.brown.cs.student.sprint3.server.handlers;

import edu.brown.cs.student.sprint3.server.json.GeoData;
import edu.brown.cs.student.sprint3.server.json.MapState;
import edu.brown.cs.student.sprint3.server.responses.GeoResponses;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * This is the SearchGeoHandler. It handles the api call to "searchgeo", which returns
 * a list of Features within a specified search query.
 */
public class MakeQuizHandler implements Route {
    private final MapState geoJSONWrapper;

    /**
     * This is the constructor.
     * @param wrapper - state
     */
    public MakeQuizHandler(MapState wrapper) {
        this.geoJSONWrapper = wrapper;
    }

    /**
     * Handles the request for the makequiz endpoint.
     *
     * @param request the request
     * @param response the response
     * @return the response to the request
     */
    @Override
    public Object handle(Request request, Response response) {
        Map<String, Object> jsonMap = new LinkedHashMap<>();
        return new GeoResponses.GeoSuccessResponse(jsonMap).serialize();
        }
    }

