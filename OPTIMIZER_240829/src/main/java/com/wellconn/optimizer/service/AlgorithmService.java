package com.wellconn.optimizer.service;

import java.util.List;

import com.wellconn.optimizer.model.AlgorithmVO;

public interface AlgorithmService {

	List<AlgorithmVO> seletAll(AlgorithmVO algorithmVO);
	List<AlgorithmVO> selectAlgorithmType(AlgorithmVO algorithmVO);
}
