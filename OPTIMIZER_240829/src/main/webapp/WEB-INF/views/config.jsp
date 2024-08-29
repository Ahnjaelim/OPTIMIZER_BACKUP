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
	<h4 class="mb-0">환경 설정</h4>
	<div class="page-title-right">
		<ol class="breadcrumb m-0">
			<li class="breadcrumb-item active"><a href="javascript: void(0);">환경 설정</a></li>
		</ol>
	</div>
</div>

<div class="card" style="padding:0px 15px 15px 15px;">
	<div id="tabulator"></div>
</div>

<div class="modal fade" id="modify-modal" tabindex="-1" role="dialog" aria-labelledby="modify-modal" aria-hidden="true">
	<div class="modal-dialog" role="document" style="max-width: 600px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"></h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">	
				config_sn<input type="text" id="config_sn" readonly /><br />
				config_key<input type="text" id="config_key"  readonly /><br />
				config_value<input type="text" id="config_value" /><br />
			</div>
			<div class="modal-footer">
				<button class="btn btn-primary btn-sm" id="modify-btn">저장</button>
				<button class="btn btn-primary btn-sm" type="button" data-bs-dismiss="modal" aria-label="Close">닫기</button>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="alert-modal" aria-labelledby="..." tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modal 2</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>수정 완료</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary btn-sm" type="button" data-bs-dismiss="modal" aria-label="Close">닫기</button>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript">
$(document).ready(function(){
	$('#preLoader').fadeOut(300);	
});
</script>
<script type="text/javascript" src="/resources/js/config.js"></script>

<!--  ==================================================================================================== -->		
				</div>
			</div>
		</div>
	</div>


</body>
</html>