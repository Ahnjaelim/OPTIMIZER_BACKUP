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
				<li class="logo"><a href="/"><img src="/resources/img/logo-white.png" ></a></li>
				<li class="menu"><a href="/"><ion-icon name="home"></ion-icon> 처음으로</a></li>
				<li class="menu"><a href="/"><ion-icon name="stopwatch"></ion-icon> 벤치마크 테스트</a></li>
				<li class="menu" style="display:none;"><a href="#"></a><i class="fa-solid fa-file"></i> 이력 관리</a></li>
			</ul>
		</header>
		<div class="window">
			<div class="window-head d-flex">
				<p class="title">벤치마크 테스트</p>
			</div>
			<div class="window-body d-flex">
				<div class="process-tab">
					<ul>
						<li data-step="1">
							<div class="step-no">1</div>
							<div class="step-title">
								벤치마크 테스트 안내
								<p class="step-status">완료</p>
							</div>
						</li>
						<li data-step="2">
							<div class="step-no">2</div>
							<div class="step-title">
								기본 정보 입력
								<p class="step-status">완료</p>
							</div>
						</li>
						<li data-step="3">
							<div class="step-no">3</div>
							<div class="step-title">
								현재 상태 진단
								<p class="step-status">완료</p>
							</div>
						</li>
						<li data-step="4">
							<div class="step-no">4</div>
							<div class="step-title">
								웹 콘텐츠 수집
								<p class="step-status">완료</p>
							</div>
						</li>
						<li data-step="5">
							<div class="step-no">5</div>
							<div class="step-title">
								최적화 적용
								<p class="step-status">완료</p>
							</div>
						</li>
						<li data-step="6">
							<div class="step-no">6</div>
							<div class="step-title">
								최적화 미리보기
								<p class="step-status">완료</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="process-content" style="position:relative;">
					<c:choose>
					    <c:when test="${param.step == '1' or param.step == null}">
					        <%@ include file="/WEB-INF/views/step01.jsp"%>
					    </c:when>
					    <c:when test="${param.step == '2'}">
					        <%@ include file="/WEB-INF/views/step02.jsp"%>
					    </c:when>
					    <c:when test="${param.step == '3'}">
					        <%@ include file="/WEB-INF/views/step03.jsp"%>
					    </c:when>
					    <c:when test="${param.step == '4'}">
					        <%@ include file="/WEB-INF/views/step04.jsp"%>
					    </c:when>
					    <c:when test="${param.step == '5'}">
					        <%@ include file="/WEB-INF/views/step05.jsp"%>
					    </c:when>
					    <c:when test="${param.step == '6'}">
					        <%@ include file="/WEB-INF/views/step06.jsp"%>
					    </c:when>
					    <c:otherwise>
					       	잘못된 접근입니다!
					    </c:otherwise>
					 </c:choose>
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
<script src="/resources/js/step-common.js"></script>

</body>
</html>