package edu.brown.cs.student.sprint3.server.handlers;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class CacheManager<T> {
    private final Map<String, T> cache;

    public CacheManager() {
        cache = new ConcurrentHashMap<>();
    }

    public void put(String key, T value) {
        cache.put(key, value);
    }

    public T get(String key, Class<T> clazz) {
        T value = cache.get(key);
        if (value != null && clazz.isInstance(value)) {
            return value;
        }
        return null;
    }

    public boolean contains(String key) {
        return cache.containsKey(key);
    }

    public void remove(String key) {
        cache.remove(key);
    }

    public void clear() {
        cache.clear();
    }
}