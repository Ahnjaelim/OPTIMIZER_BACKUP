package com.wellconn.optimizer.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.wellconn.optimizer.mapper.AlgorithmMapper;
import com.wellconn.optimizer.mapper.CloudMapper;
import com.wellconn.optimizer.model.AlgorithmVO;
import com.wellconn.optimizer.model.CloudVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AlgorithmServiceImpl implements AlgorithmService{
	
	private final AlgorithmMapper algorithmMapper;
	
	
	@Override
	public List<AlgorithmVO> seletAll(AlgorithmVO algorithmVO) {
		// TODO Auto-generated method stub
		return algorithmMapper.seletAll(algorithmVO);
	}


	@Override
	public List<AlgorithmVO> selectAlgorithmType(AlgorithmVO algorithmVO) {
		// TODO Auto-generated method stub
		return algorithmMapper.selectAlgorithmType(algorithmVO);
	}

}
