<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>


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
<link href="${contextPath}/resources/css/cost/trafficCost.css" rel="stylesheet">
<script src="${contextPath}/resources/js/cost/trafficCost.js"></script>
<script src="${contextPath}/resources/js/cost/costCommon.js"></script>

<style>
.content {padding: 30px; font-size:30px; font-weight:bold;}
.content p {display:inline-block; margin:0; padding:0; line-height:1em; font-weight:bold;}
.content .traffic {display:block; font-weight:normal; font-size: 24px; padding:15px 0px 10px 0px;}
</style>
</head>

<body id="trafficCost">
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
					
					<h1 class="h3 mb-4">트래픽 비용 요약</h1>
					<p class="" style="font-size:16px;"></p>
					<!-- ========================================================================================== -->
					
					<!-- ========================================================================================== -->
					<div id="calendar">	<!-- 달력 div 시작-->
					</div> <!-- 달력 div 끝-->
					
					
					
					
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
        $('#preLoader').fadeOut(1000);
    };
		
	</script>
</body>

</html>