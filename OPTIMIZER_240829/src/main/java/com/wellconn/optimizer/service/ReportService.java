package com.wellconn.optimizer.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.wellconn.optimizer.model.CostVO;
import com.wellconn.optimizer.model.ReportVO;
//d


public interface ReportService {

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

	List<ReportVO> selectSite(ReportVO reportVO);
	
	List<ReportVO> selectAllresourceForReport(ReportVO reportVO);
	
	byte[] createExcel(ReportVO reportVO) throws IOException, InvalidFormatException;
	byte[] createExcelV2(ReportVO reportVO) throws IOException, InvalidFormatException;

	List<ReportVO> selectAvgComp(ReportVO reportVO);

	List<ReportVO> selectSizeGoodTable(ReportVO reportVO);

	List<ReportVO> selectSizeBadTable(ReportVO reportVO);



}
