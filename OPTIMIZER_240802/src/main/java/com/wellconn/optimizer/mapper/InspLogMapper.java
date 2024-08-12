package com.wellconn.optimizer.mapper;

import java.util.List;
import java.util.Map;

import com.wellconn.optimizer.model.InspLogVO;
import com.wellconn.optimizer.model.OptimizerMenuVO;

public interface InspLogMapper {

	List<InspLogVO> selectAll(InspLogVO inspLogVO);
	InspLogVO selectAllCnt(InspLogVO inspLogVO);
	InspLogVO selectMenuSn(InspLogVO inspLogVO);
	int insertUserLog(InspLogVO inspLogVO);
		
	List<OptimizerMenuVO> menuInit();
}
