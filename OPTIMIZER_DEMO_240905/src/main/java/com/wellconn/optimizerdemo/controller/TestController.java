package com.wellconn.optimizerdemo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellconn.optimizerdemo.model.LightHouseVO;
import com.wellconn.optimizerdemo.service.LightHouseService;
import com.wellconn.optimizerdemo.service.PageService;
import com.wellconn.optimizerdemo.service.ResourceService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class TestController {
	
	private final ResourceService resourceService;
	private final PageService pageService;
	private final LightHouseService lightHouseService;
	
	public static void main(String[] args) {
		System.out.println(testFunction());
	
	}
	
	public static String testFunction() {
		return "sdfsdf";
	}
}
