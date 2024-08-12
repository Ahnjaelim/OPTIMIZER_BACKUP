package com.wellconn.optimizer.service;

import java.util.List;

import com.wellconn.optimizer.model.UserVO;

public interface UserService {

	List<UserVO> selectAll(UserVO userVO);
	UserVO selectAllCnt(UserVO userVO);
	List<String> selectUserId();
	UserVO login(UserVO userVO);
	int insertUser(UserVO userVO);
	int updateUser(UserVO userVO);
	int userIdCheck(UserVO userVO);
	int deletedUser(UserVO userVO);
	int updatePasswd(UserVO userVO);
	
	int updateVisitDate(UserVO userVO);
}
