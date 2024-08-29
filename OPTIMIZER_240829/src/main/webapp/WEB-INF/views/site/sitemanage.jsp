<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
<meta charset="utf-8" />
<title>${title }</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="Premium Multipurpose Admin & Dashboard Template"
	name="description" />
<meta content="Pichforest" name="author" />
<%@ include file="/WEB-INF/views/includes/plugin.jsp"%>
<script src="${contextPath}/resources/js/site/siteManage.js"></script>
<script src="${contextPath}/resources/js/setting/sshManage.js"></script>
</head>

<style>
.input-group-header {width: 50% !important; border-radius: 5px 0px 0px 5px; border-right: none;}
.tabulator .tabulator-footer .tabulator-page {color: #fff;}

.tabulator-row .tabulator-cell {height: 40px !important; padding: 10px 10px 10px 10px;}
.tabulator-row .tabulator-cell[tabulator-field="detail_btn"] {padding: 5px 10px 10px 10px;}
.tabulator-row .tabulator-cell[tabulator-field="modify_btn"] {padding: 5px 10px 10px 10px;}
.tabulator-row .tabulator-cell[tabulator-field="delete_btn"] {padding: 5px 10px 10px 10px;}
.tabulator-row .tabulator-cell[tabulator-field="optimize_btn"] {padding: 5px 10px 10px 10px;}

.board-head .col2 .input-group{width: 435px;}
.btn-warning-subtle:hover {color:#CFF250 !important;}
#search-type{width: 100px !important; text-align: center;}
</style>

<body class="dashboard" data-bs-theme="dark" data-topbar="dark"
	data-sidebar="dark">
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
								<div
									class="page-title-box d-flex align-items-center justify-content-between">
									<h4 class="mb-0">사이트 관리</h4>
								</div>
							</div>
						</div>
						<p class="page-desc">사이트를 등록하고 관리할 수 있는 페이지입니다.</p>
						<!-- ========================================================================================== -->
						<!-- ========================================================================================== -->
						<!-- ========================================================================================== -->

						<div class="card card-body m-0 card-board">
							<div class="board-head">
								<div class="col1" style="font-size: 15px;">
									<ion-icon name="document-outline"></ion-icon>
									총 <strong id="list-cnt" style="color: #fcff5d; font-size: 20px;">0</strong>건
								</div>
								<div class="col2">
									<div class="input-group">
										<select id="search-type" class="form-select form-select-sm">
											<option value="site_name">사이트 명</option>
											<option value="site_address">사이트 주소</option>
										</select> 
										<input type="text" id="search-keyword"
											class="form-control form-control-sm"
											onkeypress="searchEnterEvent(event);"  style="width: 200px;"/>
										<button class="btn btn-sm" id="search-btn"><i class="mdi mdi-magnify me-1"></i> 검색</button>
										<button class="btn btn-sm" id="search-init">전체보기</button>
									</div>
								</div>
							</div>
<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>

							<div id="siteManageTable"></div>


							<!-- Button trigger modal -->
							<div class="board-tail" style="bottom: 20px;">
								<button type="button" class="btn btn-sm" id="site-insert-btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="mdi mdi-plus"></i> 사이트 등록</button>
							</div>
						</div>

						<!-- Modal -->
						<div class="modal fade" id="exampleModal" tabindex="-1"
							aria-labelledby="exampleModalLabel" aria-hidden="true">
							<div class="modal-dialog" style="max-width: 640px;">
								<div class="modal-content">
									<div class="modal-header">
										<h1 class="modal-title fs-5" id="modal_title">사이트 등록</h1>
										<button type="button" class="btn-close"
											data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div class="modal-body">
										<form name="cloudVO">
											<div class="input-group mb-1">
												<span class="input-group-text">클라우드 선택</span> <select
													class="form-select form-control" name="site_select"
													id="site_select">
												</select>
											</div>
											<div class="input-group mb-1">
												<span class="input-group-text">서버 유형</span> <span
													style="padding: 5px;"><input type="radio"
													name="server_type" id="server_storyge" value="1"
													checked="checked">스토리지</span> <span style="padding: 5px;"><input
													type="radio" name="server_type" id="server_linux" value="4">리눅스</span>
												<span style="padding: 5px;"><input type="radio"
													name="server_type" id="server_window" value="5">윈도우</span>
											</div>
											<div class="input-group mb-1">
												<span class="input-group-text">사이트 명</span> <input
													type="text" class="form-control" name="site_nm"
													id="site_nm" value="" />
											</div>
											<div class="input-group mb-1">
												<span class="input-group-text">사이트 주소</span> <input
													type="text" class="form-control" name="site_address"
													id="site_address" value="" />
											</div>
											<div class="input-group mb-1">
												<span class="input-group-text">담당자</span> <input
													type="hidden" class="form-control" readonly
													value="${sessionScope.login.lgn_sn }" name="lgn_sn" /> <input
													type="text" class="form-control" id="site_manager" readonly
													value="${sessionScope.login.lgn_nm }" />
											</div>
										</form>
									</div>
									<div class="modal-body">
										<h5>서버 정보 등록</h5>
										<form name="sshVO">
											<div class="input-group mb-1" id="ssh_id_box">
												<span class="input-group-text">아이디</span> <input type="text"
													class="form-control" name="ssh_id" value="" />
											</div>
											<div class="input-group mb-1" id="ssh_pw_box">
												<span class="input-group-text">비밀번호</span> <input
													type="text" class="form-control" name="ssh_pw" value="" />
											</div>
											<div class="input-group mb-1" id="ssh_port_box">
												<span class="input-group-text">PORT 번호</span> <input
													type="text" class="form-control" name="ssh_port" value="" />
											</div>
											<div class="input-group mb-1" id="ssh_server_ip_box">
												<span class="input-group-text">서버 IP 주소</span> <input
													type="text" class="form-control" name="ssh_server_ip"
													value="" />
											</div>
											<div class="input-group mb-1" id="resource_path_box">
												<span class="input-group-text">웹 컨텐츠 경로</span> <input
													type="text" class="form-control" name="resource_path"
													value="" />
											</div>
											<div class="input-group mb-1" id="access_key_box">
												<span class="input-group-text">ACCESS KEY 등록</span> <input
													type="text" class="form-control" name="access_key" value="" />
											</div>
											<div class="input-group mb-1" id="secert_key_box">
												<span class="input-group-text">SECRET KEY 등록</span> <input
													type="text" class="form-control" name="secert_key" value="" />
											</div>
											<div class="input-group mb-1" id="bucket_name_box">
												<span class="input-group-text">버킷 명 등록</span> <input
													type="text" class="form-control" name="bucket_name"
													value="" />
											</div>
										</form>
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-danger-subtle"
											data-bs-dismiss="modal">닫기</button>
										<button type="button" class="btn btn-primary" id="submit-btn">등록</button>
									</div>
								</div>
							</div>
						</div>

						<!-- Modal -->
						<div class="modal fade" id="detailModal" tabindex="-1"
							aria-labelledby="exampleModalLabel" aria-hidden="true">
							<div class="modal-dialog" style="max-width: 800px;">
								<div class="modal-content">
									<div class="modal-header">
										<h1 class="modal-title fs-5" id="modal_title">사이트 상세보기</h1>
										<button type="button" class="btn-close"
											data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div class="modal-body">
										<form name="cloudVO">
											<div class="input-group mb-2">
												<span class="input-group-header input-group-text">기존
													사이트 원본 용량</span> <span class="input-group-header input-group-text">OPTIMIZER
													용량</span> <input type="text" class="form-control" readonly
													id="site_org_file_size" value="50GB" /> <input type="text"
													class="form-control" readonly id="optimizer_file_size"
													value="500MB (0.01%)" />
											</div>
											<div class="input-group mb-0">
												<span class="input-group-text">사이트 명</span> <input
													type="text" class="form-control" name="site_nm_detail"
													id="site_nm_detail" vaㅋlue="" readonly />
											</div>
											<div class="input-group mb-0">
												<span class="input-group-text">사이트 주소</span> <input
													type="text" class="form-control" name="site_address_detail"
													id="site_address_detail" value="" readonly />
											</div>
											<div class="input-group mb-0">
												<span class="input-group-text">서버 유형</span> <input
													type="text" class="form-control" readonly
													id="server_type_detail" value="" readonly />
											</div>
											<div class="input-group mb-0" id="ssh_server_ip_box_detail">
												<span class="input-group-text">서버 IP 주소</span> <input
													type="text" class="form-control"
													name="ssh_server_ip_detail" value="" readonly />
											</div>
											<div class="input-group mb-0" id="ssh_id_box_detail">
												<span class="input-group-text">서버 아이디</span> <input
													type="text" class="form-control" name="ssh_id_detail"
													value="" readonly />
											</div>
											<div class="input-group mb-0" id="ssh_pw_box_detail">
												<span class="input-group-text">비밀번호</span> <input
													type="text" class="form-control" name="ssh_pw_detail"
													value="" readonly />
											</div>
											<div class="input-group mb-0" id="resource_path_box_detail">
												<span class="input-group-text">웹 컨텐츠 경로</span> <input
													type="text" class="form-control"
													name="resource_path_detail" value="" readonly />
											</div>
											
											<div class="input-group mb-0" id="ssh_access_key_detail">
												<span class="input-group-text">ACCESS KEY</span> <input
													type="text" class="form-control" name="ssh_access_key_detail"
													value="" readonly />
											</div>
											<div class="input-group mb-0" id="ssh_secret_key_detail">
												<span class="input-group-text">SECRET KEY</span> <input
													type="text" class="form-control" name="ssh_secret_key_detail"
													value="" readonly />
											</div>
											<div class="input-group mb-0" id="ssh_bucket_name">
												<span class="input-group-text">버킷 명</span> <input
													type="text" class="form-control"
													name="ssh_bucket_name" value="" readonly />
											</div>
										</form>
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-outline-primary"
											data-bs-dismiss="modal">닫기</button>
									</div>
								</div>
							</div>
						</div>
						<!-- ========================================================================================== -->
						<!-- ========================================================================================== -->
						<!-- ========================================================================================== -->
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<script>
		const site_select = $(`#exampleModal select[name="site_select"]`);
		const site_nm = $(`#exampleModal input[name="site_nm"]`);
		const site_address = $(`#exampleModal input[name="site_address"]`);
		
		$(document).ready(function() {
			
			siteMain();
			$('#preLoader').fadeOut(300);
		})
		
	</script>
</body>
</html>