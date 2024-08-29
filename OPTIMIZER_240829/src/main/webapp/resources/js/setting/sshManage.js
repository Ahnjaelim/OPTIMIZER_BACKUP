$(function() {

	
	//selectSshAll();
	$('#preLoader').fadeOut(300);

	$("#sshInsertBtn").click(function() {
		$("#sshInsertModal").modal("show");
	});

});

function selectSshAll() {
	table_resource = new Tabulator(
			"#sshManageTable",
			{
				pagination : true, // enable pagination
				paginationMode : "remote", // enable remote pagination
				sortMode : "remote",
				ajaxURL : "/selectSshAll", // set url for ajax request
				ajaxParams : {
				// search_type : $("#search-type").val(),
				// search_keyword : $("#search-keyword").val(),.
				},
				paginationSize : 10, // optional parameter to request a
										// certain number of rows per page
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
					$("#list-cnt").html(response.list_cnt);
					for (let i = 0; i < response.data.length; i++) {
						response.data[i].modify_btn = `<button class="btn btn-sm btn-outline-primary" onclick="updateCloudBtnEvent(${response.data[i].cloud_no});">수정</button>`;
						response.data[i].delete_btn = `<button class="btn btn-sm btn-outline-danger" onclick="deleteCloudBtnEvent(${response.data[i].cloud_no});">삭제</button>`;
					}
					return response;
				},
				paginationInitialPage : 1,
				layout : "fitColumns",
				columns : [ {
					title : "No",
					field : "row_no",
					width : 80,
					cssClass : "text-start",
					headerSort : false,
				}, {
					title : "아이디",
					field : "ssh_id",
					width : 150,
					cssClass : "text-center",
					headerSort : false,
				}, {
					title : "비밀번호",
					field : "ssh_pw",
					width : 150,
					cssClass : "text-center",
					headerSort : false,
				}, {
					title : "PORT 번호",
					field : "ssh_port",
					width : 150,
					cssClass : "text-center",
					headerSort : false,
				}, {
					title : "서버 IP 주소",
					field : "ssh_server_ip",
					width : 150,
					hozAlign : "left",
					headerSort : false,
				}, {
					title : "웹 컨텐츠 경로",
					field : "resource_path",
					widthGrow : true,
					hozAlign : "left",
					headerSort : false,
				}, {
					title : "클라우드 번호",
					field : "cloud_no",
					width : 150,
					cssClass : "text-center",
					headerSort : false,
				}, {
					title : "사이트 번호",
					field : "site_no",
					width : 150,
					cssClass : "text-center",
					headerSort : false,
				}, {
					title : "서버 유형",
					field : "server_type",
					width : 150,
					cssClass : "text-center",
					headerSort : false,
				}, {
					title : "수정",
					field : "modify_btn",
					hozAlign : "center",
					headerSort : true,
					width : 80,
					formatter : function(cell, formatterParams, onRendered) {
						return cell.getValue();
					},
					visible : false,
				}, {
					title : "삭제",
					field : "delete_btn",
					hozAlign : "center",
					headerSort : true,
					width : 80,
					formatter : function(cell, formatterParams, onRendered) {
						return cell.getValue();
					},
					visible : false,
				}, ]
			});
}

function insertSsh(urlType) {
	let queryString = $("form[name=sshVO]").serialize();
	// let server_type = $("select[name=server_type]").val();

	let cloud_no = $("#site_select").val();
	let site_nm_ssh = $("#site_nm").val();
	let ssh_id = $("input[name=ssh_id]").val();
	let ssh_pw = $("input[name=ssh_pw]").val();
	let ssh_port = $("input[name=ssh_port]").val();
	let ssh_server_ip = $("input[name=ssh_server_ip]").val();
	let resource_path = $("input[name=resource_path]").val();
	let server_type = $("input[name='server_type']:checked").val();
	let access_key = $("input[name=access_key]").val();
	let secert_key = $("input[name=secert_key]").val();
	let bucket_name = $("input[name=bucket_name]").val();

	if (!ssh_port) {
		ssh_port = 0;
	}

//	if (server_type == '1') {
//		server_type = cloud_no
//	}
	let result = "";

	$.ajax({
		type : 'POST',
		url : urlType,
		data : ({
			cloud_no : cloud_no,
			site_nm_ssh : site_nm_ssh,
			ssh_id : ssh_id,
			ssh_pw : ssh_pw,
			ssh_port : ssh_port,
			ssh_server_ip : ssh_server_ip,
			resource_path : resource_path,
			server_type : server_type,
			access_key : access_key,
			secert_key : secert_key,
			bucket_name : bucket_name,
		}),
		async : false,
		success : function(res) {
			result = res.data;
			if (result == 1) {
				modalAlert("알림", "등록을 완료했습니다.");
				reloadSiteSelect();
				drawSiteTable();
			} else {
				modalAlert("알림", "등록을 실패했습니다.");
			}
			//selectSshAll();
		},
		error : function onError(error) {
			console.error(error);
		}
	});
}