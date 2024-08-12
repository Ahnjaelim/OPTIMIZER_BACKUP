package com.wellconn.optimizer.controller;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.wellconn.mbuster.common.util.ReportUtil;

import com.wellconn.optimizer.model.CostVO;
import com.wellconn.optimizer.model.ReportVO;
import com.wellconn.optimizer.model.UserVO;
import com.wellconn.optimizer.service.ReportService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ReportController {

	
	private final ReportService reportService;

	@RequestMapping(value = "/report", method = RequestMethod.GET)
	public String report(Model model, HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		
		return "/report/report";
	}
	
	@RequestMapping(value = "/report_v2", method = RequestMethod.GET)
	public String report_v2(Model model, HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		
		return "/report/report_v2";
	}
	
	
	@RequestMapping(value ="/contentChartAll")
	@ResponseBody
	public Map<String,Object> contentChartAll(HttpServletRequest request,  HttpServletResponse response,ReportVO reportVO) throws Exception{
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		
		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		reportVO.setSite_list(site_list);
		
		Map<String,Object> result = new HashMap<>();
		
		
		List<ReportVO> data = reportService.contentChartAll(reportVO);
		result.put("data", data); 
		
		return result;
	}
	
	
	@RequestMapping(value = "/selectAvgTimeGroup", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectAvgTimeGroup(HttpServletRequest request,  HttpServletResponse response,ReportVO reportVO) throws Exception{
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");

		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		reportVO.setSite_list(site_list);
		Map<String,Object> result = new HashMap<>();

		List<ReportVO> data = reportService.selectAvgTimeGroup(reportVO);
		
		
		result.put("data", data);
		return result;
	}
	
	
	@RequestMapping(value = "/selectAvgComp", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectAvgComp(HttpServletRequest request,  HttpServletResponse response,ReportVO reportVO) throws Exception{
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");

		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		reportVO.setSite_list(site_list);
		Map<String,Object> result = new HashMap<>();

		List<ReportVO> data = reportService.selectAvgComp(reportVO);
		
		
		result.put("data", data);
		return result;
	}
	
	
	
	@RequestMapping(value = "/selectTimetable", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectTimetable(HttpServletRequest request,  HttpServletResponse response,ReportVO reportVO) throws Exception{
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");

		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		reportVO.setSite_list(site_list);
		Map<String,Object> result = new HashMap<>();

		List<ReportVO> fastData = reportService.selectTimetableFast(reportVO);
		List<ReportVO> slowData = reportService.selectTimetableSlow(reportVO);
		
		
		result.put("fastData", fastData);
		result.put("slowData", slowData);
		return result;
	}
	
	@RequestMapping(value = "/selectTimetablePage", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectTimetablePage(HttpServletRequest request,  HttpServletResponse response,ReportVO reportVO) throws Exception{
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");

		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		reportVO.setSite_list(site_list);
		Map<String,Object> result = new HashMap<>();

		List<ReportVO> fastData = reportService.getUrlFastTop10(reportVO);
		List<ReportVO> slowData = reportService.getUrlSlowTop10(reportVO);
		
		
		result.put("fastData", fastData);
		result.put("slowData", slowData);
		return result;
	}
	
	
	@RequestMapping(value = "/selectCompTable", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectCompTable(HttpServletRequest request,  HttpServletResponse response,ReportVO reportVO) throws Exception{
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");

		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		reportVO.setSite_list(site_list);
		Map<String,Object> result = new HashMap<>();

		List<ReportVO> fastData = reportService.selectSizeGoodTable(reportVO);
		List<ReportVO> slowData = reportService.selectSizeBadTable(reportVO);
		
		
		result.put("fastData", fastData);
		result.put("slowData", slowData);
		return result;
	}
	
	@RequestMapping(value = "/getUrl", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> getUrl(HttpServletRequest request,  HttpServletResponse response,ReportVO reportVO) throws Exception{
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");

		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		reportVO.setSite_list(site_list);
		Map<String,Object> result = new HashMap<>();

		List<ReportVO> data = reportService.getUrl(reportVO);
		
		
		
		result.put("data", data);
		return result;
	}
	
	@RequestMapping(value = "/selectSite", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectSite(HttpServletRequest request,  HttpServletResponse response,ReportVO reportVO) throws Exception{
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");

		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		reportVO.setSite_list(site_list);
		Map<String,Object> result = new HashMap<>();

		List<ReportVO> data = reportService.selectSite(reportVO);
		
		
		
		result.put("data", data);
		return result;
	}
	
	
	@RequestMapping(value = "/getOptimizer", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> getOptimizer(HttpServletRequest request,  HttpServletResponse response,ReportVO reportVO) throws Exception{
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");

		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		reportVO.setSite_list(site_list);
		Map<String,Object> result = new HashMap<>();

		List<ReportVO> title = reportService.optimizer_title(reportVO);
		List<ReportVO> list = reportService.optimizer_list(reportVO);
		
		
		
		result.put("title", title);
		result.put("list", list);
		return result;
	}
	
	
	
	
	@RequestMapping(value ="/selectContentTableRp", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectContentTable(HttpServletRequest request,  HttpServletResponse response, @RequestParam("size")int size, @RequestParam("page")int page, ReportVO reportVO) throws Exception{
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		//사이트 리스트 받기
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		reportVO.setSite_list(site_list);
		Map<String,Object> result = new HashMap<>();
		reportVO.setOffset((page-1)*10);
		
		reportVO.setCnt_mode(1);
		
		
		List<ReportVO> data = null;
		int cnt =0;
			
		cnt = reportService.selectAllresource(reportVO).size();
		
		reportVO.setCnt_mode(0);
		data = reportService.selectAllresource(reportVO);
		
		int last = 1;
		if(cnt%size==0) last = 0;
		
		result.put("data", data);
		result.put("list_cnt", cnt);
		result.put("last_page", (cnt/size+last)); 
		
		return result;
	}
	
	
	
	
//	@RequestMapping(value = "/reportDownload", method = RequestMethod.GET)
//	public void downloadExcel(HttpServletRequest request,HttpServletResponse response) throws IOException, InvalidFormatException {
//		// 세션 받기
//				HttpSession session = request.getSession();
//				UserVO userVo = (UserVO) session.getAttribute("login");
//				//사이트 리스트 받기
//				ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
//				ReportVO reportVO = new ReportVO();
//				reportVO.setSite_list(site_list);
//		 	String fileName = "sample.xlsx";
//	        String encodedFileName = URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20");
//	        
//	        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
//	        response.setHeader("Content-Disposition", "attachment; filename=\"" + encodedFileName + "\"");
//
//	        byte[] excelData = reportService.createExcel(reportVO);
//	        
//	        try (ServletOutputStream outputStream = response.getOutputStream()) {
//	            outputStream.write(excelData);
//	            outputStream.flush();
//	        } catch (IOException e) {
//	            e.printStackTrace();
//	            response.reset();
//	        }
//    }
	
	@PostMapping(value = "/reportDownload")
	public void downloadExcel(HttpServletRequest request,HttpServletResponse response,@RequestBody ReportVO reportVO) throws IOException, InvalidFormatException {
		
		// Null 체크
        if (reportVO.getCanvasImages() == null) {
            System.out.println("canvasImages is null");
        } else {
            System.out.println("canvasImages size: " + reportVO.getCanvasImages().size());
        }

        if (reportVO.getImgImages() == null) {
            System.out.println("imgImages is null");
        } else {
            System.out.println("imgImages size: " + reportVO.getImgImages().size());
        }
		// 세션 받기
		
		
				HttpSession session = request.getSession();
				UserVO userVo = (UserVO) session.getAttribute("login");
				//사이트 리스트 받기
				ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
				
			reportVO.setSite_list(site_list);
		 	String fileName = "sample.xlsx";
	        String encodedFileName = URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20");
	        
	        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
	        response.setHeader("Content-Disposition", "attachment; filename=\"" + encodedFileName + "\"");
	       
	        byte[] excelData = reportService.createExcel(reportVO);
	        
	        try (ServletOutputStream outputStream = response.getOutputStream()) {
	            outputStream.write(excelData);
	            outputStream.flush();
	        } catch (IOException e) {
	            e.printStackTrace();
	            response.reset();
	        }
    }
	
	@PostMapping(value = "/reportDownload_v2")
	public void downloadExcel_v2(HttpServletRequest request,HttpServletResponse response,@RequestBody ReportVO reportVO) throws IOException, InvalidFormatException {
		
		// Null 체크
        if (reportVO.getCanvasImages() == null) {
            System.out.println("canvasImages is null");
        } else {
            System.out.println("canvasImages size: " + reportVO.getCanvasImages().size());
        }

        if (reportVO.getImgImages() == null) {
            System.out.println("imgImages is null");
        } else {
            System.out.println("imgImages size: " + reportVO.getImgImages().size());
        }
		// 세션 받기
		
		
				HttpSession session = request.getSession();
				UserVO userVo = (UserVO) session.getAttribute("login");
				//사이트 리스트 받기
				ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
				
			reportVO.setSite_list(site_list);
		 	String fileName = "sample_v2.xlsx";
	        String encodedFileName = URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20");
	        
	        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
	        response.setHeader("Content-Disposition", "attachment; filename=\"" + encodedFileName + "\"");
	       
	        byte[] excelData = reportService.createExcelV2(reportVO);
	        
	        try (ServletOutputStream outputStream = response.getOutputStream()) {
	            outputStream.write(excelData);
	            outputStream.flush();
	        } catch (IOException e) {
	            e.printStackTrace();
	            response.reset();
	        }
    }
}
	
