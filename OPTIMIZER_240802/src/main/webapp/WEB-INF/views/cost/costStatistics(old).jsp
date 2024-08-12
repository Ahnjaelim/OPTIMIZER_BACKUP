<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>


<c:set var="mn" value="3" />
<c:set var="sn" value="1" />
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

<body id="costStatistics">
	<!-- Page Wrapper -->
	<div id="wrapper">

		<%@ include file="/WEB-INF/views/includes/sidebar.jsp"%>

		<!-- Content Wrapper -->
		<div id="content-wrapper" class="d-flex flex-column">

			<!-- Main Content -->
			<div id="content">

				<%@ include file="/WEB-INF/views/includes/topbar.jsp"%>

				<!-- Begin Page Content -->
				<div class="container-fluid" id="cost_summary">

					<!-- ========================================================================================== -->
					
					<h1 class="h3 mb-4">비용 통계 요약</h1>
					<p class="" style="font-size:16px;">웹 컨텐츠의 트래픽으로 인해 발생한 비용을 확인할 수 있는 페이지입니다.</p>
					
					
					<!-- ========================================================================================== -->
					
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
					    		<div class="row" id="perMonth_chart"></div>
					    		<div id="monthChart" style="height: 500px;"></div>
					    	</div>
						</div>
						<div class="col-6">
							<div>
								<div class="row">요일별 비용 트렌드</div>
					    		<div class="row" id="perDay_chart"></div>
					    		<div id="dayChart" style="height: 500px;"></div>
					    	</div>
						</div>
					</div>
					
					<!-- 툴팁을 표시할 요소 -->
					
					
					
				</div><!-- /.container-fluid -->
				
			</div>
			<!-- End of Main Content -->

			<%@ include file="/WEB-INF/views/includes/footer.jsp"%>

		</div>
		<!-- End of Content Wrapper -->

	</div>
	<!-- End of Page Wrapper -->
	
	<script>
	
	
	
	window.onload = function() {
        main();
        $('#preLoader').fadeOut(300);
    };
		
	</script>
</body>

</html>