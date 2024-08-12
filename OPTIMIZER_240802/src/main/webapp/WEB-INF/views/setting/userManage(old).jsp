<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<c:set var="mn" value="4" />
<c:set var="sn" value="3" />
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">
<title>${title }</title>
<%@ include file="/WEB-INF/views/includes/plugin.jsp"%>
<script src="${contextPath}/resources/js/setting/userManage.js"></script>
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

<h1 class="h3 mb-4 text-gray-800">사용자 관리</h1>
<p class="mb-4">사용자들의 계정을 관리할 수 있는 기능을 제공합니다.</p>

<div class="board-head">
	<div class="col1">
		<ion-icon name="document-outline"></ion-icon> 총 <strong id="list-cnt">0</strong>건
	</div>
	<div class="col2">
		<div class="input-group">
			<select id="search-type" class="form-select form-control">
				<option value="ID">아이디</option>
				<option value="NM">이름</option>
				<option value="REG">등록자</option>
			</select>
			<input type="text" id="search-keyword"  class="form-select form-control" onkeypress="searchEnterEvent(event);" />
			<button class="btn btn-primary" id="search-btn">검색</button>	
			<button class="btn btn-outline-primary" id="search-init">전체보기</button>	
		</div>
	</div>
</div>

<div id="volist"></div>

<div style="text-align:right; padding:50px 0px 50px 0px;">
	<button class="btn btn-primary" id="userInsertBtn">관리자 등록</button>
</div>

<div class="modal fade" id="userInsertModal" tabindex="-1" role="dialog" aria-labelledby="alertModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document" style="max-width: 640px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">관리자 등록</h5>
				<button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
			</div>
			<div class="modal-body">
				<form name="insertUser">				
					<div class="input-group mb-1">
						<span class="input-group-text"><label style="font-size:10px;color: red;">*</label>아이디</span>
						<input type="text" name="lgn_id" class="form-control" placeholder="">
					</div>
					<div class="input-group mb-1">
						<span class="input-group-text"><label style="font-size:10px;color: red;">*</label>관리자 이름</span>
						<input type="text" name="lgn_nm" class="form-control" placeholder="">
					</div>
					<div class="input-group mb-1">
						<span class="input-group-text"><label style="font-size:10px;color: red;">*</label>비밀번호</span>
						<input type="password" name="lgn_pswd" class="form-control" placeholder="">
						<label style="font-size: 12px;color: red;">*비밀번호는 10~20자로 영문 대소문자, 숫자, 특수문자 3가지 이상을 조합해야 합니다.<br> 사용가능 특수문자: ~!@#$%^*()_-=</label>
					</div>
					<div class="input-group mb-1">
						<span class="input-group-text"><label style="font-size:10px;color: red;">*</label>비밀번호 확인</span>
						<input type="password" name="lgn_pswdCheck" class="form-control" placeholder="">
					</div>
					<div class="input-group mb-1">
						<span class="input-group-text"><label style="font-size:10px;color: red;">*</label>회원 유형</span>
						<select name="lgn_type" class="form-select form-control">
							<option value='1'>일반 관리자</option>
							<option value='0'>슈퍼 관리자</option>
						</select>
					</div>
					<div class="input-group mb-1">
						<span class="input-group-text"><label style="font-size:10px;color: red;">*</label>회사명</span>
						<input type="text" name="cmp_nm" class="form-control" placeholder="">
					</div>
				</form>
			</div>
			
			<div class="modal-footer">
				<button class="btn btn-primary" id="insertBtn">등록</button>
				<button class="btn btn-secondary" type="button" data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="userUpdatetModal" tabindex="-1" role="dialog" aria-labelledby="alertModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document" style="max-width: 640px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">관리자 수정</h5>
				<button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
			</div>
			<div class="modal-body">
				<form name="insertUser">				
					<div class="input-group mb-1" style="margin-bottom: 10px;">
						<span class="input-group-text">아이디</span>
						<input type="text" name="lgn_id_up" class="form-control" placeholder="" readonly="readonly">
					</div>
					<div class="input-group mb-1" style="margin-bottom: 10px;">
						<span class="input-group-text">관리자 이름</span>
						<input type="text" name="lgn_nm_up" class="form-control" placeholder="" readonly="readonly">
					</div>
					<div class="input-group mb-1" style="margin-bottom: 10px;">
						<span class="input-group-text">비밀번호</span>
						<input type="password" name="lgn_pswd_up" class="form-control" placeholder="미입력시 기존 비밀번호로 저장됩니다.">
						<label style="font-size: 12px;color: red;">*비밀번호는 10~20자로 영문 대소문자, 숫자, 특수문자 3가지 이상을 조합해야 합니다.<br> 사용가능 특수문자: ~!@#$%^*()_-=</label>
					</div>
					<div class="input-group mb-1" style="margin-bottom: 10px;">
						<span class="input-group-text">비밀번호 확인</span>
						<input type="password" name="lgn_pswdCheck_up" class="form-control" placeholder="">
					</div>
					<div class="input-group mb-1" style="margin-bottom: 10px;">
						<span class="input-group-text"><label style="font-size:10px;color: red;">*</label>회원 유형</span>
						<select name="lgn_type_up" class="form-select form-control">
							<option value='1'>일반 관리자</option>
							<option value='0'>슈퍼 관리자</option>
						</select>
					</div>
					<div class="input-group mb-1">
						<span class="input-group-text"><label style="font-size:10px;color: red;">*</label>회사명</span>
						<input type="text" name="cmp_nm_up" class="form-control" placeholder="">
					</div>
				</form>
			</div>
			
			<div class="modal-footer">
				<button class="btn btn-primary" id="updateBtn">수정</button>
				<button class="btn btn-secondary" type="button" data-dismiss="modal">닫기</button>
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

			<%@ include file="/WEB-INF/views/includes/footer.jsp"%>

		</div>
		<!-- End of Content Wrapper -->

	</div>
	<!-- End of Page Wrapper -->
<script>
$(document).ready(function(){
	userList();
	$("#userInsertBtn").click(function(){
		$("input[name=lgn_id]").val('');
        $("input[name=lgn_nm]").val('');
        $("input[name=lgn_pswd]").val('');
        $("input[name=lgn_pswdCheck]").val('');
        $("input[name=cmp_nm]").val('');
        $("select[name=lgn_type]").val(1);
        
		$('#userInsertModal').modal('show');
	});	
});

function searchEnterEvent(){
    if (event.keyCode === 13) { // Enter 키의 keyCode는 13입니다.
    	userList();
        return false; // 폼 제출 방지
    }
    return true;	
}

$("#insertBtn").click(function(){
	insertUser();
});	

$("#updateBtn").click(function(){
	updateUser();
});	

$("#userSelectAll").click(function(){
	$("input[name=selectUserText]").val("");
	userList();
});

$("#userSelectBtn").click(function(){
	userList();
});

function insertUser(){
	//var queryString = $("form[name=insertUser]").serialize() ;
	
	var lgn_id = $("input[name=lgn_id]").val();
	var lgn_nm = $("input[name=lgn_nm]").val();
	var lgn_pswd = $("input[name=lgn_pswd]").val();
	var lgn_pswdCheck = $("input[name=lgn_pswdCheck]").val();
	var lgn_type = $("select[name=lgn_type]").val();
	var cmp_nm = $("input[name=cmp_nm]").val();
	
	if(lgn_id == null || lgn_id == '') {
		modalAlert('알림','아이디를 입력해주세요.');
	}else if(lgn_nm == null || lgn_nm == '') {
		modalAlert('알림','관리자 이름을 입력해주세요.');
	}else if(lgn_pswd == null || lgn_pswd == '') {
		modalAlert('알림','비밀번호 입력해주세요.');
	}else if(lgn_pswdCheck == null || lgn_pswdCheck == '') {
		modalAlert('알림','비밀번호 확인을 입력해주세요.');
	}else if(lgn_pswd != lgn_pswdCheck) {
		modalAlert('알림','비밀번호 확인이 일치하지 않습니다.');
	}else if(cmp_nm == null || cmp_nm == '') {
		modalAlert('알림','회사명을 입력해주세요.');
	}else {
		$.ajax({
			type : 'post',
			url : '/insertUser',
			data : {
				lgn_id: lgn_id,
				lgn_nm: lgn_nm,
				lgn_pswd: lgn_pswd,
				lgn_type: lgn_type,
				cmp_nm: cmp_nm
			},
			dataType : 'json',
			error: function(xhr, status, error){
				console.log(error);
			},
			success : function(json){				
				if(json.checkId == 'F') {
					modalAlert('알림','중복된 아이디가 있습니다.');
				}else if(json.responseMessage != 'T') {
					modalAlert('알림',json.responseMessage);
				}else {
					modalAlert('알림','관리자 등록이 완료되었습니다.');

					$('#userInsertModal').modal('hide');
					userList();
				}
			}
		});	
	}
}	

function updateUser(){
	//var queryString = $("form[name=insertUser]").serialize() ;
	
	var lgn_id = $("input[name=lgn_id_up]").val();
	var lgn_nm = $("input[name=lgn_nm_up]").val();
	var lgn_pswd = $("input[name=lgn_pswd_up]").val();
	var lgn_pswdCheck = $("input[name=lgn_pswdCheck_up]").val();
	var lgn_type = $("select[name=lgn_type_up]").val();
	var cmp_nm = $("input[name=cmp_nm_up]").val();
	
	if(lgn_id == null || lgn_id == '') {
		modalAlert('알림','아이디를 입력해주세요.');
	}else if(lgn_nm == null || lgn_nm == '') {
		modalAlert('알림','관리자 이름을 입력해주세요.');
	}else if((lgn_pswdCheck != null && lgn_pswdCheck != "") && (lgn_pswd == null || lgn_pswd == '')) {
		modalAlert('알림','비밀번호 입력해주세요.');
	}else if((lgn_pswd != null && lgn_pswd != "") && (lgn_pswdCheck == null || lgn_pswdCheck == '')) {
		modalAlert('알림','비밀번호 확인을 입력해주세요.');
	}else if((lgn_pswd != null && lgn_pswd != "") && (lgn_pswd != lgn_pswdCheck)) {
		modalAlert('알림','비밀번호 확인이 일치하지 않습니다.');
	}else if(cmp_nm == null || cmp_nm == '') {
		modalAlert('알림','회사명을 입력해주세요.');
	}else {
		$.ajax({
			type : 'post',
			url : '/updateUser',
			data : {
				lgn_id: lgn_id,
				lgn_nm: lgn_nm,
				lgn_pswd: lgn_pswd,
				lgn_type: lgn_type,
				cmp_nm: cmp_nm
			},
			dataType : 'json',
			error: function(xhr, status, error){
				console.log(error);
			},
			success : function(json){				
				if(json.responseMessage != 'T') {
					modalAlert('알림',json.responseMessage);
				}else {
					modalAlert('알림','관리자 수정이 완료되었습니다.');

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
			lgn_id: lgn_id
		},
		dataType : 'json',
		error: function(xhr, status, error){
			console.log(error);
		},
		success : function(json){				

			modalAlert('알림','관리자가 삭제 되었습니다.');

			userList();
		}
	});	
}
</script>
</body>

</html>