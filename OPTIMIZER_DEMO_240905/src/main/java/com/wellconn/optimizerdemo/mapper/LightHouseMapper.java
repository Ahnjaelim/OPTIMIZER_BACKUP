package com.wellconn.optimizerdemo.mapper;

import com.wellconn.optimizerdemo.model.LightHouseVO;

public interface LightHouseMapper {
	
	String selectNow();
	int insertLightHouse(LightHouseVO lightHouseVO);
	LightHouseVO selectLightHouse(LightHouseVO lightHouseVO);
}
