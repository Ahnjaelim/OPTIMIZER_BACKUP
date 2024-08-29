package com.wellconn.optimizer.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellconn.optimizer.constant.ResultCode;
import com.wellconn.optimizer.model.AlertVO;
import com.wellconn.optimizer.model.LightHouseVO;
import com.wellconn.optimizer.model.OptimizerLogVO;
import com.wellconn.optimizer.model.OptimizerPageVO;
import com.wellconn.optimizer.model.OptimizerVO;
import com.wellconn.optimizer.model.UserVO;
import com.wellconn.optimizer.service.CloudService;
import com.wellconn.optimizer.service.LightHouseService;
import com.wellconn.optimizer.service.OptimizerLogService;
import com.wellconn.optimizer.service.OptimizerPageService;
import com.wellconn.optimizer.service.OptimizerService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@Api(tags = "최적화 컨트롤러", description = "")
public class OptimizerController {
	
	

	// 상수 정의
	private static final int SUCCESS_CODE = 200;
	private static final int NO_DATA_CODE = 204;
	private static final int NOT_FOUND_CODE = 404;

	private final OptimizerService optimizerService;
	private final OptimizerPageService optimizerPageService;
	private final OptimizerLogService optimizerLogService;
	private final CloudService cloudService;
	private final LightHouseService lightHouseService;

	// String str = syncPolicyURL.syncPolicyURL(AppProperties.getSyncUrl());

	/***
	 * 1. 함수명 : 2. 작성일: 3. 작성자: 안재림 4. 설명: 5. 수정일:
	 ***/
	@RequestMapping(value = "/optimizerByContent", method = RequestMethod.GET)
	@ApiOperation("웹 컨텐츠 기준 최적화 > 페이지 매핑")
	public String optimizerByContent(Model model, HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		OptimizerVO optimizerVO = new OptimizerVO();
		optimizerVO.setSite_list(site_list);
		List<OptimizerVO> volist = optimizerService.selectAll(optimizerVO);
		String jstreeData = optimizerService.convertToJSTreeFormat(volist);
		model.addAttribute("jsonData", jstreeData);

		// 리소스 갯수 카운트
		/*
		 * List<HashMap<String, Object>> countlist =
		 * optimizerService.countResourceGroupByResourceParentNo(optimizerVO);
		 * model.addAttribute("countlist", countlist); ObjectMapper objectMapper = new
		 * ObjectMapper(); try { String jsonCount =
		 * objectMapper.writeValueAsString(countlist); model.addAttribute("jsonCount",
		 * jsonCount); } catch (JsonProcessingException e) { e.printStackTrace(); }
		 */

		List<HashMap<String, Object>> folderlist = optimizerService.selectResourceFolderAll(optimizerVO);
		for (HashMap<String, Object> folder : folderlist) {

		}
		model.addAttribute("folderlist", folderlist);

		return "/optimizer/optimizerByContent";
	}

	/***
	 * 1. 함수명 : countResourceFolder 2. 작성일: 2024-02-20 3. 작성자: 안재림 4. 설명: 5. 수정일:
	 ***/
	@RequestMapping(value = "/countResourceFolder", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("웹 컨텐츠 기준 최적화 > 페이지 매핑")
	public Map<String, Object> countResourceFolder(Model model, HttpServletRequest request,
			HttpServletResponse response, OptimizerVO optimizerVO) {
		System.out.println(optimizerVO);
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);

		// 리소스 갯수 카운트
		List<HashMap<String, Object>> countlist = optimizerService.countResourceGroupByResourceParentNo(optimizerVO);
		if (optimizerVO != null && optimizerVO.getWith_log() != null && optimizerVO.getWith_log() == 1) {
			countlist = optimizerService.countResourceGroupByResourceParentNoWithLatestLog(optimizerVO);
		}
		
		List<HashMap<String, Object>> folderlist = optimizerService.selectResourceFolderAll(optimizerVO);
		for (HashMap<String, Object> folder : folderlist) {
			for (HashMap<String, Object> count : countlist) {
				if (folder.get("resource_no").equals(count.get("resource_parent_no"))) {

					int countValue = objectIntConvert(count.get("count")); // 조건 O
					int entireValue = objectIntConvert(count.get("entire_count")); // 조건 X

					folder.put("count", count.get("count"));
					folder.put("total_count", count.get("count"));
					folder.put("entire_count", count.get("entire_count"));

					Integer resource_parent_no = ((Number) folder.get("resource_parent_no")).intValue();
					
					/*
					while (resource_parent_no > 0) {
						HashMap<String, Object> parentFolder = findFolderByResourceNo(folderlist, resource_parent_no);
						if (parentFolder != null) {
							int parentCountValue = objectIntConvert(parentFolder.get("total_count"));
							int parentEntireValue = objectIntConvert(parentFolder.get("entire_count"));
							parentFolder.put("total_count", (Integer) (countValue + parentCountValue));
							parentFolder.put("entire_count", (Integer) (entireValue + parentEntireValue));
							resource_parent_no = (Integer) parentFolder.get("resource_parent_no");
						} else {
							// 부모 요소를 찾을 수 없는 경우 루프를 종료
							break;
						}
					}*/

				}
			}
			for (Map.Entry<String, Object> entry : folder.entrySet()) {
				String key = entry.getKey();
				Object value = entry.getValue();
			}
		}

		Map<String, Object> result = new HashMap<>();
		result.put("data", folderlist);
		return result;
	}

	// 부모 번호 찾기
	private static HashMap<String, Object> findFolderByResourceNo(List<HashMap<String, Object>> folderlist,
			Integer resource_no) {
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
	 * 1. 함수명 : selectResourceListByParentId 
	 * 2. 작성일: 
	 * 3. 작성자: 안재림 
	 * 4. 설명: 타뷸레이터
	 * 5. 수정일:
	 ***/
	@RequestMapping(value = "/selectResourceListByParentId", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("웹 컨텐츠 기준 최적화 > 테뷸레이터")
	public Map<String, Object> selectResourceListByParentId(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("size") int size, @RequestParam("page") int page, OptimizerVO optimizerVO) throws Exception {
		System.out.println("===== selectResourceListByParentId =====");
		System.out.println(optimizerVO);
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);

		// System.out.println("===== search =====");
		// System.out.println("search_range : "+optimizerVO.getSearch_range());
		// System.out.println("search_keyword : "+optimizerVO.getSearch_keyword());
		System.out.println("search_page : " + optimizerVO.getSearch_page());
		System.out.println(optimizerVO.getResource_status_array());
		optimizerVO.getResource_type_array().add(0); // 폴더는 무조건 포함

		Map<String, Object> result = new HashMap<>();
		optimizerVO.setOffset((page - 1) * 15);
		optimizerVO.setCnt_mode(1);
		System.out.println("size : " + optimizerVO.getSize());
		System.out.println("offset : " + optimizerVO.getOffset());
		int cnt = optimizerService.selectResourceListByParentId(optimizerVO).size();
		int last = 1;
		if (cnt % size == 0)
			last = 0;

		optimizerVO.setCnt_mode(0);
		List<OptimizerVO> volist = optimizerService.selectResourceListByParentId(optimizerVO);

		// 해당 vo가 폴더라면 용량 등을 재귀로 계산
		/*
		 * for (OptimizerVO vo : volist) { if (vo.getResource_type() == 0) { // 폴더인 경우
		 * 모든 하위 항목을 불러옴 int resource_new_size_type1 = 0; int resource_new_size_type2 =
		 * 0; int call_cnt = 0; List<OptimizerVO> children =
		 * optimizerService.selectRecursiveResourceByResourceNo(vo); for (OptimizerVO
		 * child : children) { if (child.getResource_type() > 0) { //
		 * System.out.println("resource_no : "+child.getResource_no()+" | "+child.
		 * getResource_new_size_type1()+" | "+child.getResource_new_size_type2());
		 * resource_new_size_type1 = resource_new_size_type1 +
		 * child.getResource_new_size_type1(); resource_new_size_type2 =
		 * resource_new_size_type2 + child.getResource_new_size_type2(); call_cnt =
		 * call_cnt + child.getCall_cnt(); } }
		 * vo.setResource_new_size_type1(resource_new_size_type1);
		 * vo.setResource_new_size_type2(resource_new_size_type2);
		 * vo.setCall_cnt(call_cnt); //
		 * System.out.println("resource_new_size_type1 : "+resource_new_size_type1); //
		 * System.out.println("resource_new_size_type2 : "+resource_new_size_type2); } }
		 */

		result.put("data", volist);
		result.put("list_cnt", cnt);
		result.put("last_page", (cnt / size + last));

		return result;
	}

	/***
	 * 1. 함수명 : selectResourceAllWithLatestLogByParentId 2. 작성일: 3. 작성자: 안재림 4. 설명:
	 * 5. 수정일:
	 ***/
	@RequestMapping(value = "/selectResourceAllWithLatestLogByParentId", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("웹 컨텐츠 기준 최적화 > 테뷸레이터")
	public Map<String, Object> selectResourceAllWithLatestLogByParentId(HttpServletRequest request,
			HttpServletResponse response, @RequestParam("size") int size, @RequestParam("page") int page,
			OptimizerVO optimizerVO) throws Exception {
		System.out.println(optimizerVO);
		System.out.println("EndDate_ts : " + optimizerVO.getEndDate_ts());
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);

		System.out.println("search_page : " + optimizerVO.getSearch_page());
		System.out.println(optimizerVO.getResource_status_array());
		optimizerVO.getResource_type_array().add(0); // 폴더는 무조건 포함

		Map<String, Object> result = new HashMap<>();
		optimizerVO.setOffset((page - 1) * 15);
		optimizerVO.setCnt_mode(1);
		System.out.println("size : " + optimizerVO.getSize());
		System.out.println("offset : " + optimizerVO.getOffset());
		int cnt = optimizerService.selectResourceAllWithLatestLogByParentId(optimizerVO).size();
		int last = 1;
		if (cnt % size == 0)
			last = 0;

		optimizerVO.setCnt_mode(0);
		List<OptimizerVO> volist = optimizerService.selectResourceAllWithLatestLogByParentId(optimizerVO);

		result.put("data", volist);
		result.put("list_cnt", cnt);
		result.put("last_page", (cnt / size + last));

		return result;
	}

	
	
	@RequestMapping(value = "/selectPageResource", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("웹 페이지별 최적화 > 테뷸레이터")
	public Map<String, Object> selectResourceByPage(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("size") int size, @RequestParam("page") int page, OptimizerVO optimizerVO) throws Exception {
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);

		
		Map<String, Object> result = new HashMap<>();
		optimizerVO.setOffset((page - 1) * 10);
		optimizerVO.setCnt_mode(1);
		int cnt = optimizerService.selectPageResource(optimizerVO).size();
		int last = 1;
		if (cnt % size == 0)
			last = 0;

		optimizerVO.setCnt_mode(0);
		List<OptimizerVO> volist = optimizerService.selectPageResource(optimizerVO);

		result.put("data", volist);
		result.put("list_cnt", cnt);
		result.put("last_page", (cnt / size + last));

		return result;
	}

	@RequestMapping(value = "/getPageRendering", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("웹 페이지별 최적화 > 렌더링속도")
	public Map<String, Object> getPageRendering(HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO) throws Exception {
		
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);

		Map<String, Object> result = new HashMap<>();
		

		List<OptimizerVO> all = optimizerService.getPageRendering(optimizerVO);
		optimizerVO.setResource_type(1);
		List<OptimizerVO> image = optimizerService.getPageRendering(optimizerVO);
		optimizerVO.setResource_type(2);
		List<OptimizerVO> video = optimizerService.getPageRendering(optimizerVO);
		optimizerVO.setResource_type(3);
		List<OptimizerVO> text = optimizerService.getPageRendering(optimizerVO);
		optimizerVO.setResource_type(4);
		List<OptimizerVO> font = optimizerService.getPageRendering(optimizerVO);

		result.put("all", all);
		result.put("image", image);
		result.put("video",video);
		result.put("text",text);
		result.put("font",font);

		return result;
	}
	
	
	
	/***
	 * 1. 함수명 : 2. 작성일: 3. 작성자: 안재림 4. 설명: 5. 수정일:
	 ***/
	@RequestMapping(value = "/optimizerByPage", method = RequestMethod.GET)
	@ApiOperation("웹 페이지 기준 최적화 > 페이지 매핑")
	public String optimizerByPage(Model model, HttpServletRequest request, HttpServletResponse response) {
		OptimizerPageVO optimizerPageVO = new OptimizerPageVO();
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerPageVO.setSite_list(site_list);
		List<OptimizerPageVO> volist = optimizerPageService.selectAll(optimizerPageVO);
		String jstreeData = optimizerPageService.convertToJSTreeFormat(volist);
		model.addAttribute("jsonData", jstreeData);

		// 자식 요소 불러오기
		List<OptimizerPageVO> newlist = new ArrayList<OptimizerPageVO>();
		for (OptimizerPageVO vo : volist) {
			newlist.add(vo);
			List<OptimizerPageVO> children = optimizerPageService.selectRecursivePageAllByPageNo(vo);
			for (OptimizerPageVO child : children) {
				newlist.add(child);
			}
		}

		// 카운트
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		for (OptimizerPageVO vo : newlist) {
			Map<String, Object> map = new HashMap<>();
			OptimizerVO paramVO = new OptimizerVO();
			paramVO.setPage_no(vo.getPage_no());
			// String html = vo.getContent();
			String html = optimizerPageService.selectByPageNo(vo).getContent(); // 컨텐츠 불러오는 매소드가 여기에만 있음
			int count = 0;
			if (html != null) {
				List<OptimizerVO> resource_list = optimizerService.selectResourceAllByPageNo(paramVO);
				for (OptimizerVO resource : resource_list) {
					if (resource != null && html.contains(resource.getResource_org())) {
						count++;
					} else {
					}
				}
				map.put("page_no", vo.getPage_no());
				map.put("count", count);
				result.add(map);
			}
		}

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			String jsonCount = objectMapper.writeValueAsString(result);
			model.addAttribute("jsonCount", jsonCount);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return "/optimizer/optimizerByPage";
	}

	/***
	 * 1. 함수명 : selectByPageNo 2. 작성일: 2023-12-00 3. 작성자: 안재림 4. 설명: 페이지 번호로 페이지 데이터
	 * 받아오기 5. 수정일:
	 ***/
	@RequestMapping(value = "/selectByPageNo", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("웹 페이지 기준 최적화 > page_no로 페이지 조회")
	public Map<String, Object> selectByPageNo(HttpServletRequest request, OptimizerPageVO optimizerPageVO) {
		Map<String, Object> result = new HashMap<>();
		result.put("data", optimizerPageService.selectByPageNo(optimizerPageVO));
		return result;
	}

	/***
	 * 1. 함수명 : selectResourceAllByPageNo 2. 작성일: 2023-12-27 3. 작성자: 안재림 4. 설명: 페이지
	 * 번호로 해당 페이지의 리소스 받아오기 5. 수정일:
	 ***/
	@RequestMapping(value = "/selectResourceAllByPageNo")
	@ResponseBody
	public Map<String, Object> selectResourceAllByPageNo(HttpServletRequest request, OptimizerPageVO optimizerPageVO) {
		Map<String, Object> result = new HashMap<>();
		OptimizerVO param = new OptimizerVO();
		param.setPage_no(optimizerPageVO.getPage_no());
		result.put("data", optimizerService.selectResourceAllByPageNo(param));
		return result;
	}

	@RequestMapping(value = "/selectResourceByResourceNo")
	@ResponseBody
	public Map<String, Object> selectResourceByResourceNo(HttpServletRequest request, OptimizerVO optimizerVO) {
		Map<String, Object> result = new HashMap<>();
		result.put("data", optimizerService.selectResourceByResourceNo(optimizerVO));
		return result;
	}

	@RequestMapping(value = "/selectResourceByResourceOrg")
	@ResponseBody
	public Map<String, Object> selectResourceByResourceOrg(HttpServletRequest request, OptimizerVO optimizerVO) {
		Map<String, Object> result = new HashMap<>();
		result.put("data", optimizerService.selectResourceByResourceOrg(optimizerVO));
		return result;
	}

	@RequestMapping(value = "/selectResourceLogAllByResourceNo")
	@ResponseBody
	public Map<String, Object> selectResourceLogAllByResourceNo(HttpServletRequest request,
			OptimizerLogVO optimizerLogVO) {
		Map<String, Object> result = new HashMap<>();
		result.put("data", optimizerLogService.selectResourceLogAllByResourceNo(optimizerLogVO));
		return result;
	}

	@RequestMapping(value = "/selectPageAllByResourceNo")
	@ResponseBody
	public Map<String, Object> selectPageAllByResourceNo(HttpServletRequest request, OptimizerPageVO optimizerPageVO) {
		Map<String, Object> result = new HashMap<>();
		List<OptimizerPageVO> volist = optimizerPageService.selectPageAllByResourceNo(optimizerPageVO);

		// String jstreeData = optimizerPageService.convertToJSTreeFormat(volist);
		String jstreeData = optimizerPageService.selectPageAllByResourceNoAdvanced(optimizerPageVO);

		result.put("data", volist);
		result.put("jstreeData", jstreeData);
		return result;
	}

	/***
	 * 1. 함수명 : optimizeSelectedItem 2. 작성일: 2023-12-00 3. 작성자: 안재림 4. 설명: 5. 수정일:
	 ***/
	@RequestMapping(value = "/optimizeSelectedItem", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public Map<String, Object> optimizeSelectedItem(HttpServletRequest request,
			@RequestBody List<OptimizerVO> selectedData) {
		Map<String, Object> result = new HashMap<>();
		List<OptimizerVO> newSelectedData = selectedItemRecursive(selectedData);
		// System.out.println("==== 선택된 데이터 반환 =====");
		// newSelectedData.forEach(vo -> System.out.println(vo));
		result.put("data", newSelectedData);
		return result;
	}

	/***
	 * 1. 함수명 : optimizeSelectedItem 2. 작성일: 2023-12-00 3. 작성자: 안재림 4. 설명: 5. 수정일:
	 ***/
	@RequestMapping(value = "/excuteOptimizeSelectedItem", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public Map<String, Object> excuteOptimizeSelectedItem(HttpServletRequest request,
			@RequestBody List<OptimizerVO> selectedData) {
		Map<String, Object> result = new HashMap<>();
		List<OptimizerVO> newSelectedData = selectedItemRecursive(selectedData);
		// 최적화 실행 (resource_status update 0)
		for (OptimizerVO vo : newSelectedData) {
			vo.setResource_status(0);
			System.out.println("업데이트 0 : " + vo.getResource_no());
			int updateResult = optimizerService.updateResourceStatusByResourceNo(vo);
		}

		result.put("data", newSelectedData);
		return result;
	}

	/***
	 * 1. 함수명 : excuteOptimizeDisableSelectedItem 2. 작성일: 2023-12-28 3. 작성자: 안재림 4.
	 * 설명: 선택 파일 확인 5. 수정일:
	 ***/
	@RequestMapping(value = "/excuteOptimizeDisableSelectedItem", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public Map<String, Object> excuteOptimizeDisableSelectedItem(HttpServletRequest request,
			@RequestBody List<OptimizerVO> selectedData) {
		Map<String, Object> result = new HashMap<>();
		List<OptimizerVO> newSelectedData = selectedItemRecursive(selectedData);

		// 최적화 실행 (resource_status update 0)
		for (OptimizerVO vo : newSelectedData) {
			vo.setResource_status(2);
			System.out.println("업데이트 2 : " + vo.getResource_no());
			int updateResult = optimizerService.updateResourceStatusByResourceNo(vo);
		}

		result.put("data", newSelectedData);
		return result;
	}

	private List<OptimizerVO> selectedItemRecursive(List<OptimizerVO> selectedData) {
		List<OptimizerVO> result = new ArrayList<>(); // 중복 제거된 새 리스트 생성
		Set<Integer> resourceNoSet = new HashSet<>(); // HashSet을 이용하여 중복 체크
		for (OptimizerVO vo : selectedData) {
			if (resourceNoSet.add(vo.getResource_no()) && vo.getResource_type() > 0) {
				result.add(vo);
			}
			if (vo.getResource_type() == 0) { // 폴더인 경우 모든 하위 항목을 불러옴
				List<OptimizerVO> children = optimizerService.selectRecursiveResourceByResourceNo(vo);
				for (OptimizerVO child : children) {
					if (resourceNoSet.add(child.getResource_no()) && child.getResource_type() > 0) { // HashSet에 추가하면서
																										// 중복 체크, 폴더가 아닌
																										// 경우에만 리스트에 추가
						result.add(child); // 중복이 아닌 경우에만 리스트에 추가
					}
				}
			}
		}
		return result;
	}

	/***
	 * 1. 함수명 : optimizeSelectedItem 2. 작성일: 2023-12-00 3. 작성자: 안재림 4. 설명: 5. 수정일:
	 ***/
	@RequestMapping(value = "/excuteOptimizeAll", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> excuteOptimizeAll(HttpServletRequest request, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");

		System.out.println("optimizerVOgetUse_unstrfile : "+optimizerVO.getUse_unstrfile());
		optimizerVO.setSite_list(site_list);
		optimizerVO.setResource_status(0);

		int updateResult = optimizerService.updateResourceStatusAllByCloudNo(optimizerVO);

		Map<String, Object> result = new HashMap<>();
		result.put("data", updateResult);
		return result;
	}

	/*
	1. 함수명 : viewLogFile 2. 작성일: 2023-12-27 3. 작성자: 안재림 4. 설명: 로그파일 뷰어 5. 수정일:
	*/
	
	@RequestMapping(value = "/viewLogFile2", method = RequestMethod.GET) public String viewLogFile2(Model model, OptimizerPageVO optimizerPageVO) {
		OptimizerPageVO vo = optimizerPageService.selectByPageNo(optimizerPageVO);
		
		if(optimizerPageVO.getContent_type()==2) {
			model.addAttribute("html", vo.getContent_replaced()); 
		}else {
			model.addAttribute("html", vo.getContent_type1()); 			
		}
		
		return "/optimizer/viewLogFile"; 
	}
		

	@RequestMapping(value = "/selectResourceAllByCloudNo")
	@ResponseBody
	public Map<String, Object> selectResourceAllByCloudNo(HttpServletRequest request, OptimizerVO optimizerVO) {
		Map<String, Object> result = new HashMap<>();
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		result.put("data", optimizerService.selectResourceAllByCloudNo(optimizerVO));
		return result;
	}

	@RequestMapping(value = "/selectResourceAllByResourceStatus")
	@ResponseBody
	public Map<String, Object> selectResourceAllByResourceStatus(HttpServletRequest request, OptimizerVO optimizerVO) {
		Map<String, Object> result = new HashMap<>();
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		result.put("data", optimizerService.selectResourceAllByResourceStatus(optimizerVO));
		return result;
	}

	/** 안재림 **/ 
	@RequestMapping(value = "/tabulatorUpdateInterval", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public Map<String, Object> tabulatorUpdateInterval(HttpServletRequest request, @RequestBody List<OptimizerVO> currentData) {
		Map<String, Object> result = new HashMap<>();
		List<OptimizerVO> volist = new ArrayList<>();
		for (OptimizerVO vo : currentData) {
			if (vo.getResource_type() > 0) {
				volist.add(optimizerService.selectResourceByResourceNo(vo)); // 중요한 컨트롤러인데 대체 왜 바꾼거임?
			}
		}
		result.put("data", volist);
		return result;
	}
	
	@RequestMapping(value = "/intervalTest", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public Map<String, Object> intervalTest(HttpServletRequest request, @RequestBody List<OptimizerVO> currentData) {
		Map<String, Object> result = new HashMap<>();
		return result;
	}

	@RequestMapping(value = "/selectResourceAllByResourceType")
	@ResponseBody
	public Map<String, Object> selectResourceAllByResourceType(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("size") int size, @RequestParam("page") int page, OptimizerVO optimizerVO) {
		Map<String, Object> result = new HashMap<>();

		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);

		optimizerVO.setOffset((page - 1) * 10);
		optimizerVO.setCnt_mode(1);
		int cnt = optimizerService.selectResourceAllByResourceType(optimizerVO).size();
		int last = 1;
		if (cnt % size == 0)
			last = 0;

		optimizerVO.setCnt_mode(0);
		List<OptimizerVO> volist = optimizerService.selectResourceAllByResourceType(optimizerVO);

		result.put("data", volist);
		result.put("list_cnt", cnt);
		result.put("last_page", (cnt / size + last));

		return result;
	}

	@RequestMapping(value = "/countResourceAllByResourceType")
	@ResponseBody
	public Map<String, Object> countResourceAllByResourceType(HttpServletRequest request, OptimizerVO optimizerVO) {
		Map<String, Object> result = new HashMap<>();
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		result.put("data", optimizerService.countResourceAllByResourceType(optimizerVO));
		return result;
	}

	@RequestMapping(value = "/countResourceByRgstrDate")
	@ResponseBody
	public Map<String, Object> countResourceByRgstrDate(HttpServletRequest request, OptimizerVO optimizerVO) {
		Map<String, Object> result = new HashMap<>();
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		result.put("data", optimizerService.countResourceByRgstrDate(optimizerVO));
		return result;
	}

	@RequestMapping(value = "/countResourceLogAllByResourceNo")
	@ResponseBody
	public Map<String, Object> countResourceLogAllByResourceNo(HttpServletRequest request,
			OptimizerLogVO optimizerLogVO) {
		Map<String, Object> result = new HashMap<>();
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		List<HashMap<String, Object>> volist = optimizerLogService.countResourceLogAllByResourceNo(optimizerLogVO);
		for (int i = 0; i < volist.size(); i++) {
			if (!volist.get(i).containsKey("size2") || volist.get(i).get("size2") == null) {
				// "size2" 키가 없거나 값이 null인 경우
				int size2 = (int) volist.get(i - 1).get("size2");
				volist.get(i).put("size2", size2);
			} else {
				// "size2" 키가 존재하고 값이 null이 아닌 경우
			}
		}
		result.put("data", volist);
		return result;
	}

	@RequestMapping(value = "/optimizeAllAtIndex")
	@ResponseBody
	public Map<String, Object> optimizeAllAtIndex(HttpServletRequest request, OptimizerVO optimizerVO) {
		System.out.println(optimizerVO);
		Map<String, Object> result = new HashMap<>();
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);

		optimizerVO.setCnt_mode(1);
		List<OptimizerVO> volist = optimizerService.selectResourceAllByResourceTypeSimple(optimizerVO);
		for (OptimizerVO vo : volist) {
			vo.setResource_status(0);
			System.out.println("업데이트 0 : " + vo.getResource_no());
			if (vo.getResource_org_size() > 0) {
				optimizerService.updateResourceStatusByResourceNo(vo);
			}
		}
		return result;
	}

	/***
	 * 1. 함수명 : 2. 작성일: 3. 작성자: 안재림 4. 설명: 5. 수정일:
	 ***/
	@ApiOperation(value = "Get item by ID", notes = "Gets an item by its ID")
	@RequestMapping(value = "/optimizeSelectedItemAtIndex", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public Map<String, Object> optimizeSelectedItemAtIndex(HttpServletRequest request,
			@RequestBody List<OptimizerVO> selectedData) {
		Map<String, Object> result = new HashMap<>();
		// 최적화 실행 (resource_status update 0)
		for (OptimizerVO vo : selectedData) {
			vo.setResource_status(0);
			System.out.println("업데이트 0 : " + vo.getResource_no());
			if (vo.getResource_org_size() > 0) {
				optimizerService.updateResourceStatusByResourceNo(vo);
			}
		}
		result.put("data", 1);
		return result;
	}

	/***
	 * 1. 함수명 : 2. 작성일: 3. 작성자: 안재림 4. 설명: 5. 수정일:
	 ***/
	@RequestMapping(value = "/cancelSelectedItemAtIndex", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public Map<String, Object> cancelSelectedItemAtIndex(HttpServletRequest request,
			@RequestBody List<OptimizerVO> selectedData) {
		Map<String, Object> result = new HashMap<>();
		for (OptimizerVO vo : selectedData) {
			vo.setResource_status(2);
			System.out.println("업데이트 0 : " + vo.getResource_no());
			if (vo.getResource_org_size() > 0) {
				optimizerService.updateResourceStatusByResourceNo(vo);
			}
		}
		return result;
	}

	/***
	 * 1. 함수명 : 2. 작성일: 2024-02-20 3. 작성자: 안재림 4. 설명: 5. 수정일:
	 ***/
	@RequestMapping(value = "/selectDashbordData", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("웹 컨텐츠 기준 최적화 > 페이지 매핑")
	public Map<String, Object> selectDashbordData(Model model, HttpServletRequest request, HttpServletResponse response,
			OptimizerVO optimizerVO) {
		System.out.println(optimizerVO);
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);

		// 전체 최적화 전후 리소스 용량 합계 가져오기
		HashMap<String, Object> resourceSizeSum = optimizerService.selectResourceSizeSum(optimizerVO);

		Map<String, Object> result = new HashMap<>();
		result.put("resourceSizeSum", resourceSizeSum);
		return result;
	}

	@RequestMapping(value = "/selectPageByPageNo")
	@ResponseBody
	public Map<String, Object> selectPageByPageNo(HttpServletRequest request, OptimizerPageVO optimizerPageVO) {
		Map<String, Object> result = new HashMap<>();
		OptimizerPageVO vo = optimizerPageService.selectByPageNo(optimizerPageVO);
		result.put("data", vo);
		return result;
	}

	@RequestMapping(value = "/selectPageByPageName")
	@ResponseBody
	public Map<String, Object> selectPageByPageName(HttpServletRequest request, OptimizerPageVO optimizerPageVO) {
		Map<String, Object> result = new HashMap<>();
		OptimizerPageVO vo = optimizerPageService.selectPageByPageName(optimizerPageVO);
		result.put("data", vo);
		return result;
	}

	/***
	 * 1. 함수명 : updateResourceStatusByResourceNo 2. 작성일: 3. 작성자: 안재림 4. 설명: 5. 수정일:
	 ***/
	@RequestMapping(value = "/updateResourceStatusByResourceNo")
	@ResponseBody
	public Map<String, Object> updateResourceStatusByResourceNo(HttpServletRequest request, OptimizerVO optimizerVO) {
		Map<String, Object> result = new HashMap<>();
		int resultInt = optimizerService.updateResourceStatusByResourceNo(optimizerVO);
		result.put("data", resultInt);
		return result;
	}

	/***
	 * 1. 함수명 : viewLogFile 2. 작성일: 2024-05-10 3. 작성자: 김조은 4. 설명: 로그파일 뷰어 5. 수정일:
	 ***/
	@RequestMapping(value = "/contentView", method = RequestMethod.GET)
	public String viewLogFile(Model model, OptimizerPageVO optimizerPageVO) {
		// OptimizerPageVO vo = optimizerPageService.selectByPageNo(optimizerPageVO);
		// model.addAttribute("html", vo.getContent_replaced());
		return "/optimizer/contentView";
	}

	/***
	 * 1. 함수명 : updateResourceStatusByResourceNo 2. 작성일: 3. 작성자: 안재림 4. 설명: 5. 수정일:
	 ***/
	@RequestMapping(value = "/selectResourceAllOptimizing", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> selectResourceAllOptimizing(HttpServletRequest request, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);

		System.out.println(optimizerVO);
		List<OptimizerVO> data = optimizerService.selectResourceAllOptimizing(optimizerVO);

		Map<String, Object> result = new HashMap<>();
		result.put("data", data);
		return result;
	}

	/***
	 * 1. 함수명 : cancelOptimizingResourceAll 2. 작성일: 3. 작성자: 안재림 4. 설명: 5. 수정일:
	 ***/
	@RequestMapping(value = "/cancelOptimizingResourceAll", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> cancelOptimizingResourceAll(HttpServletRequest request, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);

		int data = optimizerService.cancelOptimizingResourceAll(optimizerVO);

		Map<String, Object> result = new HashMap<>();
		result.put("data", data);
		return result;
	}

	@RequestMapping(value = "/updateLazyloadButton", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateLazyloadButton(HttpServletRequest request, OptimizerPageVO optimizerPageVO) {

		int data = optimizerPageService.updateLazyloadButton(optimizerPageVO);

		Map<String, Object> result = new HashMap<>();
		result.put("data", data);
		return result;
	}

	@RequestMapping(value = "/updateLazyloadStatus", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> updateLazyloadStatus(HttpServletRequest request, OptimizerPageVO optimizerPageVO) {
		Map<String, Object> result = new HashMap<>();

		List<OptimizerPageVO> data = optimizerPageService.updateLazyloadStatus(optimizerPageVO);

		result.put("data", data);
		return result;
	}

	@RequestMapping(value = "/updateLazyloadButtonAll", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateLazyloadButtonAll(HttpServletRequest request, OptimizerPageVO optimizerPageVO) {

		int data = optimizerPageService.updateLazyloadButtonAll(optimizerPageVO);

		Map<String, Object> result = new HashMap<>();
		result.put("data", data);
		return result;
	}

	@RequestMapping(value = "/selectFolderAll", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> selectFolderAll(HttpServletRequest request, OptimizerPageVO optimizerPageVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		OptimizerVO optimizerVO = new OptimizerVO();
		optimizerVO.setSite_list(site_list);

		List<OptimizerVO> volist = optimizerService.selectAll(optimizerVO);
		String jstreeData = optimizerService.convertToJSTreeFormat(volist);

		Map<String, Object> result = new HashMap<>();
		result.put("data", jstreeData);
		return result;
	}

	@RequestMapping(value = "/selectSumResourceSize", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> selectSumResourceSize(HttpServletRequest request, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		int resultCode = ResultCode.SUCCESS.getValue();

		System.out.println(optimizerVO);
		HashMap<String, Object> data = optimizerService.selectSumResourceSize(optimizerVO);

		if (data == null) {
			resultCode = NO_DATA_CODE;
		}
		/*
		if (data.containsKey("type1_size") && data.containsKey("type2_size")) {
			Object type1_size_obj = data.get("type1_size");
			Object type2_size_obj = data.get("type2_size");
			long type1_size = Long.parseLong(type1_size_obj.toString());
			long type2_size = Long.parseLong(type2_size_obj.toString());
			if (type1_size <= 0 || type2_size <= 0) {
				resultCode = NO_DATA_CODE;
			}
		}*/

		Map<String, Object> result = new HashMap<>();
		result.put("data", data);
		result.put("result_code", resultCode);
		return result;
	}

	/***
	 * 1. 함수명 : selectAvgTime 2. 작성일: 3. 작성자: 안재림 4. 설명: 5. 수정일:
	 ***/
	@RequestMapping(value = "/selectAvgTime", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> selectAvgTime(HttpServletRequest request, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		int resultCode = SUCCESS_CODE;

		HashMap<String, Object> data = optimizerService.selectAvgTime(optimizerVO);

		if (data == null) {
			resultCode = NO_DATA_CODE;
		} else {
			boolean allZeros = true;
			for (Map.Entry<String, Object> entry : data.entrySet()) {
				Object value = entry.getValue();
				if (value instanceof Number && ((Number) value).doubleValue() != 0) {
					allZeros = false;
					break;
				}
			}

			if (allZeros) {
				resultCode = NO_DATA_CODE;
			}
		}

		Map<String, Object> result = new HashMap<>();
		result.put("data", data);
		result.put("result_code", resultCode);
		return result;
	}

	/***
	 * 1. 함수명 : optimizerCheckTimeAgent 2. 작성일: 3. 작성자: 안재림 4. 설명: 시간 체크 에이전트 실행부 5.
	 * 수정일:
	 ***/
	@RequestMapping(value = "/optimizerCheckTimeAgent", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> optimizerCheckTimeAgent(HttpServletRequest request, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);

		// 시간 리셋 
		System.out.println(optimizerVO);
		int data = optimizerService.updateResourceTimeReset(optimizerVO);
		
		// 다중 선택 고려 안하고 작성함
		int site_no = 0;
        if (site_list != null && !site_list.isEmpty()) {
            Object firstElement = site_list.get(0);
            if (firstElement instanceof Integer) {
                site_no = (Integer) firstElement;
            } else if (firstElement instanceof String) {
                try {
                    site_no = Integer.parseInt((String) firstElement);
                } catch (NumberFormatException e) {
                    e.printStackTrace(); // 예외 처리
                }
            } else {
                System.out.println("Unexpected type in SiteList: " + firstElement.getClass().getName());
            }
        } else {
            System.out.println("SiteList is null or empty");
        }

		System.out.println("site_no : " + site_no);
		String os = System.getProperty("os.name").toLowerCase();
		String command = "/home/wellconn/Optimizer/OptimizerCheckTimeAgent/startup.sh " + site_no;
		
		if (optimizerVO.getResource_no() != null) { // 단건
			command += " "+optimizerVO.getResource_no();
		}else { // 전체
		}
		System.out.println("command : "+command);
		
		if (!os.contains("win")) {
			ExecLinux(command);
		}
		
		Map<String, Object> result = new HashMap<>();
		result.put("data", null);
		return result;
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

	/***
	 * 1. 함수명 : selectAvgTime 2. 작성일: 3. 작성자: 안재림 4. 설명: 5. 수정일:
	 ***/
	@RequestMapping(value = "/selectAvgTimeByType", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> selectAvgTimeByType(HttpServletRequest request, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		int resultCode = SUCCESS_CODE;

		List<HashMap<String, Object>> data = optimizerService.selectAvgTimeByType(optimizerVO);
		if (data.size() == 0) {
			resultCode = NO_DATA_CODE;
		}

		Map<String, Object> result = new HashMap<>();
		result.put("data", data);
		result.put("result_code", resultCode);
		return result;
	}
	
	@RequestMapping(value ="/getCurrentMonthCost", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> getCurrentMonthCost(HttpServletRequest request,  HttpServletResponse response, OptimizerVO optimizerVO) throws Exception{
		System.out.println(optimizerVO);
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		
		Map<String,Object> result = new HashMap<>();
		List<OptimizerVO> volist = optimizerService.getCurrentMonthCost(optimizerVO);

		result.put("data", volist);
		
		return result;
	}
	
	@RequestMapping(value = "/updateResourceTimeReset", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateResourceTimeReset(HttpServletRequest request, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		int resultCode = SUCCESS_CODE;

		int data = optimizerService.updateResourceTimeReset(optimizerVO);

		Map<String, Object> result = new HashMap<>();
		result.put("data", data);
		result.put("result_code", resultCode);
		return result;
	}
	
	@RequestMapping(value = "/updateResourceConditionByResourceNo", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateResourceConditionByResourceNo(HttpServletRequest request, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		int resultCode = SUCCESS_CODE;

		int data = optimizerService.updateResourceConditionByResourceNo(optimizerVO);

		Map<String, Object> result = new HashMap<>();
		result.put("data", data);
		result.put("result_code", resultCode);
		return result;
	}		

	/***
	 * 1. 함수명 : optimizerCheckTimeAgent 
	 * 2. 작성일: 
	 * 3. 작성자: 안재림 
	 * 4. 설명: 시간 체크 에이전트 실행부 
	 * 5.
	 * 수정일:
	 ***/
	@RequestMapping(value = "/optimizerCheckTimeAgentProcess", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> optimizerCheckTimeAgentProcess(HttpServletRequest request, OptimizerVO optimizerVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);

		// 다중 선택 고려 안하고 작성함
		int site_no = 0;
        if (site_list != null && !site_list.isEmpty()) {
            Object firstElement = site_list.get(0);
            if (firstElement instanceof Integer) {
                site_no = (Integer) firstElement;
            } else if (firstElement instanceof String) {
                try {
                    site_no = Integer.parseInt((String) firstElement);
                } catch (NumberFormatException e) {
                    e.printStackTrace(); // 예외 처리
                }
            } else {
                System.out.println("Unexpected type in SiteList: " + firstElement.getClass().getName());
            }
        } else {
            System.out.println("SiteList is null or empty");
        }
		System.out.println("site_no : " + site_no);
		
		String commandResult = "";
		String os = System.getProperty("os.name").toLowerCase();
		String command = "/home/wellconn/Optimizer/OptimizerAgent/cmd.sh /home/wellconn/Optimizer/optimizer_CheckTime_checker.sh";
		System.out.println("command : "+command);
		
		if (!os.contains("win")) {
			commandResult = executeCommand(command);
		}
		System.out.println("commandResult : "+commandResult);
		
		Map<String, Object> result = new HashMap<>();
		result.put("data", commandResult);
		return result;
	}	

	@RequestMapping(value = "/selectLatestCheckTimeAgent", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> selectLatestCheckTimeAgent(HttpServletRequest request, AlertVO alertVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		alertVO.setSite_list(site_list);
		int resultCode = SUCCESS_CODE;

		AlertVO data = optimizerService.selectLatestCheckTimeAgent(alertVO);

		Map<String, Object> result = new HashMap<>();
		result.put("data", data);
		result.put("result_code", resultCode);
		return result;
	}	

	private String executeCommand(String command) {
	    StringBuilder output = new StringBuilder();
	    Process process;
	    try {
	        process = new ProcessBuilder("/bin/bash", "-c", command).start();
	        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
	        String line;
	        while ((line = reader.readLine()) != null) {
	            // output.append(line).append("\n");
	        }
	        reader.close();
	        
	        int exitVal = process.waitFor();
	        if (exitVal != 0) {
	            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
	            while ((line = errorReader.readLine()) != null) {
	                // output.append(line).append("\n");
	            }
	            errorReader.close();
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	    return output.toString();
	}	

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
	
	/***
	 * 1. 함수명 : selectResourceListByParentId 
	 * 2. 작성일: 
	 * 3. 작성자: 안재림 
	 * 4. 설명: 타뷸레이터
	 * 5. 수정일:
	 ***/
	@RequestMapping(value = "/selectResourceListByParentIdAjax", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("웹 컨텐츠 기준 최적화 > 테뷸레이터")
	public Map<String, Object> selectResourceListByParentIdAjax(HttpServletRequest request, HttpServletResponse response, @RequestParam("size") int size, @RequestParam("page") int page, @RequestParam("update") int update, OptimizerVO optimizerVO) throws Exception {
		
		System.out.println(optimizerVO);
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);

		List<OptimizerVO> volist = optimizerService.selectResourceListByParentId(optimizerVO);
		if(update == 1) {
			int vono = optimizerService.updateResourceListByParentId(optimizerVO);
		}
		Map<String, Object> result = new HashMap<>();
		result.put("data", volist);
		return result;
	}
	
	@RequestMapping(value = "/selectResourceAllWithLatestLogByTopContent", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("웹 컨텐츠 기준 최적화 > 테뷸레이터")
	public Map<String, Object> selectResourceAllWithLatestLogByTopContent(HttpServletRequest request,
			HttpServletResponse response, @RequestParam("size") int size, @RequestParam("page") int page,
			OptimizerVO optimizerVO) throws Exception {
		System.out.println(optimizerVO);
		System.out.println("EndDate_ts : " + optimizerVO.getEndDate_ts());
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);

		System.out.println("search_page : " + optimizerVO.getSearch_page());
		System.out.println(optimizerVO.getResource_status_array());
		optimizerVO.getResource_type_array().add(0); // 폴더는 무조건 포함

		Map<String, Object> result = new HashMap<>();
		optimizerVO.setOffset((page - 1) * 15);
		optimizerVO.setCnt_mode(1);
		System.out.println("size : " + optimizerVO.getSize());
		System.out.println("offset : " + optimizerVO.getOffset());
		int cnt = optimizerService.selectResourceAllWithLatestLogByTopContent(optimizerVO).size();
		int last = 1;
		if (cnt % size == 0)
			last = 0;

		optimizerVO.setCnt_mode(0);
		List<OptimizerVO> volist = optimizerService.selectResourceAllWithLatestLogByTopContent(optimizerVO);

		result.put("data", volist);
		result.put("list_cnt", cnt);
		result.put("last_page", (cnt / size + last));

		return result;
	}
	
	@RequestMapping(value ="/selectCountGroupByTypeAndStatus", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectCountGroupByTypeAndStatus(HttpServletRequest request,  HttpServletResponse response, OptimizerVO optimizerVO) throws Exception{
		System.out.println(optimizerVO);
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		int resultCode = SUCCESS_CODE;

		List<HashMap<String, Object>> data = optimizerService.selectCountGroupByTypeAndStatus(optimizerVO);
		
		Map<String,Object> result = new HashMap<>();
		result.put("data", data); 
		result.put("result_code", resultCode); 	
		return result;
	}	
	
	@RequestMapping(value = "/optimizedManage", method = RequestMethod.GET)
	public String userManage(Model model, UserVO userVO) {	
		return "/setting/optimizedManage";
	}
	
	@RequestMapping(value ="/getCurrentDayCost", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> getCurrentDayCost(HttpServletRequest request,  HttpServletResponse response, OptimizerVO optimizerVO) throws Exception{
		System.out.println(optimizerVO);
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		
		Map<String,Object> result = new HashMap<>();
		List<OptimizerVO> volist = optimizerService.getCurrentDayCost(optimizerVO);

		result.put("data", volist);
		
		return result;
	}
	
	
	public enum DASHBOARD_COST_STATUS {
		SUCCESS, FAIL;
	};

	/**
	 * 
	 * 1. 메소드명 : dashBoardCost_dataload 2. 작성일: 2024. 7. 5. 3. 작성자: doil 4. 설명: 비용
	 * 최적화 현황에서 필요한 전체 데이터를 로딩 5. 수정일: doil
	 */
	@RequestMapping(value = "/dashboard-cost-dataload", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("")
	public Map<String, Object> dashBoardCost_dataload(HttpServletRequest request, HttpServletResponse response, OptimizerVO optimizerVO) {
		Map<String, Object> result = new HashMap<>();

		// default
		result.put("status", DASHBOARD_COST_STATUS.FAIL);

		int resultCode = NOT_FOUND_CODE;

		try {
			
			HttpSession session = request.getSession();
			UserVO userVo = (UserVO) session.getAttribute("login");
			if(userVo==null) throw new Exception("userVo null");
			
			ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
			if(site_list==null) throw new Exception("site_list null");
			
			optimizerVO.setSite_list(site_list);
			
			// 추가 예상 절감 금액
			List<OptimizerVO> monthCost = optimizerService.getCurrentMonthCost(optimizerVO);
			result.put("monthCost", monthCost);
			
			List<OptimizerVO> dayCost = optimizerService.getCurrentDayCost(optimizerVO);
			result.put("dayCost", dayCost);
			
			// selectCountByResourceStatus 데이터 불러오기
	        List<HashMap<String, Object>> selectCountByResourceStatus = optimizerService.selectCountByResourceStatus(optimizerVO);

	        // 전체 리소스 갯수 계산
	        int totalResourceCnt = 0;
	        int resourceStatus1Cnt = 0;
	        int resourceStatusMinusCnt = 0;
	        for (HashMap<String, Object> map : selectCountByResourceStatus) {
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
	        selectCountByResourceStatus.add(total);
	        
	        for (HashMap<String, Object> map : selectCountByResourceStatus) {
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
	        
	        result.put("resourceCountArray", selectCountByResourceStatus);
	        ////////////////////////////////////////////////////////
	        
			
			

			resultCode = SUCCESS_CODE;
			result.put("status", DASHBOARD_COST_STATUS.SUCCESS);

		} catch (Exception e) {
			resultCode = NO_DATA_CODE;

			String errorMsg = e.getMessage();
			result = new HashMap<>();
			result.put("status", DASHBOARD_COST_STATUS.FAIL);
			result.put("errMsg", errorMsg);
		}

		result.put("resultCode", resultCode);
		return result;
	}

	@RequestMapping(value = "/unstructedFileManager", method = RequestMethod.GET)
	@ApiOperation("웹 컨텐츠 기준 최적화 > 페이지 매핑")
	public String unstructedFileManager(Model model, HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		OptimizerVO optimizerVO = new OptimizerVO();
		optimizerVO.setSite_list(site_list);

		List<OptimizerVO> volist = optimizerService.selectAll(optimizerVO);
		String jstreeData = optimizerService.convertToJSTreeFormat(volist);
		model.addAttribute("jsonData", jstreeData);

		List<HashMap<String, Object>> folderlist = optimizerService.selectResourceFolderAll(optimizerVO);
		for (HashMap<String, Object> folder : folderlist) {
		}
		model.addAttribute("folderlist", folderlist);

		return "/optimizer/unstructedFileManager";
	}	

	/** 안재림 **/
	@RequestMapping(value ="/selectResourceTop10", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectResourceTop10(HttpServletRequest request,  HttpServletResponse response, OptimizerVO optimizerVO) throws Exception{
		System.out.println(optimizerVO);
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		
		Map<String,Object> result = new HashMap<>();
		List<OptimizerVO> volist = optimizerService.selectResourceTop10(optimizerVO);

		result.put("data", volist);
		
		return result;
	}	
	
	/** 안재림 **/
	@RequestMapping(value ="/selectSizeGroupByType", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectSizeGroupByType(HttpServletRequest request,  HttpServletResponse response, OptimizerVO optimizerVO) throws Exception{
		System.out.println(optimizerVO);
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		
		Map<String,Object> result = new HashMap<>();
		List<HashMap<String, Object>> volist = optimizerService.selectSizeGroupByType(optimizerVO);

		result.put("data", volist);
		
		return result;
	}		
	
	/** 안재림 **/
	@RequestMapping(value ="/selectUserCount", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectUserCount(HttpServletRequest request,  HttpServletResponse response, OptimizerVO optimizerVO) throws Exception{
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		
		HashMap<String, Object> vo = optimizerService.selectUserCount(optimizerVO);

		Map<String,Object> result = new HashMap<>();
		result.put("data", vo);
		return result;
	}

	/** 안재림 **/
	@RequestMapping(value ="/selectResourceTypeCountByPage", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectResourceTypeCountByPage(HttpServletRequest request,  HttpServletResponse response, OptimizerVO optimizerVO) throws Exception{
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		
		List<HashMap<String, Object>> volist = optimizerService.selectResourceTypeCountByPage(optimizerVO);
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
	
	/** 안재림 **/
	@RequestMapping(value ="/selectResourceCountByPage", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectResourceCountByPage(HttpServletRequest request,  HttpServletResponse response, OptimizerVO optimizerVO) throws Exception{
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		
		List<HashMap<String, Object>> volist = optimizerService.selectResourceCountByPage(optimizerVO);

		Map<String,Object> result = new HashMap<>();
		result.put("data", volist);
		return result;
	}	
	
	/** 안재림 **/
	@RequestMapping(value ="/selectPageSpeedLog", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectPageSpeedLog(HttpServletRequest request,  HttpServletResponse response, OptimizerPageVO optimizerPageVO) throws Exception{
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerPageVO.setSite_list(site_list);
		
		List<HashMap<String, Object>> volist = optimizerPageService.selectPageSpeedLog(optimizerPageVO);
		
		Map<String,Object> result = new HashMap<>();
		result.put("data", volist);
		return result;
	}	

	/** 안재림 **/
	@RequestMapping(value ="/updateResourceStatusByPageNo", method = RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> updateResourceStatusByPageNo(HttpServletRequest request,  HttpServletResponse response, OptimizerVO optimizerVO) throws Exception{
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		
		int no = optimizerService.updateResourceStatusByPageNo(optimizerVO);
		
		Map<String,Object> result = new HashMap<>();
		result.put("data", no);
		return result;
	}	
	
	/** 안재림 **/
	@RequestMapping(value ="/selectResourceAllOptimizingByPage", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectResourceAllOptimizingByPage(HttpServletRequest request,  HttpServletResponse response, OptimizerVO optimizerVO) throws Exception{
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		
		List<OptimizerVO> volist = optimizerService.selectResourceAllOptimizingByPage(optimizerVO);
		
		Map<String,Object> result = new HashMap<>();
		result.put("data", volist);
		return result;
	}	
	
	
	@RequestMapping(value = "/selectResourceAllWithLatestDayLogByTopContent", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation("웹 컨텐츠 기준 최적화 > 테뷸레이터")
	public Map<String, Object> selectResourceAllWithLatestDayLogByTopContent(HttpServletRequest request,
			HttpServletResponse response, @RequestParam("size") int size, @RequestParam("page") int page,
			OptimizerVO optimizerVO) throws Exception {
		System.out.println(optimizerVO);
		System.out.println("EndDate_ts : " + optimizerVO.getEndDate_ts());
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);

		System.out.println("search_page : " + optimizerVO.getSearch_page());
		System.out.println(optimizerVO.getResource_status_array());
		optimizerVO.getResource_type_array().add(0); // 폴더는 무조건 포함

		Map<String, Object> result = new HashMap<>();
		optimizerVO.setOffset((page - 1) * 15);
		optimizerVO.setCnt_mode(1);
		System.out.println("size : " + optimizerVO.getSize());
		System.out.println("offset : " + optimizerVO.getOffset());
		int cnt = optimizerService.selectResourceAllWithLatestDayLogByTopContent(optimizerVO).size();
		int last = 1;
		if (cnt % size == 0)
			last = 0;

		optimizerVO.setCnt_mode(0);
		List<OptimizerVO> volist = optimizerService.selectResourceAllWithLatestDayLogByTopContent(optimizerVO);

		result.put("data", volist);
		result.put("list_cnt", cnt);
		result.put("last_page", (cnt / size + last));

		return result;
	}
	
	@RequestMapping(value ="/getDayLogByTopContent", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> getDayLogByTopContent(HttpServletRequest request,  HttpServletResponse response, OptimizerVO optimizerVO) throws Exception{
		System.out.println(optimizerVO);
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		
		Map<String,Object> result = new HashMap<>();
		List<OptimizerVO> volist = optimizerService.getDayLogByTopContent(optimizerVO);

		result.put("data", volist);
		
		return result;
	}


	/** 안재림 **/
	@RequestMapping(value ="/selectQueryTest", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectQueryTest(HttpServletRequest request,  HttpServletResponse response, OptimizerPageVO optimizerPageVO) throws Exception{
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerPageVO.setSite_list(site_list);
		
		List<HashMap<String, Object>> volist = optimizerPageService.selectQueryTest(optimizerPageVO);
		
		Map<String,Object> result = new HashMap<>();
		result.put("data", volist);
		return result;
	}	
	
	/** 안재림 2024.08.14 **/
	@RequestMapping(value ="/selectResourceStatusSummaryByPage", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectResourceStatusSummaryByPage(HttpServletRequest request,  HttpServletResponse response, OptimizerVO optimizerVO) throws Exception{
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		optimizerVO.setSite_list(site_list);
		
		List<HashMap<String, Object>> volist = optimizerService.selectResourceStatusSummaryByPage(optimizerVO);
		
		Map<String,Object> result = new HashMap<>();
		result.put("data", volist);
		return result;
	}	
	
	/** 안재림 2024.08.14 **/
	@RequestMapping(value ="/selectFirstPage", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectFirstPage(HttpServletRequest request,  HttpServletResponse response, OptimizerPageVO optimizerPageVO) throws Exception{
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		// optimizerPageVO.setSite_list(site_list);
		
		OptimizerPageVO vo = optimizerPageService.selectFirstPage(optimizerPageVO);
		
		Map<String,Object> result = new HashMap<>();
		result.put("data", vo);
		return result;
	}		
		
	/** 안재림 2024.08.16 **/
	@RequestMapping(value = "/requestLightHouse", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> requestLightHouse(HttpServletRequest request, LightHouseVO lightHouseVO) {
		HttpSession session = request.getSession();
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		// optimizerVO.setSite_list(site_list);
		// System.out.println(optimizerVO);

		// 다중 선택 고려 안하고 작성함
		/*
		int site_no = 0;
        if (site_list != null && !site_list.isEmpty()) {
            Object firstElement = site_list.get(0);
            if (firstElement instanceof Integer) {
                site_no = (Integer) firstElement;
            } else if (firstElement instanceof String) {
                try {
                    site_no = Integer.parseInt((String) firstElement);
                } catch (NumberFormatException e) {
                    e.printStackTrace(); // 예외 처리
                }
            } else {
                System.out.println("Unexpected type in SiteList: " + firstElement.getClass().getName());
            }
        } else {
            System.out.println("SiteList is null or empty");
        }
		System.out.println("site_no : " + site_no);
        */
		
		String commandResult = "";
		String os = System.getProperty("os.name").toLowerCase();
		
		String targetUrl  = lightHouseVO.getSite_address();
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
		
		Map<String, Object> result = new HashMap<>();
		result.put("data", commandResult);
		
		lightHouseVO.setLh_json(commandResult);
		int insertResult = lightHouseService.insertLightHouse(lightHouseVO);
		
		return result;
	}

	/** 안재림 2024.08.16 **/
	@RequestMapping(value ="/selectLightHouse", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> selectLightHouse(HttpServletRequest request,  HttpServletResponse response, LightHouseVO lightHouseVO) throws Exception{
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		// optimizerPageVO.setSite_list(site_list);
		
		LightHouseVO vo = lightHouseService.selectLightHouse(lightHouseVO);
		
		Map<String,Object> result = new HashMap<>();
		result.put("data", vo);
		return result;
	}		
}
