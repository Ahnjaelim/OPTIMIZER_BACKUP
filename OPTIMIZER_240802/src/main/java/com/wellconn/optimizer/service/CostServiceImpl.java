package com.wellconn.optimizer.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.wellconn.optimizer.mapper.CostMapper;
import com.wellconn.optimizer.model.CostVO;
import com.wellconn.optimizer.model.OptimizerVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CostServiceImpl implements CostService {

	private final CostMapper costMapper;

	

	@Override
	public List<CostVO> selectCostByYear(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectCostByYear(costVO);
	}

	@Override
	public List<CostVO> selectCostByMonth(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectCostByMonth(costVO);
	}

	@Override
	public List<CostVO> selectCostByDay(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectCostByDay(costVO);
	}

	@Override
	public List<CostVO> selectCloud_payment(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectCloud_payment(costVO);
	}

	@Override
	public List<CostVO> selectPerDayChart(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectPerDayChart(costVO);
	}

	@Override
	public List<CostVO> selectContentsCnt(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectContentsCnt(costVO);
	}

	@Override
	public List<CostVO> selectContentsSize(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectContentsSize(costVO);
	}

	@Override
	public List<CostVO> selectUnOptResource(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectUnOptResource(costVO);
	}

	@Override
	public List<CostVO> selectAllResource(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectAllResource(costVO);
	}

	@Override
	public List<CostVO> getChartCostByResource(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.getChartCostByResource(costVO);
	}

	@Override
	public List<CostVO> getChartCostByCloud(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.getChartCostByCloud(costVO);
	}

	@Override
	public List<CostVO> getReSizeCnt(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.getReSizeCnt(costVO);
	}
	
	@Override
	public List<CostVO> getAllSizeCnt(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.getAllSizeCnt(costVO);
	}
	
	@Override
	public List<CostVO> getCostChart(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.getCostChart(costVO);
	}
	
	@Override
	public List<CostVO> getOrgCostChart(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.getOrgCostChart(costVO);
	}
	
	@Override
	public List<CostVO> getResizeCostChart(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.getResizeCostChart(costVO);
	}
	
	@Override
	public List<CostVO> getTrafficChart(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.getTrafficChart(costVO);
	}

	@Override
	public List<CostVO> getSiteList(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.getSiteList(costVO);
	}

	@Override
	public List<CostVO> selectAllResourceByStatus(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectAllResourceByStatus(costVO);
	}

	@Override
	public List<CostVO> selectAllResourceByPage(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectAllResourceByPage(costVO);
	}

	@Override
	public List<CostVO> selectAllResourceByStatusByPage(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectAllResourceByStatusByPage(costVO);
	}

	@Override
	public List<CostVO> selectAllResourceByDate(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectAllResourceByDate(costVO);
	}
	

	@Override
	public List<OptimizerVO> selectResourceListByParentIdTraffic(OptimizerVO optimizerVO) {
		return costMapper.selectResourceListByParentIdTraffic(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> countResourceGroupByResourceParentNoTraffic(OptimizerVO optimizerVO) {
		return costMapper.countResourceGroupByResourceParentNoTraffic(optimizerVO);
	}

	@Override
	public List<HashMap<String, Object>> selectResourceFolderAllTraffic(OptimizerVO optimizerVO) {
		return costMapper.selectResourceFolderAllTraffic(optimizerVO);
	}

	@Override
	public List<CostVO> selectContentTable_use(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectContentTable_use(costVO);
	}
	@Override
	public List<CostVO> selectContentTable_dontuse(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectContentTable_dontuse(costVO);
	}
	@Override
	public List<CostVO> selectContentTable_gone(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectContentTable_gone(costVO);
	}

	@Override
	public List<CostVO> selectContentAll(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectContentAll(costVO);
	}

	@Override
	public List<CostVO> selectUseOrNot(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectUseOrNot(costVO);
	}

	@Override
	public List<CostVO> selectAvgComp(CostVO costVO) {
		// TODO Auto-generated method stub
		return costMapper.selectAvgComp(costVO);
	}
}
