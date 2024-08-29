package com.wellconn.optimizer.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.wellconn.optimizer.mapper.LightHouseMapper;
import com.wellconn.optimizer.mapper.UserMapper;
import com.wellconn.optimizer.model.LightHouseVO;
import com.wellconn.optimizer.model.UserVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LightHouseServiceImpl implements LightHouseService {
	
	private final LightHouseMapper lightHouseMapper;

	@Override
	public String selectNow() {
		return lightHouseMapper.selectNow();
	}

	@Override
	public int insertLightHouse(LightHouseVO lightHouseVO) {
		return lightHouseMapper.insertLightHouse(lightHouseVO);
	}

	@Override
	public LightHouseVO selectLightHouse(LightHouseVO lightHouseVO) {
		return lightHouseMapper.selectLightHouse(lightHouseVO);
	}

}
