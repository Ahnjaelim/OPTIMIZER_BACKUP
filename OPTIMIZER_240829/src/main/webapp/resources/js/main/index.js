var current_resource_type = 0;
var current_resource_status = 1;
var interval = null;
var scrollTop = 0;
var selectedRows = null;
var footer_btn_exist = false;

$(function(){
	$("#resource-status-tabmenu li").each(function(){
		$(this).click(function(){
			$("#resource-status-tabmenu li").removeClass("active");
			$(this).addClass("active");
			current_resource_status = $(this).attr("data-resource-status");
			selectResourceAllByResourceType(current_resource_type);
		});
	});	
});

function fetchData() {
    // 비동기 작업 수행
    return new Promise(resolve => {
        setTimeout(() => {
            const data = selectResourceAllByResourceTypeAjax();
            resolve(data);
        }, 1000); // 1초 딜레이 예제
    });
}


function viewResourceList(resource_type){
	let title = "";
	switch (resource_type){
		case 1 : title = "이미지 웹 컨텐츠 목록"; break;
		case 2 : title = "동영상 웹 컨텐츠 목록"; break;
		case 3 : title = "텍스트 웹 컨텐츠 목록"; break;
		case 4 : title = "폰트 웹 컨텐츠 목록"; break;
	}
	
	// 테이블 생성
	selectResourceAllByResourceType(resource_type);
	
	// 데이터 로드 (테이블 무한 로딩 방지)
	fetchData().then(data => {
	    // 데이터를 테이블에 설정하고 다시 그리기
	    table.setData(data);
	    // 또는 table.redraw(); 사용 가능
	});	
	
	$("#resourceListModal .modal-title").html(title);
	$("#resourceListModal").modal("show");
	$("#resource-status-tabmenu li").eq(0).click();
	
	// 데이터 카운트
	countResourceAllByResourceType();
	interval = setInterval(function(){
		countResourceAllByResourceType();
		
		
		let updateData = selectResourceAllByResourceTypeAjax();
		
		// 스크롤 위치 저장
		scrollTop = $("#resourceListModal").scrollTop();

		// 체크박스 저장
		selectedRows = table.getSelectedData();
		console.log(selectedRows);
		table.setData(updateData).then(function(){
			$("#resourceListModal").scrollTop(scrollTop);
			let rows = table.getRows();
			for(let i = 0; i < selectedRows.length; i++){
				let targetRow = rows.find(row => row.getData().resource_no === selectedRows[i].resource_no);
				if(targetRow) {
					console.log("해당 행을 찾았습니다.");
					table.selectRow(targetRow);
				}else{
					console.log("해당 행을 찾는데 실패했습니다.");
				}
			}
		});
		
		
		/*
		fetchData().then(updateData => {
			for(let i = 0; i < updateData.length; i++){
				let tableRows = table.getRows();
				let targetRows = tableRows.filter(function(row) {
				    return row.getData().resource_no === updateData[i].resource_no; // yourValue에는 원하는 값을 입력하세요
				});
				if (targetRows.length > 0) {
					let targetRow = targetRows[0];
					let currentData = targetRow.getData();
			        let updatedData = Object.assign({}, updateData[i]);
			        updatedData.row_no = currentData.row_no; // row_no 컬럼 원래 값 할당
			        updatedData.saving_rate = decreaseRate(updatedData.resource_new_size_type1, updatedData.resource_new_size_type2);
			        if(currentData.resource_type > 0){ // 폴더가 아닌 경우만 업데이트
			        	targetRow.update(updatedData);			        	
			        }
			       
				} else {
				    console.log("해당 값의 행을 찾을 수 없습니다.");
				}				
			}		
		});	*/

		
		// clear interval
		if($("#resourceListModal").css("display")=="none"){
			clearInterval(interval);
		}
		
	},10000);
}

function selectResourceAllByResourceType(resource_type){
	current_resource_type = resource_type;
	table = new Tabulator("#volist", {
		selectable:true,
	    pagination:true, //enable pagination
	    paginationMode:"remote", //enable remote pagination
	    sortMode: "remote",
	    ajaxURL:"/selectResourceAllByResourceType", //set url for ajax request
	    ajaxParams:{
	    	resource_type : resource_type,
	    	resource_status : current_resource_status,
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
 	    	// console.log(response);
	    	// console.log(prarm);
	    	// console.log("page : "+this.getPage());
	    	// console.log("size : "+this.getSize());
	    	$("#list-cnt").html(response.list_cnt);
	    	for(let i=0;i<response.data.length;i++){
	    		// 절감률 계산
	    		response.data[i].saving_rate = decreaseRate(response.data[i].resource_new_size_type1, response.data[i].resource_new_size_type2);
	    
	    		// 상세보기 버튼
	    		response.data[i].detail_btn = `<a class="btn btn-primary  btn-icon-split" onclick="drawResourceModal(${response.data[i].resource_no});">
	    			<span class="icon text-white-50"><i class="fas fa-search"></i></span>
	    			<span class="text">상세보기</span></a>`;
	    		if(response.data[i].resource_type==0){
	    			response.data[i].detail_btn = `<a class="btn btn-secondary  btn-icon-split" style="opacity:0.5;">
		    			<span class="icon text-white-50"><i class="fas fa-search"></i></span>
		    			<span class="text">상세보기</span></a>`;	    			
	    		}
	    		
	    	}
	    	// console.log(response);
	    	return response; 
	    },
	    paginationInitialPage: 1,
	    layout: "fitColumns",
	    columns: [
			{
				formatter:"rowSelection", 
				titleFormatter:"rowSelection", 
				titleFormatterParams:{
					rowRange:"active" //only toggle the values of the active filtered rows
				}, 
				hozAlign:"center", 
				headerSort:false,
				width: 50
			},	    	
	    	{
	    		title: "No",
	    		field: "row_no",
	    		width: 80,
	    		hozAlign: "right",
	    		headerSort:false,
	    	},
	    	{
	    		title: "No",
	    		field: "resource_no",
	    		width: 80,
	    		hozAlign: "right",
	    		headerSort:true,
	    		visible:false,
	    	},	    	
	    	{
	    		title: "구분",
	    		field: "resource_type",
	    		hozAlign: "center",
	    		headerSort:true,
	    		width: 60,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = `<span style="font-size:1.2em;">`;
	    			switch(cell.getValue()){
		    			case 0 : result += `📁`; break;
		    			case 1 : result += `🖼️`; break;
		    			case 2 : result += `🎥`; break;
		    			case 3 : result += `📄`; break;
		    			case 4 : result += `🅰️`; break;
	    			}
	    			result += "</span>";
	    			return result;
	    		}
	    	},
	    	{
	    		title: "웹 컨텐츠 이름",
	    		field: "resource_org",
	    		hozAlign: "left",
	    		headerSort:true,
	    		widthgrow :true,
	    		cellClick: function(e, cell) {
	                let rowData = cell.getRow().getData(); // 클릭된 셀의 행 데이터 가져오기
	            }	    		
	    	},
	    	{
	    		title: "상태",
	    		field: "resource_status",
	    		width: 120,
	    		hozAlign: "center",
	    		headerSort:true,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = "";
	    			let rowData = cell.getRow().getData();
	    			switch(cell.getValue()){
	    				case 1 : result = `<span class="status status-green">최적화 완료</span>`; break;
	    				case 11 : result = `<span class="status status-yellow">최적화 진행 중</span>`; break;
	    				case 0 : result = `<span class="status status-orage">최적화 대기</span>`; break;
	    				case -1 : result = `<span class="status status-gray">미적용</span>`; break;
	    				case 2 : result = `<span class="status status-red">최적화 해제</span>`; break;
	    			}
	    			if(rowData['resource_type'] == 0){
	    				result = "";
	    			}
	    			if(rowData['resource_org_size'] < 0){
	    				result = `<ion-icon name="close-circle-outline" style="font-size:1.3em; color:#b4b4b4; position:relative; top:7px;"></ion-icon>`;
	    			}
	    			return result;
	    		}		    		
	    	},		    	
	    	{
	    		title: "원본 용량",
	    		field: "resource_new_size_type1",
	    		hozAlign: "right",
	    		headerSort:true,
	    		width: 150,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = "";
	    			if(cell.getValue() < 0){
	    				result = `<ion-icon name="close-circle-outline" style="font-size:1.3em; color:#b4b4b4;"></ion-icon>`;
	    			}else{
	    				result = fileSizeUnitFormatter(cell.getValue());
	    			}
	    			return result;
	    		},    		
	    	},	    	
	    	{
	    		title: "최적화 용량",
	    		field: "resource_new_size_type2",
	    		hozAlign: "right",
	    		headerSort:true,
	    		width: 150,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = "";
	    			if(cell.getValue() < 0){
	    				result = `<ion-icon name="close-circle-outline" style="font-size:1.3em;"></ion-icon>`;
	    			}else{
	    				result = fileSizeUnitFormatter(cell.getValue());
	    			}
	    			return result;
	    		},
	    	},	    	    	
	    	{
	    		title: "호출 횟수",
	    		field: "call_cnt",
	    		hozAlign: "right",
	    		headerSort:true,
	    		width: 150,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let rowData = cell.getRow().getData();
	    			let result = comma(cell.getValue())+"회";
	    			if(rowData.resource_type == 0){
	    				result = "";
	    			}
	    			
	    			return result;
	    		}	    		
	    	},	    	
	    	{
	    		// title: `비용 절감율<ion-icon name="help-circle-outline" style="font-size: 1.3em; position:relative; top:5px;"></ion-icon>`,
	    		title: "비용 절감율",
	    		field: "saving_rate",
	    		hozAlign: "right",
	    		headerSort:false,
	    		width: 150,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return cell.getValue();
	    		},
	    		cellClick: function(e, cell){
	    			let result = cell.getValue();
	    			if($(result).hasClass("zero")){
	    				miniAlert(msg.savingRateInfo,"success");
	    			}
	    		}
	    	},	    	
	    	{
	    		title: "상세보기",
	    		field: "detail_btn",
	    		hozAlign: "right",
	    		headerSort:false,
	    		width: 150,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return cell.getValue();
	    		},
	    		visible : false,
	    	},	    
	    ]
	});	
	table.on("dataLoaded", function() {
		// resource_status == 1인경우 체크박스 비활성화
		setTimeout(function(){
			let tableData = table.getRows();
			for(let i = 0; i < tableData.length; i++){
				let rowData = tableData[i].getData();
				let rowElement = tableData[i].getElement();
				if(rowData.resource_status == 1){
					// $(rowElement).find(".tabulator-cell").eq(0).find("input").prop("disabled", true);
				}
			}			
		},1);
	});
}

function countResourceAllByResourceType(){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/countResourceAllByResourceType',
		data:{
			resource_type : current_resource_type
		},
		async: false,
		success: function(res) {
			result = res.data;
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	$(`#resource-status-tabmenu li`).each(function(){
		$(this).find(".cnt strong").html("0");
	});
	for(let i = 0; i < result.length; i++){
		$(`#resource-status-tabmenu li[data-resource-status=${result[i].resource_status}]`).find(".cnt strong").html(result[i].count);
	}		
	return result;
}

function selectResourceAllByResourceTypeAjax(){
	let result = null;
	// 페이지 가져오기 table.getPage();
	$.ajax({
		type: 'GET',
		url: `/selectResourceAllByResourceType`,
		contentType: 'application/json', // 데이터 형식을 JSON으로 지정
		data : {
			size : 10,
			page : table.getPage(),
			resource_type : current_resource_type,
			resource_status : current_resource_status
		},
		async: false,
		success: function(res) {
			result = res.data;
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	for(let i = 0; i < result.length; i++){
		result[i].saving_rate = decreaseRate(result[i].resource_new_size_type1, result[i].resource_new_size_type2);		
	}
	return result;
}

function optimizeAllAtIndex(){
	console.log(current_resource_type);
	$.ajax({
		type: 'POST',
		url: '/optimizeAllAtIndex',
		data:{
			resource_type : current_resource_type
		},
		async: false,
		success: function(res) {
			result = res.data;
			modalAlert("알림","현재 유형의 모든 웹 컨텐츠 최적화를 진행합니다.");		
			$("#resource-status-tabmenu li[data-resource-status=0]").click();
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});	
}

function optimizeSelectedItemAtIndex(){
	let result = null;
	let selectedData = table.getSelectedData();
	if(selectedData.length == 0){
		modalAlert("알림","최적화를 진행할 웹 컨텐츠를 선택해주세요.");		
		return;
	}
	$.ajax({
		type: 'POST',
		url: '/optimizeSelectedItemAtIndex',
		contentType: 'application/json', // 데이터 형식을 JSON으로 지정
		data:JSON.stringify(selectedData),
		async: false,
		success: function(res) {
			result = res.data;
			modalAlert("알림","선택한 웹컨텐츠의 최적화를 진행합니다.");		
			$("#resource-status-tabmenu li[data-resource-status=0]").click();
			//let updateData = selectResourceAllByResourceTypeAjax();
			//table.setData(updateData);
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	return result;
}

function cancelSelectedItemAtIndex(){
	let result = null;
	let selectedData = table.getSelectedData();
	if(selectedData.length == 0){
		modalAlert("알림","최적화를 취소할 웹 컨텐츠를 선택해주세요.");		
		return;
	}
	for(let i = 0; i < selectedData.length; i++){
		selectedData[i].saving_rate = '';
	}
	console.log(selectedData);
	$.ajax({
		type: 'POST',
		url: '/cancelSelectedItemAtIndex',
		contentType: 'application/json', // 데이터 형식을 JSON으로 지정
		data:JSON.stringify(selectedData),
		async: false,
		success: function(res) {
			result = res.data;
			modalAlert("알림","선택한 웹컨텐츠의 최적화를 해제합니다.");		
			$("#resource-status-tabmenu li[data-resource-status=2]").click();
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	return result;
}
