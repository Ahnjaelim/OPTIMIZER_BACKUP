package com.wellconn.optimizer.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.wellconn.optimizer.mapper.CloudMapper;
import com.wellconn.optimizer.mapper.SiteMapper;
import com.wellconn.optimizer.model.CloudVO;
import com.wellconn.optimizer.model.SiteManageVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SiteManageServiceImpl implements SiteManageService{
	
	private final SiteMapper siteMapper;

	@Override
	public List<CloudVO> selectSiteAll(SiteManageVO siteManageVO) {
		// TODO Auto-generated method stub
		return siteMapper.selectSiteAll(siteManageVO);
	}

	@Override
	public List<SiteManageVO> selectTopbarSiteList(SiteManageVO siteManageVO) {
		// TODO Auto-generated method stub
		return siteMapper.selectTopbarSiteList(siteManageVO);
	}


	@Override
	public List<CloudVO> selectCloud(CloudVO cloudVO) {
		// TODO Auto-generated method stub
		return siteMapper.selectCloud(cloudVO);
	}

	@Override
	public int insertSite(SiteManageVO siteManageVO) {
		// TODO Auto-generated method stub
		return siteMapper.insertSite(siteManageVO);
	}


	@Override
	public List<SiteManageVO> selectSiteAllByCloudNo(SiteManageVO siteManageVO) {
		return siteMapper.selectSiteAllByCloudNo(siteManageVO);
	}

	@Override
	public List<SiteManageVO> selectSiteAllBySiteNo(SiteManageVO siteManageVO) {
		return siteMapper.selectSiteAllBySiteNo(siteManageVO);
	}

	@Override
	public int deleteSite(SiteManageVO siteManageVO) {
		// TODO Auto-generated method stub
		return siteMapper.deleteSite(siteManageVO);
	}

	@Override
	public int updateSite(SiteManageVO siteManageVO) {
		// TODO Auto-generated method stub
		return siteMapper.updateSite(siteManageVO);
	}

	@Override
	public List<SiteManageVO> selectSiteBySiteNo(SiteManageVO siteManageVO) {
		// TODO Auto-generated method stub
		return siteMapper.selectSiteBySiteNo(siteManageVO);
	}

	@Override
	public List<SiteManageVO> duplicateSiteNm(SiteManageVO siteManageVO) {
		// TODO Auto-generated method stub
		return siteMapper.selectDuplicateSiteNm(siteManageVO);
	}

	@Override
	public List<SiteManageVO> duplicateSiteAdd(SiteManageVO siteManageVO) {
		// TODO Auto-generated method stub
		return siteMapper.selectDuplicateSiteAdd(siteManageVO);
	}

	@Override
	public List<SiteManageVO> selectSiteAllForList() {
		return siteMapper.selectSiteAllForList();
	}
	


	
	
//	@Override
//	public CloudVO selectCloudByCloudNo(CloudVO cloudVO) {
//		return cloudMapper.selectCloudByCloudNo(cloudVO);
//	}

	
}
