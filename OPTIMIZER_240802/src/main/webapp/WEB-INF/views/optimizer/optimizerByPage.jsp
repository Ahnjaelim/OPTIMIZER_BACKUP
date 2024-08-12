<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<c:set var="mn" value="2" />
<c:set var="sn" value="2" />
<!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="utf-8" />
<title>${title }</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
<meta content="Pichforest" name="author" />
<%@ include file="/WEB-INF/views/includes/plugin.jsp"%>
<script>
var jsonCount = ${jsonCount };
let fileManagerType = 1;
let isPage = 1;
</script>
<style>
  input[type="radio"] {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        
        
         .summary-boxes {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        .summary-box {
         padding-top:10px;
            background-color: rgba(255,255,255,0.1);
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            flex: 1;
            margin-right: 10px;
        }
        .summary-box:last-child {
            margin-right: 0;
        }
         #testRendering .modal-dialog {
            min-width: 1400px;
           
           
           
        }
        .summary-box2{
        padding-top:10px;
        padding-bottom:10px;
        margin:10px;
        background-color: #444444;
        text-align: center;
         border-radius: 5px;
         border-color: gray;
   		 border: 1px solid;
   		 
        }
        
         .first {
            height:90%;
            align-content: center;
        }
.page-type-summary {margin:0px 0px 15px 0px;}
.page-type-summary label {display: block; background:rgba(255,255,255,0.1); border-radius: 5px !important; padding:15px; position: relative; cursor:pointer; margin:0px 15px 0px 0px !important; text-align:left; border:none; width:19%; flex-basis: 19%; max-width:19%;}
.page-type-summary label:last-child {margin:0 !important;}
.page-type-summary label:hover {opacity:0.8 !important;}
.page-type-summary p {margin:0; padding:0; color:#ffffff;}
.page-type-summary ion-icon {font-size:3em;}
.page-type-summary .type-chart {position: absolute; right:0px; top:10px; width:80px; height:80px;}
.page-type-summary .type-name {font-size: 0.8em; padding:5px 0px 0px 0px;}
.page-type-summary .type-time {font-size:1.2em; font-weight: bold;}
.apexcharts-radialbar .apexcharts-tracks .apexcharts-radialbar-track path {stroke:rgba(0,0,0,0.5);}

.data-table { border-radius: 10px; border:1px solid rgba(255,255,255,0.3); margin-top:15px;}
.data-table table {width:100%;}
.data-table th,
.data-table td {border-top:1px solid rgba(255,255,255,0.1) !important; border-right:1px solid rgba(255,255,255,0.1) !important; padding:10px;}
.data-table p {margin:0; padding:0; text-align:center;}
.data-table .time {font-size:1.2em; font-weight:bold;}
#testRendering h4 {font-size:13px; background:rgba(255,255,255,0.1); margin:0; padding:10px; text-align:center; border-radius: 5px 5px 0px 0px;}


#testRendering iframe { transform: scale(0.5); transform-origin: 0 0; width: 200%; height:700px; border: none; background: #ffffff; opacity:0; position: relative; z-idex:2;}


.browser-frame {
border: 1px solid rgba(255,255,255,0.2);
border-bottom:none;
border-radius: 8px 8px 0px 0px;
overflow: hidden;
width: 100%;
margin:0px;
height:400px;
	position: relative;
}

.browser-header {
background: #f1f1f1;
padding: 10px;
display: flex;
align-items: center;
}

.browser-buttons {
display: flex;
gap: 5px;
}

.browser-button {
width: 12px;
height: 12px;
border-radius: 50%;
background: #ff5f56; /* Red button */
display: inline-block;
}

.browser-button:nth-child(2) {
background: #ffbd2e; /* Yellow button */
}

.browser-button:nth-child(3) {
background: #27c93f; /* Green button */
}

.address-bar {
flex-grow: 1;
margin-left: 10px;
padding: 5px;
border: 1px solid #ccc;
border-radius: 5px;
background: white;
color:#1e1e1e;
}

.btn-check + .btn:hover {background:rgba(255,255,255,0.1);}
.btn-check:checked + .btn:hover {background: rgba(126,96,152,0.9);}
.search-container .SumoSelect{margin-right:2px; width:220px;}

.iframe-ready {position: absolute; height:350px; width:100%; background: rgba(255,255,255,0.1); top:50px; left:0; z-index:1;}
.iframe-ready div {position:absolute; top:50%; left: 50%; transform:translate(-50%, -50%); z-index:1; }
.iframe-ready .page-time {width:200px; height:200px; background:rgba(0,0,0,0.2); border-radius: 200px; backdrop-filter: blur(5px); display:none; text-align:center; font-size:3em; font-weight: bold; padding-top:70px; z-index:2;}
.iframe-ready .page-time::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 10px solid rgba(255,255,255,0.3);
    border-top: 10px solid #ffffff;
    border-radius: 50%;
    transition: all 0.3s linear;
}

.iframe-ready .page-time.spinning::before {
    animation: spin 1s linear infinite;
}
[data-type="before"] .iframe-ready .page-time.complete::before {border-color:var(--color-red);}
[data-type="after"] .iframe-ready .page-time.complete::before {border-color:var(--color-green);}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
[data-type="before"] .iframe-ready .page-time::before {border-top-color:var(--color-red);}
[data-type="after"] .iframe-ready .page-time::before {border-top-color:var(--color-green);}

.iframe-ready .result {z-index:3; top: 40%; display:none;}
#testRendering .progress-bar {background: rgba(255,255,255,0.1); border-radius: 0px 0px 10px 10px; height:10px; border: 1px solid rgba(255,255,255,0.2);
border-top:none;}
#testRendering .progress-bar div {background: var(--color-green); width:0%; height:10px;}
#testRendering [data-type="before"] .progress-bar div {background: var(--color-red);}

#simulation {margin-bottom:8px; position: relative; top:-7px;}

.time-table {background: rgba(255,255,255,0.05); border-radius: 10px; border:1px solid  rgba(255,255,255,0.2); margin-top:15px; display:none;}
.time-table li {padding:15px; border-right:1px solid  rgba(255,255,255,0.1);}
.time-table li p {margin:0; padding:0; text-align:center;}
.time-table li .value {font-size: 1.5em;}
</style>
</head>

<body data-bs-theme="dark" data-topbar="dark" data-sidebar="dark" id="optimizer-by-page">
	<div id="layout-wrapper">
		<%@ include file="/WEB-INF/views/includes/topbar.jsp"%>
		<div class="layout-parent">
			<%@ include file="/WEB-INF/views/includes/sidebar.jsp"%>
			<div class="main-content">
				<div class="page-content">
				
<!-- ==================================================================================================== -->
<div class="page-title-box d-flex align-items-center justify-content-between">
	<h4 class="mb-0">웹 페이지별 최적화</h4>
	<div class="page-title-right">
		<ol class="breadcrumb m-0">
			<li class="breadcrumb-item"><a href="javascript: void(0);">최적화 관리</a></li>
			<li class="breadcrumb-item active">웹 페이지별 최적화</li>
		</ol>
	</div>
</div>

<div id="optimizer-container" class="page card-group">
	<div id="explorer" class="card" style="border-radius: 5px 0px 0px 5px;">
		<div class="d-flex jstree-page-legend">
			<p class="col">웹 페이지 목록</p>
			<p class="col" style="text-align:right; padding-right:15px;">Lazyload 적용<buttton class="btn-info btn-popover" data-popover-content="Lazyload는 페이지가 처음 로드될 때 모든 미디어 파일을 즉시 로드하지 않고, 필요한 최소한의 콘텐츠만 로드하는 기술입니다. 웹 페이지의 초기 로드 속도를 높이고, 사용자의 대역폭을 절약하며, 웹 페이지의 성능을 향상시키는 데 도움을 줍니다." data-popover-width="500"><ion-icon name="help-circle"></ion-icon></p>
		</div>
		<div class="content" style="padding-top:10px;"></div>
	</div>
	<div id="new_resourceList" class="card" style="border-radius: 0px 5px 5px 0px;">
		<div id="content_warpper" style="padding:20px;">
			<div >
				<div class="row" id="rendering_speedBox" style="height:30%">
					<div class="col-md-12" >
						 <div id="simulation"></div>
						 <div class="page-type-summary d-flex btn-group" role="group" id="page-type-summary">
						 </div>
					</div>
				</div>
				<div id="table-container">
					<div class="search-container">
						<div class="count" id="list_cnt"><i class="fa-regular fa-file"></i> 총 <span>0</span>건</div>
						<div class="jstree-path" id="jstree-path" style="opacity:0"><span>/ <ion-icon name="chevron-forward-outline"></ion-icon></span></div>
						<input type="hidden" name="search_page" value="${param.page_no }" class="form-control form-control-sm" />
						<select id="search-status-select" multiple style="margin-right:0;">
						</select>					
						<select name="search_range" class="form-select form-select-sm" style="display:none;">
							<option value="1" selected>페이지 내 검색</option>
						</select>
						<input class="form-control form-control-sm" type="text" name="search_keyword" placeholder="웹 컨텐츠 이름을 입력하세요." onkeypress="searchEnterEvent();" />
						<button onclick="searchSubmitBtnEvent2();" class="" id="search-btn"><i class="fas fa-search"></i></button>
					</div>
					<div id="contentTable"></div>
				</div>
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
	        </div>
	        <div class="modal-footer">
	            <button type="button" class="btn btn-sm btn-danger" onclick="optimizingCancelAllBtnEvent();">최적화 취소</button>
	            <button type="button" class="btn btn-sm btn-primary" data-bs-dismiss="modal" aria-label="Close">닫기</button>
	        </div>
	    </div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div>

<div class="modal fade" id="optimizing-by-page-modal" tabindex="-1" aria-labelledby="exampleModalScrollableTitle" style="display: none;" aria-hidden="true">
	<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
	    <div class="modal-content">
	        <div class="modal-header">
	            <h5 class="modal-title" id="exampleModalScrollableTitle">최적화 진행 중인 웹 콘텐츠 <span class="cnt"></span></h5>
	            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
	            </button>
	        </div>
	        <div class="modal-body">
	        </div>
	        <div class="modal-footer">
	            <button type="button" class="btn btn-sm btn-danger" onclick="pageFnc.optimizingCancelAllBtnEvent();">최적화 취소</button>
	            <button type="button" class="btn btn-sm btn-primary" data-bs-dismiss="modal" aria-label="Close">닫기</button>
	        </div>
	    </div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div>



<!-- 모달 -->
<div class="modal fade" id="testRendering" tabindex="-1" aria-labelledby="renderMD" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="renderMD"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" data-bs-dismiss="modal" aria-label="Close">닫기</button>
            </div>
        </div>
    </div>
</div>

<!-- ==================================================================================================== --> 
               		<%@ include file="/WEB-INF/views/includes/footer.jsp"%> 
				</div>
			</div>
		</div>
	</div>

<script type="text/javascript" src="${contextPath}/resources/js/api/optimizer-api.js"></script>
<script type="text/javascript" src="${contextPath}/resources/js/optimizer/optimizer-common.js"></script>
<script type="text/javascript" src="${contextPath}/resources/js/optimizer/optimizer-page.js"></script>
<link rel="stylesheet" href="${contextPath}/resources/css/optimizer/optimizer-common.css" />
<script src="${contextPath}/resources/vendor/apexcharts/apexcharts.min.js"></script>

<!-- 이미지 비교 슬라이더 -->
<script defer src="https://cdn.jsdelivr.net/npm/img-comparison-slider@8/dist/index.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/img-comparison-slider@8/dist/styles.css"/>

<script type="text/javascript">
var jsonData = JSON.parse('${jsonData}');
$(document).ready(function(){
	optimizerByPageInit();
});
</script>
</body>
</html>
