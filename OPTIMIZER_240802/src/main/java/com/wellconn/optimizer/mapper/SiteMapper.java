package com.wellconn.optimizer.mapper;

import java.util.List;

import com.wellconn.optimizer.model.CloudVO;
import com.wellconn.optimizer.model.SiteManageVO;

public interface SiteMapper {

	List<CloudVO> selectSiteAll(SiteManageVO siteManageVO);

	List<SiteManageVO> selectTopbarSiteList(SiteManageVO siteManageVO);
	List<CloudVO> selectCloud(CloudVO cloudVO);

	int insertSite(SiteManageVO siteManageVO);

	
	List<SiteManageVO>selectSiteAllByCloudNo(SiteManageVO siteManageVO);
	List<SiteManageVO>selectSiteAllBySiteNo(SiteManageVO siteManageVO);

	int deleteSite(SiteManageVO siteManageVO);

	int updateSite(SiteManageVO siteManageVO);

	List<SiteManageVO> selectSiteBySiteNo(SiteManageVO siteManageVO);

	List<SiteManageVO> selectDuplicateSiteNm(SiteManageVO siteManageVO);

	List<SiteManageVO> selectDuplicateSiteAdd(SiteManageVO siteManageVO);
	
	List<SiteManageVO> selectSiteAllForList();
//	String selectNow();
//	List<CloudVO> selectCloudAll(CloudVO cloudVO);
//	CloudVO selectCloudByCloudNo(CloudVO cloudVO);
	
	SiteManageVO selectFirstSite(SiteManageVO siteManageVO);
}
