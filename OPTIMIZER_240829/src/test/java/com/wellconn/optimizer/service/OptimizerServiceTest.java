package com.wellconn.optimizer.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.wellconn.optimizer.model.OptimizerVO;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = "file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class OptimizerServiceTest {

	@Autowired
	OptimizerService optimizerService;

	@Test
	public void sampleServiceTest() {
		OptimizerVO param = new OptimizerVO();
		List<OptimizerVO> volist = optimizerService.selectAll(param);
		volist.forEach(vo -> System.out.println(vo));
	}
	
	// @Test
	public void countTest() {
		OptimizerVO optimizerVO = new OptimizerVO();
		optimizerVO.getSite_list().add(91);
		List<HashMap<String, Object>> countlist = optimizerService.countResourceGroupByResourceParentNo(optimizerVO);
		for (HashMap<String, Object> map : countlist) {
		    for (Map.Entry<String, Object> entry : map.entrySet()) {
		        String key = entry.getKey();
		        Object value = entry.getValue();
		        System.out.println(key + ": " + value);
		    }
		}		
	}
}
