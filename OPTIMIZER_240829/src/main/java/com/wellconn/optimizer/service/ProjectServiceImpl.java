package com.wellconn.optimizer.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.wellconn.optimizer.mapper.ProjectMapper;
import com.wellconn.optimizer.model.ProjectVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService{
	
	private final ProjectMapper projectMapper;
	
	@Override
	public List<ProjectVO> selectProjectNo(ProjectVO projectVO) {
		return projectMapper.selectProjectNo(projectVO);
	}

}
