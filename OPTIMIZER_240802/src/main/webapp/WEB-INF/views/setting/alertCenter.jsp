<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<c:set var="mn" value="3" />
<c:set var="sn" value="5" />
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<title>${title }</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
<meta content="Pichforest" name="author" />
<%@ include file="/WEB-INF/views/includes/plugin.jsp"%>
<script src="${contextPath}/resources/js/setting/alertCenter.js"></script>
 <!-- SweetAlert2 라이브러리 추가 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="path/to/optimizedManage.js"></script>


</head>
<style>
.large-card {height: 80px;}
.card-body{ line-height: 25px;}
.alert-content {margin-left: 40px;}
.alert-content-date {font-size: 13px; color: rgba(255, 255, 255, 0.5); margin-left: 50px;}
.highlight{color: #fcff5d; font-size: 20px;}

/* .custom-button {width: 25px; height: 25px; padding: 10px; margin: 19px; border-radius: 25px; }     
.fc-toolbar-title {line-height: 55px;} */

.card {border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); padding: 18px; margin-bottom: 16px;}

.card .tabulator-row {border-bottom: 1px solid rgba(255, 255, 255, 0.1); position: relative; box-sizing: border-box; padding: 0; /* Adjust padding as needed */}
.timeline-container {display: flex; align-items: center; position: relative;}
.timeline-line {position: absolute; left: 176px; height: 210%; width: 1.2px; background-color: #5ACCE5; z-index: 10;}
.timeline-dot {    position: relative; width: 6px; height: 6px; background-color: #5ACCE5; border-radius: 50%; margin-left: 14px; z-index: 1; left: 159px;}
.timeline-content {font-size: 14px; color: #E7BEE6;}

.search-type label {margin-bottom:0; width:150px; border-radius: 5px 5px 0px 0px !important; margin-right:5px !important; background: rgba(0,0,0,0.3); border: none; color:#ffffff; font-size:13px;}
.search-type .btn {padding: 6px !important;}
.search-type .btn:hover {background: rgba(255,255,255,0.2); color:#ffffff;}

.color-line {position: absolute; left: 1px; top: 0px; height: 100%; width: 5px; /* background-color: var(--color-blue); */ z-index: -1;}

.text-highlight {position: absolute; left: -8px; top: -1px; height: 100%; width: 900px; z-index: -1; /*  background-color: var(--color-blue); */}
#table-container {flex-grow: 1; display: flex; flex-direction: column;}
.more {font-size:20px; color: rgba(255,255,255,1.0); background:rgba(255,255,255,0.0); font-size:13px; border:1px solid rgba(255,255,255,0.5); border-radius: 3px; padding: 0px 10px 0px 10px; transition-duration: 0.3s;}
.more:hover {background: var(--bs-blue);}
.tabulator-footer {display:flex; justify-content: center;}
.tabulator-row .tabulator-cell {height: 34px; padding: 3px 5px 3px 5px;}
#swal2-html-container {color:white;}
</style>

<body class="dashboard" data-bs-theme="dark" data-topbar="dark" data-sidebar="dark">
	<div id="layout-wrapper">
		<%@ include file="/WEB-INF/views/includes/topbar.jsp"%>
		<div class="layout-parent">
			<%@ include file="/WEB-INF/views/includes/sidebar.jsp"%>
			
			<div class="main-content">
				<div class="page-content">
					<div class="container-fluid">
						<!--  ==================================================================================================== -->
					
							<div class="page-title-box d-flex align-items-center justify-content-between">
								<h5 class="mb-0">알림 센터</h5>
							</div>
							<p class="page-desc mb-4">실시간으로 도착하는 신규 알림과 이전 알림을 놓치지 말고 확인해보세요 !</p>
							<div class="d-flex justify-content-between">
								<h4 class="mb-2"><img src="${contextPath}/resources/img/new.png" style="width: 40px; height: 35px; margin-right: 5px; margin-bottom:3px;" />신규 알림 </h4>
								<div class="mb-2" id="readBtn"></div>
							</div>
							<div class="card card-body m-0 card-board mb-5"> 
								<h6 class="col-6">총 <span id="newCnt" class="highlight"></span>건</h6>
							 	<div class="mx-2" id="alertCenter_new_alert"></div>
							</div>
													
							<h4 class="mt-4 mb-2">이전 알림 </h4>
							<div class="mt-2">
								<div class="d-flex justify-content-between align-items-center">
									<div class="btn-group search-type" role="group" aria-label="Basic radio toggle button group">
										<input type="radio" class="btn-check" name="resource_type" id="type-array-item0" autocomplete="off" value="0" checked> 
										<label class="btn btn-outline-primary m-1" for="type-array-item0">전체 보기</label> 
										<input type="radio" class="btn-check" name="resource_type" id="type-array-item1" autocomplete="off" value="1"> 
										<label class="btn btn-outline-primary m-1" for="type-array-item1"><img src="${contextPath}/resources/img/category-icons/alert-alram-white.png" style="width: 17px; height: 17px; margin-right: 5px;" />장애알림</label> 
										<input type="radio" class="btn-check" name="resource_type" id="type-array-item2" autocomplete="off" value="2"> 
										<label class="btn btn-outline-primary m-1" for="type-array-item2"><img src="${contextPath}/resources/img/category-icons/tick-mark.png" style="width: 17px; height: 17px; margin-right: 5px;" />작업 완료 알림</label> 
										<input type="radio" class="btn-check" name="resource_type" id="type-array-item3" autocomplete="off" value="3"> 
										<%-- <label class="btn btn-outline-primary m-1" for="type-array-item3"><img src="${contextPath}/resources/img/category-icons/file3.png" style="width: 15px; height: 15px; margin-right: 5px;" />일일요약</label> --%>
										<input type="radio" class="btn-check" name="resource_type" id="type-array-item4" autocomplete="off" value="4"> 
										<label class="btn btn-outline-primary m-1" for="type-array-item4"><img src="${contextPath}/resources/img/category-icons/warning-white.png" style="width: 17px; height: 17px; margin-right: 5px;" />리소스 사용 경고</label> 
									</div>									
								</div>
							</div>
							<div class="card card-body m-0 card-board mb-2"> 
								<h6 class="mx-2">총 <span id="prevCnt" class="highlight"></span>건</h6> 
								<div id= "alertCenter_old_alert"></div>
							</div>
							<p class="alertCenter-text" id="alertCenter-text" style="display:none;"></p>
						<!--  ==================================================================================================== -->

				</div>
			</div>
		</div>
	</div>
<%@ include file="/WEB-INF/views/includes/footer.jsp"%> 
</div>
</body>
<script>
$(document).ready(function() {
	
	alertCenterMain();
	$('#preLoader').fadeOut(300);
})
</script>
</html>