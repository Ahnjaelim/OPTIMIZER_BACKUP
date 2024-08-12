package com.wellconn.optimizer.service;

import java.util.List;

import com.wellconn.optimizer.model.CloudVO;

public interface CloudService {

	List<CloudVO> selectCloudAll(CloudVO cloudVO);
	CloudVO selectCloudByCloudNo(CloudVO cloudVO);
	int insertCloud(CloudVO cloudVO);
	int updateCloud(CloudVO cloudVO);
	int deleteCloud(CloudVO cloudVO);
}
