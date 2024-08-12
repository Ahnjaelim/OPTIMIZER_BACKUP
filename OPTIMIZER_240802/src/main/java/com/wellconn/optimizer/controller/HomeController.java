package com.wellconn.optimizer.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wellconn.optimizer.model.ConfigVO;
import com.wellconn.optimizer.model.OptimizerVO;
import com.wellconn.optimizer.model.UserVO;
import com.wellconn.optimizer.service.CloudService;
import com.wellconn.optimizer.service.ConfigService;
import com.wellconn.optimizer.service.OptimizerLogService;
import com.wellconn.optimizer.service.OptimizerPageService;
import com.wellconn.optimizer.service.OptimizerService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

/**
 * Handles requests for the application home page.
 */
@Controller
@RequiredArgsConstructor
@Api(tags = "대시보드 컨트롤러", description = "대시보드 컨트롤러")
public class HomeController {

    // 상수 정의
    private static final int SUCCESS_CODE = 200;
    private static final int NO_DATA_CODE = 204;
    private static final int NOT_FOUND_CODE = 404;
	
	private final OptimizerService optimizerService;
	private final OptimizerPageService optimizerPageService;
	private final OptimizerLogService optimizerLogService;
	private final CloudService cloudService;	 
	private final ConfigService configService;	 
	
	
	@RequestMapping(value = "/optimizer_menual", method = RequestMethod.GET)
	public String report(Model model, HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		
		return "/menual/optimizer_menual";
	}
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) {
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		String formattedDate = dateFormat.format(date);
		model.addAttribute("serverTime", formattedDate );
		
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		System.out.println("===== site_list =====");
		System.out.println(site_list);
		
		return "dashboardSpeed";
	}

	@RequestMapping(value = "/dashboardSpeed", method = RequestMethod.GET)
	public String dashboardSpeed(Locale locale, Model model,  HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		System.out.println(site_list);
		return "dashboardSpeed";
	}	
	
	@RequestMapping(value = "/index_temp", method = RequestMethod.GET)
	public String index_temp(Locale locale, Model model,  HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		System.out.println(site_list);
		return "index_temp";
	}
	
	/***
	 * 1. 함수명 : dashboard
	 * 2. 작성일: 2024-05-20
	 * 3. 작성자: 김조은
	 * 4. 설명: 대시보드 페이지
	 * 5. 수정일: 
	 * ***/	
	@RequestMapping(value = "/dashboard", method = RequestMethod.GET)
	public String dashboard(Locale locale, Model model,  HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		System.out.println(site_list);
		
		model.addAttribute("test","컨트롤러 테스트");
	
		return "dashboard";
	}	
	
	@RequestMapping(value = "/dashboardTest", method = RequestMethod.GET)
	public String dashboardTest(Locale locale, Model model, HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		
		OptimizerVO optimizerVO = new OptimizerVO();
		// List<HashMap<String, Object>> count = optimizerService.countResourceGroupByResourceType(optimizerVO);
		// model.addAttribute("test","컨트롤러 테스트");
		// model.addAttribute("count",count);
		
		return "dashboardTest";
	}		

		
	
	@RequestMapping(value = "/template", method = RequestMethod.GET)
	public String template(Model model) {
		return "template";
	}

	@RequestMapping(value = "/blank", method = RequestMethod.GET)
	public String blank(Model model) {
		return "blank";
	}	
	
	@RequestMapping(value = "/temp01", method = RequestMethod.GET)
	public String temp01(Model model) {
		return "temp01";
	}		

	@RequestMapping(value = "view.do")
	public ResponseEntity<Void> getSummernoteImage(@RequestParam(value="image_path", required=true) String image_path,@RequestParam(value="image_name", required=true) String image_name, HttpServletResponse response)
            throws IOException {

		  // 파일 경로 생성
        String filePath = image_path + image_name;

        // 파일 존재 여부 확인
        File file = new File(filePath);
        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 파일이 없을 때 404 응답 반환
        }

        // 파일이 존재하는 경우, 파일을 response로 전송
        try (FileInputStream inputStream = new FileInputStream(file)) {
            // 파일 내용을 response에 복사
            org.apache.commons.io.IOUtils.copy(inputStream, response.getOutputStream());
            response.setContentType("image/jpeg"); // 파일 타입에 맞게 content type 설정
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 다른 IO 예외 발생 시 500 응답 반환
        }

        return ResponseEntity.ok().build();
	}	

    @GetMapping(value = "/view")
    public ResponseEntity<Void> viewFile(
            @RequestParam(value = "path", required = true) String path,
            HttpServletResponse response) {

        File file = new File(path);
        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 파일이 없을 때 404 응답 반환
        }

        try (FileInputStream inputStream = new FileInputStream(file)) {
            // 파일 내용을 response에 복사
            org.apache.commons.io.IOUtils.copy(inputStream, response.getOutputStream());

            // 파일 타입에 맞게 Content-Type 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(getMediaTypeForFileName(file));
            response.setContentType(headers.getContentType().toString());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 다른 IO 예외 발생 시 500 응답 반환
        }

        return ResponseEntity.ok().build();
    }
	
	
    /** 외부에서 리소스 받아오기 **/
    @GetMapping(value = "/getResource")
    public ResponseEntity<?> getResource(@RequestParam String path, @RequestParam String name) {
        try {
            // 경로 유효성 검사
            if (path.contains("..") || !new File(path).isAbsolute()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Invalid path");
            }

            File file = new File(path);
            Resource resource = new FileSystemResource(file);

            if (!resource.exists()) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("Resource not found");
            }

            // 리소스의 확장자에 따라 Content-Type 지정
            MediaType mediaType = getMediaTypeForFileName(file);

            // Content-Disposition 헤더 설정
            String encodedFileName = URLEncoder.encode(name, StandardCharsets.UTF_8.toString());
            String contentDisposition = "attachment; filename=\"" + encodedFileName + "\"";

            // CSS, JS, 이미지, 폰트 등에 따라 다른 Content-Type으로 응답
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(mediaType);
            headers.add(HttpHeaders.CONTENT_DISPOSITION, contentDisposition);

            byte[] fileContent = Files.readAllBytes(file.toPath());
            return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error while processing the resource: " + e.getMessage());
        }
    }

    // 파일 확장자에 따라 Content-Type 반환
    private MediaType getMediaTypeForFileName(File file) {
        String fileName = file.getName().toLowerCase();
        if (fileName.endsWith(".css")) {
            return MediaType.valueOf("text/css");
        } else if (fileName.endsWith(".js")) {
            return MediaType.valueOf("application/javascript");
        } else if (fileName.endsWith(".png")) {
            return MediaType.IMAGE_PNG;
        } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
            return MediaType.IMAGE_JPEG;
        } else if (fileName.endsWith(".gif")) {
            return MediaType.IMAGE_GIF;
        } else if (fileName.endsWith(".woff2")) {
            return MediaType.valueOf("application/font-woff2");
        } else if (fileName.endsWith(".woff")) {
            return MediaType.valueOf("application/font-woff");
        } else if (fileName.endsWith(".ttf")) {
            return MediaType.valueOf("application/x-font-ttf");
        } else if (fileName.endsWith(".pdf")) {
            return MediaType.APPLICATION_PDF;
        } else if (fileName.endsWith(".doc") || fileName.endsWith(".docx")) {
            return MediaType.valueOf("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        } else if (fileName.endsWith(".xls") || fileName.endsWith(".xlsx")) {
            return MediaType.valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        } else if (fileName.endsWith(".ppt") || fileName.endsWith(".pptx")) {
            return MediaType.valueOf("application/vnd.openxmlformats-officedocument.presentationml.presentation");
        } else {
            return MediaType.APPLICATION_OCTET_STREAM;
        }
    }

	/***
	 * 1. 함수명 : selectResourceMonthlyTraffic
	 * 2. 작성일: 2024-02-20
	 * 3. 작성자: 안재림
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value = "/selectResourceMonthlyTraffic", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("대시보드 > 차트용 데이터")
	public Map<String,Object> selectResourceMonthlyTraffic(Model model, HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO) {
		System.out.println(optimizerVO);
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
        optimizerVO.setSite_list(site_list);
        
        List<HashMap<String, Object>> chartDataList = optimizerService.selectResourceMonthlyTraffic(optimizerVO);

        Map<String,Object> result = new HashMap<>();
        result.put("data", chartDataList);
        return result;
	}	
 
	/***
	 * 1. 함수명 : selectResourceMonthlyTrafficByResourceType
	 * 2. 작성일: 2024-02-20
	 * 3. 작성자: 안재림
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value = "/selectResourceMonthlyTrafficByResourceType", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("대시보드 > 차트용 데이터")
	public Map<String,Object> selectResourceMonthlyTrafficByResourceType(Model model, HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO) {
		System.out.println(optimizerVO);
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
        optimizerVO.setSite_list(site_list);
        
        List<HashMap<String, Object>> chartDataDetailList = optimizerService.selectResourceMonthlyTrafficByResourceType(optimizerVO);
        
        Map<String,Object> result = new HashMap<>();
        result.put("data", chartDataDetailList);
        return result;
	}	
	

	

	/** ==================================================================================================== 속도 대시보드 **/
	
	/***
	 * 1. 함수명 : 
	 * 2. 작성일: 
	 * 3. 작성자: 안재림
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value = "/selectMonthlyTrafficByType", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("")
	public Map<String,Object> selectMonthlyTrafficByType(Model model, HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO, Integer startDateParam) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
        optimizerVO.setSite_list(site_list);
        int resultCode = SUCCESS_CODE;
        
        // 날짜 지정
        LocalDate now = LocalDate.now();
        LocalDate firstDayOfMonth = now.withDayOfMonth(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formattedDate = firstDayOfMonth.format(formatter);
        int startDate = Integer.parseInt(formattedDate);     
        if (startDateParam != null) {
        	startDate = startDateParam;
        }
        int endDate = startDate + 31;
        optimizerVO.setStartDate(startDate);
        optimizerVO.setEndDate(endDate);
        List<HashMap<String, Object>> data = optimizerService.selectMonthlyTrafficByType(optimizerVO);
        
        // resource_type때문에 데이터가 없어도 빈 리스트로 안넘어옴
        /*for (HashMap<String, Object> map : data) {
            System.out.println("New HashMap:");
            for (Map.Entry<String, Object> entry : map.entrySet()) {
                System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue());
            }
        }*/
        
    	// 전체 트래픽 계산
        long optimizedTotalTraffic = 0;
        long unoptimizedTotalTraffic = 0;
        // 리스트의 각 요소를 순회
        for (HashMap<String, Object> map : data) {
        	Object unoptimizedSumValue = map.get("traffic1");
            Object optimizedSumValue = map.get("traffic2");
            if (optimizedSumValue != null && unoptimizedSumValue != null) {
            	long optimizedSum = Long.parseLong(optimizedSumValue.toString()); 
            	long unoptimizedSum = Long.parseLong(unoptimizedSumValue.toString()); 
            	optimizedTotalTraffic += optimizedSum;
            	unoptimizedTotalTraffic += unoptimizedSum;
            } else {
                System.out.println("No 'sum' value found in the map");
            }        	
        }
        HashMap<String, Object> total = new HashMap<String, Object>();
        total.put("resource_type", "total");
        total.put("traffic1", unoptimizedTotalTraffic);
        total.put("traffic2", optimizedTotalTraffic);
        data.add(total);
        
        // 퍼센티지로 변환
        for (HashMap<String, Object> map : data) {
        	Object unoptimizedSumValue = map.get("traffic1");
        	Object optimizedSumValue = map.get("traffic2");
            if (optimizedSumValue != null) {
            	long optimizedSum = Long.parseLong(optimizedSumValue.toString());
            	double percentage = ((double) optimizedSum / optimizedTotalTraffic) * 100; // double로 형변환하여 계산
            	double roundedPercentage = 0;
                DecimalFormat df = new DecimalFormat("#.#"); // DecimalFormat을 사용하여 소수점 한 자리까지만 표시
                if(percentage > 0) {
                	roundedPercentage = Double.parseDouble(df.format(percentage));                	
                }
            	map.put("percentage", roundedPercentage);
            } else {
                System.out.println("No 'sum' value found in the map");
            }        	
        }        	
   
        // 데이터 확인
        if(unoptimizedTotalTraffic == 0 && optimizedTotalTraffic == 0) {
        	resultCode = NO_DATA_CODE;
        }
        
        Map<String,Object> result = new HashMap<>();
        result.put("data", data);
        result.put("resultCode", resultCode);           
        return result;
	}	

	
	/***
	 * 1. 함수명 : 
	 * 2. 작성일: 
	 * 3. 작성자: 김조은
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value = "/selectLastMonthlyTrafficByType", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("")
	public Map<String,Object> selectLastMonthlyTrafficByType(Model model, HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO, Integer startDateParam) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
        optimizerVO.setSite_list(site_list);
        int resultCode = SUCCESS_CODE;
        
        LocalDate now = LocalDate.now();
        LocalDate lastMonth = now.minusMonths(1);
        LocalDate firstDayOfLastMonth = lastMonth.withDayOfMonth(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formattedDate = firstDayOfLastMonth.format(formatter);
        int startDate = Integer.parseInt(formattedDate);     
        if (startDateParam != null) {
        	startDate = startDateParam;
        }
        int endDate = startDate + 31;
        optimizerVO.setStartDate(startDate);
        optimizerVO.setEndDate(endDate);
        List<HashMap<String, Object>> data = optimizerService.selectMonthlyTrafficByType(optimizerVO);
        
        long optimizedTotalTraffic = 0;
        long unoptimizedTotalTraffic = 0;
        
        // 리스트의 각 요소를 순회
        for (HashMap<String, Object> map : data) {
            Object unoptimizedSumValue = map.get("traffic1");
            Object optimizedSumValue = map.get("traffic2");
            if (optimizedSumValue != null && unoptimizedSumValue != null) {
            	long optimizedSum = Long.parseLong(optimizedSumValue.toString()); 
            	long unoptimizedSum = Long.parseLong(unoptimizedSumValue.toString()); 
            	optimizedTotalTraffic += optimizedSum;
            	unoptimizedTotalTraffic += unoptimizedSum;
            } else {
                System.out.println("No 'sum' value found in the map");
            }        	
        }
        HashMap<String, Object> total = new HashMap<String, Object>();
        total.put("resource_type", "total");
        total.put("optimized_sum", optimizedTotalTraffic);
        total.put("unoptimized_sum", unoptimizedTotalTraffic);
        data.add(total);
        // 데이터 확인
        if(unoptimizedTotalTraffic == 0 && optimizedTotalTraffic == 0) {
        	resultCode = NO_DATA_CODE;
        }
        
        Map<String,Object> result = new HashMap<>();
        result.put("data", data);
        result.put("resultCode", resultCode);           
        return result;
	}	
	
        
        
	/***
	 * 1. 함수명 : 
	 * 2. 작성일: 
	 * 3. 작성자: 안재림
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value = "/selectCountByResourceStatus", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("")
	public Map<String,Object> selectCountByResourceStatus(Model model, HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO, Integer startDateParam) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
        optimizerVO.setSite_list(site_list);
        int resultCode = SUCCESS_CODE;
        
        // 데이터 불러오기
        List<HashMap<String, Object>> data = optimizerService.selectCountByResourceStatus(optimizerVO);

        // 전체 리소스 갯수 계산
        int totalResourceCnt = 0;
        int resourceStatus1Cnt = 0;
        int resourceStatusMinusCnt = 0;
        for (HashMap<String, Object> map : data) {
        	Object status1_count_value = map.get("status1_count");
        	Object total_value = map.get("total");
        	Object status_minus_count_value = map.get("status_minus_count");
            if (status1_count_value != null && total_value != null) {
            	int status1_count = Integer.parseInt(status1_count_value.toString());
            	int total = Integer.parseInt(total_value.toString());
            	int status_minus_count = Integer.parseInt(status_minus_count_value.toString());
            	totalResourceCnt += total;
            	resourceStatus1Cnt += status1_count;
            	resourceStatusMinusCnt += status_minus_count;
            }
        }
        HashMap<String, Object> total = new HashMap<String, Object>();
        total.put("resource_type", "total");
        total.put("status1_count", resourceStatus1Cnt);
        total.put("status_minus_count", resourceStatusMinusCnt);
        total.put("total", totalResourceCnt);
        data.add(total);
        
        for (HashMap<String, Object> map : data) {
            Object status1_count_value = map.get("status1_count");
            Object total_value = map.get("total");
            if (status1_count_value != null && total_value != null) {
                int status1_count = Integer.parseInt(status1_count_value.toString());
                int total_count = Integer.parseInt(total_value.toString());
                if (total_count != 0) { // Prevent division by zero
                    double percentage = ((double) status1_count / total_count) * 100;

                    // DecimalFormat을 사용하여 소수점 한 자리까지만 표시
                    DecimalFormat df = new DecimalFormat("#.#", DecimalFormatSymbols.getInstance(Locale.US));
                    double roundedPercentage = Double.parseDouble(df.format(percentage));

                    map.put("percentage", roundedPercentage);
                }
            }
        }
        
        Map<String,Object> result = new HashMap<>();
        result.put("data", data);
        result.put("resultCode", resultCode);   
        return result;
	}

	/***
	 * 1. 함수명 : 
	 * 2. 작성일: 
	 * 3. 작성자: 안재림
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value = "/selectMonthlyTrafficPredict", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("")
	public Map<String,Object> selectMonthlyTrafficPredict(Model model, HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO,  Integer startDateParam) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
        optimizerVO.setSite_list(site_list);
        int resultCode = SUCCESS_CODE;
        
        // 날짜 지정
        LocalDate now = LocalDate.now();
        LocalDate firstDayOfMonth = now.withDayOfMonth(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formattedDate = firstDayOfMonth.format(formatter);
        int startDate = Integer.parseInt(formattedDate);     
        if (startDateParam != null) {
        	startDate = startDateParam;
        }
        int endDate = startDate + 31;
        optimizerVO.setStartDate(startDate);
        optimizerVO.setEndDate(endDate);         
        
        HashMap<String, Object> AvgCompRateData = optimizerService.selectAvgCompRate(optimizerVO);
        double avg_comp_rate = 0;
     // null 체크 및 예외 처리
        if (AvgCompRateData != null && AvgCompRateData.get("avg_comp_rate") != null) {
            try {
                avg_comp_rate = Double.parseDouble(AvgCompRateData.get("avg_comp_rate").toString());
                // avg_comp_rate 사용
                System.out.println("Average Completion Rate: " + avg_comp_rate);
            } catch (NumberFormatException e) {
                // 숫자로 변환할 수 없는 경우에 대한 처리
                System.err.println("avg_comp_rate 값이 유효한 숫자가 아닙니다: " + AvgCompRateData.get("avg_comp_rate"));
                // 필요에 따라 예외를 다시 던지거나 적절한 대응 추가
            }
        } else {
            // AvgCompRateData가 null이거나 avg_comp_rate 키가 존재하지 않는 경우에 대한 처리
            System.err.println("AvgCompRateData가 null이거나 avg_comp_rate 키가 존재하지 않습니다.");
            // 필요에 따라 예외를 던지거나 기본값 설정
        }        
        optimizerVO.setAvg_comp_rate(1-(avg_comp_rate/100));
        List<HashMap<String, Object>> data = optimizerService.selectMonthlyTrafficByStatus(optimizerVO);
        HashMap<String, Object> status0data = optimizerService.selectMonthlyTrafficPredict(optimizerVO);
        
        int i = 0;
        int status0_index = 0;
        for (HashMap<String, Object> map : data) {
        	Object resource_status_value = map.get("resource_status");
        	if (resource_status_value != null) {
        		int resource_status = Integer.parseInt(resource_status_value.toString());
        		if(resource_status == 0) {
        			String traffic2String = status0data.get("traffic2").toString();
        			double predictedTraffic2_double = Double.parseDouble(traffic2String);
        			int predictedTraffic2 = (int) predictedTraffic2_double;
        			map.put("traffic2", predictedTraffic2);
        			status0_index = i;
        		}
        	}
        	i++;
        }
        
        long traffic1_total = 0;
        long traffic2_total = 0;
        for (HashMap<String, Object> map : data) {
        	Object traffic1_value = map.get("traffic1");
        	Object traffic2_value = map.get("traffic2");
        	if(traffic1_value != null && traffic2_value != null) {
        		long traffic1 = Long.parseLong(traffic1_value.toString());
        		long traffic2 = Long.parseLong(traffic2_value.toString());
        		traffic1_total += traffic1;
        		traffic2_total += traffic2;
        	}
        }
        HashMap<String, Object> total = new HashMap<String, Object>();
        total.put("traffic1", traffic1_total);
        total.put("traffic2", traffic2_total);
        total.put("resource_status", "total");
        double traffic1_double = (double) traffic1_total;
        double traffic2_double = (double) traffic2_total;        
		double comp_rate;
		if (traffic1_double == 0) {
		    comp_rate = 0;
		} else {
		    comp_rate = (1 - (traffic2_double / traffic1_double)) * 100;
		}
		DecimalFormat df = new DecimalFormat("#.##");
		comp_rate = Double.parseDouble(df.format(comp_rate));
        total.put("percentage", comp_rate);
        data.add(total);
        
        if(traffic1_total == 0 && traffic2_total == 0) {
        	resultCode = NO_DATA_CODE;
        }
        long targetTraffic1 = Long.parseLong(data.get(status0_index).get("traffic1").toString());
        long targetTraffic2 = Long.parseLong(data.get(status0_index).get("traffic2").toString());
        if(targetTraffic1 == 0 && targetTraffic2 == 0){
        	resultCode = NO_DATA_CODE;
        }
        
        Map<String,Object> result = new HashMap<>();
        result.put("data", data);
        result.put("resultCode", resultCode);   
        return result;
	}	
	
	/***
	 * 1. 함수명 : 
	 * 2. 작성일: 
	 * 3. 작성자: 안재림
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value = "/selectResourceAllUnoptimized", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("")
	public Map<String,Object> selectResourceAllUnoptimized(Model model, HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
        optimizerVO.setSite_list(site_list);
        int resultCode = SUCCESS_CODE;
        String msg = "";
        
        // 데이터 불러오기
        /*
        List<HashMap<String, Object>> data = optimizerService.selectResourceAllUnoptimized(optimizerVO);
        if(data.size() == 0) {
        	data = optimizerService.selectResourceAllUnoptimizedBySize(optimizerVO);
        	if(data.size() == 0) {
        		resultCode = NO_DATA_CODE;        		
        	}else {
        		msg = "replaced";
        	}
        }*/
        List<HashMap<String, Object>> data = optimizerService.selectResourceAllUnoptimizedBySize(optimizerVO);
        
        Map<String,Object> result = new HashMap<>();
        result.put("data", data);
        result.put("resultCode", resultCode);   
        result.put("msg", msg);   
        return result;
	}
	
	/***
	 * 1. 함수명 : 
	 * 2. 작성일: 
	 * 3. 작성자: 김조은
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/	
	@RequestMapping(value = "/averageCompressionRate", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("")
	public Map<String,Object> averageCompressionRate(Model model, HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
        optimizerVO.setSite_list(site_list);
        int resultCode = SUCCESS_CODE;	
        
        // 데이터 불러오기
        List<HashMap<String, Object>> data = optimizerService.averageCompressionRate(optimizerVO);
        
        Map<String,Object> result = new HashMap<>();
        result.put("data", data);
        result.put("resultCode", resultCode);           
        return result;
	}
	
	/***
	 * 1. 함수명 : 
	 * 2. 작성일: 
	 * 3. 작성자: 김조은
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/	
	@RequestMapping(value = "/savedTraffic", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("")
	public Map<String,Object> savedTraffic(Model model, HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
        optimizerVO.setSite_list(site_list);
        int resultCode = SUCCESS_CODE;	
        
        // 데이터 불러오기
        List<HashMap<String, Object>> data = optimizerService.savedTraffic(optimizerVO);
        
        Map<String,Object> result = new HashMap<>();
        result.put("data", data);
        result.put("resultCode", resultCode);   
        return result;
	}
	
	@RequestMapping(value = "/insertFakeLog", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("")
	public Map<String,Object> insertFakeLog(Model model, HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
        optimizerVO.setSite_list(site_list);
        int resultCode = SUCCESS_CODE;	
        
        optimizerService.insertFakeLog();
        
        Map<String,Object> result = new HashMap<>();
        result.put("data", null);
        result.put("resultCode", resultCode);   
        return result;
	}	
	
	@RequestMapping(value = "/selectViewLogAll", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("")
	public Map<String,Object> selectViewLogAll(Model model, HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		int resultCode = SUCCESS_CODE;	
		
		// System.out.println("target_date : "+optimizerVO.getTarget_date());
		List<HashMap<String, Object>> data = optimizerService.selectViewLogAll(optimizerVO);
		
		Map<String,Object> result = new HashMap<>();
		result.put("data", data);
		result.put("resultCode", resultCode);   
		return result;
	}	
	
	@RequestMapping(value = "/selectNewResourceAll", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("")
	public Map<String,Object> selectNewResourceAll(Model model, HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO, Integer startDateParam) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		int resultCode = SUCCESS_CODE;	
		System.out.println(optimizerVO);
        // 날짜 지정
        LocalDate now = LocalDate.now();
        LocalDate firstDayOfMonth = now.withDayOfMonth(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formattedDate = firstDayOfMonth.format(formatter);
        int startDate = Integer.parseInt(formattedDate);     
        if (startDateParam != null) {
        	startDate = startDateParam;
        }
        int endDate = startDate + 31;
        optimizerVO.setStartDate(startDate);
        optimizerVO.setEndDate(endDate);    
        
        String startDate_str = String.valueOf(startDate);
        startDate_str = startDate_str.substring(0, 4) + "-" + startDate_str.substring(4, 6) + "-" + startDate_str.substring(6)+" 00:00:00";
        String endDate_str = String.valueOf(endDate);
        endDate_str = endDate_str.substring(0, 4) + "-" + endDate_str.substring(4, 6) + "-" + endDate_str.substring(6)+" 23:59:59";
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        try {
            Timestamp startDate_ts = new Timestamp(dateFormat.parse(startDate_str).getTime());
            Timestamp endDate_ts = new Timestamp(dateFormat.parse(endDate_str).getTime());
            optimizerVO.setStartDate_ts(startDate_ts);
            optimizerVO.setEndDate_ts(endDate_ts);
            // startDate_timestamp와 endDate_timestamp를 사용하여 쿼리를 실행하거나 매개변수로 전달합니다.
        } catch (ParseException e) {
            e.printStackTrace();
        }     
        
		List<HashMap<String, Object>> data = optimizerService.selectNewResourceAll(optimizerVO);
		
		for(HashMap<String, Object> map : data) {
			Object resource_status_value = map.get("resource_status");
        	if (resource_status_value != null) {
        		int resource_status = Integer.parseInt(resource_status_value.toString());
        		if(resource_status == 0) {
        			resultCode = NO_DATA_CODE;
        		}
        	}
		}
		
		Map<String,Object> result = new HashMap<>();
		result.put("data", data);
		result.put("resultCode", resultCode);   
		return result;
	}	

	

	@RequestMapping(value = "/totalUnOptAllSize", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("")
	public Map<String,Object> totalUnOptAllSize(Model model, HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
        optimizerVO.setSite_list(site_list);
        int resultCode = SUCCESS_CODE;	
        
        // 데이터 불러오기
        List<HashMap<String, Object>> data = optimizerService.totalUnOptAllSize(optimizerVO);
        
        // 전체 사이즈 계산
        long unoptimizedTotalSize = 0;
        // 리스트의 각 요소를 순회
        for (HashMap<String, Object> map : data) {
            Object unoptimizedSumValue = map.get("total_unopt_all_size");
            if (unoptimizedSumValue != null) {
            	long unoptimizedSum = Long.parseLong(unoptimizedSumValue.toString()); 
            	unoptimizedTotalSize += unoptimizedSum;
            } else {
                System.out.println("No 'sum' value found in the map");
            }        	
        }
        HashMap<String, Object> total = new HashMap<String, Object>();
        total.put("resource_type", "unoptimizedTotalSize");
        total.put("unoptimizedTotalSize", unoptimizedTotalSize);
        data.add(total);	
   
        // 데이터 확인
        if(unoptimizedTotalSize == 0) {
        	resultCode = NO_DATA_CODE;
        }
        
        Map<String,Object> result = new HashMap<>();
        result.put("data", data);
        result.put("resultCode", resultCode);           
        return result;
	}
	
	
	/***
	 * 1. 함수명 : 
	 * 2. 작성일: 
	 * 3. 작성자: 안재림
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value = "/selectAvgCompRate_v2", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("")
	public Map<String,Object> selectAvgCompRate_v2(Model model, HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
        optimizerVO.setSite_list(site_list);
        int resultCode = SUCCESS_CODE;	
        
        // 데이터 불러오기
        HashMap<String, Object> data = optimizerService.selectAvgCompRate_v2(optimizerVO);
        
        Map<String,Object> result = new HashMap<>();
        result.put("data", data);
        result.put("resultCode", resultCode);   
        return result;
	}
	
	@RequestMapping(value = "/selectOptimizedAvgCompRate", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("")
	public Map<String,Object> selectOptimizedAvgCompRate(Model model, HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
        optimizerVO.setSite_list(site_list);
        int resultCode = SUCCESS_CODE;	
        
        // 데이터 불러오기
        HashMap<String, Object> data = optimizerService.selectOptimizedAvgCompRate(optimizerVO);
        
        Map<String,Object> result = new HashMap<>();
        result.put("data", data);
        result.put("resultCode", resultCode);   
        return result;
	}	
	
	/***
	 * 1. 함수명 : 
	 * 2. 작성일: 
	 * 3. 작성자: 김조은
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/	
	@RequestMapping(value = "/avgCallCount", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("")
	public Map<String,Object> avgCallCount(Model model, HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
        optimizerVO.setSite_list(site_list);
        int resultCode = SUCCESS_CODE;	
        
        // 데이터 불러오기
        List<HashMap<String, Object>> data = optimizerService.avgCallCount(optimizerVO);
        
		/*
		 * // 전체 사이즈 계산 long avgCallCountTotalSize = 0; // 리스트의 각 요소를 순회 for
		 * (HashMap<String, Object> map : data) { Object avgCallCountValue =
		 * map.get("avg_call_count_per_day"); if (avgCallCountValue != null) { long
		 * avgCallCount = Long.parseLong(avgCallCountValue.toString());
		 * avgCallCountTotalSize += avgCallCount; } else {
		 * System.out.println("No 'sum' value found in the map"); } } HashMap<String,
		 * Object> total = new HashMap<String, Object>();
		 * total.put("avg_call_count_per_day", avgCallCountTotalSize); data.add(total);
		 */
        
        Map<String,Object> result = new HashMap<>();
        result.put("data", data);
        result.put("resultCode", resultCode);   
        return result;
	}
	
	@RequestMapping(value = "/test02", method = RequestMethod.GET)
	public String test02(Model model) {
		return "test02";
	}		
	
	/** 안재림 2024.07.18 **/
	@RequestMapping(value = "/config", method = RequestMethod.GET)
	public String config(Model model, HttpServletRequest request, HttpServletResponse response) {
		model.addAttribute("now", configService.selectNow());
		return "config";
	}	
	
	/** 안재림 2024.07.18 **/
	@RequestMapping(value = "/selectConfigAll", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("웹 컨텐츠 기준 최적화 > 테뷸레이터")
	public Map<String, Object> selectConfigAll(HttpServletRequest request, HttpServletResponse response, @RequestParam("size") int size, @RequestParam("page") int page, ConfigVO configVO) throws Exception {

		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		configVO.setSite_list(site_list);

		Map<String, Object> result = new HashMap<>();
		configVO.setOffset((page - 1) * 15);
		configVO.setUse_cnt(true); // 리밋 스킵
		int cnt = configService.selectConfigAll(configVO).size();
		int last = 1;
		if (cnt % size == 0) last = 0;

		configVO.setUse_cnt(false); // 리밋
		List<ConfigVO> volist = configService.selectConfigAll(configVO);

		result.put("data", volist);
		result.put("list_cnt", cnt);
		result.put("last_page", (cnt / size + last));

		return result;
	}
	
	/** 안재림 **/
	@RequestMapping(value ="/selectConfigByKey", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectConfigByKey(HttpServletRequest request,  HttpServletResponse response, ConfigVO configVO) throws Exception{
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		configVO.setSite_list(site_list);
		
		ConfigVO vo = configService.selectConfigByKey(configVO);
		
		Map<String,Object> result = new HashMap<>();
		result.put("data", vo);
		
		return result;
	}	
	
	/** 안재림 **/
	@RequestMapping(value ="/updateConfig", method = RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> updateConfig(HttpServletRequest request,  HttpServletResponse response, ConfigVO configVO) throws Exception{
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		configVO.setSite_list(site_list);
		
		System.out.println(configVO);
		int vo = configService.updateConfig(configVO);
		
		Map<String,Object> result = new HashMap<>();
		result.put("data", vo);
		
		return result;
	}	
	
	/** 안재림 2024.07.23 **/
	@RequestMapping(value = "/iframe-ready", method = RequestMethod.GET)
	public String loading(Model model, HttpServletRequest request, HttpServletResponse response) {
		model.addAttribute("now", configService.selectNow());
		return "/optimizer/iframe-ready";
	}		
	
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String test(Model model) {
		return "test";
	}	
}
