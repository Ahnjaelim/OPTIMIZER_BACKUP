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
<script src="${contextPath}/resources/js/setting/cloudManage.js"></script>

</head>


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
                            <h4 class="mb-0">클라우드 관리</h4>
							<div class="page-title-right" style="display:none;">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Dashonic</a></li>
                                    <li class="breadcrumb-item active">Sales Analytics</li>
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>
                
                <p class="page-desc">클라우드 요금제를 관리할 수 있는 페이지입니다.</p>
                <!-- end page title -->
                <!-- start page content -->
                
                <div id="content-wrapper" class="d-flex flex-column">

			<!-- Main Content -->
			<div id="content">

				

				<!-- Begin Page Content -->
				<div class="container-fluid">

					<!-- ========================================================================================== -->
					<!-- ========================================================================================== -->
					<!-- ========================================================================================== -->
					
					
<div class="card card-body m-0 card-board">					
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
			<button class="btn btn-light" id="search-btn">검색</button>	
			<button class="btn btn-light" id="search-init">전체보기</button>	
		</div>
	</div>
</div>

<div id="volist"></div>

<!-- Button trigger modal -->
<div class="board-tail">
	<button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#cloudInsertModal" id="cloud-insert-btn">
 <i class="mdi mdi-plus me-1"></i> 클라우드 등록
</button>
</div>
</div>

<!-- Modal -->
<div class="modal fade" id="cloudInsertModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="max-width: 640px;">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modal_title"><i class="mdi mdi-plus me-1"></i> 클라우드 등록</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
        <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">닫기</button>
        <button type="button" class="btn btn-primary" id="submit-btn">등록</button>	
      </div>
    </div>
  </div>
</div>



					<!-- ========================================================================================== -->
					<!-- ========================================================================================== -->
					<!-- ========================================================================================== -->

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
selectCloudAll();
const cloud_no_input = $("#cloudInsertModal input[name=cloud_no]");
const cloud_company = $("#cloudInsertModal input[name=cloud_company]");
const cloud_nm = $("#cloudInsertModal input[name=cloud_nm]");
const cloud_payment = $("#cloudInsertModal input[name=cloud_payment]");

window.onload = function() {
   
    $('#preLoader').fadeOut(300);
};
</script>
</body>

</html>