package com.wellconn.optimizer.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.wellconn.optimizer.model.OptimizerPageVO;
import com.wellconn.optimizer.model.OptimizerVO;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = "file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class OptimizerMapperTest {

	@Autowired
	OptimizerMapper optimizerMapper;
	
	// @Test
	public void selectAllTest() {
		OptimizerVO optimizerVO = new OptimizerVO();
		optimizerVO.setCloud_no(1);
		List<OptimizerVO> volist = optimizerMapper.selectResourceAllByCloudNo(optimizerVO);
		volist.forEach(vo -> System.out.println(vo));
	}

	//@Test
	public void selectTest02() {
		OptimizerVO optimizerVO = new OptimizerVO();
		optimizerVO.setResource_type(1);
		ArrayList<Integer> site_list = new ArrayList<Integer>();
		site_list.add(1);
		site_list.add(99);
		optimizerVO.setSite_list(site_list);
		optimizerVO.setResource_status(99);
		optimizerVO.setCnt_mode(1);
		
		List<OptimizerVO> volist = optimizerMapper.selectResourceAllByResourceType(optimizerVO);
		volist.forEach(vo -> System.out.println(vo.getResource_status()));
	}
	
	@Test
	public void selectCountTest() {
		OptimizerVO optimizerVO = new OptimizerVO();
		List<HashMap<String, Object>> volist = optimizerMapper.countResourceGroupByResourceType(optimizerVO);
		volist.forEach(vo -> System.out.println(vo));
		
	}
}
