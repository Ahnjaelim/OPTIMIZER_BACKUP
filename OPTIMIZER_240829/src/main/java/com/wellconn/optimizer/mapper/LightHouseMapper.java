package com.wellconn.optimizer.mapper;

import java.util.List;

import com.wellconn.optimizer.model.LightHouseVO;
import com.wellconn.optimizer.model.UserVO;

public interface LightHouseMapper {
	
	String selectNow();
	int insertLightHouse(LightHouseVO lightHouseVO);
	LightHouseVO selectLightHouse(LightHouseVO lightHouseVO);
}
