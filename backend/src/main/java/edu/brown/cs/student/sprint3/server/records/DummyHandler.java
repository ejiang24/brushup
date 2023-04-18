package edu.brown.cs.student.sprint3.server.records;

import edu.brown.cs.student.sprint3.server.json.JSONReader;
import edu.brown.cs.student.sprint3.server.responses.GeoResponses;
import spark.Request;
import spark.Response;
import spark.Route;

import java.io.IOException;
import java.util.*;

public class DummyHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {

        String hasImagesURL =
                "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=%22%22";

        JSONReader<SearchResult> searchReader = new JSONReader<>();
        SearchResult res = searchReader.serializeFromRequest(hasImagesURL, SearchResult.class);

        List<Integer> ids = res.objectIDs();

        MCQuiz quiz = new MCQuiz(new LinkedList<MCQuiz.MCQuestion>());
        Random rand = new Random();
        Set<Integer> usedIDs = new HashSet<>();
        //for now, generate 4 questions
        while(quiz.questions().size() < 5) {
            //todo: for some reason got something without an img path

            int randObjID = ids.get(rand.nextInt(ids.size()));

            if(!usedIDs.contains(randObjID)) {
                String url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + randObjID;
                System.out.println("got a random object");
                JSONReader<MetObject> objReader = new JSONReader<>();
                MetObject obj = objReader.serializeFromRequest(url, MetObject.class);

                Set<String> answers = new HashSet<>();
                answers.add(obj.artistDisplayName());
                //make wrong artists
                while(answers.size() < 4) {
                    int artistObjID = ids.get(rand.nextInt(ids.size()));
                    String getArtistURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + artistObjID;
                    System.out.println("got another object for artists");
                    String artist = objReader.serializeFromRequest(getArtistURL, MetObject.class).artistDisplayName();
                    answers.add(artist);
                }

                System.out.println("done making answers");

                MCQuiz.MCQuestion question = new MCQuiz.MCQuestion("", "", answers, obj.artistDisplayName(), obj.primaryImage());
                quiz.questions().add(question);
            }
            usedIDs.add(randObjID);

            System.out.println("quiz");
            System.out.println(quiz);
        }


        //randomly select from these ids
        //format questions

        //when you format a question
            //choose a random ID
            //store the correct answer, add correct answer to answers, store image path whatever
            //also make a query for things from the same exhibit/department


        System.out.println("done making questions");

        Map<String, Object> jsonMap = new LinkedHashMap<>();
        jsonMap.put("result", "success");
        jsonMap.put("quiz", quiz);
        return new GeoResponses.GeoSuccessResponse(jsonMap).serialize();

//                APIPattern<ForecastData> forecastRequest = new APIPattern<>();
//        ForecastData forecastResponse = forecastRequest.PatternHandler(forecastURL,
//                ForecastData.class);
//
//        if (forecastResponse == null) {
//            return new WeatherDataFailureResponse("could not get weather data").serialize();
//        }
//
//        Double temp = forecastResponse.getTemperature(0);
//        String unit = forecastResponse.getTemperatureUnit(0);
//        String dateTime = forecastResponse.getDateTime(0);
//        String date = dateTime.split("T")[0];
//        String time = dateTime.split("T")[1].split("-")[0];
//        String timeZone = "-" + dateTime.split("T")[1].split("-")[1];
//
//        try {
//            return new WeatherHandler.WeatherSuccessResponse(lat, lon, temp, unit, date, time,
//                    timeZone).serialize();
//        } catch (Exception e) {
//            return new WeatherHandler.WeatherDataFailureResponse("Data not found.").serialize();
//        }

    }
}
