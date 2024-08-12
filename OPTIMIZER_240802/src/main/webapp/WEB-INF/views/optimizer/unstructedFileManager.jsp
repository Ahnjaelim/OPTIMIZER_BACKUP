<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<c:set var="mn" value="2" />
<c:set var="sn" value="1" />
<!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="utf-8" />
<title>${title }</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
<meta content="Pichforest" name="author" />
<%@ include file="/WEB-INF/views/includes/plugin.jsp"%>
<!-- 이미지 비교 슬라이더 -->
<script defer src="https://cdn.jsdelivr.net/npm/img-comparison-slider@8/dist/index.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/img-comparison-slider@8/dist/styles.css"/>
<!-- js -->
<script>
let fileManagerType = 2;
</script>
<script type="text/javascript" src="${contextPath}/resources/js/api/optimizer-api.js"></script>
<script type="text/javascript" src="${contextPath}/resources/js/optimizer/optimizer-common.js"></script>
<link rel="stylesheet" href="${contextPath}/resources/css/optimizer/optimizer-common.css" />
<script>
let jsonData = JSON.parse('${jsonData}');
$(document).ready(function(){
	optimizerByContentInit();
});
</script>
</head>

<body data-bs-theme="dark" data-topbar="dark" data-sidebar="dark" class="optimizer-content">
	<div id="layout-wrapper">
		<%@ include file="/WEB-INF/views/includes/topbar.jsp"%>
		<div class="layout-parent">
			<%@ include file="/WEB-INF/views/includes/sidebar.jsp"%>
			<div class="main-content">
				<div class="page-content">
	
<!-- ==================================================================================================== -->

<div class="page-title-box d-flex align-items-center justify-content-between">
	<h4 class="mb-0">비정형 파일 최적화</h4>
	<div class="page-title-right">
		<ol class="breadcrumb m-0">
			<li class="breadcrumb-item"><a href="javascript: void(0);">최적화 관리</a></li>
			<li class="breadcrumb-item active">비정형 파일 최적화</li>
		</ol>
	</div>
</div>

<div class="btn-group search-type" role="group" aria-label="Basic radio toggle button group">
</div>

<div id="optimizer-container">
	<div id="explorer" class="card" style="height: 650px;">
		<div class="jstree-legend">
			<span><ion-icon name="ellipse"></ion-icon> 검색된 건수</span><span style="color:rgba(255,255,255,0.3);"> / <ion-icon name="ellipse"></ion-icon> 전체 건수</span>
		</div>
		<div class="content"></div>	
	</div>
	<div id="viewer" class="card">
		<div class="content">
		
			<div class="search-container">
				<div class="count" id="list_cnt"><i class="fa-regular fa-file"></i> 총 <span>0</span>건</div>
				<div class="jstree-path" id="jstree-path"><span>/ <ion-icon name="chevron-forward-outline"></ion-icon></span></div>
				<div style="display:none;">페이지</div>
				<input type="hidden" name="page_name" value="" class="form-control form-control-sm" readonly />
				<input type="hidden" name="search_page" value="${param.page_no }" class="form-control form-control-sm" />
				<select id="search-status-select" multiple>
				</select>					
				<select name="search_range" class="form-select form-select-sm">
					<option value="0" selected>전체 검색</option>
					<option value="1">폴더 내 검색</option>
				</select>
				<input class="form-control form-control-sm" type="text" name="search_keyword" placeholder="웹 컨텐츠 이름을 입력하세요." onkeypress="searchEnterEvent();" />
				<button onclick="searchSubmitBtnEvent();" class="" id="search-btn"><i class="fas fa-search"></i></button>
			</div>
			<div id="volist" style="opacity:0;">
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="optimizingModal" tabindex="-1" aria-labelledby="exampleModalScrollableTitle" style="display: none;" aria-hidden="true">
<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalScrollableTitle">최적화 진행 중인 웹 콘텐츠 <span class="cnt"></span></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            </button>
        </div>
        <div class="modal-body">
        	내용
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-danger" onclick="optimizingCancelAllBtnEvent();">최적화 취소</button>
            <button type="button" class="btn btn-sm btn-primary" data-bs-dismiss="modal" aria-label="Close">닫기</button>
        </div>
    </div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
</div>

<script>
$(document).ready(function(){
    var $viewer = $('#viewer');
    var lastHeight = $viewer.height();
    var $explorer = $("#explorer");

    var observer = new MutationObserver(function(mutations) {
        var newHeight = $viewer.height();
        if (newHeight !== lastHeight) {
            // console.log('Viewer 높이가 변경되었습니다.', newHeight);
            lastHeight = newHeight;
            // 여기에 높이 변경 시 실행할 코드를 작성하세요
            $explorer.css({"height":(newHeight+42)+"px"});
        }
    });

    var config = { attributes: true, childList: true, subtree: true };
    observer.observe($viewer[0], config);
});
</script>
<!-- ==================================================================================================== -->

					<%@ include file="/WEB-INF/views/includes/footer.jsp"%> 
				</div>
			</div>
		</div>
	</div>

</body>
</html>