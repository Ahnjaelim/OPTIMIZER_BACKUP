package com.wellconn.optimizer.service;

import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wellconn.optimizer.model.OptimizerLogVO;
import com.wellconn.optimizer.model.OptimizerVO;

public interface OptimizerLogService {

	List<OptimizerLogVO> selectResourceLogAllByResourceNo(OptimizerLogVO optimizerLogVO);
	List<HashMap<String, Object>> countResourceLogAllByResourceNo(OptimizerLogVO optimizerLogVO);
}
