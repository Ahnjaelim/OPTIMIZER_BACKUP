package com.wellconn.optimizer.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wellconn.optimizer.model.AlertVO;
import com.wellconn.optimizer.model.CostVO;
import com.wellconn.optimizer.model.UserVO;
import com.wellconn.optimizer.service.AlgorithmService;
import com.wellconn.optimizer.service.CostService;
import com.wellconn.optimizer.service.alertService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class AlertCenterController {
	
	private final alertService alertService;
	
	@RequestMapping(value = "/alertCenter", method = RequestMethod.GET)
	public String alertCenter() {		
		return "/setting/alertCenter";
	}
	
	
	
	
	@RequestMapping(value ="/getAlert")
	@ResponseBody
	public Map<String,Object> getAlert(HttpServletRequest request,  HttpServletResponse response,AlertVO alertvo) throws Exception{
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		
		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		alertvo.setSite_list(site_list);
		
		Map<String,Object> result = new HashMap<>();
		alertvo.setCnt_mode(1);
		
		
		List<AlertVO> data = alertService.getAlert(alertvo);
		result.put("data", data); 
		
		return result;
	}
	@RequestMapping(value ="/getAlert_page")
	@ResponseBody
	public Map<String,Object> getAlert_page(HttpServletRequest request,  HttpServletResponse response,@RequestParam("size")int size, @RequestParam("page")int page,AlertVO alertvo) throws Exception{
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		
		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		alertvo.setSite_list(site_list);
		
		Map<String,Object> result = new HashMap<>();
		alertvo.setOffset((page-1)*10);
		
		List<AlertVO> data = null;
		alertvo.setCnt_mode(1);
		int cnt =0;
			cnt = alertService.getAlert(alertvo).size();
		alertvo.setCnt_mode(0);
		data = alertService.getAlert(alertvo);
		
		
		result.put("data", data); 
		
		int last = 1;
		if(cnt%size==0) last = 0;
		
		result.put("data", data);
		result.put("list_cnt", cnt);
		result.put("last_page", (cnt/size+last)); 
		
		return result;
	}
	
	@RequestMapping(value ="/updateAlert")
	@ResponseBody
	public int updateAlert(HttpServletRequest request,  HttpServletResponse response,AlertVO alertvo) throws Exception{
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		
		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		alertvo.setSite_list(site_list);
		
		Map<String,Object> result = new HashMap<>();
		
		
		
		int check = alertService.updateAlert(alertvo);
		
		
		return check;
	}
	@RequestMapping(value = "/confirmUpdateAlert", method = RequestMethod.POST)
	@ResponseBody
	public int confirmUpdateAlert(HttpServletRequest request,  HttpServletResponse response,AlertVO alertvo) throws Exception{
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		
		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		alertvo.setSite_list(site_list);
		
		/* Map<String,Object> result = new HashMap<>(); */
		
		 // 알림 ID 설정
	    String alertIdStr = request.getParameter("alarm_no");
	    if (alertIdStr != null && !alertIdStr.isEmpty()) {
	        int alarm_no = Integer.parseInt(alertIdStr);
	        alertvo.setAlarm_no(alarm_no);
	        alertvo.setIs_new(0);
	    }

		
		int check = alertService.confirmUpdateAlert(alertvo);
		
		
		return check;
	}
}
