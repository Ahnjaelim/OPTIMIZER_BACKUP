<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>


<c:set var="mn" value="3" />
<c:set var="sn" value="4" />
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
<link href="${contextPath}/resources/css/cost/costOpt.css" rel="stylesheet">
<script src="${contextPath}/resources/js/cost/costOpt.js"></script>
<script src="${contextPath}/resources/js/cost/costCommon.js"></script>
</head>

<body id="costOpt">
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
					
					<h1 class="h3 mb-4">비용 최적화 예측</h1>
					<p style="font-size:16px;">최적화하면 이만큼 아낄 수 있어요!</p>
					
					<!-- ========================================================================================== -->
					
					<div id = "costOpt" class="row">
						<div class="col-6 chart" style="height:100%;width:100%;">
							<canvas id="costChart"></canvas>
						</div>
						<div class="col-3">
							<div class="row box">
								<span>최적화된 웹 컨텐츠</span>
								<p>OPTIMIZER로 최적화된 웹 컨텐츠 수 입니다.<p>
								<span>255/300</span>
							</div>
							<div class="row box">
								<span>기존 비용</span>
								<p>OPTIMIZER 최적화 미적용시 요금입니다.<p>
								<span>100만원</span>
							</div>
						</div>
						<div class="col-3">
							<div class="row box">
								<span>최적화 미적용 웹 컨텐츠</span>
								<p>OPTIMIZER 최적화를 미적용한 웹 컨텐츠 수 입니다<p>
								<span>255/300</span>
							</div>
							<div class="row box">
								<span>최적화 후 비용 예측</span>
								<p>미적용 웹 컨텐츠를 모두 최적화 했을때의 예상 비용입니다.<p>
								<span>65만원(35만원 절약)</span>
							</div>
						</div>
					</div>
					
					
					<div class="col-xl-6">
							<div class="row-span-2">
								<div class="card h-100">
									<div class="card-body">
		                                <canvas id="costChart"></canvas>
		                            </div>									
								</div>
							</div>
                    	</div>
						<div class="col-xl-3">
	                        <div class="row">
	                        	<div class="card h-100">
		                            <div class="card-header">
		                                <h4 class="card-title mb-0"><i class="mdi mdi-emoticon-wink-outline me-1"></i> 최적화된 웹 컨텐츠</h4>
		                            </div><!-- end card-header -->
		                            <div class="card-footer">
		                                <p class="text-muted mb-0">OPTIMIZER로 최적화된 웹 컨텐츠 수 입니다.</p>
		                            </div>
		                            <div class="card-body">
		                                <p class="text-muted mb-0">255/300</p>
		                            </div><!-- end card-body -->
	                        	</div><!-- end card -->
	                        </div>
	                        <div class="row">
	                        	<div class="card h-100">
		                            <div class="card-header">
		                                <h4 class="card-title mb-0"><i class="mdi mdi-emoticon-wink-outline me-1"></i> 기존 비용</h4>
		                            </div><!-- end card-header -->
		                            <div class="card-footer">
		                                <p class="text-muted mb-0">OPTIMIZER 최적화 미적용시 요금입니다.</p>
		                            </div>
		                            <div class="card-body">
		                                <p class="text-muted mb-0">100만원</p>
		                            </div><!-- end card-body -->
	                        	</div><!-- end card -->
	                        </div>
                    	</div>
						<div class="col-xl-3">
	                        <div class="row">
	                        	<div class="card h-100">
		                            <div class="card-header">
		                                <h4 class="card-title mb-0"><i class="mdi mdi-emoticon-wink-outline me-1"></i> 최적화 미적용 웹 컨텐츠</h4>
		                            </div><!-- end card-header -->
		                            <div class="card-footer">
		                                <p class="text-muted mb-0">OPTIMIZER 최적화를 미적용한 웹 컨텐츠 수 입니다.</p>
		                            </div>
		                            <div class="card-body">
		                                <p class="text-muted mb-0">255/300</p>
		                            </div><!-- end card-body -->
	                        	</div><!-- end card -->
	                        </div>
	                        <div class="row">
	                        	<div class="card h-100">
		                            <div class="card-header">
		                                <h4 class="card-title mb-0"><i class="mdi mdi-emoticon-wink-outline me-1"></i> 최적화 후 비용 예측</h4>
		                            </div><!-- end card-header -->
		                            <div class="card-footer">
		                                <p class="text-muted mb-0">미적용 웹 컨텐츠를 모두 최적화 했을때의 예상 비용입니다.</p>
		                            </div>
		                            <div class="card-body">
		                                <p class="text-muted mb-0">65만원(35만원 절약)</p>
		                            </div><!-- end card-body -->
	                        	</div><!-- end card -->
	                        </div>
                    	</div>
					
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