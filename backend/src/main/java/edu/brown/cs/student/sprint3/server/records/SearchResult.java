package edu.brown.cs.student.sprint3.server.records;

import java.util.List;

public record SearchResult(Integer total, List<Integer> objectIDs) {
}
