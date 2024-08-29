package com.wellconn.optimizer.service;

import java.util.List;

import com.wellconn.optimizer.model.AlgorithmVO;
import com.wellconn.optimizer.model.AnalysisVO;

public interface AnalysisService {

	List<AnalysisVO> seletAll(AnalysisVO analysisVO);
}
