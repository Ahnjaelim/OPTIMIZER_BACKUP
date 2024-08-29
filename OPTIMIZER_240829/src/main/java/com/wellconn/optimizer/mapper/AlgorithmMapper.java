package com.wellconn.optimizer.mapper;

import java.util.List;

import com.wellconn.optimizer.model.AlgorithmVO;
import com.wellconn.optimizer.model.CloudVO;
import com.wellconn.optimizer.model.SiteManageVO;

public interface AlgorithmMapper {

	List<AlgorithmVO> seletAll(AlgorithmVO algorithmVO);
	List<AlgorithmVO> selectAlgorithmType(AlgorithmVO algorithmVO);
}
