package edu.brown.cs32.server.mapsHandlers;

import com.squareup.moshi.Moshi;
import edu.brown.cs.student.sprint3.server.handlers.FilterGeoHandler;
import edu.brown.cs.student.sprint3.server.json.GeoData;
import edu.brown.cs.student.sprint3.server.json.MapState;
import edu.brown.cs.student.sprint3.server.json.JSONReader;
import okio.Buffer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import spark.Spark;

import java.io.FileReader;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

//integration for filter endpoint
public class FilterGeoHandlerTest {
    /**
     * Set up
     */
    @BeforeAll
    public static void setup_before_everything() {
        Spark.port(0);
        Logger.getLogger("").setLevel(Level.WARNING); // empty name = root logger
    }

    //should this be final
    MapState geoWrapper = new MapState();

    @BeforeEach
    public void setup() {
        // Re-initialize state, etc. for _every_ test method run
        this.geoWrapper = new MapState();

        // In fact, restart the entire Spark server for every test!
        Spark.get("/filtergeo", new FilterGeoHandler(this.geoWrapper));
        Spark.init();
        Spark.awaitInitialization(); // don't continue until the server is listening
    }

    @AfterEach
    public void teardown() {
        // Gracefully stop Spark listening on both endpoints
        Spark.unmap("/filtergeo");
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
    public void testFilterGeoWorks() throws IOException {
        HttpURLConnection clientConnection = tryRequest("filtergeo?lonmax=41.00&lonmin=30.00&latmax=-74.9&latmin=-75");
        // Get an OK response (the *connection* worked, the *API* provides an error response)
        assertEquals(200, clientConnection.getResponseCode());

        JSONReader<GeoData> reader = new JSONReader<>();
        GeoData testGeoData = reader.getParsedJSON(new FileReader("src/data/testFilter.json"), GeoData.class);
        Map<String, Object> response = getResponse(clientConnection);
        assert response != null;
        assertEquals("success", response.get("result"));
        String responseMap = response.get("filtered data").toString();

        JSONReader<Object> reader1 = new JSONReader<>();
        Object testObject = reader1.getParsedJSON(new FileReader("src/data/testFilter.json"), Object.class);
        assertEquals(testObject.toString().trim(), responseMap.trim());

        clientConnection.disconnect();
    }

    //test for right amount of ipnuts, other testing


}
