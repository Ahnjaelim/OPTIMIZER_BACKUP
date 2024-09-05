package com.wellconn.optimizerdemo.service;

import com.wellconn.optimizerdemo.model.LightHouseVO;

public interface LightHouseService {

	String selectNow();
	int insertLightHouse(LightHouseVO lightHouseVO);
	LightHouseVO selectLightHouse(LightHouseVO lightHouseVO);
}
