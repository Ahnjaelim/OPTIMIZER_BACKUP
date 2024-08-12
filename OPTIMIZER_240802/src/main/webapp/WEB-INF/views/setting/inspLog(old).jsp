<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">
<title>감사 로그</title>
<%@ include file="/WEB-INF/views/includes/plugin.jsp"%>
</head>

<body id="page-top">

	<!-- Page Wrapper -->
	<div id="wrapper">

	<%@ include file="/WEB-INF/views/includes/topbar.jsp"%>   
	<%@ include file="/WEB-INF/views/includes/sidebar.jsp"%> 

		<!-- Content Wrapper -->
		<div id="content-wrapper" class="d-flex flex-column">

			<!-- Main Content -->
			<div id="content">

				

				<!-- Begin Page Content -->
				<div class="container-fluid">

					<!-- ========================================================================================== -->
					<!-- ========================================================================================== -->
					<!-- ========================================================================================== -->
					
					<h1 class="h3 mb-4 text-gray-800">감사 로그</h1>
					<p class="mb-4">사용자 및 시스템의 활동을 모니터링 용도로 기록하는 로그입니다.</p>
					
					<div class="board-head">
	<div class="col1">
		<ion-icon name="document-outline"></ion-icon> 총 <strong id="total_cnt">0</strong>건
	</div>
	<div class="col2">
			<span>기간 </span>
				<input id="todaybirthdayF" style="width: 150px;" name="searchFrom" type="date" autocomplete="off" class="selectbox daterange searchFr"> ~
				<input id="todaybirthdayT" style="width: 150px;" name="searchTo" type="date" autocomplete="off" class="selectbox daterange searchTO">
		<div class="input-group" style="margin-top: 8px;">
			<input type="text" name="selectUserText" class="form-select form-control" placeholder="검색하실 아이디를 입력해주세요." />
			<button class="btn btn-primary" id="logSelectBtn">검색</button>	
		</div>
	</div>
</div>
					
					<div id="volist"></div>



					<!-- ========================================================================================== -->
					<!-- ========================================================================================== -->
					<!-- ========================================================================================== -->

				</div><!-- /.container-fluid -->
				
			</div>
			<!-- End of Main Content -->

			<%@ include file="/WEB-INF/views/includes/footer.jsp"%>

		</div>
		<!-- End of Content Wrapper -->

	</div>
	<!-- End of Page Wrapper -->
<script>
$(document).ready(function(){
	selectInspLogAll();
});

$("#logSelectBtn").click(function(){
	selectInspLogAll();
});

$("input[name=selectUserText]").on("keyup",function(key){         
	if(key.keyCode==13) {selectInspLogAll();}     
});

window.onload = function() {
	var today = new Date();
	//console.log("today.toISOString() >>>" + today.toISOString());
	today = today.toISOString().slice(0, 10);
	//console.log("today >>>> " + today);
	bir = document.getElementById("todaybirthdayF");
	bir2 = document.getElementById("todaybirthdayT");
	bir.value = today;
	bir2.value = today;
}


function selectInspLogAll(){
	
	var search_from = $("input[name=searchFrom]").val();
	var search_to = $("input[name=searchTo]").val();	
	
	if(search_from == null || search_from == ''){
		var today = new Date();
		today = today.toISOString().slice(0, 10);
		
		search_from = today+' 00:00:00';
		search_to = today+' 23:59:59';
	}else {
		search_from = search_from+' 00:00:00';
		search_to = search_to+' 23:59:59';
	}
	
	var searchType = $("select[name=searchType]").val();
	var searchKeyword = $("input[name=selectUserText]").val();
	
	if(search_from > search_to) {
		modalAlert('알림','검색 날짜 기간을 다시 확인해 주세요.');
	}else {
		let table = new Tabulator("#volist", {
		    pagination:true, //enable pagination
		    paginationMode:"remote", //enable remote pagination
		    sortMode: "remote",
		    ajaxURL:"/selectInspLogAll", //set url for ajax request
		    ajaxParams:{
				searchType: searchType,
				searchKeyword: searchKeyword,			
				search_from: search_from,
				search_to: search_to,
				/*searchDateType: searchDateType,
				searchStatus: searchStatus,*/
		    },	    
		    paginationSize:10, //optional parameter to request a certain number of rows per page
		    placeholder:"해당 조건에 맞는 데이터가 존재하지 않습니다.",
		    autoResize:true,
		    tooltips:false,
		    locale:true,
		    langs:{
		        "default":{
		            "pagination":{
		                "counter":{
		                    "showing": "Showing",
		                    "of": "of",
		                    "rows": "rows",
		                    "pages": "pages",
		                    "Prev": "이전",
		                }
		            },
		        }
		    },	    
		    ajaxContentType : "application/json; charset=utf-8",
		    ajaxContentType:"json",
		    ajaxResponse:function(url,prarm,response){
				$('#preLoader').fadeOut(100);
	 	    	console.log(response);
		    	// console.log(prarm);
		    	// console.log("page : "+this.getPage());
		    	// console.log("size : "+this.getSize());
		    	//$("#total_cnt b").html(response.list_cnt);
		    	//for(let i=0;i<response.data.length;i++){
		    	$("#total_cnt").html(response.list_cnt);
		    		
		    	return response; 
		    },
		    paginationInitialPage: 1,
		    layout: "fitColumns",
		    columns: [
		    	{
		    		title: "No",
		    		field: "row",
		    		headerSort:true,
		    		hozAlign: "center",
		    		width:80, 
		    		minWidth:80
		    	},
		    	{
		    		title: "menu_sn",
		    		field: "menu_sn",
		    		headerSort:true,
		    		visible: false
		    	},
		    	{
		    		title: "acs_ip",
		    		field: "acs_ip",
		    		headerSort:true,
		    		visible: false
		    	},
		    	{
		    		title: "접속시간",
		    		field: "reg_dt",
		    		headerSort:true,
		    		width:200, 
		    		minWidth:200,
		    		formatter: function(cell, formatterParams, onRendered) {
		    			return dateFormatterType2(cell.getValue());
		    		},
		    		hozAlign: "center",
		    	},
		    	{
		    		title: "아이디",
		    		field: "lgn_id",
		    		headerSort:true,
		    		width:180, 
		    		minWidth:180
		    	},
		    	{
		    		title: "lgn_nm",
		    		field: "lgn_nm",
		    		headerSort:true,
		    		visible: false
		    	},
		    	{
		    		title: "내용",
		    		field: "message",
		    		headerSort:true,
		    	},

		    ]
		    // autoColumns:true
		});		
	}
}
</script>
</body>

</html>