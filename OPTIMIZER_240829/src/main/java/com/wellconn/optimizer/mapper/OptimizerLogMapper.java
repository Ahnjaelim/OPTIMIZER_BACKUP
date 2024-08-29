package com.wellconn.optimizer.mapper;

import java.util.HashMap;
import java.util.List;

import com.wellconn.optimizer.model.OptimizerLogVO;
import com.wellconn.optimizer.model.OptimizerVO;

public interface OptimizerLogMapper {

	String selectNow();
	List<OptimizerLogVO> selectResourceLogAllByResourceNo(OptimizerLogVO optimizerLogVO);
	List<HashMap<String, Object>> countResourceLogAllByResourceNo(OptimizerLogVO optimizerLogVO);
}
