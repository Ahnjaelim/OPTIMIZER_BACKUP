package com.wellconn.optimizer.service;

import java.util.HashMap;
import java.util.List;

import com.wellconn.optimizer.model.OptimizerPageVO;

public interface OptimizerPageService {

	List<OptimizerPageVO> selectAll(OptimizerPageVO optimizerPageVO);
	List<OptimizerPageVO> selectPageAll(OptimizerPageVO optimizerPageVO);
	List<OptimizerPageVO> getResourceTreeRecursive(OptimizerPageVO optimizerPageVO);
	String convertToJSTreeFormat(List<OptimizerPageVO> optimizerPageVOList);
	OptimizerPageVO selectByPageNo(OptimizerPageVO optimizerPageVO);
	List<OptimizerPageVO> selectPageAllByResourceNo(OptimizerPageVO optimizerPageVO);
	String selectPageAllByResourceNoAdvanced(OptimizerPageVO optimizerPageVO);
	List<OptimizerPageVO> selectRecursivePageAllByPageNo(OptimizerPageVO optimizerPageVO);
	OptimizerPageVO selectPageByPageName(OptimizerPageVO optimizerPageVO);
	int updateLazyloadButton(OptimizerPageVO optimizerPageVO); // Lazyload설정
	int updateLazyloadButtonAll(OptimizerPageVO optimizerPageVO); // Lazyload전체 선택
	List<OptimizerPageVO> updateLazyloadStatus(OptimizerPageVO optimizerPageVO);
	
	List<HashMap<String, Object>> selectPageSpeedLog(OptimizerPageVO optimizerPageVO);
	
	List<HashMap<String, Object>> selectQueryTest(OptimizerPageVO optimizerPageVO);
	OptimizerPageVO selectFirstPage(OptimizerPageVO optimizerPageVO);
}
