package com.wellconn.optimizer.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wellconn.optimizer.model.AlgorithmVO;
import com.wellconn.optimizer.model.CloudVO;
import com.wellconn.optimizer.model.OptimizerPageVO;
import com.wellconn.optimizer.model.ProjectVO;
import com.wellconn.optimizer.service.AlgorithmService;
import com.wellconn.optimizer.service.ProjectService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class AlgorithmController {
	
	private final AlgorithmService algorithmService;
	
	/***
	 * 1. 함수명 : selectAlgorithmAll
	 * 2. 작성일: 
	 * 3. 작성자: 안재림
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value = "/selectAlgorithmAll", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> selectAlgorithmAll(HttpServletRequest request, AlgorithmVO algorithmVO) {
		Map<String,Object> result = new HashMap<>();
		
		List<AlgorithmVO> voList = algorithmService.seletAll(algorithmVO);
		
        result.put("data", voList);        
		return result;
	}	
	
	@RequestMapping(value = "/selectAlgorithmType", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> selectAlgorithmType(HttpServletRequest request, AlgorithmVO algorithmVO) {
		Map<String,Object> result = new HashMap<>();
		result.put("data", algorithmService.selectAlgorithmType(algorithmVO));
		return result;
	}		
}
