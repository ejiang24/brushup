package edu.brown.cs32.server.mapsHandlers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static spark.Spark.after;

import com.squareup.moshi.Moshi;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import okio.Buffer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import spark.Spark;

//integration test geojson endpoint
public class GeoJSONHandlerTest {

  /**
   * This method is run at the beginning of our integration test suite. It sets up the server for
   * our integration testing.
   */
  @BeforeAll
  public static void initialSetup() {
    Spark.port(0);
    after(
        (request, response) -> {
          response.header("Access-Control-Allow-Origin", "*");
          response.header("Access-Control-Allow-Methods", "*");
        });
    Spark.init();
    Spark.awaitInitialization();
  }

  /**
   * Starts the Spark server on port 0, for testing purposes.
   */
  @BeforeEach
  public void setup() {
    // Setting up the handler for the GET /order endpoint
    MapState geoWrapper = new MapState();
    Spark.get("geo", new GeoJSONHandler(geoWrapper));
    Spark.init();
    Spark.awaitInitialization();
  }

  /**
   * Gracefully stop the Spark server.
   */
  @AfterEach
  public void teardown() {
    // Gracefully stop Spark listening on both endpoints
    Spark.unmap("geo");
    Spark.awaitStop(); // don't proceed until the server is stopped
  }

  /**
   * Helper to start a connection to a specific API endpoint/params
   * @param apiCall the call string, including endpoint
   *                (NOTE: this would be better if it had more structure!)
   * @return the connection for the given URL, just after connecting
   * @throws IOException if the connection fails for some reason
   */
  static private HttpURLConnection tryRequest(String apiCall) throws IOException {
    // Configure the connection (but don't actually send the request yet)
    URL requestURL = new URL("http://localhost:"+Spark.port()+"/"+apiCall);
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();

    // The default method is "GET", which is what we're using here.
    // If we were using "POST", we'd need to say so.
    //clientConnection.setRequestMethod("GET");

    clientConnection.connect();
    return clientConnection;
  }

  static private Map<String, Object> getResponse(HttpURLConnection clientConnection) throws IOException {
    Moshi moshi = new Moshi.Builder().build();
    Map<String, Object> map = moshi.adapter(Map.class).fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    return map;
  }

 @Test
 public void testBasicGeoAPI() throws IOException {
   HttpURLConnection clientConnection = tryRequest("geo");
   // Get an OK response (the *connection* worked, the *API* provides an error response)
   assertEquals(200, clientConnection.getResponseCode());
//

    Map<String, Object> expected = new HashMap<String, Object>();
    expected.put("result", "success");
    Map<String, Object> actual = getResponse(clientConnection);
    assertEquals(expected.get("result"), actual.get("result"));
//    // ^ If that succeeds, we got the expected response. Notice that this is *NOT* an exception, but a real Json reply.
   clientConnection.disconnect();
 }




}
