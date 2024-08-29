package com.wellconn.optimizer.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wellconn.optimizer.model.CloudVO;
import com.wellconn.optimizer.model.OptimizerVO;
import com.wellconn.optimizer.model.SiteManageVO;
import com.wellconn.optimizer.model.UserVO;
import com.wellconn.optimizer.service.CloudService;
import com.wellconn.optimizer.service.SiteManageService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class CloudController {
	
	private final CloudService cloudService;
	private final SiteManageService siteManageService;	
	
	/***
	 * 1. 함수명 : selectCloudByCloudNo
	 * 2. 작성일: 2023-12-07
	 * 3. 작성자: 안재림
	 * 4. 설명: 클라우드 번호로 클라우드 정보 받아오기
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value = "/selectCloudByCloudNo")
	@ResponseBody
	public Map<String, Object> selectCloudByCloudNo(HttpServletRequest request, CloudVO cloudVO) {
		Map<String,Object> result = new HashMap<>();
		result.put("data", cloudService.selectCloudByCloudNo(cloudVO));
		return result;
	}	
	
	/***
	 * 1. 함수명 : 
	 * 2. 작성일: 
	 * 3. 작성자: 안재림
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value = "/cloudManage", method = RequestMethod.GET)
	public String optimizerByContent(Model model) {	  
		return "/setting/cloudManage";
	}	
	
	/***
	 * 1. 함수명 : selectResourceListByParentId
	 * 2. 작성일: 
	 * 3. 작성자: 안재림
	 * 4. 설명: 최적화 관리 > 웹 컨텐츠 기준 > 타뷸레이터
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value ="/selectCloudAll")
	@ResponseBody
	public Map<String,Object> selectCloudAll(HttpServletRequest request,  HttpServletResponse response, @RequestParam("size")int size, @RequestParam("page")int page, CloudVO cloudVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");

		Map<String,Object> result = new HashMap<>();
		cloudVO.setOffset((page-1)*10);
		cloudVO.setCnt_mode(1);
		int cnt = cloudService.selectCloudAll(cloudVO).size();
		int last = 1;
		if(cnt%size==0) last = 0;
		
		cloudVO.setCnt_mode(0);
		List<CloudVO> volist = cloudService.selectCloudAll(cloudVO);
		
		result.put("data", volist);
		result.put("list_cnt", cnt);
		result.put("last_page", (cnt/size+last)); 
		
		return result;
	}
		
	/***
	 * 1. 함수명 : 
	 * 2. 작성일: 
	 * 3. 작성자: 안재림
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value = "/insertCloud")
	@ResponseBody
	public Map<String, Object> insertCloud(HttpServletRequest request, CloudVO cloudVO) {
		Map<String,Object> result = new HashMap<>();
		// System.out.println(cloudVO);
		result.put("data", cloudService.insertCloud(cloudVO));
		return result;
	}

	/***
	 * 1. 함수명 : 
	 * 2. 작성일: 
	 * 3. 작성자: 안재림
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value = "/updateCloud")
	@ResponseBody
	public Map<String, Object> updateCloud(HttpServletRequest request, CloudVO cloudVO) {
		Map<String,Object> result = new HashMap<>();
		System.out.println(cloudVO);
		result.put("data", cloudService.updateCloud(cloudVO));
		return result;
	}	

	/***
	 * 1. 함수명 : 
	 * 2. 작성일: 
	 * 3. 작성자: 안재림
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value = "/selectSiteAllByCloudNo")
	@ResponseBody
	public Map<String, Object> selectSiteAllByCloudNo(HttpServletRequest request, SiteManageVO siteManageVO) {
		Map<String,Object> result = new HashMap<>();
		result.put("data", siteManageService.selectSiteAllByCloudNo(siteManageVO));
		return result;
	}

	/***
	 * 1. 함수명 : 
	 * 2. 작성일: 
	 * 3. 작성자: 안재림
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value = "/deleteCloud")
	@ResponseBody
	public Map<String, Object> deleteCloud(HttpServletRequest request, CloudVO cloudVO) {
		Map<String,Object> result = new HashMap<>();
		result.put("data", cloudService.deleteCloud(cloudVO));
		return result;
	}
}
