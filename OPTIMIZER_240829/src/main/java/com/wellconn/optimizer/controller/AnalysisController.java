package com.wellconn.optimizer.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wellconn.optimizer.model.AlgorithmVO;
import com.wellconn.optimizer.model.AnalysisVO;
import com.wellconn.optimizer.model.CloudVO;
import com.wellconn.optimizer.model.OptimizerPageVO;
import com.wellconn.optimizer.model.ProjectVO;
import com.wellconn.optimizer.service.AlgorithmService;
import com.wellconn.optimizer.service.AnalysisService;
import com.wellconn.optimizer.service.ProjectService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class AnalysisController {
	
	private final AnalysisService analysisService;
	
	/***
	 * 1. 함수명 : 
	 * 2. 작성일: 2023-12-28
	 * 3. 작성자: 김조은
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/		
	
	@RequestMapping(value = "/analysisSelectAll")
	@ResponseBody
	public Map<String, Object> analysisSelectAll(HttpServletRequest request, AnalysisVO analysisVO) {
		Map<String,Object> result = new HashMap<>();
		List<AnalysisVO> voList = analysisService.seletAll(analysisVO);		
        result.put("data", voList);        
		return result;
	}	
}
