package com.wellconn.optimizer.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wellconn.optimizer.model.InspLogVO;
import com.wellconn.optimizer.service.InspLogService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class InspLogController {
	
	private final InspLogService inspLogService;
	
	@RequestMapping(value = "/inspLog", method = RequestMethod.GET)
	public String Login() {		
		return "/setting/inspLog";
	}

	@RequestMapping(value ="/selectInspLogAll")
	@ResponseBody
	public Map<String,Object> selectInspLogAll(HttpServletRequest request,  HttpServletResponse response, InspLogVO inspLogVO, @RequestParam("size")int size, @RequestParam("page")int page) throws Exception{
		Map<String,Object> result = new HashMap<>();
		inspLogVO.setOffset((page-1)*10);
		int cnt = inspLogService.selectAllCnt(inspLogVO).getCnt();
		int last = 1;
		if(cnt%size==0) last = 0;
		System.out.println("offset : "+inspLogVO.getOffset());
		
		result.put("data", inspLogService.selectAll(inspLogVO));
		result.put("list_cnt", cnt);
		result.put("last_page", (cnt/size+last)); 
		
		return result;	
	}
	
}
