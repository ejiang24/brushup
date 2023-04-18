package edu.brown.cs.student.sprint3.server.json;

import java.util.List;
import java.util.Map;

/**
 * This is our custom record to store a GeoJSON.
 * @param type - type of GeoJSON
 * @param features - list of Features
 */
public record GeoData(String type, List<Feature> features) {

  /**
   * This is our custom record to store Features.
   * @param type - type
   * @param geometry - holds things like coords
   * @param properties - properties, evaluations, etc.
   */
  public record Feature(String type, Geometry geometry, Properties properties) {

    /**
     * This is our custom record to store Geometry.
     * @param type - type
     * @param coordinates - stacked list which holds coordinates
     */
    public record Geometry(String type, List<List<List<List<Double>>>> coordinates) {

      /**
       * This method takes in a minimum and maximum of both longitude and latitude and returns
       * true if the current Geometry has coordinates that fall within that range.
       * @param latmin - mininum latitude
       * @param lonmin - minimum longitude
       * @param latmax - maximum latitude
       * @param lonmax - maximum longitude
       * @return
       */
      public boolean validBounds(double latmin, double lonmin, double latmax, double lonmax) {
        List<List<Double>> coordinateList = this.coordinates.get(0).get(0);
        List<Double> pair = coordinateList.get(0);
        Double lat = pair.get(0);
        Double lon = pair.get(1);
        return !(lon < lonmin) && !(lon > lonmax) && !(lat < latmin) && !(lat > latmax);
      }
    }

    /**
     * This is our custom record to store Properties.
     * @param state
     * @param city
     * @param name
     * @param holc_id
     * @param holc_grade
     * @param neighborhood_id
     * @param area_description_data
     */
    public record Properties(String state, String city, String name,
                             String holc_id, String holc_grade, String neighborhood_id,
                             Map<String, String> area_description_data) {

      /**
       * This method searches the area_description_data for a keyword.
       * @param keyword - search target
       * @return - boolean indicating if the Properties has the keyword
       */
      public boolean search(String keyword) {
        if (this.area_description_data != null) {
          for(String key: this.area_description_data.keySet()){
            if (key.contains(keyword)) return true;
          }
          for(String value: this.area_description_data.values()) {
            if (value.contains(keyword)) return true;
          }
        }
        return false;
      }

    }
  }
}