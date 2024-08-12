let pageFnc = {};
const $jstreeContainer = $('#explorer .content');
const optimizeByPage = true;

// 전역 변수 관리
let global = {};
global.page_no = null;
global.pageCountArray = null;

$(document).ready(function(){
	initSearch_page();
});

//타뷸레이터 업데이트 인터벌
let tabulatorInterval = setInterval(function(){
	pageFnc.updateTabulator();
}, 2000);

setTimeout(function(){
	$('#preLoader').fadeOut(300);
},2000);


function optimizerByPageInit() {
	
	// 카운트 데이터
	global.pageCountArray = selectResourceCountByPage().data;	
	
	$jstreeContainer.jstree({
		'core' : {
			'data' : jsonData,
			'themes' : {
				"variant" : "large",
			}			
		}
	}).on('select_node.jstree', function (e, data) { // 노드 클릭 이벤트
		var selectedNodeId = data.node.id;
		let nodeName = data.node.text;
		global.page_no = selectedNodeId;
		let renderingData = getPageRenderingData(selectedNodeId); 
		renderingData.page_no = selectedNodeId;
		renderingData.page_name = nodeName;
		optimizingOrgDataByPage = null;
		optimizingOrgDataByPage = selectResourceAllOptimizingByPage(selectedNodeId);
		optimizingUpdateDataByPage = selectResourceAllOptimizingByPage(selectedNodeId);		
		let pageData = selectByPageNo(selectedNodeId);
		// console.log("pageData", pageData);
		
		if(pageData.page_type == 1){
			// 테이블 상단
			let renderingDataStr = JSON.stringify(renderingData).replace(/"/g, '&quot;');
			const countItem = global.pageCountArray.find(item => item.page_no == global.page_no);
			// console.log("countItem", countItem);
			let disabled = (countItem == undefined || countItem.count == 0) ? `disabled` : ``;
			let html = `<span id="page_name"><strong>${nodeName}</strong>에 대한 렌더링 속도</span> <button class="btn btn-sm btn-primary" onclick="drawRenderingModal(${renderingDataStr});" style="padding: 2px 10px 2px 10px;" id="simul-modal-btn" ${disabled}><i class="fa-solid fa-cube"></i> 시뮬레이션</button>`;
			$("#simulation").empty().append(html);
			$("#page-type-summary").css({"opacity":"1.0"});
			$("#table-container").css({"display":"block"});
			drawSearchType(renderingData); // 상단 타입 선택 버튼 생성
			getAllWebContent(selectedNodeId); // 타뷸레이터
			// drawRenderingModal(renderingData); // (바로 그리니까 너무 느림)
		}else if(pageData.page_type == 0){
			let html = `해당 노드는 페이지의 폴더입니다.`;
			$("#simulation").empty().append(html);
			$("#page-type-summary").css({"opacity":"0.0"});
			$("#table-container").css({"display":"none"});
		}

	    // Lazyload on/off 버튼 추가
		let lazyloadStatusList = updateLazyloadStatus();
		let lazyloadStatus;
	    $(".jstree .jstree-anchor").each(function(){
	        let $anchor = $(this);
	        let page_no = $anchor.attr("id").replace(/\D/g, ''); // 숫자만 남기기
	        lazyloadStatus = lazyloadStatusList.find(item => item.page_no == page_no);
	        let use_lazyload = lazyloadStatus ? lazyloadStatus.use_lazyload : 0;
	        // 해당 요소에 버튼이 없는 경우에만 추가
	        if (!$anchor.children(".btn-lazyload").length) {
	            if (use_lazyload === 1) {
	                $anchor.append(`<button class="btn-lazyload on" data-page-no="${page_no}">ON</button>`);
	            } else {
	                $anchor.append(`<button class="btn-lazyload off" data-page-no="${page_no}">OFF</button>`);
	            }
	        }
	    });
	    $(".jstree").off("click", ".btn-lazyload").on("click", ".btn-lazyload", function(event) {
	    	event.stopPropagation();	
	        let use_lazyload;
	        let $button = $(this);
	        let $all = $(".btn-lazyload");
	        let page_no = $button.data("page-no");
	        lazyloadStatus = lazyloadStatusList.find(item => item.page_no == page_no);
	        let page_name = lazyloadStatus.page_name;
	        let page_type = lazyloadStatus.page_type;
	        if ($button.hasClass("off")) {
	            if(page_type === 0) {
	                $all.removeClass("off").addClass("on").text("ON");
	                use_lazyload = 1;
	                updateLazyloadButtonAll(use_lazyload);
	            } else {
	                $button.removeClass("off").addClass("on").text("ON");
	                use_lazyload = 1;
	            }
	        } else if ($button.hasClass("on")) {
	            if(page_type === 0) {
	                $all.removeClass("on").addClass("off").text("OFF");
	                use_lazyload = 0;
	                updateLazyloadButtonAll(use_lazyload);
	            } else {
	                $button.removeClass("on").addClass("off").text("OFF");
	                use_lazyload = 0;
	            }
	        }
	        updateLazyloadButton(page_no, use_lazyload);    
	    });

	}).on('ready.jstree', function(e, data) { // 트리 로드 이벤트
		
		$jstreeContainer.jstree(true).open_all();
		$(`#explorer .content li[role="treeitem"]`).eq(1).find("a").click();
		
		// 카운트
		jstreeCountInit();
		for(let i = 0; i < global.pageCountArray.length; i++){
			const item = global.pageCountArray[i];
			let target = $(".jstree").find(`li#${item.page_no} a`);
			if(target.length > 0){
				let zero = "";
				if(item.count == 0){
					zero = "zero";
				}
				target.eq(0).find(".count").html(`<span class="number selected">${comma(item.count)}</span>`);
				target.eq(0).find(".count").addClass(zero);
			}
		}		
		let $emptyCounts = $(".jstree .count").filter(function() {
		    return $(this).is(':empty');
		});
		$emptyCounts.css({"display":"none"});	
		
		// 외부에서 주소로 들어오기
		setTimeout(function(){
			const page_name = urlParams.get("page_name");
			const page_no = urlParams.get("page_no");
			let node_id = 0;
			if(page_name != null){
				$(".jstree-anchor").each(function(){
					node_id = $(this).attr("id").replace("_anchor","");
					$temp = $(this).clone();
					$temp.find("i").remove();
					$temp.find("span").remove();
					$temp.find("button").remove();
					node_name = $temp.text().trim();
					if(page_name == node_name){
						$('#explorer .content').jstree(true).deselect_all();
						$jstreeContainer.jstree(true).select_node(node_id);
					}
				});
			}
			if(page_no != null){
				$jstreeContainer.jstree(true).deselect_all();
				$jstreeContainer.jstree(true).select_node(page_no);
			}			
		},0);
		
	});
	
	
	
}

function initSearch_page() {
	
	// statusArray 뿌리기
	let html = "";
	for(let i = 0; i < statusArray.length; i++){
		html += `<option value="${statusArray[i].value}">${statusArray[i].label}</option>`;
	}
	$("#search-status-select").html(html);
	resource_type_sumo = $('#search-status-select').SumoSelect({
		placeholder: '웹 콘텐츠 상태를 선택하세요',
		arrow: true,
	});
	// sumoselect 아이콘 수동 추가
	for(let i = 0; i < statusArray.length; i++){
		$(".search-container .SumoSelect>.optWrapper>.options li").eq(i).find("label").prepend(`<ion-icon name="${statusArray[i].icon}"></ion-icon> `);
	}
	searchMultiSelectEvent();
	
}

function searchCheckboxEvent(inputName){
    $(`input[name="${inputName}"]`).change(function(){
        // 체크박스가 체크되었는지 확인
        const isChecked = $(this).prop('checked');
        
        $("select[name=search_range]").val(0); // 유형별 선택이므로 강제 전체 선택 설정
        let selectedNodeId = $('#explorer .content').jstree(true).get_selected()[0];
        getAllWebContent(selectedNodeId);  
    });
}

function searchReset(){
	if(resource_type_sumo != null){
		resource_type_sumo.sumo.unSelectAll();
	}
}

function searchMultiSelectEvent(){
    $('#search-status-select').change(function(){
    	let selectedNodeId = $('#explorer .content').jstree(true).get_selected()[0];
    	getAllWebContent(selectedNodeId);
    });
}

function filterResetBtnEvent(){
	$('.remove-button').remove();
	$('.search-criteria-filter input[type="checkbox"]').prop('checked', false);
	$("input[name='search_keyword']").val("");
	$("input[name='search_page']").val("");
	$("input[name='page_name']").val("");
	let selectedNodeId = $('#explorer .content').jstree(true).get_selected()[0];
	
	
	getAllWebContent(selectedNodeId);
}

function searchEnterEvent(){
    if (event.keyCode === 13) { // Enter 키의 keyCode는 13입니다.
    	searchSubmitBtnEvent2();
        return false; // 폼 제출 방지
    }
    return true;	
}

function searchSubmitBtnEvent2(){
	let selectedNodeId = $('#explorer .content').jstree(true).get_selected()[0];
	getAllWebContent(selectedNodeId);
	
}


/** 검색 데이터 초기화 */
function searchDataInit2(resource_parent_no){
	
	// 상태 검색 설정
    let resource_status_array = [];
    let selectedValuesString = $('#search-status-select')[0].sumo.getSelStr();
    resource_status_array = selectedValuesString.split(',');
    if (resource_status_array[0] === "") {
    	for(let i = 0; i < statusArray.length; i++){
    		resource_status_array.push(statusArray[i].value);
    	}
    }
    
    // 유형 검색 설정
    let resource_type_array = [];
    $('input[name="resource_type"]:checked').each(function(){
    	resource_type_array.push($(this).val());
    });
    if (resource_type_array.length === 0 || resource_type_array[0] == 99) {
    	switch(fileManagerType){
    	case 1 : 
    		for(let i = 1; i <= 4; i++){
    			resource_type_array.push(i);
    		}
    		break;
    	case 2 : 
    		for(let i = 5; i <= 9; i++){
    			resource_type_array.push(i);
    		}    		
    		break;
    	}
    }    
    
	let search_range = $("select[name=search_range]").val();
	let search_keyword = $("input[name=search_keyword]").val();
	
	let data = {
			size: 15,
	    	resource_status_array : resource_status_array,
	    	resource_type_array : resource_type_array,
	    	search_range : search_range,
	    	search_keyword : search_keyword,
	    	filemanager_type : fileManagerType,
	    	page_no:parseInt(resource_parent_no),
	    };	
	return data;
}


function getAllWebContent(selectedNodeId){
	let data = searchDataInit2(selectedNodeId);
	table_resource = new Tabulator("#contentTable", {
		height:"100%",
		selectable:false,
	    pagination:true, // enable pagination
	    paginationMode:"remote", // enable remote pagination
	    paginationSize:10, // 목록 크기
	    sortMode: "remote",
	    ajaxURL:"/selectPageResource", // set url for ajax request
	    ajaxParams:data,
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
	            "data":{
					"loading":`<div class="spinner-border text-primary m-1" role="status"><span class="sr-only">Loading...</span></div>`,
					"error":"Error",
				},          
	            
	        },
	    },	    
	    ajaxContentType : "application/json; charset=utf-8",
	    ajaxContentType:"json",
	    ajaxResponse:function(url,prarm,response){
	    	
	    	$("#list_cnt span").html(response.list_cnt);
	    	for(let i=0;i<response.data.length;i++){
	    		
	    		response.data[i].reduction_rate = 0;
	    		response.data[i].detail_btn = `<button class="btn btn-sm btn-detail">상세보기</button>`;
	    		response.data[i].optimize_btn = `0`;
	    		// let rand = Math.random() < 0.5 ? 0 : 1;
	    		if(response.data[i].resource_condition == 1){
	    			response.data[i].condition = `<span class="badge badge-normal">양호</span>`;	    			
	    		}else{
	    			response.data[i].condition = `<span class="badge badge-abnormal">미흡</span>`;
	    		}
	    		if(response.data[i].resource_type==0){
	    			response.data[i].resource_new_size_type1 = "";
	    			response.data[i].condition = "";
	    			response.data[i].detail_btn = "";
	    			response.data[i].optimize_btn = "";
	    		}
	    		
	    	}
	    	
	    	return response; 
	    },
	    paginationInitialPage: 1,
	    paginationLoading: "<div class='custom-pagination-loader'><div class='spinner'></div>Loading...</div>",
	    layout: "fitColumns",
	    columns: [
			/*
			 * { formatter:"rowSelection", titleFormatter:"rowSelection",
			 * titleFormatterParams:{ rowRange:"active" //only toggle the values
			 * of the active filtered rows }, hozAlign:"center",
			 * headerSort:false, width: 50 },
			 */	    	
	    	{
	    		title: "No",
	    		field: "resource_no",
	    		hozAlign: "right",
	    		headerSort:true,
	    		visible:false,
	    		resizable:false,
	    	},	    	
	    	{
	    		title: "No",
	    		field: "row_no",
	    		width: 50,
	    		hozAlign: "right",
	    		headerSort:false,
	    		resizable:false,
	    	},
	    	{
	    		title: "구분",
	    		field: "resource_type",
	    		hozAlign: "center",
	    		headerSort:true,
	    		width: 80,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = `<span style="font-size:1.2em;">`;
	    			switch(cell.getValue()){
		    			case 0 : result += `📁`; break;
		    			case 1 : result += `🖼️`; break;
		    			case 2 : result += `🎥`; break;
		    			case 3 : result += `📄`; break;
		    			case 4 : result += `🅰️`; break;
		    			case 5 : result += `<img src="/resources/img/icon-ext-hwp-color.png" />`; break;
		    			case 6 : result += `<img src="/resources/img/icon-ext-doc-color.png" />`; break;
		    			case 7 : result += `<img src="/resources/img/icon-ext-xls-color.png" />`; break;
		    			case 8 : result += `<img src="/resources/img/icon-ext-ppt-color.png" />`; break;
		    			case 9 : result += `<img src="/resources/img/icon-ext-pdf-color.png" />`; break;
	    			}
	    			result += "</span>";
	    			return result;
	    		},
	    		resizable:false,
	    	},
	    	{
	    		title: "웹 컨텐츠 이름",
	    		field: "resource_name",
	    		hozAlign: "left",
	    		headerSort:true,
	    		widthgrow :true,
	    		cellClick: function(e, cell) {
	                let rowData = cell.getRow().getData(); // 클릭된 셀의 행 데이터 가져오기
	                if(rowData['resource_type'] == 0){
	                	$('#explorer .content').jstree(true).deselect_all();
	                	$('#explorer .content').jstree(true).select_node(rowData['resource_no']);	                	
	                }
	            },
	            resizable:false,
	    	},
	    	{
	    		title: "최적화 적용",
	    		field: "resource_status",
	    		width: 130,
	    		hozAlign: "center",
	    		headerHozAlign:"center",
	    		headerSort:true,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = "";
	    			let rowData = cell.getRow().getData();
	    			result = printResourceStatus(cell.getValue());
	    			if(rowData['resource_type'] == 0){
	    				result = "";
	    			}
	    			if(rowData['resource_org_size'] < 0){
	    				result = `<ion-icon name="close-circle-outline" style="font-size:1.3em; color:#b4b4b4; position:relative; top:7px;"></ion-icon>`;
	    			}
	    			return result;
	    		},
	    		resizable:false,
	    	},		    	
	    	{
	    		title: "원본 크기",
	    		field: "resource_new_size_type1",
	    		hozAlign: "right",
	    		headerHozAlign:"right",
	    		headerSort:true,
	    		width: 120,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = "";
	    			let rowData = cell.getRow().getData();
	    			if(cell.getValue() < 0){
	    				result = `<ion-icon name="close-circle-outline" style="font-size:1.3em; color:#b4b4b4;"></ion-icon>`;
	    			}else{
	    				result = fileSizeUnitFormatter(cell.getValue());
	    			}
	    			if(rowData.resource_type == 0){
	    				result = "";
	    			}		    			
	    			return result;
	    		},  
	    		resizable:false,
	    	},	    	    	
	    	{
	    		title: "최적화 크기",
	    		field: "resource_new_size_type2",
	    		hozAlign: "right",
	    		headerHozAlign:"right",
	    		headerSort:true,
	    		width: 130,
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let rowData = cell.getRow().getData();
	    			let result = "";
	    			if(rowData.resource_status == 1){
	    				result = fileSizeUnitFormatter(cell.getValue());
	    				if(cell.getValue() == 0){
	    					result = ERROR;
	    				}
	    			}else{
	    				result = UNOPTIMIZED;
	    			}
	    			if(rowData.resource_type == 0){
	    				result = "";
	    			}		    			
	    			return result;
	    		},  
	    	},	
	    	{
	    		title: "파일 경량화율",
	    		field: "reduction_rate",
	    		hozAlign: "right",
	    		headerHozAlign:"right",
	    		headerSort:false,
	    		width: 150,
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let rowData = cell.getRow().getData();
	    			let result = "";
	    			if(rowData.resource_status == 1){
	    				result = ((rowData.resource_new_size_type1 - rowData.resource_new_size_type2)/rowData.resource_new_size_type1)*100;
	    				result = result.toFixed(1)+"%";
	    				if(result == "100.0%" || (rowData.resource_new_size_type1 - rowData.resource_new_size_type2) < 0){
	    					result = ERROR;
	    				}else if(result == "0.0%"){
	    					result = `<a style="cursor:pointer; opacity:0.3;" onclick="popoverSingleEvent({element : this, content : '해당 웹 콘텐츠는 최적화 결과 효과가 미미하여 원본 웹 콘텐츠를 사용합니다.', xaxis : 'right'});"><ion-icon name="help-circle-outline"></ion-icon>0.0%</a>`;
	    				}else{
	    					result = `<strong style="color:var(--color-yellow);">${result}</strong>`;
	    				}
	    			}else{
	    				result = UNOPTIMIZED;
	    			}
	    			if(rowData.resource_type == 0){
	    				result = "";
	    			}	    			
	    			return result;
	    		},  
	    	},		    	    
	    	{
	    		title: "최적화",
	    		field: "optimize_btn",
	    		hozAlign: "center",
				headerHozAlign:"center",
	    		headerSort:false,
	    		width: 120,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let rowData = cell.getRow().getData(); 
	    			let result = "";
	    			if(rowData.resource_status == 1){
	    				result = `<button class="btn btn-sm" style="width:70px; background:var(--color-dark-blue);">상세보기</button>`;
	    			}else{
	    				result = `<button class="btn btn-sm btn-single-optimize" style="width:70px;">상세보기</button>`;
	    			}
	    			if(rowData.resource_type == 0){
	    				result = "";
	    			}
	    			return result;
	    		},
	    		resizable:false,
	    	},	    
	    ],	    
	});	
	// 상세보기 이벤트 걸기
	table_resource.on("cellClick", function(e, cell) {
	    if (cell.getField() === "detail_btn" || cell.getField() === "resource_name" || cell.getField() === "optimize_btn") {
	    	resourceDetailEvent(cell.getRow(), cell.getField());
	    }
	});
	
	table_resource.on("dataLoaded", function() {
		// 버튼 만들기
		if ($(".optimize-button-container").length === 0) {
			let html = `<div class="optimize-button-container">
					<div class="spinner-grow m-1" role="status" style="color:var(--color-blue); width:24px; height:24px;">
					    <span class="sr-only">Loading...</span>
					</div>
				</div>`;
		    $(".tabulator-footer-contents").append(html);
		}
	});
	
}

function drawSearchType(data){
	
	const pageTypeArray = [];
	pageTypeArray[0] = data.all[0];
	pageTypeArray[1] = data.image[0];
	pageTypeArray[2] = data.video[0];
	pageTypeArray[3] = data.text[0];
	pageTypeArray[4] = data.font[0];
	let html = "";
	
	const page_no = data.page_no;
	const page_name = data.page_name;
	
	// 카운트 데이터
	let countArray = selectResourceTypeCountByPage(page_no).data;
	for(let i = 0; i <= 4; i++){
		let typeItem = null;
		if(i > 0){
			typeItem = typeArray.find(item => item.value == i);			
		}else{
			typeItem = {value : 99, label : "전체", icon : "medical", icon_type : "ion-icon"};
		}
		let countItemArray = countArray.filter(item => item.resource_type == i);
		let totalCount = 0;
		let compCount = 0;
		let size1 = 0;
		let size2 = 0;
		if(countItemArray != undefined){
			totalCount = countItemArray.reduce((acc, item) => acc + item.count, 0);
			size1 = countItemArray.reduce((acc, item) => acc + item.size1, 0);
			size2 = countItemArray.reduce((acc, item) => acc + item.size2, 0);
			let compCountItem = countItemArray.find(item => item.resource_status == 1);
			if(compCountItem != undefined){
				compCount = compCountItem.count;
			}
			if(i == 0){ // 전체
				let compCountArray = countArray.filter(item => item.resource_status == 1);
				compCount = compCountArray.reduce((acc, item) => acc + item.count, 0);
			}
		}

		if(totalCount > 0){
			html += `<input type="radio" class="btn-check" name="resource_type" id="type-array-item${i}" autocomplete="off" value="${i == 0 ? `99`: `${i}`}" ${i == 0 ? `checked`:``} >
				<label for="type-array-item${i}" class="col btn btn-outline-primary">
				<p class="type-icon"><ion-icon name="${typeItem.icon}"></ion-icon></p>
				<p class="type-name">${typeItem.label} ${compCount}<span style="color:rgba(255,255,255,0.5);">/${totalCount}</span>건</p>
				<p class="type-chart" id="page-type-chart${i}"></p>
				`;			
			
			/*
			if(pageTypeArray[i] != undefined && pageTypeArray[i].org_time > 0 && pageTypeArray[i].new_time){
				html += `<p class="type-time">${timeUnitFormatter(pageTypeArray[i].org_time)} <i class="fa-solid fa-right-long"></i> <strong>${timeUnitFormatter(pageTypeArray[i].new_time)}</strong></p>`;
				pageTypeArray[i].status_percentage = parseInt((compCount/totalCount)*100);
			}else{
				html += `<p class="type-time"><span style="color:rgba(255, 255,255,0.3);">데이터가 없습니다.</span></p>`;
			}*/
			if(pageTypeArray[i] != undefined){
				html += `<p class="type-time">${fileSizeUnitFormatter(size1)} <i class="fa-solid fa-right-long"></i> <strong>${fileSizeUnitFormatter(size2)}</strong></p>`;
				pageTypeArray[i].status_percentage = parseInt((compCount/totalCount)*100);
			}else{				
				html += `<p class="type-time"><span style="color:rgba(255, 255,255,0.3);">데이터가 없습니다.</span></p>`;
			}
			html += `</label>`;				
		}
	
	}

	$("#page-type-summary").empty();
	$("#page-type-summary").append(html);
	for(let i = 0; i <= 4; i++){
		let value = 0;
		if(pageTypeArray[i] != undefined){
			// value = pageTypeArray[i].percent;
			value = pageTypeArray[i].status_percentage;
			if(isNaN(value)){
				value = 0;
			}
		}
		if($(`#page-type-chart${i}`) && $(`#page-type-chart${i}`).length > 0){
			value = parseInt(value);
			drawRadialChart(`#page-type-chart${i}`, value);						
		}

	}
	searchCheckboxEvent("resource_type");
}

function drawRadialChart(targetEle, value){
    let options = {
      series: [value],
      chart: {
      height: 90,
      type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
        	hollow: {
            size: '80%',
          },        	
          track: {
            background: "#323232",
            strokeWidth: '100%',
            margin: 0, // margin is in pixels
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              offsetY: 5,
              fontSize: '13px',
              color: "#ffffff",
            }
          }
        }
      },
    // labels: ['Cricket'],
    colors: ['#FFFFFF'],
    };

    let chart = new ApexCharts(document.querySelector(targetEle), options);
    chart.render();
}

function drawRenderingModal(data){
	
	let timeReduRate = (1-(data.all[0].percent/100)).toFixed(2); // 시간 단축률
	console.log("data.all[0].percent", data.all[0].percent, "timeReduRate", timeReduRate);
	
	let timeTypeArray = [];
	timeTypeArray[0] = data.all[0];
	timeTypeArray[1] = data.image[0];
	timeTypeArray[2] = data.video[0];
	timeTypeArray[3] = data.text[0];
	timeTypeArray[4] = data.font[0];

	const page_no = data.page_no;
	const page_name = data.page_name;
	
	$("#renderMD").html(`<span id="page_name">${page_name} 에 대한 렌더링 속도</span> 시뮬레이션 <button id="simul-btn" class="custom-btn btn-11" style="position:relative; top:-2px;"><i class="fa-solid fa-cube"></i> 시뮬레이션 시작</button>`);
	const NO_DATA = `<span style="color:rgba(255,255,255,0.2);">데이터가 없습니다</span>`;

	let html = "";
	html += `<div class="d-flex">`;
	for(let i = 0; i < 2; i++){
		html += `<div class="col simul-preview" style="margin-right:15px;" data-type="${i == 0 ? `before` : `after`}">
		    <div class="browser-frame">
		        <div class="browser-header">
		            <div class="browser-buttons">
		                <span class="browser-button"></span>
		                <span class="browser-button"></span>
		                <span class="browser-button"></span>
		            </div>
		            <div class="address-bar">최적화 ${i == 0 ? `전` : `후`}</div>
		        </div>
		        <iframe src=""></iframe>
		        <div class="iframe-ready">
		            <div class="intro">'시뮬레이션 시작'버튼을 눌러주세요.</div>
		            <div class="page-time spinning">대기 중</div>
		            <div class="result"></div>
		        </div>
		    </div>
		    <div class="progress-bar">
		    	<div></div>
		    </div>
		    <div class="time-table">
		    	<ul class="d-flex">`;
				for(let j = 0; j <= 4; j++){
					let typeItem = typeArray.find(item => item.value == j);
					if(j == 0){
						typeItem = {value : 0, label : "전체", icon : "medical", icon_type : "ion-icon"};
					}
					let time = 0;
					if(timeTypeArray[j] != undefined){
						time = (i == 0) ? timeTypeArray[j].org_time : timeTypeArray[j].new_time;
					}
					html += `<li ${j == 0 ? `style="display:none;"` : ``} data-type="${j}" class="col" data-org-time="${time}">
						<p class="label"><ion-icon name="${typeItem.icon}"></ion-icon> ${typeItem.label}</p>
						<p class="value"><span class="zero">측정 대기 중</span></p>
					</li>`;
				}
		html += `</ul>
			</div>
		</div>`;
	}
	html += `</div>`;
	
	$("#testRendering .modal-body").html(html);

	$("#simul-btn").off('click').on('click', function(){
	    const $testRendering = $("#testRendering");
	    const types = ['before', 'after'];
	    const iframes = {};
	    const elements = {};
	   

	    types.forEach(type => {
	        const $element = $testRendering.find(`.simul-preview[data-type='${type}']`);
	        elements[type] = {
	            $element: $element,
	            $iframe: $element.find("iframe"),
	            $proBar: $element.find(".progress-bar div"),
	            $timeTable: $element.find(".time-table"),
	            $result: $element.find(".result"), 
	            $pageTime : $element.find(".page-time"),       
	        };
	        iframes[type] = {
	            startTime: 0,
	            endTime: 0,
	            loadTime: 0
	        };
	    });

	    // Reset elements
	    $testRendering.find(".time-table li .value").each(function() {
	        $(this).html(`<span class="zero">측정 대기 중</span>`);
	    });

	    types.forEach(type => {
	        elements[type].$iframe.off("load").attr("src", "");
	        elements[type].$element.find(".page-time").show().html("0.000");
	        elements[type].$element.find(".intro").hide();
	        elements[type].$proBar.css({"width": "0%"});
	        elements[type].$result.html("");
	        elements[type].$result.hide();
	        elements[type].$pageTime.removeClass("complete");
	        elements[type].$pageTime.addClass("spinning");
	    });	    

        function loadIframe(type) {
            return new Promise((resolve) => {
                const {$iframe, $proBar, $timeTable} = elements[type];
                const contentType = type === 'before' ? 1 : 2;
                
                $iframe.css({"opacity":"1.0"});
                iframes[type].startTime = performance.now();
                
                $iframe.on("load", function() {
                    iframes[type].endTime = performance.now();
                    iframes[type].loadTime = iframes[type].endTime - iframes[type].startTime;
                    
                    if(type == "after"){
                    	iframes[type].loadTime = iframes["before"].loadTime * timeReduRate;
                    	// console.log("before", iframes["before"].loadTime);
                    	// console.log("after", iframes["after"].loadTime);
                    }
                    
                    animateNumber(`[data-type='${type}'] .page-time`, 0, iframes[type].loadTime/1000, iframes[type].loadTime, 3, "초");
                    
                    $proBar.animate({"width": "100%"}, iframes[type].loadTime, function(){
                        const $pageTime = elements[type].$element.find(".page-time");
                        $pageTime.removeClass('spinning');  // 애니메이션 중지
                        $pageTime.addClass("complete");
                        const org_time = data.all[0][type === 'before' ? 'org_time' : 'new_time'];
                        const mag = ((org_time - iframes[type].loadTime) / org_time).toFixed(2);
                        
                        $timeTable.find("li").each(function(){
                            const $targetEle = $(this).find(".value");
                            const orgTime = parseInt($(this).attr("data-org-time"));
                            $targetEle.html(`<strong>${timeUnitFormatter(orgTime * mag)}</strong>`);
                            if(orgTime == 0){
                                $targetEle.html(`<span class="zero">-</span>`);                               
                            }
                        });
                        resolve(); // Resolve the promise when this iframe is fully loaded and processed
                    });
                    
                    const iframeContent = $iframe[0].contentDocument || $iframe[0].contentWindow.document;
                    const images = $(iframeContent).find('img');
                    images.each(function(index) {});
                });

                $iframe.attr("src", `/viewLogFile2?page_no=${page_no}&content_type=${contentType}`);
            });
        }

        // Load 'before' iframe first, then 'after' iframe
        loadIframe('before').then(() => {
            return loadIframe('after');
        }).then(() => {
            compareLoadTimes();
        });
	    
	    function compareLoadTimes() {
	    	const beforeTime = iframes['before'].loadTime;
	    	const afterTime = iframes['after'].loadTime;
	    	const timeDifference = beforeTime - afterTime;
	    	const percentageImprovement = ((beforeTime - afterTime) / beforeTime * 100).toFixed(2);
	    	
	    	let resultMessage = "";
	    	if (timeDifference > 0) {
	    		resultMessage = `${timeUnitFormatter(timeDifference)} (${percentageImprovement}%) 감소`;
	    	} else if (timeDifference < 0) {
	    		resultMessage = `${timeUnitFormatter(Math.abs(timeDifference))} (${Math.abs(percentageImprovement)}%) 증가`;
	    	} else {
	    		resultMessage = "최적화 전후 로딩 시간에 변화가 없습니다.";
	    	}
	    	
	    	// 결과를 화면에 표시
	    	elements["after"].$result.html(`<strong>${resultMessage}</strong>`);
	    	elements["after"].$result.fadeIn();
	    	
	    }	
	});
	
	
	$("#testRendering").modal("show");
}

function drawRenderingModal_v2(data){
	
	let timeTypeArray = [];
	timeTypeArray[0] = data.all[0];
	timeTypeArray[1] = data.image[0];
	timeTypeArray[2] = data.video[0];
	timeTypeArray[3] = data.text[0];
	timeTypeArray[4] = data.font[0];

	const page_no = data.page_no;
	const page_name = data.page_name;
	
	$("#renderMD").html(`<span id="page_name">${page_name} 에 대한 렌더링 속도</span> 시뮬레이션 <button id="simul-btn" class="custom-btn btn-11" style="position:relative; top:-2px;">시뮬레이션 시작</button>`);
	const NO_DATA = `<span style="color:rgba(255,255,255,0.2);">데이터가 없습니다</span>`;

	let html = "";
	html += `<div class="d-flex">`;
	for(let i = 0; i < 2; i++){
		html += `<div class="col simul-preview" style="margin-right:15px;" data-type="${i == 0 ? `before` : `after`}">
		    <div class="browser-frame">
		        <div class="browser-header">
		            <div class="browser-buttons">
		                <span class="browser-button"></span>
		                <span class="browser-button"></span>
		                <span class="browser-button"></span>
		            </div>
		            <div class="address-bar">최적화 ${i == 0 ? `전` : `후`}</div>
		        </div>
		        <iframe src=""></iframe>
		        <div class="iframe-ready">
		            <div class="intro">'시뮬레이션 시작'버튼을 눌러주세요.</div>
		            <div class="page-time spinning">대기 중</div>
		            <div class="result"></div>
		        </div>
		    </div>
		    <div class="progress-bar">
		    	<div></div>
		    </div>
		    <div class="time-table">
		    	<ul class="d-flex">`;
				for(let j = 0; j <= 4; j++){
					let typeItem = typeArray.find(item => item.value == j);
					if(j == 0){
						typeItem = {value : 0, label : "전체", icon : "medical", icon_type : "ion-icon"};
					}
					let time = 0;
					if(timeTypeArray[j] != undefined){
						time = (i == 0) ? timeTypeArray[j].org_time : timeTypeArray[j].new_time;
					}
					html += `<li ${j == 0 ? `style="display:none;"` : ``} data-type="${j}" class="col" data-org-time="${time}">
						<p class="label"><ion-icon name="${typeItem.icon}"></ion-icon> ${typeItem.label}</p>
						<p class="value"><span class="zero">측정 대기 중</span></p>
					</li>`;
				}
		html += `</ul>
			</div>
		</div>`;
	}
	html += `</div>`;
	
	$("#testRendering .modal-body").html(html);

	$("#simul-btn").off('click').on('click', function(){
	    const $testRendering = $("#testRendering");
	    const types = ['after', 'before'];
	    const iframes = {};
	    const elements = {};

	    types.forEach(type => {
	        const $element = $testRendering.find(`.simul-preview[data-type='${type}']`);
	        elements[type] = {
	            $element: $element,
	            $iframe: $element.find("iframe"),
	            $proBar: $element.find(".progress-bar div"),
	            $timeTable: $element.find(".time-table"),
	            $result: $element.find(".result"), 
	            $pageTime : $element.find(".page-time"),       
	        };
	        iframes[type] = {
	            startTime: 0,
	            endTime: 0,
	            loadTime: 0
	        };
	    });

	    // Reset elements
	    $testRendering.find(".time-table li .value").each(function() {
	        $(this).html(`<span class="zero">측정 대기 중</span>`);
	    });

	    types.forEach(type => {
	        elements[type].$iframe.off("load").attr("src", "");
	        elements[type].$element.find(".page-time").show().html("0.000");
	        elements[type].$element.find(".intro").hide();
	        elements[type].$proBar.css({"width": "0%"});
	        elements[type].$result.html("");
	        elements[type].$result.hide();
	        elements[type].$pageTime.removeClass("complete");
	        elements[type].$pageTime.addClass("spinning");
	    });	    

	    const ITERATIONS = 5;
	    let currentIteration = 0;
	    let totalLoadTimes = { before: 0, after: 0 };

	    function runIteration() {
	        if (currentIteration >= ITERATIONS) {
	            calculateAverageAndCompare();
	            return;
	        }

	        currentIteration++;
	        console.log(`Starting iteration ${currentIteration} of ${ITERATIONS}`);

	        setTimeout(function() {
	            const loadPromises = types.map(type => {
	                return new Promise((resolve) => {
	                    const {$iframe, $proBar, $timeTable} = elements[type];
	                    const contentType = type === 'before' ? 1 : 2;
	                    
	                    $iframe.css({"opacity":"1.0"});
	                    iframes[type].startTime = performance.now();
	                    
	                    $iframe.on("load", function() {
	                        iframes[type].endTime = performance.now();
	                        iframes[type].loadTime = iframes[type].endTime - iframes[type].startTime;
	                        
	                        totalLoadTimes[type] += iframes[type].loadTime;
	                        
	                        animateNumber(`[data-type='${type}'] .page-time`, 0, iframes[type].loadTime/1000, iframes[type].loadTime, 3, "초");
	                        
	                        $proBar.animate({"width": "100%"}, iframes[type].loadTime, function(){
	                            const $pageTime = elements[type].$element.find(".page-time");
	                            $pageTime.removeClass('spinning');
	                            $pageTime.addClass("complete");
	                            const org_time = data.all[0][type === 'before' ? 'org_time' : 'new_time'];
	                            const mag = ((org_time - iframes[type].loadTime) / org_time).toFixed(2);
	                            
	                            $timeTable.find("li").each(function(){
	                                const $targetEle = $(this).find(".value");
	                                const orgTime = parseInt($(this).attr("data-org-time"));
	                                $targetEle.html(`<strong>${timeUnitFormatter(orgTime * mag)}</strong>`);
	                                if(orgTime == 0){
	                                    $targetEle.html(`<span class="zero">-</span>`);                               
	                                }
	                            });
	                            resolve();
	                        });
	                    });
	                    $iframe.attr("src", `/viewLogFile2?page_no=${page_no}&content_type=${contentType}`);
	                });
	            });

	            Promise.all(loadPromises).then(() => {
	                console.log(`Iteration ${currentIteration} completed`);
	                if (currentIteration < ITERATIONS) {
	                    runIteration();
	                } else {
	                    calculateAverageAndCompare();
	                }
	            });
	        }, 100);
	    }

	    function calculateAverageAndCompare() {
	        const avgLoadTimes = {
	            before: totalLoadTimes.before / ITERATIONS,
	            after: totalLoadTimes.after / ITERATIONS
	        };

	        console.log("Average load times:", avgLoadTimes);

	        const timeDifference = avgLoadTimes.before - avgLoadTimes.after;
	        const percentageImprovement = ((avgLoadTimes.before - avgLoadTimes.after) / avgLoadTimes.before * 100).toFixed(2);
	        
	        let resultMessage = "";
	        if (timeDifference > 0) {
	            resultMessage = `평균 ${timeUnitFormatter(timeDifference)} (${percentageImprovement}%) 감소`;
	        } else if (timeDifference < 0) {
	            resultMessage = `평균 ${timeUnitFormatter(Math.abs(timeDifference))} (${Math.abs(percentageImprovement)}%) 증가`;
	        } else {
	            resultMessage = "최적화 전후 평균 로딩 시간에 변화가 없습니다.";
	        }
	        
	        elements["after"].$result.html(`<strong>${resultMessage}</strong>`);
	        elements["after"].$result.fadeIn();
	        
	        console.log(resultMessage);
	    }

	    runIteration();
	});
	
	
	$("#testRendering").modal("show");
}

function getPageRenderingData(page_no){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/getPageRendering',
		data : {
			page_no : page_no,
	    	
		},
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


function measureImageLoadTimes($doc) {
    const $images = $doc.find('img');
    const $results = $('#results');
    $results.empty();

    $images.each(function() {
        const $img = $(this);
        const startTime = performance.now();
        
        $img.on('load', function() {
            const loadTime = performance.now() - startTime;
            $results.append(`<p>Image ${$img.attr('src')} loaded in ${loadTime.toFixed(2)} ms</p>`);
        });

        // Force reload the image to measure load time
        const src = $img.attr('src');
        $img.attr('src', '');
        $img.attr('src', src);
    });
}

pageFnc.updateTabulator = function (){
	let result = null;
	let currentData = table_resource.getData();
	for(let i = 0; i < currentData.length; i++){
		currentData[i].saving_rate = "";
	}
	$.ajax({
		type: 'POST',
		url: '/tabulatorUpdateInterval',
		contentType: 'application/json', // 데이터 형식을 JSON으로 지정
		data:JSON.stringify(currentData),
		async: false,
		success: function(res) {
			result = res.data;
			updateTable(result);
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	
	// 현재 진행 중인 리소스가 있는지 확인
	if(optimizingOrgData==undefined || optimizingOrgData.length < optimizingUpdateData.length){
		optimizingOrgData = selectResourceAllOptimizing(use_unstrfile);
	}
	optimizingUpdateData = selectResourceAllOptimizing(use_unstrfile);
	
	// 현재 진행 중인 리소스가 있는지 확인 (페이지 단위)
	if(optimizingOrgDataByPage==undefined || optimizingOrgDataByPage.length < optimizingUpdateDataByPage.length){
		optimizingOrgDataByPage = selectResourceAllOptimizingByPage(global.page_no);
	}
	optimizingUpdateDataByPage = selectResourceAllOptimizingByPage(global.page_no);
		
	// 해당 페이지 리소스 카운트
	const countItem = global.pageCountArray.find(item => item.page_no == global.page_no);
	let html = "";
	if(optimizingUpdateDataByPage.length > 0){ // 현재 페이지에서 최적화 진행 중인 데이터가 있을 때
	}else if(countItem != undefined && countItem.count != 0){ // 해당 페이지에 리소스가 0건 이상일 때만 버튼 출력
		html += `<button class="btn btn-sm btn-primary" onclick="pageFnc.executeOptimizeAllBtnEvent(this, {page_no : ${global.page_no}, resource_status : 0});"><ion-icon name="checkmark-done-circle" role="img" class="md hydrated"></ion-icon> 웹 페이지 최적화</button>`;
	}
	
	if(optimizingUpdateData.length > 0){ // status = 0 or 11
		html += `<button class="btn btn-sm btn-success" onclick="drawOptimizingModalBtnEvent();"><ion-icon name="checkmark-done-circle"></ion-icon> 최적화 현황 보기 (${optimizingUpdateData.length}건)</button>`;
	}else{
		// html += `<button class="btn btn-sm btn-primary" onclick="executeOptimizeAllBtnEvent(this, {});"><ion-icon name="checkmark-done-circle" role="img" class="md hydrated"></ion-icon> 전체 항목 최적화</button>`;
	}
	$(".optimize-button-container").html(html);
	
	// 모달이 켜져있으면 업데이트
	if($('#optimizingModal').is(':visible')){
		drawOptimizingModal();
	}
	
	return result;
}

pageFnc.executeOptimizeAllBtnEvent = function(button, param){
	Swal.fire({
		icon: "warning",
		title: "해당 페이지의 모든 웹 콘텐츠를<br />추천 알고리즘으로 최적화 하시겠습니까?",
		text: "",
		showCancelButton: true,
		confirmButtonColor: "#51d28c",
		cancelButtonColor: "#f34e4e",
		confirmButtonText: "실행",
		cancelButtonText: "취소",
		showClass: {
			popup: 'animate__animated animate__fadeIn animate__faster',
		},
		hideClass: {
			popup: 'animate__animated animate__fadeOut animate__faster',
		},        
	}).then(function(result) {
		if (result.value) { // 실행을 눌렀을 때만 동작
			updateResourceStatusByPageNo(param);
			Swal.fire({
				icon: "success",
				title: "최적화를 진행합니다.",
				text: "잠시 기다려 주세요.",	
				showClass: {
					popup: 'animate__animated animate__fadeIn animate__faster',
				},
				hideClass: {
					popup: 'animate__animated animate__fadeOut animate__faster',
				},         			
			});
		}
	});	
}
