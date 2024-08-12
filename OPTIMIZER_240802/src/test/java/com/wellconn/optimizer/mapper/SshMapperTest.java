package com.wellconn.optimizer.mapper;

import java.io.InputStream;
import java.util.Properties;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.wellconn.optimizer.config.AppProperties;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = "file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class SshMapperTest {

	@Autowired
	SshMapper sshMapper;

	// @Test
	public void selectNow() {
		System.out.println(sshMapper.selectNow());
	}
	
	@Test
	public void selectAllTest() {
        // 변수에 값 할당
        // String syncUrl = properties.getProperty("syncUrl");
        System.out.println(AppProperties.getSyncUrl());

        // 변수들을 사용하여 다른 작업 수행
        // ...
	}


}
