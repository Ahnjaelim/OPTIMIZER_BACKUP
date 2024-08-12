<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<c:set var="mn" value="3" />
<c:set var="sn" value="6" />
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<title>${title }</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
<meta content="Pichforest" name="author" />
<%@ include file="/WEB-INF/views/includes/plugin.jsp"%>
</head>
<style>
.input-group {margin-top: 5px;}
.form-control {margin-right: 5px;}
.form-control:disabled{background-color: #032d46 !important;}
.btn-light {background:rgba(0,0,0,0.3); color: white !important; border-color: gray !important;}
.btn-light:hover {background:rgba(0,0,0,0.6); color: white !important; border-color: gray !important;}

.btn-light:active, .btn-light:hover, .btn-light:focus {background-color: var(--color-blue) !important;}
.btn-light {background-color: var(--color-blue);}
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
						<div class="row">
							<div
								class="page-title-box d-flex align-items-center justify-content-between">
								<h4 class="mb-0">비밀번호 변경</h4>
							</div>
							<p class="page-desc">사용자의 비밀번호를 변경 할 수 있는 페이지입니다.</p>
							<div class="card card-body m-0 card-board">
								<div class="col-lg-3">
										<label class="form-label" for="currentPassword"><span
											style="color: red;">* </span> 현재 비밀번호</label>
									<form id="passwordForm" onsubmit="handleSubmit(event);">
										<div class="input-group">
											<input type="password" name="currentPassword"
												class="form-control form-control-sm" placeholder="현재 비밀번호"
												id="currentPwd">
											<button type="submit" class="btn btn-light btn-sm"
												id="currentPasswordButton">확인</button>
										</div>
									</form>
									<div id="message" style="font-size: 11px; margin-top: 3px;"></div>
									</div>
									<div class="col-lg-12 d-flex" style="margin-top: 30px; display: none !important;" id="newPasswordSection">
									<div class="col-lg-3">
										<label class="form-label" for="newPassword"><span
											style="color: red;">* </span> 새로운 비밀번호</label>
										<div class="input-group">
											<input type="password" 
												class="form-control form-control-sm" placeholder="새로운 비밀번호" id="newPwd">
											<!-- <button class="btn btn-light btn-sm"
												id="newPasswordButton">확인</button> -->
										</div>
									<!-- 	<label style="font-size: 11px; color: #ffbdbd;">*비밀번호는
												10~20자로 영문 대소문자, 숫자, 특수문자 3가지 이상을 <br>조합해야 합니다.
										</label>  -->
									</div>
									
									<div class="col-lg-3" style="margin-left: 30px;">
										<label class="form-label" for="currentPasswordConfirm"><span
											style="color: red;">* </span> 새로운 비밀번호 확인</label>
										<form id="newPasswordForm" onsubmit="newHandleSubmit(event);">
										<div class="input-group">
											<input type="password" 
												class="form-control form-control-sm" placeholder="새로운 비밀번호 확인" id="newPwdConfirm">
											<button class="btn btn-light btn-sm"
												id="currentPasswordConfirmButton">확인</button>
												
										</div>
										</form>
										<div id="newMessage" style="font-size: 11px; margin-top: 3px;"></div>
									</div>
								</div>
								<%@ include file="/WEB-INF/views/includes/footer.jsp"%> 
							</div>
						</div>


						<script type="text/javascript">
$(document).ready(function(){
	$('#preLoader').fadeOut(300);
});	
	
function handleSubmit(event) {
    event.preventDefault(); // 기본 폼 제출 동작을 방지합니다.

    var currentPwd = $("#currentPwd").val();
    updatePasswdChk(currentPwd);

}
function newHandleSubmit(event) {
	 event.preventDefault(); // 기본 폼 제출 동작을 방지합니다.
	 
	 var newPwd = $("#newPwd").val();
	 var newPwdConfirm = $("#newPwdConfirm").val();
	 if (newPwd === newPwdConfirm) {
	        updatePasswd(newPwd);
	    } else {
	    	 $("#newMessage").text("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.").css("color","#ffbdbd");
	    }
}
	
	function updatePasswdChk(lgn_pswd){
		let result = "";
		$.ajax({
			type: 'POST',
			url: '/updatePasswdChk',
			data:{lgn_pswd : lgn_pswd},
			async: false,
			success: function(res) {
				 if (res.msg === "T") {
	                    $("#message").text("확인되었습니다.").css("color", "#51d28c");
	                    $("#currentPwd").prop("disabled", true);
	                    $("#newPasswordSection").show();
	                } else {
	                    $("#message").text(res.msg).css("color", "#ffbdbd");
	                }
	            },
		    error: function onError (error) {
		        console.error(error);
		    }
		});
		return result;
	}
	function updatePasswd(lgn_pswd){
		let result = "";
		$.ajax({
			type: 'POST',
			url: '/updatePasswd',
			data:{lgn_pswd : lgn_pswd},
			async: false,
			success: function(res) {
				
				var message = res.responseMessage
				if (message === "T") {
					/*  $("#newMessage").text("사용가능합니다.").css("color", "#51d28c"); */
					/*  alert("비밀번호 변경이 완료되었습니다."); */
					alertify.alert('비밀번호 변경', '비밀번호 변경이 완료되었습니다.', function() {
					   	location.reload();
						/*  alertify.success('로그아웃이 완료되었습니다.'); */
					});
	            }else {
	            	 $("#newMessage").text(message).css("color","#ffbdbd");
	            	}
	            },
		    error: function onError (error) {
		        console.error(error);
		    }
		});
		return result;
	}

</script>

<!--  ==================================================================================================== -->
					</div>
				</div>
			</div>
		</div>
	</div>


</body>
</html>