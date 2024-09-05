package com.wellconn.optimizerdemo.service;

import java.util.HashMap;
import java.util.List;

import com.wellconn.optimizerdemo.model.PageVO;

public interface PageService {
	
	PageVO selectPageByPageUrl(PageVO pageVO);
	PageVO selectPageByPageNo(PageVO pageVO);
	int updatePageCollStatus(PageVO pageVO);
	int updatePageOptStatus(PageVO pageVO);
	int updatePageResult(PageVO pageVO);
	int updateOldPage(PageVO pageVO);
	int insertPage(PageVO pageVO);	
}
