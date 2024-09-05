package com.wellconn.optimizerdemo.mapper;

import java.util.HashMap;
import java.util.List;

import com.wellconn.optimizerdemo.model.PageVO;
import com.wellconn.optimizerdemo.model.ResourceVO;

public interface ResourceMapper {

	String selectNow();
	List<ResourceVO> selectResourceAllByPageNo(ResourceVO resourceVO);
	List<ResourceVO> selectResourceAllByPageNoTabulator(ResourceVO resourceVO);
	List<HashMap<String, Object>> selectResourceTypeCountByPage(ResourceVO resourceVO);
	HashMap<String, Object> selectResourceTimeAnalysisByPage(ResourceVO resourceVO);
	int updateResourceStatusByPage(ResourceVO resourceVO);
	int updateResourceStatusByNid(ResourceVO resourceVO);
	
}
