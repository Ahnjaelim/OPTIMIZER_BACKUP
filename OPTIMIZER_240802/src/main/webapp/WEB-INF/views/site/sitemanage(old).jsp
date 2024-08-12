<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<c:set var="mn" value="4" />
<c:set var="sn" value="1" />
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

<link href="${contextPath}/resources/css/site/siteManage.css" rel="stylesheet">
<script src="${contextPath}/resources/js/site/siteManage.js"></script>
<script src="${contextPath}/resources/js/setting/sshManage.js"></script>
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
					
					<h1 class="h3 mb-4">사이트 관리</h1>
					<p class="mb-4">사이트 리스트를 관리할 수 있는 페이지입니다.</p>
					<!-- ========================================================================================== -->
					
				<div class="board-head">
					<div class="col1">
						<ion-icon name="document-outline"></ion-icon> 총 <strong id="list-cnt">0</strong>건
					</div>
					<div class="col2">
						<div class="input-group">
							<select id="search-type" class="form-select form-control">
								<option value="site_name">사이트 명</option>
								<option value="site_address">사이트 주소</option>
							</select>
							<input type="text" id="search-keyword"  class="form-select form-control" onkeypress="searchEnterEvent(event);" />
							<button class="btn btn-primary" id="search-btn">검색</button>	
							<button class="btn btn-outline-primary" id="search-init">전체보기</button>	
						</div>
					</div>
				</div>
				
				<div id = "siteManageTable"></div>
				
				<div style="text-align:right; padding:50px 0px 50px 0px;">
					<button class="btn btn-primary" id="site-insert-btn">사이트 등록</button>
				</div>
				
				<!-- 모달	 -->	
				
				<div class="modal fade" id="siteInsertModal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" role="document" style="max-width: 640px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="modal_title">사이트 등록</h5>
				<button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
			</div>
			<div class="modal-body">
				<form name="cloudVO">
					<div class="input-group mb-1">
					  <span class="input-group-text">클라우드 선택</span>
					  <select class="form-select form-control" name="site_select" id="site_select">
					  	
					  </select>
					</div>
					<div class="input-group mb-1">
					  <span class="input-group-text">서버 유형</span>
					  <span style="padding: 5px;"><input type="radio" name="server_type" id="server_storyge" value="1" checked="checked">스토리지</span>
					  <span style="padding: 5px;"><input type="radio" name="server_type" id="server_linux" value="4">리눅스</span>
					  <span style="padding: 5px;"><input type="radio" name="server_type" id="server_window" value="5">윈도우</span>
					</div>
					<div class="input-group mb-1">
					  <span class="input-group-text">사이트 명</span>
					  <input type="text" class="form-control"  name="site_nm" id="site_nm" value="" />
					</div>					
					<div class="input-group mb-1">
					  <span class="input-group-text">사이트 주소</span>
					  <input type="text" class="form-control" name="site_address" id="site_address" value="" />
					</div>					
					<div class="input-group mb-1">
					  <span class="input-group-text">담당자</span>
					  <input type="hidden" class="form-control" readonly value="${sessionScope.login.lgn_sn }" name="lgn_sn" />
					  <input type="text" class="form-control" id="site_manager" readonly value="${sessionScope.login.lgn_nm }" />
					</div>					
				</form>
			</div>
			<div class="modal-body">
			<h4>서버 정보 등록</h4>
			<form name="sshVO">

				<div class="input-group mb-1" id="ssh_id_box">
					<span class="input-group-text">아이디</span> <input type="text"
						class="form-control" name="ssh_id" value="" />
				</div>
				<div class="input-group mb-1" id="ssh_pw_box">
					<span class="input-group-text">비밀번호</span> <input type="text"
						class="form-control" name="ssh_pw" value="" />
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
						type="text" class="form-control" name="resource_path" value="" />
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
						type="text" class="form-control" name="bucket_name" value="" />
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

<div class="modal fade" id="sshInsertModal" tabindex="-1"
	role="dialog" aria-hidden="true">
	<div class="modal-dialog" role="document"
		style="max-width: 640px;">
	<div class="modal-content">
		<div class="modal-header">
			<h5 class="modal-title">서버 정보 등록</h5>
			<button class="close" type="button" data-dismiss="modal"
				aria-label="Close">
				<span aria-hidden="true">×</span>
			</button>
		</div>
		<div class="modal-body">
			<form name="sshVO">

				<div class="input-group mb-1">
					<span class="input-group-text">아이디</span> <input type="text"
						class="form-control" name="ssh_id" value="" />
				</div>
				<div class="input-group mb-1">
					<span class="input-group-text">비밀번호</span> <input type="text"
						class="form-control" name="ssh_pw" value="" />
				</div>
				<div class="input-group mb-1">
					<span class="input-group-text">PORT 번호</span> <input
						type="text" class="form-control" name="ssh_port" value="" />
				</div>
				<div class="input-group mb-1">
					<span class="input-group-text">서버 IP 주소</span> <input
						type="text" class="form-control" name="ssh_server_ip"
						value="" />
				</div>
				<div class="input-group mb-1">
					<span class="input-group-text">웹 컨텐츠 경로</span> <input
						type="text" class="form-control" name="resource_path" value="" />
				</div>
				<div class="input-group mb-1">
					<span class="input-group-text">사이트 명</span> <input
						type="text" class="form-control" name="site_nm_ssh" value=""  readonly="readonly"/>
				</div>
				<div class="input-group mb-1">
					<span class="input-group-text">서버 유형 선택</span> <select
						name="server_type" class="form-select form-control">
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
			<button class="btn btn-primary" type="button" id="submit-btn"
				onclick="insertSsh();">등록</button>
				<button class="btn btn-outline-primary" type="button"
					data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div>

<!-- <div class="modal fade" id="sshUpdateModal" tabindex="-1"
	role="dialog" aria-hidden="true">
	<div class="modal-dialog" role="document"
		style="max-width: 640px;">
	<div class="modal-content">
		<div class="modal-header">
			<h5 class="modal-title">서버 정보</h5>
			<button class="close" type="button" data-dismiss="modal"
				aria-label="Close">
				<span aria-hidden="true">×</span>
			</button>
		</div>
		<div class="modal-body">
			<form name="sshVO">

				<div class="input-group mb-1">
					<span class="input-group-text">아이디</span> <input type="text"
						class="form-control" name="ssh_id_up" value="" readonly="readonly"/>
				</div>
				<div class="input-group mb-1">
					<span class="input-group-text">비밀번호</span> <input type="text"
						class="form-control" name="ssh_pw_up" value="" readonly="readonly"/>
				</div>
				<div class="input-group mb-1">
					<span class="input-group-text">PORT 번호</span> <input
						type="text" class="form-control" name="ssh_port_up" value="" readonly="readonly"/>
				</div>
				<div class="input-group mb-1">
					<span class="input-group-text">서버 IP 주소</span> <input
						type="text" class="form-control" name="ssh_server_ip_up"
						value=""  readonly="readonly"/>
				</div>
				<div class="input-group mb-1">
					<span class="input-group-text">웹 컨텐츠 경로</span> <input
						type="text" class="form-control" name="resource_path_up" value="" readonly="readonly"/>
				</div>
				<div class="input-group mb-1">
					<span class="input-group-text">사이트 명</span> <input
						type="text" class="form-control" name="site_nm_ssh_up" value=""  readonly="readonly"/>
				</div>
				<div class="input-group mb-1">
					<span class="input-group-text">서버 유형 선택</span> <select
						name="server_type_up" class="form-select form-control" disabled="disabled">
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
			<button class="btn btn-primary" type="button" id="submit-btn"
				onclick="updateSsh();">수정</button>
				<button class="btn btn-outline-primary" type="button"
					data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div> -->

				</div><!-- /.container-fluid -->
				
			</div>
			<!-- End of Main Content -->

			<%@ include file="/WEB-INF/views/includes/footer.jsp"%>

		</div>
		<!-- End of Content Wrapper -->

	</div>
	<!-- End of Page Wrapper -->
	
	<script>
	const site_select = $(`#siteInsertModal select[name="site_select"]`);
	const site_nm = $(`#siteInsertModal input[name="site_nm"]`);
	const site_address = $(`#siteInsertModal input[name="site_address"]`);
	window.onload = function() {
		main();
		$('#preLoader').fadeOut(2000);
    };
		
	</script>
</body>

</html>