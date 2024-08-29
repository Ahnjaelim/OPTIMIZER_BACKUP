<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<c:set var="mn" value="5" />
<c:set var="sn" value="3" />
<!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="utf-8" />
<title>${title }</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
<meta content="Pichforest" name="author" />
<%@ include file="/WEB-INF/views/includes/plugin.jsp"%>

<script src="${contextPath}/resources/js/cost/trafficCost.js"></script>
<script src="${contextPath}/resources/js/cost/costCommon.js"></script>
<script type="text/javascript" src="${contextPath}/resources/js/optimizer/optimizer.all.js"></script>

<link href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css' rel='stylesheet'>
<script src="${contextPath}/resources/vendor/fullcalendar/locales/ko.js"></script>

<style>
.fc .fc-daygrid-day-number{
 width: auto !important;
}
.fc-theme-bootstrap5 .fc-scrollgrid{
	border:none !important;
}

.fc-event{
    background-color: transparent !important;
    cursor:auto !important;
}

.cost,.traffic{
	margin-top: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    cursor:pointer !important;
}

.fc-day-other .cost,
.fc-day-other .traffic{
	opacity:0.3 !important;
}
card>a{
	color:black !important;
}
</style>
</head>

<body class="dashboard" data-bs-theme="dark" data-topbar="dark" data-sidebar="dark">
	<div id="layout-wrapper">
		<%@ include file="/WEB-INF/views/includes/topbar.jsp"%>
		<div class="layout-parent">
			<%@ include file="/WEB-INF/views/includes/sidebar.jsp"%>
			<div class="main-content">
				<div class="page-content">
			
<!--  ==================================================================================================== -->

<div class="page-title-box d-flex align-items-center justify-content-between">
	<h4 class="mb-0">비용 절감 현황</h4>
	<div class="page-title-right">
		<ol class="breadcrumb m-0">
			<li class="breadcrumb-item"><a href="javascript: void(0);">비용 통계</a></li>
			<li class="breadcrumb-item active">비용 절감 현황</li>
		</ol>
	</div>
</div>

<div class="card">
<div class="card card-body" id="subTitle">
						
						</div>
						<div class="card card-body card-h-100">
							<div id="calendar"></div>		
						</div>
						
						
						
</div>

<!-- Modal -->
<div class="modal fade" id="dailydetailModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="max-width: 1600px;">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modal_title">사이트 상세보기</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="clearChart()"></button>
      </div>
      <div class="modal-body">
        <p>최적화 전, 후 비용과 트래픽 절감량을 보여드릴게요.</p>
        	<form name="cloudVO">
					<div class="input-group mb-2">
					  <div class="form-control" id="save_money_total" style="text-align: center;font-size: 20px;"></div>
					  <div class="form-control" id="save_traffic_total" style="text-align: center;font-size: 20px;"></div>
					</div>
					<div class="input-group mb-0" style="height:400px;">
					  <div class="form-control" id="" style="text-align: center;font-size: 18px;">
					  	<canvas id="save_money_chart" width="400" height="400" style="max-height: 500px;margin: 0 auto;"></canvas>
					  </div>
					  <div class="form-control" id="" style="text-align: center;font-size: 18px;">
					  	<canvas id="save_traffic_chart" width="400" height="400" style="max-height: 500px;margin: 0 auto;"></canvas> 
					  </div>
					</div>
			</form>
      </div>
      <div class="modal-body">
        <p>각 웹 컨텐츠별 절감비용을 확인할 수 있어요.</p>
        <div id="optimizer-container">
			<div id="explorer">
				<div class="content"></div>	
			</div>
			<div id="viewer">
				<div class="content">
					<div class="search-container">
						<div class="count" id="list_cnt">총 <span>0</span>건</div>
						<div style="display: none;">
						<input type="text" name="search_page" value="${param.page_no }" />
						<select name="search_range" class="form-select form-select-sm">
							<option value="0">전체 검색</option>
							<option value="1" selected>폴더 내 검색</option>
						</select>
						<input class="form-control form-control-sm" type="text" name="search_keyword" placeholder="웹 컨텐츠 이름을 입력하세요." onkeypress="searchEnterEvent();" />
						<button onclick="searchSubmitBtnEvent();" class="btn btn-sm btn-outline-secondary">검색</button>
						</div>
					</div>
					<div id="volist">
					</div>
				</div>
			</div>
		</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal" onclick="clearChart()">닫기</button>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">
$(document).ready(function(){
	 main();
	$('#preLoader').fadeOut(300);	
});
</script>

<!--  ==================================================================================================== -->		
				</div>
			</div>
		</div>
	</div>


</body>
</html>