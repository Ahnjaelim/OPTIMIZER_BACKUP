package com.wellconn.optimizerdemo.util;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public class ExcelDownloader {

    public void downloadExcel(HttpServletResponse response, List<Map<String, Object>> data) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Data");

        // 헤더 생성 (데이터의 첫 번째 행을 기반으로)
        if (!data.isEmpty()) {
            Row headerRow = sheet.createRow(0);
            int cellNum = 0;
            for (String key : data.get(0).keySet()) {
                headerRow.createCell(cellNum++).setCellValue(key);
            }
        }

        // 데이터 추가
        int rowNum = 1;
        for (Map<String, Object> rowData : data) {
            Row row = sheet.createRow(rowNum++);
            int cellNum = 0;
            for (Object value : rowData.values()) {
                Cell cell = row.createCell(cellNum++);
                if (value instanceof String) {
                    cell.setCellValue((String) value);
                } else if (value instanceof Number) {
                    cell.setCellValue(((Number) value).doubleValue());
                } else if (value instanceof Boolean) {
                    cell.setCellValue((Boolean) value);
                } else {
                    cell.setCellValue(value.toString());
                }
            }
        }

        // 파일 다운로드 설정
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=data.xlsx");

        // 파일 쓰기
        workbook.write(response.getOutputStream());
        workbook.close();
    }
}