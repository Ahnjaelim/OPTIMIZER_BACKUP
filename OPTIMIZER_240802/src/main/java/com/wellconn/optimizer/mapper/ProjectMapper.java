package com.wellconn.optimizer.mapper;

import java.util.List;

import com.wellconn.optimizer.model.ProjectVO;

public interface ProjectMapper {

	List<ProjectVO> selectProjectNo(ProjectVO projectVO);
}
