let configFnc = {};
let configTabulator = null;
const $modifyModal = $("#modify-modal");
const $alertModal = $("#alert-modal");
const $modifyBtn = $("#modify-btn");

$(function(){
	configFnc.initConfigTabulator();	
	$modifyBtn.click(function(){
		console.log("수정!");
		configFnc.updateBtnEvent();
	});
	// $("#modify-modal").modal("show");
})

configFnc.initConfigTabulator = function(){
	configTabulator = new Tabulator("#tabulator", {
	    // pagination:true, //enable pagination
		progressiveLoad:"scroll",
	    paginationMode:"remote", //enable remote pagination
	    sortMode: "remote",
	    ajaxURL:"/selectConfigAll", //set url for ajax request
	    ajaxParams:{
	    	searchType : $("#search-type").val(),
	    	searchKeyword : $("#search-keyword").val(),
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
	    	let currentPage = this.getPage();
	        let pageSize = this.getPageSize();
	    	for(let i=0;i<response.data.length;i++){
	    	}
	    	return response; 
	    },
	    paginationInitialPage: 1,
	    layout: "fitColumns",
	    columns: [
	    	{
	    		title: "No",
	    		field: "row_no",
	    		width: 100,
	    		hozAlign: "left",
	    		title: "No",
	    		field: "row_no",
	    		width: 70,
	    		headerHozAlign: "center",
	    		hozAlign: "left",
	    		resizable:false,
	    		headerSort:true
	    	},
	    	{
	    		title: "config_category",
	    		field: "config_category",
	    		hozAlign: "left",
	    		headerSort:true,
	    		widthgrow :false,
	            resizable:false,
	    	},	    	
	    	{
	    		title: "config_key",
	    		field: "config_key",
	    		hozAlign: "left",
	    		headerSort:true,
	    		widthgrow :false,
	    		resizable:false,
	    	},	    	
	    	{
	    		title: "config_value",
	    		field: "config_value",
	    		hozAlign: "left",
	    		headerSort:true,
	    		widthgrow :false,
	    		resizable:false,
	    	},	    	
	    	{
	    		title: "config_name",
	    		field: "config_name",
	    		hozAlign: "left",
	    		headerSort:true,
	    		widthgrow :false,
	    		resizable:false,
	    	},	    	
	    
	    ],
	    
	});	
	
	// 상세보기 이벤트 걸기
	configTabulator.on("cellClick", function(e, cell) {
	    if (cell.getField() === "config_value") {
	    	let rowData = cell.getRow().getData();
	    	configFnc.modifyBtnEvent(rowData);
	    }
	});		
}

configFnc.modifyBtnEvent = function(rowData){
	// const $targetModal = $("#modify-modal");
	$modifyModal.find("#config_sn").val(rowData.config_sn);
	$modifyModal.find("#config_key").val(rowData.config_key);
	$modifyModal.find("#config_value").val(rowData.config_value);
	$modifyModal.modal("show");
}

configFnc.updateBtnEvent = function(){
	const config_sn = $modifyModal.find("#config_sn").val();
	const config_key = $modifyModal.find("#config_key").val();
	const config_value = $modifyModal.find("#config_value").val();
	let data = {
		config_sn : parseInt(config_sn),	
		config_value : config_value
	}
	let result = updateConfig(data);
	$modifyModal.modal("hide");
	$alertModal.modal("show");
	configFnc.initConfigTabulator();	
	
}

function updateConfig(data){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/updateConfig',
		data: data,
		async: false,
		success: function(res) {
			result = res;
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	return result;
}