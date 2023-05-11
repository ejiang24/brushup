package edu.brown.cs.student.sprint3.server;

import static spark.Spark.after;

import edu.brown.cs.student.sprint3.server.handlers.*;
// import edu.brown.cs32.csv.LoadedCSVContainer;
// import edu.brown.cs32.server.handlers.LoadCSVHandler;
// import edu.brown.cs32.server.handlers.SearchHandler;
// import edu.brown.cs32.server.handlers.ViewHandler;
// import edu.brown.cs32.server.handlers.WeatherHandler;
import edu.brown.cs.student.sprint3.server.handlers.QuizHandler;
import edu.brown.cs.student.sprint3.server.records.SearchResult;
import spark.Spark;

/**
 * Top-level class for this demo. Contains the main() method which starts Spark and runs the various handlers.
 *
 * We have four endpoints in this demo. They share a state.
 * This is a great chance to use dependency injection, as we do here. If we needed more endpoints,
 * more functionality classes, etc. we could make sure they all had the same shared state.
 */
public class Server {
    public static void main(String[] args) {
        Spark.port(3235);

        after((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Methods", "*");
        });

        Spark.get("savegamedata", new SaveGameData());
        Spark.get("makequiz", new QuizHandler(new CacheManager<SearchResult>()));
        Spark.init();
        Spark.awaitInitialization();
        System.out.println("Server started at http://localhost:" + Spark.port());
    }
}
