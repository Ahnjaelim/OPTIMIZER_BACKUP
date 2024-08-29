package com.wellconn.optimizer.mapper;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.wellconn.optimizer.model.CloudVO;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = "file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class CloudMapperTest {

	@Autowired
	CloudMapper cloudMapper;
	
	// @Test
	public void selectNow() {
		System.out.println(cloudMapper.selectNow());
	}
	
	@Test
	public void selectAllTest() {
	}

}
