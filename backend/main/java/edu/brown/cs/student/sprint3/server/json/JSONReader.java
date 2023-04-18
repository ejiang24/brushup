package edu.brown.cs.student.sprint3.server.json;


import com.squareup.moshi.Moshi;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;

/**
 * This class allows our backend to accept arbitrary JSONs.
 * @param <T> - generic type which we will transform our JSONS into
 */
public class JSONReader<T> {

    /**
     * Gets an object parsed from a given JSON
     * @param reader - reader that takes in a JSON file
     * @param record - class that we will mold JSON into
     * @return - parsed JSON
     * @throws IOException - file not found
     */
    public T getParsedJSON(Reader reader, Class<T> record) throws IOException {
        String jsonString = this.readerToString(reader);
        return this.deserialize(record, jsonString);
    }

    /**
     * Transforms JSON into string.
     * @param reader - reader that takes in a JSON file
     * @return - string version of JSON
     * @throws IOException - if reader fails
     */
    private String readerToString(Reader reader) throws IOException {
        BufferedReader br = new BufferedReader(reader);
        StringBuilder stringBuilder = new StringBuilder();

        String line;
        while ((line = br.readLine()) != null) {
            stringBuilder.append(line);
        }
        br.close();

        return stringBuilder.toString();
    }

    /**
     * Uses moshi to mold string representation JSON into given class.
     * @param record - class
     * @param jsonString - string version of json
     * @return - parsed json as the class
     * @throws IOException - io exception
     */
    private T deserialize(Class<T> record, String jsonString) throws IOException {
        Moshi moshi = new Moshi.Builder().build();
        return moshi.adapter(record).fromJson(jsonString);

    }
}
