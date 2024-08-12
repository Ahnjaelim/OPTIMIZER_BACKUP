package com.wellconn.optimizer.mapper;

import java.util.HashMap;
import java.util.List;

import com.wellconn.optimizer.model.OptimizerPageVO;
import com.wellconn.optimizer.model.OptimizerVO;

public interface OptimizerPageMapper {

	List<OptimizerPageVO> selectAll(OptimizerPageVO optimizerPageVO);
	List<OptimizerPageVO> selectPageAll(OptimizerPageVO optimizerPageVO);
	OptimizerPageVO selectByPageNo(OptimizerPageVO optimizerPageVO);
	List<OptimizerPageVO> selectPageAllByResourceNo(OptimizerPageVO optimizerPageVO);
	List<OptimizerPageVO> selectPageParentAllByPageNo(OptimizerPageVO optimizerPageVO);
	List<OptimizerPageVO> selectRecursivePageAllByPageNo(OptimizerPageVO optimizerPageVO);
	OptimizerPageVO selectPageByPageName(OptimizerPageVO optimizerPageVO);
	int updateLazyloadButton(OptimizerPageVO optimizerPageVO); // Lazyload설정 
	int updateLazyloadButtonAll (OptimizerPageVO optimizerPageVO); // Lazyload 모두 선택
	List<OptimizerPageVO> updateLazyloadStatus(OptimizerPageVO optimizerPageVO);
	
	List<HashMap<String, Object>> selectPageSpeedLog(OptimizerPageVO optimizerPageVO);
	
	List<HashMap<String, Object>> selectQueryTest(OptimizerPageVO optimizerPageVO);
	
	
}
