package com.wellconn.optimizer.controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SampleController {
	public static void main(String[] args) {
		System.out.println(passwordEncrypt("0000"));
	}
	
	public static String passwordEncrypt(String password) {
		String sha256 = "";
		try {
			MessageDigest mdSHA256 = MessageDigest.getInstance("SHA-256");
			mdSHA256.update(password.getBytes());
			byte[] sha256Hash = mdSHA256.digest();
			StringBuffer hexSHA256hash = new StringBuffer();
			
			for(byte b : sha256Hash) {
				String hexString = String.format("%02x", b);
				hexSHA256hash.append(hexString);
			}
			sha256 = hexSHA256hash.toString();
		} catch (NoSuchAlgorithmException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}		
		return sha256;
	}	
}
