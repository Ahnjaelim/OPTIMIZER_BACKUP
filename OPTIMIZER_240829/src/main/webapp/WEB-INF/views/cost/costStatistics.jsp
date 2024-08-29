<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<c:set var="mn" value="5" />
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
<link href="${contextPath}/resources/css/cost/costStatistics.css" rel="stylesheet">
<script src="${contextPath}/resources/js/cost/costStatistics.js"></script>
<script src="${contextPath}/resources/js/cost/costCommon.js"></script>

<style>
.content {padding: 30px; font-size:30px; font-weight:bold;}
.content p {display:inline-block; margin:0; padding:0; line-height:1em; font-weight:bold;}
.content .traffic {display:block; font-weight:normal; font-size: 24px; padding:15px 0px 10px 0px;}
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
	<h4 class="mb-0">비용 요약</h4>
	<div class="page-title-right">
		<ol class="breadcrumb m-0">
			<li class="breadcrumb-item"><a href="javascript: void(0);">비용 통계</a></li>
			<li class="breadcrumb-item active">비용 요약</li>
		</ol>
	</div>
</div>

<div class="card">
<div class="container-fluid" id="cost_summary">
					
					
					<div class="row text_div">
						<div class="col-4">
							<div>
								<div class="row s_gray">연간 누적 비용 </div>
					    		<div id="annualCost" class="content"></div>
					    	</div>
						</div>
						<div class="col-4">
							<div>
								<div class="row s_gray" >월간 누적 비용 </div>
					    		<div id="monthlyCost" class="content"></div>
					    	</div>
						</div>
						<div class="col-4">
							<div>
								<div class="row s_gray">금일 누적 비용</div>
					    		<div id="dayCost" class="content"></div>
					    	</div>
						</div>
					</div>
					<div class="row text_div">
					    <div class="col-4">
					    	<div>
								<div class="row s_pink">연간 누적 절약 비용 </div>
					    		<div  id="annualSaveCost" class="content"></div>
					    	</div>
						</div>
						<div class="col-4">
							<div>
								<div class="row s_pink">월간 누적 절약 비용</div>
					    		<div id="monthlySaveCost" class="content"></div>
							</div>
						</div>
						<div class="col-4">
							<div>
								<div class="row s_pink" >금일 누적 절약 비용 </div>
					    		<div id="daySaveCost" class="content"></div>
					    	</div>
						</div>
					</div>
					<div class="row chart_div">
					    <div class="col-6">
					    	<div>
								<div class="row">월별 비용 트렌드</div>
					    
					    		<div id="monthChart" style="height: 500px;"></div>
					    	</div>
						</div>
						<div class="col-6">
							<div>
								<div class="row">월간 요일별 비용 트렌드</div>
					    		<div id="dayChart" style="height: 500px;"></div>
					    	</div>
						</div>
					</div>
					
					<div class="row chart_div">
					    <div class="col-6">
					    	<div>
								<div class="row">월간 웹 컨텐츠 유형별 비율</div>
					    
					    		<div id="test1" style="height: 500px;"></div>
					    	</div>
						</div>
						<div class="col-6">
							<div>
								<div class="row">월간 웹 페이지별 트래픽 비율</div>
					    		<div id="test2" style="height: 500px;"></div>
					    	</div>
						</div>
					</div>
					
					<!-- 툴팁을 표시할 요소 -->
					
					
					
				</div>




</div>





<!--  ==================================================================================================== -->		
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
</body>
</html>