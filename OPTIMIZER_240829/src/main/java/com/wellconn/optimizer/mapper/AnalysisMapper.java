package com.wellconn.optimizer.mapper;

import java.util.List;

import com.wellconn.optimizer.model.AlgorithmVO;
import com.wellconn.optimizer.model.AnalysisVO;
import com.wellconn.optimizer.model.CloudVO;
import com.wellconn.optimizer.model.SiteManageVO;

public interface AnalysisMapper {

	List<AnalysisVO> seletAll(AnalysisVO analysisVO);
}
