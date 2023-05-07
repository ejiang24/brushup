package edu.brown.cs.student.sprint3.server.handlers;

import edu.brown.cs.student.sprint3.server.json.JSONReader;
import edu.brown.cs.student.sprint3.server.records.MCQuiz;
import edu.brown.cs.student.sprint3.server.records.MetObject;
import edu.brown.cs.student.sprint3.server.records.SearchResult;
import edu.brown.cs.student.sprint3.server.responses.GeoResponses;
import spark.Request;
import spark.Response;
import spark.Route;

import java.io.FileReader;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class QuizHandler implements Route {
    private static final String MET_API_HAS_IMAGES_URL = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=%22%22";
    public static final Map<String, SearchResult> cache = new ConcurrentHashMap<>();

    @Override
    public Object handle(Request request, Response response) throws Exception {
        SearchResult searchResult = cache.get(MET_API_HAS_IMAGES_URL);
        if (searchResult == null) {
            System.out.println("Not loaded from cache!");
            JSONReader<SearchResult> searchReader = new JSONReader<>();
            searchResult = searchReader.serializeFromRequest(MET_API_HAS_IMAGES_URL, SearchResult.class);
            cache.put(MET_API_HAS_IMAGES_URL, searchResult);
        }

        //store the ids that have images (supposedly)
        List<Integer> ids = searchResult.objectIDs();

        MCQuiz quiz = new MCQuiz(new LinkedList<MCQuiz.MCQuestion>());
        Random rand = new Random();
        Set<Integer> usedIDs = new HashSet<>();

        //for now, generate 4 questions
        //todo: should be user input probably set how many questions, prob from a set list of choices
        while(quiz.questions().size() < 5) {
            //get the ranom object ID
            int randObjID = ids.get(rand.nextInt(ids.size()));

            //if not already used
            if(!usedIDs.contains(randObjID)) {
                String url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + randObjID;
                JSONReader<MetObject> objReader = new JSONReader<>();
                MetObject obj;
                try {
                    obj = objReader.serializeFromRequest(url, MetObject.class);
                } catch (IOException e) {
                    //if it's an invalid object
                    continue;
                }

                Set<String> answers = new HashSet<>();
                if(obj.artistDisplayName() == null || obj.artistDisplayName().equals("")) {
                    continue;
                }
                if(obj.primaryImage() == null || obj.primaryImage().equals("")) {
                    continue;
                }
                answers.add(obj.artistDisplayName());

                //make wrong artists --> the other answers
                while(answers.size() < 4) {
                    int artistObjID = ids.get(rand.nextInt(ids.size()));
                    String getArtistURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + artistObjID;
                    MetObject artistObj;
                    try {
                        artistObj = objReader.serializeFromRequest(getArtistURL, MetObject.class);
                    } catch (IOException e) {
                        continue;
                    }
                    if(artistObj.artistDisplayName() == null || artistObj.artistDisplayName().equals("")) {
                        continue;
                    }
                    System.out.println("ARTIST OBJECT:");
                    System.out.println(artistObj);
                    String artist = artistObj.artistDisplayName();
                    System.out.println("ARTIST DISPLAY NAME:" + artist);
                    answers.add(artist);
                    System.out.println("ARTIST SET: " + answers);
                }

                System.out.println("done making answers");

                String objName = "piece";
//                if (!obj.objectName().equals("")) {
//                    objName = obj.objectName().toLowerCase().split(" ")[0];
//                }
                MCQuiz.MCQuestion question = new MCQuiz.MCQuestion("Who is the creator of this " + objName + "?", "", answers, obj.artistDisplayName(), obj.primaryImage());
                quiz.questions().add(question);
            }
            usedIDs.add(randObjID);

            System.out.println("quiz");
            System.out.println(quiz);
        }

        System.out.println("done making questions");

        Map<String, Object> jsonMap = new LinkedHashMap<>();
        jsonMap.put("result", "success");
        jsonMap.put("quiz", quiz);
        //todo: change this from georesponses lol
        return new GeoResponses.GeoSuccessResponse(jsonMap).serialize();


    }
}
