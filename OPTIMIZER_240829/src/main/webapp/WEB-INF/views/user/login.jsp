<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="../includes/config.jsp"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!doctype html>
<html lang="en">

<head>     
<meta charset="utf-8" />
<title>LOGIN</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
<meta content="Pichforest" name="author" />
<%@ include file="../includes/plugin.jsp"%>
<!-- App favicon -->
<link rel="shortcut icon" href="${contextPath}/resources/img/favicon.ico">
<!-- Bootstrap Css -->
<link href="${contextPath}/resources/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
<!-- Icons Css -->
<link href="${contextPath}/resources/css/icons.min.css" rel="stylesheet" type="text/css" />
<!-- App Css-->
<link href="${contextPath}/resources/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />
</head>

<!-- ~~~ -->
<style>
* {box-sizing: border-box; margin: 0; padding: 0; font-family: Raleway, sans-serif;}

.container {display: flex; align-items: center; justify-content: center; min-height: 100vh;}
.screen {width: 490px; max-width: none; padding: 65px 45px 60px; background-color: #fff; box-shadow: 0px 3px 8px 0px #0000001A; border-radius: 16px;}

.screen__content {z-index: 1; position: relative; height: 150%;}
.screen__background {position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 0; -webkit-clip-path: inset(0 0 0 0); clip-path: inset(0 0 0 0);}

.title-logo{margin-bottom:60px;}

.login__field {padding: 20px 0px; position: relative;}
.login__icon {position: absolute; top: 30px; color: #7875B5;}
.login__input {border: none; border-bottom: 2px solid #D1D1D4; background: none; padding: 10px; padding-left: 24px; font-weight: 700; width: 75%; transition: .2s;}
.login__input:active,
.login__input:focus,
.login__input:hover {outline: none; border-bottom-color: #6A679E;}
.login__submit {
  background: #fff;
  font-size: 14px;
  margin-top: 30px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 100%;
  color: #4C489D;
  box-shadow: 0px 2px 2px #5C5696;
  cursor: pointer;
  transition: .2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {border-color: #6A679E; outline: none;}

.button__icon {font-size: 24px; margin-left: auto; color: #7875B5;}
button[type=submit] {background: #038edc; color: #ffff; cursor: pointer; font-size: 13px; font-weight: bold; height: 40px; padding: 22px 25px; width: 100%;}
button[type=submit]:hover {background: #0a68ae; color: #ffff;}

input:-webkit-autofill {-webkit-box-shadow: 0 0 0 500px #fff inset !important; -webkit-text-fill-color: #000000;}
</style>

<body>
	<div class="container">
		<div class="screen">
			<div class="screen__content">
				<div class="title-logo text-center">
					<img src="/resources/img/big-logo.png" style="height: 120px;">
					<h5 class="mt-3">사용자 로그인</h5>
				</div>

				<form class="user" action="/loginPost" method="post">
					<div class="form-floating form-floating-custom mb-3">
						<input type="text" class="form-control" id="input-username"
							name="lgn_id" placeholder="Enter User Name"> <label
							for="input-username">USER ID</label>
						<div class="form-floating-icon">
							<i class="uil uil-users-alt"></i>
						</div>
					</div>
					<div class="form-floating form-floating-custom mb-3">
						<input type="password" class="form-control" id="input-password"
							name="lgn_pswd" placeholder="Enter Password"> <label
							for="input-password">PASSWORD</label>
						<div class="form-floating-icon">
							<i class="uil uil-padlock"></i>
						</div>
					</div>
					<div class="text-center">${msg }</div>
					<p class="p-container mt-5 text-center">
						<button
							class="btn w-100 d-flex align-items-center justify-content-center"
							type="submit">로그인</button>
					</p>
				</form>
			</div>
		</div>
	</div>
	<!-- end authentication section -->
  <script>

    </script>
	<!-- JAVASCRIPT -->
	<script
		src="${contextPath}/resources/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
	<script
		src="${contextPath}/resources/vendor/metismenujs/metismenujs.min.js"></script>
	<script
		src="${contextPath}/resources/vendor/simplebar/simplebar.min.js"></script>
	<script
		src="${contextPath}/resources/vendor/feather-icons/feather.min.js"></script>

</body>
</html>