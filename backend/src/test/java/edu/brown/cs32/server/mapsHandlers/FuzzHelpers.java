package edu.brown.cs32.server.mapsHandlers;

import java.util.concurrent.ThreadLocalRandom;

/**
 * This class consists of methods that assist
 * fuzz testing.
 */
public class FuzzHelpers {
    /**
     * This does not guarantee an alpha-numeric string, or anything
     * even remotely readable. The "first" and "last" parameters can be used to
     * prevent generating characters like comma (for CSV testing) or newlines,
     * or control characters that will mess up some terminals.
     * @param length The length of the string to generate
     * @param first the first ASCII-code in the character range allowed
     * @param last the last ASCII-code in the character range allowed
     * @return a random string of length bytes
     */
    public static String getRandomStringBounded(int length, int first, int last) {
        final ThreadLocalRandom r = ThreadLocalRandom.current();
        StringBuilder sb = new StringBuilder();
        for(int iCount=0;iCount<length;iCount++) {
            // upper-bound is exclusive
            int code = r.nextInt(first, last+1);
            sb.append((char) code);
        }
        return sb.toString();
    }

    /**
     * Assumes no query params to searchgeo.
     * @return - request
     */
    public static String getRandomSearchBadParams() {
        final ThreadLocalRandom r = ThreadLocalRandom.current();
        int targetLen = r.nextInt(25);
        String request = getRandomStringBounded(targetLen, 45, 126);

        return "searchgeo?" + request;
    }

    /**
     * Assumes correct parameter names.
     * @return - request
     */
    public static String getRandomSearchGoodParams() {
        final ThreadLocalRandom r = ThreadLocalRandom.current();
        int targetLen = r.nextInt(15);
        String target = getRandomStringBounded(targetLen, 45, 126);

        return "searchgeo?keyword=" + target;
    }


    /**
     * Gets random minimum and maximum coordinates.
     * @return - request
     */
    public static String getRandomFilterGoodParams() {
        final ThreadLocalRandom r = ThreadLocalRandom.current();
        double latmin = r.nextDouble();
        double latmax = r.nextDouble();
        double lonmin = r.nextDouble();
        double lonmax = r.nextDouble();

        return "filtergeo?latmin=" + latmin + "&latmax=" + latmax + "&lonmin=" + lonmin + "&lonmax=" + lonmax;
    }

    /**
     * Gets random inputs for filter.
     * @return - request
     */
    public static String getRandomFilterGoodParamsBadInput() {
        final ThreadLocalRandom r = ThreadLocalRandom.current();
        int latminLen = r.nextInt(8);
        String latmin = getRandomStringBounded(latminLen, 45, 126);
        int lonminLen = r.nextInt(8);
        String lonmin = getRandomStringBounded(lonminLen, 45, 126);
        int latmaxLen = r.nextInt(8);
        String latmax = getRandomStringBounded(latmaxLen, 45, 126);
        int lonmaxLen = r.nextInt(8);
        String lonmax = getRandomStringBounded(lonmaxLen, 45, 126);

        return "filtergeo?latmin=" + latmin + "&latmax=" + latmax + "&lonmin=" + lonmin + "&lonmax=" + lonmax;

    }


}
