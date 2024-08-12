package com.wellconn.optimizer.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellconn.optimizer.service.OptimizerService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class RestOptimizerController {
	
	private final OptimizerService optimizerService;

    @GetMapping("/hello")
    @ApiOperation(value = "Get Hello Message", notes = "Returns a simple hello message.")
    public String getHelloMessage() {
        return "Hello, Swagger!";
    }
}
