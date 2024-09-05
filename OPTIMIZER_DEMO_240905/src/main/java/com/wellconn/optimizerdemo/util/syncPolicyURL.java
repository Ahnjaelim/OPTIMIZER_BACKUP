package com.wellconn.optimizerdemo.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

public class syncPolicyURL {
	
    public static String syncPolicyURL(String urlString) {
		
    	String optimizerUrl=urlString;
    	
    	try {
    		Map<String,Object> params = new HashMap<String,Object>(); 		// params 파라미터 세팅
    		
    		StringBuilder postData = new StringBuilder();
    		
    		for(Map.Entry<String,Object> param : params.entrySet()) {
    			if(postData.length() != 0) postData.append('&');
    			postData.append(URLEncoder.encode(param.getKey(), "UTF-8"));
    		    postData.append('=');
    		    postData.append(URLEncoder.encode(String.valueOf(param.getValue()), "UTF-8"));
    		}
    		
    		byte[] postDataBytes = postData.toString().getBytes("UTF-8");
    		
    		URL url = new URL(optimizerUrl); 
    		
    		HttpURLConnection conn = (HttpURLConnection)url.openConnection();
    		conn.setRequestMethod("POST");
    		conn.setRequestProperty("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
    		conn.setRequestProperty("Accept-Encoding", "gzip, deflate, br");
    		conn.setRequestProperty("Accept-Language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7");
    		conn.setRequestProperty("Cache-Control", "max-age=0");
    		conn.setRequestProperty("Connection", "keep-alive");
    		conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36");
    		conn.setDoOutput(true);	
    		conn.setConnectTimeout(500);
    		conn.setReadTimeout(500);
    		 
    		conn.getOutputStream().write(postDataBytes);
    		
    		BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
    		
    		String inputLine;
    		String read="";
    		
    		while((inputLine = in.readLine()) != null) { // response 출력
    			read = read + inputLine +"\n";
    		}
    		
    		read=read.trim();
    		return read;	
    	} catch (Exception e) {
    		return "";	
		}
    }
}
