package com.wellconn.optimizer.mapper;

import java.util.List;

import com.wellconn.optimizer.model.UserVO;

public interface UserMapper {
	String selectNow();
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
	
	int updateUserStep(UserVO userVO);
	
	UserVO selectUserBySn(UserVO userVO);
}
