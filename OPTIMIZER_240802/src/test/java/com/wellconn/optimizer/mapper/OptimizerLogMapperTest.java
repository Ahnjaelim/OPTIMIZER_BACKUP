package com.wellconn.optimizer.mapper;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.wellconn.optimizer.model.OptimizerLogVO;
import com.wellconn.optimizer.model.OptimizerPageVO;
import com.wellconn.optimizer.model.OptimizerVO;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = "file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class OptimizerLogMapperTest {

	@Autowired
	OptimizerLogMapper optimizerLogMapper;
	
	// @Test
	public void selectNow() {
		System.out.println(optimizerLogMapper.selectNow());
	}
	
	@Test
	public void selectAllTest1() {
		OptimizerLogVO param = new OptimizerLogVO();
		param.setResource_no(4);
		List<OptimizerLogVO> volist = optimizerLogMapper.selectResourceLogAllByResourceNo(param);
		volist.forEach(vo -> System.out.println(vo));
	}

}
