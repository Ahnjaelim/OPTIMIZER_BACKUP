package com.wellconn.optimizer.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wellconn.optimizer.model.CloudVO;
import com.wellconn.optimizer.model.OptimizerLogVO;
import com.wellconn.optimizer.model.OptimizerPageVO;
import com.wellconn.optimizer.model.OptimizerVO;
import com.wellconn.optimizer.model.SiteManageVO;
import com.wellconn.optimizer.model.UserVO;
import com.wellconn.optimizer.service.CloudService;
import com.wellconn.optimizer.service.OptimizerLogService;
import com.wellconn.optimizer.service.OptimizerPageService;
import com.wellconn.optimizer.service.OptimizerService;
import com.wellconn.optimizer.service.SiteManageService;
import com.wellconn.optimizer.service.SshService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class SiteController {

	private final SiteManageService siteManageService;
	private final SshService sshService;
	@RequestMapping(value = "/siteManage", method = RequestMethod.GET)
	public String estimatedCost() {		
		return "/site/sitemanage";
	}
	
	@RequestMapping(value ="/selectSiteAll")
	@ResponseBody
	public Map<String,Object> selectSiteAll(HttpServletRequest request,  HttpServletResponse response, @RequestParam("size")int size, @RequestParam("page")int page, SiteManageVO siteManageVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");

		Map<String,Object> result = new HashMap<>();
		siteManageVO.setOffset((page-1)*10);
		siteManageVO.setCnt_mode(1);
		
		siteManageVO.setLgn_nm(userVo.getLgn_nm());
		
		int cnt = siteManageService.selectSiteAll(siteManageVO).size();
		int last = 1;
		if(cnt%size==0) last = 0;
		
		siteManageVO.setCnt_mode(0);
		List<CloudVO> volist = siteManageService.selectSiteAll(siteManageVO);
		
		result.put("data", volist);
		result.put("list_cnt", cnt);
		result.put("last_page", (cnt/size+last)); 
		
		return result;
	}
	
	
	@RequestMapping(value ="/selectSiteBySiteNo")
	@ResponseBody
	public Map<String,Object> selectSiteBySiteNo(HttpServletRequest request,  HttpServletResponse response,  SiteManageVO siteManageVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");

		Map<String,Object> result = new HashMap<>();
		siteManageVO.setLgn_nm(userVo.getLgn_nm());
		
		List<SiteManageVO> data = siteManageService.selectSiteBySiteNo(siteManageVO);
		
		result.put("data", data);
		
		
		return result;
	}
	
	@RequestMapping(value ="/selectTopbarSiteList")
	@ResponseBody
	public Map<String,Object> selectTopbarSiteList(HttpServletRequest request,  HttpServletResponse response, SiteManageVO siteManageVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		Map<String,Object> result = new HashMap<>();
		
		
		
		siteManageVO.setLgn_nm(userVo.getLgn_nm());
		List<SiteManageVO> siteList = siteManageService.selectTopbarSiteList(siteManageVO);
		
		
		result.put("data", siteList);
		result.put("sessionSiteList", session.getAttribute("SiteList"));
		
		return result;
	}
	
	@RequestMapping(value ="/setSession")
	@ResponseBody
	public Map<String,Object> setSession(HttpServletRequest request,  HttpServletResponse response,@RequestBody Map<String, Object> requestData) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		System.out.println("siteList-------------------");
		System.out.println(requestData.get("selectedValues"));
		SiteManageVO vo = new SiteManageVO();
		
		session.setAttribute("SiteList", requestData.get("selectedValues"));
		Map<String,Object> result = new HashMap<>();
		result.put("data", "complete");
		return result ;
	}

	
	
	
	@RequestMapping(value ="/selectCloud")
	@ResponseBody
	public Map<String,Object> selectCloud(HttpServletRequest request,  HttpServletResponse response,CloudVO cloudVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		Map<String,Object> result = new HashMap<>();
		cloudVO.setLgn_sn(userVo.getLgn_sn());
		
		List<CloudVO> volist = siteManageService.selectCloud(cloudVO);
		
		result.put("volist", volist);
		
		
		
		return result ;
	}
	
	@RequestMapping(value ="/insertSite")
	@ResponseBody
	public int insertSite(HttpServletRequest request,  HttpServletResponse response,SiteManageVO siteManageVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		siteManageVO.setLgn_sn(userVo.getLgn_sn());
		
		int result= siteManageService.insertSite(siteManageVO);
		
		
		
		return result ;
	}
	@RequestMapping(value ="/updateSite")
	@ResponseBody
	public int updateSite(HttpServletRequest request,  HttpServletResponse response,SiteManageVO siteManageVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		siteManageVO.setLgn_sn(userVo.getLgn_sn());
		
		int result= siteManageService.updateSite(siteManageVO);
		
		
		
		return result ;
	}
	
	@RequestMapping(value ="/deleteSite")
	@ResponseBody
	public int deleteSite(HttpServletRequest request,  HttpServletResponse response,SiteManageVO siteManageVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		siteManageVO.setLgn_sn(userVo.getLgn_sn());
		
		int result= siteManageService.deleteSite(siteManageVO);
		int result2= sshService.deleteSsh(siteManageVO);
		
		
		
		return result ;
	}

	
	
	@RequestMapping(value ="/selectSiteAllBySiteNo")
	@ResponseBody
	public Map<String,Object> selectSiteAllBySiteNo(HttpServletRequest request,  HttpServletResponse response, SiteManageVO siteManageVO) throws Exception{
		Map<String,Object> result = new HashMap<>();
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		siteManageVO.setSite_list(site_list);
		
		result.put("data", siteManageService.selectSiteAllBySiteNo(siteManageVO));
		return result ;
	}
	
	@RequestMapping(value ="/duplicateSite")
	@ResponseBody
	public Map<String,Object> duplicateSite(HttpServletRequest request,  HttpServletResponse response, SiteManageVO siteManageVO) throws Exception{
		Map<String,Object> result = new HashMap<>();
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		siteManageVO.setLgn_nm(userVo.getLgn_nm());
		System.out.println("--------------------");
		System.out.println(siteManageVO.getSite_name());
		System.out.println(siteManageVO.getSite_address());
		System.out.println("--------------------");
		
		if (siteManageVO.getSite_name() != null) {
			List<SiteManageVO> volist = siteManageService.duplicateSiteNm(siteManageVO);
			result.put("data", volist);
			System.out.println("사이트명 체크");
			return result ;
		
		} 
		List<SiteManageVO> volist = siteManageService.duplicateSiteAdd(siteManageVO);
		result.put("data", volist);
		System.out.println("주소체크");
		return result ;
	}	

}
