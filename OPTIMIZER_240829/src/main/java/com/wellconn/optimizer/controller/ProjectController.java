package com.wellconn.optimizer.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wellconn.optimizer.model.ProjectVO;
import com.wellconn.optimizer.service.ProjectService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ProjectController {
	
	private final ProjectService projectService;
	
	/***
	 * 1. 함수명 : selectProjectNo
	 * 2. 작성일: 2023-12-28
	 * 3. 작성자: 안재림
	 * 4. 설명: 프로젝트 리스트 정보 받아오기
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value = "/selectProjectNo")
	@ResponseBody
	public Map<String, Object> selectProjectNo(HttpServletRequest request, ProjectVO projectVO) {
		Map<String,Object> result = new HashMap<>();
		
		List<ProjectVO> projectList = projectService.selectProjectNo(projectVO);
		
		result.put("data", projectList);
		return result;
	}	
	
}
