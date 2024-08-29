package com.wellconn.optimizer.mapper;

import java.util.List;

import com.wellconn.optimizer.model.CloudVO;

public interface CloudMapper {

	String selectNow();
	List<CloudVO> selectCloudAll(CloudVO cloudVO);
	CloudVO selectCloudByCloudNo(CloudVO cloudVO);
	int insertCloud(CloudVO cloudVO);
	int updateCloud(CloudVO cloudVO);
	int deleteCloud(CloudVO cloudVO);
}
