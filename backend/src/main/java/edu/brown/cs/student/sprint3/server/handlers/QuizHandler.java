package edu.brown.cs.student.sprint3.server.handlers;

import edu.brown.cs.student.sprint3.server.json.JSONReader;
import edu.brown.cs.student.sprint3.server.records.MCQuiz;
import edu.brown.cs.student.sprint3.server.records.MetObject;
import edu.brown.cs.student.sprint3.server.records.SearchResult;
import edu.brown.cs.student.sprint3.server.responses.BrushUpResponses;
import spark.Request;
import spark.Response;
import spark.Route;

import java.io.IOException;
import java.util.*;

/**
 * This is the QuizHandler class which manages the makequiz endpoint.
 * Usjng the MetAPI, it generates a quiz randomly.
 */
public class QuizHandler implements Route {
    private static final String MET_API_HAS_IMAGES_URL = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=%22%22";
    private final CacheManager<SearchResult> cacheManager;

    public QuizHandler(CacheManager<SearchResult> cacheManager) {
        this.cacheManager = cacheManager;
    }

    /**
     * Makes API calls to the Met API to randomly generate a quiz of 5 questions.
     * @param request - request
     * @param response - response
     * @return - response object
     * @throws Exception
     */
    @Override
    public Object handle(Request request, Response response) throws Exception {
        SearchResult searchResult = this.cacheManager.get(MET_API_HAS_IMAGES_URL, SearchResult.class);

        if (searchResult == null) {
            JSONReader<SearchResult> searchReader = new JSONReader<>();
            searchResult = searchReader.serializeFromRequest(MET_API_HAS_IMAGES_URL, SearchResult.class);
            this.cacheManager.put(MET_API_HAS_IMAGES_URL, searchResult);
        }

        //store the ids that have images (supposedly)
        List<Integer> ids = searchResult.objectIDs();

        //instantiate quiz
        MCQuiz quiz = new MCQuiz(new LinkedList<MCQuiz.MCQuestion>());
        Random rand = new Random();
        Set<Integer> usedIDs = new HashSet<>();

        //for now, generate 5 questions
        while(quiz.questions().size() < 5) {
            //get the random object ID
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

                //make sure object has display name and image
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
        return new BrushUpResponses.BrushUpSuccessResponse(jsonMap).serialize();


    }
}
