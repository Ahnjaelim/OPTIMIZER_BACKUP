package com.wellconn.optimizerdemo.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.text.DecimalFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellconn.optimizerdemo.model.PageVO;
import com.wellconn.optimizerdemo.model.ResourceVO;
import com.wellconn.optimizerdemo.service.LightHouseService;
import com.wellconn.optimizerdemo.service.PageService;
import com.wellconn.optimizerdemo.service.ReportService;
import com.wellconn.optimizerdemo.service.ResourceService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@Api(tags = "최적화 컨트롤러", description = "")
public class MainController {
	
	// 상수 정의
	private static final int SUCCESS_CODE = 200;
	private static final int NO_DATA_CODE = 204;
	private static final int NOT_FOUND_CODE = 404;

	private final ResourceService resourceService;
	private final PageService pageService;
	private final LightHouseService lightHouseService;
	private final ReportService reportService;
	
	public static String executeBinBashCommand(String command) {
		try {
			String result="";
			System.out.println("executeBinBashCommand:"+command);
			String[] cmd = {"/bin/sh","-c", "/home/wellconn/Optimizer/OptimizerAgent/cmd.sh \""+command+"\""};
			Process p = Runtime.getRuntime().exec(cmd);
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
	        String line = null;
	        StringBuffer sb = new StringBuffer(); 
	       
	        
	        while ((line = reader.readLine()) != null) 
	        {
	            sb.append(line);
	            // sb.append("\n");
	        }
	        
	        result=sb.toString();
            return result;
            
        } catch (Exception e) {
            return "";
        }
	}
	
	public static String ExecLinux(String command) {
		String result = "";
		long tmp = System.currentTimeMillis();

		try {
			String[] cmd = { "/bin/sh", "-c", command };
			Process p = Runtime.getRuntime().exec(cmd);

		} catch (Exception e) {

		}
		return result;
	}	
	
	@RequestMapping(value = {"/", "index"}, method = RequestMethod.GET)
	public String report(Model model, HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		return "/index";
	}	

	/** 안재림 2024.08.16 
	 * @throws IOException **/
	@RequestMapping(value = "/requestLightHouse", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> requestLightHouse(HttpServletRequest request, PageVO pageVO) throws IOException {
		HttpSession session = request.getSession();
		
		String commandResult = "";
		String os = System.getProperty("os.name").toLowerCase();
		
		int page_no = pageVO.getPage_no();
		PageVO pageData = pageService.selectPageByPageNo(pageVO);
		String targetUrl  = pageData.getPage_url();
		String outputPath = "/home/wellconn/Optimizer/lighthouse";
		String fileName = "0816.json";
		
		// String command = String.format("lighthouse %s --output json --output-path %s/%s --chrome-flags='--headless --no-sandbox' && echo '1' ", targetUrl, outputPath, fileName);
		String command = String.format("lighthouse '%s' --output json --chrome-flags='--headless --no-sandbox' ", targetUrl, outputPath, fileName);
		System.out.println("command : "+command);
		
		if (!os.contains("win")) {
			// commandResult = executeCommand(command);
			commandResult = executeBinBashCommand(command);
		}
		System.out.println("commandResult : "+commandResult);
		
		
		String jsonData = commandResult; // 필요한 경우에만 저장
		ObjectMapper objectMapper = new ObjectMapper();
		int performancePercentage;

		try {
		    JsonNode rootNode = objectMapper.readTree(jsonData);

		    // 카테고리 노드가 있는지 확인
		    JsonNode categoriesNode = rootNode.path("categories");
		    if (!categoriesNode.isMissingNode() && !categoriesNode.isNull()) {

		        // 퍼포먼스 노드가 있는지 확인
		        JsonNode performanceNode = categoriesNode.path("performance");
		        if (!performanceNode.isMissingNode() && !performanceNode.isNull()) {

		            // 점수 노드가 있는지 확인
		            JsonNode scoreNode = performanceNode.path("score");
		            if (!scoreNode.isMissingNode() && !scoreNode.isNull()) {

		                // 점수를 double로 변환
		                double performanceScore = scoreNode.asDouble();
		                performancePercentage = (int) (performanceScore * 100);

		            } else {
		                performancePercentage = -1; // score 노드가 없거나 null일 경우
		                System.out.println("score 노드가 없거나 null일 경우");
		            }
		        } else {
		            performancePercentage = -1; // performance 노드가 없거나 null일 경우
		            System.out.println("performance 노드가 없거나 null일 경우");
		        }
		    } else {
		        performancePercentage = -1; // categories 노드가 없거나 null일 경우
		        System.out.println("categories 노드가 없거나 null일 경우");
		    }
		} catch (Exception e) {
		    performancePercentage = -1; // JSON 파싱 중 예외가 발생한 경우
		    System.out.println("JSON 파싱 중 예외가 발생한 경우");
		}
		
		if(performancePercentage == -1) { // 라이트 하우스 정상 종료 안된 경우
			String killCommand = "pkill -f chromium-browser";
			if (!os.contains("win")) {
				ExecLinux(killCommand);
			}		
		}
        
        PageVO param = new PageVO();
        param.setPage_no(page_no);
        if(pageVO.getPage_status() == 0) {
        	param.setOrg_score(performancePercentage);        	
        }else if(pageVO.getPage_status() == 1) {
        	param.setNew_score(performancePercentage);
        }
        int update = pageService.updatePageResult(param);
        
        Map<String, Object> result = new HashMap<>();
        result.put("page_no", page_no);
        result.put("data", performancePercentage);
		return result;
	}

	/** 안재림 2024.08.20 **/
	@RequestMapping(value ="/requestResourceCollection", method = RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> requestResourceCollection(HttpServletRequest request,  HttpServletResponse response, PageVO pageVO) throws Exception{
		HttpSession session = request.getSession();
		
		String os = System.getProperty("os.name").toLowerCase();
		String command = "/home/wellconn/Optimizer/OptimizerSimulationAgent/startup.sh " + pageVO.getPage_url();

		if (!os.contains("win")) {
			ExecLinux(command);
		}
				
		try {
            Thread.sleep(5000); // 1000밀리초 = 1초 동안 일시 중지
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
	
		Map<String,Object> result = new HashMap<>();
		result.put("data", pageService.selectPageByPageUrl(pageVO));
		return result;
	}	
	
	/** 안재림 2024.08.20 **/
	@RequestMapping(value ="/selectPageByPageUrl", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectPageByPageUrl(HttpServletRequest request,  HttpServletResponse response, PageVO pageVO) throws Exception{
		HttpSession session = request.getSession();
		
		Map<String,Object> result = new HashMap<>();
		result.put("data", pageService.selectPageByPageUrl(pageVO));
		return result;
	}	

	/** 안재림 2024.08.20 **/
	@RequestMapping(value ="/selectPageByPageNo", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectPageByPageNo(HttpServletRequest request,  HttpServletResponse response, PageVO pageVO) throws Exception{
		HttpSession session = request.getSession();
		Map<String,Object> result = new HashMap<>();
		result.put("data", pageService.selectPageByPageNo(pageVO));
		return result;
	}		
	
	/** 안재림 2024.08.20 **/
	@RequestMapping(value ="/selectResourceAllByPageNo", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectResourceAllByPageNo(HttpServletRequest request,  HttpServletResponse response, ResourceVO resourceVO) throws Exception{
		HttpSession session = request.getSession();
		Map<String,Object> result = new HashMap<>();
		result.put("data", resourceService.selectResourceAllByPageNo(resourceVO));
		return result;
	}		
	
	/** 안재림 2024.08.20 **/
	@RequestMapping(value ="/requestResourceOptimize", method = RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> requestResourceOptimize(HttpServletRequest request,  HttpServletResponse response, PageVO pageVO) throws Exception{
		HttpSession session = request.getSession();
		String os = System.getProperty("os.name").toLowerCase();
		String command = "/home/wellconn/Optimizer/OptimizerSimulationAgent/optimizer.sh " + pageVO.getPage_no();
		if (!os.contains("win")) {
			ExecLinux(command);
		}
		Map<String,Object> result = new HashMap<>();
		result.put("data", null);
		return result;
	}	
	
	@RequestMapping(value = "/viewHtml", method = RequestMethod.GET) 
	public String viewHtml(Model model, PageVO pageVO) {

		int page_no = pageVO.getPage_no();
		PageVO data = pageService.selectPageByPageNo(pageVO);
		String content = data.getHtml_code();
	    String content_replaced = null;
	    String content_type1 = null; 
	    String content_type2 = null; 
	   
	    if (content != null) {
	        ResourceVO param = new ResourceVO();
	        param.setPage_no(page_no);
	        List<ResourceVO> resourceList = resourceService.selectResourceAllByPageNo(param);
	        content_type1 = new String(content);
	        content_type2 = new String(content);
	        long unixTimeMillis = Instant.now().toEpochMilli();
	        String unixTimeMillisString = String.valueOf(unixTimeMillis);	
	        
	        for (ResourceVO resource : resourceList) {
	            String resourceOrg = resource.getResource_org();
	            String resourceNewType1 = resource.getResource_new_type1();
	            String resourceNewType2 = resource.getResource_new_type2();
	            if (!resourceOrg.equals(null) && !resourceNewType2.equals(null) &&  !resourceNewType2.equals("")) {
	                content = content.replaceAll(resourceOrg, "getResource?path="+resourceNewType2+"&name=&time="+unixTimeMillisString);
	                content_type2 = content_type2.replaceAll(resourceOrg, "getResource?path="+resourceNewType2+"&name=&time="+unixTimeMillisString);
	                System.out.println("type2 : "+"getResource?path="+resourceNewType2);
	            }else if (!resourceOrg.equals(null) && !resourceNewType1.equals(null) && !resourceNewType1.equals("")){
	            	System.out.println("type1 not null");
	            	content = content.replaceAll(resourceOrg, "getResource?path="+resourceNewType1+"&name=&time="+unixTimeMillisString);
	            	content_type2 = content_type2.replaceAll(resourceOrg, "getResource?path="+resourceNewType1+"&name=&time="+unixTimeMillisString);
	            	System.out.println("type1 : "+"getResource?path="+resourceNewType1);
	            }
	            // 최적화 전 html replace
	            if (!resourceOrg.equals(null) && !resourceNewType1.equals(null) && !resourceNewType1.equals("")) {
	            	content_type1 = content_type1.replaceAll(resourceOrg, "getResource?path="+resourceNewType1+"&name=&time="+unixTimeMillisString);
	            }
	        }
	        content_replaced = content; // content가 null이 아닐 때 content_replaced에 할당
	    }
		
		
		data.setHtml_code_after(content_replaced);
		
		
		if(pageVO.getContent_type()==2) {
			model.addAttribute("html", content_replaced); 
		}else {
			model.addAttribute("html", content); 			
		}
		
		return "/viewHtml"; 
	}	
	
	 /** 외부에서 리소스 받아오기 **/
    @CrossOrigin(origins = "*")  // 모든 도메인 허용
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

	/** 안재림 2024.08.21 **/
	@RequestMapping(value ="/selectResourceTypeCountByPage", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectResourceTypeCountByPage(HttpServletRequest request,  HttpServletResponse response, ResourceVO resourceVO) throws Exception{
		HttpSession session = request.getSession();


		List<HashMap<String, Object>> volist = resourceService.selectResourceTypeCountByPage(resourceVO);
		int total = 0;
		int sum_size1 = 0;
		int sum_size2 = 0;
		for (HashMap<String, Object> item : volist) {
		    Object resource_type_obj = item.get("resource_type");
		    Object size1_obj = item.get("size1");
		    Object size2_obj = item.get("size2");
		    Object count_obj = item.get("count");
		    int count = Integer.parseInt(count_obj.toString());
		    int size1 = Integer.parseInt(size1_obj.toString());
		    int size2 = Integer.parseInt(size2_obj.toString());
		    total += count;
		    sum_size1 +=  size1;
		    sum_size2 +=  size2;
		}
		HashMap<String,Object> totalItem = new HashMap<>();
		totalItem.put("resource_type", 0);
		totalItem.put("count", total);
		totalItem.put("size1", sum_size1);
		totalItem.put("size2", sum_size2);
		double percentage = ((double)(sum_size1 - sum_size2) / sum_size1) * 100;
		double formattedPercentage = Double.parseDouble(String.format("%.2f", percentage));
		totalItem.put("percentage", formattedPercentage);
		volist.add(totalItem);		
		
		Map<String,Object> result = new HashMap<>();
		result.put("data", volist);
		return result;
	}    

	/** 안재림 2024.08.21 **/
	@RequestMapping(value ="/updatePageCollStatus", method = RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> updatePageCollStatus(HttpServletRequest request,  HttpServletResponse response, PageVO pageVO) throws Exception{
		HttpSession session = request.getSession();
		Map<String,Object> result = new HashMap<>();
		result.put("data", pageService.updatePageCollStatus(pageVO));
		return result;
	}	
	
	/** 안재림 2024.08.21 **/
	@RequestMapping(value ="/updatePageOptStatus", method = RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> updatePageOptStatus(HttpServletRequest request,  HttpServletResponse response, PageVO pageVO) throws Exception{
		HttpSession session = request.getSession();
		Map<String,Object> result = new HashMap<>();
		result.put("data", pageService.updatePageOptStatus(pageVO));
		return result;
	}		
		
	/** 안재림 2024.08.21 **/
	@RequestMapping(value ="/selectResourceTimeAnalysisByPage", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectResourceTimeAnalysisByPage(HttpServletRequest request,  HttpServletResponse response, ResourceVO resourceVO) throws Exception{
		HttpSession session = request.getSession();
		Map<String,Object> result = new HashMap<>();
		result.put("data", resourceService.selectResourceTimeAnalysisByPage(resourceVO));
		return result;
	}	

    @GetMapping("/report-download")
    public void downloadExcel(HttpServletResponse response, PageVO pageVO) throws IOException {

    	System.out.println("pageVO : "+pageVO);
    	int page_no = pageVO.getPage_no();
    	PageVO pageData = pageService.selectPageByPageNo(pageVO);
    	
    	LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH:mm:ss");
        String formattedDate = now.format(formatter);
        
        // 결과 출력
        System.out.println(formattedDate);
        List<List<String>> data = new ArrayList<>();
        data.add(Arrays.asList("OPTIMIZER 벤치마크 테스트", "", "", "")); // 0
        data.add(Arrays.asList("일시", formattedDate, "", "")); // 1
        String introStr = "본 보고서는 웹사이트 성능 최적화를 위해 수행한 다양한 기술적 접근과 그 결과를 종합적으로 평가한\n"
        		+"문서입니다. 성능 개선을 위한 여러 최적화 알고리즘을 적용하고 그 효과를 측정하였습니다.";
        
        data.add(Arrays.asList("개요", introStr, "", "")); // 2
        data.add(Arrays.asList("", "", "", "")); // 3
        data.add(Arrays.asList("", "", "", "")); // 4
        data.add(Arrays.asList("대상 웹 사이트 주소", pageData.getPage_url(), "", "")); // 5
        data.add(Arrays.asList("구분", "최적화 전", "최적화 후", "비고")); // 6
        
        // 점수
        double score_diff = ((double) (pageData.getOrg_score() - pageData.getNew_score()) / pageData.getOrg_score()) * 100;
        BigDecimal bd = new BigDecimal(score_diff).setScale(2, RoundingMode.HALF_UP);
        double roundedScoreDiff = bd.doubleValue();
        String scoreResult;
        if (roundedScoreDiff < 0) {
        	scoreResult = String.format("%.2f%% 향상", Math.abs(roundedScoreDiff));
        } else {
        	scoreResult = String.format("%.2f%% 감소", roundedScoreDiff);
        }
        List<String> scoreArray1 = printScoreIcon(pageData.getOrg_score());
        List<String> scoreArray2 = printScoreIcon(pageData.getNew_score());
        data.add(Arrays.asList("성능 점수", scoreArray1.get(0)+" "+pageData.getOrg_score() + "점", scoreArray2.get(0)+" "+pageData.getNew_score() + "점", scoreResult)); // 7

        // 시간 계산
        double orgTimeInSeconds = pageData.getOrg_time() / 1000.0;
        double newTimeInSeconds = pageData.getNew_time() / 1000.0;

        // 차이 계산 및 퍼센트로 변환
        double diffTimePercentage = ((pageData.getOrg_time() - pageData.getNew_time()) / (double)pageData.getOrg_time()) * 100;

        // 소수점 포맷팅
        DecimalFormat df = new DecimalFormat("#.##");

        // 결과 문자열 생성
        String org_time = orgTimeInSeconds + "초";
        String new_time = newTimeInSeconds + "초";
        String diff_time = df.format(diffTimePercentage) + "% 단축";
        
        data.add(Arrays.asList("렌더링 시간", org_time, new_time, diff_time)); // 8
        
        // 용량 통계 구하기
        ResourceVO param = new ResourceVO();
        param.setPage_no(page_no);
        List<HashMap<String, Object>> sizeData = resourceService.selectResourceTypeCountByPage(param);
        int total = 0;
		int sum_size1 = 0;
		int sum_size2 = 0;
		for (HashMap<String, Object> item : sizeData) {
		    Object resource_type_obj = item.get("resource_type");
		    Object size1_obj = item.get("size1");
		    Object size2_obj = item.get("size2");
		    Object count_obj = item.get("count");
		    int count = Integer.parseInt(count_obj.toString());
		    int size1 = Integer.parseInt(size1_obj.toString());
		    int size2 = Integer.parseInt(size2_obj.toString());
		    total += count;
		    sum_size1 +=  size1;
		    sum_size2 +=  size2;
		}
		HashMap<String,Object> totalItem = new HashMap<>();
		totalItem.put("resource_type", 0);
		totalItem.put("count", total);
		totalItem.put("size1", sum_size1);
		totalItem.put("size2", sum_size2);
		double percentage = ((double)(sum_size1 - sum_size2) / sum_size1) * 100;
		double formattedPercentage = Double.parseDouble(String.format("%.2f", percentage));
		totalItem.put("percentage", formattedPercentage);
		sizeData.add(totalItem);		        
        
        for (int i = 0; i < 5; i++) {
        	final int resourceType = i;
        	
        	Optional<HashMap<String, Object>> targetItem = sizeData.stream()
                    .filter(item -> item.containsKey("resource_type") && item.get("resource_type") instanceof Integer)
                    .filter(item -> (Integer) item.get("resource_type") == resourceType)
                    .findFirst();
        	
            String title = "";
            switch (i) {
			case 0:
				title = "전체 최적화 결과";
				break;
			case 1:
				title = "이미지 최적화 결과";
				break;
			case 2:
				title = "동영상 최적화 결과";
				break;
			case 3:
				title = "텍스트 최적화 결과";
				break;
			case 4:
				title = "폰트 최적화 결과";
				break;
			default:
				break;
			}
            
            if (targetItem.isPresent()) {
                HashMap<String, Object> item = targetItem.get(); // Optional에서 HashMap을 꺼냄
                
                // HashMap에서 size1과 size2 값을 꺼냄
                String size1_str = item.get("size1").toString();
                String size2_str = item.get("size2").toString();
                
                // 문자열을 정수로 변환
                Integer size1 = Integer.parseInt(size1_str);
                Integer size2 = Integer.parseInt(size2_str);
                
                // 크기 차이를 계산 (소수점까지 계산)
                Double size_diff = (double) (size1 - size2) / size1 * 100; // 퍼센트로 변환
                
                // 파일 용량 포맷
                String size1Formatted = formatFileSize(size1);
                String size2Formatted = formatFileSize(size2);
                
                // 결과를 문자열로 변환
                data.add(Arrays.asList(title, size1Formatted, size2Formatted, String.format("%.2f%%", size_diff)+" 경량"));
            } else {
                System.out.println("타겟 아이템을 찾지 못했습니다.");
                data.add(Arrays.asList(title, "데이터 없음", "데이터 없음", "데이터 없음"));
            }
        }        

        data.add(Arrays.asList("총평", "", "", "")); // 14
        String scoreStatus = "변경";
        if(scoreArray1.get(0) == scoreArray2.get(0) || scoreArray1.get(0).equals(scoreArray2.get(0))) {
        	scoreStatus = "유지";
        }
        String resultStr = "해당 웹 사이트는 OPTIMIZER 통해 웹 콘텐츠를 "+formattedPercentage+"% 최적화하였고, 이에 따라 페이지 렌더링 시간이 "+diff_time+"되었습니다.\n"
        		+"또한 성능평가 점수는 "+ pageData.getOrg_score()+"점에서 "+pageData.getNew_score()+"점으로, "+scoreResult+"되었습니다.\n"
        		+"OPTIMIZER 사용 후 해당 웹사이트의 성능은 "+scoreArray1.get(0)+" "+scoreArray1.get(1)+"에서 "+scoreArray2.get(0)+" "+scoreArray2.get(1)+"로 "+scoreStatus+"되었습니다.\n"
        		+"(Google Speed Insight API 성능 지표 : ▲ 0~49 미흡 ■ 50~89 보통 ● 90~100 우수)\n"
        		+"\n"
        		+"<사용된 최적화 알고리즘>\n"
        		+"- 이미지 최적화 : 무손실 압축 알고리즘을 적용하여 컨텐츠의 품질을 유지하고 데이터 크기를 최소화하여 랜더링 시간을 단축합니다.\n"
        		+"- 동영상 최적화 : 비트레이트 최적화, 코덱최적화, 확장자최적화 기술을 모두 활용하여 최적화합니다.\n"
        		+"- 텍스트 최적화 : 주석제거, 공백제거  기술을 모두 활용하여 최적화합니다.\n"
        		+"- 폰트 최적화 : 폰트포맷변경, 서브셋폰트사용 기술을 모두 활용하여  최적화합니다.";
        data.add(Arrays.asList(resultStr, "", "", "")); // 15
        data.add(Arrays.asList("　", " ", " ", " ")); // 16
        data.add(Arrays.asList("　", " ", " ", " ")); // 17
        data.add(Arrays.asList("　", " ", " ", " ")); // 18
        data.add(Arrays.asList("　", " ", " ", " ")); // 19
        data.add(Arrays.asList("　", " ", " ", " ")); // 20
        data.add(Arrays.asList("　", " ", " ", " ")); // 21
        data.add(Arrays.asList("　", " ", " ", " ")); // 22
        data.add(Arrays.asList("　", " ", " ", " ")); // 23
        data.add(Arrays.asList("　", " ", " ", " ")); // 24
        data.add(Arrays.asList("　", " ", " ", " ")); // 25
        
        // 여백
        data.add(Arrays.asList("　", " ", " ", " ")); // 26
        
        // 리소스 리스트
        data.add(Arrays.asList("웹 콘텐츠 현황", "", "", "")); // 27
        data.add(Arrays.asList("웹 콘텐츠 이름", "최적화 전", "최적화 후", "비고")); // 28
		ArrayList<Integer> rowMergeList = new ArrayList<>();
        
        DecimalFormat rateDf = new DecimalFormat("#.0"); // 소수점 1자리까지 포맷
        List<ResourceVO> volist = resourceService.selectResourceAllByPageNo(param);
        List<ResourceVO> filteredList = volist.stream()
                .filter(item -> item.getResource_status() == 1)
                .collect(Collectors.toList());
        for(ResourceVO item : filteredList) {
        	Integer size1 = item.getResource_org_size();
        	Integer size2 = item.getResource_new_size_type2();
        	String size1_str = formatFileSize(size1);
        	String size2_str = formatFileSize(size2);
        	double diffSize = ((double) (size1 - size2) / size1) * 100;
        	String diffSizeFormatted = String.format("%.1f", diffSize);
        	data.add(Arrays.asList(item.getResource_name(), size1_str, size2_str, diffSizeFormatted+"% 경량"));
        }
        
        reportService.createExcel(response, data, rowMergeList);
    }
    
    // 파일 용량 포맷 메서드
    private static String formatFileSize(int sizeInBytes) {
        if (sizeInBytes < 1024) {
            return sizeInBytes + " B";
        } else if (sizeInBytes < 1024 * 1024) {
            return String.format("%.2f KB", sizeInBytes / 1024.0);
        } else if (sizeInBytes < 1024 * 1024 * 1024) {
            return String.format("%.2f MB", sizeInBytes / (1024.0 * 1024));
        } else {
            return String.format("%.2f GB", sizeInBytes / (1024.0 * 1024 * 1024));
        }
    }    
    
	/** 안재림 2024.08.23 **/
	@RequestMapping(value ="/updatePageResult", method = RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> updatePageResult(HttpServletRequest request,  HttpServletResponse response, PageVO pageVO) throws Exception{
		HttpSession session = request.getSession();
		Map<String,Object> result = new HashMap<>();
		int update = pageService.updatePageResult(pageVO);
		result.put("data", update);
		return result;
	}	   
	
	private static List<String> printScoreIcon(int score) {
		List<String> result = new ArrayList<>();
		if(score >= 90) {
			result.add("●");
			result.add("우수");
		}else if(score >= 50) {
			result.add("■");
			result.add("보통");
		}else {
			result.add("▲");
			result.add("미흡");
		}
		return result;
	}
	
	@RequestMapping(value = "/selectResourceAllByPageNoTabulator", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("웹 컨텐츠 기준 최적화 > 테뷸레이터")
	public Map<String, Object> selectResourceAllByPageNoTabulator(HttpServletRequest request, HttpServletResponse response, @RequestParam("size") int size, @RequestParam("page") int page, ResourceVO resourceVO) throws Exception {
		Map<String, Object> result = new HashMap<>();
		System.out.println("size : "+size);
		resourceVO.setOffset((page - 1) * size);
		resourceVO.setCnt_mode(1);
		int cnt =  resourceService.selectResourceAllByPageNoTabulator(resourceVO).size();
		int last = 1;
		if (cnt % size == 0)
			last = 0;		
		resourceVO.setCnt_mode(0);
		List<ResourceVO> volist = resourceService.selectResourceAllByPageNoTabulator(resourceVO);
		result.put("data", volist);
		result.put("list_cnt", cnt);
		result.put("last_page", (cnt / size + last));		
		return result;
	}
	
	/** 안재림 2024.08.26 **/
	@RequestMapping(value ="/insertPage", method = RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> insertPage(HttpServletRequest request,  HttpServletResponse response, PageVO pageVO) throws Exception{
		HttpSession session = request.getSession();
		Map<String,Object> result = new HashMap<>();
		int update = pageService.updateOldPage(pageVO);
		int insesrt = pageService.insertPage(pageVO);
		result.put("data", pageVO.getPage_no());
		return result;
	}	 	
	
	/** 안재림 2024.08.26 **/
	@RequestMapping(value ="/updateResourceStatusByPageNo", method = RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> updateResourceStatusByPageNo(HttpServletRequest request,  HttpServletResponse response, ResourceVO resourceVO) throws Exception{
		HttpSession session = request.getSession();
		Map<String,Object> result = new HashMap<>();
		int update = resourceService.updateResourceStatusByPageNo(resourceVO);
		result.put("data", update);
		return result;
	}
	
	/** 안재림 2024.08.26 **/
	@RequestMapping(value ="/updateResourceStatusByNid", method = RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> updateResourceStatusByNid(HttpServletRequest request,  HttpServletResponse response, ResourceVO resourceVO) throws Exception{
		HttpSession session = request.getSession();
		Map<String,Object> result = new HashMap<>();
		int update = resourceService.updateResourceStatusByNid(resourceVO);
		result.put("data", update);
		return result;
	}		
}


