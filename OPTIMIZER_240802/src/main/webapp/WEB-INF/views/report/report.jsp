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
<script src="${contextPath}/resources/js/report/report.js"></script>
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
							<h2>웹 콘텐츠 최적화 보고서</h2>
							<br>
						</div>
						
						
						
						<div class="row" style="padding-top:20px" >
							<h4 class="mCha" id="mk1" style="padding">1.개요</h4>
						</div>
							<br> 
							<h5>웹 콘텐츠 최적화의 필요성</h5>
							<div>페이지 렌더링 속도는 사용자 경험의 핵심 요소입니다. 렌더링 시간이 길어질수록 사용자는 이탈할 가능성이 높아집니다.</div>
							<div><h6>본 보고서는 <span id="currentTime"></span>을 기준으로 웹 콘텐츠 최적화 작업을 통해 서비스의 렌더링 속도를 향상시키고,사용자 경험을 개선하여 서비스 만족도를 높이기 위해 제공됩니다.</h6></div> 
						
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
							<div class="card" style="text-align:center;">
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
							<div class="card" style="text-align:center; display:none">
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
															  
										<input type="radio" class="btn-check" name="resource_type" id="all-item0" autocomplete="off" value="99" checked>
										<label class="btn btn-outline-primary" for="all-item0"> 전체보기</label>
										<input type="radio" class="btn-check" name="resource_type" id="all-item1" autocomplete="off" value="1">
										<label class="btn btn-outline-primary" for="all-item1"><i class="fas fa-image" aria-hidden="true"></i> 이미지</label>
										<input type="radio" class="btn-check" name="resource_type" id="all-item2" autocomplete="off" value="2">
										<label class="btn btn-outline-primary" for="all-item2"><i class="fas fa-video" aria-hidden="true"></i> 동영상</label>
										<input type="radio" class="btn-check" name="resource_type" id="all-item3" autocomplete="off" value="3">
										<label class="btn btn-outline-primary" for="all-item3"><i class="fas fa-code" aria-hidden="true"></i> 텍스트</label>
										<input type="radio" class="btn-check" name="resource_type" id="all-item4" autocomplete="off" value="4">
										<label class="btn btn-outline-primary" for="all-item4"><i class="fas fa-font" aria-hidden="true"></i> 폰트</label>
										
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
						
						<div style="display:none;">
							<canvas id="typeBarChart"></canvas>
						</div>
						<div style="display:none;">
							<canvas id="allPieChart"></canvas>
						</div>
						
						<div class="row" style="padding-top:20px">
							<h4 class="mCha" id="mk3">3.웹 콘텐츠 측정 결과</h4>
						</div>
						
						<div class="row">							
							<div class="col-md-12">
								<div class="card">
									<div class="row">
										<div class="col-md-3">
											<div class="card timerate">
												<div class="row" >
													<h5><span class="color1">● </span>이미지 렌더링 시간 단축율</h5>
												</div>
												<div class="row">
													<span class="percent color1" id="image_rdPercent"></span>
												</div>
												<div class="row">
													<span class="text">이미지 최적화를 통한<br> 웹 페이지 렌더링 시간 단축율을 표시합니다.</span>
												</div>
											</div>
										</div>
										<div class="col-md-3">
											<div class="card timerate">
												<div class="row" >
													<h5><span class="color2">● </span>동영상 렌더링 시간 단축율</h5>
												</div>
												<div class="row">
													<span class="percent color2" id="video_rdPercent"></span>
												</div>
												<div class="row">
													<span class="text">동영상 최적화를 통한<br> 웹 페이지 렌더링 시간 단축율을 표시합니다.</span>
												</div>
											</div>
										</div>
										<div class="col-md-3">
											<div class="card timerate">
												<div class="row" >
													<h5><span class="color3">● </span>텍스트 렌더링 시간 단축율</h5>
												</div>
												<div class="row">
													<span class="percent color3" id="text_rdPercent"></span>
												</div>
												<div class="row">
													<span class="text">텍스트 최적화를 통한<br> 웹 페이지 렌더링 시간 단축율을 표시합니다.</span>
												</div>
											</div>
											
										</div>
											<div class="col-md-3">
											<div class="card timerate">
												<div class="row" >
													<h5><span class="color4">● </span>폰트 렌더링 시간 단축율</h5>
												</div>
												<div class="row">
													<span class="percent color4" id="font_rdPercent"></span>
												</div>
												<div class="row">
													<span class="text">폰트 최적화를 통한<br> 웹 페이지 렌더링 시간 단축율을 표시합니다.</span>
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
											<iframe id="page_preview" style="height:500px"></iframe>
										</div>
									</div>
								</div>
						</div>		
											
						
						
						
						<div class="row" style="padding-top:20px">
								
								<div class="d-flex" style="max-width:1000px">
									<div class="col btn-group search-type" role="group" aria-label="Basic radio toggle button group">
									<input type="radio" class="btn-check" name="resource_type2" id="type-array-item0" autocomplete="off" value="99" checked>
									<label class="btn btn-outline-primary" for="type-array-item0"> 전체보기</label>
									<input type="radio" class="btn-check" name="resource_type2" id="type-array-item1" autocomplete="off" value="1">
									<label class="btn btn-outline-primary" for="type-array-item1"><i class="fas fa-image" aria-hidden="true"></i> 이미지</label>
									<input type="radio" class="btn-check" name="resource_type2" id="type-array-item2" autocomplete="off" value="2">
									<label class="btn btn-outline-primary" for="type-array-item2"><i class="fas fa-video" aria-hidden="true"></i> 동영상</label>
									<input type="radio" class="btn-check" name="resource_type2" id="type-array-item3" autocomplete="off" value="3">
									<label class="btn btn-outline-primary" for="type-array-item3"><i class="fas fa-code" aria-hidden="true"></i> 텍스트</label>
									<input type="radio" class="btn-check" name="resource_type2" id="type-array-item4" autocomplete="off" value="4">
									<label class="btn btn-outline-primary" for="type-array-item4"><i class="fas fa-font" aria-hidden="true"></i> 폰트</label>
									</div>
									
								</div>
								<div class="row">
									<div class="col-md-6 col-sm-12" >
										
										<div class="view card">
										<h5>렌더링 시간 향상률 TOP 10</h5>
											<div class="row">
												<div id="top10fastTable"></div>
											</div>
										</div>
									</div>
									<div class="col-md-6 col-sm-12">
										<div class="view card">
										<h5>렌더링 시간이 느린 웹 콘텐츠 TOP 10</h5>
											<div class="row">
												<div id="top10slowTable"></div>
											</div>
										</div>
																			
									</div>
								</div>
						</div>
						
						
						
				
						
						
						
						<div class="row" style="padding-top:20px">
							<h4 class="mCha" id="mk4">4.웹 페이지별 측정 결과</h4>
						</div>
						
						<div class="row" style="padding-top:20px">
								<div class="d-flex reportSelect" id="selectTypeBox2"  style="justify-content: space-between;">	
									<div class="col btn-group search-type" role="group" aria-label="Basic radio toggle button group">
																	  
												<input type="radio" class="btn-check" name="resource_type3" id="page-all-item0" autocomplete="off" value="99" checked>
												<label class="btn btn-outline-primary" for="page-all-item0"> 전체보기</label>
												<input type="radio" class="btn-check" name="resource_type3" id="page-all-item1" autocomplete="off" value="1">
												<label class="btn btn-outline-primary" for="page-all-item1"><i class="fas fa-image" aria-hidden="true"></i> 이미지</label>
												<input type="radio" class="btn-check" name="resource_type3" id="page-all-item2" autocomplete="off" value="2">
												<label class="btn btn-outline-primary" for="page-all-item2"><i class="fas fa-video" aria-hidden="true"></i> 동영상</label>
												<input type="radio" class="btn-check" name="resource_type3" id="page-all-item3" autocomplete="off" value="3">
												<label class="btn btn-outline-primary" for="page-all-item3"><i class="fas fa-code" aria-hidden="true"></i> 텍스트</label>
												<input type="radio" class="btn-check" name="resource_type3" id="page-all-item4" autocomplete="off" value="4">
												<label class="btn btn-outline-primary" for="page-all-item4"><i class="fas fa-font" aria-hidden="true"></i> 폰트</label>
												
									</div>
									
												 
									
									</div>
								
								
								<div class="row">
									<div class="col-md-6 col-sm-12" >
										<div class="view card">
										<h5>페이지별 렌더링 시간 향상률 TOP 10</h5>
											<div class="row">
												<div id="top10fastPageTable"></div>
											</div>
										</div>
									</div>
									<div class="col-md-6 col-sm-12">
										<div class="view card">
										<h5>페이지별 렌더링 시간이 느린 TOP 10</h5>
											<div class="row">
												<div id="top10slowPageTable"></div>
											</div>
										</div>
																			
									</div>
								</div>
						</div>
						
						
						
						
						<div class="row" style="padding-top:20px">
							<h3 class="mCha" id="mk4">5.최적화 추천 알고리즘</h3>
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
	
	
	 $('input[name="resource_type2"], input[name="status_type"]').change(selectTimetable);
	 $('input[name="resource_type3"], input[name="status_type"]').change(selectTimetablePage);
// 	 $('input[name="status_type"]').change(updateTableColumns);
	 
	$('#preLoader').fadeOut(300);	
});

</script>
</html>