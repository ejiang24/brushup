package edu.brown.cs32.server;

import edu.brown.cs.student.sprint3.server.handlers.CacheManager;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class CacheManagerTest {

    @Test
    public void testPutAndGet() {
        CacheManager<String> cache = new CacheManager<>();
        cache.put("key", "value");
        assertEquals("value", cache.get("key", String.class));
    }

    @Test
    public void testGetNonExistent() {
        CacheManager<Integer> cache = new CacheManager<>();
        assertNull(cache.get("nonexistent", Integer.class));
    }

    @Test
    public void testContains() {
        CacheManager<String> cache = new CacheManager<>();
        cache.put("key", "value");
        assertTrue(cache.contains("key"));
        assertFalse(cache.contains("nonexistent"));
    }

    @Test
    public void testRemove() {
        CacheManager<String> cache = new CacheManager<>();
        cache.put("key", "value");
        assertTrue(cache.contains("key"));
        cache.remove("key");
        assertFalse(cache.contains("key"));
    }

    @Test
    public void testClear() {
        CacheManager<String> cache = new CacheManager<>();
        cache.put("key1", "value1");
        cache.put("key2", "value2");
        assertTrue(cache.contains("key1"));
        assertTrue(cache.contains("key2"));
        cache.clear();
        assertFalse(cache.contains("key1"));
        assertFalse(cache.contains("key2"));
    }
}

