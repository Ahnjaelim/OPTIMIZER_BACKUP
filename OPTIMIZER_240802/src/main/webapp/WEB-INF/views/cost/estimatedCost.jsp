<%@ page language="java" contentType="text/html; charset=UTF-8" 
	pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<%@ include file="/WEB-INF/views/includes/plugin.jsp"%>
<c:set var="mn" value="3" />
<c:set var="sn" value="3" />
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
<link href="${contextPath}/resources/css/cost/estimatedCost.css"
	rel="stylesheet">
<script src="${contextPath}/resources/js/cost/estimatedCost.js"></script>
<script src="${contextPath}/resources/js/cost/costCommon.js"></script>

</head>

<body id="estimatedCost">
	
	<!-- Page Wrapper -->
	<div id="wrapper">

		<%@ include file="/WEB-INF/views/includes/sidebar.jsp"%>

		<!-- Content Wrapper -->
		<div id="content-wrapper" class="d-flex flex-column">

			<!-- Main Content -->
			<div id="content">

				<%@ include file="/WEB-INF/views/includes/topbar.jsp"%>

				<!-- Begin Page Content -->
				<div class="container-fluid" id="estimatedCost">

					<!-- ========================================================================================== -->
					
					<h1 class="h3 mb-4">예측 비용 통계</h1>
					
					<!-- ========================================================================================== -->
					<div class="row">
						<div class="col-6">
							<div class="row" id="estimate_cost_selectBox">
							
								<select id="selectBox" class="estiSelectBox" onchange=setDate_box()>
									<option value="month" >월간 비용 예측</option>
									<option value="year" selected="selected">연간 비용 예측</option>
								</select>
								<select id="yearBox" class="estiSelectBox" onchange=setDate_box()>
									
								</select>
								<select id="monthBox" class="estiSelectBox" onchange=setDate_box()>
									<option value="1" selected="selected">1월</option>
									<option value="2">2월</option>
									<option value="3">3월</option>
									<option value="4">4월</option>
									<option value="5">5월</option>
									<option value="6">6월</option>
									<option value="7">7월</option>
									<option value="8">8월</option>
									<option value="9">9월</option>
									<option value="10">10월</option>
									<option value="11">11월</option>
									<option value="12">12월</option>
								</select>
								
								



							</div>
						</div>
					</div>
					<table id="optimize_status" border="1">
					<colgroup>
				        <col width="34%">
					    <col width="33%">
					    <col width="33%">
				    </colgroup>
						<tr>
							<td style="height: 50px">현재 최적화 상태</td>
							<td>미적용된 웹컨텐츠</td>
							<td>기존 비용</td>
						</tr>
						<tr>
							<td rowspan="3"><div id="optimize_chart"></div></td>
							<td style="height: 120px;justify-content: center;align-items: center;    border: none;" id="unopt_contents"></td>
							<td id="origin_cost"></td>
						</tr>
						<tr>
							<td style="height: 50px">최적화된 웹컨텐츠</td>
							<td id="opt_cost">최적화 후 예측 비용</td>
						</tr>
						<tr>
							<td style="height: 120px;justify-content: center;align-items: center ;    border: none;" id="opt_contents"></td>
							<td id="aft_otpCost"></td>
						</tr>
					</table>

					<div style="padding-top: 30px;" id="nonOpt">
						<div class="row">
							<div class="col-8"></div>
							<div class=" col-4" id="select_box_col">
								<div class="row" id="estimate_cost_selectBox2">
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
							<div id="web_content_table"  style="width:100%"></div>
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
	window.onload = function() {
        main();
        $('#preLoader').fadeOut(1000);
     };
	

</script>
</body>

</html>