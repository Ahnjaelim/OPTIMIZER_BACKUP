<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<c:set var="mn" value="5" />
<c:set var="sn" value="1" />
<!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="utf-8" />
<title>${title }</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
<meta content="Pichforest" name="author" />
<%@ include file="/WEB-INF/views/includes/plugin.jsp"%>
<script src="${contextPath}/resources/js/setting/optimizedManage.js"></script>

<style>
.tabulator-row .tabulator-cell {height: 34px !important; padding: 6px 5px 3px;} 
/* .tabulator-row .tabulator-cell[tabulator-field="detail_btn"] {padding: 5px 10px 10px 10px;}
.tabulator-row .tabulator-cell[tabulator-field="modify_btn"] {padding: 5px 10px 10px 10px;}
.tabulator-row .tabulator-cell[tabulator-field="delete_btn"] {padding: 5px 10px 10px 10px;}
.tabulator-row .tabulator-cell[tabulator-field="optimize_btn"] {padding: 5px 10px 10px 10px;} */

/* .board-head .form-select, .board-head .form-control, .board-head .form-control option {background:rgba(0,0,0,0.8);} */

.board-head .col2 .input-group{width: 435px;}
.btn-warning-subtle:hover {color:#CFF250 !important;}
#search-type{width: 100px !important; text-align: center;}
.page-title-box {padding-bottom: 0px;}

#swal2-html-container {color:white;}

.tabulator .tabulator-tableholder .tabulator-table{display:block;}
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
					<div class="page-title-box d-flex justify-content-between">
					<div class="col-6">
						<h4 class="mb-0 mx-2">사용자 관리</h4>
						<p class="page-desc mx-2 mt-4">사용자 및 시스템의 활동을 모니터링 용도로 기록하는 로그입니다.</p></div>
						
						<div class="col-6">
						<h4 class="mb-0 mx-2">사이트 관리</h4>
						<p class="page-desc mx-2 mt-4">사용자들의 계정을 관리할 수 있는 기능을 제공합니다.</p></div>
					</div>
					<div class="d-flex justify-content-between">
						<div class="card col-6 me-2">
							<div class="card card-body m-0 card-board">
								<div class="board-head justify-content-between">
									<div class="col1 text-start" style="font-size: 15px;">
										<ion-icon name="document-outline"></ion-icon>
										총 <strong id="list-cnt-1"
											style="color: #fcff5d; font-size: 20px;">0</strong>건
									</div>
									<div class="col2">
										<div class="input-group">
											<select id="search-type-1" class="form-select form-select-sm">
												<option value="" disabled selected>카테고리 선택</option>
												<option value="ID">아이디</option>
												<option value="NM">이름</option>
												<option value="REG">등록자</option>
											</select> <input type="text" id="search-keyword-1"
												class="form-control form-control-sm"
												onkeypress="searchEnterEvent(event);" style="width: 80px !important;"/>
											<button class="btn btn-sm mx-2" id="search-btn-1">
												<i class="mdi mdi-magnify me-1"></i> 검색
											</button>
											<button class="btn btn-sm" id="search-init-1">전체보기</button>
										</div>
									</div>
								</div>

								<div id="userManageTable"></div>


								<!-- Button trigger modal -->
								<div class="board-tail" style="bottom: 20px;">
									<button type="button" class="btn btn-sm" data-bs-toggle="modal"
										data-bs-target="#userInsertModal" id="userInsertBtn">
										<i class="mdi mdi-plus"></i> 사용자 등록
									</button>
								</div>
							</div>
						</div>
						
						<!-- Modal -->
					<div class="modal fade" id="userInsertModal" tabindex="-1"
						aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div class="modal-dialog" style="max-width: 640px;">
							<div class="modal-content">
								<div class="modal-header">
									<h1 class="modal-title fs-5" id="modal_title">사용자 등록</h1>
									<button type="button" class="btn-close" data-bs-dismiss="modal"
										aria-label="Close"></button>
								</div>
								<div class="modal-body">
									<form name="insertUser">
										<div class="input-group mb-1">
											<span class="input-group-text"><label
												style="font-size: 10px; color: #e06666;">*</label>아이디</span> <input
												type="text" name="lgn_id" class="form-control"
												placeholder="">
										</div>
										<div class="input-group mb-1">
											<span class="input-group-text"><label
												style="font-size: 10px; color: #e06666;">*</label>사용자 이름</span> <input
												type="text" name="lgn_nm" class="form-control"
												placeholder="">
										</div>
										<div class="input-group mb-1">
											<span class="input-group-text"><label
												style="font-size: 10px; color: #e06666;">*</label>비밀번호</span> <input
												type="password" name="lgn_pswd" class="form-control"
												placeholder=""> <label
												style="font-size: 12px; color: #ffbdbd;">*비밀번호는
												10~20자로 영문 대소문자, 숫자, 특수문자 3가지 이상을 조합해야 합니다.<br> 사용가능
												특수문자: ~!@#$%^*()_-=
											</label>
										</div>
										<div class="input-group mb-1">
											<span class="input-group-text"><label
												style="font-size: 10px; color: #e06666;">*</label>비밀번호 확인</span> <input
												type="password" name="lgn_pswdCheck" class="form-control"
												placeholder="">
										</div>
										<div class="input-group mb-1">
											<span class="input-group-text"><label
												style="font-size: 10px; color: #e06666;">*</label>회원 유형</span> <select
												name="lgn_type" class="form-select form-control">
												<option value='1'>일반 사용자</option>
												<option value='0'>슈퍼 사용자</option>
											</select>
										</div>
										<div class="input-group mb-1">
											<span class="input-group-text"><label
												style="font-size: 10px; color: #e06666;">*</label>회사명</span> <input
												type="text" name="cmp_nm" class="form-control"
												placeholder="">
										</div>
									</form>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">닫기</button>
									<button type="button" class="btn btn-primary" id="insertBtn">등록</button>
								</div>
							</div>
						</div>
					</div>
						
						<!-- 수정 Modal -->
					<div class="modal fade" id="userUpdatetModal" tabindex="-1"
						aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div class="modal-dialog" style="max-width: 640px;">
							<div class="modal-content">
								<div class="modal-header">
									<h1 class="modal-title fs-5" id="modal_title">사용자 수정</h1>
									<button type="button" class="btn-close" data-bs-dismiss="modal"
										aria-label="Close"></button>
								</div>
								<div class="modal-body">
									<form name="insertUser">
										<div class="input-group mb-1" style="margin-bottom: 10px;">
											<span class="input-group-text">아이디</span> <input type="text"
												name="lgn_id_up" class="form-control" placeholder=""
												readonly="readonly">
										</div>
										<div class="input-group mb-1" style="margin-bottom: 10px;">
											<span class="input-group-text">사용자 이름</span> <input
												type="text" name="lgn_nm_up" class="form-control"
												placeholder="" readonly="readonly">
										</div>
										<div class="input-group mb-1" style="margin-bottom: 10px;">
											<span class="input-group-text">비밀번호</span> <input
												type="password" name="lgn_pswd_up" class="form-control"
												placeholder="미입력시 기존 비밀번호로 저장됩니다."> <label
												style="font-size: 12px; color: #eda6a6">*비밀번호는
												10~20자로 영문 대소문자, 숫자, 특수문자 3가지 이상을 조합해야 합니다.<br> 사용가능
												특수문자: ~!@#$%^*()_-=
											</label>
										</div>
										<div class="input-group mb-1" style="margin-bottom: 10px;">
											<span class="input-group-text">비밀번호 확인</span> <input
												type="password" name="lgn_pswdCheck_up" class="form-control"
												placeholder="">
										</div>
										<div class="input-group mb-1" style="margin-bottom: 10px;">
											<span class="input-group-text"><label
												style="font-size: 10px; color: #e06666;">*</label>회원 유형</span> <select
												name="lgn_type_up" class="form-select form-control">
												<option value='1'>일반 사용자</option>
												<option value='0'>슈퍼 사용자</option>
											</select>
										</div>
										<div class="input-group mb-1">
											<span class="input-group-text"><label
												style="font-size: 10px; color: #e06666;">*</label>회사명</span> <input
												type="text" name="cmp_nm_up" class="form-control"
												placeholder="">
										</div>
									</form>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">닫기</button>
									<button type="button" class="btn btn-primary" id="updateBtn">수정</button>
								</div>
							</div>
						</div>
					</div>
						
						
						<div class="card col-6 me-2">
							<div class="card card-body m-0 card-board">
								<div class="board-head">
									<div class="col1" style="font-size: 15px;">
										<ion-icon name="document-outline"></ion-icon>
										총 <strong id="list-cnt-2"
											style="color: #fcff5d; font-size: 20px;">0</strong>건
									</div>
									<div class="col2">
										<div class="input-group">
											<select id="search-type-2" class="form-select form-select-sm">
												<option value="" disabled selected>카테고리 선택 </option>
												<option value="site_name">사이트 명</option>
												<option value="site_address">사이트 주소</option>
											</select> <input type="text" id="search-keyword-2"
												class="form-control form-control-sm"
												onkeypress="searchEnterEvent(event);" style="width: 80px !important;" />
											<button class="btn btn-sm mx-2" id="search-btn-2">
												<i class="mdi mdi-magnify me-1"></i> 검색
											</button>
											<button class="btn btn-sm" id="search-init-2">전체보기</button>
										</div>
									</div>
								</div>


								<div id="siteManageTable"></div>


								<!-- Button trigger modal -->
								<div class="board-tail" style="bottom: 20px;">
									<button type="button" class="btn btn-sm" id="site-insert-btn"
										data-bs-toggle="modal" data-bs-target="#exampleModal">
										<i class="mdi mdi-plus"></i> 사이트 등록
									</button>
								</div>
								
								<!-- Modal -->
						<div class="modal fade" id="exampleModal" tabindex="-1"
							aria-labelledby="exampleModalLabel" aria-hidden="true">
							<div class="modal-dialog" style="max-width: 640px;">
								<div class="modal-content">
									<div class="modal-header">
										<h1 class="modal-title fs-5" id="modal_title3">사이트 등록</h1>
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
										<button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">닫기</button>
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
										<button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">닫기</button>
									</div>
								</div>
							</div>
						</div>
								
							</div>
						</div>
					</div>

				</div>
			</div>
			<%@ include file="/WEB-INF/views/includes/footer.jsp"%> 
		</div>
	</div>
<p class="optimizedManage-text" id="optimizedManage-text" style="display:none;"></p>

	<script>
					
		const site_select = $(`#exampleModal select[name="site_select"]`);
		const site_nm = $(`#exampleModal input[name="site_nm"]`);
		const site_address = $(`#exampleModal input[name="site_address"]`);

		$(document).ready(function() {
			userList();
			$("#userInsertBtn").click(function() {
				$("input[name=lgn_id]").val('');
				$("input[name=lgn_nm]").val('');
				$("input[name=lgn_pswd]").val('');
				$("input[name=lgn_pswdCheck]").val('');
				$("input[name=cmp_nm]").val('');
				$("select[name=lgn_type]").val(1);

				$('#userInsertModal').modal('show');
			});
		});

		function searchEnterEvent() {
			if (event.keyCode === 13) { // Enter 키의 keyCode는 13입니다.
				userList();
				return false; // 폼 제출 방지
			}
			return true;
		}

		$("#insertBtn").click(function() {
			insertUser();
		});

		$("#updateBtn").click(function() {
			updateUser();
		});

		$("#userSelectAll").click(function() {
			$("input[name=selectUserText]").val("");
			userList();
		});

		$("#userSelectBtn").click(function() {
			userList();
		});

		function insertUser() {
			//var queryString = $("form[name=insertUser]").serialize() ;

			var lgn_id = $("input[name=lgn_id]").val();
			var lgn_nm = $("input[name=lgn_nm]").val();
			var lgn_pswd = $("input[name=lgn_pswd]").val();
			var lgn_pswdCheck = $("input[name=lgn_pswdCheck]").val();
			var lgn_type = $("select[name=lgn_type]").val();
			var cmp_nm = $("input[name=cmp_nm]").val();

			if (lgn_id == null || lgn_id == '') {
				alertify.warning('아이디를 입력해주세요.');
			} else if (lgn_nm == null || lgn_nm == '') {
				alertify.warning('사용자 이름을 입력해주세요.');
			} else if (lgn_pswd == null || lgn_pswd == '') {
				alertify.warning('비밀번호를 입력해주세요.');
			} else if (lgn_pswdCheck == null || lgn_pswdCheck == '') {
				alertify.warning('비밀번호 확인을 입력해주세요.');
			} else if (lgn_pswd != lgn_pswdCheck) {
				alertify.warning('비밀번호 확인이 일치하지 않습니다.');
			} else if (cmp_nm == null || cmp_nm == '') {
				alertify.warning('회사명을 입력해주세요.');
			} else {
				$.ajax({
					type : 'post',
					url : '/insertUser',
					data : {
						lgn_id : lgn_id,
						lgn_nm : lgn_nm,
						lgn_pswd : lgn_pswd,
						lgn_type : lgn_type,
						cmp_nm : cmp_nm
					},
					dataType : 'json',
					error : function(xhr, status, error) {
						console.log(error);
					},
					success : function(json) {
						if (json.checkId == 'F') {
							alertify.warning('중복된 아이디가 있습니다.');
						} else if (json.responseMessage != 'T') {
							alertify.warning(json.responseMessage);
						} else {
							alertify.success('사용자 등록이 완료되었습니다.');
							$('#userInsertModal').modal('hide');
							userList();
						}
					}
				});
			}
		}

		function updateUser() {
			//var queryString = $("form[name=insertUser]").serialize() ;

			var lgn_id = $("input[name=lgn_id_up]").val();
			var lgn_nm = $("input[name=lgn_nm_up]").val();
			var lgn_pswd = $("input[name=lgn_pswd_up]").val();
			var lgn_pswdCheck = $("input[name=lgn_pswdCheck_up]").val();
			var lgn_type = $("select[name=lgn_type_up]").val();
			var cmp_nm = $("input[name=cmp_nm_up]").val();

			if (lgn_id == null || lgn_id == '') {
				alertify.warning('아이디를 입력해주세요.');
			} else if (lgn_nm == null || lgn_nm == '') {
				alertify.warning('사용자 이름을 입력해주세요.');
			} else if ((lgn_pswdCheck != null && lgn_pswdCheck != "")
					&& (lgn_pswd == null || lgn_pswd == '')) {
				alertify.warning('비밀번호를 입력해주세요.');
			} else if ((lgn_pswd != null && lgn_pswd != "")
					&& (lgn_pswdCheck == null || lgn_pswdCheck == '')) {
				alertify.warning('비밀번호 확인을 입력해주세요.');
			} else if ((lgn_pswd != null && lgn_pswd != "")
					&& (lgn_pswd != lgn_pswdCheck)) {
				alertify.warning('비밀번호 확인이 일치하지 않습니다.');
			} else if (cmp_nm == null || cmp_nm == '') {
				alertify.warning('회사명을 입력해주세요.');
			} else {
				$.ajax({
					type : 'post',
					url : '/updateUser',
					data : {
						lgn_id : lgn_id,
						lgn_nm : lgn_nm,
						lgn_pswd : lgn_pswd,
						lgn_type : lgn_type,
						cmp_nm : cmp_nm
					},
					dataType : 'json',
					error : function(xhr, status, error) {
						console.log(error);
					},
					success : function(json) {
						if (json.responseMessage != 'T') {
							alertify.warning(json.responseMessage);
						} else {
							alertify.success('사용자 수정이 완료되었습니다.');

							$('#userUpdatetModal').modal('hide');
							userList();
						}
					}
				});
			}
		}

		function deletedUser(lgn_id) {
			$.ajax({
				type : 'post',
				url : '/deletedUser',
				data : {
					lgn_id : lgn_id
				},
				dataType : 'json',
				error : function(xhr, status, error) {
					console.log(error);
				},
				success : function(json) {

					userList();
				}
			});
		}

		window.onload = function() {

			$('#preLoader').fadeOut(300);
		};
	</script>

<!--  ==================================================================================================== -->		


</body>
</html>