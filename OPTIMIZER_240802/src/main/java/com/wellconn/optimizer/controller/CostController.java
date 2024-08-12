package com.wellconn.optimizer.controller;

import java.util.ArrayList;
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
import com.wellconn.optimizer.model.CostVO;
import com.wellconn.optimizer.model.OptimizerVO;
import com.wellconn.optimizer.model.SiteManageVO;
import com.wellconn.optimizer.model.UserVO;
import com.wellconn.optimizer.service.CostService;
import com.wellconn.optimizer.service.InspLogService;
import com.wellconn.optimizer.service.OptimizerService;
import com.wellconn.optimizer.service.SiteManageService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class CostController {
	private final OptimizerService optimizerService;
	private final CostService costService;
	private final SiteManageService siteManageService;
	
//	@RequestMapping(value = "/costStatistics", method = RequestMethod.GET)
//	public String costStatics() {		
//		return "/cost/costStatistics";
//	}
	
	@RequestMapping(value = "/detailedCost", method = RequestMethod.GET)
	public String detailedCost() {		
		return "/cost/detailedCost";
	}
	
	@RequestMapping(value = "/estimatedCost", method = RequestMethod.GET)
	public String estimatedCost() {		
		return "/cost/estimatedCost";
	}
	
	@RequestMapping(value = "/costOpt", method = RequestMethod.GET)
	public String costOpt() {		
		return "/cost/costOpt";
	}
	
	@RequestMapping(value = "/trafficCost", method = RequestMethod.GET)
	public String trafficCost() {		
		return "/cost/trafficCost";
	}
	
	@RequestMapping(value = "/speedStatistics", method = RequestMethod.GET)
	public String speedStatistics() {		
		return "/statistics/speedStatistics";
	}
	@RequestMapping(value = "/costStatistics", method = RequestMethod.GET)
	public String costStatistics() {		
		return "/statistics/costStatistics";
	}
	@RequestMapping(value = "/contentStatistics", method = RequestMethod.GET)
	public String contentStatistics() {		
		return "/statistics/contentStatistics";
	}
	
	
	@RequestMapping(value ="/selectAvgComp")
	@ResponseBody
	public Map<String,Object> selectAvgComp(HttpServletRequest request,  HttpServletResponse response, CostVO costVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		costVO.setSite_list(site_list);
		Map<String,Object> result = new HashMap<>();
		
		
		
		List<CostVO> data = costService.selectAvgComp(costVO);
		
		result.put("data", data);
		return result;
	}
	
	@RequestMapping(value ="/selectContentTable")
	@ResponseBody
	public Map<String,Object> selectContentTable(HttpServletRequest request,  HttpServletResponse response, @RequestParam("size")int size, @RequestParam("page")int page, CostVO costVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		costVO.setSite_list(site_list);
		Map<String,Object> result = new HashMap<>();
		costVO.setOffset((page-1)*5);
		
		costVO.setCnt_mode(1);
		
		
		List<CostVO> data = null;
		int cnt =0;
			
			cnt = costService.selectContentTable_use(costVO).size();
			costVO.setCnt_mode(0);
			data = costService.selectContentTable_use(costVO);
		
		
		
		
		
		int last = 1;
		if(cnt%size==0) last = 0;
		
		result.put("data", data);
		result.put("list_cnt", cnt);
		result.put("last_page", (cnt/size+last)); 
		
		return result;
	}
	
	@RequestMapping(value ="/selectContentAll")
	@ResponseBody
	public Map<String,Object> selectContentAll(HttpServletRequest request,  HttpServletResponse response, CostVO costVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		costVO.setSite_list(site_list);
		Map<String,Object> result = new HashMap<>();
		
		
		
		List<CostVO> data = costService.selectContentAll(costVO);
		
		result.put("data", data);
		return result;
	}
	
	
	
	@RequestMapping(value ="/selectUseOrNot")
	@ResponseBody
	public Map<String,Object> selectUseOrNot(HttpServletRequest request,  HttpServletResponse response,CostVO costVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		
		
		Map<String,Object> result = new HashMap<>();

		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		costVO.setSite_list(site_list);
		
		List<CostVO> data = costService.selectUseOrNot(costVO);
		result.put("data", data);
		return result;
	}
	
	
	@RequestMapping(value ="/selectCloud_payment")
	@ResponseBody
	public Map<String,Object> selectCloud_payment(HttpServletRequest request,  HttpServletResponse response,CostVO costVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		costVO.setLgn_sn(userVo.getLgn_sn());
		
		Map<String,Object> result = new HashMap<>();
		
		
		List<CostVO> cloud_payment = costService.selectCloud_payment(costVO);
		result.put("cloud_payment", cloud_payment);
		return result;
	}
	
	@RequestMapping(value ="/selectCost")
	@ResponseBody
	public Map<String,Object> selectCost(HttpServletRequest request,  HttpServletResponse response,CostVO costVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		
		
		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		costVO.setSite_list(site_list);
		
		
		
		Map<String,Object> result = new HashMap<>();
		
		List<CostVO> data = costService.selectCostByMonth(costVO);
		
		
		result.put("data", data); 
		
		return result;
	}
	
	
	
	@RequestMapping(value ="/selectPerMonthChart")
	@ResponseBody
	public Map<String,Object> selectPerMonthChart(HttpServletRequest request,  HttpServletResponse response,CostVO costVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		costVO.setSite_list(site_list);
		Map<String,Object> result = new HashMap<>();
		
		
		
		List<CostVO> monthList = costService.selectCostByMonth(costVO);
		
		result.put("monthList", monthList); 
		
		
		return result;
	}
	
	
	@RequestMapping(value ="/selectPerDayChart")
	@ResponseBody
	public Map<String,Object> selectPerDayChart(HttpServletRequest request,  HttpServletResponse response,CostVO costVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		//클라우드 정보 받아오는거 추가해야함
		Map<String,Object> result = new HashMap<>();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		costVO.setSite_list(site_list);
		
		
		List<CostVO> weeklyList = costService.selectPerDayChart(costVO);
		
		//result.put("cloud_payment", cloud_payment);
		result.put("weeklyList", weeklyList); 
		
		
		return result;
	}
	
	
	@RequestMapping(value ="/getChartCostByResource")
	@ResponseBody
	public Map<String,Object> getChartCostByResource(HttpServletRequest request,  HttpServletResponse response,CostVO costVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		
		Map<String,Object> result = new HashMap<>();
		
		
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		costVO.setSite_list(site_list);
		
		List<CostVO> getChartCostByResource = costService.getChartCostByResource(costVO);
		
		
		result.put("getChartCostByResource", getChartCostByResource); 
		
		
		return result;
	}
	@RequestMapping(value ="/getChartCostByCloud")
	@ResponseBody
	public Map<String,Object> getChartCostByCloud(HttpServletRequest request,  HttpServletResponse response,CostVO costVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		//클라우드 정보 받아오는거 추가해야함
		Map<String,Object> result = new HashMap<>();
		
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		costVO.setSite_list(site_list);
		
		List<CostVO> getChartCostByCloud = costService.getChartCostByCloud(costVO);
		
		
		result.put("getChartCostByCloud", getChartCostByCloud); 
		
		
		return result;
	}
	
	@RequestMapping(value ="/setDate_box")
	@ResponseBody
	public Map<String,Object> setDate_box(HttpServletRequest request,  HttpServletResponse response,CostVO costVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		
		Map<String,Object> result = new HashMap<>();
		//사이트, 클라우드 정보 받아와야함 

		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		costVO.setSite_list(site_list);
		
		List<CostVO> selectContentsCnt = costService.selectContentsCnt(costVO);
		List<CostVO> selectContentsSize = costService.selectAllResource(costVO);
		
		result.put("selectContentsCnt", selectContentsCnt); 
		result.put("selectContentsSize", selectContentsSize); 
		
		
		return result;
	}

	@RequestMapping(value ="/selectAllResourceByDate")
	@ResponseBody
	public Map<String,Object> selectAllResourceByDate(HttpServletRequest request,  HttpServletResponse response,CostVO costVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		
		Map<String,Object> result = new HashMap<>();
		//사이트, 클라우드 정보 받아와야함 

		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		costVO.setSite_list(site_list);
		
		List<CostVO> list = costService.selectAllResourceByDate(costVO);
		
		 
		result.put("data", list); 
		
		
		return result;
	}
	
	
	@RequestMapping(value ="/selectUnOptResource")
	@ResponseBody
	public Map<String,Object> selectUnOptResource(HttpServletRequest request,  HttpServletResponse response,CostVO costVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		
		Map<String,Object> result = new HashMap<>();
		//사이트, 클라우드 정보 받아와야함 
	//	int cloud_payment = costService.selectCloud_payment(costVO);
	
		List<CostVO> selectUnOptResource = costService.selectUnOptResource(costVO);
		
		//result.put("cloud_payment", cloud_payment);
		result.put("selectUnOptResource", selectUnOptResource); 
		
		
		return result;
	}
	
	
	@RequestMapping(value ="/getSiteList")
	@ResponseBody
	public Map<String,Object> getSiteList(HttpServletRequest request,  HttpServletResponse response,CostVO costVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		
		Map<String,Object> result = new HashMap<>();
		//사이트, 클라우드 정보 받아와야함 
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		costVO.setSite_list(site_list);
	
		List<CostVO> siteList = costService.getSiteList(costVO);
		
		
		
		result.put("siteList", siteList); 
		
		
		return result;
	}
	
	
	@RequestMapping(value ="/selectAllResource")
	@ResponseBody
	public Map<String,Object> selectAllResource(HttpServletRequest request,  HttpServletResponse response,CostVO costVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		
		Map<String,Object> result = new HashMap<>();
		//사이트, 클라우드 정보 받아와야함 
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		costVO.setSite_list(site_list);
		
		if(costVO.getPage_no() != 0) {
			List<CostVO> selectAllResource = costService.selectAllResourceByPage(costVO);
			result.put("selectAllResource", selectAllResource); 
			return result;
		}
		List<CostVO> selectAllResource = costService.selectAllResource(costVO);
		
		
		//result.put("cloud_payment", cloud_payment); 
		result.put("selectAllResource", selectAllResource); 
		
		
		return result;
	}
	
	

	@RequestMapping(value ="/selectAllResourceByStatus")
	@ResponseBody
	public Map<String,Object> selectAllResourceByStatus(HttpServletRequest request,  HttpServletResponse response,CostVO costVO,@RequestParam("size")int size, @RequestParam("page")int page) throws Exception{
		
		// 세션 받기
				HttpSession session = request.getSession();
				UserVO userVo = (UserVO) session.getAttribute("login");
				
				Map<String,Object> result = new HashMap<>();
				//사이트, 클라우드 정보 받아와야함 
				ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
				costVO.setSite_list(site_list);
				
				costVO.setOffset((page-1)*10);
				costVO.setCnt_mode(1);
				
				int cnt = costService.selectAllResourceByStatus(costVO).size();
				int last = 1;
				if(cnt%size==0) last = 0;
				
//				if(costVO.getPage_no() != 0) {
//					List<CostVO> selectAllResource = costService.selectAllResourceByStatusByPage(costVO);
//					result.put("selectAllResource", selectAllResource); 
//					return result;
//				}
				costVO.setCnt_mode(0);
				List<CostVO> selectAllResource = costService.selectAllResourceByStatus(costVO);
				
				
				//result.put("cloud_payment", cloud_payment); 
				result.put("data", selectAllResource); 
				result.put("last_page", (cnt/size+last)); 
		
		return result;
	}
	
	@RequestMapping(value ="/getReSizeCnt")
	@ResponseBody
	public Map<String,Object> getReSizeCnt(HttpServletRequest request,  HttpServletResponse response,CostVO costVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		SiteManageVO siteManageVO = new SiteManageVO();
		
		List<Integer> siteList = (List<Integer>) session.getAttribute("SiteList");
		
		Map<String,Object> result = new HashMap<>();

		List<Integer> selected_site_list = new ArrayList<Integer>();

		if(siteList.size() <= 0) {
			
			siteManageVO.setLgn_nm(userVo.getLgn_nm());
			siteManageVO.setCnt_mode(1);

			//siteManageVO.setCnt_mode(0);
			List<CloudVO> volist = siteManageService.selectSiteAll(siteManageVO);
			
			//System.out.println("siteOne0 = "+volist.get(0).getRow_no());
			if(volist.size() <= 0) {
				result.put("getReSizeCnt", 0); 
				result.put("getAllSizeCnt", 0); 
				
				
				return result;
			}
			selected_site_list.add(Integer.parseInt(volist.get(0).getRow_no()+""));
		}else {			
			//System.out.println("siteList0 = "+siteList.get(0));
			for(int i=0; i<siteList.size(); i++){ 
				selected_site_list.add(Integer.parseInt(siteList.get(i)+""));
			}
		}

		costVO.setSelected_site_list(selected_site_list);
		
		//사이트, 클라우드 정보 받아와야함 
	//	int cloud_payment = costService.selectCloud_payment(costVO);
	
		List<CostVO> getReSizeCnt = costService.getReSizeCnt(costVO);
		List<CostVO> getAllSizeCnt = costService.getAllSizeCnt(costVO);
		
		
	//	result.put("cloud_payment", cloud_payment); 
		result.put("getReSizeCnt", getReSizeCnt); 
		result.put("getAllSizeCnt", getAllSizeCnt); 
		
		
		return result;
	}
	
//	@RequestMapping(value ="/getCostChart")
//	@ResponseBody
//	public Map<String,Object> getCostChart(HttpServletRequest request,  HttpServletResponse response,CostVO costVO) throws Exception{
//		
//		// 세션 받기
//		HttpSession session = request.getSession();
//		UserVO userVo = (UserVO) session.getAttribute("login");
//		SiteManageVO siteManageVO = new SiteManageVO();
//		
//		List<Integer> siteList = (List<Integer>) session.getAttribute("SiteList");
//
//		//System.out.println("siteList = "+siteList);
//		
//		Map<String,Object> result = new HashMap<>();
//		
//		List<Integer> selected_site_list = new ArrayList<Integer>();
//		
//		if(siteList == null) {
//			
//			siteManageVO.setLgn_nm(userVo.getLgn_nm());
//			siteManageVO.setCnt_mode(1);
//
//			//siteManageVO.setCnt_mode(0);
//			List<CloudVO> volist = siteManageService.selectSiteAll(siteManageVO);
//			
//			///System.out.println("siteOne0 = "+volist.get(0).getRow_no());
//			selected_site_list.add(Integer.parseInt(volist.get(0).getRow_no()+""));
//		}else {			
//			//System.out.println("siteList0 = "+siteList.get(0));
//			for(int i=0; i<siteList.size(); i++){ 
//				selected_site_list.add(Integer.parseInt(siteList.get(i)+""));
//			}
//		}
//		
//		costVO.setSelected_site_list(selected_site_list);
//	
//		List<CostVO> getCostChart = costService.getOrgCostChart(costVO);
//		List<CostVO> getResizeCostChart = costService.getResizeCostChart(costVO);
//		
//		double costVal = 0.0;
//		double costOrgVal = 0.0;
//		
//		//현재 리소스 사이즈의 가격 측정
//		for(int i=0;i<getResizeCostChart.size();i++) {
//			double resize = (double)(getResizeCostChart.get(i).getResource_new_size_type2());
//			costVal += (resize/1073741824)*getResizeCostChart.get(i).getCloud_payment();
//		}
//		
//		for(int i=0;i<getCostChart.size();i++) {
//			double orgsize = (double)(getCostChart.get(i).getResource_org_size());
//			costOrgVal += (orgsize/1073741824)*getCostChart.get(i).getCloud_payment();
//		}
//		
//		
//		result.put("costVal", costVal); 
//		result.put("costOrgVal", costOrgVal); 
//		
//		
//		return result;
//	}
//
//	@RequestMapping(value ="/getTrafficChart")
//	@ResponseBody
//	public Map<String,Object> getTrafficChart(HttpServletRequest request,  HttpServletResponse response,CostVO costVO) throws Exception{
//		
//		// 세션 받기
//		HttpSession session = request.getSession();
//		UserVO userVo = (UserVO) session.getAttribute("login");
//		SiteManageVO siteManageVO = new SiteManageVO();
//		
//		List<Integer> siteList = (List<Integer>) session.getAttribute("SiteList");
//
//		//System.out.println("siteList = "+siteList);
//		
//		Map<String,Object> result = new HashMap<>();
//		
//		List<Integer> selected_site_list = new ArrayList<Integer>();
//
//		if(siteList == null) {
//			
//			siteManageVO.setLgn_nm(userVo.getLgn_nm());
//			siteManageVO.setCnt_mode(1);
//
//			//siteManageVO.setCnt_mode(0);
//			List<CloudVO> volist = siteManageService.selectSiteAll(siteManageVO);
//			
//			//System.out.println("siteOne0 = "+volist.get(0).getRow_no());
//			selected_site_list.add(Integer.parseInt(volist.get(0).getRow_no()+""));
//		}else {			
//			//System.out.println("siteList0 = "+siteList.get(0));
//			for(int i=0; i<siteList.size(); i++){ 
//				selected_site_list.add(Integer.parseInt(siteList.get(i)+""));
//			}
//		}
//		
//		costVO.setSelected_site_list(selected_site_list);
//		
//		List<CostVO> getTrafficChart = costService.getCostChart(costVO);
//		
//		int trafficVal = 0;
//		int orgTrafficVal = 0;
//		
//		for(int i=0;i<getTrafficChart.size();i++) {
//			orgTrafficVal += getTrafficChart.get(i).getResource_org_size();
//			if(getTrafficChart.get(i).getResource_new_size_type2() <= 0) {
//				trafficVal += getTrafficChart.get(i).getResource_org_size();
//			}else {
//				trafficVal += getTrafficChart.get(i).getResource_new_size_type2();
//			}
//		}
//		
//		result.put("trafficVal", trafficVal); 
//		result.put("orgTrafficVal", orgTrafficVal); 
//		
//		
//		return result;
//	}
	
	@RequestMapping(value ="/getMainAllChart")
	@ResponseBody
	public Map<String,Object> getMainAllChart(HttpServletRequest request,  HttpServletResponse response,CostVO costVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		SiteManageVO siteManageVO = new SiteManageVO();
		
		List<Integer> siteList = (List<Integer>) session.getAttribute("SiteList");

		//System.out.println("siteList = "+siteList);
		
		Map<String,Object> result = new HashMap<>();
		
		List<Integer> selected_site_list = new ArrayList<Integer>();

		if(siteList.size() <= 0) {
			
			siteManageVO.setLgn_nm(userVo.getLgn_nm());
			siteManageVO.setCnt_mode(1);

			//siteManageVO.setCnt_mode(0);
			List<CloudVO> volist = siteManageService.selectSiteAll(siteManageVO);

			if(volist.size() <= 0) {

				result.put("costVal", 0); 
				result.put("costOrgVal", 0);
				result.put("trafficVal", 0); 
				result.put("orgTrafficVal", 0); 
				
				
				return result;
			}
			
			//System.out.println("siteOne0 = "+volist.get(0).getRow_no());
			selected_site_list.add(Integer.parseInt(volist.get(0).getRow_no()+""));
		}else {			
			//System.out.println("siteList0 = "+siteList.get(0));
			for(int i=0; i<siteList.size(); i++){ 
				selected_site_list.add(Integer.parseInt(siteList.get(i)+""));
			}
		}
		
		costVO.setSelected_site_list(selected_site_list);
		
		List<CostVO> getResizeCostChart = costService.getResizeCostChart(costVO);
		
		List<CostVO> getTrafficChart = costService.getCostChart(costVO);

		double costVal = 0.000;
		double costOrgVal = 0.000;
		
		int trafficVal = 0;
		int orgTrafficVal = 0;
		
		//현재 리소스 사이즈의 가격 측정
		for(int i=0;i<getResizeCostChart.size();i++) {
			double resize = (double)(getResizeCostChart.get(i).getResource_new_size_type2());
			double orgsize = (double)(getResizeCostChart.get(i).getResource_org_size());
			costVal += (resize/1073741824)*getResizeCostChart.get(i).getCloud_payment();
			costOrgVal += (orgsize/1073741824)*getResizeCostChart.get(i).getCloud_payment();			
		}
		
		for(int i=0;i<getTrafficChart.size();i++) {
			orgTrafficVal += getTrafficChart.get(i).getResource_org_size();
			if(getTrafficChart.get(i).getResource_new_size_type2() <= 0) {
				trafficVal += getTrafficChart.get(i).getResource_org_size();
			}else {
				trafficVal += getTrafficChart.get(i).getResource_new_size_type2();
			}
		}

		result.put("costVal", costVal); 
		result.put("costOrgVal", costOrgVal);
		result.put("trafficVal", trafficVal); 
		result.put("orgTrafficVal", orgTrafficVal); 
		
		
		return result;
	}
	
	@RequestMapping(value ="/addDate")
	@ResponseBody
	public Map<String,Object> addDate(HttpServletRequest request,  HttpServletResponse response,CostVO costVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		
		Map<String,Object> result = new HashMap<>();
		//사이트, 클라우드 정보 받아와야함 
		//int cloud_payment = costService.selectCloud_payment(costVO);
		
			
		
		
		result.put("reg_dt", userVo.getReg_dt()); 
		
		
		return result;
	}
	
	
	@RequestMapping(value ="/getJsonData")
	@ResponseBody
	public String getJsonData(HttpServletRequest request,  HttpServletResponse response) {
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
				
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
        OptimizerVO optimizerVO = new OptimizerVO();
        optimizerVO.setSite_list(site_list);
        List<OptimizerVO> volist = optimizerService.selectAll(optimizerVO);
        String jstreeData = optimizerService.convertToJSTreeFormat(volist);
		
		return jstreeData;
	}
	
	@RequestMapping(value ="/countResourceFolderTraffic", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("웹 컨텐츠 기준 최적화 > 페이지 매핑")
	public Map<String,Object> countResourceFolderTraffic(Model model, HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO) {
		System.out.println("매핑 값 확인"+optimizerVO);
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
        optimizerVO.setSite_list(site_list);
        
        // 리소스 갯수 카운트
        List<HashMap<String, Object>> countlist = costService.countResourceGroupByResourceParentNoTraffic(optimizerVO);
        List<HashMap<String, Object>> folderlist = costService.selectResourceFolderAllTraffic(optimizerVO);
        for(HashMap<String, Object> folder : folderlist) {
        	for(HashMap<String, Object> count : countlist) {
        		if(folder.get("resource_no").equals(count.get("resource_parent_no"))) {
        			
        			int countValue = objectIntConvert(count.get("count")); // 조건 O
        			int entireValue = objectIntConvert(count.get("entire_count")); // 조건 X
        			
        			folder.put("count", count.get("count"));
        			folder.put("total_count", count.get("count"));
        			folder.put("entire_count", count.get("entire_count"));
        			
        			Integer resource_parent_no = ((Number) folder.get("resource_parent_no")).intValue();
        			
        			while (resource_parent_no > 0) {
        				HashMap<String, Object> parentFolder = findFolderByResourceNo(folderlist, resource_parent_no);
                        if (parentFolder != null) {
                        	int parentCountValue = objectIntConvert(parentFolder.get("total_count"));
                        	int parentEntireValue = objectIntConvert(parentFolder.get("entire_count")); 
                        	parentFolder.put("total_count", (Integer)(countValue + parentCountValue)); // int에서 long으로 변환
                        	parentFolder.put("entire_count", (Integer)(entireValue + parentEntireValue)); // int에서 long으로 변환
                            resource_parent_no = (Integer) parentFolder.get("resource_parent_no");
                        } else {
                            // 부모 요소를 찾을 수 없는 경우 루프를 종료
                            break;
                        }
        			}
        			
        		}
        	}
        	for (Map.Entry<String, Object> entry : folder.entrySet()) {
                String key = entry.getKey();
                Object value = entry.getValue();
                // System.out.println(key + ": " + value);
            }
            // System.out.println(); // 각 HashMap의 끝을 표시하기 위해 빈 줄을 출력합니다.
        }
        
        Map<String,Object> result = new HashMap<>();
        result.put("data", folderlist);
        return result;
	}
	
	// 부모 번호 찾기
		 private static HashMap<String, Object> findFolderByResourceNo(List<HashMap<String, Object>> folderlist, Integer resource_no) {
	        for (HashMap<String, Object> folder : folderlist) {
	            if (folder.get("resource_no").equals(resource_no)) {
	                return folder;
	            }
	        }
	        return null;
	    }
	
	private static int objectIntConvert(Object object) {
		int value = 0;
	    if (object instanceof Long) {
	    	value = ((Long) object).intValue();
	    } else {
	    	value = (int) object;
	    }		
		return value;
	 }
	
	/***
	 * 1. 함수명 : selectResourceListByParentIdTraffic
	 * 2. 작성일: 
	 * 3. 작성자: 박정우
	 * 4. 설명: 비용 절감 현황 > 웹 컨텐츠 기준 > 타뷸레이터
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value ="/selectResourceListByParentIdTraffic", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("웹 컨텐츠 기준 최적화 > 테뷸레이터")
	public Map<String,Object> selectResourceListByParentId(HttpServletRequest request,  HttpServletResponse response, @RequestParam("size")int size, @RequestParam("page")int page, OptimizerVO optimizerVO) throws Exception{
		System.out.println(optimizerVO);
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		
		// System.out.println("===== search =====");
		// System.out.println("search_range : "+optimizerVO.getSearch_range());
		// System.out.println("search_keyword : "+optimizerVO.getSearch_keyword());
		System.out.println("search_page : "+optimizerVO.getSearch_page());
		System.out.println(optimizerVO.getResource_status_array());
		optimizerVO.getResource_type_array().add(0); // 폴더는 무조건 포함
		
		Map<String,Object> result = new HashMap<>();
		optimizerVO.setOffset((page-1)*10);
		optimizerVO.setCnt_mode(1);
		int cnt = costService.selectResourceListByParentIdTraffic(optimizerVO).size();
		int last = 1;
		if(cnt%size==0) last = 0;
		
		optimizerVO.setCnt_mode(0);
		List<OptimizerVO> volist = costService.selectResourceListByParentIdTraffic(optimizerVO);
		
		// 해당 vo가 폴더라면 용량 등을 재귀로 계산
	    /*for (OptimizerVO vo : volist) {
            if (vo.getResource_type() == 0) { // 폴더인 경우 모든 하위 항목을 불러옴
            	int resource_new_size_type1 = 0;
            	int resource_new_size_type2 = 0;
            	int call_cnt = 0;
                List<OptimizerVO> children = optimizerService.selectRecursiveResourceByResourceNo(vo);
                for (OptimizerVO child : children) {
                    if (child.getResource_type() > 0) {
                    	// System.out.println("resource_no : "+child.getResource_no()+" | "+child.getResource_new_size_type1()+" | "+child.getResource_new_size_type2());
                    	resource_new_size_type1 = resource_new_size_type1 + child.getResource_new_size_type1();
                    	resource_new_size_type2 = resource_new_size_type2 + child.getResource_new_size_type2();
                    	call_cnt = call_cnt + child.getCall_cnt();
                    }
                }
                vo.setResource_new_size_type1(resource_new_size_type1);
                vo.setResource_new_size_type2(resource_new_size_type2);
                vo.setCall_cnt(call_cnt);
                // System.out.println("resource_new_size_type1 : "+resource_new_size_type1);
                // System.out.println("resource_new_size_type2 : "+resource_new_size_type2);
            }
	    }*/		
		
		result.put("data", volist);
		result.put("list_cnt", cnt);
		result.put("last_page", (cnt/size+last)); 
		
		return result;
	}
	
	
}
