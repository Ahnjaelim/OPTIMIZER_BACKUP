package com.wellconn.optimizer.service;

import java.util.List;

import com.wellconn.optimizer.model.ProjectVO;

public interface ProjectService {

	List<ProjectVO> selectProjectNo(ProjectVO projectVO);
}
