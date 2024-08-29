package com.wellconn.optimizer.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = "file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class SampleServiceTest {

		@Autowired
		SampleService sampleService;
		
		@Test
		public void sampleServiceTest() {
			System.out.println(sampleService.selectNow());
		}
}
