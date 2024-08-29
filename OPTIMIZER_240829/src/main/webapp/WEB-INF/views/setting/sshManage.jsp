<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<c:set var="mn" value="3" />
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
<script src="${contextPath}/resources/js/setting/sshManage.js"></script>
</head>

<style>
.tabulator .tabulator-footer .tabulator-page{color:#fff;}
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
									<h4 class="mb-0">서버 관리</h4>
								</div>
							</div>
						</div>
						<p class="page-desc">서버를 관리할 수 있는 페이지입니다.</p>
						<!-- ========================================================================================== -->
						<!-- ========================================================================================== -->
						<!-- ========================================================================================== -->
						<div class="card card-body m-0 card-board">

							<div class="board-head">
								<div class="col1">
									<ion-icon name="document-outline"></ion-icon>
									총 <strong id="list-cnt" style="color:#1976E3;">0</strong>건
								</div>
								<!-- <div class="col2">
									<div class="input-group">
										<select id="search-type" class="form-select form-control">
											<option value="site_name">사이트 명</option>
											<option value="site_address">사이트 주소</option>
										</select> <input type="text" id="search-keyword"
											class="form-select form-control"
											onkeypress="searchEnterEvent(event);" />
										<button class="btn btn-light" id="search-btn">
											<i class="mdi mdi-magnify me-1"></i> 검색
										</button>
										<button class="btn btn-light" id="search-init">전체보기</button>
									</div>
								</div> -->
							</div>

							<div id="sshManageTable"></div>

                            <!-- Button trigger modal -->
							<div class="board-tail" style="bottom:20px;">
								<button type="button" class="btn btn-sm" id="sshInsertBtn"
									data-bs-toggle="modal">
									<i class="mdi mdi-plus"></i>서버 정보 등록
								</button>
							</div>
						</div>
					</div>

					<!-- Modal -->
					<div class="modal fade" id="sshInsertModal" tabindex="-1"
						role="dialog" aria-hidden="true">
						<div class="modal-dialog" role="document"
							style="max-width: 640px;">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title">서버 정보 등록</h5>
									<button type="button" class="btn-close"
											data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div class="modal-body">
									<form name="sshVO">
										<div class="input-group mb-1">
											<span class="input-group-text">아이디</span> <input type="text"
												class="form-control" name="ssh_id" id="ssh_id" value="" />
										</div>
										<div class="input-group mb-1">
											<span class="input-group-text">비밀번호</span> <input type="text"
												class="form-control" name="ssh_pw" id="ssh_pw" value="" />
										</div>
										<div class="input-group mb-1">
											<span class="input-group-text">PORT 번호</span> <input
												type="text" class="form-control" name="ssh_port" id="ssh_port" value="" />
										</div>
										<div class="input-group mb-1">
											<span class="input-group-text">서버 IP 주소</span> <input
												type="text" class="form-control" name="ssh_server_ip" id="ssh_server_ip"
												value="" />
										</div>
										<div class="input-group mb-1">
											<span class="input-group-text">웹 컨텐츠 경로</span> <input
												type="text" class="form-control" name="resource_path" id="resource_path"
												value="" />
										</div>
										<div class="input-group mb-1">
											<span class="input-group-text">클라우드 선택</span> <select
												name="cloud_no" id="site_select" class="form-select form-control">
												<option value="1">기본 클라우드</option>
											</select>
										</div>
										<div class="input-group mb-1">
											<span class="input-group-text">사이트 선택</span> <select
												name="site_no" id="site_nm" class="form-select form-control">
												<c:forEach var="item" items="${siteList }">
													<option value="${item.site_no }">${item.site_name }</option>
												</c:forEach>
											</select>
										</div>
										<div class="input-group mb-1">
											<span class="input-group-text">서버 유형 선택</span> <select
												name="server_type" id="server_type" class="form-select form-control">
												<option value="1">네이버 클라우드</option>
												<option value="2">AWS</option>
												<option value="3">AZURE</option>
												<option value="4">Linux</option>
												<option value="5">Windows</option>
											</select>
										</div>
									</form>
								</div>
								<div class="modal-footer">
										<button type="button" class="btn btn-danger-subtle"
											data-bs-dismiss="modal">닫기</button>
										<button type="button" class="btn btn-primary" id="submit-btn" onclick="insertSsh();">등록</button>
									</div>
							</div>
						</div>
					</div>

				</div>
					</div>
				</div>


				<!-- ========================================================================================== -->
				<!-- ========================================================================================== -->
				<!-- ========================================================================================== -->


				<!-- /.container-fluid -->


				<!-- End of Main Content -->

				<%@ include file="/WEB-INF/views/includes/footer.jsp"%>

			</div>
			<!-- End of Content Wrapper -->

		</div>
		<!-- End of Page Wrapper -->
</body>

</html>