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
</head>

<body class="dashboard" data-bs-theme="dark" data-topbar="dark" data-sidebar="dark">
	<div id="layout-wrapper">
		<%@ include file="/WEB-INF/views/includes/topbar.jsp"%>
		<div class="layout-parent">
			<%@ include file="/WEB-INF/views/includes/sidebar.jsp"%>
			<div class="main-content">
				<div class="page-content">
			
<!--  ==================================================================================================== -->

<div class="page-title-box d-flex align-items-center justify-content-between">
	<h4 class="mb-0">Gallery</h4>
	<div class="page-title-right">
		<ol class="breadcrumb m-0">
			<li class="breadcrumb-item"><a href="javascript: void(0);">Apps</a></li>
			<li class="breadcrumb-item active">Gallery</li>
		</ol>
	</div>
</div>

<div class="card" style="padding:15px;">

<div id="data-print">
<div class="spinner-border text-primary m-1" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
</div>

</div>


<script type="text/javascript" src="${contextPath}/resources/js/api/optimizer-api.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	$('#preLoader').fadeOut(300);	
	fetchAndDisplayData();
});


async function fetchAndDisplayData() {
    try {
        const result = await selectQueryTest();
        const data = result.data;
        $("#data-print").html(""); // 화면 초기화
        for (let i = 0; i < data.length; i++) {
            $("#data-print").append(data[i].page_no + "<br />");
        }
    } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
    }
}
</script>

<!--  ==================================================================================================== -->		
				</div>
			</div>
		</div>
	</div>


</body>
</html>