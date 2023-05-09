package edu.brown.cs.student.sprint3.server.responses;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import java.util.Map;

/**
 * This class holds response objects for our backend.
 */
public class BrushUpResponses {

  /**
   * Response object.
   * @param jsonMap - holds the keys and values of our response
   */
  public record BrushUpSuccessResponse(Map<String, Object> jsonMap) {

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

    public static BrushUpSuccessResponse deserialize(Object serializedResponse) {
      try {
        Moshi moshi = new Moshi.Builder().build();
        JsonAdapter<BrushUpSuccessResponse> jsonAdapter = moshi.adapter(BrushUpSuccessResponse.class);
        BrushUpSuccessResponse geoSuccessResponse = jsonAdapter.fromJsonValue(serializedResponse);
        return geoSuccessResponse;
      } catch (Exception e) {
        e.printStackTrace();
        throw e;
      }
    }

    public String getResult() {
      return jsonMap.get("result").toString();
    }
  }


}
