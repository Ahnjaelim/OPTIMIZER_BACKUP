package com.wellconn.optimizer.service;

import java.util.HashMap;
import java.util.List;

import com.wellconn.optimizer.model.CloudVO;
import com.wellconn.optimizer.model.CostVO;
import com.wellconn.optimizer.model.OptimizerVO;


public interface CostService {

//	List<InspLogVO> selectAll(InspLogVO inspLogVO);
//	InspLogVO selectAllCnt(InspLogVO inspLogVO);
//	InspLogVO selectMenuSn(InspLogVO inspLogVO);
//	int insertUserLog(InspLogVO inspLogVO);
	

	List<CostVO> selectCostByYear(CostVO costVO);

	List<CostVO> selectCostByMonth(CostVO costVO);

	List<CostVO> selectCostByDay(CostVO costVO);

	List<CostVO> selectCloud_payment(CostVO costVO);

	List<CostVO> selectPerDayChart(CostVO costVO);

	List<CostVO> selectContentsCnt(CostVO costVO);

	List<CostVO> selectContentsSize(CostVO costVO);

	List<CostVO> selectUnOptResource(CostVO costVO);

	List<CostVO> selectAllResource(CostVO costVO);

	List<CostVO> getChartCostByResource(CostVO costVO);

	List<CostVO> getChartCostByCloud(CostVO costVO);
	
	List<CostVO> getReSizeCnt(CostVO costVO);
	
	List<CostVO> getAllSizeCnt(CostVO costVO);
	
	List<CostVO> getCostChart(CostVO costVO);
	
	List<CostVO> getOrgCostChart(CostVO costVO);
	
	List<CostVO> getResizeCostChart(CostVO costVO);
	
	List<CostVO> getTrafficChart(CostVO costVO);

	List<CostVO> getSiteList(CostVO costVO);

	List<CostVO> selectAllResourceByStatus(CostVO costVO);

	List<CostVO> selectAllResourceByPage(CostVO costVO);

	List<CostVO> selectAllResourceByStatusByPage(CostVO costVO);

	List<CostVO> selectAllResourceByDate(CostVO costVO);

	List<OptimizerVO> selectResourceListByParentIdTraffic(OptimizerVO optimizerVO);
	List<HashMap<String, Object>> countResourceGroupByResourceParentNoTraffic(OptimizerVO optimizerVO);
	List<HashMap<String, Object>> selectResourceFolderAllTraffic(OptimizerVO optimizerVO);

	List<CostVO> selectContentTable_use(CostVO costVO);
	List<CostVO> selectContentTable_dontuse(CostVO costVO);
	List<CostVO> selectContentTable_gone(CostVO costVO);

	List<CostVO> selectContentAll(CostVO costVO);

	List<CostVO> selectUseOrNot(CostVO costVO);

	List<CostVO> selectAvgComp(CostVO costVO);
}
