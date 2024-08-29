package com.wellconn.optimizer.service;

import java.util.List;
import java.util.Map;

import com.wellconn.optimizer.model.CloudVO;
import com.wellconn.optimizer.model.SiteManageVO;

public interface SiteManageService {

	List<CloudVO> selectSiteAll(SiteManageVO siteManageVO);

	List<SiteManageVO> selectTopbarSiteList(SiteManageVO siteManageVO);
	
	List<SiteManageVO>selectSiteAllByCloudNo(SiteManageVO siteManageVO);
	List<SiteManageVO>selectSiteAllBySiteNo(SiteManageVO siteManageVO);

	List<CloudVO> selectCloud(CloudVO cloudVO);

	int insertSite(SiteManageVO siteManageVO);

	int deleteSite(SiteManageVO siteManageVO);

	int updateSite(SiteManageVO siteManageVO);

	List<SiteManageVO> selectSiteBySiteNo(SiteManageVO siteManageVO);

	List<SiteManageVO> duplicateSiteNm(SiteManageVO siteManageVO);

	List<SiteManageVO> duplicateSiteAdd(SiteManageVO siteManageVO);

//	List<CloudVO> selectCloudAll(CloudVO cloudVO);
//	CloudVO selectCloudByCloudNo(CloudVO cloudVO);
	

	List<SiteManageVO> selectSiteAllForList();
	
	SiteManageVO selectFirstSite(SiteManageVO siteManageVO);
}
