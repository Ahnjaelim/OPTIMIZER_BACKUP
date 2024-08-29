
$(function(){

	$("#cloud-insert-btn").click(function(){
		inputModalInit();
		$("#cloudInsertModal").modal("show");
		$("#submit-btn").click(function(){insertCloud()});
	});
	$("#search-btn").click(function(){
		selectCloudAll();
	});
	$("#search-init").click(function(){
		$("#search-keyword").val("");
		selectCloudAll();
	});
	
	$('#preLoader').fadeOut(300); 
	
})

function selectCloudAll(){
	table_resource = new Tabulator("#volist", {
	    pagination:true, //enable pagination
	    paginationMode:"remote", //enable remote pagination
	    sortMode: "remote",
	    ajaxURL:"/selectCloudAll", //set url for ajax request
	    ajaxParams:{
	    	search_type : $("#search-type").val(),
	    	search_keyword : $("#search-keyword").val(),
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
	    	$("#list-cnt").html(response.list_cnt);
	    	for(let i=0;i<response.data.length;i++){
	    		response.data[i].modify_btn = `<button class="btn btn-sm btn-outline-primary" onclick="updateCloudBtnEvent(${response.data[i].cloud_no});">수정</button>`;
	    		response.data[i].delete_btn = `<button class="btn btn-sm btn-outline-danger" onclick="deleteCloudBtnEvent(${response.data[i].cloud_no});">삭제</button>`;
	    	}
	    	return response; 
	    },
	    paginationInitialPage: 1,
	    layout: "fitColumns", 
	    columns: [
	    	{
	    		title: "No",
	    		field: "row_no",
	    		width: 80,
	    		hozAlign: "right",
	    		headerSort:false,
	    	},
	    	{
	    		title: "서비스 업체",
	    		field: "cloud_company",
	    		width: 200,
	    		hozAlign: "left",
	    		headerSort:true,
	    	},		    	
	    	{
	    		title: "요금제 이름",
	    		field: "cloud_nm",
	    		hozAlign: "left",
	    		headerSort:true,
	    		widthgrow :true,
	    	},	    	  
	    	{
	    		title: "1G당 지불 금액",
	    		field: "cloud_payment",
	    		hozAlign: "right",
	    		headerSort:true,
	    		width: 200,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return comma(cell.getValue())+"원";
	    		}	    		
	    	},	 
	    	{
	    		title: "등록인",
	    		field: "lgn_nm",
	    		hozAlign: "center",
	    		headerSort:true,
	    		width: 200,
	    	},	  	    	
	    	{
	    		title: "등록일",
	    		field: "rgstr_dt",
	    		hozAlign: "center",
	    		headerSort:true,
	    		width: 200,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return dateFormatterType2(cell.getValue());
	    		}		    		
	    	},	    	
	    	{
	    		title: "수정",
	    		field: "modify_btn",
	    		hozAlign: "center",
	    		headerSort:true,
	    		width: 80,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return cell.getValue();
	    		}	
	    	},	  	    	
	    	{
	    		title: "삭제",
	    		field: "delete_btn",
	    		hozAlign: "center",
	    		headerSort:true,
	    		width: 80,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return cell.getValue();
	    		}		    		
	    	},	  	    	
	    ]
	});	
}

function insertCloud(mode){
	let queryString = $("form[name=cloudVO]").serialize();
	let result = "";
	let url = "";
	if (typeof mode == 'undefined') {
		url = "/insertCloud";
	}else if(mode == "update"){
		console.log("업데이트 모드");
		url = "/updateCloud";
	}else{
		return;
	}
	
	if(!nullCheck(cloud_company.val())){
		cloud_company.focus();
		alertify.warning('클라우드 서비스 업체를 입력하세요.');
		return;
	}else if(!nullCheck(cloud_nm.val())){
		cloud_nm.focus();
		alertify.warning('요금제 이름을 입력하세요.');
		return;
	}else if(!nullCheck(cloud_payment.val())){
		cloud_payment.focus();
		alertify.warning('1G당 지불 금액을 입력하세요.');
		return;
	}

	$.ajax({
		type: 'POST',
		url: url,
		data:queryString,
		async: false,
		success: function(res) {
			result = res.data;
			$("#cloudInsertModal").modal("hide");
			if(result == 1){
				alertify.success('등록을 성공했습니다.');		
			}else{
				alertify.error('등록을 실패했습니다.');								
			}
			selectCloudAll();
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});

}

function updateCloudBtnEvent(cloud_no){
	inputModalInit();
	$("#modal_title").text("클라우드 수정");
	$("#submit-btn").html("수정");
	$("#submit-btn").click(function(){insertCloud("update");});
	let cloudVO = selectCloudByCloudNo(cloud_no);
	// console.log(cloudVO);
	cloud_no_input.val(cloud_no);
	cloud_company.val(cloudVO.cloud_company);
	cloud_nm.val(cloudVO.cloud_nm);
	cloud_payment.val(cloudVO.cloud_payment);
	$("#cloudInsertModal").modal("show");

}

function updateCloud(cloud_no){
	
}

function inputModalInit(){
	cloud_no_input.val("0");
	// cloud_company.val(cloud_company.find("option:first").val());
	$("#modal_title").text("클라우드 등록");
	$("#submit-btn").html("등록");
	cloud_company.val("");
	cloud_nm.val("");
	cloud_payment.val("");
	$("#submit-btn").off("click");
}

function searchEnterEvent(){
    if (event.keyCode === 13) { // Enter 키의 keyCode는 13입니다.
    	selectCloudAll();
        return false; // 폼 제출 방지
    }
    return true;	
}

function selectSiteAllByCloudNo(cloud_no){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/selectSiteAllByCloudNo',
		data:{
			cloud_no : cloud_no,
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

function deleteCloud(cloud_no){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/deleteCloud',
		data:{
			cloud_no : cloud_no,
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

function deleteCloudBtnEvent(cloud_no){
	let volist = selectSiteAllByCloudNo(cloud_no);
	if(volist.length > 0){
		 alertify.error("<div align='center'>해당 클라우드를 참조 중인 사이트가 있는 경우<br />클라우드를 삭제할 수 없습니다!</div>");
		return;
	}else{
		
		alertify.confirm('클라우드 삭제', '해당 클라우드를 삭제하시겠습니까?',
				function(){ 
			deleteCloud(cloud_no);
			selectCloudAll();
		    alertify.success('해당 클라우드를 삭제했습니다.');
			}
	    , function(){ alertify.error('사용자가 "아니오"를 선택했습니다');
	    return});
	}
	
}