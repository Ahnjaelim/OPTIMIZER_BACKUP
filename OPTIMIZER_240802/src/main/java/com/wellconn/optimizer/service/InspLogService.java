package com.wellconn.optimizer.service;

import java.util.List;
import java.util.Map;

import com.wellconn.optimizer.model.InspLogVO;
import com.wellconn.optimizer.model.OptimizerMenuVO;

public interface InspLogService {

	List<InspLogVO> selectAll(InspLogVO inspLogVO);
	InspLogVO selectAllCnt(InspLogVO inspLogVO);
	InspLogVO selectMenuSn(InspLogVO inspLogVO);
	int insertUserLog(InspLogVO inspLogVO);
		/**
		 * 1. 메소드명 : menuInit
		 * 2. 작성일: 2024. 7. 2.
		 * 3. 작성자: doil
		 * 4. 설명: 
		 * 5. 수정일: doil
		 */
	Map<Integer, List<OptimizerMenuVO> > menuInit();
	
}
