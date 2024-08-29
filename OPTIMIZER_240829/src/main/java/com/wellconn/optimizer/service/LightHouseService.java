package com.wellconn.optimizer.service;

import java.util.List;

import com.wellconn.optimizer.model.LightHouseVO;
import com.wellconn.optimizer.model.UserVO;

public interface LightHouseService {

	String selectNow();
	int insertLightHouse(LightHouseVO lightHouseVO);
	LightHouseVO selectLightHouse(LightHouseVO lightHouseVO);
}
