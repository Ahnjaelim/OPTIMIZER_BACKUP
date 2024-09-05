package com.wellconn.optimizerdemo.service;

import java.io.File;
import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellconn.optimizerdemo.mapper.ResourceMapper;
import com.wellconn.optimizerdemo.mapper.PageMapper;
import com.wellconn.optimizerdemo.model.PageVO;
import com.wellconn.optimizerdemo.model.ResourceVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PageServiceImpl implements PageService{

	private final PageMapper pageMapper;

	@Override
	public PageVO selectPageByPageUrl(PageVO pageVO) {
		return pageMapper.selectPageByPageUrl(pageVO);
	}

	@Override
	public PageVO selectPageByPageNo(PageVO pageVO) {
		return pageMapper.selectPageByPageNo(pageVO);
	}

	@Override
	public int updatePageCollStatus(PageVO pageVO) {
		return pageMapper.updatePageCollStatus(pageVO);
	}

	@Override
	public int updatePageOptStatus(PageVO pageVO) {
		return pageMapper.updatePageOptStatus(pageVO);
	}

	@Override
	public int updatePageResult(PageVO pageVO) {
		return pageMapper.updatePageResult(pageVO);
	}

	@Override
	public int updateOldPage(PageVO pageVO) {
		return pageMapper.updateOldPage(pageVO);
	}

	@Override
	public int insertPage(PageVO pageVO) {
		return pageMapper.insertPage(pageVO);
	}

}
