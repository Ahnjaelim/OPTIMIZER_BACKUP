<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<!DOCTYPE html>
<html lang="ko">
<c:set var="mn" value="5" />
<c:set var="sn" value="2" />
<head>
<meta charset="utf-8" />
<title>${title }</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
<meta content="Pichforest" name="author" />
<%@ include file="/WEB-INF/views/includes/plugin.jsp"%>
<script src="${contextPath}/resources/js/cost/costCommon.js"></script>
<script src="${contextPath}/resources/js/statistics/statisticsCommon.js"></script>
</head>
<style>
.rounded-pill{background-color:var(--color-blue);}
.row{text-align:center; font-weight: bold;}
.custom-button {width: 25px; height: 25px; padding: 2px; margin: 19px; border-radius: 25px; } 
.fc-toolbar-title {line-height: 55px;}
.right{text-align:right; font-size:20px; align-content: center;}
.middle{align-content: center; color:var(--color-yellow); font-size:20px;}
.left{text-align:left; font-size:30px; align-content: center;}
.center{text-align:center; font-size:30px; align-content: center;}
.left_bottom{width: 50%;
    text-align: center;
    font-size: 15px;
    align-content: center;}
.percent{font-size:40px; color:var(--color-blue); align-content: center;}

#weekSaveChart {height:240px;}
#monthSaveChart {height:240px;}
</style>
<body class="dashboard" data-bs-theme="dark" data-topbar="dark" data-sidebar="dark">
	<div id="layout-wrapper">
		<%@ include file="/WEB-INF/views/includes/topbar.jsp"%>
		<div class="layout-parent">
			<%@ include file="/WEB-INF/views/includes/sidebar.jsp"%>
			<div class="main-content">
				<div class="page-content">
			
<!--  ==================================================================================================== -->

<div class="page-title-box d-flex align-items-center justify-content-between">
	<h4 class="mb-0">비용 통계</h4>
	<div class="page-title-right">
		<ol class="breadcrumb m-0">
			<li class="breadcrumb-item"><a href="javascript: void(0);">통계</a></li>
			<li class="breadcrumb-item active">비용 통계</li>
		</ol>
	</div>
</div>

<!-- time select -->
<div class="row">
	<div class="d-flex" style="justify-content: flex-end;">
			<button type="button" onclick="prevBtn_st()" id = "prev" title="Previous 월" aria-pressed="false"
			 class="fc-prev-button btn btn-primary custom-button mx-2"><</button>
			<h3 class="fc-toolbar-title" id="fc-dom-1" class="mx-2"></h3>
			<button type="button"  onclick="nextBtn_st()"id="next" title="Next 월" aria-pressed="false"
			class="fc-next-button btn btn-primary custom-button mx-2">></button>
	</div>
</div>

<div>

	<div class="d-flex" style="margin-bottom:10px;">
		<div class="col" style="margin-right:10px;">
			<div class="card" >
				<h4 class="narrow" style="padding:15px; text-align:center;">주간 절약 비용 현황</h4>
				<canvas id ="weekSaveChart" style="height:100px;"></canvas>
			</div>
		</div>
		
		<div class="col">
			<div class="card" >
				<h4 class="narrow" style="padding:15px; text-align:center;">월간 절약 비용 현황</h4>
				<canvas id ="monthSaveChart" style="height:100px;"></canvas>
			</div>
		</div>	
	</div>
	
	<div class="d-flex">
		<div class="col" style="margin-right:10px;">
			<div class="card">
				<div class="col-md-12" id="weekSaveTable" style ="height:250px;">표</div>
			</div>
		</div>		
		
		<div class="col">
			<div class="card">
				<div class="col-md-12" id="monthSaveTable" style ="height:250px;">표</div>
			</div>
		</div>
	</div>

</div>
<!--
<div class="row">
	<div class="col-md-4 col-sm-6">
		<div class="card">
			<div class="row">
				<h4 class="narrow">연간 비용 절약 현황</h4>
			</div>
			<div class="row">
				<div class="col-md-12 center">1,200,000원</div>
				
			</div>
			<div class="row">
				<div class="col-md-6 right percent">40%</div>
				<div class="col-md-6">
					<div class="row left_bottom"><span class="">최적화 후</span></div>
					<div class="row left_bottom rounded-pill"><span class="rounded-pill-span">절약</span></div>
				</div>
			</div>
		</div>		
	</div>
	
	<div class="col-md-4 col-sm-6">
		<div class="card">
			<div class="row">
				<h4 class="narrow">월간 비용 절약 현황</h4>
			</div>
			<div class="row">
				<div class="col-md-12 center">100,000원</div>
				
			</div>
			<div class="row">
				<div class="col-md-6 right percent">40%</div>
				<div class="col-md-6">
					<div class="row left_bottom"><span class="">최적화 후</span></div>
					<div class="row left_bottom rounded-pill"><span class="rounded-pill-span">절약</span></div>
				</div>
			</div>

		</div>		
	</div>
	 
       

	<div class="col-md-4 col-sm-6">
		<div class="card">
			<div class="row">
				<h4 class="narrow">주간 비용 절약 현황</h4>
			</div>
			<div class="row">
				<div class="col-md-12 center">25,000원</div>
				
			</div>
			<div class="row">
				<div class="col-md-6 right percent">40%</div>
				<div class="col-md-6">
					<div class="row left_bottom"><span class="">최적화 후</span></div>
					<div class="row left_bottom rounded-pill"><span class="rounded-pill-span">절약</span></div>
				</div>
			</div>

		</div>		
	</div>
</div>

<div class="row">
	<div class="col-md-6">
		<div class="card">
			<div class="row">
				<h4 class="narrow">월별 비용 절약 현황 차트</h4>
				
			</div>
			<div class="row">
				<div><canvas id="barChartMonth"></canvas></div>
			</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="card">
			<div class="row">
				<h4 class="narrow">일자별 비용 절약 현황 차트</h4>
			</div>
			<div class="row">
				<div><canvas id="barChartWeek"></canvas></div>
			</div>
		</div>
	</div>
</div>

<div class="row">
	<div class="col-md-6">
		<div class="card">
			<div class="row">
				<h4 class="narrow">웹 콘텐츠 유형별 비용 절약률 현황 차트</h4>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div><canvas id="doughnutChartWeek"></canvas></div>
				</div>
				<div class="col-md-6">
					<div id="contentTable"> </div>
				</div>
			</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="card">
			<div class="row">
				<h4 class="narrow">웹 페이지별 비용 발생 현황 TOP5</h4>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div><canvas id="doughnutChartMonth"></canvas></div>
				</div>
				<div class="col-md-6">
					<div id="pageTable"> </div>
				</div>
			</div>
		</div>
	</div>
</div>
-->
<script type="text/javascript">
let sn = ${sn}; 
$(document).ready(function(){
	
	console.log(sn);
	updateDisplay_st();
	ct_main();
	
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