package edu.brown.cs.student.sprint3.server.json;

import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * This class holds the state for our server.
 * This includes the whole GeoJSON to be used for filtering/searching
 * as well as the stored search history.
 */
public class MapState {
    private GeoData data;
    private final Map<String, GeoData> history;
    private String currTerm;

    /**
     * This is the constructor. It parses the GeoData json into a GeoData record.
     */
    public MapState() {
        this.history = new HashMap<>();

        JSONReader<GeoData> reader = new JSONReader<>();
        try {
            //populate data field
            this.data = reader.getParsedJSON(new FileReader("src/data/fullDownload.json"), GeoData.class);
            System.out.println("successfully parsed json");
        } catch (IOException e) {
            System.out.print(e.getMessage());
        }
    }

    /**
     * Update stored search history
     * @param query - key
     * @param result - value
     */
    public void updateHistory(String query, GeoData result) {
        //defensive copies
        String queryCopy = query;
        GeoData resultCopy = result;

        //prevent duplicates
        if(!this.history.containsKey(queryCopy)) {
            this.history.put(queryCopy, resultCopy);
        }
        this.currTerm = queryCopy;
    }

    /**
     * Gets the GeoJSON.
     * @return geoJSON
     */
    public GeoData getGeoJSON() {
        return this.data;
    }

    /**
     * Gets the most recent search term.
     * @return term
     */
    public String getCurrTerm() {
        return this.currTerm;
    }
}
