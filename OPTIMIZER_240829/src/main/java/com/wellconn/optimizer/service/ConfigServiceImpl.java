package com.wellconn.optimizer.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.wellconn.optimizer.mapper.ConfigMapper;
import com.wellconn.optimizer.model.ConfigVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConfigServiceImpl implements ConfigService {

	private final ConfigMapper configMapper;

	@Override
	public String selectNow() {
		return configMapper.selectNow();
	}

	@Override
	public List<ConfigVO> selectConfigAll(ConfigVO configVO) {
		return configMapper.selectConfigAll(configVO);
	}

	@Override
	public ConfigVO selectConfigByKey(ConfigVO configVO) {
		return configMapper.selectConfigByKey(configVO);
	}

	@Override
	public int updateConfig(ConfigVO configVO) {
		return configMapper.updateConfig(configVO);
	}
	
}
