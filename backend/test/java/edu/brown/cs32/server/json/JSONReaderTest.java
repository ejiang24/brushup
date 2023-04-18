package edu.brown.cs32.server.json;

import edu.brown.cs.student.sprint3.server.json.JSONReader;
import org.junit.jupiter.api.Test;

import java.io.FileReader;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * This is the test suite for our JSONReader, which parses arbitrary JSONs into objects.
 */
public class JSONReaderTest {

    /**
     * Tests basic functionality, tests that can perform type specific commands on nested fields.
     * @throws IOException - file not found
     */
    @Test
    public void testPokemon() throws IOException {
        JSONReader<Pokemon> testReader = new JSONReader<>();
        Pokemon json = testReader.getParsedJSON(new FileReader("src/data/pokemon.json"), Pokemon.class);

        assertEquals("grass", json.type().get("type1"));
        assertEquals("bulbasaur", json.name());
        assertEquals("tackle", (json.moves()[0]));
    }


}
