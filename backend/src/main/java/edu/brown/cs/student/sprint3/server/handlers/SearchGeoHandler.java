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
public class SearchGeoHandler implements Route {
    private final MapState geoJSONWrapper;

    /**
     * This is the constructor.
     * @param wrapper - state
     */
    public SearchGeoHandler(MapState wrapper) {
        this.geoJSONWrapper = wrapper;
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
        String keyword;
        Map<String, Object> jsonMap = new LinkedHashMap<>();

        //if too many query parameters
        int numQueries = request.queryParams().size();
        if (numQueries > 1) {
            jsonMap.put("result", "error_bad_request");
            jsonMap.put("message", "Too many queries. Usage: 'search?keyword=[input keyword here]");
            return new GeoResponses.GeoSuccessResponse(jsonMap).serialize();
        }

        QueryParamsMap qp = request.queryMap();
        keyword = qp.value("keyword");

        //checks that a keyword was entered
        if (keyword == null) {
            jsonMap.put("result", "error_bad_request");
            jsonMap.put("message", "Must have a keyword.");
            return new GeoResponses.GeoSuccessResponse(jsonMap).serialize();
        }

        try {
            GeoData data = this.geoJSONWrapper.getGeoJSON();

            //filter the list of areas in the geojson
            //check that every feature coord is within the bounds of the bounding box and add to list
            List<GeoData.Feature> allFeatures = data.features();
            List<GeoData.Feature> filteredFeatures = new ArrayList<>();
            for (GeoData.Feature feature : allFeatures) {
                if (feature.properties() != null) {
                    if (feature.properties().search(keyword)) {
                        filteredFeatures.add(feature);
                    }
                }
            }

            GeoData result = new GeoData("FeatureCollection", filteredFeatures);
            jsonMap.put("result", "success");
            jsonMap.put("data", result);

            //update ****persistent**** search history
            this.geoJSONWrapper.updateHistory(keyword, result);

            return new GeoResponses.GeoSuccessResponse(jsonMap).serialize();
        } catch (Exception e) {
            jsonMap.put("result", "error");
            jsonMap.put("message", e.getMessage());
            return new GeoResponses.GeoSuccessResponse(jsonMap).serialize();
        }
    }
}
