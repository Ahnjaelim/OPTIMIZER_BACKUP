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
<meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
<meta content="Pichforest" name="author" />
<%@ include file="/WEB-INF/views/includes/plugin.jsp"%>

<style>
#layout-wrapper {max-width: 1600px; margin:0px auto;}
.layout-parent {padding:0; height:auto; }
.main-content {margin-left:0;}
.page-content {padding:20px;}

.intro-tab {margin-bottom:20px;}
.intro-tab a {display: block; background: var(--bs-white); border: 1px solid var(--bs-border-color-translucent); padding:15px; color:#fff;}
.intro-tab a p {margin:0; padding:0; text-align:center;}
.intro-tab a p span {background: rgba(255,255,255,0.1); border-radius: 30px; display: inline-block; width:30px; height:30px; padding-top:2px; margin-right:10px;}
.intro-tab .active a {border-bottom:2px solid #a86eda; color:#a86eda; font-weight: bold;}
.intro-tab .active a p span {background:#a86eda; color:#ffffff;}
.intro-tab .done a {color:#8cc054;}
.intro-tab .done a p span {background:#8cc054; color:#ffffff;}

</style>

</head>

<body class="dashboard" data-bs-theme="dark" data-topbar="dark" data-sidebar="dark">
	<div id="layout-wrapper">
		<%@ include file="/WEB-INF/views/includes/topbar-intro.jsp"%>
		<div class="layout-parent">
			<div class="main-content">
				<div class="page-content">
			
<!--  ==================================================================================================== -->

<div class="intro-tab">
	<ul class="d-flex">
		<li class="col" data-step="1">
			<a href="#">
				<p><span>1</span>로그인</p>
			</a>
		</li>
		<li class="col" data-step="2">
			<a href="#">
				<p><span>2</span>웹 사이트 등록</p>
			</a>
		</li>
		<li class="col" data-step="3">
			<a href="#">
				<p><span>3</span>OPTIMIZER 적용해보기</p>
			</a>
		</li>
		<li class="col" data-step="4" style="display:none;">
			<a href="#">
				<p><span>4</span>OPTIMIZER 시작하기</p>
			</a>
		</li>
	</ul>
</div>

<script>
let user = {};
user.lgn_sn = parseInt(${sessionScope.login.lgn_sn });
</script>

<script type="text/javascript" src="${contextPath}/resources/js/api/user-api.js"></script>
<script type="text/javascript" src="${contextPath}/resources/js/api/site-api.js"></script>
<script type="text/javascript" src="${contextPath}/resources/js/api/optimizer-api.js"></script>
<script type="text/javascript" src="${contextPath}/resources/js/intro/intro-common.js"></script>

<c:choose>
    <c:when test="${param.step == '1' or param.step == null}">
        <%@ include file="/WEB-INF/views/intro/step01.jsp"%>
    </c:when>
    <c:when test="${param.step == '2'}">
        <%@ include file="/WEB-INF/views/intro/step02.jsp"%>
    </c:when>
    <c:when test="${param.step == '3'}">
        <%@ include file="/WEB-INF/views/intro/step03.jsp"%>
    </c:when>
    <c:when test="${param.step == '4'}">
        <%@ include file="/WEB-INF/views/intro/step04.jsp"%>
    </c:when>
    
    <c:otherwise>
       	잘못된 접근입니다!
    </c:otherwise>
</c:choose>

<script type="text/javascript">
$(document).ready(function(){
	$('#preLoader').fadeOut(300);	
});
</script>

<!--  ==================================================================================================== -->		
				</div>
			</div>
		</div>
	</div>


</body>
</html>