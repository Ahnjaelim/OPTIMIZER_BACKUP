package com.wellconn.optimizer.service;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Picture;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFClientAnchor;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.wellconn.optimizer.mapper.ReportMapper;
import com.wellconn.optimizer.model.ImageData;
import com.wellconn.optimizer.model.ReportVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

	private final ReportMapper reportMapper;
	
	 private List<ReportVO> selectTimeResourceForReport(ReportVO reportVO) {
			// TODO Auto-generated method stub
		 
		 
		 
		 List<ReportVO> result = reportMapper.selectTimeResourceForReport(reportVO);
		 if(result!=null && result.size()>0) {
			 result = result.stream().map(contentData->{
				 
				if (contentData.getOrg_time() > 0) {
						double percent = ( ( contentData.getOrg_time() - contentData.getNew_time() ) * 100.0 ) / contentData.getOrg_time();
						contentData.setCalcPercent(percent);
				}else {
					contentData.setCalcPercent(0.0);
				}
				 
				 return contentData;
			 })
			.sorted(Comparator.comparingDouble(ReportVO::getCalcPercent).reversed())
			.collect(Collectors.toList());
			 
		 }
			return result;
	}
	 

	 private List<ReportVO> selectTimeResourceForReportV2(ReportVO reportVO) {
			// TODO Auto-generated method stub
		 
		 
		 
		 List<ReportVO> result = reportMapper.selectTimeResourceForReport(reportVO);
		 if(result!=null && result.size()>0) {
			 result = result.stream().map(contentData->{
				 
					if (contentData.getResource_org_size() > 0) {
						double percent = ( ( contentData.getResource_org_size() - contentData.getResource_type1_size() ) * 100.0 ) / contentData.getResource_org_size();
						contentData.setCalcPercent(percent);
				}else {
					contentData.setCalcPercent(0.0);
				}
				 
				 return contentData;
			 })
			.sorted(Comparator.comparingDouble(ReportVO::getCalcPercent).reversed())
			.collect(Collectors.toList());
			 
		 }
			return result;
	}
	 
	 
	 private List<ReportVO> selectTimeResourceForReportReV2(ReportVO reportVO) {
			// TODO Auto-generated method stub
		 
		 
		 
		 List<ReportVO> result = reportMapper.selectTimeResourceForReport(reportVO);
		 if(result!=null && result.size()>0) {
			 result = result.stream().map(contentData->{
				 
				if (contentData.getResource_org_size() > 0) {
						double percent = ( ( contentData.getResource_org_size() - contentData.getResource_type1_size() ) * 100.0 ) / contentData.getResource_org_size();
						contentData.setCalcPercent(percent);
				}else {
					contentData.setCalcPercent(0.0);
				}
				 
				 return contentData;
			 })
			.filter(contentData -> contentData.getCalcPercent() > 0.0) // 필터 추가
			.sorted(Comparator.comparingDouble(ReportVO::getCalcPercent))
			.collect(Collectors.toList());
			 
		 }
		 
		 
		 

			

			return result;
	}
	 
	 
	 private List<ReportVO> selectTimeResourceForReportRe(ReportVO reportVO) {
			// TODO Auto-generated method stub
		 
		 
		 
		 List<ReportVO> result = reportMapper.selectTimeResourceForReport(reportVO);
		 if(result!=null && result.size()>0) {
			 result = result.stream().map(contentData->{
				 
				if (contentData.getOrg_time() > 0) {
						double percent = ( ( contentData.getOrg_time() - contentData.getNew_time() ) * 100.0 ) / contentData.getOrg_time();
						contentData.setCalcPercent(percent);
				}else {
					contentData.setCalcPercent(0.0);
				}
				 
				 return contentData;
			 })
			.filter(contentData -> contentData.getCalcPercent() > 0.0) // 필터 추가
			.sorted(Comparator.comparingDouble(ReportVO::getCalcPercent))
			.collect(Collectors.toList());
			 
		 }
		 
		 
		 

			

			return result;
	}
	 
	 @Override
		public List<ReportVO> selectAllresourceForReport(ReportVO reportVO) {
			// TODO Auto-generated method stub
			return reportMapper.selectAllresourceForReport(reportVO);
		}
	 
	@Override
	public List<ReportVO> selectAvgComp(ReportVO reportVO) {
		// TODO Auto-generated method stub
		return reportMapper.selectAvgComp(reportVO);
	}

	@Override
	public List<ReportVO> contentChartAll(ReportVO reportVO) {
		// TODO Auto-generated method stub
		return reportMapper.contentChartAll(reportVO);
	}

	@Override
	public List<ReportVO> selectAvgTimeGroup(ReportVO reportVO) {
		// TODO Auto-generated method stub
		return reportMapper.selectAvgTimeGroup(reportVO);
	}

	@Override
	public List<ReportVO> selectTimetableFast(ReportVO reportVO) {
		// TODO Auto-generated method stub
		return reportMapper.selectTimetableFast(reportVO);
	}

	@Override
	public List<ReportVO> selectTimetableSlow(ReportVO reportVO) {
		// TODO Auto-generated method stub
		return reportMapper.selectTimetableSlow(reportVO);
	}

	@Override
	public List<ReportVO> getUrlFastTop10(ReportVO reportVO) {
		// TODO Auto-generated method stub
		return reportMapper.getUrlFastTop10(reportVO);
	}

	@Override
	public List<ReportVO> getUrlSlowTop10(ReportVO reportVO) {
		// TODO Auto-generated method stub
		return reportMapper.getUrlSlowTop10(reportVO);
	}

	@Override
	public List<ReportVO> getUrl(ReportVO reportVO) {
		// TODO Auto-generated method stub
		return  reportMapper.getUrl(reportVO);
	}
	
	public List<ReportVO> getUrlforReport(ReportVO reportVO) {
		// TODO Auto-generated method stub
		return  reportMapper.getUrlforReport(reportVO);
	}

	@Override
	public List<ReportVO> optimizer_title(ReportVO reportVO) {
		// TODO Auto-generated method stub
		return  reportMapper.optimizer_title(reportVO);
	}

	@Override
	public List<ReportVO> optimizer_list(ReportVO reportVO) {
		// TODO Auto-generated method stub
		return  reportMapper.optimizer_list(reportVO);
	}

	@Override
	public List<ReportVO> selectAllresource(ReportVO reportVO) {
		// TODO Auto-generated method stub
		return reportMapper.selectAllresource(reportVO);
	}

	@Override
	public List<ReportVO> selectSite(ReportVO reportVO) {
		// TODO Auto-generated method stub
		return reportMapper.selectSite(reportVO);
	}
	
	@Override
	public List<ReportVO> selectSizeGoodTable(ReportVO reportVO) {
		// TODO Auto-generated method stub
		return reportMapper.selectSizeGoodTable(reportVO);
	}

	@Override
	public List<ReportVO> selectSizeBadTable(ReportVO reportVO) {
		// TODO Auto-generated method stub
		return reportMapper.selectSizeBadTable(reportVO);
	}
	
	
	
	
	
	
	
	
	 @Value("${excel.upload}") // 수정된 부분: ${}를 사용하여 properties 파일에서 직접 값을 가져오도록 변경
	   private String EXCEL_ROOT;
	@Override
	public byte[] createExcel(ReportVO reportVO) throws IOException, InvalidFormatException {
		Resource resource = new ClassPathResource(EXCEL_ROOT);
		
		File excelSample_template = resource.getFile();

        try (InputStream inputStream = new FileInputStream(excelSample_template);
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            OPCPackage opcPackage = OPCPackage.open(inputStream);
            XSSFWorkbook workbook = new XSSFWorkbook(opcPackage);
            
            
            
            
            
            
            
            Date now = new Date();
            SimpleDateFormat dayFormat = new SimpleDateFormat("yyyy-MM-dd");
            String writenDay = dayFormat.format(now);
            
			/* 표지 */
			Sheet cover_sheet = workbook.getSheetAt(0);
            Row coverRow = cover_sheet.getRow(11);
            Cell cover_cell = coverRow.getCell(0);
            cover_cell.setCellValue("작성일 : "+writenDay); //셀데이터
            
            
            
            reportVO.setResource_type(99);
            
            /* 개요 */
            gaeyo(workbook,reportVO);
            
            /*웹 콘텐츠 최적화 현황*/
            webContentOpt(workbook,reportVO);
            
            /*측정 항목*/
            checkList(workbook,reportVO);
            
            
            /*측정 결과*/
            checkResult(workbook,reportVO);
            
            
            
            
            
            
            /* 출력시작 */
            workbook.write(outputStream);
            return outputStream.toByteArray();
        }
		
    }
	
	@Override
	public byte[] createExcelV2(ReportVO reportVO) throws IOException, InvalidFormatException {
		Resource resource = new ClassPathResource("excel/sample_v2.xlsx");
		
		File excelSample_template = resource.getFile();

      try (InputStream inputStream = new FileInputStream(excelSample_template);
           ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

          OPCPackage opcPackage = OPCPackage.open(inputStream);
          XSSFWorkbook workbook = new XSSFWorkbook(opcPackage);
          
          Date now = new Date();
          SimpleDateFormat dayFormat = new SimpleDateFormat("yyyy-MM-dd");
          String writenDay = dayFormat.format(now);
          
			/* 표지 */
			Sheet cover_sheet = workbook.getSheetAt(0);
          Row coverRow = cover_sheet.getRow(11);
          Cell cover_cell = coverRow.getCell(0);
          cover_cell.setCellValue("작성일 : "+writenDay); //셀데이터
          
          reportVO.setResource_type(90);
          
          /* 개요 */
          gaeyo(workbook,reportVO);
          
          /*웹 콘텐츠 최적화 현황*/
          webContentOpt_V2(workbook,reportVO);
          
          /*측정 항목*/
          checkList_V2(workbook,reportVO);
          /*측정 결과*/
          checkResult(workbook,reportVO);
          
          /* 출력시작 */
          workbook.write(outputStream);
          return outputStream.toByteArray();
      }
		
  }
	 
	/* 개요 */
	private XSSFWorkbook gaeyo(XSSFWorkbook workbook,ReportVO reportVO) {
		Date now = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String wirtenDate = dateFormat.format(now);
		
		
		
		Sheet cover_sheet = workbook.getSheetAt(1);
		//측정일시 		
        Row coverRow = cover_sheet.getRow(6);
        Cell cover_cell = coverRow.getCell(0);
        cover_cell.setCellValue("o 측정일시 : "+wirtenDate);
		
        //점검 대상 사이트
        List<ReportVO> data = selectSite(reportVO);
        
        // 10번 행 스타일 생성
        XSSFCellStyle row10Style = workbook.createCellStyle();
        row10Style.setFillForegroundColor(IndexedColors.YELLOW.getIndex()); // 연한 회색 배경
        row10Style.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        // 폰트 가운데 정렬 설정
        row10Style.setAlignment(HorizontalAlignment.CENTER);
        row10Style.setVerticalAlignment(VerticalAlignment.CENTER);

        // 전체 테두리 설정
        row10Style.setBorderTop(BorderStyle.THIN);
        row10Style.setBorderBottom(BorderStyle.THIN);
        row10Style.setBorderLeft(BorderStyle.THIN);
        row10Style.setBorderRight(BorderStyle.THIN);
        
        coverRow = cover_sheet.getRow(10);
        if (coverRow == null) {
            coverRow = cover_sheet.createRow(10);
        }

        // A~J 열에 대해 데이터가 있을 때만 스타일 적용
        
        int[] targetCellList = {0,1,6};
        
        for(int i=0 ; i<targetCellList.length ; i++) {
        	int idx = targetCellList[i];
        	  cover_cell = coverRow.getCell(idx);
        	  if(cover_cell == null) coverRow.createCell(idx);
        	 if (cover_cell != null && cover_cell.getCellType() != CellType.BLANK) {
                 //cover_cell.setCellStyle(row10Style);
             }
        	
        }
    
		
        if (data != null && !data.isEmpty()) {
        	ReportVO siteData = data.get(0);
        	
        	
        	 coverRow = cover_sheet.getRow(11);
        	    
             cover_cell = coverRow.getCell(0);
             cover_cell.setCellValue(1); //순번 
             cover_cell = coverRow.getCell(1);
             cover_cell.setCellValue(siteData.getSite_address()); //사이트 주소
             cover_cell = coverRow.getCell(6);
             cover_cell.setCellValue(siteData.getSite_name()); //사이트 명
        }
       

		return workbook;
	}

	private XSSFWorkbook webContentOpt(XSSFWorkbook workbook,ReportVO reportVO) {
		
		Sheet cover_sheet = workbook.getSheetAt(2);
		
        Row coverRow = cover_sheet.getRow(6);
        Cell cover_cell = coverRow.getCell(0);
        
		
     
        
        List<ReportVO> data = contentChartAll(reportVO);

        // 행 스타일 생성
        CellStyle rowStyle = workbook.createCellStyle();
        rowStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex()); // 연한 회색 배경
        rowStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        // 폰트 가운데 정렬 설정
        rowStyle.setAlignment(HorizontalAlignment.CENTER);
        rowStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        // 전체 테두리 설정
        rowStyle.setBorderTop(BorderStyle.THIN);
        rowStyle.setBorderBottom(BorderStyle.THIN);
        rowStyle.setBorderLeft(BorderStyle.THIN);
        rowStyle.setBorderRight(BorderStyle.THIN);
        
        // 배열 선언 및 초기화
        int[] numbers = new int[4];

        // 배열에 데이터 추가
        numbers[0] = 9;
        numbers[1] = 14;
        numbers[2] = 23;
        numbers[3] = 35;
        
        // 배열의 내용 출력
        for (int i = 0; i < numbers.length; i++) {
        	coverRow = cover_sheet.getRow(numbers[i]);
        	if (coverRow == null) {
                coverRow = cover_sheet.createRow(numbers[i]);
            }

            // A~J 열에 대해 데이터가 있을 때만 스타일 적용
            for (int j = 0; j < 10; j++) { // A~J 셀
                cover_cell = coverRow.getCell(j);
                if (cover_cell != null && cover_cell.getCellType() != CellType.BLANK) {
                    //cover_cell.setCellStyle(rowStyle);
                }
            }
        }
        
        if (data != null && !data.isEmpty()) {
        	int all_unOpt_cnt = 0;
        	int all_opt_cnt = 0;
        	
        	 //웹 콘텐츠 타입별 최적화 현황
        	
        	
        	List<ImageData> canvasImages = reportVO.getCanvasImages();
        	if (canvasImages != null) {
        	    for (ImageData imageData : canvasImages) {
        	    	if ("typeBarChart".equals(imageData.getId())) {
        	        	String canvasDataUrl = imageData.getDataUrl(); // dataUrl 필드에서 이미지 데이터 가져오기
        	            byte[] canvasImageBytes = Base64.getDecoder().decode(canvasDataUrl.split(",")[1]);

        	            // 워크북에 이미지 추가
        	            int pictureIdx = workbook.addPicture(canvasImageBytes, Workbook.PICTURE_TYPE_PNG);

        	          
        	            Drawing<?> drawing = cover_sheet.createDrawingPatriarch();

        	            // 이미지가 삽입될 셀의 시작과 끝을 지정합니다.
        	            int startCol = 0; // 이미지가 삽입될 시작 열
        	            int startRow = 14; // 이미지가 삽입될 시작 행
        	            int endCol = 12; // 이미지가 삽입될 끝 열
        	            int endRow = 31; // 이미지가 삽입될 끝 행

        	            // XSSFClientAnchor를 사용하여 이미지를 셀의 중앙에 배치합니다.
        	            XSSFClientAnchor anchor = new XSSFClientAnchor();
        	            anchor.setCol1(startCol);  // 이미지 시작 열
        	            anchor.setRow1(startRow);  // 이미지 시작 행
        	            anchor.setCol2(endCol + 1);  // 이미지 끝 열 (끝 열 + 1)
        	            anchor.setRow2(endRow + 1);  // 이미지 끝 행 (끝 행 + 1)

        	            Picture picture = drawing.createPicture(anchor, pictureIdx);

        	            // 이미지 크기 조정 (가로 및 세로)
        	            double cellWidth = cover_sheet.getColumnWidthInPixels(startCol);
        	            double cellHeight = cover_sheet.getDefaultRowHeightInPoints();
        	            double cellWidthTotal = (endCol+1 - startCol) * cellWidth;
        	            double cellHeightTotal = (endRow+2 - startRow) * cellHeight;

        	            // 실제 이미지 크기
        	            double imageWidth = picture.getImageDimension().getWidth();
        	            double imageHeight = picture.getImageDimension().getHeight();

        	            // 크기 비율 조정
        	            double widthRatio = cellWidthTotal / imageWidth;
        	            double heightRatio = cellHeightTotal / imageHeight;

        	            double ratio = Math.min(widthRatio, heightRatio);

        	            picture.resize(ratio);
        	            
        	        }
        	    }
        	} else {
        	    System.out.println("No canvas images found.");
        	}
        	
        	//웹 콘텐츠 비율
        	
        	
        
        	if (canvasImages != null) {
        	    for (ImageData imageData : canvasImages) {
        	    	if ("allPieChart".equals(imageData.getId())) {
        	        	String canvasDataUrl = imageData.getDataUrl(); // dataUrl 필드에서 이미지 데이터 가져오기
        	            byte[] canvasImageBytes = Base64.getDecoder().decode(canvasDataUrl.split(",")[1]);

        	            // 워크북에 이미지 추가
        	            int pictureIdx = workbook.addPicture(canvasImageBytes, Workbook.PICTURE_TYPE_PNG);

        	          
        	            Drawing<?> drawing = cover_sheet.createDrawingPatriarch();

        	            // 이미지가 삽입될 셀의 시작과 끝을 지정합니다.
        	            int startCol = 0; // 이미지가 삽입될 시작 열
        	            int startRow = 31; // 이미지가 삽입될 시작 행
        	            int endCol = 5; // 이미지가 삽입될 끝 열
        	            int endRow = 45; // 이미지가 삽입될 끝 행

        	            // XSSFClientAnchor를 사용하여 이미지를 셀의 중앙에 배치합니다.
        	            XSSFClientAnchor anchor = new XSSFClientAnchor();
        	            anchor.setCol1(startCol);  // 이미지 시작 열
        	            anchor.setRow1(startRow);  // 이미지 시작 행
        	            anchor.setCol2(endCol + 1);  // 이미지 끝 열 (끝 열 + 1)
        	            anchor.setRow2(endRow + 1);  // 이미지 끝 행 (끝 행 + 1)

        	            Picture picture = drawing.createPicture(anchor, pictureIdx);

        	            // 이미지 크기 조정 (가로 및 세로)
        	            double cellWidth = cover_sheet.getColumnWidthInPixels(startCol);
        	            double cellHeight = cover_sheet.getDefaultRowHeightInPoints();
        	            double cellWidthTotal = (endCol+1 - startCol) * cellWidth;
        	            double cellHeightTotal = (endRow+2 - startRow) * cellHeight;

        	            // 실제 이미지 크기
        	            double imageWidth = picture.getImageDimension().getWidth();
        	            double imageHeight = picture.getImageDimension().getHeight();

        	            // 크기 비율 조정
        	            double widthRatio = cellWidthTotal / imageWidth;
        	            double heightRatio = cellHeightTotal / imageHeight;

        	            double ratio = Math.min(widthRatio, heightRatio);

        	            picture.resize(ratio);
        	            
        	        }
        	    }
        	} else {
        	    System.out.println("No canvas images found.");
        	}
        	
        	for (int i = 0; i < data.size(); i++) {
        		
        		ReportVO contentData = data.get(i);
        		
        		switch (contentData.getResource_type()) {
				case 1:
					 coverRow = cover_sheet.getRow(27);
					 cover_cell = coverRow.getCell(0);
					 cover_cell.setCellValue("이미지 최적화 현황 : "+contentData.getOpt_cnt()+"/"+contentData.getAll_cnt() +"건");
					 all_opt_cnt =all_opt_cnt+ contentData.getOpt_cnt();  
					 all_unOpt_cnt =all_unOpt_cnt+ contentData.getUnopt_cnt();  
					break;
				case 2:
					 coverRow = cover_sheet.getRow(27);
					 cover_cell = coverRow.getCell(2);
					 cover_cell.setCellValue("동영상 최적화 현황 : "+contentData.getOpt_cnt()+"/"+contentData.getAll_cnt() +"건");
					 all_opt_cnt =all_opt_cnt+ contentData.getOpt_cnt();  
					 all_unOpt_cnt =all_unOpt_cnt+ contentData.getUnopt_cnt();  
					break;
				case 3:
					coverRow = cover_sheet.getRow(27);
					cover_cell = coverRow.getCell(5);
					cover_cell.setCellValue("폰트 최적화 현황 : "+contentData.getOpt_cnt()+"/"+contentData.getAll_cnt() +"건");
					all_opt_cnt = all_opt_cnt+ contentData.getOpt_cnt();  
					all_unOpt_cnt = all_unOpt_cnt+ contentData.getUnopt_cnt();  
					break;
				case 4:
					coverRow = cover_sheet.getRow(27);
					cover_cell = coverRow.getCell(7);
					cover_cell.setCellValue("텍스트 최적화 현황 : "+contentData.getOpt_cnt()+"/"+contentData.getAll_cnt() +"건");
					all_opt_cnt = all_opt_cnt+ contentData.getOpt_cnt();  
					all_unOpt_cnt =all_unOpt_cnt+ contentData.getUnopt_cnt();  
					break;
				default:
					break;
				}
			}
        	
        	//전체 웹 콘텐츠 최적화 현황	
        	 coverRow = cover_sheet.getRow(10);
        	 
        	
             cover_cell = coverRow.getCell(0);
             cover_cell.setCellValue(all_unOpt_cnt+"건"); //최적화 미적용
             
             cover_cell = coverRow.getCell(4);
             cover_cell.setCellValue(all_opt_cnt+"건"); //최적화 적용
             
             cover_cell = coverRow.getCell(8);
             cover_cell.setCellValue(all_unOpt_cnt+all_opt_cnt+"건"); //총합
             
             cover_cell = coverRow.getCell(9);
             double percent = ((double)all_opt_cnt/(all_unOpt_cnt+all_opt_cnt)*100);
             
             cover_cell.setCellValue( (int)Math.round(percent)+"%"); //비율
             
        }
       

        
        // 셀 스타일 생성 또는 가져오기
        CellStyle styleTextCenter = cover_sheet.getWorkbook().createCellStyle();

        // 가운데 정렬 설정
        styleTextCenter.setAlignment(HorizontalAlignment.CENTER);
        styleTextCenter.setBorderTop(BorderStyle.THIN);
        styleTextCenter.setBorderBottom(BorderStyle.THIN);
        styleTextCenter.setBorderLeft(BorderStyle.THIN);
        styleTextCenter.setBorderRight(BorderStyle.THIN);
        
     // 셀 스타일 생성 또는 가져오기
        CellStyle styleTextRigth = cover_sheet.getWorkbook().createCellStyle();

        // 가운데 정렬 설정
        styleTextRigth.setAlignment(HorizontalAlignment.RIGHT);
        styleTextRigth.setBorderTop(BorderStyle.THIN);
        styleTextRigth.setBorderBottom(BorderStyle.THIN);
        styleTextRigth.setBorderLeft(BorderStyle.THIN);
        styleTextRigth.setBorderRight(BorderStyle.THIN);
        

        // 셀 스타일 생성 또는 가져오기
           CellStyle styleTextLeft = cover_sheet.getWorkbook().createCellStyle();

           // 가운데 정렬 설정
           styleTextLeft.setAlignment(HorizontalAlignment.LEFT);
           styleTextLeft.setBorderTop(BorderStyle.THIN);
           styleTextLeft.setBorderBottom(BorderStyle.THIN);
           styleTextLeft.setBorderLeft(BorderStyle.THIN);
           styleTextLeft.setBorderRight(BorderStyle.THIN);
        
     // 행 스타일 생성
        CellStyle headerStyle = workbook.createCellStyle();
        XSSFColor lightGray = new XSSFColor(new Color(217, 217, 217), null);

        
        headerStyle.setFillForegroundColor(lightGray); // 연한 회색 배경
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        // 폰트 가운데 정렬 설정
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        // 전체 테두리 설정
        headerStyle.setBorderTop(BorderStyle.THIN);
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setBorderLeft(BorderStyle.THIN);
        headerStyle.setBorderRight(BorderStyle.THIN);
        
        int checkStartRow = 46;
        int typeCnt = 0;
        
      //웹 콘텐츠 목록
        List<ReportVO> contentList = selectAllresourceForReport(reportVO);
		
        if (contentList != null && !contentList.isEmpty()) {
        	 for (int i = 0; i < contentList.size(); i++) {
        		
             	ReportVO contentData = contentList.get(i);
             	
             	if(i == 0) {                    
                    // 구분 명
                 	coverRow = cover_sheet.getRow(checkStartRow);
                 	if (coverRow == null) {
                 	    coverRow = cover_sheet.createRow(checkStartRow);
                 	}
            		for (int j = 0; j < 10; j++) {
                    	cover_cell = coverRow.getCell(j);
                      	if (cover_cell == null) {
                      	    cover_cell = coverRow.createCell(j);
                      	}
                  	    //cover_cell.setCellStyle(borderStyle);
    				}
            		cover_sheet.addMergedRegion(new CellRangeAddress(
            				checkStartRow+i,
            				checkStartRow+i, 
    	        		    0, 
    	        		    9 
    	        		));
            		cover_cell = coverRow.getCell(0);
            		cover_cell.setCellValue("o "+chkType(contentData.getResource_type()));
            		
            		checkStartRow = checkStartRow+1;
            		
            		coverRow = cover_sheet.createRow(checkStartRow);
                  	
                  	for (int j = 0; j < 10; j++) {
                    	cover_cell = coverRow.getCell(j);
                      	if (cover_cell == null) {
                      	    cover_cell = coverRow.createCell(j);
                      	}
                  	    //cover_cell.setCellStyle(borderStyle);
                  	    cover_cell.setCellStyle(headerStyle);
    				}
                  	
                  	cover_sheet.addMergedRegion(new CellRangeAddress(
                  			checkStartRow,
                  			checkStartRow, 
    	        		    2, 
    	        		    3 
    	        	));
                  	
                  	cover_sheet.addMergedRegion(new CellRangeAddress(
                  			checkStartRow,
                  			checkStartRow, 
    	        		    4, 
    	        		    5 
    	        	));
                  	
                  	cover_sheet.addMergedRegion(new CellRangeAddress(
                  			checkStartRow,
                  			checkStartRow, 
    	        		    8, 
    	        		    9 
    	        	));
                  	
                  	cover_cell = coverRow.getCell(0);
            		cover_cell.setCellValue("순번");
                  	
            	 	cover_cell = coverRow.getCell(1);
            		cover_cell.setCellValue("구분");
                  	
            		
            		cover_cell = coverRow.getCell(2);
            		cover_cell.setCellValue("웹 콘텐츠 이름");
            		
            		cover_cell = coverRow.getCell(4);
            		cover_cell.setCellValue("최적화 적용");
            		
            		cover_cell = coverRow.getCell(6);
            		cover_cell.setCellValue("원본 크기");

            		cover_cell = coverRow.getCell(7);
            		cover_cell.setCellValue("최적화 크기");

            		cover_cell = coverRow.getCell(8);
            		cover_cell.setCellValue("파일 경량화율");
                  	
            		checkStartRow=checkStartRow+1;
             	}else if(i != 0 && contentList.get(i).getResource_type() != contentList.get(i-1).getResource_type()) {
             	// 구분 명                 	
             		typeCnt = 0;
            		checkStartRow = checkStartRow+1;
            		
                 	coverRow = cover_sheet.getRow(checkStartRow+i);
                 	if (coverRow == null) {
                 	    coverRow = cover_sheet.createRow(checkStartRow + i);
                 	}
            		for (int j = 0; j < 10; j++) {
                    	cover_cell = coverRow.getCell(j);
                      	if (cover_cell == null) {
                      	    cover_cell = coverRow.createCell(j);
                      	}
                  	    //cover_cell.setCellStyle(borderStyle);
    				}
            		cover_sheet.addMergedRegion(new CellRangeAddress(
            				checkStartRow+i,
            				checkStartRow+i, 
    	        		    0, 
    	        		    9 
    	        		));
            		cover_cell = coverRow.getCell(0);
            		cover_cell.setCellValue("o "+chkType(contentData.getResource_type()));
            		
            		checkStartRow = checkStartRow+1;
            		
            		coverRow = cover_sheet.createRow(checkStartRow + i);
                  	
                  	for (int j = 0; j < 10; j++) {
                    	cover_cell = coverRow.getCell(j);
                      	if (cover_cell == null) {
                      	    cover_cell = coverRow.createCell(j);
                      	}
                  	    //cover_cell.setCellStyle(borderStyle);
                  	    cover_cell.setCellStyle(headerStyle);
    				}
                  	
                  	cover_sheet.addMergedRegion(new CellRangeAddress(
                  			checkStartRow + i,
                  			checkStartRow + i, 
    	        		    2, 
    	        		    3 
    	        	));
                  	
                  	cover_sheet.addMergedRegion(new CellRangeAddress(
                  			checkStartRow + i,
                  			checkStartRow + i, 
    	        		    4, 
    	        		    5 
    	        	));
                  	
                  	cover_sheet.addMergedRegion(new CellRangeAddress(
                  			checkStartRow + i,
                  			checkStartRow + i, 
    	        		    8, 
    	        		    9 
    	        	));
                  	
                  	cover_cell = coverRow.getCell(0);
            		cover_cell.setCellValue("순번");
                  	
            	 	cover_cell = coverRow.getCell(1);
            		cover_cell.setCellValue("구분");
                  	
            		
            		cover_cell = coverRow.getCell(2);
            		cover_cell.setCellValue("웹 콘텐츠 이름");
            		
            		cover_cell = coverRow.getCell(4);
            		cover_cell.setCellValue("최적화 적용");
            		
            		cover_cell = coverRow.getCell(6);
            		cover_cell.setCellValue("원본 크기");

            		cover_cell = coverRow.getCell(7);
            		cover_cell.setCellValue("최적화 크기");

            		cover_cell = coverRow.getCell(8);
            		cover_cell.setCellValue("파일 경량화율");
                  	
            		checkStartRow=checkStartRow+1;
	       		}
             	
             	coverRow = cover_sheet.getRow(checkStartRow+i);
             	if (coverRow == null) {
             	    coverRow = cover_sheet.createRow(checkStartRow + i);
             	}
             	//순번
             	
              	cover_cell = coverRow.getCell(0);
              	if (cover_cell == null) {
              	    cover_cell = coverRow.createCell(0);
              	}
              	typeCnt = typeCnt+1;
                cover_cell.setCellValue(typeCnt);

                // 스타일을 셀에 적용
                cover_cell.setCellStyle(styleTextCenter);
                
                //구분
               // coverRow.createCell(1);
              	cover_cell = coverRow.getCell(1);
              	if (cover_cell == null) {
              	    cover_cell = coverRow.createCell(1);
              	}
                cover_cell.setCellValue(chkType(contentData.getResource_type()));

                // 스타일을 셀에 적용
                cover_cell.setCellStyle(styleTextCenter);
                
                //웹 콘텐츠 이름
               // coverRow.createCell(2); //3도 병합
                for (int j = 0; j < 2; j++) {
                	cover_cell = coverRow.getCell(2+j);
                  	if (cover_cell == null) {
                  	    cover_cell = coverRow.createCell(2+j);
                  	}

                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextLeft);
				}
                cover_sheet.addMergedRegion(new CellRangeAddress(
                		checkStartRow+i, // 시작 행 인덱스
                		checkStartRow+i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
                        2, // 시작 열 인덱스 (셀 2)
                        3  // 끝 열 인덱스 (셀 3)
                ));
                cover_cell = coverRow.getCell(2);
                cover_cell.setCellValue(contentData.getResource_name());
                
                //최적화 적용
               // coverRow.createCell(4); //5
                for (int j = 0; j < 2; j++) {
                	cover_cell = coverRow.getCell(4+j);
                  	if (cover_cell == null) {
                  	    cover_cell = coverRow.createCell(4+j);
                  	}
                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextCenter);
				}
                cover_sheet.addMergedRegion(new CellRangeAddress(
                		checkStartRow+i, // 시작 행 인덱스
                		checkStartRow+i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
                        4, // 시작 열 인덱스 (셀 2)
                        5  // 끝 열 인덱스 (셀 3)
                ));
                cover_cell = coverRow.getCell(4);
                
                if(contentData.getResource_status() >0) {
                	 cover_cell.setCellValue("최적화 완료");

                     // 스타일을 셀에 적용
                     cover_cell.setCellStyle(styleTextCenter);
                }else {
                	cover_cell.setCellValue("미적용");

                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextCenter);
                }
               
                
                //원본 크기
                //coverRow.createCell(6); 
              	cover_cell = coverRow.getCell(6);
              	if (cover_cell == null) {
              	    cover_cell = coverRow.createCell(6);
              	}
              	if(contentData.getResource_org_size() >=0) {
              		cover_cell.setCellValue(fileSizeUnitFormatter(contentData.getResource_org_size()));

                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextRigth);
                }else {
                	cover_cell.setCellValue("최적화 전");

                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextRigth);
                }
                
                
                
                //최적화 크기
               // coverRow.createCell(7); 
              	cover_cell = coverRow.getCell(7);
              	if (cover_cell == null) {
              	    cover_cell = coverRow.createCell(7);
              	}
              	if(contentData.getResource_status() ==1) {
              		cover_cell.setCellValue(fileSizeUnitFormatter(contentData.getResource_new_size_type2()));

                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextRigth);
                }else {
                	cover_cell.setCellValue("최적화 전");

                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextRigth);
                }
              	
                
                //파일 경량화율
              	for (int j = 0; j < 2; j++) {
                	cover_cell = coverRow.getCell(8+j);
                  	if (cover_cell == null) {
                  	    cover_cell = coverRow.createCell(8+j);
                  	}

                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextCenter);
				}
                cover_sheet.addMergedRegion(new CellRangeAddress(
                		checkStartRow+i, // 시작 행 인덱스
                		checkStartRow+i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
                        8, // 시작 열 인덱스 (셀 2)
                        9  // 끝 열 인덱스 (셀 3)
                ));
              	cover_cell = coverRow.getCell(8);
              	
                if(contentData.getResource_status() ==1) {
                	double percent = ((double)contentData.getResource_org_size()-contentData.getResource_new_size_type2())/contentData.getResource_org_size()*100;
                	
                	cover_cell.setCellValue(String.format("%.1f%%", percent));

                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextRigth);
                }else {
                	cover_cell.setCellValue("최적화 전");

                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextRigth);
                }
              	
     		}
        	
        	 
        	 
        	
//             int startRow = 47; // 시작 행 인덱스 (0부터 시작)
//             int lastRow = cover_sheet.getLastRowNum(); // 마지막 행 인덱스
//
//             // 테두리 스타일 생성
//             CellStyle borderStyle = workbook.createCellStyle();
//             borderStyle.setBorderTop(BorderStyle.THIN);
//             borderStyle.setBorderBottom(BorderStyle.THIN);
//             borderStyle.setBorderLeft(BorderStyle.THIN);
//             borderStyle.setBorderRight(BorderStyle.THIN);
//
//             // 테두리 적용
//             for (int i = startRow; i <= lastRow; i++) {
//                 Row row = cover_sheet.getRow(i);
//                 if (row == null) {
//                     row = cover_sheet.createRow(i);
//                 }
//                 for (int j = 0; j < row.getLastCellNum(); j++) {
//                     Cell cell = row.getCell(j);
//                     if (cell == null) {
//                         cell = row.createCell(j);
//                     }
//                     cell.setCellStyle(borderStyle);
//                 }
//             }
        }
        
       
        
		return workbook;
	}
	
	private XSSFWorkbook webContentOpt_V2(XSSFWorkbook workbook,ReportVO reportVO) {
		
		Sheet cover_sheet = workbook.getSheetAt(2);
		
        Row coverRow = cover_sheet.getRow(6);
        Cell cover_cell = coverRow.getCell(0);
        
		
     
        
        List<ReportVO> data = contentChartAll(reportVO);

        // 행 스타일 생성
        CellStyle rowStyle = workbook.createCellStyle();
        rowStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex()); // 연한 회색 배경
        rowStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        // 폰트 가운데 정렬 설정
        rowStyle.setAlignment(HorizontalAlignment.CENTER);
        rowStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        // 전체 테두리 설정
        rowStyle.setBorderTop(BorderStyle.THIN);
        rowStyle.setBorderBottom(BorderStyle.THIN);
        rowStyle.setBorderLeft(BorderStyle.THIN);
        rowStyle.setBorderRight(BorderStyle.THIN);
        
        // 배열 선언 및 초기화
        int[] numbers = new int[4];

        // 배열에 데이터 추가
        numbers[0] = 9;
        numbers[1] = 14;
        numbers[2] = 23;
        numbers[3] = 35;
        
        // 배열의 내용 출력
        for (int i = 0; i < numbers.length; i++) {
        	coverRow = cover_sheet.getRow(numbers[i]);
        	if (coverRow == null) {
                coverRow = cover_sheet.createRow(numbers[i]);
            }

            // A~J 열에 대해 데이터가 있을 때만 스타일 적용
            for (int j = 0; j < 10; j++) { // A~J 셀
                cover_cell = coverRow.getCell(j);
                if (cover_cell != null && cover_cell.getCellType() != CellType.BLANK) {
                    //cover_cell.setCellStyle(rowStyle);
                }
            }
        }
        
        if (data != null && !data.isEmpty()) {
        	int all_unOpt_cnt = 0;
        	int all_opt_cnt = 0;
        	
        	
        	
        	List<ImageData> canvasImages = reportVO.getCanvasImages();
        	if (canvasImages != null) {
        	    for (ImageData imageData : canvasImages) {
        	        if ("typeBarChart".equals(imageData.getId())) {
        	        	String canvasDataUrl = imageData.getDataUrl(); // dataUrl 필드에서 이미지 데이터 가져오기
        	            byte[] canvasImageBytes = Base64.getDecoder().decode(canvasDataUrl.split(",")[1]);

        	            // 워크북에 이미지 추가
        	            int pictureIdx = workbook.addPicture(canvasImageBytes, Workbook.PICTURE_TYPE_PNG);
        	           
        	          
        	            Drawing<?> drawing = cover_sheet.createDrawingPatriarch();

        	            // 이미지가 삽입될 셀의 시작과 끝을 지정합니다.
        	            int startCol = 0; // 이미지가 삽입될 시작 열
        	            int startRow = 14; // 이미지가 삽입될 시작 행
        	            int endCol = 12; // 이미지가 삽입될 끝 열
        	            int endRow = 31; // 이미지가 삽입될 끝 행

        	            // XSSFClientAnchor를 사용하여 이미지를 셀의 중앙에 배치합니다.
        	            XSSFClientAnchor anchor = new XSSFClientAnchor();
        	            anchor.setCol1(startCol);  // 이미지 시작 열
        	            anchor.setRow1(startRow);  // 이미지 시작 행
        	            anchor.setCol2(endCol + 1);  // 이미지 끝 열 (끝 열 + 1)
        	            anchor.setRow2(endRow + 1);  // 이미지 끝 행 (끝 행 + 1)

        	            Picture picture = drawing.createPicture(anchor, pictureIdx);

        	            // 이미지 크기 조정 (가로 및 세로)
        	            double cellWidth = cover_sheet.getColumnWidthInPixels(startCol);
        	            double cellHeight = cover_sheet.getDefaultRowHeightInPoints();
        	            double cellWidthTotal = (endCol+1 - startCol) * cellWidth;
        	            double cellHeightTotal = (endRow+2 - startRow) * cellHeight;

        	            // 실제 이미지 크기
        	            double imageWidth = picture.getImageDimension().getWidth();
        	            double imageHeight = picture.getImageDimension().getHeight();

        	            // 크기 비율 조정
        	            double widthRatio = cellWidthTotal / imageWidth;
        	            double heightRatio = cellHeightTotal / imageHeight;

        	            double ratio = Math.min(widthRatio, heightRatio);

        	            picture.resize(ratio);
        	            
        	        }
        	    }
        	} else {
        	    System.out.println("No canvas images found.");
        	}
        	
        	 //웹 콘텐츠 타입별 최적화 현황
        	for (int i = 0; i < data.size(); i++) {
        		
        		ReportVO contentData = data.get(i);
        		
        		switch (contentData.getResource_type()) {
				case 5:
					 coverRow = cover_sheet.getRow(27);
					 cover_cell = coverRow.getCell(0);
					 cover_cell.setCellValue("한글 최적화 현황 : "+contentData.getOpt_cnt()+"/"+contentData.getAll_cnt() +"건");
					 all_opt_cnt =all_opt_cnt+ contentData.getOpt_cnt();  
					 all_unOpt_cnt =all_unOpt_cnt+ contentData.getUnopt_cnt();  
					break;
				case 6:
					 coverRow = cover_sheet.getRow(27);
					 cover_cell = coverRow.getCell(2);
					 cover_cell.setCellValue("워드 최적화 현황 : "+contentData.getOpt_cnt()+"/"+contentData.getAll_cnt() +"건");
					 all_opt_cnt =all_opt_cnt+ contentData.getOpt_cnt();  
					 all_unOpt_cnt =all_unOpt_cnt+ contentData.getUnopt_cnt();  
					break;
				case 7:
					coverRow = cover_sheet.getRow(27);
					cover_cell = coverRow.getCell(4);
					cover_cell.setCellValue("엑셀 최적화 현황 : "+contentData.getOpt_cnt()+"/"+contentData.getAll_cnt() +"건");
					all_opt_cnt = all_opt_cnt+ contentData.getOpt_cnt();  
					all_unOpt_cnt =all_unOpt_cnt+ contentData.getUnopt_cnt();  
					break;
				case 8:
					coverRow = cover_sheet.getRow(27);
					cover_cell = coverRow.getCell(6);
					cover_cell.setCellValue("PPT 최적화 현황 : "+contentData.getOpt_cnt()+"/"+contentData.getAll_cnt() +"건");
					all_opt_cnt = all_opt_cnt+ contentData.getOpt_cnt();  
					all_unOpt_cnt = all_unOpt_cnt+ contentData.getUnopt_cnt();  
					break;
				case 9:
					coverRow = cover_sheet.getRow(27);
					cover_cell = coverRow.getCell(8);
					cover_cell.setCellValue("PDF 최적화 현황 : "+contentData.getOpt_cnt()+"/"+contentData.getAll_cnt() +"건");
					all_opt_cnt = all_opt_cnt+ contentData.getOpt_cnt();  
					all_unOpt_cnt = all_unOpt_cnt+ contentData.getUnopt_cnt();  
					break;
				default:
					break;
				}
			}
        	
        	//전체 웹 콘텐츠 최적화 현황	
        	 coverRow = cover_sheet.getRow(10);
        	 
        	
             cover_cell = coverRow.getCell(0);
             cover_cell.setCellValue(all_unOpt_cnt+"건"); //최적화 미적용
             
             cover_cell = coverRow.getCell(4);
             cover_cell.setCellValue(all_opt_cnt+"건"); //최적화 적용
             
             cover_cell = coverRow.getCell(8);
             cover_cell.setCellValue(all_unOpt_cnt+all_opt_cnt+"건"); //총합
             
             cover_cell = coverRow.getCell(9);
             double percent = ((double)all_opt_cnt/(all_unOpt_cnt+all_opt_cnt)*100);
            
             cover_cell.setCellValue( (int)Math.round(percent)+"%"); //비율
             
        }
       
        // 셀 스타일 생성 또는 가져오기
        CellStyle styleTextCenter = cover_sheet.getWorkbook().createCellStyle();

        // 가운데 정렬 설정
        styleTextCenter.setAlignment(HorizontalAlignment.CENTER);
        styleTextCenter.setBorderTop(BorderStyle.THIN);
        styleTextCenter.setBorderBottom(BorderStyle.THIN);
        styleTextCenter.setBorderLeft(BorderStyle.THIN);
        styleTextCenter.setBorderRight(BorderStyle.THIN);
        
     // 셀 스타일 생성 또는 가져오기
        CellStyle styleTextRigth = cover_sheet.getWorkbook().createCellStyle();

        // 가운데 정렬 설정
        styleTextRigth.setAlignment(HorizontalAlignment.RIGHT);
        styleTextRigth.setBorderTop(BorderStyle.THIN);
        styleTextRigth.setBorderBottom(BorderStyle.THIN);
        styleTextRigth.setBorderLeft(BorderStyle.THIN);
        styleTextRigth.setBorderRight(BorderStyle.THIN);
        

        // 셀 스타일 생성 또는 가져오기
           CellStyle styleTextLeft = cover_sheet.getWorkbook().createCellStyle();

           // 가운데 정렬 설정
           styleTextLeft.setAlignment(HorizontalAlignment.LEFT);
           styleTextLeft.setBorderTop(BorderStyle.THIN);
           styleTextLeft.setBorderBottom(BorderStyle.THIN);
           styleTextLeft.setBorderLeft(BorderStyle.THIN);
           styleTextLeft.setBorderRight(BorderStyle.THIN);
        
     // 행 스타일 생성
        CellStyle headerStyle = workbook.createCellStyle();
        XSSFColor lightGray = new XSSFColor(new Color(217, 217, 217), null);

        
        headerStyle.setFillForegroundColor(lightGray); // 연한 회색 배경
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        // 폰트 가운데 정렬 설정
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        // 전체 테두리 설정
        headerStyle.setBorderTop(BorderStyle.THIN);
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setBorderLeft(BorderStyle.THIN);
        headerStyle.setBorderRight(BorderStyle.THIN);
        
      //웹 콘텐츠 목록
        List<ReportVO> contentList = selectAllresourceForReport(reportVO);
        if (contentList != null && !contentList.isEmpty()) {
        	 for (int i = 0; i < contentList.size(); i++) {
        		
             	ReportVO contentData = contentList.get(i);
             	coverRow = cover_sheet.getRow(31+i);
             	if (coverRow == null) {
             	    coverRow = cover_sheet.createRow(31 + i);
             	}
             	//순번
             	
              	cover_cell = coverRow.getCell(0);
              	if (cover_cell == null) {
              	    cover_cell = coverRow.createCell(0);
              	}
                cover_cell.setCellValue(contentData.getNo());
                // 스타일을 셀에 적용
                cover_cell.setCellStyle(styleTextCenter);
                
                //구분
               // coverRow.createCell(1);
              	cover_cell = coverRow.getCell(1);
              	if (cover_cell == null) {
              	    cover_cell = coverRow.createCell(1);
              	}
                cover_cell.setCellValue(chkType(contentData.getResource_type()));
                // 스타일을 셀에 적용
                cover_cell.setCellStyle(styleTextCenter);
                
                //웹 콘텐츠 이름
               // coverRow.createCell(2); //3도 병합
                for (int j = 0; j < 2; j++) {
                	cover_cell = coverRow.getCell(2+j);
                  	if (cover_cell == null) {
                  	    cover_cell = coverRow.createCell(2+j);
                  	}
                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextLeft);
				}
                cover_sheet.addMergedRegion(new CellRangeAddress(
                		31+i, // 시작 행 인덱스
                		31+i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
                        2, // 시작 열 인덱스 (셀 2)
                        3  // 끝 열 인덱스 (셀 3)
                ));
                cover_cell = coverRow.getCell(2);
                cover_cell.setCellValue(contentData.getResource_name());
                
                //최적화 적용
               // coverRow.createCell(4); //5
                for (int j = 0; j < 2; j++) {
                	cover_cell = coverRow.getCell(4+j);
                  	if (cover_cell == null) {
                  	    cover_cell = coverRow.createCell(4+j);
                  	}
                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextCenter);
				}
                cover_sheet.addMergedRegion(new CellRangeAddress(
                		31+i, // 시작 행 인덱스
                		31+i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
                        4, // 시작 열 인덱스 (셀 2)
                        5  // 끝 열 인덱스 (셀 3)
                ));
                cover_cell = coverRow.getCell(4);
                
                if(contentData.getResource_status() >0) {
                	 cover_cell.setCellValue("최적화 완료");
                }else {
                	cover_cell.setCellValue("미적용");
                }
               
                
                //원본 크기
                //coverRow.createCell(6); 
              	cover_cell = coverRow.getCell(6);
              	if (cover_cell == null) {
              	    cover_cell = coverRow.createCell(6);
              	}
              	if(contentData.getResource_org_size() >=0) {
              		cover_cell.setCellValue(fileSizeUnitFormatter(contentData.getResource_org_size()));
                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextRigth);
                }else {
                	cover_cell.setCellValue("최적화 전");
                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextRigth);
                }
                
                
                
                //최적화 크기
               // coverRow.createCell(7); 
              	cover_cell = coverRow.getCell(7);
              	if (cover_cell == null) {
              	    cover_cell = coverRow.createCell(7);
              	}
              	if(contentData.getResource_status() ==1) {
              		cover_cell.setCellValue(fileSizeUnitFormatter(contentData.getResource_new_size_type2()));
                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextRigth);
                }else {
                	cover_cell.setCellValue("최적화 전");
                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextRigth);
                }
              	
                
                //파일 경량화율
              	for (int j = 0; j < 2; j++) {
                	cover_cell = coverRow.getCell(8+j);
                  	if (cover_cell == null) {
                  	    cover_cell = coverRow.createCell(8+j);
                  	}
                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextRigth);
				}
                cover_sheet.addMergedRegion(new CellRangeAddress(
                		31+i, // 시작 행 인덱스
                		31+i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
                        8, // 시작 열 인덱스 (셀 2)
                        9  // 끝 열 인덱스 (셀 3)
                ));
              	cover_cell = coverRow.getCell(8);
              	
                if(contentData.getResource_status() ==1) {
                	double percent = ((double)contentData.getResource_org_size()-contentData.getResource_new_size_type2())/contentData.getResource_org_size()*100;
                	
                	cover_cell.setCellValue(String.format("%.1f%%", percent));
                }else {
                	cover_cell.setCellValue("최적화 전");
                }
              	
     		}
        	
        	 
        	 
        	
             int startRow = 31; // 시작 행 인덱스 (0부터 시작)
             int lastRow = cover_sheet.getLastRowNum(); // 마지막 행 인덱스

             // 테두리 스타일 생성
             CellStyle borderStyle = workbook.createCellStyle();
             borderStyle.setBorderTop(BorderStyle.THIN);
             borderStyle.setBorderBottom(BorderStyle.THIN);
             borderStyle.setBorderLeft(BorderStyle.THIN);
             borderStyle.setBorderRight(BorderStyle.THIN);

//             // 테두리 적용
//             for (int i = startRow; i <= lastRow; i++) {
//                 Row row = cover_sheet.getRow(i);
//                 if (row == null) {
//                     row = cover_sheet.createRow(i);
//                 }
//                 for (int j = 0; j < row.getLastCellNum(); j++) {
//                     Cell cell = row.getCell(j);
//                     if (cell == null) {
//                         cell = row.createCell(j);
//                     }
//                     cell.setCellStyle(borderStyle);
//                 }
//             }
        }
        
       
        
		return workbook;
	}
	
	 /* 측정항목 */
	private XSSFWorkbook checkList(XSSFWorkbook workbook, ReportVO reportVO) {

		Sheet cover_sheet = workbook.getSheetAt(3);
		Row coverRow = cover_sheet.getRow(0);
		Cell cover_cell = coverRow.getCell(0);
		
		
		// 1. 데이터 리스트업
		
		// 점검 대상 사이트
		List<ReportVO> timeData = selectAvgTimeGroup(reportVO);
		// 렌더링 속도가 가장 많이 단축된 페이지
		List<ReportVO> getUrl1 = getUrl(reportVO);
		// 페이지별 렌더링 시간 단축률
		List<ReportVO> getUrlData = getUrlforReport(reportVO);
		//웹 콘텐츠의 렌더링 시간 향상률 TOP 10
		List<ReportVO> contentList = selectTimeResourceForReport(reportVO);
		if(contentList!=null && contentList.size()>10) {
			contentList = contentList.subList(0, 10);
		}
		//웹 콘텐츠의 렌더링 시간이 느린 웹 콘텐츠 TOP 10
		List<ReportVO> contentListRe = selectTimeResourceForReportRe(reportVO);
		if(contentListRe!=null && contentListRe.size()>10) {
			contentListRe = contentListRe.subList(0, 10);
		}
		
		
		// 2. 데이터 바인딩
		
		 // 셀 스타일 생성 또는 가져오기
        CellStyle styleTextCenter = cover_sheet.getWorkbook().createCellStyle();

        // 가운데 정렬 설정
        styleTextCenter.setAlignment(HorizontalAlignment.CENTER);
        styleTextCenter.setBorderTop(BorderStyle.THIN);
        styleTextCenter.setBorderBottom(BorderStyle.THIN);
        styleTextCenter.setBorderLeft(BorderStyle.THIN);
        styleTextCenter.setBorderRight(BorderStyle.THIN);
        
     // 셀 스타일 생성 또는 가져오기
        CellStyle styleTextRigth = cover_sheet.getWorkbook().createCellStyle();

        // 가운데 정렬 설정
        styleTextRigth.setAlignment(HorizontalAlignment.RIGHT);
        styleTextRigth.setBorderTop(BorderStyle.THIN);
        styleTextRigth.setBorderBottom(BorderStyle.THIN);
        styleTextRigth.setBorderLeft(BorderStyle.THIN);
        styleTextRigth.setBorderRight(BorderStyle.THIN);
     // 셀 스타일 생성 또는 가져오기
        CellStyle styleTextLeft = cover_sheet.getWorkbook().createCellStyle();

        // 가운데 정렬 설정
        styleTextLeft.setAlignment(HorizontalAlignment.LEFT);
        styleTextLeft.setBorderTop(BorderStyle.THIN);
        styleTextLeft.setBorderBottom(BorderStyle.THIN);
        styleTextLeft.setBorderLeft(BorderStyle.THIN);
        styleTextLeft.setBorderRight(BorderStyle.THIN);
        // 배열 선언 및 초기화
        int[] numbers = new int[4];

        // 배열에 데이터 추가
        numbers[0] = 10;
        numbers[1] = 14;
        numbers[2] = 27;
        numbers[3] = 55;
        
		//웹 콘텐츠 타입별 렌더링 시간 단축률
		if (timeData != null && !timeData.isEmpty()) {
			for (int i = 0; i < timeData.size(); i++) {
				ReportVO timeList = timeData.get(i);
				coverRow = cover_sheet.getRow(11);
				switch (timeList.getResource_type()) {
				case 1:

					cover_cell = coverRow.getCell(0);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(0);
					}
					cover_cell.setCellValue((int)Math.ceil(timeList.getPercent()) + "%");

					break;
				case 2:

					cover_cell = coverRow.getCell(2);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(2);
					}
					cover_cell.setCellValue((int)Math.ceil(timeList.getPercent()) + "%");

					break;
				case 3:

					cover_cell = coverRow.getCell(4);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(4);
					}
					cover_cell.setCellValue((int)Math.ceil(timeList.getPercent()) + "%");

					break;
				case 4:

					cover_cell = coverRow.getCell(6);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(6);
					}
					cover_cell.setCellValue((int)Math.ceil(timeList.getPercent()) + "%");

					break;
				default:
					break;
				}

			}
		}
		// 테두리 스타일 생성
				CellStyle borderStyle = workbook.createCellStyle();
				borderStyle.setBorderTop(BorderStyle.THIN);
				borderStyle.setBorderBottom(BorderStyle.THIN);
				borderStyle.setBorderLeft(BorderStyle.THIN);
				borderStyle.setBorderRight(BorderStyle.THIN);
		
		// 웹 콘텐츠의 렌더링 시간 향상률 TOP 10
		if(contentList!=null  && contentList.size()>0) {
			// 행 시작점
			int rowStart = 15;
			int lastRow = rowStart; // 마지막 행 인덱스
			for (int i = 0; i < contentList.size(); i++) {

				ReportVO contentData = contentList.get(i);
				coverRow = cover_sheet.getRow(lastRow + i);
				
				if (coverRow == null) {
					coverRow = cover_sheet.createRow(lastRow + i);
				}
				// 순번
				cover_cell = coverRow.getCell(0);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(0);
				}
				cover_cell.setCellValue(i+1);
          	    cover_cell.setCellStyle(styleTextCenter);

				// 구분
				// coverRow.createCell(1);
				cover_cell = coverRow.getCell(1);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(1);
				}
				cover_cell.setCellValue(chkType(contentData.getResource_type()));
          	    cover_cell.setCellStyle(styleTextCenter);

				// 웹 콘텐츠 이름
				// coverRow.createCell(2); //3도 병합
				for (int j = 0; j < 2; j++) {
					cover_cell = coverRow.getCell(2 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(2 + j);
					}
	          	    cover_cell.setCellStyle(styleTextLeft);
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(lastRow + i, // 시작 행 인덱스
						lastRow + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						2, // 시작 열 인덱스 (셀 2)
						3 // 끝 열 인덱스 (셀 3)
				));
				cover_cell = coverRow.getCell(2);
				cover_cell.setCellValue(contentData.getResource_name());

				// 최적화 적용
				// coverRow.createCell(4); //5
				for (int j = 0; j < 2; j++) {
					cover_cell = coverRow.getCell(4 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(4 + j);
					}
	          	    cover_cell.setCellStyle(styleTextCenter);
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(lastRow + i, // 시작 행 인덱스
						lastRow + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						4, // 시작 열 인덱스 (셀 2)
						5 // 끝 열 인덱스 (셀 3)
				));
				cover_cell = coverRow.getCell(4);

				if (contentData.getResource_status() > 0) {
					cover_cell.setCellValue("최적화 완료");
				} else {
					cover_cell.setCellValue("미적용");
				}

				// 원본 시간
				// coverRow.createCell(6);
				cover_cell = coverRow.getCell(6);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(6);
				}
				if (contentData.getNew_time() > 0) {
					cover_cell.setCellValue(timeUnitFormatter(contentData.getOrg_time()));

	          	    cover_cell.setCellStyle(styleTextRigth);
				} else {
					cover_cell.setCellValue("최적화 전");

	          	    cover_cell.setCellStyle(styleTextRigth);
				}

				// 최적화 시간
				// coverRow.createCell(7);
				for (int j = 0; j < 2; j++) {
					cover_cell = coverRow.getCell(7 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(7 + j);
					}

	          	    cover_cell.setCellStyle(styleTextRigth);
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(lastRow + i, // 시작 행 인덱스
						lastRow + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						7, // 시작 열 인덱스 (셀 2)
						8 // 끝 열 인덱스 (셀 3)
				));

				cover_cell = coverRow.getCell(7);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(7);
				}
				if (contentData.getNew_time() > 0) {
					cover_cell.setCellValue(timeUnitFormatter(contentData.getNew_time()));
				} else {
					cover_cell.setCellValue("최적화 전");
				}

				// 단축률
				cover_cell = coverRow.getCell(9);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(9);
				}
				
				double percent = contentData.getCalcPercent();
				

				cover_cell.setCellValue((percent <= 0.0) ? "최적화 전" : String.format("%.1f%%", percent));

          	    cover_cell.setCellStyle(styleTextRigth);
				
			}
			
			// 테두리 적용
//			for (int i = rowStart; i <rowStart + contentList.size(); i++) {
//				Row row = cover_sheet.getRow(i);
//				if (row == null) {
//					row = cover_sheet.createRow(i);
//				}
//				for (int j = 0; j < row.getLastCellNum(); j++) {
//					Cell cell = row.getCell(j);
//					if (cell == null) {
//						cell = row.createCell(j);
//					}
//					cell.setCellStyle(borderStyle);
//				}
//			}
			
		}
		
		// 웹 콘텐츠의 렌더링 시간 향상률 TOP 10
		if(contentListRe!=null  && contentListRe.size()>0) {
			// 행 시작점
			int rowStart = 28;
			int lastRow = rowStart; // 마지막 행 인덱스
			for (int i = 0; i < contentListRe.size(); i++) {

				ReportVO contentData = contentListRe.get(i);
				coverRow = cover_sheet.getRow(lastRow + i);
						
				if (coverRow == null) {
					coverRow = cover_sheet.createRow(lastRow + i);
				}
				// 순번
				cover_cell = coverRow.getCell(0);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(0);
				}
				cover_cell.setCellValue(i+1);
          	    cover_cell.setCellStyle(styleTextCenter);

				// 구분
				// coverRow.createCell(1);
				cover_cell = coverRow.getCell(1);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(1);
				}
				cover_cell.setCellValue(chkType(contentData.getResource_type()));
          	    cover_cell.setCellStyle(styleTextCenter);

				// 웹 콘텐츠 이름
				// coverRow.createCell(2); //3도 병합
				for (int j = 0; j < 2; j++) {
					cover_cell = coverRow.getCell(2 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(2 + j);
					}
	          	    cover_cell.setCellStyle(styleTextLeft);
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(lastRow + i, // 시작 행 인덱스
						lastRow + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						2, // 시작 열 인덱스 (셀 2)
						3 // 끝 열 인덱스 (셀 3)
				));
				cover_cell = coverRow.getCell(2);
				cover_cell.setCellValue(contentData.getResource_name());

				// 최적화 적용
				// coverRow.createCell(4); //5
				for (int j = 0; j < 2; j++) {
					cover_cell = coverRow.getCell(4 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(4 + j);
					}
	          	    cover_cell.setCellStyle(styleTextCenter);
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(lastRow + i, // 시작 행 인덱스
						lastRow + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						4, // 시작 열 인덱스 (셀 2)
						5 // 끝 열 인덱스 (셀 3)
				));
				cover_cell = coverRow.getCell(4);

				if (contentData.getResource_status() > 0) {
					cover_cell.setCellValue("최적화 완료");
				} else {
					cover_cell.setCellValue("미적용");
				}

				// 원본 시간
				// coverRow.createCell(6);
				cover_cell = coverRow.getCell(6);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(6);
				}
				if (contentData.getNew_time() > 0) {
					cover_cell.setCellValue(timeUnitFormatter(contentData.getOrg_time()));
	          	    cover_cell.setCellStyle(styleTextRigth);
				} else {
					cover_cell.setCellValue("최적화 전");
	          	    cover_cell.setCellStyle(styleTextRigth);
				}

				// 최적화 시간
				// coverRow.createCell(7);
				for (int j = 0; j < 2; j++) {
					cover_cell = coverRow.getCell(7 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(7 + j);
					}
	          	    cover_cell.setCellStyle(styleTextRigth);
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(lastRow + i, // 시작 행 인덱스
						lastRow + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						7, // 시작 열 인덱스 (셀 2)
						8 // 끝 열 인덱스 (셀 3)
				));

				cover_cell = coverRow.getCell(7);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(7);
				}
				if (contentData.getNew_time() > 0) {
					cover_cell.setCellValue(timeUnitFormatter(contentData.getNew_time()));
				} else {
					cover_cell.setCellValue("최적화 전");
				}

				// 단축률
				cover_cell = coverRow.getCell(9);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(9);
				}
						
				double percent = contentData.getCalcPercent();
						

				cover_cell.setCellValue((percent <= 0.0) ? "최적화 전" : String.format("%.1f%%", percent));
          	    cover_cell.setCellStyle(styleTextRigth);
			
			}
			
			// 테두리 적용
//						for (int i = rowStart; i <rowStart + contentListRe.size(); i++) {
//							Row row = cover_sheet.getRow(i);
//							if (row == null) {
//								row = cover_sheet.createRow(i);
//							}
//							for (int j = 0; j < row.getLastCellNum(); j++) {
//								Cell cell = row.getCell(j);
//								if (cell == null) {
//									cell = row.createCell(j);
//								}
//								cell.setCellStyle(borderStyle);
//							}
//						}
		}
		
		// 렌더링 속도가 가장 많이 단축된 페이지
		if (getUrl1 != null && !getUrl1.isEmpty()) {
			ReportVO urlList = getUrl1.get(0);
			coverRow = cover_sheet.getRow(40);
			cover_cell = coverRow.getCell(0);
			cover_cell.setCellValue(
					urlList.getSite_address() + urlList.getPage_url() + " (" + urlList.getPercent() + "%" + " 향상)");
		}
		

		// 테두리 적용
		for (int i = 40; i <= 40; i++) {
			Row row = cover_sheet.getRow(i);
			if (row == null) {
				row = cover_sheet.createRow(i);
			}
			for (int j = 0; j < row.getLastCellNum(); j++) {
				Cell cell = row.getCell(j);
				if (cell == null) {
					cell = row.createCell(j);
				}
				cell.setCellStyle(borderStyle);
			}
		}
		// 테두리 스타일 생성
				borderStyle = workbook.createCellStyle();
				borderStyle.setBorderTop(BorderStyle.THIN);
				borderStyle.setBorderBottom(BorderStyle.THIN);
				borderStyle.setBorderLeft(BorderStyle.THIN);
				borderStyle.setBorderRight(BorderStyle.THIN);
		// 페이지별 렌더링 시간 단축률
		if (getUrlData != null && !getUrlData.isEmpty()) {
			for (int i = 0; i < getUrlData.size(); i++) {
				ReportVO urlList = getUrlData.get(i);
				coverRow = cover_sheet.getRow(44 + i);
				if (coverRow == null) {
					coverRow = cover_sheet.createRow(44 + i);
				}

				// 페이지 명
				for (int j = 0; j < 6; j++) {
					cover_cell = coverRow.getCell(0 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(0 + j);
					}
					cover_cell.setCellStyle(borderStyle);
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(44 + i, // 시작 행 인덱스
						44 + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						0, // 시작 열 인덱스 (셀 2)
						5 // 끝 열 인덱스 (셀 3)
				));
				cover_cell = coverRow.getCell(0);
				cover_cell.setCellValue(urlList.getSite_address() + urlList.getPage_url());
				cover_cell.setCellStyle(borderStyle);

				// 기존 시간
				cover_cell = coverRow.getCell(6);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(6);
				}
				cover_cell.setCellValue(timeUnitFormatter(urlList.getOrg_time()));
          	    cover_cell.setCellStyle(styleTextRigth);

				// 최적화 후 시간
				for (int j = 0; j < 2; j++) {
					cover_cell = coverRow.getCell(7 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(7 + j);
					}
	          	    cover_cell.setCellStyle(styleTextRigth);
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(44 + i, // 시작 행 인덱스
						44 + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						7, // 시작 열 인덱스 (셀 2)
						8 // 끝 열 인덱스 (셀 3)
				));
				cover_cell = coverRow.getCell(7);
				cover_cell.setCellValue(timeUnitFormatter(urlList.getNew_time()));
          	    cover_cell.setCellStyle(styleTextRigth);

				// 단축률
				cover_cell = coverRow.getCell(9);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(9);
				}
				cover_cell.setCellValue(urlList.getPercent() + "%");
          	    cover_cell.setCellStyle(styleTextRigth);
			}
		}

		int startRow = 44; // 시작 행 인덱스 (0부터 시작)
		int lastRow = 44 + getUrlData.size() - 1; // 마지막 행 인덱스

		

		// 테두리 적용
//		for (int i = startRow; i <= lastRow; i++) {
//			Row row = cover_sheet.getRow(i);
//			if (row == null) {
//				row = cover_sheet.createRow(i);
//			}
//			for (int j = 0; j < row.getLastCellNum(); j++) {
//				Cell cell = row.getCell(j);
//				if (cell == null) {
//					cell = row.createCell(j);
//				}
//				cell.setCellStyle(borderStyle);
//			}
//		}

		lastRow = 44;
		startRow = lastRow;
		coverRow = cover_sheet.getRow(lastRow);
		if (coverRow == null) {
			coverRow = cover_sheet.createRow(lastRow);
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/*

		// 점검 대상 사이트
		//List<ReportVO> timeData = selectAvgTimeGroup(reportVO);

		if (timeData != null && !timeData.isEmpty()) {
			for (int i = 0; i < timeData.size(); i++) {
				ReportVO timeList = timeData.get(i);
				coverRow = cover_sheet.getRow(11);
				switch (timeList.getResource_type()) {
				case 1:

					cover_cell = coverRow.getCell(0);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(0);
					}
					cover_cell.setCellValue(timeList.getPercent() + "%");

					break;
				case 2:

					cover_cell = coverRow.getCell(2);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(2);
					}
					cover_cell.setCellValue(timeList.getPercent() + "%");

					break;
				case 3:

					cover_cell = coverRow.getCell(4);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(4);
					}
					cover_cell.setCellValue(timeList.getPercent() + "%");

					break;
				case 4:

					cover_cell = coverRow.getCell(6);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(6);
					}
					cover_cell.setCellValue(timeList.getPercent() + "%");

					break;
				default:
					break;
				}

			}
		}

		// 렌더링 속도가 가장 많이 단축된 페이지
		//List<ReportVO> getUrl1 = getUrl(reportVO);
		if (getUrl1 != null && !getUrl1.isEmpty()) {
			ReportVO urlList = getUrl1.get(0);
			coverRow = cover_sheet.getRow(15);
			cover_cell = coverRow.getCell(0);
			cover_cell.setCellValue(
					urlList.getSite_address() + urlList.getPage_url() + " (" + urlList.getPercent() + "%" + " 향상)");
		}
		// 테두리 스타일 생성
		CellStyle borderStyle = workbook.createCellStyle();
		borderStyle.setBorderTop(BorderStyle.THIN);
		borderStyle.setBorderBottom(BorderStyle.THIN);
		borderStyle.setBorderLeft(BorderStyle.THIN);
		borderStyle.setBorderRight(BorderStyle.THIN);

		// 테두리 적용
		for (int i = 40; i <= 40; i++) {
			Row row = cover_sheet.getRow(i);
			if (row == null) {
				row = cover_sheet.createRow(i);
			}
			for (int j = 0; j < row.getLastCellNum(); j++) {
				Cell cell = row.getCell(j);
				if (cell == null) {
					cell = row.createCell(j);
				}
				cell.setCellStyle(borderStyle);
			}
		}

		// 페이지별 렌더링 시간 단축률
		//List<ReportVO> getUrlData = getUrlforReport(reportVO);

		if (getUrlData != null && !getUrlData.isEmpty()) {
			for (int i = 0; i < getUrlData.size(); i++) {
				ReportVO urlList = getUrlData.get(i);
				coverRow = cover_sheet.getRow(56 + i);
				if (coverRow == null) {
					coverRow = cover_sheet.createRow(56 + i);
				}

				// 페이지 명
				for (int j = 0; j < 5; j++) {
					cover_cell = coverRow.getCell(0 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(0 + j);
					}
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(56 + i, // 시작 행 인덱스
						56 + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						0, // 시작 열 인덱스 (셀 2)
						5 // 끝 열 인덱스 (셀 3)
				));
				cover_cell = coverRow.getCell(0);
				cover_cell.setCellValue(urlList.getSite_address() + urlList.getPage_url());

				// 기존 시간
				cover_cell = coverRow.getCell(6);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(6);
				}
				cover_cell.setCellValue(timeUnitFormatter(urlList.getOrg_time()));

				// 최적화 후 시간
				for (int j = 0; j < 2; j++) {
					cover_cell = coverRow.getCell(7 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(7 + j);
					}
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(56 + i, // 시작 행 인덱스
						56 + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						7, // 시작 열 인덱스 (셀 2)
						8 // 끝 열 인덱스 (셀 3)
				));
				cover_cell = coverRow.getCell(7);
				cover_cell.setCellValue(timeUnitFormatter(urlList.getNew_time()));

				// 단축률
				cover_cell = coverRow.getCell(9);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(9);
				}
				cover_cell.setCellValue(urlList.getPercent() + "%");
			}
		}

		int startRow = 13; // 시작 행 인덱스 (0부터 시작)
		lastRow = 13 + getUrlData.size() - 1; // 마지막 행 인덱스

		// 테두리 스타일 생성
		borderStyle = workbook.createCellStyle();
		borderStyle.setBorderTop(BorderStyle.THIN);
		borderStyle.setBorderBottom(BorderStyle.THIN);
		borderStyle.setBorderLeft(BorderStyle.THIN);
		borderStyle.setBorderRight(BorderStyle.THIN);

		// 테두리 적용
		for (int i = startRow; i <= lastRow; i++) {
			Row row = cover_sheet.getRow(i);
			if (row == null) {
				row = cover_sheet.createRow(i);
			}
			for (int j = 0; j < row.getLastCellNum(); j++) {
				Cell cell = row.getCell(j);
				if (cell == null) {
					cell = row.createCell(j);
				}
				cell.setCellStyle(borderStyle);
			}
		}

		lastRow = 41;
		startRow = lastRow;
		coverRow = cover_sheet.getRow(lastRow);
		if (coverRow == null) {
			coverRow = cover_sheet.createRow(lastRow);
		}

		// 웹 콘텐츠의 렌더링 시간 단축률
		for (int j = 0; j < 10; j++) {
			cover_cell = coverRow.getCell(0 + j);
			if (cover_cell == null) {
				cover_cell = coverRow.createCell(0 + j);
			}
		}
		cover_sheet.addMergedRegion(new CellRangeAddress(lastRow, // 시작 행 인덱스
				lastRow, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
				0, // 시작 열 인덱스 (셀 2)
				9 // 끝 열 인덱스 (셀 3)
		));
		cover_cell = coverRow.getCell(0);
		cover_cell.setCellValue("o 웹 콘텐츠의 렌더링 시간 단축률");

		lastRow = lastRow + 1;

		// 표 제목 만들기
		coverRow = cover_sheet.getRow(lastRow);
		if (coverRow == null) {
			coverRow = cover_sheet.createRow(lastRow);
		}
		// 순번

		cover_cell = coverRow.getCell(0);
		if (cover_cell == null) {
			cover_cell = coverRow.createCell(0);
		}
		cover_cell.setCellValue("순번");

		// 구분
		// coverRow.createCell(1);
		cover_cell = coverRow.getCell(1);
		if (cover_cell == null) {
			cover_cell = coverRow.createCell(1);
		}
		cover_cell.setCellValue("구분");

		// 웹 콘텐츠 이름
		// coverRow.createCell(2); //3도 병합
		for (int j = 0; j < 2; j++) {
			cover_cell = coverRow.getCell(2 + j);
			if (cover_cell == null) {
				cover_cell = coverRow.createCell(2 + j);
			}
		}
		cover_sheet.addMergedRegion(new CellRangeAddress(lastRow, // 시작 행 인덱스
				lastRow, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
				2, // 시작 열 인덱스 (셀 2)
				3 // 끝 열 인덱스 (셀 3)
		));
		cover_cell = coverRow.getCell(2);
		cover_cell.setCellValue("웹 콘텐츠 이름");

		// 최적화 적용
		// coverRow.createCell(4); //5
		for (int j = 0; j < 2; j++) {
			cover_cell = coverRow.getCell(4 + j);
			if (cover_cell == null) {
				cover_cell = coverRow.createCell(4 + j);
			}
		}
		cover_sheet.addMergedRegion(new CellRangeAddress(lastRow, // 시작 행 인덱스
				lastRow, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
				4, // 시작 열 인덱스 (셀 2)
				5 // 끝 열 인덱스 (셀 3)
		));
		cover_cell = coverRow.getCell(4);
		cover_cell.setCellValue("최적화 적용");

		// 원본 시간
		// coverRow.createCell(6);
		cover_cell = coverRow.getCell(6);
		if (cover_cell == null) {
			cover_cell = coverRow.createCell(6);
		}
		cover_cell.setCellValue("기존 시간");

		// 최적화 시간
		// coverRow.createCell(7);
		for (int j = 0; j < 2; j++) {
			cover_cell = coverRow.getCell(7 + j);
			if (cover_cell == null) {
				cover_cell = coverRow.createCell(7 + j);
			}
		}
		cover_sheet.addMergedRegion(new CellRangeAddress(lastRow, // 시작 행 인덱스
				lastRow, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
				7, // 시작 열 인덱스 (셀 2)
				8 // 끝 열 인덱스 (셀 3)
		));

		cover_cell = coverRow.getCell(7);
		if (cover_cell == null) {
			cover_cell = coverRow.createCell(7);
		}
		cover_cell.setCellValue("최적화 후 시간");

		// 단축률
		cover_cell = coverRow.getCell(9);
		if (cover_cell == null) {
			cover_cell = coverRow.createCell(9);
		}
		cover_cell.setCellValue("단축률");

		// 표 내용 시작
		lastRow = lastRow + 1;
		//List<ReportVO> contentList = selectTimeResourceForReport(reportVO);

		if (contentList != null && !contentList.isEmpty()) {
			for (int i = 0; i < contentList.size(); i++) {

				ReportVO contentData = contentList.get(i);
				coverRow = cover_sheet.getRow(lastRow + i);
				if (coverRow == null) {
					coverRow = cover_sheet.createRow(lastRow + i);
				}
				// 순번

				cover_cell = coverRow.getCell(0);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(0);
				}
				cover_cell.setCellValue(contentData.getNo());

				// 구분
				// coverRow.createCell(1);
				cover_cell = coverRow.getCell(1);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(1);
				}
				cover_cell.setCellValue(chkType(contentData.getResource_type()));

				// 웹 콘텐츠 이름
				// coverRow.createCell(2); //3도 병합
				for (int j = 0; j < 2; j++) {
					cover_cell = coverRow.getCell(2 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(2 + j);
					}
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(lastRow + i, // 시작 행 인덱스
						lastRow + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						2, // 시작 열 인덱스 (셀 2)
						3 // 끝 열 인덱스 (셀 3)
				));
				cover_cell = coverRow.getCell(2);
				cover_cell.setCellValue(contentData.getResource_name());

				// 최적화 적용
				// coverRow.createCell(4); //5
				for (int j = 0; j < 2; j++) {
					cover_cell = coverRow.getCell(4 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(4 + j);
					}
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(lastRow + i, // 시작 행 인덱스
						lastRow + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						4, // 시작 열 인덱스 (셀 2)
						5 // 끝 열 인덱스 (셀 3)
				));
				cover_cell = coverRow.getCell(4);

				if (contentData.getResource_status() > 0) {
					cover_cell.setCellValue("최적화 완료");
				} else {
					cover_cell.setCellValue("미적용");
				}

				// 원본 시간
				// coverRow.createCell(6);
				cover_cell = coverRow.getCell(6);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(6);
				}
				if (contentData.getNew_time() > 0) {
					cover_cell.setCellValue(timeUnitFormatter(contentData.getOrg_time()));
				} else {
					cover_cell.setCellValue("최적화 전");
				}

				// 최적화 시간
				// coverRow.createCell(7);
				for (int j = 0; j < 2; j++) {
					cover_cell = coverRow.getCell(7 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(7 + j);
					}
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(lastRow + i, // 시작 행 인덱스
						lastRow + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						7, // 시작 열 인덱스 (셀 2)
						8 // 끝 열 인덱스 (셀 3)
				));

				cover_cell = coverRow.getCell(7);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(7);
				}
				if (contentData.getNew_time() > 0) {
					cover_cell.setCellValue(timeUnitFormatter(contentData.getNew_time()));
				} else {
					cover_cell.setCellValue("최적화 전");
				}

				// 단축률
				cover_cell = coverRow.getCell(9);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(9);
				}
				if (contentData.getOrg_time() != 0) {
					double percent = ((double) contentData.getOrg_time() - contentData.getNew_time())
							/ contentData.getOrg_time() * 100;

					cover_cell.setCellValue(String.format("%.2f%%", percent));
				} else {
					cover_cell.setCellValue("최적화 전");
				}

			}

			// 테두리 스타일 생성
			borderStyle = workbook.createCellStyle();
			borderStyle.setBorderTop(BorderStyle.THIN);
			borderStyle.setBorderBottom(BorderStyle.THIN);
			borderStyle.setBorderLeft(BorderStyle.THIN);
			borderStyle.setBorderRight(BorderStyle.THIN);

			// 테두리 적용
			for (int i = startRow + 1; i <= startRow + contentList.size() + 1; i++) {
				Row row = cover_sheet.getRow(i);
				if (row == null) {
					row = cover_sheet.createRow(i);
				}
				for (int j = 0; j < row.getLastCellNum(); j++) {
					Cell cell = row.getCell(j);
					if (cell == null) {
						cell = row.createCell(j);
					}
					cell.setCellStyle(borderStyle);
				}
			}
		}
		*/

		return workbook;
	}
	
	private XSSFWorkbook checkList_V2(XSSFWorkbook workbook, ReportVO reportVO) {

		Sheet cover_sheet = workbook.getSheetAt(3);
		Row coverRow = cover_sheet.getRow(0);
		Cell cover_cell = coverRow.getCell(0);
		
		
		// 1. 데이터 리스트업
		
		// 점검 대상 사이트
		List<ReportVO> timeData = selectAvgPerGroup(reportVO);
		// 렌더링 속도가 가장 많이 단축된 페이지
		List<ReportVO> getUrl1 = getUrl(reportVO);
		// 페이지별 렌더링 시간 단축률
		List<ReportVO> getUrlData = getUrlforReport(reportVO);
		//웹 콘텐츠의 렌더링 시간 향상률 TOP 10
		List<ReportVO> contentList = selectTimeResourceForReportV2(reportVO);
		if(contentList!=null && contentList.size()>10) {
			contentList = contentList.subList(0, 10);
		}
		//웹 콘텐츠의 렌더링 시간이 느린 웹 콘텐츠 TOP 10
		List<ReportVO> contentListRe = selectTimeResourceForReportReV2(reportVO);
		if(contentListRe!=null && contentListRe.size()>10) {
			contentListRe = contentListRe.subList(0, 10);
		}
		
		
		// 2. 데이터 바인딩
		
		 // 행 스타일 생성
        CellStyle rowStyle = workbook.createCellStyle();
        rowStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex()); // 연한 회색 배경
        rowStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        // 폰트 가운데 정렬 설정
        rowStyle.setAlignment(HorizontalAlignment.CENTER);
        rowStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        // 전체 테두리 설정
        rowStyle.setBorderTop(BorderStyle.THIN);
        rowStyle.setBorderBottom(BorderStyle.THIN);
        rowStyle.setBorderLeft(BorderStyle.THIN);
        rowStyle.setBorderRight(BorderStyle.THIN);

        
        CellStyle borderStyle = workbook.createCellStyle();
		borderStyle.setBorderTop(BorderStyle.THIN);
		borderStyle.setBorderBottom(BorderStyle.THIN);
		borderStyle.setBorderLeft(BorderStyle.THIN);
		borderStyle.setBorderRight(BorderStyle.THIN);
        // 배열 선언 및 초기화
        int[] numbers = new int[4];

        // 배열에 데이터 추가
        numbers[0] = 10;
        numbers[1] = 14;
        numbers[2] = 27;
        numbers[3] = 55;
        
		//웹 콘텐츠 타입별 렌더링 시간 단축률
		if (timeData != null && !timeData.isEmpty()) {
			for (int i = 0; i < timeData.size(); i++) {
				ReportVO timeList = timeData.get(i);
				coverRow = cover_sheet.getRow(11);
				
				
				
				
				switch (timeList.getResource_type()) {
				
				case 5:

					cover_cell = coverRow.getCell(0);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(0);
					}
					cover_cell.setCellValue((int)Math.ceil(timeList.getPercent()) + "%");

					break;
				case 6:

					cover_cell = coverRow.getCell(2);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(2);
					}
					cover_cell.setCellValue((int)Math.ceil(timeList.getPercent()) + "%");

					break;
				case 7:

					cover_cell = coverRow.getCell(4);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(4);
					}
					cover_cell.setCellValue((int)Math.ceil(timeList.getPercent()) + "%");

					break;
				case 8:

					cover_cell = coverRow.getCell(6);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(6);
					}
					cover_cell.setCellValue((int)Math.ceil(timeList.getPercent()) + "%");

					break;
				case 9:

					cover_cell = coverRow.getCell(8);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(8);
					}
					cover_cell.setCellValue((int)Math.ceil(timeList.getPercent()) + "%");

					break;
				default:
					break;
				}

			}
		}
		// 셀 스타일 생성 또는 가져오기
        CellStyle styleTextCenter = cover_sheet.getWorkbook().createCellStyle();

        // 가운데 정렬 설정
        styleTextCenter.setAlignment(HorizontalAlignment.CENTER);
        styleTextCenter.setBorderTop(BorderStyle.THIN);
        styleTextCenter.setBorderBottom(BorderStyle.THIN);
        styleTextCenter.setBorderLeft(BorderStyle.THIN);
        styleTextCenter.setBorderRight(BorderStyle.THIN);
        
     // 셀 스타일 생성 또는 가져오기
        CellStyle styleTextRigth = cover_sheet.getWorkbook().createCellStyle();

        // 가운데 정렬 설정
        styleTextRigth.setAlignment(HorizontalAlignment.RIGHT);
        styleTextRigth.setBorderTop(BorderStyle.THIN);
        styleTextRigth.setBorderBottom(BorderStyle.THIN);
        styleTextRigth.setBorderLeft(BorderStyle.THIN);
        styleTextRigth.setBorderRight(BorderStyle.THIN);
        

        // 셀 스타일 생성 또는 가져오기
           CellStyle styleTextLeft = cover_sheet.getWorkbook().createCellStyle();

           // 가운데 정렬 설정
           styleTextLeft.setAlignment(HorizontalAlignment.LEFT);
           styleTextLeft.setBorderTop(BorderStyle.THIN);
           styleTextLeft.setBorderBottom(BorderStyle.THIN);
           styleTextLeft.setBorderLeft(BorderStyle.THIN);
           styleTextLeft.setBorderRight(BorderStyle.THIN);
        
     // 행 스타일 생성
        CellStyle headerStyle = workbook.createCellStyle();
        XSSFColor lightGray = new XSSFColor(new Color(217, 217, 217), null);

        
        headerStyle.setFillForegroundColor(lightGray); // 연한 회색 배경
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        // 폰트 가운데 정렬 설정
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        // 전체 테두리 설정
        headerStyle.setBorderTop(BorderStyle.THIN);
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setBorderLeft(BorderStyle.THIN);
        headerStyle.setBorderRight(BorderStyle.THIN);
		
		// 웹 콘텐츠의 렌더링 시간 향상률 TOP 10
		if(contentList!=null  && contentList.size()>0) {
			// 행 시작점
			int rowStart = 15;
			int lastRow = rowStart; // 마지막 행 인덱스
			for (int i = 0; i < contentList.size(); i++) {

				ReportVO contentData = contentList.get(i);
				coverRow = cover_sheet.getRow(lastRow + i);
				
				if (coverRow == null) {
					coverRow = cover_sheet.createRow(lastRow + i);
				}
				// 순번
				cover_cell = coverRow.getCell(0);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(0);
				}
				cover_cell.setCellValue(i+1);
                // 스타일을 셀에 적용
                cover_cell.setCellStyle(styleTextCenter);

				// 구분
				// coverRow.createCell(1);
				cover_cell = coverRow.getCell(1);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(1);
				}
				cover_cell.setCellValue(chkType(contentData.getResource_type()));
                // 스타일을 셀에 적용
                cover_cell.setCellStyle(styleTextCenter);

				// 웹 콘텐츠 이름
				// coverRow.createCell(2); //3도 병합
				for (int j = 0; j < 2; j++) {
					cover_cell = coverRow.getCell(2 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(2 + j);
					}
	                // 스타일을 셀에 적용
	                cover_cell.setCellStyle(styleTextLeft);
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(lastRow + i, // 시작 행 인덱스
						lastRow + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						2, // 시작 열 인덱스 (셀 2)
						3 // 끝 열 인덱스 (셀 3)
				));
				cover_cell = coverRow.getCell(2);
				cover_cell.setCellValue(contentData.getResource_name());

				// 최적화 적용
				// coverRow.createCell(4); //5
				for (int j = 0; j < 2; j++) {
					cover_cell = coverRow.getCell(4 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(4 + j);
					}
	                // 스타일을 셀에 적용
	                cover_cell.setCellStyle(styleTextCenter);
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(lastRow + i, // 시작 행 인덱스
						lastRow + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						4, // 시작 열 인덱스 (셀 2)
						5 // 끝 열 인덱스 (셀 3)
				));
				cover_cell = coverRow.getCell(4);

				if (contentData.getResource_status() > 0) {
					cover_cell.setCellValue("최적화 완료");
				} else {
					cover_cell.setCellValue("미적용");
				}

				// 원본 시간
				// coverRow.createCell(6);
				cover_cell = coverRow.getCell(6);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(6);
				}
				if (contentData.getResource_org_size() > 0) {
					cover_cell.setCellValue(fileSizeUnitFormatter(contentData.getResource_org_size()));
	                // 스타일을 셀에 적용
	                cover_cell.setCellStyle(styleTextRigth);
				} else {
					cover_cell.setCellValue("최적화 전");
	                // 스타일을 셀에 적용
	                cover_cell.setCellStyle(styleTextRigth);
				}

				// 최적화 시간
				// coverRow.createCell(7);
				for (int j = 0; j < 2; j++) {
					cover_cell = coverRow.getCell(7 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(7 + j);
					}
	                // 스타일을 셀에 적용
	                cover_cell.setCellStyle(styleTextRigth);
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(lastRow + i, // 시작 행 인덱스
						lastRow + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						7, // 시작 열 인덱스 (셀 2)
						8 // 끝 열 인덱스 (셀 3)
				));

				cover_cell = coverRow.getCell(7);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(7);
				}
				if (contentData.getResource_type1_size() > 0) {
					cover_cell.setCellValue(fileSizeUnitFormatter(contentData.getResource_type1_size()));
				} else {
					cover_cell.setCellValue("최적화 전");
				}

				// 단축률
				cover_cell = coverRow.getCell(9);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(9);
				}
				
				double percent = contentData.getCalcPercent();
				

				cover_cell.setCellValue((percent <= 0.0) ? "최적화 전" : String.format("%.1f%%", percent));
                // 스타일을 셀에 적용
                cover_cell.setCellStyle(styleTextRigth);
				
			}
			// 테두리 적용
//						for (int i = rowStart; i <rowStart + contentList.size(); i++) {
//							Row row = cover_sheet.getRow(i);
//							if (row == null) {
//								row = cover_sheet.createRow(i);
//							}
//							for (int j = 0; j < 10; j++) {
//								Cell cell = row.getCell(j);
//								if (cell == null) {
//									cell = row.createCell(j);
//								}
//								cell.setCellStyle(borderStyle);
//							}
//						}
		}
		
		// 웹 콘텐츠의 렌더링 시간 향상률 TOP 10
		if(contentListRe!=null  && contentListRe.size()>0) {
			// 행 시작점
			int rowStart = 28;
			int lastRow = rowStart; // 마지막 행 인덱스
			for (int i = 0; i < contentListRe.size(); i++) {

				ReportVO contentData = contentListRe.get(i);
				coverRow = cover_sheet.getRow(lastRow + i);
						
				if (coverRow == null) {
					coverRow = cover_sheet.createRow(lastRow + i);
				}
				// 순번
				cover_cell = coverRow.getCell(0);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(0);
				}
				cover_cell.setCellValue(i+1);
                // 스타일을 셀에 적용
                cover_cell.setCellStyle(styleTextCenter);

				// 구분
				// coverRow.createCell(1);
				cover_cell = coverRow.getCell(1);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(1);
				}
				cover_cell.setCellValue(chkType(contentData.getResource_type()));
                // 스타일을 셀에 적용
                cover_cell.setCellStyle(styleTextCenter);

				// 웹 콘텐츠 이름
				// coverRow.createCell(2); //3도 병합
				for (int j = 0; j < 2; j++) {
					cover_cell = coverRow.getCell(2 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(2 + j);
					}

	                // 스타일을 셀에 적용
	                cover_cell.setCellStyle(styleTextLeft);
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(lastRow + i, // 시작 행 인덱스
						lastRow + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						2, // 시작 열 인덱스 (셀 2)
						3 // 끝 열 인덱스 (셀 3)
				));
				cover_cell = coverRow.getCell(2);
				cover_cell.setCellValue(contentData.getResource_name());

				// 최적화 적용
				// coverRow.createCell(4); //5
				for (int j = 0; j < 2; j++) {
					cover_cell = coverRow.getCell(4 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(4 + j);
					}
	                // 스타일을 셀에 적용
	                cover_cell.setCellStyle(styleTextCenter);
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(lastRow + i, // 시작 행 인덱스
						lastRow + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						4, // 시작 열 인덱스 (셀 2)
						5 // 끝 열 인덱스 (셀 3)
				));
				cover_cell = coverRow.getCell(4);

				if (contentData.getResource_status() > 0) {
					cover_cell.setCellValue("최적화 완료");
				} else {
					cover_cell.setCellValue("미적용");
				}

				// 원본 시간
				// coverRow.createCell(6);
				cover_cell = coverRow.getCell(6);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(6);
				}
				if (contentData.getResource_org_size() > 0) {
					cover_cell.setCellValue(fileSizeUnitFormatter(contentData.getResource_org_size()));
	                // 스타일을 셀에 적용
	                cover_cell.setCellStyle(styleTextRigth);
				} else {
					cover_cell.setCellValue("최적화 전");
	                // 스타일을 셀에 적용
	                cover_cell.setCellStyle(styleTextRigth);
				}

				// 최적화 시간
				// coverRow.createCell(7);
				for (int j = 0; j < 2; j++) {
					cover_cell = coverRow.getCell(7 + j);
					if (cover_cell == null) {
						cover_cell = coverRow.createCell(7 + j);
					}
	                // 스타일을 셀에 적용
	                cover_cell.setCellStyle(styleTextRigth);
				}
				cover_sheet.addMergedRegion(new CellRangeAddress(lastRow + i, // 시작 행 인덱스
						lastRow + i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
						7, // 시작 열 인덱스 (셀 2)
						8 // 끝 열 인덱스 (셀 3)
				));

				cover_cell = coverRow.getCell(7);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(7);
				}
				if (contentData.getResource_type1_size() > 0) {
					cover_cell.setCellValue(fileSizeUnitFormatter(contentData.getResource_type1_size()));
				} else {
					cover_cell.setCellValue("최적화 전");
				}

				// 단축률
				cover_cell = coverRow.getCell(9);
				if (cover_cell == null) {
					cover_cell = coverRow.createCell(9);
				}
						
				double percent = contentData.getCalcPercent();
						

				cover_cell.setCellValue((percent <= 0.0) ? "최적화 전" : String.format("%.1f%%", percent));
                // 스타일을 셀에 적용
                cover_cell.setCellStyle(styleTextRigth);
			
			}
			// 테두리 적용
//			for (int i = rowStart; i <rowStart + contentListRe.size(); i++) {
//				Row row = cover_sheet.getRow(i);
//				if (row == null) {
//					row = cover_sheet.createRow(i);
//				}
//				for (int j = 0; j < row.getLastCellNum(); j++) {
//					Cell cell = row.getCell(j);
//					if (cell == null) {
//						cell = row.createCell(j);
//					}
//					cell.setCellStyle(borderStyle);
//				}
//			}
		}
		return workbook;
	}
	
	
	
	
	private List<ReportVO> selectAvgPerGroup(ReportVO reportVO) {
		return reportMapper.selectAvgPerGroup(reportVO);
	}

	private XSSFWorkbook checkResult(XSSFWorkbook workbook, ReportVO reportVO) {
		
		Sheet cover_sheet = workbook.getSheetAt(4); 		
        Row coverRow = cover_sheet.getRow(0);
        Cell cover_cell = coverRow.getCell(0);
        
     // 셀 스타일 생성 또는 가져오기
        CellStyle styleTextCenter = cover_sheet.getWorkbook().createCellStyle();

        // 가운데 정렬 설정
        styleTextCenter.setAlignment(HorizontalAlignment.CENTER);
        styleTextCenter.setBorderTop(BorderStyle.THIN);
        styleTextCenter.setBorderBottom(BorderStyle.THIN);
        styleTextCenter.setBorderLeft(BorderStyle.THIN);
        styleTextCenter.setBorderRight(BorderStyle.THIN);
        
     // 셀 스타일 생성 또는 가져오기
        CellStyle styleTextRigth = cover_sheet.getWorkbook().createCellStyle();

        // 가운데 정렬 설정
        styleTextRigth.setAlignment(HorizontalAlignment.RIGHT);
        styleTextRigth.setBorderTop(BorderStyle.THIN);
        styleTextRigth.setBorderBottom(BorderStyle.THIN);
        styleTextRigth.setBorderLeft(BorderStyle.THIN);
        styleTextRigth.setBorderRight(BorderStyle.THIN);
        

        // 셀 스타일 생성 또는 가져오기
           CellStyle styleTextLeft = cover_sheet.getWorkbook().createCellStyle();

           // 가운데 정렬 설정
           styleTextLeft.setAlignment(HorizontalAlignment.LEFT);
           styleTextLeft.setBorderTop(BorderStyle.THIN);
           styleTextLeft.setBorderBottom(BorderStyle.THIN);
           styleTextLeft.setBorderLeft(BorderStyle.THIN);
           styleTextLeft.setBorderRight(BorderStyle.THIN);
      
        //점검 대상 사이트
        List<ReportVO> titleData = optimizer_title(reportVO);
       
        int startRow =10;
		int lastRow = 10;
        
        if (titleData != null && !titleData.isEmpty()) {
        	for (int i = 0; i < titleData.size(); i++) {
        		ReportVO title = titleData.get(i);
        		
        		
        		coverRow = cover_sheet.getRow(lastRow+i);
        		if (coverRow == null) {
             	    coverRow = cover_sheet.createRow(lastRow + i);
             	}
        		
        		//순번
        		cover_cell = coverRow.getCell(0);
				if (cover_cell == null) {
              	    cover_cell = coverRow.createCell(0);
              	}
				cover_cell.setCellValue(1+i);

                // 스타일을 셀에 적용
                cover_cell.setCellStyle(styleTextCenter);
				
//                //알고리즘 명 
              	for (int j = 0; j < 7; j++) {
                	cover_cell = coverRow.getCell(1+j);
                  	if (cover_cell == null) {
                  	    cover_cell = coverRow.createCell(1+j);
                  	}

                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextLeft);
				}
                cover_sheet.addMergedRegion(new CellRangeAddress(
                		lastRow+i, // 시작 행 인덱스
                		lastRow+i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
                        1, // 시작 열 인덱스 (셀 2)
                        7  // 끝 열 인덱스 (셀 3)
                ));
              	                     	
              	cover_cell = coverRow.getCell(1);
              	if (cover_cell == null) {
              	    cover_cell = coverRow.createCell(1);
              	}
              	
              	cover_cell.setCellValue(title.getAlgorithm_name());
              	
              	
              	//절감치
              	for (int j = 0; j < 2; j++) {
                	cover_cell = coverRow.getCell(8+j);
                  	if (cover_cell == null) {
                  	    cover_cell = coverRow.createCell(8+j);
                  	}

                    // 스타일을 셀에 적용
                    cover_cell.setCellStyle(styleTextRigth);
				}
                cover_sheet.addMergedRegion(new CellRangeAddress(
                		lastRow+i, // 시작 행 인덱스
                		lastRow+i, // 끝 행 인덱스 (같은 행이므로 같은 값을 사용)
                        8, // 시작 열 인덱스 (셀 2)
                        9  // 끝 열 인덱스 (셀 3)
                ));
              	                     	
              	cover_cell = coverRow.getCell(8);
              	if (cover_cell == null) {
              	    cover_cell = coverRow.createCell(8);
              	}
              	cover_cell.setCellValue(fileSizeUnitFormatter(title.getTotal_bytes()));
              	
              	
        	}
        }

      	lastRow=lastRow+titleData.size()+1;
        
        CellStyle borderStyle = workbook.createCellStyle();
        borderStyle.setBorderTop(BorderStyle.THIN);
        borderStyle.setBorderBottom(BorderStyle.THIN);
        borderStyle.setBorderLeft(BorderStyle.THIN);
        borderStyle.setBorderRight(BorderStyle.THIN);
        
        // 행 스타일 생성
        CellStyle headerStyle = workbook.createCellStyle();
        XSSFColor lightGray = new XSSFColor(new Color(217, 217, 217), null);

        
        headerStyle.setFillForegroundColor(lightGray); // 연한 회색 배경
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        // 폰트 가운데 정렬 설정
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        // 전체 테두리 설정
        headerStyle.setBorderTop(BorderStyle.THIN);
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setBorderLeft(BorderStyle.THIN);
        headerStyle.setBorderRight(BorderStyle.THIN);

        // 테두리 적용
        System.out.println("테두리");
        
//        for (int i = startRow; i <= startRow+titleData.size()-1; i++) { //첫로우 마지막로우
//            Row row = cover_sheet.getRow(i);
//            System.out.println(i);
//            if (row == null) {
//                row = cover_sheet.createRow(i);
//            }
//            for (int j = 0; j < 10; j++) { // 가로 스타일
//                Cell cell = row.getCell(j);
//                if (cell == null) {
//                    cell = row.createCell(j);
//                }
//                cell.setCellStyle(borderStyle);
//            }
//        }
        
        if (titleData != null && !titleData.isEmpty()) {
        	List<ReportVO> listData = optimizer_list(reportVO);
        	
        	for (int i = 0; i < titleData.size(); i++) {
        		
        		ReportVO title = titleData.get(i);

        		coverRow = cover_sheet.getRow(lastRow);
        		if (coverRow == null) {
        		    coverRow = cover_sheet.createRow(lastRow);
        		}

        		for (int j = 0; j < 10; j++) {
                	cover_cell = coverRow.getCell(j);
                  	if (cover_cell == null) {
                  	    cover_cell = coverRow.createCell(j);
                  	}
              	    //cover_cell.setCellStyle(borderStyle);
				}
        		
        		cover_sheet.addMergedRegion(new CellRangeAddress(
	        		    lastRow,
	        		    lastRow, 
	        		    0, 
	        		    9 
	        		));
                
        		// 알고리즘 명
        		cover_cell = coverRow.getCell(0);
        		cover_cell.setCellValue("o "+title.getAlgorithm_name());
        		
              	lastRow=lastRow+1;
              	
              	coverRow = cover_sheet.createRow(lastRow);
              	
              	for (int j = 0; j < 10; j++) {
                	cover_cell = coverRow.getCell(j);
                  	if (cover_cell == null) {
                  	    cover_cell = coverRow.createCell(j);
                  	}
              	    //cover_cell.setCellStyle(borderStyle);
              	    cover_cell.setCellStyle(headerStyle);
				}
              	
              	cover_sheet.addMergedRegion(new CellRangeAddress(
	        		    lastRow,
	        		    lastRow, 
	        		    1, 
	        		    3 
	        	));
              	
              	cover_sheet.addMergedRegion(new CellRangeAddress(
	        		    lastRow,
	        		    lastRow, 
	        		    4, 
	        		    5 
	        	));
              	
              	cover_sheet.addMergedRegion(new CellRangeAddress(
	        		    lastRow,
	        		    lastRow, 
	        		    6, 
	        		    7 
	        	));
              	
              	cover_sheet.addMergedRegion(new CellRangeAddress(
	        		    lastRow,
	        		    lastRow, 
	        		    8, 
	        		    9 
	        	));
              	
              	cover_cell = coverRow.getCell(0);
        		cover_cell.setCellValue("순번");
              	
        	 	cover_cell = coverRow.getCell(1);
        		cover_cell.setCellValue("웹 콘텐츠 이름");
              	
        		
        		cover_cell = coverRow.getCell(4);
        		cover_cell.setCellValue("원본 용량");
        		
        		cover_cell = coverRow.getCell(6);
        		cover_cell.setCellValue("최적화 후 용량");
        		
        		cover_cell = coverRow.getCell(8);
        		cover_cell.setCellValue("감소율");
              	
              	
              	lastRow=lastRow+1;
              	
              	
              	int idx=1;
              	
              	for ( int k=0; k<listData.size(); ++k ) {
              		
              		ReportVO tmp = listData.get(k);
              		if ( tmp.getAlgorithm_name().equals(title.getAlgorithm_name())) {
              			
              			coverRow = cover_sheet.createRow(lastRow);
                      	
                      	for (int j = 0; j < 10; j++) {
                        	cover_cell = coverRow.getCell(j);
                          	if (cover_cell == null) {
                          	    cover_cell = coverRow.createCell(j);
                          	}
                      	    cover_cell.setCellStyle(borderStyle);
        				}
                      	
                      	cover_sheet.addMergedRegion(new CellRangeAddress(
    		        		    lastRow,
    		        		    lastRow, 
    		        		    1, 
    		        		    3 
    		        	));
                      	
                      	cover_sheet.addMergedRegion(new CellRangeAddress(
    		        		    lastRow,
    		        		    lastRow, 
    		        		    4, 
    		        		    5 
    		        	));
                      	
                      	cover_sheet.addMergedRegion(new CellRangeAddress(
    		        		    lastRow,
    		        		    lastRow, 
    		        		    6, 
    		        		    7 
    		        	));
                      	
                      	cover_sheet.addMergedRegion(new CellRangeAddress(
    		        		    lastRow,
    		        		    lastRow, 
    		        		    8, 
    		        		    9 
    		        	));
                      	
                      	cover_cell = coverRow.getCell(0);
    	        		cover_cell.setCellValue(idx);

    	                // 스타일을 셀에 적용
    	                cover_cell.setCellStyle(styleTextCenter);
                      	
    	        	 	cover_cell = coverRow.getCell(1);
    	        		cover_cell.setCellValue(tmp.getResource_name());

    	                // 스타일을 셀에 적용
    	                cover_cell.setCellStyle(styleTextLeft);
    	        		
    	        		cover_cell = coverRow.getCell(4);
    	        		cover_cell.setCellValue(fileSizeUnitFormatter(tmp.getResource_org_size()));

    	                // 스타일을 셀에 적용
    	                cover_cell.setCellStyle(styleTextRigth);
    	        		
    	        		cover_cell = coverRow.getCell(6);
    	        		cover_cell.setCellValue(fileSizeUnitFormatter(tmp.getGreatest_type()));

    	                // 스타일을 셀에 적용
    	                cover_cell.setCellStyle(styleTextRigth);
    	        		
    	                
    	                
    	                
    	               
    	                
    	                double per = (double)tmp.getGreatest_type() *100/tmp.getResource_org_size();
    	        		per = 100-per;
    	        		
    	        		
    	        		cover_cell = coverRow.getCell(8);
    	        		cover_cell.setCellValue(String.format("%.1f%%", per));

    	        		
    	                
    	                // 스타일을 셀에 적용
    	                cover_cell.setCellStyle(styleTextRigth);
    	        		idx++;
                  		lastRow=lastRow+1;
              		}
              	}
              	
            	lastRow=lastRow+1;
        	}
        }
        
        
        
        
        
        
		return workbook;
	}

	
	
	
		

		public static String timeUnitFormatter(double time) {
		        if (Double.isNaN(time)) {
		            return "유효한 숫자가 아닙니다";
		        }
		        return String.format("%.3f초", time / 1000);
		 }
	
	
	
	
	  public static String fileSizeUnitFormatter(long bytes) {
	        String resultValue;
	        String resultUnit;

	        if (bytes == 0) {
	            resultValue = "0";
	            resultUnit = "byte";
	        } else if (bytes < 1024) {
	            resultValue = String.format("%d", bytes);
	            resultUnit = "byte";
	        } else if (bytes < 1024 * 1024) {
	            resultValue = String.format("%.1f", bytes / 1024.0);
	            resultUnit = "KB";
	        } else if (bytes < 1024 * 1024 * 1024) {
	            resultValue = String.format("%.1f", bytes / (1024.0 * 1024));
	            resultUnit = "MB";
	        } else {
	            resultValue = String.format("%.1f", bytes / (1024.0 * 1024 * 1024));
	            resultUnit = "GB";
	        }

	        return String.format("%s%s", resultValue, resultUnit);
	  }
	  
	  
	  
	  public static String chkType(int cellValue) {
	        String result = "";

	        switch (cellValue) {
	            case 0:
	                result += "폴더"; // 폴더
	                break;
	            case 1:
	                result += "이미지"; // 이미지
	                break;
	            case 2:
	                result += "동영상"; // 동영상
	                break;
	            case 3:
	                result += "텍스트"; // 텍스트
	                break;
	            case 4:
	                result += "폰트"; // 폰트
	                break;
	                
	            case 5:
	                result += "한글"; // 폰트
	                break;
	            case 6:
	                result += "워드"; // 폰트
	                break;
	                
	            case 7:
	                result += "엑셀"; // 폰트
	                break;
	                
	            case 8:
	                result += "PPT"; // 폰트
	                break;
	                
	            case 9:
	                result += "PDF"; // 폰트
	                break;
	            default:
	                result += "알수없음"; // 알 수 없는 값
	                break;
	        }

	        return result;
	    }

	

	
}
