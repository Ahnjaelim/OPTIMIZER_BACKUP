package com.wellconn.optimizer.service;

import java.io.File;
import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellconn.optimizer.mapper.OptimizerMapper;
import com.wellconn.optimizer.mapper.OptimizerPageMapper;
import com.wellconn.optimizer.model.OptimizerPageVO;
import com.wellconn.optimizer.model.OptimizerVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OptimizerPageServiceImpl implements OptimizerPageService{

	private final OptimizerPageMapper optimizerPageMapper;
	private final OptimizerMapper optimizerMapper;

	@Override
	public List<OptimizerPageVO> selectAll(OptimizerPageVO optimizerPageVO) {
		return getResourceTreeRecursive(optimizerPageVO);
	}
	
	@Override
	public List<OptimizerPageVO> getResourceTreeRecursive(OptimizerPageVO optimizerPageVO){
		List<OptimizerPageVO> volist = optimizerPageMapper.selectAll(optimizerPageVO);
		for(OptimizerPageVO vo : volist) {
			OptimizerPageVO param = new OptimizerPageVO();
			param.setPage_parent_no(vo.getPage_no());
			List<OptimizerPageVO> children = getResourceTreeRecursive(param);
			if(!children.isEmpty()) {
				vo.setChildren(children);
			}

		}
		return volist;
	}

	// OptimizerService 클래스 내에 변환을 위한 메서드 추가
	@Override
	public String convertToJSTreeFormat(List<OptimizerPageVO> optimizerPageVOList) {
	    List<Map<String, Object>> jstreeDataList = new ArrayList<>();
	    
	    // 각 OptimizerPageVO를 jstree 형식에 맞게 변환하여 리스트에 추가
	    for (OptimizerPageVO optimizerPageVO : optimizerPageVOList) {
	        Map<String, Object> jstreeObject = convertToJSTreeObject(optimizerPageVO);
	        jstreeDataList.add(jstreeObject);
	    }
	    
	    // 리스트를 JSON 문자열로 변환하여 반환
	    try {
	        ObjectMapper objectMapper = new ObjectMapper();
	        return objectMapper.writeValueAsString(jstreeDataList);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ""; // 혹은 예외처리 방식에 따라 다른 값을 반환할 수 있음
	    }
	}

	private Map<String, Object> convertToJSTreeObject(OptimizerPageVO optimizerPageVO) {
	    Map<String, Object> map = new HashMap<>();
	    map.put("id", optimizerPageVO.getPage_no());
	    map.put("text", optimizerPageVO.getPage_name());
	    if (optimizerPageVO.getPage_type() == 1) {
	        map.put("icon", "jstree-file"); // 원하는 문서 모양의 아이콘 클래스명 설정
	    }
	    
	    if (optimizerPageVO.getChildren() != null && !optimizerPageVO.getChildren().isEmpty()) {
	        List<Map<String, Object>> childrenList = new ArrayList<>();
	        for (OptimizerPageVO child : optimizerPageVO.getChildren()) {
	            childrenList.add(convertToJSTreeObject(child));
	        }
	        map.put("children", childrenList);
	    }

	    return map;
	}
	
	@Override
	public OptimizerPageVO selectByPageNo(OptimizerPageVO optimizerPageVO) {
	    int page_no = optimizerPageVO.getPage_no();
	    OptimizerPageVO vo = optimizerPageMapper.selectByPageNo(optimizerPageVO);
	    String pagePath = vo.getPage_path();
	    String content = null;

	    if (pagePath != null) {
	        File file = new File(pagePath);
	        if (file.exists()) {
	            try {
	                content = FileUtils.readFileToString(file, "UTF-8");
	            } catch (IOException e) {
	                e.printStackTrace();
	            }
	        } else {
	            System.out.println("File does not exist.");
	        }
	    } else {
	        System.out.println("path is null");
	    }
	    vo.setContent(content);

	    // 컨텐츠 replace
	    String content_replaced = null;
	    String content_type1 = null; 
	    String content_type2 = null; 
	   
	    if (content != null) {
	        OptimizerVO param = new OptimizerVO();
	        param.setPage_no(page_no);
	        List<OptimizerVO> resourceList = optimizerMapper.selectResourceAllByPageNo(param);
	        content_type1 = new String(content);
	        content_type2 = new String(content);
	        long unixTimeMillis = Instant.now().toEpochMilli();
	        String unixTimeMillisString = String.valueOf(unixTimeMillis);	
	        
	        for (OptimizerVO resource : resourceList) {
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

	    vo.setContent_replaced(content_replaced);
	    vo.setContent_type1(content_type1);
	    vo.setContent_type2(content_type2);
	    
	    return vo;
	}


	@Override
	public List<OptimizerPageVO> selectPageAllByResourceNo(OptimizerPageVO optimizerPageVO) {
		return optimizerPageMapper.selectPageAllByResourceNo(optimizerPageVO);
	}

	@Override
	public String selectPageAllByResourceNoAdvanced(OptimizerPageVO optimizerPageVO) {
		List<OptimizerPageVO> allPages = new ArrayList<>();
		List<OptimizerPageVO> selectedPages = optimizerPageMapper.selectPageAllByResourceNo(optimizerPageVO); // 리소스 기준으로 관계테이블에서 불러온 페이지들
		for(OptimizerPageVO page : selectedPages) {
			addAllPages(allPages, optimizerPageMapper.selectPageParentAllByPageNo(page));
		}
		//System.out.println("===== selected pages =====");
		//selectedPages.forEach(vo -> System.out.println(vo));
		
		//System.out.println("===== all pages =====");
		//allPages.forEach(vo -> System.out.println(vo));
		
	    // page_no를 기준으로 중복 제거
        Map<Integer, OptimizerPageVO> uniquePagesMap = allPages.stream()
        	    .collect(Collectors.toMap(OptimizerPageVO::getPage_no, Function.identity(), (existing, replacement) -> existing));

        List<OptimizerPageVO> uniquePages = new ArrayList<>(uniquePagesMap.values());
        // 중복 제거 후의 결과를 출력
        
        //System.out.println("===== unique pages =====");
        //uniquePages.forEach(vo -> System.out.println(vo));
        
        String jsonString = convertToJSTreeAsString(uniquePages);
		// System.out.println("===== JSTree data =====");
		// System.out.println(jsonString);
		
		return jsonString;
	}

	private static void addAllPages(List<OptimizerPageVO> destination, List<OptimizerPageVO> source) {
        for (OptimizerPageVO page : source) {
            destination.add(page);
        }
    }

	public String convertToJSTreeAsString(List<OptimizerPageVO> optimizerPageVOList) {
	    Map<Integer, OptimizerPageVO> pageMap = new HashMap<>();
	    Map<Integer, List<OptimizerPageVO>> childMap = new HashMap<>();

	    // 페이지를 Map에 추가하고, 자식들을 찾아 childMap에 추가합니다.
	    for (OptimizerPageVO page : optimizerPageVOList) {
	        pageMap.put(page.getPage_no(), page);
	        int parentNo = page.getPage_parent_no();
	        childMap.computeIfAbsent(parentNo, k -> new ArrayList<>()).add(page);
	    }

	    // JSTree.js 데이터 구조로 변환합니다.
	    List<Map<String, Object>> jstreeData = new ArrayList<>();
	    for (OptimizerPageVO page : optimizerPageVOList) {
	        if (page.getPage_parent_no() == 0) {
	            jstreeData.add(mapNode(page, childMap));
	        }
	    }

	    // Jackson ObjectMapper를 사용하여 JSON 문자열로 변환합니다.
	    ObjectMapper objectMapper = new ObjectMapper();
	    try {
	        return objectMapper.writeValueAsString(jstreeData);
	    } catch (JsonProcessingException e) {
	        // JSON 변환 중 오류가 발생할 경우 처리
	        e.printStackTrace();
	        return null;
	    }
	}

	// OptimizerPageVO 객체를 JSTree.js 노드 구조로 변환하는 메서드
    private Map<String, Object> mapNode(OptimizerPageVO page, Map<Integer, List<OptimizerPageVO>> childMap) {
        Map<String, Object> node = new HashMap<>();
        node.put("id", page.getPage_no());
        node.put("text", page.getPage_name());
        if (page.getPage_type() == 1) {
        	node.put("icon", "jstree-file"); // 원하는 문서 모양의 아이콘 클래스명 설정
	    }
        // 다른 필요한 속성들을 추가로 넣어줄 수 있습니다.
        // 예: node.put("text", page.getPageName());

        List<Map<String, Object>> children = new ArrayList<>();
        List<OptimizerPageVO> childPages = childMap.getOrDefault(page.getPage_no(), new ArrayList<>());
        for (OptimizerPageVO child : childPages) {
            children.add(mapNode(child, childMap));
        }

        if (!children.isEmpty()) {
            node.put("children", children);
        }

        return node;
    }

	@Override
	public List<OptimizerPageVO> selectRecursivePageAllByPageNo(OptimizerPageVO optimizerPageVO) {
		return optimizerPageMapper.selectRecursivePageAllByPageNo(optimizerPageVO);
	}

	@Override
	public List<OptimizerPageVO> selectPageAll(OptimizerPageVO optimizerPageVO) {
		return optimizerPageMapper.selectPageAll(optimizerPageVO);
	}

	@Override
	public OptimizerPageVO selectPageByPageName(OptimizerPageVO optimizerPageVO) {
		return optimizerPageMapper.selectPageByPageName(optimizerPageVO);
	}

	@Override
	public int updateLazyloadButton(OptimizerPageVO optimizerPageVO) {
		// TODO Auto-generated method stub
		return optimizerPageMapper.updateLazyloadButton(optimizerPageVO);
	}

	@Override
	public List<OptimizerPageVO> updateLazyloadStatus(OptimizerPageVO optimizerPageVO) {
		// TODO Auto-generated method stub
		return optimizerPageMapper.updateLazyloadStatus(optimizerPageVO);
	}

	@Override
	public int updateLazyloadButtonAll(OptimizerPageVO optimizerPageVO) {
		// TODO Auto-generated method stub
		return optimizerPageMapper.updateLazyloadButtonAll(optimizerPageVO);
	}

	@Override
	public List<HashMap<String, Object>> selectPageSpeedLog(OptimizerPageVO optimizerPageVO) {
		return optimizerPageMapper.selectPageSpeedLog(optimizerPageVO);
	}

	@Override
	public List<HashMap<String, Object>> selectQueryTest(OptimizerPageVO optimizerPageVO) {
		return optimizerPageMapper.selectQueryTest(optimizerPageVO);
	}
	
}
