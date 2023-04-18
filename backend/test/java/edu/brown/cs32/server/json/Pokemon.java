package edu.brown.cs32.server.json;

import java.util.Map;

public record Pokemon(Integer id, String name, Map<String, String> type, String[] moves) {
}
