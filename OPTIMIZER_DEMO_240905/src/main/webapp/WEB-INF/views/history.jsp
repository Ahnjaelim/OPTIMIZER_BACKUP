<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
<meta content="OPTIMIZER BENCHMARK TEST" name="description" />
<meta content="WELLCONN" name="author" />
<%@ include file="/WEB-INF/views/includes/plugin.jsp"%>
</head>

<body data-bs-theme="dark" data-topbar="dark" data-sidebar="dark">
<div style="width:100%; height:100%;">
	<div class="wrapper">
	
		<header>
			<ul class="d-flex">
				<li class="logo"><img src="/resources/img/logo-white.png" ></li>
				<li class="menu"><a href="/"><i class="fa-solid fa-stopwatch"></i> 벤치마크 테스트</a></li>
				<li class="menu"><a href="#"></a><i class="fa-solid fa-file"></i> 이력 관리</a></li>
			</ul>
		</header>
		<div class="window">
			<div class="window-head d-flex">
				<p class="title">벤치마크 테스트</p>
			</div>
			<div class="window-body d-flex">
				<div class="process-tab">
					히스토리
				</div>
				<div class="process-content">
					내용
				</div>
			</div>
			<div class="window-foot">
				<button class="prev-btn" disabled><ion-icon name="chevron-back-outline"></ion-icon> 이전</button>
				<button class="next-btn" disabled>다음 <ion-icon name="chevron-forward-outline"></ion-icon></button>
			</div>
		</div>
		
	</div><!-- //end of wrapper -->
</div>

<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<script src="/resources/js/api/main-api.js"></script>

</body>
</html>