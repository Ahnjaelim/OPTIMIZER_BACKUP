$(function(){
	drawSiteTable();
	setSite_select_box(); 
	
	$("#search-btn-1").click(function(){
		userList();
	});
	$("#search-init-1").click(function(){
		$("#search-keyword-1").val("");
		userList();
	});
	
	$("#site-insert-btn").click(function(){
		inputModalInit();
		$("#exampleModal").modal("show");
		
		$("#submit-btn").click(function(){insertSite()});
	});
	$("#search-btn-2").click(function(){
		drawSiteTable();
	});
	$("#search-init-2").click(function(){
		$("#search-keyword-2").val("");
		drawSiteTable();
	});
	
	
	$("input[name='server_type']").change(function(){
		check_site_server($("input[name='server_type']:checked").val());
	});
	
	$("#side-menu li").not(".menu-title").eq(0).addClass("mm-active");
	

})


//사용자 관리
function userList(){
	table_resource = new Tabulator("#userManageTable", {
		selectable:false,
	    pagination:true, //enable pagination
	    paginationMode:"remote", //enable remote pagination
	   /* sortMode: "remote",*/
	    ajaxURL:"/userListAll", //set url for ajax request
	    ajaxParams:{
	    	searchType : $("#search-type-1").val(),
	    	searchKeyword : $("#search-keyword-1").val(),
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
	    	$("#list-cnt-1").html(response.list_cnt);
	    	
	    	let currentPage = this.getPage();
	        let pageSize = this.getPageSize();
	    	for(let i=0;i<response.data.length;i++){
	    		response.data[i].row_no = (currentPage - 1) * pageSize + i + 1;
	    	}
	    	return response; 
	    },
	    paginationInitialPage: 1,
	    layout: "fitColumns",
	    columns: [
	    	{
	    		title: "No",
	    		field: "row_no",
	    		width: 70,
	    		hozAlign: "right",
	    		headerHozAlign: "center",
	    		resizable:false,
	    		headerSort:true	
	    	},
	    	/*{
	    		title: "유형",
	    		field: "lgn_type",
	    		headerSort:true,
	    		visible: false
	    	},
	    	{
	    		title: "회사명",
	    		field: "cmp_nm",
	    		headerSort:true,
	    		visible: false
	    	},*/
	    	{
	    		title: "등록일",
	    		field: "reg_dt",
	    		width: 150,
	    		headerSort:true,
	    		resizable:false,
	    		headerSort:true,
	    		headerHozAlign: "center",
	    		hozAlign: "center",
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return dateFormatterType2(cell.getValue());
	    		},
	    	},
	    	{
	    		title: "아이디",
	    		field: "lgn_id",
	    		resizable:false,
	    		headerSort:true,
	    		headerHozAlign: "center",
	    		hozAlign: "center"
	    	},
	    	{
	    		title: "이름",
	    		field: "lgn_nm",
	    		headerSort:true,
	    		headerHozAlign: "center",
	    		hozAlign: "center",
	    		resizable:false
	    	},
	    	{
	    		title: "등록자",
	    		field: "rgtr_id",
	    		headerSort:true,
	    		headerHozAlign: "center",
	    		hozAlign: "center",
	    		resizable:false
	    	},
	    	
	    	{ 
	    		title: "수정",
	    		field: "modify_btn",
	    		hozAlign: "center",
	    		width:50, 
	    		minWidth:80, 
	    		cssClass: "text-center", 
	    		resizable:false, 
	    		headerSort:false,
	    		formatter:function(cell, formatterParams){
	    	        return "<button class='btn px-2 py-1' style='font-size:12px; background-color:transparent; border:1px solid white; color:white;'>수정</button>";
	    	    },
	    		
	    	    cellClick:function(e, cell){
	    	    	var rowData = cell.getRow().getData();
	    	        var lgnId = rowData.lgn_id; // lgn_id 값을 가져옴
	    	        var lgnNm = rowData.lgn_nm; // lgn_nm 값을 가져옴
	    	        var lgnType = rowData.lgn_type; // lgn_nm 값을 가져옴
	    	        var cmpNm = rowData.cmp_nm; // lgn_nm 값을 가져옴
	    	        
	    	        if($("#login_type_top").val() >= 1 && lgnId != $("#login_id_top").val()) {
	    	        	alertify.warning('다른 사용자의 정보를 수정하실 수 없습니다.');
	    	        }else {
		    	        
		    	        $("input[name=lgn_id_up]").val(lgnId);
		    	        $("input[name=lgn_nm_up]").val(lgnNm);
		    	        $("select[name=lgn_type_up]").val(lgnType);
		    	        $("input[name=cmp_nm_up]").val(cmpNm);
		    	        $("input[name=lgn_pswd_up]").val('');
		    	        $("input[name=lgn_pswdCheck_up]").val('');
		    	        
		    	        $('#userUpdatetModal').modal('show');
	    	        }
	    	    }
	    	},
	    	{ 
	    		title: "삭제",
	    		field: "delete_btn",
	    		headerSort:false,
	    		width:50, 
	    		minWidth:80, 
	    		cssClass: "text-center", 
	    		resizable:false, 
	    		headerSort:false,
	    		formatter:function(cell, formatterParams){
	    	        return "<button class='btn' style='background-color:#F34E4E; color:white;'><i class='uil uil-ban mr-2' style='font-style: normal;'></i>삭제</button>";
	    	    },
	    	    cellClick:function(e, cell){
	    	    	var rowData = cell.getRow().getData();
	    	        var lgnId = rowData.lgn_id; // lgn_id 값을 가져옴
	    	        var lgnNm = rowData.lgn_nm; // lgn_nm 값을 가져옴
	    	        var lgnType = rowData.lgn_type; // lgn_type 값을 가져옴
	    	        var cmpNm = rowData.cmp_nm; // cmp_nm 값을 가져옴
	    	        
	    	        if($("#login_type_top").val() >= 1 && lgnId != $("#login_id_top").val()) {
	    	        	alertify.warning('다른 사용자를 삭제 하실 수 없습니다.');
	    	        }else {
	    	        	 Swal.fire({
	    	                 icon: 'warning',
	    	                 /*title: '사용자 삭제',*/
	    	                 text: '해당 사용자를 삭제하시겠습니까?',
	    	                 showCancelButton: true,
	    	                 confirmButtonColor: '#51d28c',
	    	                 cancelButtonColor: '#f34e4e',
	    	                 confirmButtonText: '삭제',
	    	                 cancelButtonText: '취소',
	    	                 customClass: {
	    	                     popup: 'custom-swal-popup',
	    	                     title: 'custom-swal-title',
	    	                     text: 'custom-swal-text',
	    	                 },
	    	                 showClass: {
	    	                     popup: 'animate__animated animate__fadeIn animate__faster',
	    	                 },
	    	                 hideClass: {
	    	                     popup: 'animate__animated animate__fadeOut animate__faster',
	    	                 },
	    	             }).then((result) => {
	    	            	 if (result.isConfirmed) {
	    	            		 deletedUser(lgnId);
	    	            		 alertify.success('해당 사용자를 삭제했습니다.');
	    	                 }
	    	             });
	    	        }
	    	        
	    	        
//	    	        if (!confirm("관리자를 삭제 하시겠습니까?", `deletedUser("`+lgnId+`")"`)) {
//	    	            //alert("취소(아니오)를 누르셨습니다.");
//	    	        } else {
//	    	            //alert("확인(예)을 누르셨습니다.");
//	    	            ;
//	    	        }
	    	    }
	    	},

	    ]
	});	
}



//사이트 관리
function drawSiteTable(){
	
	table_resource = new Tabulator("#siteManageTable", {
		selectable:false,
	    pagination:true, //enable pagination
	    paginationMode:"remote", //enable remote pagination
	    /*sortMode: "remote",*/
	    ajaxURL:"/selectSiteAll", //set url for ajax request
	    ajaxParams:{
	    	/*
	    	resource_parent_no : resource_parent_no,
	    	resource_status : resource_status,
	    	search_range : search_range,
	    	search_keyword : search_keyword,
	    	search_disable : search_disable,
	    	*/
	    	searchKeyword : $('#search-keyword-2').val(),
	    	searchType : $('#search-type-2').val(),
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
	                    "Prev": "이전"
	                }
	            },
	        }
	    },	    
	    ajaxContentType : "application/json; charset=utf-8",
	    ajaxContentType:"json",
	    ajaxResponse:function(url,prarm,response){
	  
	    	$("#list-cnt-2").html(response.list_cnt);
	    	
	    	let currentPage = this.getPage();
	        let pageSize = this.getPageSize();
	    	for(let i=0;i<response.data.length;i++){
	    		response.data[i].sshInfo_btn = `<button class="btn btn-sm btn-outline-primary" onclick="sshInfoBtnEvent(${response.data[i].site_no},${response.data[i].cloud_no},'${response.data[i].site_name}');">확인</button>`;
	    		response.data[i].detail_btn = `<button class="btn btn-warning-subtle btn-rounded px-2 py-1" style="font-size:12px; color:#CFF250;" onclick="detailSiteBtnEvent(${response.data[i].site_no});"><i class="uil uil-info-circle mr-2" style="color:#CFF250; font-style: normal; margin-right:2px;"></i>상세보기</button>`;
	    		response.data[i].modify_btn = `<button class="btn px-2 py-1" style="font-size:12px; background-color:transparent; border:1px solid white; color:white;" onclick="updateSiteBtnEvent(${response.data[i].site_no});">수정</button>`;
	    		response.data[i].delete_btn = `<button class='btn' style='background-color:#F34E4E; color:white;' onclick="deleteSiteBtnEvent(${response.data[i].site_no});"><i class='uil uil-ban mr-2' style='font-style: normal;'></i>삭제</button>`;
	    		response.data[i].optimize_btn = `<button type="button" class="btn" style="background-color:#8E5FB7; color:white;" onclick="optimizeSiteBtnEvent(${response.data[i].site_no});">최적화</button>`;
	    		response.data[i].row_no = (currentPage - 1) * pageSize + i + 1;
	    	}
	    	return response; 
	    },
	    paginationInitialPage: 1,
	    layout: "fitColumns", 
	    columns: [
	    	{
	    		title: "No",
	    		field: "row_no",
	    		width: 70,
	    		headerHozAlign: "center",
	    		hozAlign: "right",
	    		resizable:false,
	    		headerSort:true
	    		
	    	},
	    	{
	    		title: "사이트 명",
	    		field: "site_name",
	    		width: 200,
	    		resizable:false,
	    		headerSort:true,
	    		headerHozAlign: "center",
	    		hozAlign: "left"
	    	},
	    	{
	    		title: "사이트 주소",
	    		field: "site_address",
	    		resizable:false,
	    		headerSort:true,
	    		width: 245,
	    		headerHozAlign: "center",
	    		hozAlign: "left"

	    	},
	    	/*{
	    		title: "담당자",
	    		field: "site_manager",
	    		hozAlign: "center",
	    		headerSort:true,
	    		widthgrow :200,
	    	},	    	
	    	{
	    		title: "서비스 업체",
	    		field: "cloud_company",
	    		hozAlign: "left",
	    		headerSort:true,
	    		widthgrow :200,
	    	},*/
	    	/*{
	    		title: "서버 정보",
	    		field: "sshInfo_btn",
	    		hozAlign: "center",
	    		headerSort:false,
	    		width: 100,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return cell.getValue();
	    		}	
	    	},*/
	    	{
	    		title: "상세보기",
	    		field: "detail_btn",
	    		cssClass: "text-center",
	    		hozAlign: "center",
	    		width:50, 
	    		resizable:false,
	    		headerSort:false,
	    		visible : false,
	   
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return cell.getValue();
	    		}	
	    	},
	    	{
	    		title: "수정",
	    		field: "modify_btn",
	    		width:50, 
	    		minWidth:80,
	    		cssClass: "text-center",
	    		hozAlign: "center",
	    		resizable:false,
	    		headerSort:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return cell.getValue();
	    		}	
	    	},
	    	{
	    		title: "삭제",
	    		field: "delete_btn",
	    		width:50, 
	    		minWidth:80,
	    		cssClass: "text-center",
	    		hozAlign: "center",
	    		resizable:false,
	    		headerSort:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return cell.getValue();
	    		}	
	    	},
	    	{
	    		title: "최적화",
	    		field: "optimize_btn",
	    		width:50, 
	    		minWidth:80,
	    		cssClass: "text-center",
	    		hozAlign: "center",
	    		resizable:false,
	    		headerSort:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return cell.getValue();
	    		}	
	    	},

	    ]
	});	
}







function check_site_server(type) {
	// 스토리지 선택시
	if(type == '1'){
		$('#ssh_id_box').css("display","none");
		$('#ssh_pw_box').css("display","none");
		$('#ssh_port_box').css("display","none");
		$('#ssh_server_ip_box').css("display","none");
		$('#resource_path_box').css("display","none");
		$('#access_key_box').css("display","");
		$('#secert_key_box').css("display","");
		$('#bucket_name_box').css("display","");
	}	
	// 리눅스, 윈도우 선택 시.
	else if(type == '4' || type == '5'){
		$('#ssh_id_box').css("display","");
		$('#ssh_pw_box').css("display","");
		$('#ssh_port_box').css("display","");
		$('#ssh_server_ip_box').css("display","");
		$('#resource_path_box').css("display","");
		$('#access_key_box').css("display","none");
		$('#secert_key_box').css("display","none");
		$('#bucket_name_box').css("display","none");
	}
}


function inputModalInit(){
	$("#modal_title3").text("사이트 등록");
	site_select.val(site_select.find("option:first").val());
	site_nm.val("");
	site_address.val("");

	
	$("input[name=ssh_id]").val("");
	$("input[name=ssh_pw]").val("");
	$("input[name=ssh_port]").val("");
	$("input[name=ssh_server_ip]").val("");
	$("input[name=resource_path]").val("");
	$("input[name=access_key]").val("");
	$("input[name=secert_key]").val("");
	$("input[name=bucket_name]").val("");
	$('input:radio[name="server_type"]:input[value="1"]').prop('checked',true);
	
	/*// 스토리지 선택시
	if($("input[name='server_type']:checked").val() == '1'){
		$('#ssh_id_box').css("display","none");
		$('#ssh_pw_box').css("display","none");
		$('#ssh_port_box').css("display","none");
		$('#ssh_server_ip_box').css("display","none");
		$('#resource_path_box').css("display","none");
		$('#access_key_box').css("display","");
		$('#secert_key_box').css("display","");
		$('#bucket_name_box').css("display","");
	}	
	// 리눅스, 윈도우 선택 시.
	else if($("input[name='server_type']:checked").val() == '4' || $("input[name='server_type']:checked").val() == '5'){
		$('#ssh_id_box').css("display","");
		$('#ssh_pw_box').css("display","");
		$('#ssh_port_box').css("display","");
		$('#ssh_server_ip_box').css("display","");
		$('#resource_path_box').css("display","");
		$('#access_key_box').css("display","none");
		$('#secert_key_box').css("display","none");
		$('#bucket_name_box').css("display","none");
	}*/
	check_site_server($("input[name='server_type']:checked").val());
	
	$("#submit-btn").html("등록");
	$("#submit-btn").off("click");
}



function searchEnterEvent(){
    if (event.keyCode === 13) { // Enter 키의 keyCode는 13입니다.
    	drawSiteTable();
        return false; // 폼 제출 방지
    }
    return true;	
}



function insertSite(mode){
	let cloud_no = $("#site_select").val();
	let site_nm = $("#site_nm").val();
	let site_address = $("#site_address").val();
	let site_manager = $("#site_manager").val();
	let site_no ="";
	
	
	
	
	let result = "";
	let url = "";
	let url2 = "";
	if (typeof mode == 'undefined') {
		url = "/insertSite";
		url2 = "/insertSsh";
	}else if(mode == "update"){
		
		url = "/updateSite";
		url2 = "/updateSsh";
	}else{
		return;
	}
	
	if(!nullCheck(cloud_no)){
		$("select[name=site_select]").focus();
		alertify.warning('서비스 업체를 선택하세요.');
		return;
	}else if(!nullCheck(site_nm)){
		$("input[name=site_nm]").focus();
		alertify.warning('사이트 이름을 입력하세요.');
		return;
	}else if(!nullCheck(site_address)){
		$("input[name=site_address]").focus();
		alertify.warning('사이트 주소를 입력하세요');
		return;
	}else if(checkDuplicate(site_nm,"site_name").length>0){
		$("input[name=site_nm]").focus();
		alertify.warning('이미 존재하는 사이트 이름입니다.');
		return;
	}else if(checkDuplicate(site_address,"site_address").length>0){
		$("input[name=site_address]").focus();
		alertify.warning('이미 존재하는 사이트 주소입니다.');
		return;
	}else if(!site_address.match(urlReg)){
		$("input[name=site_address]").focus();
		alertify.warning('사이트 주소는 https:// 또는 http:// 로 시작해야합니다.');
		return;
	}
	
	if($("input[name='server_type']:checked").val() == '1'){
		if(!nullCheck($("input[name=access_key]").val())) {
			$("input[name=access_key]").focus();
			alertify.warning('ACCESS KEY 등록을 입력하세요');
			return;
		}else if(!nullCheck($("input[name=secert_key]").val())) {
			$("input[name=secert_key]").focus();
			alertify.warning('SECRET KEY 등록을 입력하세요');
			return;
		}else if(!nullCheck($("input[name=bucket_name]").val())) {
			$("input[name=bucket_name]").focus();
			alertify.warning('버킷 명 등록을 입력하세요');
			return;
		}
	}else {
		if(!nullCheck($("input[name=ssh_id]").val())) {
			$("input[name=ssh_id]").focus();
			alertify.warning('아이디를 입력하세요');
			return;
		}else if(!nullCheck($("input[name=ssh_pw]").val())) {
			$("input[name=ssh_pw]").focus();
			alertify.warning('비밀번호를 입력하세요');
			return;
		}else if(!nullCheck($("input[name=ssh_port]").val())) {
			$("input[name=ssh_port]").focus();
			alertify.warning('PORT 번호를 입력하세요');
			return;
		}else if(!nullCheck($("input[name=ssh_server_ip]").val())) {
			$("input[name=ssh_server_ip]").focus();
			alertify.warning('서버 IP 주소를 입력하세요');
			return;
		}else if(!nullCheck($("input[name=resource_path]").val())) {
			$("input[name=resource_path]").focus();
			alertify.warning('웹 컨텐츠 경로를 입력하세요');
			return;
		}
	}

	$.ajax({
		type: 'POST',
		url: url,
		data:({
			cloud_no:cloud_no,
			site_name:site_nm,
			site_address:site_address,
			site_manager:site_manager,
			site_no :updateSite_no
		}),
		async: false,
		success: function(res) {
			
			
			$("#exampleModal").modal("hide");
			if(res == 1){
				//modalAlert("알림","등록을 완료했습니다.");
				alertify.success('사이트 수정이 완료되었습니다.');	
				insertSsh(url2);
				drawSiteTable(); 
			}else{
				alertify.error('사이트 수정에 실패하였습니다.');						
			}
			
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});

}

let urlReg = /^(https?:\/\/)/;

function sshInfoBtnEvent(site_no, cloud_no, site_name){
	$.ajax({
		type: 'POST',
		url: `/selectSshOne`,
		data: ({site_no:site_no}),
		success: function(res) {	
			check_site_server(res.data.server_type);
			
			/*// 스토리지 선택시
			if(res.data.server_type == '1'){
				$('#ssh_id_box').css("display","none");
				$('#ssh_pw_box').css("display","none");
				$('#ssh_port_box').css("display","none");
				$('#ssh_server_ip_box').css("display","none");
				$('#resource_path_box').css("display","none");
				$('#access_key_box').css("display","");
				$('#secert_key_box').css("display","");
				$('#bucket_name_box').css("display","");
			}	
			// 리눅스, 윈도우 선택 시.
			else if(res.data.server_type == '4' || res.data.server_type == '5'){
				$('#ssh_id_box').css("display","");
				$('#ssh_pw_box').css("display","");
				$('#ssh_port_box').css("display","");
				$('#ssh_server_ip_box').css("display","");
				$('#resource_path_box').css("display","");
				$('#access_key_box').css("display","none");
				$('#secert_key_box').css("display","none");
				$('#bucket_name_box').css("display","none");
			}*/
			
			if(res.data == "F") {
				$("input[name=ssh_id]").val("");
				$("input[name=ssh_pw]").val("");
				$("input[name=ssh_port]").val("");
				$("input[name=ssh_server_ip]").val("");
				$("input[name=resource_path]").val("");
				$("input[name=site_nm_ssh]").val(site_name);
				$("select[name=server_type]").val(cloud_no).prop("selected", true);
				//$("#sshInsertModal").modal("show");
			}else {

				$("input[name=ssh_id]").val(res.data.ssh_id);
				$("input[name=ssh_pw]").val(res.data.ssh_pw);
				$("input[name=ssh_port]").val(res.data.ssh_port);
				$("input[name=ssh_server_ip]").val(res.data.ssh_server_ip);
				$("input[name=resource_path]").val(res.data.resource_path);
				$("input[name=site_nm_ssh]").val(site_name);
				$("select[name=server_type]").val(cloud_no).prop("selected", true);
				$('input:radio[name="server_type"]:input[value="'+res.data.server_type+'"]').prop('checked',true);
				$("input[name=access_key]").val(res.data.access_key);
				$("input[name=secert_key]").val(res.data.secert_key);
				$("input[name=bucket_name]").val(res.data.bucket_name);
				//$("#sshUpdateModal").modal("show");
			}
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
}

function updateSiteBtnEvent(site_no){
	inputModalInit();
	$("#modal_title3").text("사이트 수정");
	$("#submit-btn").html("수정");
	$("#submit-btn").click(function(){insertSite("update");});
	
	let data = selectSiteBySiteNo(site_no)[0];
	updateSite_no = site_no;
	
	var selectBox = document.getElementById('site_select');

    // 숫자가 셀렉트박스에 존재하는지 확인하고 선택하기
    for (var i = 0; i < selectBox.options.length; i++) {
        if (selectBox.options[i].value === data.cloud_no) {
            selectBox.selectedIndex = i;
            break;
        }
    }

    
    site_select.val(data.cloud_no);
    site_nm.val(data.site_name);
    site_address.val(data.site_address);
    sshInfoBtnEvent(site_no, data.cloud_no, data.site_name);
//	cloud_payment.val(cloudVO.cloud_payment);
    
    
//	$("#site_nm").val(site_nm);
//	$("#site_address").val(site_address);
	
	$("#exampleModal").modal("show");

}

function detailSiteBtnEvent(site_no) {
	let data = selectSiteBySiteNo(site_no)[0];
	
	$("#site_nm_detail").val(data.site_name);
	$("#site_address_detail").val(data.site_address);
	
	$.ajax({
		type: 'POST',
		url: `/selectSshOne`,
		data: ({site_no:site_no}),
		async : false,
		success: function(res) {			
			serverTypeCheck(res.data.server_type);
			if(res.data.server_type == 1) {
				$("#server_type_detail").val("스토리지");
			}else if(res.data.server_type == 4) {
				$("#server_type_detail").val("리눅스");
			}else if(res.data.server_type == 5) {
				$("#server_type_detail").val("윈도우");
			}
			$("input[name=ssh_access_key_detail]").val(res.data.access_key);
			$("input[name=ssh_secret_key_detail]").val(res.data.secert_key);
			$("input[name=ssh_bucket_name]").val(res.data.bucket_name);
			
			$("input[name=ssh_id_detail]").val(res.data.ssh_id);
			$("input[name=ssh_pw_detail]").val(res.data.ssh_pw);
			$("input[name=ssh_port_detail]").val(res.data.ssh_port);
			$("input[name=ssh_server_ip_detail]").val(res.data.ssh_server_ip);
			$("input[name=resource_path_detail]").val(res.data.resource_path);
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	
	$("#detailModal").modal("show");
	
}


function serverTypeCheck(server_type){
	$("#ssh_server_ip_box_detail").show();
	$("#ssh_id_box_detail").show();
	$("#ssh_pw_box_detail").show();	
	$("#resource_path_box_detail").show();
	$("#ssh_access_key_detail").show();
	$("#ssh_secret_key_detail").show();
	$("#ssh_bucket_name").show();
	
	switch (server_type) {
	case 1:
		
		$("#ssh_server_ip_box_detail").hide();
		$("#ssh_id_box_detail").hide();
		$("#ssh_pw_box_detail").hide();	
		$("#resource_path_box_detail").hide();
		break;
	case 4:
		
		$("#ssh_access_key_detail").hide();
		$("#ssh_secret_key_detail").hide();
		$("#ssh_bucket_name").hide();
		break;
	case 5:
		
		$("#ssh_access_key_detail").hide();
		$("#ssh_secret_key_detail").hide();
		$("#ssh_bucket_name").hide();
	break;
	
	default:

		$("#ssh_server_ip_box_detail").hide();
		$("#ssh_id_box_detail").hide();
		$("#ssh_pw_box_detail").hide();	
		$("#resource_path_box_detail").hide();

		$("#ssh_access_key_detail").hide();
		$("#ssh_secret_key_detail").hide();
		$("#ssh_bucket_name").hide();
		break;
	}
	
	
}

function deleteSite(site_no){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/deleteSite',
		data:{
			site_no : site_no,
		},
		async: false,
		success: function(res) {
			result = res.data;
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	return result;
}

function deleteSiteBtnEvent(site_no){
	Swal.fire({
        icon: 'warning',
        /*title: '사용자 삭제',*/
        text: '해당 사이트를 삭제하시겠습니까?',
        showCancelButton: true,
        confirmButtonColor: '#51d28c',
        cancelButtonColor: '#f34e4e',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            text: 'custom-swal-text',
        },
        showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster',
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOut animate__faster',
        },
    }).then((result) => {
   	 if (result.isConfirmed) {
   		deleteSite(site_no);
		reloadSiteSelect();
		drawSiteTable(); 
   		 alertify.success('해당 사이트를 삭제했습니다.');
        }
    });
}


function checkDuplicate(input,type){	
	if(type==="site_name"){
		$.ajax({
			type: 'POST',
			url: '/duplicateSite',
			data:{
				site_name : input,
				site_no : updateSite_no
			},
			async: false,
			success: function(res) {
				
				result = res.data;
				
			},
		    error: function onError (error) {
		        console.error(error);
		    }
		});
		return result;
	}
	$.ajax({
		type: 'POST',
		url: '/duplicateSite',
		data:{
			site_address : input,
			site_no :updateSite_no
		},
		async: false,
		success: function(res) {
			
			result = res.data;
			
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	return result;
	
}


function selectSiteBySiteNo(site_no){
	$.ajax({
		type: 'POST',
		url: '/selectSiteBySiteNo',
		data:{
			site_no : parseInt(site_no),
		},
		async: false,
		success: function(res) {
			
			result = res.data;
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	return result;
}

function optimizeSiteBtnEvent(site_no){
	
	var site_no = [site_no.toString()];
	let data = selectSiteBySiteNo(site_no)[0];
	
	Swal.fire({
        icon: 'warning',
        /*title: '사용자 삭제',*/
        text: data.site_name + '의  최적화 관리페이지로 이동하시겠습니까?',
        showCancelButton: true,
        confirmButtonColor: '#51d28c',
        cancelButtonColor: '#f34e4e',
        confirmButtonText: '이동',
        cancelButtonText: '취소',
        customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            text: 'custom-swal-text',
        },
        showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster',
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOut animate__faster',
        },
    }).then((result) => {
   	 if (result.isConfirmed) {
   		deleteSite(site_no);
		reloadSiteSelect();
		drawSiteTable(); 
		alertify.success(data.site_name+"의 최적화 관리페이지로 이동합니다.");
		location.href='/optimizerByContent'
		setTimeout(moveOptPage(site_no), 2000);
        }
    });
}

function moveOptPage(site_no){
	$.ajax({
	    url: 'setSession', // Replace with your actual endpoint URL
	    type: 'post',
	    dataType: 'json',
	    contentType: 'application/json',
	    data:JSON.stringify({ selectedValues: site_no })
	    ,
	    success: function(data) {
	    	
	    },
	    error: function(xhr, status, error) {
	        console.error('Error fetching data:', error);
	    }
	});
}





function reloadSiteSelect(){
	$('#site-no').SumoSelect({
		 csvDispCount: 3,
		    captionFormat:'{0} 개 선택', 
		    captionFormatAllSelected:'{0} 개 모두 선택',
	    selectAll:true,
		locale :  ['확인', '취소', '전체'],
	});
	$(".site-select").animate({"opacity":"1.0"}, 150);
	// AJAX request to get data
	$.ajax({
	    url: 'selectTopbarSiteList', // Replace with your actual endpoint URL
	    type: 'post',
	    dataType: 'json',
       async: false,
	    success: function(data) {
	    	sessionSiteList = data.sessionSiteList;
	    	data = data.data;
	    	
	    	
	    	if(sessionSiteList && sessionSiteList.length >0){
	    		MySelect = $('#site-no').SumoSelect();
	    		$.each(data, function(index, item) {
	    			$('#site-no')[0].sumo.add(item.site_no,item.site_name);
					
					if (sessionSiteList.includes(item.site_no.toString())) {
					    // 배열에 해당 인덱스가 존재하는 경우
					 
					    // 실행할 코드 작성
					     $('#site-no')[0].sumo.selectItem(item.site_no.toString());
					    
					}else{
					}
		    	
		    	});
	    	}else{
	    		$.each(data, function(index, item) {
	    			$('#site-no')[0].sumo.add(item.site_no,item.site_name);
		    	    if (index === 0 && $('#site-no').find(':selected').length === 0) {
		    	    	$('#site-no')[0].sumo.selectItem(item.site_no.toString());
				    }
		    	});
	    		getSelectedValues(); //세션세팅
	    	}
	    	
	    	
	        
	    	  
	        // SumoSelect를 다시 로드
	        $('#site-no')[0].sumo.reload();

	    },
	    error: function(xhr, status, error) {
	        console.error('Error fetching data:', error);
	    }
	});
	
	$('#site-confirm-btn').click(function() {
		
		getSelectedValues();
		location.reload();
	})
	

	
}

function setSite_select_box(){
	$.ajax({
        url: 'selectCloud', 
        method: 'post',
        dataType: 'json',
        data:{
        	search_type : null,
	    	search_keyword : null
        },
        success: function (data) {
        	data=data.volist;
        	
        	
            // 성공적으로 데이터를 받아왔을 때 실행되는 부분
            // 셀렉트 박스 초기화
            $('#site_select').empty();
            // '사이트 전체' 옵션 추가
            //$('#site_select').append('<option value="0" selected="selected">페이지 전체</option>');
            // 받아온 데이터를 셀렉트 박스에 추가
            for (var i = 0; i < data.length; i++) {
            	$('#site_select').append('<option value="' + data[i].cloud_no + '">' + data[i].cloud_nm + '</option>');
                
			}
                
        },
        error: function (error) {
            // 에러 처리
            console.error('Error fetching site data:', error);
        }
    });	
}