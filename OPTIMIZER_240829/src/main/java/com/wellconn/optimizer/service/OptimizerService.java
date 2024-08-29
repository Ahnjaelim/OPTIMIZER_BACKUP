package com.wellconn.optimizer.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wellconn.optimizer.model.AlertVO;
import com.wellconn.optimizer.model.OptimizerVO;

public interface OptimizerService {

	String selectNow();
	
	List<OptimizerVO> selectAll(OptimizerVO optimizerVO);
	String convertToJSTreeFormat(List<OptimizerVO> optimizerVOList);
	List<OptimizerVO> selectResourceListByParentId(OptimizerVO optimizerVO);
	int updateResourceListByParentId(OptimizerVO optimizerVO);
	
	OptimizerVO selectResourceByResourceNo(OptimizerVO optimizerVO);
	OptimizerVO selectResourceByResourceOrg(OptimizerVO optimizerVO);
	List<OptimizerVO> selectRecursiveResourceByResourceNo(OptimizerVO optimizerVO);
	List<OptimizerVO> selectResourceAllByPageNo(OptimizerVO optimizerVO);
	int updateResourceStatusByResourceNo(OptimizerVO optimizerVO);
	int updateResourceStatusAllByCloudNo(OptimizerVO optimizerVO);
	List<OptimizerVO> selectResourceAllByCloudNo(OptimizerVO optimizerVO);
	List<OptimizerVO> selectResourceAllByResourceStatus(OptimizerVO optimizerVO);	
	List<OptimizerVO> selectResourceAllByResourceType(OptimizerVO optimizerVO);
	List<HashMap<String, Object>> countResourceAllByResourceType(OptimizerVO optimizerVO);
	List<HashMap<String, Object>> countResourceByRgstrDate(OptimizerVO optimizerVO);
	List<OptimizerVO> selectResourceAllByResourceTypeSimple(OptimizerVO optimizerVO);
	
	List<OptimizerVO> selectResourceAllOptimizing(OptimizerVO optimizerVO);					// 현재 최적화가 진행 중인 항목 셀렉트 (status = 0 or 11)
	int cancelOptimizingResourceAll(OptimizerVO optimizerVO);								// 현재 최적화 진행 중인 항목 모두 취소
	
	List<HashMap<String, Object>> countResourceGroupByResourceParentNo(OptimizerVO optimizerVO); // JSTREE용 카운트
	
	
	List<HashMap<String, Object>> selectResourceFolderAll(OptimizerVO optimizerVO);
	HashMap<String, Object> selectResourceSizeSum(OptimizerVO optimizerVO);
	List<HashMap<String, Object>> selectResourceMonthlyTraffic(OptimizerVO optimizerVO);
	List<HashMap<String, Object>> selectResourceMonthlyTrafficByResourceType(OptimizerVO optimizerVO);

	List<HashMap<String, Object>> countResourceGroupByResourceType(OptimizerVO optimizerVO);
	
	// 상태 업데이트
	int updateResourceConditionByResourceNo(OptimizerVO optimizerVO);

	// 대시보드용
	List<HashMap<String, Object>> selectMonthlyTrafficByType(OptimizerVO optimizerVO);		// 유형별 트래픽 구하기
	List<HashMap<String, Object>> selectMonthlyTrafficByStatus(OptimizerVO optimizerVO);	// 상태별 트래픽 구하기
	List<HashMap<String, Object>> selectCountByResourceStatus(OptimizerVO optimizerVO);
	List<HashMap<String, Object>> selectCountGroupByTypeAndStatus(OptimizerVO optimizerVO);
	List<HashMap<String, Object>> selectResourceAllUnoptimized(OptimizerVO optimizerVO);
	List<HashMap<String, Object>> averageCompressionRate(OptimizerVO optimizerVO);
	List<HashMap<String, Object>> avgCallCount(OptimizerVO optimizerVO);

	List<HashMap<String, Object>> totalUnOptAllSize(OptimizerVO optimizerVO);
	HashMap<String, Object> selectAvgCompRate(OptimizerVO optimizerVO);						// 평균 압축률 구하기
	HashMap<String, Object> selectAvgCompRate_v2(OptimizerVO optimizerVO);					// 평균 압축률 구하기
	HashMap<String, Object> selectOptimizedAvgCompRate(OptimizerVO optimizerVO);			// 평균 압축률 구하기 (최적화 된 항목만)	
	List<HashMap<String, Object>> selectNewResourceAll(OptimizerVO optimizerVO);			// 이번달 기준 새로 추가된 리소스 갯수 카운트
	
	//상세보기
	List<HashMap<String, Object>> savedTraffic(OptimizerVO optimizerVO);
	List<HashMap<String, Object>> selectViewLogAll(OptimizerVO optimizerVO);
	HashMap<String, Object> selectMonthlyTrafficPredict(OptimizerVO optimizerVO);			// 예측 트래픽 구하기
	
	// 테스트용
	int insertFakeLog();	
	
	List<HashMap<String, Object>> selectResourceAllUnoptimizedBySize(OptimizerVO optimizerVO);
	
	/** ==================================================================================================== 대시보드(속도)용 쿼리 **/
	
	List<OptimizerVO> selectResourceAllWithLatestLogByParentId(OptimizerVO optimizerVO);
	List<OptimizerVO> getCurrentMonthCost(OptimizerVO optimizerVO);
	List<OptimizerVO> getCurrentDayCost(OptimizerVO optimizerVO);
	List<OptimizerVO> selectResourceAllWithLatestLogByTopContent(OptimizerVO optimizerVO);
	List<OptimizerVO> selectResourceAllWithLatestDayLogByTopContent(OptimizerVO optimizerVO);
	List<OptimizerVO> getDayLogByTopContent(OptimizerVO optimizerVO);
	
	List<HashMap<String, Object>> countResourceGroupByResourceParentNoWithLatestLog(OptimizerVO optimizerVO);
	HashMap<String, Object> selectSumResourceSize(OptimizerVO optimizerVO);
	
	HashMap<String, Object> selectAvgTime(OptimizerVO optimizerVO);	
	int updateResourceTimeReset(OptimizerVO optimizerVO);
	
	List<HashMap<String, Object>> selectAvgTimeByType(OptimizerVO optimizerVO);
	
	AlertVO selectLatestCheckTimeAgent(AlertVO alertVO);
	
	List<OptimizerVO> selectResourceTop10(OptimizerVO optimizerVO);
	List<HashMap<String, Object>> selectSizeGroupByType(OptimizerVO optimizerVO);
	
	HashMap<String, Object> selectUserCount(OptimizerVO optimizerVO);

	List<OptimizerVO> selectPageResource(OptimizerVO optimizerVO);

	OptimizerVO selectPageResourceByResourceNo(OptimizerVO vo);

	List<OptimizerVO> getPageRendering(OptimizerVO optimizerVO);
	
	List<HashMap<String, Object>> selectResourceTypeCountByPage(OptimizerVO optimizerVO);
	List<HashMap<String, Object>> selectResourceCountByPage(OptimizerVO optimizerVO);
	
	int updateResourceStatusByPageNo(OptimizerVO optimizerVO);
	List<OptimizerVO> selectResourceAllOptimizingByPage(OptimizerVO optimizerVO);
	List<HashMap<String, Object>> selectResourceStatusSummaryByPage(OptimizerVO optimizerVO); // 상태 카운트
}
