package com.wellconn.optimizer.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.wellconn.optimizer.mapper.OptimizerLogMapper;
import com.wellconn.optimizer.model.OptimizerLogVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OptimizerLogServiceImpl implements OptimizerLogService{

	private final OptimizerLogMapper optimizerLogMapper;

	@Override
	public List<OptimizerLogVO> selectResourceLogAllByResourceNo(OptimizerLogVO optimizerLogVO) {
		return optimizerLogMapper.selectResourceLogAllByResourceNo(optimizerLogVO);
	}

	@Override
	public List<HashMap<String, Object>> countResourceLogAllByResourceNo(OptimizerLogVO optimizerLogVO) {
		return optimizerLogMapper.countResourceLogAllByResourceNo(optimizerLogVO);
	}


	
}
