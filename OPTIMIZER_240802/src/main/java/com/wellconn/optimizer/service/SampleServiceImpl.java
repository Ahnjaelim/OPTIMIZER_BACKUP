package com.wellconn.optimizer.service;

import org.springframework.stereotype.Service;

import com.wellconn.optimizer.mapper.SampleMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SampleServiceImpl implements SampleService {

	private final SampleMapper sampleMapper;
	
	@Override
	public String selectNow() {
		return sampleMapper.selectNow();
	}

}
