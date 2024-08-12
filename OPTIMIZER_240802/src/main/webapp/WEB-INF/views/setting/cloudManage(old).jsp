<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<c:set var="mn" value="4" />
<c:set var="sn" value="2" />
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
<script src="${contextPath}/resources/js/setting/cloudManage.js"></script>
</head>

<body id="page-top">

	<!-- Page Wrapper -->
	<div id="wrapper">
	<%@ include file="/WEB-INF/views/includes/topbar.jsp"%>   
	<%@ include file="/WEB-INF/views/includes/sidebar.jsp"%> 

		<!-- Content Wrapper -->
		<div id="content-wrapper" class="d-flex flex-column">

			<!-- Main Content -->
			<div id="content">
				<!-- Begin Page Content -->
				<div class="container-fluid">

<!-- ========================================================================================== -->
<!-- ========================================================================================== -->
<!-- ========================================================================================== -->

<h1 class="h3 mb-4 text-gray-800">클라우드 관리</h1>
<p class="mb-4">클라우드 요금제를 관리할 수 있는 페이지입니다.</p>


<div class="board-head">
	<div class="col1">
		<ion-icon name="document-outline"></ion-icon> 총 <strong id="list-cnt">0</strong>건
	</div>
	<div class="col2">
		<div class="input-group">
			<select id="search-type" class="form-select form-control">
				<option value="cloud_company">서비스 업체</option>
				<option value="cloud_nm">요금제 이름</option>
			</select>
			<input type="text" id="search-keyword"  class="form-select form-control" onkeypress="searchEnterEvent(event);" />
			<button class="btn btn-primary" id="search-btn">검색</button>	
			<button class="btn btn-outline-primary" id="search-init">전체보기</button>	
		</div>
	</div>
</div>

<div id="volist"></div>

<div style="text-align:right; padding:50px 0px 50px 0px;">
	<button class="btn btn-primary" id="cloud-insert-btn">클라우드 등록</button>
</div>

<div class="modal fade" id="cloudInsertModal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" role="document" style="max-width: 640px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">클라우드 등록</h5>
				<button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
			</div>
			<div class="modal-body">
				<form name="cloudVO">
					<input type="hidden" name="cloud_no" value="" />
					<div class="input-group mb-1">
					  <span class="input-group-text">서비스 업체</span>
					  <input type="text" class="form-control"  name="cloud_company" id="cloud_company" value="" />
					  <!-- <select class="form-select form-control" name="cloud_company" id="cloud_company">
					  	<option value="AWS">AWS</option>
					  	<option value="GCP">GCP</option>
					  	<option value="NAVER">NAVER</option>
					  </select> -->
					</div>
					<div class="input-group mb-1">
					  <span class="input-group-text">요금제 이름</span>
					  <input type="text" class="form-control"  name="cloud_nm" id="cloud_nm" value="" />
					</div>					
					<div class="input-group mb-1">
					  <span class="input-group-text">1G당 지불 금액</span>
					  <input type="text" class="form-control" name="cloud_payment" id="cloud_payment" value="" /><span class="input-group-text unit">원</span>
					</div>					
					<div class="input-group mb-1">
					  <span class="input-group-text">등록인</span>
					  <input type="hidden" class="form-control" readonly value="${sessionScope.login.lgn_sn }" name="lgn_sn" />
					  <input type="text" class="form-control" readonly value="${sessionScope.login.lgn_nm }" />
					</div>					
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn btn-primary" type="button" id="submit-btn">등록</button>
				<button class="btn btn-outline-primary" type="button" data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div>

<script>
selectCloudAll();
const cloud_no_input = $("#cloudInsertModal input[name=cloud_no]");
const cloud_company = $("#cloudInsertModal input[name=cloud_company]");
const cloud_nm = $("#cloudInsertModal input[name=cloud_nm]");
const cloud_payment = $("#cloudInsertModal input[name=cloud_payment]");	
</script>

<!-- ========================================================================================== -->
<!-- ========================================================================================== -->
<!-- ========================================================================================== -->

				</div><!-- /.container-fluid -->
				
			</div>
			<!-- End of Main Content -->

			<%@ include file="/WEB-INF/views/includes/footer.jsp"%>

		</div>
		<!-- End of Content Wrapper -->

	</div>
	<!-- End of Page Wrapper -->

</body>

</html>