package edu.brown.cs32.server.mapsHandlers;

import com.squareup.moshi.Moshi;
import edu.brown.cs.student.sprint3.server.handlers.FilterGeoHandler;
import edu.brown.cs.student.sprint3.server.handlers.SearchGeoHandler;
import edu.brown.cs.student.sprint3.server.json.MapState;
import okio.Buffer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import spark.Spark;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * This class contains fuzz tests for our api calls.
 * We generate random inputs using FuzzHelpers.
 */
public class FuzzTest {
    /**
     * Set up
     */
    @BeforeAll
    public static void setup_before_everything() {
        Spark.port(0);
        Logger.getLogger("").setLevel(Level.WARNING); // empty name = root logger
    }

    //state
    MapState geoWrapper = new MapState();

    @BeforeEach
    public void setup() {
        // Re-initialize state, etc. for _every_ test method run
        this.geoWrapper = new MapState();

        // In fact, restart the entire Spark server for every test!
        Spark.get("/filtergeo", new FilterGeoHandler(this.geoWrapper));
        Spark.get("/searchgeo", new SearchGeoHandler(this.geoWrapper));
        Spark.init();
        Spark.awaitInitialization(); // don't continue until the server is listening
    }

    @AfterEach
    public void teardown() {
        // Gracefully stop Spark listening on both endpoints
        Spark.unmap("/filtergeo");
        Spark.unmap("/searchgeo");
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

        clientConnection.connect();
        return clientConnection;
    }

    /**
     * Gets response
     * @param clientConnection - connection
     * @return - response map
     * @throws IOException
     */
    static private Map<String, Object> getResponse(HttpURLConnection clientConnection) throws IOException {
        Moshi moshi = new Moshi.Builder().build();
        Map<String, Object> map = moshi.adapter(Map.class).fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
        return map;
    }
    final static int NUM_TRIALS = 500;

    /**
     * Fuzz test search with NO given query params.
     */
    @Test
    public void testSearchFuzzBadParams() {
        for(int counter=0;counter<NUM_TRIALS;counter++) {
            try {
                String testQuery = FuzzHelpers.getRandomSearchBadParams();
                HttpURLConnection fuzzConnection = tryRequest(testQuery);
                int responseCode = fuzzConnection.getResponseCode();

                if (responseCode == 200) {
                    System.out.println("client connection was a success");
                }
                if (responseCode == 404) {
                    System.out.println("404 error");
                }
                if (responseCode >= 400 && responseCode < 500 & responseCode != 404) {
                    System.out.println("4xx error");
                }
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
    }

    /**
     * Fuzz test search with correctly shaped params and inputs.
     */
    @Test
    public void testSearchFuzzGoodParams() {
        for(int counter=0;counter<NUM_TRIALS;counter++) {
            try {
                String testQuery = FuzzHelpers.getRandomSearchGoodParams();
                HttpURLConnection fuzzConnection = tryRequest(testQuery);
                int responseCode = fuzzConnection.getResponseCode();

                if (responseCode == 200) {
                    System.out.println("client connection was a success");
                }
                if (responseCode == 404) {
                    System.out.println("404 error");
                }
                if (responseCode >= 400 && responseCode < 500 & responseCode != 404) {
                    System.out.println("4xx error");
                }
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
    }

    /**
     * Fuzz test filter with correctly shaped params and inputs.
     */
    @Test
    public void testFilterFuzzGoodParams() {
        for(int counter=0;counter<NUM_TRIALS;counter++) {
            try {
                String testQuery = FuzzHelpers.getRandomFilterGoodParams();
                HttpURLConnection fuzzConnection = tryRequest(testQuery);
                int responseCode = fuzzConnection.getResponseCode();

                if (responseCode == 200) {
                    System.out.println("client connection was a success");

                    Map<String, Object> response = getResponse(fuzzConnection);
                    System.out.println(response.get("result"));
                    if(response.get("result").equals("error_bad_request")) {
                        System.out.println(response.get("message"));
                    }
                }
                if (responseCode == 404) {
                    System.out.println("404 error");
                }
                if (responseCode >= 400 && responseCode < 500 & responseCode != 404) {
                    System.out.println("4xx error");
                }
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
    }

    /**
     * Fuzz test filter with correctly shaped params and inputs.
     */
    @Test
    public void testFilterFuzzGoodParamsBadInput() {
        for(int counter=0;counter<NUM_TRIALS;counter++) {
            try {
                String testQuery = FuzzHelpers.getRandomFilterGoodParamsBadInput();
                HttpURLConnection fuzzConnection = tryRequest(testQuery);
                int responseCode = fuzzConnection.getResponseCode();

                if (responseCode == 200) {
                    System.out.println("client connection was a success");
                }
                if (responseCode == 404) {
                    System.out.println("404 error");
                }
                if (responseCode >= 400 && responseCode < 500 & responseCode != 404) {
                    System.out.println("4xx error");
                }
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
    }

}
