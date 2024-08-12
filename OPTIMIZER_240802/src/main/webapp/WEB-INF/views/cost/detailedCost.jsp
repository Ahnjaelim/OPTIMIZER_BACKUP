<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<%@ include file="/WEB-INF/views/includes/plugin.jsp"%>

<c:set var="mn" value="3" />
<c:set var="sn" value="2" />
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">
<title>${title }</title>
<script src="${contextPath}/resources/js/cost/costCommon.js"></script>
<script src="${contextPath}/resources/js/cost/detailedCost.js"></script>
<link href="${contextPath}/resources/css/cost/detailedCost.css"	rel="stylesheet">

<style>
.tabulator-headers .tabulator-col .tabulator-col-content,
.tabulator-table  .tabulator-col .tabulator-col-content {border-right:1px solid #dcdcdc !important;}
</style>
</head>

<body id="estimatedCost">
	<!-- Page Wrapper -->
	<div id="wrapper">

		<%@ include file="/WEB-INF/views/includes/sidebar.jsp"%>

		<!-- Content Wrapper -->
		<div id="content-wrapper" class="d-flex flex-column" >

			<!-- Main Content -->
			<div id="content">

				<%@ include file="/WEB-INF/views/includes/topbar.jsp"%>

				<!-- Begin Page Content -->
				<div class="container-fluid" id="detailCost">

					<!-- ========================================================================================== -->
					
					<!--<img src="${pageContext.request.contextPath}/resources/img/2.webp"/> -->
					
					<div class="row" id="detailHeader">
						<div class="col-4">
							<h1 class="h3 mb-4">상세 비용 통계</h1>
						</div>
						<div class="col-6">
							
							 <div style="display: flex; justify-content: flex-end;">
						        <div >
						            <input id="startDatePicker" style="width: 150px;" name="startDates" type="text" autocomplete="off" class="selectbox daterange searchFr">
						        </div>
						        <span class="tilde" style="padding-left :10px; padding-right:10px;"> ~ </span>
						        <div >
						            <input id="endDatePicker" style="width: 150px;" name="endDates" type="text" autocomplete="off" class="selectbox daterange searchTO">
						        </div>
						        <div>
						            <button type="button" onclick="reloadChart()" style="height: 30px; padding-left: 1px;" class="btn btn-primary d-flex align-items-center justify-content-center">확인</button>
						        </div>
						    </div>
						</div>
					</div>
					
					<p class="mb-4"></p>
					


					<!-- ========================================================================================== -->
					<div class="row" id="chartRow"> 
						<div class="col-6">
							<div class="row chartHeaderText">리소스 유형별 비용 차트</div>
							<div class="row detail_chart" id="resource_chart"></div>
						</div>	
						<div class="col-6">
							<div class="row chartHeaderText">페이지별 비용 차트</div>
							<div class="row detail_chart" id="site_chart"></div>
						</div>		
					</div>
					

					<div style="padding-top: 30px;" id="nonOpt">
						<div class="row">
							<div class="col-4"></div>
							<div class=" col-8" id="select_box_col">
								<div class="row" id="estimate_cost_selectBox2">
									<select id="statusBox" class="estiSelectBox"
									onchange=web_content_table() style="display:none;">
									<option value="-1" >최적화 미적용</option>
									<option value="1" selected="selected">최적화 적용</option>
								</select>
									<select id="siteBox" class="estiSelectBox"
									onchange=web_content_table()>
									<option value="0" selected="selected">페이지 전체</option>
								</select> <select id="contentBox" class="estiSelectBox"
									onchange=web_content_table()>
									<option value="0" selected="selected">타입 전체</option>
									<option value="1">Image</option>
									<option value="2">Video</option>
									<option value="3">Text</option>
									<option value="4">Font</option>
								</select>
								</div>
							</div>
						</div>
						<div class="row">
							<div id="web_content_table" style="width:100%"></div>
						</div>
						<div class="row">
							<div id="perMonthTb" style="width:100%"></div>
						</div>
					</div>
				</div>
				<!-- /.container-fluid -->

			</div>
			<!-- End of Main Content -->

			<%@ include file="/WEB-INF/views/includes/footer.jsp"%>

		</div>
		<!-- End of Content Wrapper -->

	</div>
	<!-- End of Page Wrapper -->

	<script>
	// 현재 날짜를 얻어오기
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0');
    var day = today.getDate().toString().padStart(2, '0');

    // 오늘 날짜를 포맷에 맞춰서 placeholder로 설정
    var formattedToday = year + '년 ' + month + '월 ' + day + '일';

    $('#startDatePicker').attr('placeholder', formattedToday);
    $('#endDatePicker').attr('placeholder', formattedToday);
	
	
	
	$(document).ready(function() {
		main();
		$('#preLoader').fadeOut(1000);
	});
</script>
</body>	

</html>