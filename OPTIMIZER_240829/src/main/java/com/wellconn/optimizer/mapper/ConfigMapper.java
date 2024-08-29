package com.wellconn.optimizer.mapper;

import java.util.List;

import com.wellconn.optimizer.model.ConfigVO;

public interface ConfigMapper {

	String selectNow();
	List<ConfigVO> selectConfigAll(ConfigVO configVO);
	ConfigVO selectConfigByKey(ConfigVO configVO);
	int updateConfig(ConfigVO configVO);
}
