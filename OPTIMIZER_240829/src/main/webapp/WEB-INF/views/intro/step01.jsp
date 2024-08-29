<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="../includes/config.jsp"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="utf-8" />
<title>${title }</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
<meta content="Pichforest" name="author" />



<style>
* {box-sizing: border-box; margin: 0; padding: 0; font-family: Raleway, sans-serif;}
 .container {display: flex; align-items: center; justify-content: center; min-height: 70vh;} 

.screen {width: 490px; max-width: none; padding: 65px 45px 60px; background-color: var(--bs-white); border-radius: 15px;}
.screen__content {z-index: 1; position: relative; height: 150%;}
.screen__background {position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 0; -webkit-clip-path: inset(0 0 0 0); clip-path: inset(0 0 0 0);}

.title-logo{margin-bottom:60px;}

.login__field {padding: 20px 0px; position: relative;}
.login__icon {position: absolute; top: 30px; color: #7875B5;}

.login__input {border: none; border-bottom: 2px solid #D1D1D4; background: none; padding: 10px; padding-left: 24px; font-weight: 700; width: 75%; transition: .2s;}
.login__input:active,
.login__input:focus,
.login__input:hover {outline: none; border-bottom-color: #6A679E;}

.login__submit {background: #fff; font-size: 14px; margin-top: 30px; padding: 16px 20px; border-radius: 26px; border: 1px solid #D4D3E8; text-transform: uppercase; font-weight: 700; display: flex; align-items: center; width: 100%; color: #4C489D; box-shadow: 0px 2px 2px #5C5696; cursor: pointer; transition: .2s;}
.login__submit:active,
.login__submit:focus,
.login__submit:hover {border-color: #6A679E; outline: none;}

.button__icon {font-size: 24px; margin-left: auto; color: #7875B5;}
button[type=submit], #insertBtn{background: #a86eda; color: #ffff; cursor: pointer; font-size: 13px; font-weight: bold; height: 40px; padding: 22px 25px; width: 100%;}
button[type=submit]:hover, button[type=button]:hover {background: #915ebd; color: #ffff;}


.signup-button {color: #ffff; cursor: pointer; font-size: 13px; font-weight: bold; height: 40px; padding: 22px 25px; width: 100%; border: 1px solid #ffffff; border-radius: 5px;}
.signup-button:hover {background: #ffff; color:#a86eda; cursor: pointer; font-size: 13px; font-weight: bold; height: 40px; padding: 22px 25px; width: 100%; border: 1px solid #ffffff; border-radius: 5px;}

/* .sign-button {text-decoration: underline;}
.sign-button:hover {text-decoration: underline; color: #a86eda;} */
.form-floating-custom > .form-control, .form-floating-custom > .form-select {background: #242323;}

input:-webkit-autofill {-webkit-box-shadow: 0 0 0 500px #242424 inset !important; -webkit-text-fill-color: #white;}
</style>

</head>

<body class="dashboard" data-bs-theme="dark" data-topbar="dark" data-sidebar="dark">
<div id="layout-wrapper">
<div class="container" id="login-form">
	<div class="screen">
		<div class="screen__content">
			<div class="title-logo text-center">
				<img src="/resources/img/big-logo-white.png" style="height: 120px;">
				<h5 class="title mt-3">로그인</h5>
			</div>
			<form class="user" action="/loginPost" method="post">
				<div class="form-floating form-floating-custom mb-3">
					<input type="text" class="form-control" id="input-username" name="lgn_id" placeholder="Enter User Name"> 
					<label for="input-username">USER ID</label>
					<div class="form-floating-icon"><i class="uil uil-users-alt"></i></div>
				</div>
				<div class="form-floating form-floating-custom mb-3">
					<input type="password" class="form-control" id="input-password" name="lgn_pswd" placeholder="Enter Password"> 
					<label for="input-password">PASSWORD</label>
					<div class="form-floating-icon"><i class="uil uil-padlock"></i></div>
				</div>
				<div class="text-center">${msg}</div>
				<p class="p-container mt-5 text-center">
					<button class="btn w-100 d-flex align-items-center justify-content-center" type="submit">로그인</button>
					<span class="signup-button mt-2 w-100 d-flex align-items-center justify-content-center" id="signup-button">회원가입</span>
				</p>
			</form>
		</div>
	</div>
</div>			
			
<!-- 회원가입 -->
<div class="container" id="signup-form" style="display: none;">
	<div class="screen" style="height: 720px;">
		<div class="screen__content">
			<div class="title-logo text-center">
				<img src="/resources/img/big-logo-white.png" style="height: 120px;">
				<h5 class="title mt-3">회원가입</h5>
			</div>
			<form name="insertUser">
			<div class="input-group mb-1">
				<span class="input-group-text">
				<label style="font-size: 10px; color: #e06666;">*</label>회원 유형</span> 
				<select name="lgn_type" class="form-select form-control">
					<option value='1'>일반 사용자</option>
					<option value='0'>슈퍼 사용자</option>
				</select>
			</div>
			<div class="input-group mb-1">
				<span class="input-group-text">
				<label style="font-size: 10px; color: #e06666;">*</label>회사명</span> 
				<input type="text" name="cmp_nm" class="form-control" placeholder="">
			</div>
			<div class="input-group mb-1">
				<span class="input-group-text">
				<label style="font-size: 10px; color: #e06666;">*</label>유저 아이디</span> 
				<input type="text" name="sign_id" class="form-control" placeholder="">
			</div>
			<div class="input-group mb-1">
				<span class="input-group-text">
				<label style="font-size: 10px; color: #e06666;">*</label>비밀번호</span> 
				<input type="password" name="sign_pswd" class="form-control" placeholder="">
			</div>
			<div class="input-group mb-1">
				<span class="input-group-text">
				<label style="font-size: 10px; color: #e06666;">*</label>비밀번호 확인</span> 
				<input type="password" name="lgn_pswdCheck" class="form-control" placeholder="">
			</div>
	        <label style="font-size: 11px; color: #fff;">*비밀번호는 10~20자로 영문 대소문자, 숫자, 특수문자 3가지 이상을 조합해야 합니다. 사용가능 특수문자: ~!@#$%^*()_-=</label>
	        <div class="input-group mb-1">
				<span class="input-group-text">
				<label style="font-size: 10px; color: #e06666;">*</label>사용자 이름</span> 
				<input type="text" name="lgn_nm" class="form-control" placeholder="">
			</div>
            	<%-- <div class="text-center">${msg}</div> --%>
               <p class="p-container mt-4 text-center">
           		 <button type="button" class="btn w-100 d-flex align-items-center justify-content-center" id="insertBtn">가입하기</button>
           		 <span class="back-button mt-2 w-100 d-flex align-items-center justify-content-center" type="button" id="back-button"><i class="fa-solid fa-arrow-left-long" style="margin-right: 5px;"></i> 뒤로가기</span>
        	   </p>
	        </form>
		</div>
	</div>
</div>			

<!-- end authentication section -->
<script>

//회원가입 버튼 클릭 시
  document.getElementById('signup-button').addEventListener('click', function() {
      document.getElementById('login-form').style.display = 'none'; 
      document.getElementById('signup-form').style.display = ''; 
  });

  // 뒤로가기 버튼 클릭 시
  document.getElementById('back-button').addEventListener('click', function() {
      document.getElementById('signup-form').style.display = 'none';
      document.getElementById('login-form').style.display = ''; 
  });
  
  
  $("#insertBtn").click(function() {
		insertUser();
	});
  
  function insertUser() {
		//var queryString = $("form[name=insertUser]").serialize() ;

		var lgn_id = $("input[name=sign_id]").val();
		var lgn_nm = $("input[name=lgn_nm]").val();
		var lgn_pswd = $("input[name=sign_pswd]").val();
		var lgn_pswdCheck = $("input[name=lgn_pswdCheck]").val();
		var lgn_type = $("select[name=lgn_type]").val();
		var cmp_nm = $("input[name=cmp_nm]").val(); 
		
		if (cmp_nm == null || cmp_nm == '') {
			alertify.warning('회사명을 입력해주세요.');
		}
		else if (lgn_id == null || lgn_id == '') {
			alertify.warning('아이디를 입력해주세요.');
		} else if (lgn_pswd == null || lgn_pswd == '') {
			alertify.warning('비밀번호를 입력해주세요.');
		} else if (lgn_pswdCheck == null || lgn_pswdCheck == '' || lgn_pswd != lgn_pswdCheck) {
			alertify.warning('비밀번호 확인을 다시 입력해주세요.');
		} else if (lgn_nm == null || lgn_nm == '') {
			alertify.warning('사용자 이름을 입력해주세요.');
		}   /* else if (lgn_pswd != lgn_pswdCheck) {
			alertify.warning('비밀번호 확인이 일치하지 않습니다.');
		} */ /* else if (cmp_nm == null || cmp_nm == '') {
			alertify.warning('회사명을 입력해주세요.');
		} */ else {
			$.ajax({
			    type: 'post',
			    url: '/insertUser',
			    data: {
			        lgn_id: lgn_id,
			        lgn_nm: lgn_nm,
			        lgn_pswd: lgn_pswd,
			        lgn_type: lgn_type,
			        cmp_nm: cmp_nm
			    },
			    dataType: 'json', // Expecting JSON response
			    success: function(json) {
			        if (json.checkId === 'F') {
			            alertify.warning('중복된 아이디가 있습니다.');
			        } else if (json.responseMessage !== 'T') {
			            alertify.warning(json.responseMessage);
			        } else {
			            alertify.success('사용자 등록이 완료되었습니다.');
			            $('#userInsertModal').modal('hide');
			            userList();
			        }
			    },
			    error: function(xhr, status, error) {
			        // Handle non-JSON response
			        console.log('Error:', xhr.responseText);
			        alertify.error('서버 오류가 발생했습니다.');
			    }
			});

		}
	}
</script>

<!-- JAVASCRIPT -->
<script src="${contextPath}/resources/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="${contextPath}/resources/vendor/metismenujs/metismenujs.min.js"></script>
<script src="${contextPath}/resources/vendor/simplebar/simplebar.min.js"></script>
<script src="${contextPath}/resources/vendor/feather-icons/feather.min.js"></script>
<script type="text/javascript">
</script>


</div>

	
</body>
</html>