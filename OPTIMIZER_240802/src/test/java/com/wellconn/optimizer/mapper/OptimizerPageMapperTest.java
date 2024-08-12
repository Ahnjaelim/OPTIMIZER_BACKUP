package com.wellconn.optimizer.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.wellconn.optimizer.model.OptimizerPageVO;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = "file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class OptimizerPageMapperTest {

	@Autowired
	OptimizerPageMapper optimizerPageMapper;
	
	// @Test
	public void selectAllTest() {
		List<OptimizerPageVO> volist = getPathToRoot(3);
		volist.forEach(vo -> System.out.println(vo));
	}
	
	// @Test
	public List<OptimizerPageVO> getPathToRoot(int childPageNo) {
	    List<OptimizerPageVO> pathToRoot = new ArrayList<>();
	    OptimizerPageVO param = new OptimizerPageVO();
	    param.setPage_no(childPageNo);
	    OptimizerPageVO childNode = optimizerPageMapper.selectByPageNo(param);

	    if (childNode != null) {
	        pathToRoot.add(childNode);
	        int parentPageNo = childNode.getPage_parent_no();
	        OptimizerPageVO param2 = new OptimizerPageVO();
	        param2.setPage_no(parentPageNo);
	        while (parentPageNo != 0) {
	            OptimizerPageVO parentNode = optimizerPageMapper.selectByPageNo(param2);
	            if (parentNode != null) {
	                pathToRoot.add(parentNode);
	                parentPageNo = parentNode.getPage_parent_no();
	            } else {
	                break;
	            }
	        }
	    }

	    return pathToRoot;
	}	
	
	// @Test
	public void test2() {
		recursiveQueryTest(7);
		recursiveQueryTest(8);
		recursiveQueryTest(9);
	}
	
	// @Test
	public void queryshow() {
		// 여기서는 가상의 데이터를 받았다고 가정합니다.
        List<OptimizerPageVO> pages = new ArrayList<>();
        // 위에서 받은 페이지 정보를 리스트에 추가합니다.
        // pages.add(각각의 페이지 정보);
        List<OptimizerPageVO> list1 = recursiveQueryTest(7);
        List<OptimizerPageVO> list2 = recursiveQueryTest(8);
        List<OptimizerPageVO> list3 = recursiveQueryTest(9);
        // 리스트에 있는 각 OptimizerPageVO 객체들을 pages 리스트에 추가
        addAllPages(pages, list1);
        addAllPages(pages, list2);
        addAllPages(pages, list3);
        
     // page_no를 기준으로 중복 제거
        Map<Integer, OptimizerPageVO> uniquePagesMap = pages.stream()
        	    .collect(Collectors.toMap(OptimizerPageVO::getPage_no, Function.identity(), (existing, replacement) -> existing));

        List<OptimizerPageVO> uniquePages = new ArrayList<>(uniquePagesMap.values());
        // 중복 제거 후의 결과를 출력
        uniquePages.forEach(vo -> System.out.println(vo));

        System.out.println("===== JSTree Convert =====");
        List<Map<String, Object>> convertedList = convertToJSTree(uniquePages);
        convertedList.forEach(vo -> System.out.println(vo));

	}
	
	public List<OptimizerPageVO> recursiveQueryTest(int page_no) {
		// System.out.println("===== page no : "+page_no+" =====");
	    OptimizerPageVO param = new OptimizerPageVO();
	    param.setPage_no(page_no);		
		List<OptimizerPageVO> volist = optimizerPageMapper.selectPageParentAllByPageNo(param);
		// volist.forEach(vo -> System.out.println(vo));
		return volist;
	}
	
	 // OptimizerPageVO 객체를 JSTree 노드로 변환하는 메서드
    private static Map<String, Object> createNode(OptimizerPageVO page) {
        Map<String, Object> node = new HashMap<>();
        node.put("id", page.getPage_no());
        node.put("parent", page.getPage_parent_no());
        // 다른 필요한 정보들을 적절히 추가합니다.
        // node.put("text", page.getPage_name());
        // node.put("children", null); 등
        return node;
    }
    
    private static void addAllPages(List<OptimizerPageVO> destination, List<OptimizerPageVO> source) {
        for (OptimizerPageVO page : source) {
            destination.add(page);
        }
    }   

    public List<Map<String, Object>> convertToJSTree(List<OptimizerPageVO> optimizerPageVOList) {
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

        return jstreeData;
    }    
    
    // OptimizerPageVO 객체를 JSTree.js 노드 구조로 변환하는 메서드
    private Map<String, Object> mapNode(OptimizerPageVO page, Map<Integer, List<OptimizerPageVO>> childMap) {
        Map<String, Object> node = new HashMap<>();
        node.put("id", page.getPage_no());
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
    
    @Test
    public void queryTest() {
    	OptimizerPageVO param = new OptimizerPageVO();
    	List<OptimizerPageVO> volist = optimizerPageMapper.selectAll(param);
    	List<OptimizerPageVO> newlist = new ArrayList<OptimizerPageVO>();
    	for(OptimizerPageVO vo : volist) {
    		newlist.add(vo);
    		List<OptimizerPageVO> children = optimizerPageMapper.selectRecursivePageAllByPageNo(vo);
    		for(OptimizerPageVO child : children) {
    			newlist.add(child);
    		}
    	}
    	newlist.forEach(vo -> System.out.println(vo));
    }
    

}
