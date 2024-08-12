<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<!DOCTYPE html>
<html lang="ko">
<c:set var="mn" value="5" />
<c:set var="sn" value="3" />
<head>
<meta charset="utf-8" />
<title>${title }</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
<meta content="Pichforest" name="author" />
<%@ include file="/WEB-INF/views/includes/plugin.jsp"%>
<script src="${contextPath}/resources/js/statistics/statisticsCommon.js"></script>
<style>
.badge {display: inline-block; width:80px; border-radius: 3px; font-size: 12px !important; background:var(--color-green) !important; padding:4px 0px 4px 0px !important;}
.badge-abnormal {background:var(--color-red) !important;}
.badge-recommand {position:absolute; top:5px; right:5px; display: inline-block; border:1px solid rgba(255,255,255,0.5); border-radius: 5px; padding:2px 7px 1px 7px;}
   .tabulator-col-title {
        text-align: center;
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
	<h4 class="mb-0">웹 콘텐츠 통계</h4>
	<div class="page-title-right">
		<ol class="breadcrumb m-0">
			<li class="breadcrumb-item"><a href="javascript: void(0);">통계</a></li>
			<li class="breadcrumb-item active">웹 콘텐츠 통계</li>
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

<h4 class="narrow">웹 콘텐츠 유형별 수집 현황</h4>
<div class="row">
	<div class="col-md-6">
		<div class="card">
			<div class="row">
				<div class="col-md-12">
					<div style="height:250px;"><canvas id="doughnutChartConetent" ></canvas></div>
				</div>
			</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="card">
			<div class="row">
				<div class="col-md-12">
					<div id="contentTypeTable" style="height:250px;"> </div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="row">
	<div class="col-md-12">
		<div class="card">
				<div class="col-md-12">
					<div id="contentTable" style="min-height:300px;"> </div>
				</div>
		</div>
	</div>
</div>



<script type="text/javascript">
var sn = ${sn}; 
$(document).ready(function(){
	
	updateDisplay_st();
	wc_main();
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