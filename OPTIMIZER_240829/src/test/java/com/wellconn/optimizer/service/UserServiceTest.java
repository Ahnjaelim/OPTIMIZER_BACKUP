package com.wellconn.optimizer.service;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.wellconn.optimizer.model.UserVO;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = "file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class UserServiceTest {

	@Autowired
	UserService userService;

	@Test
	public void sampleServiceTest(UserVO userVO) {
		List<UserVO> volist = userService.selectAll(userVO);
		volist.forEach(vo -> System.out.println(vo));
	}
}
