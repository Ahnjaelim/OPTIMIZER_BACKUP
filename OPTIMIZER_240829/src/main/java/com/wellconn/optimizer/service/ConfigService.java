package com.wellconn.optimizer.service;

import java.util.HashMap;
import java.util.List;

import com.wellconn.optimizer.model.AlertVO;
import com.wellconn.optimizer.model.ConfigVO;



public interface ConfigService {

	String selectNow();
	List<ConfigVO> selectConfigAll(ConfigVO configVO);
	ConfigVO selectConfigByKey(ConfigVO configVO);
	int updateConfig(ConfigVO configVO);
}
