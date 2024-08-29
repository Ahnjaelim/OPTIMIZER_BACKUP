<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<c:set var="mn" value="4" />
<c:set var="sn" value="1" />
<!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="utf-8" />
<title>${title }</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
<meta content="Pichforest" name="author" />
<%@ include file="/WEB-INF/views/includes/plugin.jsp"%>
<link href="${contextPath}/resources/css/report/report.css" rel="stylesheet" type="text/css" />
<script src="${contextPath}/resources/js/report/report_util.js"></script>
<script src="${contextPath}/resources/js/report/report_v2.js"></script>
</head>


<body class="report" data-bs-theme="dark" data-topbar="dark" data-sidebar="dark">
	
					<nav>
						<ul id="navmenu">
							
						</ul>
					</nav>
	<div id="layout-wrapper">
		<%@ include file="/WEB-INF/views/includes/topbar.jsp"%>
		<div class="layout-parent">
		<%@ include file="/WEB-INF/views/includes/sidebar.jsp"%>
		<div class="main-content">
				<div class="page-content">
					<div class="container-fluid">
					
					
						<!-- start page title -->
						<div class="row">
							<h2>비정형 파일 최적화 보고서</h2>
							<br>
						</div>
						
						
						
						<div class="row" style="padding-top:20px" >
							<h4 class="mCha" id="mk1" style="padding">1.개요</h4>
						</div>
							<br> 
							<h5>비정형 파일 최적화의 필요성</h5>
							<div>비정형 파일의 최적화는 데이터 전송량 감소로인한 전송속도 향상,서버 저장공간 절약에 직접적인 영향을 끼칩니다.</div>
							<div><h6>본 보고서는 <span id="currentTime"></span>을 기준으로 비정형 파일의 최적화 작업을 통해 서비스 품질과,사용자 경험을 개선하여 서비스 만족도를 높이기 위해 제공됩니다.</h6></div> 
						
						<h5 style="margin-top:20px;">측정 대상 사이트</h5>
						 <table>
					        <tr>
					            <th>사이트 주소</th>
					            <th>사이트 명</th>
					        </tr>
					        <tr>
					        	<td id="site_name"></td>
					            <td id="site_address"></td>
					        </tr>
					    </table>
						
						
						
						<div class="row" style="padding-top:20px" >
							<h4 class="mCha" id="mk2">2.최적화 현황</h4>
						</div>
						
						<div class="row">
							
							<div class="card" >
								<div class="row">
 								<div class="col-md-12" style="">
									
										<div class="row">
											<div class="col-md-2" id="all_file">
												<ion-icon name="podium-outline"></ion-icon> &ensp;전체 최적화 현황
											</div>
											<div class="col-md-10">
												<div class="row">
													<div class="count d-flex" style="justify-content: space-between;">
														<div class="col" id="opt_cnt"></div>
														<div class="col" id="all_percent"></div>
													</div>
												</div>
												<div class="row"><progress id="progress" max="100" value="1"></progress></div>
												
											</div>
										</div>
								</div>		
								</div>							
							</div>
						</div>
						
						<div class="row">
							<div class="card" style="text-align:center; display:none">
								<div class="row">
									<div class="col-md-3">
										<div class="row">
											<h5 id="imageCnt"></h5>
										</div>
									</div>
									<div class="col-md-3">
										<div class="row">
											<h5 id="videoCnt"></h5>
										</div>
									</div>
									<div class="col-md-3">
										<div class="row">
											<h5 id="textCnt"></h5>
										</div>
									</div>
									<div class="col-md-3">
										<div class="row">
											<h5 id="fontCnt"></h5>
										</div>
									</div>
								</div>
								
								<div class="row" style="">
									<div class="col-md-3">
										<div class="row chart">
											<canvas id="image_chart" ></canvas>
										</div>
										<div class="row" >
											<h5 class="title">이미지최적화 비율</h5>
										</div>
									</div>
									<div class="col-md-3">
										<div class="row chart">
											<canvas id="video_chart"></canvas>
										</div>
										<div class="row">
											<h5 class="title">동영상최적화 비율</h5>
										</div>
									</div>
									<div class="col-md-3">
										<div class="row chart">
											<canvas id="text_content"></canvas>
										</div>
										<div class="row">
											<h5 class="title">텍스트최적화 비율</h5>
										</div>
									</div>
									<div class="col-md-3">
										<div class="row chart">
											<canvas id="font_content" ></canvas>
										</div>
										<div class="row">
											<h5 class="title">폰트최적화 비율</h5>
										</div> 	
									</div>
								</div>
							</div>
							<div class="card" style="text-align:center; ">
								<div class="row">
									<div class="col-md-2">
										<div class="row">
											<h5 id="hanguleCnt"></h5>
										</div>
									</div>
									<div class="col-md-3">
										<div class="row">
											<h5 id="wordCnt"></h5>
										</div>
									</div>
									<div class="col-md-2">
										<div class="row">
											<h5 id="excelCnt"></h5>
										</div>
									</div>
									<div class="col-md-3">
										<div class="row">
											<h5 id="pptCnt"></h5>
										</div>
									</div>
									<div class="col-md-2">
										<div class="row">
											<h5 id="pdfCnt"></h5>
										</div>
									</div>
								</div>
								
								<div class="row" style="">
									<div class="col-md-2">
										<div class="row chart">
											<canvas id="hangule_chart" ></canvas>
										</div>
										<div class="row" >
											<h5 class="title">한글최적화 비율</h5>
										</div>
									</div>
									<div class="col-md-3">
										<div class="row chart">
											<canvas id="word_chart"></canvas>
										</div>
										<div class="row">
											<h5 class="title">워드최적화 비율</h5>
										</div>
									</div>
									<div class="col-md-2">
										<div class="row chart">
											<canvas id="excel_content"></canvas>
										</div>
										<div class="row">
											<h5 class="title">엑셀최적화 비율</h5>
										</div>
									</div>
									<div class="col-md-3">
										<div class="row chart">
											<canvas id="ppt_content" ></canvas>
										</div>
										<div class="row">
											<h5 class="title">PPT최적화 비율</h5>
										</div> 	
									</div>
									<div class="col-md-2">
										<div class="row chart">
											<canvas id="pdf_content" ></canvas>
										</div>
										<div class="row">
											<h5 class="title">PDF최적화 비율</h5>
										</div> 	
									</div>
								</div>
							</div>						
						</div>
						
						
						
						
						
						
						<h5 style="margin-top:20px;">전체 콘텐츠 목록</h5>
							
						<div class="row">
						<div class="d-flex reportSelect" id="selectTypeBox"  style="justify-content: space-between;">	
							<div class="col btn-group search-type" role="group" aria-label="Basic radio toggle button group">
															  
										<input type="radio" class="btn-check" name="resource_type" id="all-item0" autocomplete="off" value="90" checked>
										<label class="btn btn-outline-primary" for="all-item0"> 전체보기</label>
										<input type="radio" class="btn-check" name="resource_type" id="all-item5" autocomplete="off" value="5">
										<label class="btn btn-outline-primary" for="all-item5"><img src="/resources/img/icon-ext-hwp.png" style="width:16px;height:16px;"/> 한글</label>
										<input type="radio" class="btn-check" name="resource_type" id="all-item6" autocomplete="off" value="6">
										<label class="btn btn-outline-primary" for="all-item6"><img src="/resources/img/icon-ext-doc.png" style="width:16px;height:16px;"/> 워드</label>
										<input type="radio" class="btn-check" name="resource_type" id="all-item7" autocomplete="off" value="7">
										<label class="btn btn-outline-primary" for="all-item7"><img src="/resources/img/icon-ext-xls.png" style="width:16px;height:16px;"/> 엑셀</label>
										<input type="radio" class="btn-check" name="resource_type" id="all-item8" autocomplete="off" value="8">
										<label class="btn btn-outline-primary" for="all-item8"><img src="/resources/img/icon-ext-ppt.png" style="width:16px;height:16px;"/> PPT</label>
										<input type="radio" class="btn-check" name="resource_type" id="all-item9" autocomplete="off" value="9">
										<label class="btn btn-outline-primary" for="all-item9"><img src="/resources/img/icon-ext-pdf.png" style="width:16px;height:16px;"/> PDF</label>
										
							</div>			
										 <select id="search-type-1" multiple class="form-select form-select-sm" >
									        <option value="1"><ion-icon name="checkmark-circle"></ion-icon> 최적화 완료</option>
									        <option value="-1"><ion-icon name="remove-circle"></ion-icon> 최적화 미적용</option>
									    </select>
							
							</div>
							<div class="col-md-12">
								<div class="card">											
										<div style="display:flex">
										<div class="count" id="list_cnt" style="padding: 10px;"><i class="fa-regular fa-file"></i> 총 <span>0</span>건</div>
										 
										</div>
										<div id="table_container">
											<div id="volist"></div>
										</div>
										
									
								</div>
							</div>
						</div>
						
						<div style="display:none">
							<canvas id="typeBarChart"></canvas>
						</div>
						
						
						<div class="row" style="padding-top:20px">
							<h4 class="mCha" id="mk3">3.측정 결과</h4>
						</div>
						
						<div class="row">							
							<div class="col-md-12">
								<div class="card">
									<div class="row">
										<div class="col-md custom-col">
											<div class="card timerate">
												<div class="row" >
													<h5><span class="color5">● </span>한글 파일 용량 감소율</h5>
												</div>
												<div class="row">
													<span class="percent color5" id="hangule_rdPercent"></span>
												</div>
												<div class="row">
													<span class="text">한글파일 최적화를 통한<br>파일 용량 감소율을 표시합니다.</span>
												</div>
											</div>
										</div>
										<div class="col-md custom-col">
											<div class="card timerate">
												<div class="row" >
													<h5><span class="color6">● </span>워드 파일 용량 감소율</h5>
												</div>
												<div class="row">
													<span class="percent color6" id="word_rdPercent"></span>
												</div>
												<div class="row">
													<span class="text">워드파일 최적화를 통한<br> 파일 용량 감소율을 표시합니다.</span>
												</div>
											</div>
										</div>
										<div class="col-md custom-col">
											<div class="card timerate">
												<div class="row" >
													<h5><span class="color7">● </span>엑셀 파일 용량 감소율</h5>
												</div>
												<div class="row">
													<span class="percent color7" id="excel_rdPercent"></span>
												</div>
												<div class="row">
													<span class="text">엑셀파일 최적화를 통한<br>파일 용량 감소율을 표시합니다.</span>
												</div>
											</div>
											
										</div>
											<div class="col-md custom-col">
											<div class="card timerate">
												<div class="row" >
													<h5><span class="color8">● </span>PPT 파일 용량 감소율</h5>
												</div>
												<div class="row">
													<span class="percent color8" id="ppt_rdPercent"></span>
												</div>
												<div class="row">
													<span class="text">PPT파일 최적화를 통한<br>파일 용량 감소율을 표시합니다.</span>
												</div>
											</div>
												
										</div>
										<div class="col-md custom-col">
											<div class="card timerate">
												<div class="row" >
													<h5><span class="color9">● </span>PDF 파일 용량 감소율</h5>
												</div>
												<div class="row">
													<span class="percent color9" id="pdf_rdPercent"></span>
												</div>
												<div class="row">
													<span class="text">PDF파일 최적화를 통한<br> 파일 용량 감소율을 표시합니다.</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						
						<div class="row" style="margin-top:15px;display:none;">
								<div class="col-sm-12" >
									<div class="card" style="text-align:center;">
										<div class="row" style="padding-top:10px;">
											<h5 class="title">렌더링 속도가 가장 빨라진 페이지 <span id="page_url"></span> <span id ="page_percent"></span></h5>
										</div>
										<div class="row">
											<div id="captureArea" style="height:386px"></div>
										</div>
									</div>
								</div>
						</div>		
											
							
				
						
						
						
						
						
						<div class="row" style="padding-top:20px">
								
								<div class="d-flex" style="max-width:1000px">
								<div class="col btn-group search-type" role="group" aria-label="Basic radio toggle button group">
									<input type="radio" class="btn-check" name="resource_type2" id="type-array-item0" autocomplete="off" value="90" checked>
									<label class="btn btn-outline-primary" for="type-array-item0"> 전체보기</label>
									
									<input type="radio" class="btn-check" name="resource_type2" id="type-array-item5" autocomplete="off" value="5">
									<label class="btn btn-outline-primary" for="type-array-item5"><img src="/resources/img/icon-ext-hwp.png" style="width:16px;height:16px;"/> 한글</label>
									<input type="radio" class="btn-check" name="resource_type2" id="type-array-item6" autocomplete="off" value="6">
									<label class="btn btn-outline-primary" for="type-array-item6"><img src="/resources/img/icon-ext-doc.png" style="width:16px;height:16px;"/> 워드</label>
									<input type="radio" class="btn-check" name="resource_type2" id="type-array-item7" autocomplete="off" value="7">
									<label class="btn btn-outline-primary" for="type-array-item7"><img src="/resources/img/icon-ext-xls.png" style="width:16px;height:16px;"/> 엑셀</label>
									<input type="radio" class="btn-check" name="resource_type2" id="type-array-item8" autocomplete="off" value="8">
									<label class="btn btn-outline-primary" for="type-array-item8"><img src="/resources/img/icon-ext-ppt.png" style="width:16px;height:16px;"/> PPT</label>
									<input type="radio" class="btn-check" name="resource_type2" id="type-array-item9" autocomplete="off" value="9">
									<label class="btn btn-outline-primary" for="type-array-item9"><img src="/resources/img/icon-ext-pdf.png" style="width:16px;height:16px;"/> PDF</label>
								</div>
									
								</div>
								<div class="row">
									<div class="col-md-6 col-sm-12" >
										
										<div class="view card">
										<h5>최적화 후 압축률 높은 파일 TOP 10</h5>
											<div class="row">
												<div id="top10fastTable"></div>
											</div>
										</div>
									</div>
									<div class="col-md-6 col-sm-12">
										<div class="view card">
										<h5>최적화 후 압축률 낮은 파일 TOP 10</h5>
											<div class="row">
												<div id="top10slowTable"></div>
											</div>
										</div>
																			
									</div>
								</div>
						</div>
						
						<div class="row" style="padding-top:20px">
							<h3 class="mCha" id="mk4">4.최적화 추천 알고리즘</h3>
							<h6>최적화가 적용되지 않은 파일 중에서,최적화를 적용했을 때 파일 용량을 가장 많이 줄일 수 있는 알고리즘을 추천합니다.</h6>
						</div>
						<div class="row" style="padding-top:20px">
							<div class="col-md-6" id="accordionContainer1">
								<div class="card" id="accordionPlaceholder">
									<h4><ion-icon name="checkbox-outline" style="color:#60e9aa"></ion-icon> 모든 파일의 최적화 상태가 양호합니다.</h4>
								</div>
							</div>
							<div class="col-md-6" id="accordionContainer2"></div>
						</div>
											
						
						
						
					</div>
					<%@ include file="/WEB-INF/views/includes/footer.jsp"%> 
				</div>
		</div>
			
<!--  ==================================================================================================== -->		
		
<!--  ==================================================================================================== -->		
		</div>
	</div>


</body>
<script>




$(document).ready(function(){	 
	  
	rp_main();
	$('input[name="resource_type"]').change(getAllWebContent);
	$('#search-type-1').on('change', function() {
		getAllWebContent();
    });
	
	
	 $('input[name="resource_type2"], input[name="status_type"]').change(selectComptable);
// 	 $('input[name="status_type"]').change(updateTableColumns);
	 
	$('#preLoader').fadeOut(300);	
});

</script>
</html>