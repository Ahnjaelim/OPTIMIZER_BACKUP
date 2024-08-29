package com.wellconn.optimizer.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.wellconn.optimizer.mapper.CloudMapper;
import com.wellconn.optimizer.model.CloudVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CloudServiceImpl implements CloudService{
	
	private final CloudMapper cloudMapper;
	
	@Override
	public CloudVO selectCloudByCloudNo(CloudVO cloudVO) {
		return cloudMapper.selectCloudByCloudNo(cloudVO);
	}

	@Override
	public List<CloudVO> selectCloudAll(CloudVO cloudVO) {
		return cloudMapper.selectCloudAll(cloudVO);
	}

	@Override
	public int insertCloud(CloudVO cloudVO) {
		return cloudMapper.insertCloud(cloudVO);
	}

	@Override
	public int updateCloud(CloudVO cloudVO) {
		return cloudMapper.updateCloud(cloudVO);
	}

	@Override
	public int deleteCloud(CloudVO cloudVO) {
		return cloudMapper.deleteCloud(cloudVO);
	}

}
