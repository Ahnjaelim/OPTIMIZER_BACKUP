package com.wellconn.optimizer.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.wellconn.optimizer.mapper.UserMapper;
import com.wellconn.optimizer.model.UserVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserMapper userMapper;

	@Override
	public List<UserVO> selectAll(UserVO userVO) {
		return userMapper.selectAll(userVO);
	}

	@Override
	public UserVO selectAllCnt(UserVO userVO) {
		return userMapper.selectAllCnt(userVO);
	}
	
	@Override
	public List<String> selectUserId() {
		return userMapper.selectUserId();
	}

	@Override
	public UserVO login(UserVO userVO) {
		return userMapper.login(userVO);
	}

	@Override
	public int insertUser(UserVO userVO) {
		return userMapper.insertUser(userVO);
	}
	
	@Override
	public int updateUser(UserVO userVO) {
		return userMapper.updateUser(userVO);
	}

	@Override
	public int userIdCheck(UserVO userVO) {
		return userMapper.userIdCheck(userVO);
	}
	
	@Override
	public int deletedUser(UserVO userVO) {
		return userMapper.deletedUser(userVO);
	}
	
	@Override
	public int updatePasswd(UserVO userVO) {
		return userMapper.updatePasswd(userVO);
	}

	@Override
	public int updateVisitDate(UserVO userVO) {
		return userMapper.updateVisitDate(userVO);
	}

	@Override
	public int updateUserStep(UserVO userVO) {
		return userMapper.updateUserStep(userVO);
	}

	@Override
	public UserVO selectUserBySn(UserVO userVO) {
		return userMapper.selectUserBySn(userVO);
	}

}
