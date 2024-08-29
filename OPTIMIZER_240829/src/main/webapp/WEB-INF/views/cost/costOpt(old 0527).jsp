
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="utf-8" />
<title>${title }</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
<meta content="Pichforest" name="author" />
<%@ include file="/WEB-INF/views/includes/plugin.jsp"%>
<link href="${contextPath}/resources/css/cost/costOpt.css" rel="stylesheet">
<script src="${contextPath}/resources/js/cost/costOpt.js"></script>
<script src="${contextPath}/resources/js/cost/costCommon.js"></script>
<%-- <script type="text/javascript" src="${contextPath}/resources/js/optimizer/optimizerCommon.js"></script> --%>
</head>

</style>

<body>
<!-- <body data-layout="horizontal"> -->

<!-- Begin page -->
<div id="layout-wrapper">

<%@ include file="/WEB-INF/views/includes/topbar.jsp"%>
<div class="layout-parent">     
<%@ include file="/WEB-INF/views/includes/sidebar.jsp"%>        

    <!-- ============================================================== -->
    <!-- Start right Content here -->
    <!-- ============================================================== -->
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box d-flex align-items-center justify-content-between">
                            <h4 class="mb-0">최적화 비용 예측</h4>
							<div class="page-title-right" style="display:none;">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Dashonic</a></li>
                                    <li class="breadcrumb-item active">Sales Analytics</li>
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>
                
                <p class="page-desc">최적화하면 이만큼 아낄 수 있어요.</p>
                <!-- end page title -->
                <!-- start page content -->
                
                <div id="content-wrapper" class="d-flex flex-column">

			<!-- Main Content -->
			<div id="content">

				

				<!-- Begin Page Content -->
				<div class="container-fluid">

					<!-- ========================================================================================== -->
					<div id = "costOpt" class="row">
						<div class="row row-cols-1 row-cols-md-2 g-4">
						  <div class="col" style="height:575px;">
						    <div class="card" style="height:100%;">
									<div class="card-body">
		                                <canvas id="costChart" ></canvas>
		                            </div>									
								</div>
						  </div>
						  <div class="col" style="height:575px;">
							  <div class="row text1">
								  <div class="col">
							        <div class="card h-100 text-center">
			                            <div class="card-header">
			                                <h4 class="card-title mb-0"> 최적화된 웹 컨텐츠</h4>
			                            </div><!-- end card-header -->
			                            <div class="card-footer">
			                                <p class="text-muted mb-0">OPTIMIZER로 최적화된 웹 컨텐츠 수 입니다.</p>
			                            </div>
			                            <div class="card-body">
			                                <p class="text-muted mb-0" id="opt_contents"></p>
			                            </div><!-- end card-body -->
		                        	</div><!-- end card -->
							      </div>
							      <div class="col">
							        <div class="card h-100 text-center">
			                            <div class="card-header">
			                                <h4 class="card-title mb-0"> 기존 비용</h4>
			                            </div><!-- end card-header -->
			                            <div class="card-footer">
			                                <p class="text-muted mb-0">OPTIMIZER 최적화 미적용시 요금입니다.</p>
			                            </div>
			                            <div class="card-body">
			                                <p class="text-muted mb-0" id="origin_cost"></p>
			                            </div><!-- end card-body -->
		                        	</div><!-- end card -->
							      </div>
							  </div>
							  <div class="row text2">
								  <div class="col">
							        <div class="card h-100 text-center">
			                            <div class="card-header">
			                                <h4 class="card-title mb-0"> 최적화 미적용 웹 컨텐츠</h4>
			                            </div><!-- end card-header -->
			                            <div class="card-footer">
			                                <p class="text-muted mb-0">OPTIMIZER 최적화를 미적용한 웹 컨텐츠 수 입니다.</p>
			                            </div>
			                            <div class="card-body">
			                                <p class="text-muted mb-0" id="unopt_contents"></p>
			                            </div><!-- end card-body -->
		                        	</div><!-- end card -->
		                        </div>
							      <div class="col">
							        <div class="card h-100 text-center">
			                            <div class="card-header">
			                                <h4 class="card-title mb-0"> 최적화 후 비용 예측</h4>
			                            </div><!-- end card-header -->
			                            <div class="card-footer">
			                                <p class="text-muted mb-0">미적용 웹 컨텐츠를 모두 최적화 했을때의 예상 비용입니다.</p>
			                            </div>
			                            <div class="card-body">
			                                <p class="text-muted mb-0" id="aft_otpCost"></p>
			                            </div><!-- end card-body -->
		                        	</div><!-- end card -->
							      </div>	
							  </div>
						  
						      
						      
						    </div>
						  </div>
						</div>
						
					</div>		
					

					<!-- ========================================================================================== -->
					<div class="row search-criteria-filter">
					    <div class="col-md-12">
					            <h3 class="card-title mb-3">웹 컨텐츠 유형 선택</h3>
					            <p class="desc">최적화가 미적용된 웹 컨텐츠를 자세히 볼 수 있어요. 검색하고 싶은 웹 컨텐츠의 유형을 선택하세요. (다중 선택 가능) </p>
					            <ul class="search-type">
					            </ul>
					
					    </div><!-- end col -->
					</div>
					
					<div class="filter-button-container">
						<button class="remove-all btn btn-outline-light btn-rounded" onclick="filterResetBtnEvent();"><i class="icon nav-icon" data-feather="rotate-cw"></i> 검색 초기화</button>
					</div>
					
					<div id="contentTable"></div>
					
				</div><!-- /.container-fluid -->
				
			</div>
			<!-- End of Main Content -->

			

		</div>
                <!-- // end page content -->
			</div>
            <!-- // end container-fluid -->
        </div>
        <!-- // End Page-content -->

        <%@ include file="/WEB-INF/views/includes/footer.jsp"%> 
    </div>
    <!-- end main content-->
    </div>

</div>
<!-- END layout-wrapper -->

<%@ include file="/WEB-INF/views/includes/rightbar.jsp"%> 

<script>
window.onload = function() {
   main();
   searchInit();
   $('#preLoader').fadeOut(300);	
};
</script>
</body>

</html>