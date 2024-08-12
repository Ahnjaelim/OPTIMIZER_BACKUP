package com.wellconn.optimizer.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.wellconn.optimizer.mapper.AlgorithmMapper;
import com.wellconn.optimizer.mapper.AnalysisMapper;
import com.wellconn.optimizer.mapper.CloudMapper;
import com.wellconn.optimizer.model.AlgorithmVO;
import com.wellconn.optimizer.model.AnalysisVO;
import com.wellconn.optimizer.model.CloudVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnalysisServiceImpl implements AnalysisService{
	
	private final AnalysisMapper analysisMapper;

	@Override
	public List<AnalysisVO> seletAll(AnalysisVO analysisVO) {
		// TODO Auto-generated method stub
		return analysisMapper.seletAll(analysisVO);
	}
	
}
