package com.wellconn.optimizerdemo.mapper;

import java.util.HashMap;
import java.util.List;

import com.wellconn.optimizerdemo.model.PageVO;
import com.wellconn.optimizerdemo.model.ResourceVO;

public interface PageMapper {
	
	PageVO selectPageByPageUrl(PageVO pageVO);
	PageVO selectPageByPageNo(PageVO pageVO);
	int updatePageCollStatus(PageVO pageVO);
	int updatePageOptStatus(PageVO pageVO);
	int updatePageResult(PageVO pageVO);
	int updateOldPage(PageVO pageVO);
	int insertPage(PageVO pageVO);
}
