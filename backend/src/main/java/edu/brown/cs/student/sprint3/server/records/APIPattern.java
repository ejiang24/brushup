package edu.brown.cs.student.sprint3.server.records;

import com.squareup.moshi.Moshi;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import okio.Buffer;

import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;

public class APIPattern<T> {

    //commented out the <T>
    public T PatternHandler(String url, Class<T> adapterM) throws IOException {
        System.out.println("starting handler");
        URL newURLRequest = new URL(url);
        T request = null;
        HttpURLConnection clientConnection = (HttpURLConnection) newURLRequest.openConnection();
        System.out.println(clientConnection.getResponseCode());
        if (clientConnection.getResponseCode() == 200) {
            Moshi moshi = new Moshi.Builder().build();
            BufferedReader input = new BufferedReader(new InputStreamReader(clientConnection.getInputStream()));
            String readIn;
            String readOut = "";
            while ((readIn = input.readLine()) != null){
                readOut += readIn;
            }
            request = moshi.adapter(adapterM).fromJson(readOut);
        }
        else
            throw new IOException("bad request");

        clientConnection.disconnect();
        return request;
    }
}

