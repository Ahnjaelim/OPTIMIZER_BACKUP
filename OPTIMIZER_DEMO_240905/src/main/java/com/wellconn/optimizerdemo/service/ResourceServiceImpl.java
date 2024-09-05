package com.wellconn.optimizerdemo.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.WebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellconn.optimizerdemo.mapper.ResourceMapper;
import com.wellconn.optimizerdemo.model.PageVO;
import com.wellconn.optimizerdemo.model.ResourceVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ResourceServiceImpl implements ResourceService{

	private final ResourceMapper resourceMapper;

	@Override
	public String selectNow() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ResourceVO> selectResourceAllByPageNo(ResourceVO resourceVO) {
		return resourceMapper.selectResourceAllByPageNo(resourceVO);
	}

	@Override
	public List<HashMap<String, Object>> selectResourceTypeCountByPage(ResourceVO resourceVO) {
		return resourceMapper.selectResourceTypeCountByPage(resourceVO);
	}

	@Override
	public HashMap<String, Object> selectResourceTimeAnalysisByPage(ResourceVO resourceVO) {
		return resourceMapper.selectResourceTimeAnalysisByPage(resourceVO);
	}

	@Override
	public List<ResourceVO> selectResourceAllByPageNoTabulator(ResourceVO resourceVO) {
		return resourceMapper.selectResourceAllByPageNoTabulator(resourceVO);
	}

	@Override
	public int updateResourceStatusByPageNo(ResourceVO resourceVO) {
		return resourceMapper.updateResourceStatusByPage(resourceVO);
	}

	@Override
	public int updateResourceStatusByNid(ResourceVO resourceVO) {
		return resourceMapper.updateResourceStatusByNid(resourceVO);
	}
}
