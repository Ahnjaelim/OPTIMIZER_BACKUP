package com.wellconn.optimizer.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellconn.optimizer.mapper.OptimizerMapper;
import com.wellconn.optimizer.model.AlertVO;
import com.wellconn.optimizer.model.OptimizerVO;
import com.wellconn.optimizer.websocket.WebSocketHandler;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OptimizerServiceImpl implements OptimizerService{

	private final OptimizerMapper optimizerMapper;
	private final WebSocketHandler webSocketHandler;

	@Override
	public List<OptimizerVO> selectAll(OptimizerVO optimizerVO) {
		return getResourceTreeRecursive(optimizerVO);
	}
	
	private List<OptimizerVO> getResourceTreeRecursive(OptimizerVO optimizerVO){
		List<OptimizerVO> volist = optimizerMapper.selectAll(optimizerVO);
		for(OptimizerVO vo : volist) {
			OptimizerVO param = new OptimizerVO();
			param.setResource_parent_no(vo.getResource_no());
			List<OptimizerVO> children = getResourceTreeRecursive(param);
			if(!children.isEmpty()) {
				vo.setChildren(children);
			}

		}
		return volist;
	}

	// OptimizerService 클래스 내에 변환을 위한 메서드 추가
	public String convertToJSTreeFormat(List<OptimizerVO> optimizerVOList) {
	    List<Map<String, Object>> jstreeDataList = new ArrayList<>();
	    
	    // 각 OptimizerVO를 jstree 형식에 맞게 변환하여 리스트에 추가
	    for (OptimizerVO optimizerVO : optimizerVOList) {
	        Map<String, Object> jstreeObject = convertToJSTreeObject(optimizerVO);
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

	private Map<String, Object> convertToJSTreeObject(OptimizerVO optimizerVO) {
	    Map<String, Object> map = new HashMap<>();
	    map.put("id", optimizerVO.getResource_no());
	    map.put("text", optimizerVO.getResource_name());

	    if (optimizerVO.getChildren() != null && !optimizerVO.getChildren().isEmpty()) {
	        List<Map<String, Object>> childrenList = new ArrayList<>();
	        for (OptimizerVO child : optimizerVO.getChildren()) {
	            childrenList.add(convertToJSTreeObject(child));
	        }
	        map.put("children", childrenList);
	    }

	    return map;
	}

	@Override
	public List<OptimizerVO> selectResourceListByParentId(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceListByParentId(optimizerVO);
	}

	@Override
	public OptimizerVO selectResourceByResourceNo(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceByResourceNo(optimizerVO);
	}
	
	@Override
	public OptimizerVO selectPageResourceByResourceNo(OptimizerVO vo) {
		// TODO Auto-generated method stub
		return optimizerMapper.selectPageResourceByResourceNo(vo);
	}
	
	@Override
	public OptimizerVO selectResourceByResourceOrg(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceByResourceOrg(optimizerVO);
	}

	@Override
	public List<OptimizerVO> selectRecursiveResourceByResourceNo(OptimizerVO optimizerVO) {
		return optimizerMapper.selectRecursiveResourceByResourceNo(optimizerVO);
	}

	@Override
	public List<OptimizerVO> selectResourceAllByPageNo(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceAllByPageNo(optimizerVO);
	}

	@Override
	@Transactional
	public int updateResourceStatusByResourceNo(OptimizerVO optimizerVO) {
		try {
			webSocketHandler.broadcastUpdate(optimizerVO);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return optimizerMapper.updateResourceStatusByResourceNo(optimizerVO);
	}

	@Override
	public List<OptimizerVO> selectResourceAllByCloudNo(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceAllByCloudNo(optimizerVO);
	}

	@Override
	public List<OptimizerVO> selectResourceAllByResourceStatus(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceAllByResourceStatus(optimizerVO);
	}

	@Override
	public int updateResourceStatusAllByCloudNo(OptimizerVO optimizerVO) {
		return optimizerMapper.updateResourceStatusAllByCloudNo(optimizerVO);
	}

	@Override
	public List<OptimizerVO> selectResourceAllByResourceType(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceAllByResourceType(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> countResourceAllByResourceType(OptimizerVO optimizerVO) {
		return optimizerMapper.countResourceAllByResourceType(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> countResourceByRgstrDate(OptimizerVO optimizerVO) {
		return optimizerMapper.countResourceByRgstrDate(optimizerVO);
	}

	@Override
	public List<OptimizerVO> selectResourceAllByResourceTypeSimple(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceAllByResourceTypeSimple(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> countResourceGroupByResourceParentNo(OptimizerVO optimizerVO) {
		return optimizerMapper.countResourceGroupByResourceParentNo(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> selectResourceFolderAll(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceFolderAll(optimizerVO);
	}

	@Override
	public HashMap<String, Object> selectResourceSizeSum(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceSizeSum(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> selectResourceMonthlyTraffic(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceMonthlyTraffic(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> selectResourceMonthlyTrafficByResourceType(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceMonthlyTrafficByResourceType(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> countResourceGroupByResourceType(OptimizerVO optimizerVO) {
		return optimizerMapper.countResourceGroupByResourceType(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> selectMonthlyTrafficByType(OptimizerVO optimizerVO) {
		return optimizerMapper.selectMonthlyTrafficByType(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> selectCountByResourceStatus(OptimizerVO optimizerVO) {
		return optimizerMapper.selectCountByResourceStatus(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> selectResourceAllUnoptimized(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceAllUnoptimized(optimizerVO);
	}
	
	@Override
	public List<HashMap<String, Object>> savedTraffic(OptimizerVO optimizerVO) {
		return optimizerMapper.savedTraffic(optimizerVO);
	}

	@Override
	public int insertFakeLog() {
		return optimizerMapper.insertFakeLog();
	}

	@Override
	public List<HashMap<String, Object>> selectViewLogAll(OptimizerVO optimizerVO) {
		return optimizerMapper.selectViewLogAll(optimizerVO);
	}
	
	@Override
	public List<HashMap<String, Object>> averageCompressionRate(OptimizerVO optimizerVO) {
		return optimizerMapper.averageCompressionRate(optimizerVO);
	}

	@Override
	public HashMap<String, Object> selectAvgCompRate(OptimizerVO optimizerVO) {
		return optimizerMapper.selectAvgCompRate(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> selectMonthlyTrafficByStatus(OptimizerVO optimizerVO) {
		// TODO Auto-generated method stub
		return optimizerMapper.selectMonthlyTrafficByStatus(optimizerVO);
	}

	@Override
	public HashMap<String, Object> selectMonthlyTrafficPredict(OptimizerVO optimizerVO) {
		// TODO Auto-generated method stub
		return optimizerMapper.selectMonthlyTrafficPredict(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> selectNewResourceAll(OptimizerVO optimizerVO) {
		// TODO Auto-generated method stub
		return optimizerMapper.selectNewResourceAll(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> totalUnOptAllSize(OptimizerVO optimizerVO) {
		// TODO Auto-generated method stub
		return optimizerMapper.totalUnOptAllSize(optimizerVO);
	}

	@Override
	public HashMap<String, Object> selectAvgCompRate_v2(OptimizerVO optimizerVO) {
	    // 결과를 받아옵니다.
	    HashMap<String, Object> result = optimizerMapper.selectAvgCompRate_v2(optimizerVO);

	    // 만약 결과가 존재한다면 소수점 둘째 자리까지 반올림하여 자릅니다.
	    if (result != null && result.containsKey("avg_comp_rate")) {
	        // 소수점 둘째 자리까지 반올림합니다.
	        BigDecimal avgCompRate = new BigDecimal(result.get("avg_comp_rate").toString());
	        avgCompRate = avgCompRate.setScale(2, RoundingMode.HALF_UP);

	        // 자른 결과를 다시 결과 맵에 넣어줍니다.
	        result.put("avg_comp_rate", avgCompRate);
	    }

	    // 처리된 결과를 반환합니다.
	    return result;
	}

	@Override
	public List<OptimizerVO> selectResourceAllOptimizing(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceAllOptimizing(optimizerVO);
	}

	@Override
	public int cancelOptimizingResourceAll(OptimizerVO optimizerVO) {
		return optimizerMapper.cancelOptimizingResourceAll(optimizerVO);
	}
	
	@Override
	public List<HashMap<String, Object>> avgCallCount(OptimizerVO optimizerVO) {
		// TODO Auto-generated method stub
		return optimizerMapper.avgCallCount(optimizerVO);
	}

	@Override
	public String selectNow() {
		return optimizerMapper.selectNow();
	}

	@Override
	public HashMap<String, Object> selectOptimizedAvgCompRate(OptimizerVO optimizerVO) {
	    // 결과를 받아옵니다.
	    HashMap<String, Object> result = optimizerMapper.selectOptimizedAvgCompRate(optimizerVO);

	    // 만약 결과가 존재한다면 소수점 둘째 자리까지 반올림하여 자릅니다.
	    if (result != null && result.containsKey("avg_comp_rate")) {
	        // 소수점 둘째 자리까지 반올림합니다.
	        BigDecimal avgCompRate = new BigDecimal(result.get("avg_comp_rate").toString());
	        avgCompRate = avgCompRate.setScale(2, RoundingMode.HALF_UP);

	        // 자른 결과를 다시 결과 맵에 넣어줍니다.
	        result.put("avg_comp_rate", avgCompRate);
	    }

	    // 처리된 결과를 반환합니다.
	    return result;
	}

	@Override
	public List<OptimizerVO> selectResourceAllWithLatestLogByParentId(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceAllWithLatestLogByParentId(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> countResourceGroupByResourceParentNoWithLatestLog(OptimizerVO optimizerVO) {
		return optimizerMapper.countResourceGroupByResourceParentNoWithLatestLog(optimizerVO);
	}

	@Override
	public HashMap<String, Object> selectSumResourceSize(OptimizerVO optimizerVO) {
		return optimizerMapper.selectSumResourceSize(optimizerVO);
	}

	@Override
	public HashMap<String, Object> selectAvgTime(OptimizerVO optimizerVO) {
		return optimizerMapper.selectAvgTime(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> selectResourceAllUnoptimizedBySize(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceAllUnoptimizedBySize(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> selectAvgTimeByType(OptimizerVO optimizerVO) {
		return optimizerMapper.selectAvgTimeByType(optimizerVO);
	}



	@Override
	public int updateResourceTimeReset(OptimizerVO optimizerVO) {
		return optimizerMapper.updateResourceTimeReset(optimizerVO);
	}

	@Override
	public int updateResourceConditionByResourceNo(OptimizerVO optimizerVO) {
		return optimizerMapper.updateResourceConditionByResourceNo(optimizerVO);
	}

	@Override
	public AlertVO selectLatestCheckTimeAgent(AlertVO alertVO) {
		return optimizerMapper.selectLatestCheckTimeAgent(alertVO);
	}

	@Override
	public List<OptimizerVO> selectResourceAllWithLatestLogByTopContent(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceAllWithLatestLogByTopContent(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> selectCountGroupByTypeAndStatus(OptimizerVO optimizerVO) {
		return optimizerMapper.selectCountGroupByTypeAndStatus(optimizerVO);
	}

	@Override
	public List<OptimizerVO> getCurrentMonthCost(OptimizerVO optimizerVO) {
		return optimizerMapper.getCurrentMonthCost(optimizerVO);
	}

	@Override
	public List<OptimizerVO> getCurrentDayCost(OptimizerVO optimizerVO) {
		return optimizerMapper.getCurrentDayCost(optimizerVO);
	}

	@Override
	public List<OptimizerVO> selectResourceTop10(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceTop10(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> selectSizeGroupByType(OptimizerVO optimizerVO) {
		return optimizerMapper.selectSizeGroupByType(optimizerVO);
	}

	@Override
	public HashMap<String, Object> selectUserCount(OptimizerVO optimizerVO) {
		return optimizerMapper.selectUserCount(optimizerVO);
	}

	@Override
	public List<OptimizerVO> selectPageResource(OptimizerVO optimizerVO) {
		// TODO Auto-generated method stub
		return optimizerMapper.selectPageResource(optimizerVO);
	}

	@Override
	public List<OptimizerVO> getPageRendering(OptimizerVO optimizerVO) {
		// TODO Auto-generated method stub
		return optimizerMapper.getPageRendering(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> selectResourceTypeCountByPage(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceTypeCountByPage(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> selectResourceCountByPage(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceCountByPage(optimizerVO);
	}

	@Override
	public int updateResourceStatusByPageNo(OptimizerVO optimizerVO) {
		return optimizerMapper.updateResourceStatusByPageNo(optimizerVO);
	}

	@Override
	public List<OptimizerVO> selectResourceAllOptimizingByPage(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceAllOptimizingByPage(optimizerVO);
	}

	@Override
	public int updateResourceListByParentId(OptimizerVO optimizerVO) {
		return optimizerMapper.updateResourceListByParentId(optimizerVO);
	}


	@Override
	public List<OptimizerVO> selectResourceAllWithLatestDayLogByTopContent(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceAllWithLatestDayLogByTopContent(optimizerVO);
	}

	@Override
	public List<OptimizerVO> getDayLogByTopContent(OptimizerVO optimizerVO) {
		return optimizerMapper.getDayLogByTopContent(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> selectResourceStatusSummaryByPage(OptimizerVO optimizerVO) {
		return optimizerMapper.selectResourceStatusSummaryByPage(optimizerVO);
	}

	
}
