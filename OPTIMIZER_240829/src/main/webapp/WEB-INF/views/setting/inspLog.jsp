<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<c:set var="mn" value="3" />
<c:set var="sn" value="4" />
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

<style>
.form-control {display: inline-block !important;}
.tabulator .tabulator-footer .tabulator-page {color: #fff;}

.tabulator-row .tabulator-cell {height: 34px !important; padding: 6px 5px 3px;} 


.board-head .col2 .input-group{width: 435px;}
.btn-warning-subtle:hover {color:#CFF250 !important;}
#search-type{width: 100px !important; text-align: center;}
.board-head .form-select, .board-head .form-control, .board-head .form-control option  {background:rgba(0,0,0,0.8);}
</style>

<body class="dashboard" data-bs-theme="dark" data-topbar="dark"
	data-sidebar="dark">
	<div id="layout-wrapper">

		<%@ include file="/WEB-INF/views/includes/topbar.jsp"%>
		<div class="layout-parent">
			<%@ include file="/WEB-INF/views/includes/sidebar.jsp"%>
			<!-- ============================================================== -->
			<!-- Start right Content here -->
			<!-- ============================================================== -->
			<div class="main-content">
				<div class="page-content">
					<div class="container-fluid">
						<!-- start page title -->
						<div class="row">
							<div class="col-12">
								<div
									class="page-title-box d-flex align-items-center justify-content-between">
									<h4 class="mb-0">감사 로그</h4>
								</div>
							</div>
						</div>
						<p class="page-desc mx-2">사용자 및 시스템의 활동을 모니터링 용도로 기록하는 로그입니다.</p>
						<!-- ========================================================================================== -->
						<!-- ========================================================================================== -->
						<!-- ========================================================================================== -->
						<div class="card card-body m-0 card-board">
							<div class="board-head">
								<div class="col1" style="font-size: 15px;">
									<ion-icon name="document-outline"></ion-icon>
									총 <strong id="total_cnt" style="color: #fcff5d; font-size: 20px;">0</strong>건
								</div>
								<div class="col2 d-flex justify-content-end">
									<span class="mx-2 mt-2" style="font-size: 12px;">기간 </span> <input
										class="form-control mx-1" type="date" id="todaybirthdayF"
										style="width: 150px;" name="searchFrom" autocomplete="off">
									~ <input class="form-control mx-1" type="date"
										id="todaybirthdayT" style="width: 150px;" name="searchTo"
										autocomplete="off">

									<div class="input-group"
										style="margin-left: 10px; width: 350px !important;">
										<input type="text" name="selectUserText" id="selectUserText"
											class="form-control form-control-sm"
											placeholder="검색하실 아이디를 입력해주세요.">
										<button class="btn btn-sm mx-2" id="logSelectBtn">
											<i class="mdi mdi-magnify me-1"></i> 검색
										</button>
										<button class="btn btn-sm" id="search-init-1">전체보기</button>
									</div>
								</div>

							</div>

							<div id="inspLogTable"></div>
						</div>

					</div>
					<!-- /.container-fluid -->

				</div>
				<!-- End of Main Content -->
			</div>
			<!-- // end page content -->
		</div>
		<%@ include file="/WEB-INF/views/includes/footer.jsp"%> 
		<!-- // end container-fluid -->
	</div>
	<!-- // End Page-content -->

	

	<script>
		$(document).ready(function() {
			selectInspLogAll();
			
			var today = new Date();
	        var yyyy = today.getFullYear();
	        var mm = String(today.getMonth() + 1).padStart(2, '0');
	        var dd = String(today.getDate()).padStart(2, '0');
	        var formattedToday = yyyy + '-' + mm + '-' + dd;
	        
	        var bir = document.getElementById("todaybirthdayF");
	        var bir2 = document.getElementById("todaybirthdayT");
	        
	        bir.value = formattedToday;
	        bir.max = formattedToday;
	        
	        bir2.value = formattedToday;
	        bir2.max = formattedToday;
		});

		$("#logSelectBtn").click(function() {
			selectInspLogAll();
		});

		$("input[name=selectUserText]").on("keyup", function(key) {
			if (key.keyCode == 13) {
				selectInspLogAll();
			}
		});
			$("#search-init-1").click(function(){
				$("#selectUserText").val("");
				selectInspLogAll();
			});
		
		document.getElementById("todaybirthdayF").addEventListener("change", function() {
		    if (new Date(this.value) > new Date()) {
		    	alertify.warning('오늘 날짜 이후로 선택할 수 없습니다.');
		        this.value = new Date().toISOString().slice(0, 10);
		    }
		});

		document.getElementById("todaybirthdayT").addEventListener("change", function() {
		    if (new Date(this.value) > new Date()) {
		    	alertify.warning('오늘 날짜 이후로 선택할 수 없습니다.');
		        this.value = new Date().toISOString().slice(0, 10);
		    }
		});
		
		function selectInspLogAll() {

			var search_from = $("input[name=searchFrom]").val();
			var search_to = $("input[name=searchTo]").val();

			if (search_from == null || search_from == '') {
				var today = new Date();
				today = today.toISOString().slice(0, 10);

				search_from = today + ' 00:00:00';
				search_to = today + ' 23:59:59';
			} else {
				search_from = search_from + ' 00:00:00';
				search_to = search_to + ' 23:59:59';
			}

			var searchType = $("select[name=searchType]").val();
			var searchKeyword = $("input[name=selectUserText]").val();

			if (search_from > search_to) {
				modalAlert('알림', '검색 날짜 기간을 다시 확인해 주세요.');
			} else {
				let table = new Tabulator("#inspLogTable", {
					selectable:false,
					pagination : true, //enable pagination
					paginationMode : "remote", //enable remote pagination
					/* sortMode : "remote", */
					ajaxURL : "/selectInspLogAll", //set url for ajax request
					ajaxParams : {
						searchType : searchType,
						searchKeyword : searchKeyword,
						search_from : search_from,
						search_to : search_to,
					/*searchDateType: searchDateType,
					searchStatus: searchStatus,*/
					},
					paginationSize : 10, //optional parameter to request a certain number of rows per page
					placeholder : "해당 조건에 맞는 데이터가 존재하지 않습니다.",
					autoResize : true,
					tooltips : false,
					locale : true,
					langs : {
						"default" : {
							"pagination" : {
								"counter" : {
									"showing" : "Showing",
									"of" : "of",
									"rows" : "rows",
									"pages" : "pages",
									"Prev" : "이전",
								}
							},
						}
					},
					ajaxContentType : "application/json; charset=utf-8",
					ajaxContentType : "json",
					ajaxResponse : function(url, prarm, response) {
						$('#preLoader').fadeOut(100);
						console.log(response);
						// console.log(prarm);
						// console.log("page : "+this.getPage());
						// console.log("size : "+this.getSize());

						$("#total_cnt").html(comma(response.list_cnt));
						 	let currentPage = this.getPage();
					        let pageSize = this.getPageSize();
					        for (let i = 0; i < response.data.length; i++) {
					            response.data[i].row_no = (currentPage - 1) * pageSize + i + 1;
					        }

						return response;
					},
					paginationInitialPage : 1,
					layout : "fitColumns",
					columns : [
							{
								title : "No",
								field : "row_no",
								headerSort : false,
								resizable:false,
								headerHozAlign: "center",
					    		hozAlign: "right",
								width : 70
							
							},
							{
								title : "menu_sn",
								field : "menu_sn",
								headerSort : true,
								visible : false
							},
							{
								title : "acs_ip",
								field : "acs_ip",
								headerSort : false,
								visible : false
							},
							{
								title : "접속시간",
								field : "reg_dt",
								headerSort : false,
								resizable:false,
								width : 300,
								minWidth : 300,
								formatter : function(cell, formatterParams,
										onRendered) {
									return dateFormatterType2(cell.getValue());
								},
								cssClass : "text-center"
							}, {
								title : "아이디",
								field : "lgn_id",
								cssClass: "text-center",
					    		hozAlign: "center",
								headerSort : false,
								resizable:false,
								width : 300,
								minWidth : 300
							}, {
								title : "lgn_nm",
								field : "lgn_nm",
								headerSort : false,
								visible : false
							}, {
								title : "내용",
								field : "message",
								headerSort : false,
								headerHozAlign: "center",
								resizable:false,
					    		hozAlign: "left"
							},

					]
					
				// autoColumns:true
				});
			}
		}

		window.onload = function() {

			$('#preLoader').fadeOut(300);
		};
	</script>
</body>

</html>