package edu.brown.cs32.server.json;

import edu.brown.cs.student.sprint3.server.json.GeoData;
import edu.brown.cs.student.sprint3.server.json.JSONReader;
import org.junit.jupiter.api.Test;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * This test suite has unit tests for our custom record GeoData.
 */
public class TestGeoData {

    /**
     * Tests Valid Bounds, which is used for bounding box functionality
     * @throws IOException - file reader
     */
    @Test
    public void testValidBoundsWorks() throws IOException {
        JSONReader<GeoData> reader = new JSONReader<>();
        //passed in json is result of query "filtergeo?lonmax=41.00&lonmin=30.00&latmax=-74.9&latmin=-75"
        GeoData filterDataFromJSON = reader.getParsedJSON(new FileReader("src/data/testFilter.json"), GeoData.class);

        for(GeoData.Feature feature : filterDataFromJSON.features()){
            assertTrue(feature.geometry().validBounds(-75, 30, -74.9, 41.00));
            assertFalse(feature.geometry().validBounds(-65, 41, -60, 44.00));
        }

        GeoData wholeData = reader.getParsedJSON(new FileReader("src/data/fullDownload.json"), GeoData.class);
        List<GeoData.Feature> filteredList = new ArrayList<>();
        for(GeoData.Feature feature : wholeData.features()) {
            if (feature.geometry() != null && feature.geometry().validBounds(-75, 30, -74.9, 41)) {
                filteredList.add(feature);
            }
        }

        for(GeoData.Feature feature : filteredList) {
            //manually check
            List<List<Double>> coordinateList = feature.geometry().coordinates().get(0).get(0);
            List<Double> pair = coordinateList.get(0);
            Double lat = pair.get(0);
            Double lon = pair.get(1);
            assertTrue(lat >= -75 && lat <= -74.9);
            assertTrue(lon >= 30 && lon <= 41);

        }

    }

    /**
     * Tests Search, which is used for partial highlighting in front end
     * @throws IOException - file reader
     */
    @Test
    public void testSearchWorks() throws IOException {
        JSONReader<GeoData> reader = new JSONReader<>();
        //passed in json is result of query "searchgeo?keyword=Providence"
        GeoData data = reader.getParsedJSON(new FileReader("src/data/keywordProvidence.json"), GeoData.class);

        int count = 0;
        for(GeoData.Feature feature : data.features()){
            assertTrue(feature.properties().search("Providence"));
            if(feature.properties().search("Watchung")) {
                count++;
            }
        }
        assertEquals(1, count);

        GeoData wholeData = reader.getParsedJSON(new FileReader("src/data/fullDownload.json"), GeoData.class);
        List<GeoData.Feature> filteredList = new ArrayList<>();
        for (GeoData.Feature feature : wholeData.features()) {
            if (feature.properties() != null) {
                if (feature.properties().search("Providence")) {
                    filteredList.add(feature);
                }
            }
        }

        for(GeoData.Feature feature : filteredList) {
            //manually check
            Map<String, String> areaDesc = feature.properties().area_description_data();
            boolean found = false;
            for(String value : areaDesc.values()) {
                if (value.contains("Providence")) {
                    found = true;
                    break;
                }
            }
            assertTrue(found);
        }

    }

    /**
     * Tests Search when the keyword is not present.
     * @throws IOException
     */
    @Test
    public void testSearchNotFound() throws IOException {
        JSONReader<GeoData> reader = new JSONReader<>();
        GeoData wholeData = reader.getParsedJSON(new FileReader("src/data/fullDownload.json"), GeoData.class);
        List<GeoData.Feature> filteredList = new ArrayList<>();
        for (GeoData.Feature feature : wholeData.features()) {
            if (feature.properties() != null) {
                if (feature.properties().search("asdf")) {
                    filteredList.add(feature);
                }
            }
        }
        assertEquals(0, filteredList.size());
    }

}
