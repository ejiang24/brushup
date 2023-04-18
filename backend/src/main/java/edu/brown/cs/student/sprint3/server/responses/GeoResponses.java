package edu.brown.cs.student.sprint3.server.responses;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import java.util.Map;

/**
 * This class holds response objects for our backend.
 */
public class GeoResponses {

  /**
   * Response object.
   * @param jsonMap - holds the keys and values of our response
   */
  public record GeoSuccessResponse(Map<String, Object> jsonMap) {
    public String serialize() {
      try {
        Moshi moshi = new Moshi.Builder().build();
        JsonAdapter<Map<String, Object>> jsonAdapter = moshi.adapter(
            Types.newParameterizedType(Map.class, String.class, Object.class));
        return jsonAdapter.indent("  ").toJson(jsonMap);
      } catch (Exception e) {
        e.printStackTrace();
        throw e;
      }
    }
  }

}
