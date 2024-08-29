package com.wellconn.optimizer.mapper;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = "file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class SampleMapperTest {

	@Autowired
	SampleMapper sampleMapper;
	
	@Test
	public void selectNow() {
		System.out.println(sampleMapper.selectNow());
	} 
}
