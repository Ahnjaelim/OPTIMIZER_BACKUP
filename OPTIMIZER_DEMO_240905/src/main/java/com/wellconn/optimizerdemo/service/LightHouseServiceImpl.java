package com.wellconn.optimizerdemo.service;

import org.springframework.stereotype.Service;

import com.wellconn.optimizerdemo.mapper.LightHouseMapper;
import com.wellconn.optimizerdemo.model.LightHouseVO;

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
