package com.wellconn.optimizer.mapper;

import java.util.HashMap;
import java.util.List;

import com.wellconn.optimizer.model.ReportVO;


public interface ReportMapper {

	List<ReportVO> contentChartAll(ReportVO reportVO);

	List<ReportVO> selectAvgTimeGroup(ReportVO reportVO);

	List<ReportVO> selectTimetableFast(ReportVO reportVO);

	List<ReportVO> selectTimetableSlow(ReportVO reportVO);

	List<ReportVO> getUrlFastTop10(ReportVO reportVO);

	List<ReportVO> getUrlSlowTop10(ReportVO reportVO);

	List<ReportVO> getUrl(ReportVO reportVO);
	List<ReportVO> getUrlforReport(ReportVO reportVO);
	
	List<ReportVO> optimizer_title(ReportVO reportVO);

	List<ReportVO> optimizer_list(ReportVO reportVO);

	List<ReportVO> selectAllresource(ReportVO reportVO);

	List<ReportVO> selectAllresourceForReport(ReportVO reportVO);
	
	List<ReportVO> selectSite(ReportVO reportVO);

	List<ReportVO> selectTimeResourceForReport(ReportVO reportVO);

	List<ReportVO> selectAvgComp(ReportVO reportVO);

	List<ReportVO> selectSizeGoodTable(ReportVO reportVO);
	List<ReportVO> selectSizeBadTable(ReportVO reportVO);

	List<ReportVO> selectAvgPerGroup(ReportVO reportVO);
	

}
