package com.wellconn.optimizerdemo.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.WebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellconn.optimizerdemo.mapper.ResourceMapper;
import com.wellconn.optimizerdemo.model.PageVO;
import com.wellconn.optimizerdemo.model.ResourceVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService{
	
	
	@Override
    public void createExcel(HttpServletResponse response, List<List<String>> data, ArrayList<Integer> rowMergeList) throws IOException {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("OPTIMIZER 벤치마크 테스트");

            // 행 높이 설정
            sheet.setDefaultRowHeight((short) (20 * 20));

            for (int i = 0; i < data.size(); i++) {
                Row row = sheet.createRow(i);
                List<String> rowData = data.get(i);
                for (int j = 0; j < rowData.size(); j++) {
                    Cell cell = row.createCell(j);
                    cell.setCellValue(rowData.get(j));
                }
            }

            // 첫 번째 행과 두 번째 행 병합 및 스타일 적용
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 3)); // 제목
            sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 3));
            //개요
            sheet.addMergedRegion(new CellRangeAddress(2, 4, 0, 0));
            sheet.addMergedRegion(new CellRangeAddress(2, 4, 1, 3));
            // 사이트 주소
            sheet.addMergedRegion(new CellRangeAddress(5, 5, 1, 3));
            
            // 7~14는 그냥 일반 셀
            
            // 총평
            sheet.addMergedRegion(new CellRangeAddress(14, 14, 0, 3)); // 총평
            sheet.addMergedRegion(new CellRangeAddress(15, 25, 0, 3)); // 총평 내용
            
            sheet.addMergedRegion(new CellRangeAddress(26, 26, 0, 3)); // 여백
            sheet.addMergedRegion(new CellRangeAddress(27, 27, 0, 3)); // 웹 콘텐츠 현황
            
            for (int i = 0; i < rowMergeList.size(); i++) {
                Integer row_no = rowMergeList.get(i);
                sheet.addMergedRegion(new CellRangeAddress(row_no, row_no, 0, 3)); 
            }
            
            Row firstRow = sheet.getRow(0);
            Row secondRow = sheet.getRow(1);

            // 첫 번째 행 스타일 적용
            for (int i = 0; i < 4; i++) {
                Cell cell = firstRow.getCell(i);
                if (cell == null) {
                    cell = firstRow.createCell(i);
                }
                cell.setCellStyle(createTitleStyle(workbook));
            }

            firstRow.setHeightInPoints(40);            
            

            // 두 번째 행 스타일 적용
            /*for (int i = 0; i < 4; i++) {
                Cell cell = secondRow.getCell(i);
                if (cell == null) {
                    cell = secondRow.createCell(i);
                }
                cell.setCellStyle(createSubtitleStyle(workbook));
            }*/

            // 나머지 셀 스타일 적용
            for (int i = 1; i < data.size(); i++) {
                Row row = sheet.getRow(i);
                for (int j = 0; j < data.get(i).size(); j++) {
                    Cell cell = row.getCell(j);
                    CellStyle style = j == 0 ? createHeaderStyle(workbook) : createCellStyle(workbook);
                    if(i == 6 || i == 24 || i == 28) {
                    	style = createHeaderStyle(workbook);
                    }
                    if(i == 1 || i == 2 || i == 5 || i == 15) {
                    	if(j == 1) {
                    		style = createCellStyleLeft(workbook);                    		
                    	}
                    	if(i == 15) {
                    		style = createCellStyleLeft(workbook);                    		                    		
                    	}
                    }
                    if(i == 26) {
                    	style = createBlankStyle(workbook);
                    }
                    cell.setCellStyle(style);
                    
                    // 줄바꿈이 있는 텍스트 처리
                    if (cell.getStringCellValue().contains("\n")) {
                        style.setWrapText(true);
                        cell.setCellStyle(style);
                        row.setHeight((short) -1); // 자동 행 높이 설정
                    }
                }
            }            

            for (int i = 0; i < rowMergeList.size(); i++) {
                Integer row_no = rowMergeList.get(i)+1;
                Row row = sheet.getRow(row_no);
                for (int j = 0; j < data.get(row_no).size(); j++) {
                	Cell cell = row.getCell(j);         
                	CellStyle style = createHeaderStyle(workbook);
                	cell.setCellStyle(style);
                }
            }            
            
            // 열 너비 설정 (픽셀 단위)
            sheet.setColumnWidth(0, 30 * 256); // 약 20 문자 너비
            sheet.setColumnWidth(1, 30 * 256);
            sheet.setColumnWidth(2, 30 * 256);
            sheet.setColumnWidth(3, 30 * 256);

        	LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String formattedDate = now.format(formatter);
            
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=OPTIMIZER_REPORT_"+formattedDate+".xlsx");

            workbook.write(response.getOutputStream());
        }
    }

    private CellStyle createTitleStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setFillForegroundColor(IndexedColors.GREY_40_PERCENT.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        Font font = workbook.createFont();
        font.setBold(true);
        font.setFontHeightInPoints((short) 14);
        style.setFont(font);
        return style;
    }

    private CellStyle createSubtitleStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setFillForegroundColor(IndexedColors.LIGHT_TURQUOISE.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        Font font = workbook.createFont();
        font.setBold(true);
        font.setFontHeightInPoints((short) 12);
        style.setFont(font);
        return style;
    }

    private CellStyle createHeaderStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        Font font = workbook.createFont();
        font.setBold(true);
        style.setFont(font);
        return style;
    }

    private CellStyle createCellStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        style.setAlignment(HorizontalAlignment.CENTER);      
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        Font font = workbook.createFont();
        font.setFontHeightInPoints((short) 12);
        return style;
    }
    
    private CellStyle createCellStyleLeft(Workbook workbook) {
    	CellStyle style = workbook.createCellStyle();
    	style.setAlignment(HorizontalAlignment.LEFT);      
    	style.setVerticalAlignment(VerticalAlignment.CENTER);
    	style.setBorderTop(BorderStyle.THIN);
    	style.setBorderBottom(BorderStyle.THIN);
    	style.setBorderLeft(BorderStyle.THIN);
    	style.setBorderRight(BorderStyle.THIN);
    	Font font = workbook.createFont();
    	font.setFontHeightInPoints((short) 12);
    	return style;
    }
    
    private CellStyle createBlankStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        style.setAlignment(HorizontalAlignment.LEFT);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setBorderTop(BorderStyle.NONE);
        style.setBorderBottom(BorderStyle.NONE);
        style.setBorderLeft(BorderStyle.NONE);
        style.setBorderRight(BorderStyle.NONE);
        return style;
    }
}
