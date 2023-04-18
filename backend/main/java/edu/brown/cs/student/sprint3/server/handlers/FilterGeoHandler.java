package edu.brown.cs.student.sprint3.server.handlers;

import edu.brown.cs.student.sprint3.server.json.GeoData;
import edu.brown.cs.student.sprint3.server.json.GeoData.Feature;
import edu.brown.cs.student.sprint3.server.json.MapState;
import edu.brown.cs.student.sprint3.server.responses.GeoResponses.GeoSuccessResponse;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * This is the FilterGeoHandler. It handles the api call to "filtergeo", which returns
 * a list of Features within a specified coordinate range.
 */
public class FilterGeoHandler implements Route {

  private final MapState geoJSONWrapper;

  /**
   * This is the constructor.
   * @param wrapper - state
   */
  public FilterGeoHandler(MapState wrapper) {
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
    double latmin;
    double lonmin;
    double latmax;
    double lonmax;

    Map<String, Object> jsonMap = new LinkedHashMap<>();
    try {
      QueryParamsMap qp = request.queryMap();
      latmin = Double.parseDouble(qp.value("latmin"));
      lonmin = Double.parseDouble(qp.value("lonmin"));
      latmax = Double.parseDouble(qp.value("latmax"));
      lonmax = Double.parseDouble(qp.value("lonmax"));
    } catch(NumberFormatException e) {
      //if not numbers
      jsonMap.put("result", "error_bad_request");
      jsonMap.put("message", "inputs must be numbers.");
      return new GeoSuccessResponse(jsonMap).serialize();
    } catch (Exception e) {
      jsonMap.put("result", "error_bad_request");
      jsonMap.put("message",
          e.getMessage());
      return new GeoSuccessResponse(jsonMap).serialize();
    }

    //checks that coordinates are in the valid range
    if (latmin < -90.0 || latmin > 90.0 || latmax < -90.0 || latmax > 90.0 ||
        lonmin < -180.0 || lonmin > 180 || lonmax < -180.0 || lonmax > 180.0) {
      jsonMap.put("result", "error_bad_request");
      jsonMap.put("message", "make sure (latmin, lonmin) and (latmax, lonmax) are in the valid range");
      return new GeoSuccessResponse(jsonMap).serialize();
    }

    //checks if min is always less than max
    if (latmin > latmax || lonmin > lonmax) {
      jsonMap.put("result", "error_bad_request");
      jsonMap.put("message", "maximum values must be greater than or equal to minimum values");
      return new GeoSuccessResponse(jsonMap).serialize();
    }

    try {
      GeoData data = this.geoJSONWrapper.getGeoJSON();

      //filter the list of areas in the geojson
      //check that every feature coord is within the bounds of the bounding box and add to list
      List<Feature> allFeatures = data.features();
      List<Feature> filteredFeatures = new ArrayList<>();
      for (Feature feature : allFeatures) {
        if (feature.geometry() != null) {
          if (feature.geometry().validBounds(latmin, lonmin, latmax, lonmax)) {
            filteredFeatures.add(feature);
          }
        }
      }
      GeoData filteredResult = new GeoData("FeatureCollection", filteredFeatures);
      jsonMap.put("result", "success");
      jsonMap.put("data", filteredResult);
      return new GeoSuccessResponse(jsonMap).serialize();
    } catch (Exception e) {
      e.printStackTrace();
      jsonMap.put("result", "error_bad_json");
      jsonMap.put("message", e.getMessage());
      return new GeoSuccessResponse(jsonMap).serialize();
    }
  }
}
