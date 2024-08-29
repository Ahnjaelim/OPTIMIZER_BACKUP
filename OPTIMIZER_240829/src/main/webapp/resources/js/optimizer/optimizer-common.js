
var table_resource = null;
var scrollTop = 0;
var selectedRows = null;
const UNOPTIMIZED = `<span style="color:rgba(255,255,255,0.3);">최적화 전</span>`;
const UNCHECKED = `<span style="color:rgba(255,255,255,0.3);">측정 전</span>`;
const ERROR = `<span style="color:rgba(255,255,255,0.3);"><ion-icon name="alert-circle-outline"></ion-icon>오류</span>`;
let resource_type_sumo = null;
var detailData = null;
let global_algorithm_sn = 0;

let contGlobal = {};
contGlobal.currentData = null;

let use_unstrfile = 0;
if(fileManagerType == 2){
	use_unstrfile = 1
}

// 최적화 진행 중인 리소스 목록
var optimizingOrgData = selectResourceAllOptimizing(use_unstrfile);
var optimizingUpdateData = selectResourceAllOptimizing(use_unstrfile);
let optimizingOrgDataByPage = null;
let optimizingUpdateDataByPage = null;

/** 웹 콘텐츠별 최적화 페이지 초기화 * */
function optimizerByContentInit(){
	$('#explorer .content').jstree({
		'core' : {
			'data' : jsonData,
			'themes' : {
				"variant" : "large",
			}
		},
	    /*
		 * 'checkbox': { 'keep_selected_style': false // 선택된 스타일 유지 },
		 * 'plugins': ['checkbox', 'core'],
		 */
	}).on('select_node.jstree', function (e, data) { // 노드 클릭 이벤트
		var selectedNodeId = data.node.id;
		$("select[name=search_range]").val(1); // 폴더를 클릭하는 경우 강제로 폴더 검색으로 전환
		selectResourceListByParentId(data.node.id);
		// 폴더 경로 만들기 이벤트
		var node = data.node;
        var path = getFullPath(node);
        path.push({ id: node.id, text: node.text });

        var fullPathHtml = path.map(function(part) {
            return `<span data-id="${part.id}">${part.text}&nbsp;&nbsp;&nbsp;<ion-icon name="chevron-forward-outline"></ion-icon></span>`;
        });
            // }).join(' <ion-icon name="chevron-forward-outline"></ion-icon>
			// ');

        $('#jstree-path').html(fullPathHtml);
        resetAnchor();
		
	});
	
	// Event listener for path click
    $('#jstree-path').on('click', 'span', function() {
        var nodeId = $(this).data('id');
        $('#explorer .content').jstree('deselect_all');
        $('#explorer .content').jstree('select_node', nodeId);
    });	
	
	// jstree 카운트 초기화 문제 해결
	$('#explorer .content').on("click.jstree", ".jstree-ocl", function (e)  {
	    if ((this).parentElement.classList.contains('jstree-closed')) {
	    	selectedNode = ($(this).nextAll(".jstree-anchor").attr("id"))
		     var node = $('#JSTree').jstree("get_node", selectedNode);
	    	// console.log("닫힘"+node.id);
	     }else{
	    	 jstreeCountInit();
	    	 console.log("열림");
	    	 selectResourceListByParentId();
	     }
	})	
	
	setTimeout(function(){
		$('#explorer .content').jstree(true).open_all();	
	},1000);

	initSearch();
	
	setTimeout(function(){
		jstreeCountInit();
		selectResourceListByParentId();
		
		// 외부 링크 주소로 검색
		const resource_type = urlParams.get("resource_type");
		const resource_name = urlParams.get("resource_name");
		const resource_no = urlParams.get("resource_no");
		const resource_status = urlParams.get("resource_status");
		if(resource_type != null){
			$(`#type-array-item${resource_type}`).click();
		}
		if(resource_name != null && resource_no != null){
			$(`input[name="search_keyword"]`).val(resource_name);
		}
		if(resource_status != null){
			// $('#search-status-select').sumo[0].selectItem(1);
			$('#search-status-select').val(resource_status);
			$('#search-status-select')[0].sumo.reload();
		}
		setTimeout(function(){
			if(resource_name != null || resource_no != null || resource_status != null){
				searchSubmitBtnEvent();			
			}
			
		},300);
	},1000);

	// 타뷸레이터 업데이트 인터벌
	var tabulatorInterval = setInterval(function(){
		tabulatorUpdateInterval();
	}, 2000);
	
	setTimeout(function(){
		$('#preLoader').fadeOut(300);
	},2000);
	
	$(".jstree-node").on("click", function(){
		// console.log("열림 / 닫힘");
	});	
}

/** 폴더 경로 구하기 */
function getFullPath(node) {
    var tree = $('#explorer .content').jstree(true);
    var path = [];
    while(node.parent !== "#") {
        node = tree.get_node(node.parent);
        path.unshift({ id: node.id, text: node.text });
    }
    return path;
}

function jstreeCountInit(){
	$(".jstree .jstree-anchor").each(function(){
		if (!$(this).children(".count").length) {
			$(this).append(` <span class="count"></span>`);
		}
	});	
}

function selectResourceListByParentId(resource_parent_no){
	$("#volist").css({"opacity":"0"});
	let data = searchDataInit(resource_parent_no);
	let search_range = $("select[name=search_range]").val();
	
	// console.log("ajaxData", ajaxData);
	contGlobal.currentData = selectResourceListByParentIdAjax({update : 0, is_submenu : 1});
	// console.log("contGlobal.currentData", contGlobal.currentData);
	
	table_resource = new Tabulator("#volist", {
		height:"100%",
		selectable:false,
	    pagination:true, // enable pagination
	    paginationMode:"remote", // enable remote pagination
	    paginationSize:14, // 목록 크기
	    sortMode: "remote",
	    ajaxURL:"/selectResourceListByParentId", // set url for ajax request
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
	    	// console.log("page : "+this.getPage());
	    	// console.log("size : "+this.getSize());
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
	    					result = `<a style="cursor:pointer; opacity:0.3;" onclick="popoverSingleEvent({element : this, content : '해당 웹 콘텐츠는 원본 웹 콘텐츠가 이미 최적화된 상태이므로 원본 웹 콘텐츠를 사용합니다.', xaxis : 'right'});"><ion-icon name="help-circle-outline"></ion-icon>0.0%</a>`;
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
	    		title: "상세보기",
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
	table_resource.on("dataLoaded", function() {
		
		// 상위 디렉토리 만들기
		if(search_range != 0){
			setTimeout(function(){
				let parentDir = $("#volist .tabulator-row").eq(0).clone();
				parentDir.find(".tabulator-cell").html("");
				parentDir.find(`.tabulator-cell[tabulator-field="resource_type"]`).html("📁");
				parentDir.find(`.tabulator-cell[tabulator-field="resource_name"]`).html(`<ion-icon name="caret-up-circle-outline" style="font-size:1.2em;"></ion-icon> 상위 디렉토리`);
				let selectedNodeId = $('#explorer .content').jstree(true).get_selected()[0];
				let parentNode = $('#explorer .content').jstree(true).get_node(selectedNodeId).parent;
				console.log(`selectedNodeId : ${selectedNodeId} | parentNode : ${parentNode}`);
				if(selectedNodeId !== undefined && parentNode != "#"){
					$("#volist .tabulator-table").prepend(parentDir);
				}
				parentDir.on("click", function(){
					$('#explorer .content').jstree(true).deselect_all();
					$('#explorer .content').jstree(true).select_node(parentNode);
	
				});
			},100);
		}
		
		// 카운트
		let countArray = countResourceFolder();
		for(let i = 0; i < countArray.length; i++){
			let target = $(".jstree").find(`li#${countArray[i].resource_no} a`);
			if(target.length > 0){
				let zero = "";
				if(countArray[i].total_count == 0 && countArray[i].entire_count == 0){
					zero = "zero";
				}
				target.eq(0).find(".count").html(`<span class="number selected ${countArray[i].total_count == 0 ? `zero` : ``}">${comma(countArray[i].total_count)}</span>/<span class="number total">${comma(countArray[i].entire_count)}</span>`);
				target.eq(0).find(".count").addClass(zero);
			}
		}	
		
		// 버튼 만들기
		if ($(".optimize-button-container").length === 0) {
			let html = `<div class="optimize-button-container">
				<div class="spinner-grow m-1" role="status" style="color:var(--color-blue); width:24px; height:24px;">
				    <span class="sr-only">Loading...</span>
				</div>
			</div>`;
			$(".tabulator-footer-contents").append(html);
		}
		
		// 외부에서 들어오는 경우
		setTimeout(function(){
			const resource_type = urlParams.get("resource_type");
			const resource_name = urlParams.get("resource_name");
			const resource_no = urlParams.get("resource_no");		
			// const targetRow = table_resource.getData().find(row =>
			// row.resource_no == resource_no);
			let targetRow = null;
			let targetEle = null;
			for(let i = 0; i < table_resource.getRows().length; i++){
				if(table_resource.getRows()[i]._row.data.resource_no == resource_no){
					targetRow = table_resource.getRows()[i]._row;
					targetEle = table_resource.getRows()[i]._row.element;
				}
			}
			$(targetEle).find(`div[tabulator-field="detail_btn"] button`).click();
			
		},0);
		
		setTimeout(function(){
			$("#volist").animate({"opacity":"1.0"},200);
		},0);
		
	});

	// 상세보기 이벤트 걸기
	table_resource.on("cellClick", function(e, cell) {
	    if (cell.getField() === "detail_btn" || cell.getField() === "resource_name" || cell.getField() === "optimize_btn") {
	    	resourceDetailEvent(cell.getRow(), cell.getField());
	    }
	});			
}

function adjustHeight() {
	  var col2Height = $('#viwer').height();
	  $('#explorer').height(col2Height);
}

function resourceDetailEvent(row, field) {
	// console.log("field : "+field);
	selectedAlgorithm = 0;
	let html = drawResourceDetail(row.getData());
	const rowData = row.getData();
	const resource_parent_no = rowData.resource_parent_no;
    const $rowElement = $(row.getElement());
    const $detailElement = $rowElement.next(".resource-detail");
    const easing = "easeOutQuart";
    const duration = 500;
    if ($detailElement.length) { // 해당 행의 detail이 이미 열려 있는 경우
        $detailElement.stop().slideUp(duration, easing, function() {
            $detailElement.remove();
        });
    } else { // 해당 행의 detail이 없는 경우
    	$rowElement.after(html);
    	const $newDetail = $rowElement.next(".resource-detail");
    	$newDetail.stop().slideDown(duration, easing);
    	const $otherDetails = $(".resource-detail").not($newDetail);
    	$otherDetails.stop().slideUp(duration, easing, function(){
    		$otherDetails.remove();
    	});
    	drwaResourceDetailEventInit();
    	if(field == "optimize_btn"){
    		// $(".opt-manage-btn").click();
    	}
    }
    
    resetAnchor();
    $(`#${resource_parent_no}_anchor`).addClass("active");
    
}

function resetAnchor(){
	const $anchorList = $(".jstree-anchor");
    $anchorList.each(function(){
    	$(this).removeClass("active");
    });	
}

function drawResourceDetail(data){
	detailData = JSON.parse(JSON.stringify(data)); // 원본 데이터에 영향이 안가게 복사
    const resource_no = data.resource_no;	
    const resource_type = data.resource_type;
    const resource_status = statusArray.find(item => item.value === data.resource_status);
	const size1 = data.resource_new_size_type1;
	const size2 = data.resource_new_size_type2;
	
	let offOptBtn = ``;
	if(resource_status.value == 1){
		offOptBtn = `<button class="btn btn-sm btn-danger off-opt-btn" onclick="disableOptimizeBtnEvent(this, {resource_no : ${resource_no}, resource_status : ${resource_status.value}});">최적화 해제</button>`
	}

    // 알고리즘
    const algorithmItem = findAlgorithmBySn(data.algorithm_sn);
    const algorithm_sn = data.algorithm_sn;
    global_algorithm_sn = 0;
    if(algorithm_sn != '' && algorithm_sn != null && algorithm_sn != undefined && algorithm_sn != 0){
    	global_algorithm_sn = algorithm_sn;    	
    }
    let appliedAlgorithm = null;
    let datailAlgorithmArray = [
    	{
    		resource_type : parseInt(data.resource_type1),
    		resource_type_display : data.resource_type1_display,
    		resource_type_size : data.resource_type1_size,
    		resource_type_time : data.resource_type1_time,
    		resource_type_url : data.resource_type_url1,
    		algorithm_name : findAlgorithmBySn(parseInt(data.resource_type1)).algorithm_name,
    		algorithm_desc : findAlgorithmBySn(data.resource_type1).algorithm_desc,
    	},
    	{
    		resource_type : parseInt(data.resource_type2),
    		resource_type_display : data.resource_type2_display,
    		resource_type_size : data.resource_type2_size,
    		resource_type_time : data.resource_type2_time,
    		resource_type_url : data.resource_type_url2,
    		algorithm_name : findAlgorithmBySn(data.resource_type2).algorithm_name,
    		algorithm_desc : findAlgorithmBySn(data.resource_type2).algorithm_desc,
    		
    	},
    	{
    		resource_type : parseInt(data.resource_type3),
    		resource_type_display : data.resource_type3_display,
    		resource_type_size : data.resource_type3_size,
    		resource_type_time : data.resource_type3_time,
    		resource_type_url : data.resource_type_url3,
    		algorithm_name : findAlgorithmBySn(data.resource_type3).algorithm_name,
    		algorithm_desc : findAlgorithmBySn(data.resource_type3).algorithm_desc,
    	},
    	{
    		resource_type : parseInt(data.resource_type4),
    		resource_type_display : data.resource_type4_display,
    		resource_type_size : data.resource_type4_size,
    		resource_type_time : data.resource_type4_time,
    		resource_type_url : data.resource_type_url4,
    		algorithm_name : findAlgorithmBySn(data.resource_type4).algorithm_name,
    		algorithm_desc : findAlgorithmBySn(data.resource_type4).algorithm_desc,
    	},
    ];
    
    
    if(algorithm_sn != 0){
    	appliedAlgorithm = datailAlgorithmArray.find(item => item.resource_type == algorithm_sn);
    	appliedAlgorithm.compRate = ((1-(appliedAlgorithm.resource_type_size/data.resource_org_size)) * 100).toFixed(2);
    	appliedAlgorithm.reduRate = (1-appliedAlgorithm.compRate)/100*-1;	
    }
    
    let updt_dt = "알 수 없음";
    if(data.updt_dt && data.updt_dt!=null){
    	updt_dt = data.updt_dt.slice(0, 19);
    }

    let html = `<div class="resource-detail" style="display:none;" data-resource-no="${resource_no}">`;
    if(data.resource_status != 1){
    	html += `<div style="padding:10px 20px 10px 20px; text-align:center; background:rgba(255,255,255,0.1); margin: -20px -20px 20px -20px; font-size:12px;">해당 내용은 최적화 전 미리보기로 해당 알고리즘으로 최적화 버튼으로 최적화를 실행해야 실제 웹 서비스에 반영됩니다.</div>`;
    }
    html += `
    	<h3>${data.resource_name} 상세보기 ${printResourceStatus(resource_status.value)} ${offOptBtn}</h3>
    	<p class="updt_dt"><ion-icon name="location-outline" style="position:relative; top:2px;"></ion-icon> 파일 경로 ${data.resource_org} <span style="color:rgba(255,255,255,0.1);">|</span> <ion-icon name="time-outline"></ion-icon> 마지막 업데이트 ${updt_dt}</p>`;
    let algorithmTabHtml = "";
    let algorithmContentHtml = "";
	
    for(let i = 0; i < datailAlgorithmArray.length; i++){
    	if(datailAlgorithmArray[i].resource_type != null && datailAlgorithmArray[i].resource_type != "" && !Number.isNaN(datailAlgorithmArray[i].resource_type)){
    		const algorithm = datailAlgorithmArray[i];
    		let reductionRate = (((size1 - algorithm.resource_type_size)/size1)*100).toFixed(1);

    		let applied = false;
    		if(algorithm.resource_type == algorithm_sn || (algorithm_sn == 0 && i == 0)){
    			applied = true;
    			let appliedIcon = ``;
    			if(algorithm_sn != 0){
    				appliedIcon = ` <ion-icon name="checkmark-circle"></ion-icon>`;
    			}
    			algorithmTabHtml += `<button data-algorithm-sn="${algorithm.resource_type}" class="active applied">${algorithm.algorithm_name}${appliedIcon}</button>`;
    		}else{
    			algorithmTabHtml += `<button data-algorithm-sn="${algorithm.resource_type}">${algorithm.algorithm_name}</ion-icon></button>`;    			
    		}
    		let appliedAlgorithm = false;
    		if(algorithm.resource_type == algorithm_sn && algorithm_sn != 0){
    			appliedAlgorithm = true;
    		}
    		if(data.resource_status != 1){
    			appliedAlgorithm = false;
    		}
    		
    		// 동영상, 폰트 파일은 미리보기 삭제
    		let noPreview = "";
    		if(resource_type == 2 || resource_type == 4 || resource_type > 4){
    			previewYN = "no-preview";
    		}else{
    			previewYN = "preview";
    		}
    		algorithmContentHtml += `<div class="resource-preview-container ${previewYN}" ${applied ? `style="display:block";` : ''} data-algorithm-sn="${algorithm.resource_type}"  data-resource-type="${resource_type}">
    			<div class="d-flex resource-preview" style="width:100%">
    				<div class="col col1" style="position:relative;">`;
    		
    		let viewOrgBtn1 = ``;
    		let viewOrgBtn2 = ``;
    		switch(resource_type){
	    		case 1 :
	    			let afterImage = ``;
	    			let afterLabel = `최적화 후`;
	    			if(algorithm.resource_type_url.length > 0){
	    				afterImage = `<img src="view.do?image_path=${algorithm.resource_type_url}&image_name=" width="100%" />`;
	    			}else{
	    				afterImage = `<img src="view.do?image_path=${data.resource_new_type1}&image_name=" width="100%" style="opacity:0.8;" />`;
	    				afterLabel = `(미리보기는 최적화 실행 후 확인할 수 있습니다.)`;
	    			}
	    			algorithmContentHtml += `
	    			<div class="slider-container">
		    			<img-comparison-slider class="slider-relative-size" style="opacity:0;">
							<figure slot="first" class="before">
								<img src="view.do?image_path=${data.resource_new_type1}&image_name=" width="100%" />
							</figure>	
							<figure slot="second" class="after">
								${afterImage}
							</figure>    
							<svg slot="handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
								<path stroke="#fff" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#fff" vector-effect="non-scaling-stroke"></path>
							</svg>
		    			</img-comparison-slider>
						<div class="slider-legend d-flex">
							<div class="before col">최적화 전</div>
							<div class="after col">${afterLabel}</div>
						</div>
					</div>    			
	    			`;
	    			viewOrgBtn1 = `<a href="view.do?image_path=${data.resource_new_type1}&image_name=" class="thumb preview-thumb image-popup"><ion-icon name="search-outline"></ion-icon> 미리보기</a>`;
	    			viewOrgBtn2 = `<a href="view.do?image_path=${algorithm.resource_type_url}&image_name=" class="thumb preview-thumb image-popup"><ion-icon name="search-outline"></ion-icon> 미리보기</a>`;	
	    			break;
	    			
	    		case 2 : // 동영상
	    			algorithmContentHtml += ``;
	    			break;
	    			
	    		case 3 : // 텍스트
	    			let text1 = escapeHtml(sendRequestToController(`/view?path=${data.resource_new_type1}`));
	    			let text2 = escapeHtml(sendRequestToController(`/view?path=${algorithm.resource_type_url}`));
	    			let skip = ``;
	    			if(text2.length > 1500){
	    				skip = `...(이하 생략)`;
	    			}
	    			algorithmContentHtml += `<pre class='line-numbers language-html code-block'><code class='language-html'>${text2.slice(0, 1500).trim()}${skip}</code></pre>`;	
	    			break;	
	    			
	    		case 4 : // 폰트
	    			algorithmContentHtml += ``;
	    			break;
	    		
	    		default :
    		}
    		
    		algorithmContentHtml += `</div>
    	    	<div class="col col2">
    	    		<div class="col-desc">
	    	    		<h4>알고리즘 개요${appliedAlgorithm ? ` (적용 중)` : ``}</h4>
	    	    		<div class="desc-content break-all ${appliedAlgorithm ? `applied` : ``}" >${algorithm.algorithm_desc}<br />${data.etc.length > 0 && data.resource_type != 9 ? `<span style="color:var(--color-yellow);">${data.resource_name} 문서에 포함된 ${data.etc}</span>` : ``}</div>
	    				<h4>용량 최적화</h4>
	    	    		<div class="desc-content-table">
	    	    			<table>
	    	    			<colgroup>
				    			<col width="50%" />
				    			<col width="50%" />
	    	    			</colgroup>
	    	    			<thead>
	    	    			<tr>
	    	    				<th>최적화 전</th>
	    						<th class="after">최적화 후</th>
	    	    			</tr>
	    	    			</thead>
	    	    			<tbody>
	    	    			<tr>
	    						<td style="border-bottom:none;">
	    							<strong>${fileSizeUnitFormatter(size1)}</strong>
	    						</td>
	    						<td class="after" style="border-bottom:none;">`;
    		
    								console.log("algorithm.resource_type_url.length", algorithm.resource_type_url.length, "resource_type_url", algorithm.resource_type_url);
    								if(algorithm.resource_type_url.length > 0){
    									let algorithmSizeDiff = size1 - algorithm.resource_type_size;
    									let resultEffect = "경량";
    									if(algorithmSizeDiff < 0){
    										algorithmSizeDiff = algorithmSizeDiff*-1; 
    										algorithmSizeDiff = fileSizeUnitFormatter(algorithmSizeDiff);
    										resultEffect = "증가";
    										reductionRate = ((algorithm.resource_type_size - size1)/size1)*100;
    										reductionRate = reductionRate.toFixed(1);
    									}else{
    										algorithmSizeDiff = fileSizeUnitFormatter(algorithmSizeDiff);
    									}
    									algorithmContentHtml +=`<strong>${fileSizeUnitFormatter(algorithm.resource_type_size)}</strong><br /><span class="text-box">${algorithmSizeDiff} ${reductionRate}<sub>%</sub> ${resultEffect}</span><br />`;    									
    								}else{
    									algorithmContentHtml += `<span style="color:rgba(255,255,255,0.3);">(최적화 실행 후<br />확인할 수 있습니다.)</span>`;
    								}
    		algorithmContentHtml +=`</td>
	    	    			</tr>`;
    		if(resource_type >= 5){
    			algorithmContentHtml += `
    				<tr>
	    				<td style="border-top:none; padding:0px 0px 15px 0px;"><a class="exe-opt-btn btn-inline custom-btn" href="getResource?path=${data.resource_new_type1}&name=${data.resource_name}"><i class="fa-solid fa-file-arrow-down"></i> 원본 파일 다운로드</a></td>
	    				<td class="after" style="border-top:none; padding:0px 0px 15px 0px;">
	    					${resource_status.value == 1 ? `<a class="exe-opt-btn btn-inline custom-btn" href="getResource?path=${data.resource_new_type2}&name=${data.resource_name}"><i class="fa-solid fa-file-arrow-down"></i> 최적화 파일 다운로드</a>` : `&nbsp;`}
	    				</td>
    				</tr>
    			`;
    		}
    		algorithmContentHtml += `
	    	    			</tbody>
	    	    			</table>
	    	    		</div>
    		    	</div>`;
    		
    		    	/*
					 * `<h4>개선 사항 시각화</h4> <div class="reduction-chart
					 * desc-content"> <p class="tit">원본 파일
					 * ${fileSizeUnitFormatter(size1)} ${viewOrgBtn1}</p>
					 * <p class="chart">&nbsp;</p> <p class="tit">최적화 파일
					 * ${fileSizeUnitFormatter(algorithm.resource_type_size)}
					 * ${viewOrgBtn1}</p> <div class="chart chart-bg"><p class="chart after" style="width:${100-reductionRate}%">&nbsp;</p></div>
					 * </div>`;
					 */
    		if(resource_type <= 4){
    			if(appliedAlgorithm){ // 현재 적용 중인 알고리즘이면 버튼 삭제
    			}else{
    				algorithmContentHtml += `<button class="btn btn-primary btn-sm exe-opt-btn custom-btn btn-11" onclick="executeOptimizeBtnEvent(this, {resource_no : ${resource_no}, resource_status : ${resource_status.value}, algorithm_sn : ${algorithm.resource_type}});"><i class="fa-solid fa-feather-pointed"></i> 해당 알고리즘으로 최적화</button>`;    				
    			}
    		}else if(resource_type <= 9){
    			let optBtn = `<div style="padding:15px 0px 0px 0px; text-align: center;"><button class="exe-opt-btn btn-inline custom-btn btn-11" onclick="executeOptimizeBtnEvent(this, {resource_no : ${resource_no}, resource_status : ${resource_status.value}, algorithm_sn : ${algorithm.resource_type}});"><i class="fa-solid fa-feather-pointed"></i> 최적화 적용</button></div>`;
    			let down1Btn = ``;
    			let down2Btn = ``;
    			if(resource_status.value == 1){
    				optBtn = ``;
    			}else{
    				
    			}

    			algorithmContentHtml += `${optBtn}`;
    		}
    		algorithmContentHtml += `</div>
    		</div>
    		</div>`;         		
    	}
	}
    let info = ``;
    if(resource_type <= 4){
    	info = ` <span class="desc"><ion-icon name="checkmark-circle"></ion-icon> 표시는 현재 적용 중인 알고리즘입니다.</span>`;
    }
	html += `<div class="algorithm-tab">
				${algorithmTabHtml}${info}
			</div>
			<div class="algorithm-content">${algorithmContentHtml}</div>
		</div>`;    	

    return html;
}

function drwaResourceDetailEventInit(){
	popoverInit();
	
	// 라이트 박스 초기화
	const lightbox=GLightbox({selector:".image-popup",
		title:!1,
		touchNavigation: false,
		prevSlide: false, 
		nextSlide: false
	}),lightboxDesc=GLightbox({selector:".image-popup-desc"}),lightboxvideo=GLightbox({selector:".image-popup-video-map",title:!1});

	// 이미지인 경우 슬라이더 초기화
	let heightOver = false;
	if($("img-comparison-slider").length > 0){
		setTimeout(function(){
			const height = $(".resource-preview-container").first().height()-40;
			$("img-comparison-slider").find("img").each(function(){
				console.log("height : "+$(this).height());		
				if($(this).height() > height){
					heightOver = true;
				}
			});
			if(heightOver){
				const $targetImg = $("img-comparison-slider").find("img").first();
				const width = (height * $targetImg.width()) / $targetImg.height();
				console.log("width",width);
				$("img-comparison-slider").find("img").css({"width": width + "px", "height": height + "px"});
			}
			$("img-comparison-slider").stop().animate({"opacity":"1.0"});
		},1000);		
	}
	
	// 텍스트인 경우
	if($(".code-block").length > 0){
		Prism.highlightAll();		
		setTimeout(function(){
			const descHeight = $(".resource-preview-container").first().find(".col-desc").height()+43;	
			$(".code-block").css({"height":descHeight+"px"});
			$(".code-block").animate({"opacity":"1.0"});
		},500);
	}
	
	$(".algorithm-tab button").each(function(){
		$(this).click(function(){
			const algotithm_sn = $(this).attr("data-algorithm-sn");
			const $targetEle = $(`.resource-preview-container[data-algorithm-sn=${algotithm_sn}]`);
			$(".algorithm-tab button").removeClass("active");
			$(this).addClass("active");
			$(".resource-preview-container").css({"display":"none"});
			$targetEle.stop().fadeIn(150);
			$targetEle.css({"z-index":"2"});
		});
	});

	if($(".algorithm-tab button.applied").length > 0){
	}else{
		setTimeout(function(){
		});		
	}
}

/** 검색 데이터 초기화 */
function searchDataInit(resource_parent_no){
	if(resource_parent_no == null || resource_parent_no == "undefined"){
		resource_parent_no = 0;
	}
	let search_disable = 0;
	
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
    
    // console.log(resource_status_array);
	let search_range = $("select[name=search_range]").val();
	let search_keyword = $("input[name=search_keyword]").val();
	
	// 페이지 검색 추가
	let search_page = $("input[name=search_page]").val();
	if (search_page.trim() !== "") {
	    let page = selectPageByPageNo(search_page);
	    let page_name = page.page_name;
	    $("input[name=page_name]").val(page_name);
	}

	let data = {
			size: 15,
	    	resource_parent_no : resource_parent_no,
	    	resource_status_array : resource_status_array,
	    	resource_type_array : resource_type_array,
	    	search_range : search_range,
	    	search_keyword : search_keyword,
	    	search_disable : search_disable,
	    	search_page : search_page,
	    	filemanager_type : fileManagerType,
	    };	
	return data;
}

function initSearch() {
	
	// statusArray 뿌리기
	let html = "";
	for(let i = 0; i < statusArray.length; i++){
		html += `<option value="${statusArray[i].value}">${statusArray[i].label}</option>`;
	}
	$("#search-status-select").html(html);
	resource_type_sumo = $('#search-status-select').SumoSelect({
		placeholder: '웹 콘텐츠 상태를 선택하세요',
		captionFormat: '{0} 개 선택',
		arrow: true,
	});
	// sumoselect 아이콘 수동 추가
	for(let i = 0; i < statusArray.length; i++){
		$(".search-container .SumoSelect>.optWrapper>.options li").eq(i).find("label").prepend(`<ion-icon name="${statusArray[i].icon}"></ion-icon> `);
	}
	
	html = `<input type="radio" class="btn-check" name="resource_type" id="type-array-item11" autocomplete="off" value="99" checked />
			<label class="btn btn-outline-primary" for="type-array-item11">전체 보기</label>`;
	// typeArray 뿌리기
	for(let i = 0; i < typeArray.length; i++){
		// let icon = `<i class="fas fa-${typeArray[i].icon}"></i>`;
		let icon = `<i class="fas fa-${typeArray[i].icon}"></i>`;
		let displayNone = "";
		if(typeArray[i].icon_type == "img"){
			icon = `<img src="/resources/img/${typeArray[i].icon}" />`;
		}
		if(typeArray[i].icon_type == "ion-icon"){
			icon = `<ion-icon name="${typeArray[i].icon}"></ion-icon>`;
		}
		if((fileManagerType===1 && typeArray[i].value > 4) || (fileManagerType===2 && typeArray[i].value < 5)){
			displayNone = `d-none`;
		}
		html += `<input type="radio" class="btn-check" name="resource_type" id="type-array-item${typeArray[i].value}" autocomplete="off" value="${typeArray[i].value}">
			<label class="btn btn-outline-primary ${displayNone}" for="type-array-item${typeArray[i].value}">${icon} ${typeArray[i].label}</label>`;
	}
	$(".search-type").html(html);
	
	// searchCheckboxEvent("resource_status");
	searchCheckboxEvent("resource_type");
	searchMultiSelectEvent();
}

function searchCheckboxEvent(inputName){
    $(`input[name="${inputName}"]`).change(function(){
        
        // 체크된 체크박스의 value와 label 가져오기
        const checkedValue = $(this).val();
        const checkedLabel = $(`label[for="${$(this).attr('id')}"]`).text();
        
        // 체크박스가 체크되었는지 확인
        const isChecked = $(this).prop('checked');
        
        $("select[name=search_range]").val(0); // 유형별 선택이므로 강제 전체 선택 설정
        let selectedNodeId = $('#explorer .content').jstree(true).get_selected()[0];
        if(parseInt(checkedValue)==99){
        	$("#explorer .content").jstree(true).deselect_all();
        	selectResourceListByParentId();
        }else{
        	selectResourceListByParentId(selectedNodeId);        	        	
        }
    });
    $(`input[name="${inputName}"]`).each(function(){
    	$(this).click(function(){
    		console.log("value : "+$(this).val());  
    		$("#explorer .content").jstree(true).deselect_all();
    		resetAnchor();
    	});
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
        selectResourceListByParentId(selectedNodeId);
    });
}

function filterResetBtnEvent(){
	$('.remove-button').remove();
	$('.search-criteria-filter input[type="checkbox"]').prop('checked', false);
	$("input[name='search_keyword']").val("");
	$("input[name='search_page']").val("");
	$("input[name='page_name']").val("");
    let selectedNodeId = $('#explorer .content').jstree(true).get_selected()[0];
    selectResourceListByParentId(selectedNodeId);	
}

function searchEnterEvent(){
    if (event.keyCode === 13) { // Enter 키의 keyCode는 13입니다.
    	searchSubmitBtnEvent();
        return false; // 폼 제출 방지
    }
    return true;	
}

function searchSubmitBtnEvent(){
	let selectedNodeId = $('#explorer .content').jstree(true).get_selected()[0];
    selectResourceListByParentId(selectedNodeId);	
}


function searchResourceList(){
	let selectedNodeId = $('#explorer .content').jstree(true).get_selected()[0];
	let objectArray = selectResourceAllByPageNo(selectedNodeId);
	let searchTerm = $('#search-resource-name').val();
	if(searchTerm !== "" && searchTerm !== undefined && searchTerm !== null){
		// console.log("검색어 있음");
		objectArray = objectArray.filter(function(item) {
	        return item.resource_name.toLowerCase().includes(searchTerm);
	    });	
	}
	
	let html = "";
	let order1Array = [];
	let order2Array = [];
	for(let i = 0; i < objectArray.length; i++){
		let resource_org = objectArray[i].resource_org;
		let targetElement = $("#viewer").find(`[data-resource-org="${resource_org}"]`);
		if(targetElement.length > 0){
			order1Array.push(objectArray[i]);
		}else{
			objectArray[i].class_name = "nolink";
			order2Array.push(objectArray[i]);
		}
	}
	let reorderArray = order1Array.concat(order2Array);

	for(let i = 0; i < reorderArray.length; i++){
		let resource_type = "";
		switch(reorderArray[i].resource_type){
			case 1 : resource_type = "🖼️"; break;
			case 2 : resource_type = "🎥"; break;
			case 3 : resource_type = "📄"; break;
			case 4 : resource_type = "🅰️"; break;
		}
		let dot = "";
		if(reorderArray[i].resource_name.length > 24){
			dot = "...";
		}
		// html += `<li data-resource-org="${reorderArray[i].resource_org}"
		// data-resource-seq="${i}"
		// class="${reorderArray[i].class_name}">${resource_type}
		// ${reorderArray[i].resource_name.substring(0, 18)}${dot} <span
		// style="color:rgba(255,255,255,0.3);">(5회)</span><button
		// onclick="drawResourceModal(${reorderArray[i].resource_no});"><ion-icon
		// name="add-circle"></ion-icon></button></li>`;
		html += `<li data-resource-org="${reorderArray[i].resource_org}" data-resource-seq="${i}" class="${reorderArray[i].class_name}"><a>${resource_type} ${reorderArray[i].resource_name.substring(0, 18)}${dot} <span style="color:rgba(255,255,255,0.3);"></span></a><button onclick="shortcutBtnEvent({resource_name : '${reorderArray[i].resource_name}', resource_no : ${reorderArray[i].resource_no}});">바로가기</button></li>`;
	}
	
	// return html;
	$("#resourceList .content .resource-list").html(html);
		
}

function shortcutBtnEvent(param){
	if(!param){
		console.error("잘못된 접근입니다.");
		return;
	}
	Swal.fire({
		icon: "question",
		title: "해당 웹 콘텐츠의 상세보기로 이동하시겠습니까?",
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
	    if (result.isConfirmed) {// 사용자가 확인(실행) 버튼을 클릭했을 때만 실행됩니다.
	    	location.href=`/optimizerByContent?resource_name=${param.resource_name}&resource_no=${param.resource_no}`;
	    }
	});	
}

function searchResourceListEnterEvent(event){
    if (event.key === 'Enter') {
        // Enter 키 눌렀을 때 실행할 동작
        searchResourceList(); // 입력된 검색어를 처리하는 함수 호출
    }	
}

function clearResourceList(){
	$('#search-resource-name').val("");
	searchResourceList();
}

function fullscreenPreviewerClose(){
	$("#fullscreenPreviewer").find("iframe").attr("src", "");
	$("#fullscreenPreviewer").fadeOut(100);
	$("body").css({"overflow":"auto", "padding-right":"0px"});
}

function resourcePrintByType(object){
	// console.log("===== 출력 =====");
	// console.log(object);
	let result = {};

	switch(object.resource_type){
		case 1 : // 이미지
			result = {
				col1 : `<a href="view.do?image_path=${object.resource_new_type1}&image_name=" class="thumb preview-thumb image-popup"><img src="view.do?image_path=${object.resource_new_type1}&image_name=" style="width:100%; max-height:600px;" /></a>`,
				col2 : `<a href="view.do?image_path=${object.resource_new_type2}&image_name=" class="thumb preview-thumb image-popup"><img src="view.do?image_path=${object.resource_new_type2}&image_name=" style="width:100%; max-height:600px;" /></a>`, 
				
			} 
			break;
		case 2 : // 동영상
			result = {
				col1 : `<video id="my-video" class="video-js" controls preload="auto" width="100%" data-setup="{}" style="width:100%; height:auto;">
						<source src="view.do?image_path=${object.resource_new_type1}&image_name=" type="video/mp4">
						</video>`,
				col2 : `<video id="my-video" class="video-js" controls preload="auto" width="100%" data-setup="{}" style="width:100%; height:auto;">
						<source src="view.do?image_path=${object.resource_new_type2}&image_name=" type="video/mp4">
						</video>`,
						
			}
			break;
		case 3 : // 텍스트
			let text1 = escapeHtml(sendRequestToController(`/view?path=${object.resource_new_type1}`));
			let text2 = escapeHtml(sendRequestToController(`/view?path=${object.resource_new_type2}`));
			result = {
				col1 : `<div class="codeblock h-100">${text1.slice(0, 500)}</div>`,
				col2 : `<div class="codeblock h-100">${text2.slice(0, 500)}</div>`,
				
			}
			break;			
		case 4 : // 폰트
			result = {
				col1 : `<div style="text-align:center; background:url('/resources/img/font-before.png') no-repeat center center; height:200px; position:relative;"><p style="position:absolute; top:50%; left: 50%; transform:translate(-50%, -50%);">폰트 파일은 미리보기를 지원하지 않습니다.</p></div>`,
				col2 : `<div style="text-align:center; background:url('/resources/img/font-after.png') no-repeat center center; height:200px; position:relative;"><p style="position:absolute; top:50%; left: 50%; transform:translate(-50%, -50%);">폰트 파일은 미리보기를 지원하지 않습니다.</p></div>`,
			}
			break;					
	}
	if(!nullCheck(object.resource_new_type1)){result.col1 = `<div class="text">아직 해당 웹 콘텐츠가 스캔되지 않았습니다.</div>`;}
	if(!nullCheck(object.resource_new_type2)){result.col2 = UNOPTIMIZED;}
	if(object.resource_org_size < 0){
		result.col1 = `<div class="text">해당  웹 콘텐츠를 찾지 못했습니다.</div>`;
		result.col2 = `<div class="text">해당  웹 콘텐츠를 찾지 못했습니다.</div>`;
	}
	return result;
}

function tabulatorUpdateInterval(){
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
			// console.log(result);
			
		},
	    error: function onError (error) {
	        //console.error(error);
	    }
	});
	
	let html = "";
	
	// 현재 진행 중인 리소스가 있는지 확인
	if(optimizingOrgData==undefined || optimizingOrgData.length < optimizingUpdateData.length){
		optimizingOrgData = selectResourceAllOptimizing(use_unstrfile);
	}
	optimizingUpdateData = selectResourceAllOptimizing(use_unstrfile);
	
	// 현재 검색된 데이터 확인
	contGlobal.currentData = selectResourceListByParentIdAjax({update : 0, is_submenu : 1});
	const filteredCurrentData = contGlobal.currentData.data.filter(item => item.resource_status == 0 || item.resource_status == 11);
	if(filteredCurrentData.length > 0){
	}else{
		// html += `<button class="btn btn-sm btn-primary" onclick="optimizeSelectedItemBtnEvent(this, {});"><ion-icon name="checkmark-done-circle" role="img" class="md hydrated"></ion-icon> 현재 항목 최적화</button>`;			
	}
	
	if(optimizingUpdateData.length > 0){ // status = 0 or 11
		html += `<button class="btn btn-sm btn-success" onclick="drawOptimizingModalBtnEvent();"><ion-icon name="checkmark-done-circle"></ion-icon> 최적화 현황 보기 (${optimizingUpdateData.length}건)</button>`;
	}else{
		// html += `<button class="btn btn-sm btn-primary" onclick="executeOptimizeAllBtnEvent(this, {});"><ion-icon name="checkmark-done-circle" role="img" class="md hydrated"></ion-icon> 전체 항목 최적화</button>`;
		html += `<button class="btn btn-sm btn-primary" onclick="optimizeSelectedItemBtnEvent(this, {});"><ion-icon name="checkmark-done-circle" role="img" class="md hydrated"></ion-icon> 전체 항목 최적화</button>`;
	}
	$(".optimize-button-container").html(html);
	
	// 모달이 켜져있으면 업데이트
	if($('#optimizingModal').is(':visible')){
		drawOptimizingModal();
	}
	
	return result;
}

function updateTable(result){
	let rows = table_resource.getRows();
	for(let i = 0; i < result.length; i++){
		let filteredRows = rows.filter(function(row) {
		    return row.getData().resource_no === result[i].resource_no;
		});
		if (filteredRows.length > 0) {
		    let foundRowData = filteredRows[0].getData(); // 첫 번째 일치하는 행의 데이터
															// 가져오기
	        let foundRow = filteredRows[0];
	        let currentData = foundRow.getData();
	        let updatedData = Object.assign({}, result[i]);
	        updatedData.row_no = currentData.row_no; // row_no 컬럼 원래 값 할당
	        if(currentData.resource_type > 0){ // 폴더가 아닌 경우만 업데이트
	        	foundRow.update(updatedData);	
	        	foundRow.reformat();
	        }
	        // 세부 내용이 열려 있으면 업데이트
	        if($(`.resource-detail[data-resource-no="${currentData.resource_no}"]`).length > 0){
	        	let isDataEqual = detailData.resource_status == currentData.resource_status;
	        	let isConditionEqual = detailData.resource_condition == currentData.resource_condition;
	        	if(!isDataEqual || !isConditionEqual){
	        		let updateDetail = drawResourceDetail(currentData);
	        		let $tempDiv = $('<div>').html(updateDetail); // HTML 문자열을
																	// jQuery
																	// 객체로 변환
	        		let innerHTML = $tempDiv.find('.resource-detail').html(); 
	        		$(`.resource-detail[data-resource-no="${currentData.resource_no}"]`).html(innerHTML);
	        		drwaResourceDetailEventInit();
	        		// detailData = currentData;
	        	}
	        }
		} else {
		    console.log("해당 값의 행을 찾을 수 없습니다.");
		}				
	
	}	
}

function disableOptimizeBtnEvent(button, param){
	let resource_no = param.resource_no;
	let resource_status = param.resource_status;
	if(resource_status==2){
		return;
	}else{
		Swal.fire({
			icon: "warning",
			title: "최적화를 해제하시겠습니까?",
			text: "최적화 후 해당 웹 콘텐츠는 원본으로 호출됩니다.",
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
			if (result.value) {
				let data = {resource_no : resource_no, resource_status : 2};
				let resultCode = updateResourceStatusByResourceNo(data);
				if(resultCode == 1){
					Swal.fire({
						icon: "success",
						title: "최적화를 해제했습니다.",
						text: "해당 웹 콘텐츠는 원본 데이터로 호출됩니다.",
						showClass: {
							popup: 'animate__animated animate__fadeIn animate__faster',
						},
						hideClass: {
							popup: 'animate__animated animate__fadeOut animate__faster',
						},         			
					});
					
				}else{
					Swal.fire({
						icon: "error",
						title: "최적화 해제에 실패했습니다!",
						text: "",
						showClass: {
							popup: 'animate__animated animate__fadeIn animate__faster',
						},
						hideClass: {
							popup: 'animate__animated animate__fadeOut animate__faster',
						},         			
					});       		
				}
				
			}
		});
	}
}



function executeOptimizeBtnEvent(button, param){
	let resource_no = param.resource_no;
	let resource_status = param.resource_status;
	let algorithm_sn = param.algorithm_sn;
	// let algorithm_sn = $("#manageOptimizationModal .tab
	// .active").attr("data-algorithm-sn");
	// console.log(algorithm_sn);
	Swal.fire({
		icon: "warning",
		title: "해당 알고리즘으로<br />최적화를 진행하시겠습니까?",
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
		if (result.value) {
			let data = {resource_no : resource_no, 
					resource_status : 0,
					algorithm_sn : algorithm_sn
			};
			let resultCode = updateResourceStatusByResourceNo(data);
			optimizingOrgData = selectResourceAllOptimizing(use_unstrfile);
			if(resultCode == 1){
				Swal.fire({
					icon: "success",
					title: "최적화를 진행합니다. ",
					text: "잠시 기다려 주세요.",				
					showClass: {
						popup: 'animate__animated animate__fadeIn animate__faster',
					},
					hideClass: {
						popup: 'animate__animated animate__fadeOut animate__faster',
					},         			
				});
			}			
		}
	});	
}

function executeOptimizeAllBtnEvent(button, param){
	Swal.fire({
		icon: "warning",
		title: "모든 웹 콘텐츠를 추천 알고리즘으로<br />최적화 하시겠습니까?",
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
		if (result.value) {
			excuteOptimizeAll(use_unstrfile);
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

function drawOptimizingModalBtnEvent(){
	drawOptimizingModal();
	$("#optimizingModal").modal("show");
}

function drawOptimizingModal(){
	const $targetModal = $("#optimizingModal");
	let html = `<div class="table-responsive">
	<table class="table table-sm">
	<colgroup>
		<col width="*" />
		<col width="150px" />
		<col width="100px" />
	</colgroup>
	<thead>
		<th>웹 콘텐츠 이름</th>
		<th style="text-align:center;">최적화 적용 상태</th>
		<th style="text-align:center;">최적화 취소</th>
	<thead>
	<tbody>`;
	for(let i = 0; i < optimizingOrgData.length; i++){
		html += `<tr data-resource-no="${optimizingOrgData[i].resource_no}">
			<td>${optimizingOrgData[i].resource_org}</td>
			<td align="center" class="resource_status">${printResourceStatus(1)}</td>
			<td align="center" class="btn-cancel">-</td>
		</tr>`;
	}
	html += `</tbody>
	</table>
	</div>`;
	$targetModal.find(".modal-body").html(html);	
	$targetModal.find("tr").removeClass("ready");
	for(let i = 0; i < optimizingUpdateData.length; i++){
		let $targetTr = $targetModal.find(`tr[data-resource-no="${optimizingUpdateData[i].resource_no}"]`);
		if($targetTr.length > 0){
			$targetTr.addClass("ready");
			$targetTr.find(".resource_status").html(printResourceStatus(optimizingUpdateData[i].resource_status));
			$targetTr.find(".btn-cancel").html(`<button class="btn btn-sm btn-danger" onclick="optimizingCancelBtnEvent(this, {resource_no : ${optimizingUpdateData[i].resource_no}, resource_status : ${optimizingUpdateData[i].resource_status}});">취소</button>`);
		}else{
		}
	}	
	const total = $targetModal.find("table tbody tr").length;
	const readyCnt = $targetModal.find("table tr.ready").length;
	$targetModal.find(".cnt").html(`(${readyCnt}/${total}건)`);
}

function optimizingCancelAllBtnEvent(){
	Swal.fire({
		icon: "warning",
		title: "진행 중인 최적화를 모두 취소하시겠습니까?",
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
		if (result.value) {
			cancelOptimizingResourceAll();
			optimizingOrgDataReset();
			Swal.fire({
				icon: "success",
				title: "진행 중인 최적화를 모두 취소합니다.",
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

function optimizingCancelBtnEvent(button, param){
	let resource_no = param.resource_no;
	let resource_status = param.resource_status;	
	Swal.fire({
		icon: "warning",
		title: "진행 중인 최적화를 취소할까요?",
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
		if (result.value) {
			let data = {resource_no : resource_no, resource_status : -1};
			let resultCode = updateResourceStatusByResourceNo(data);
			let orgItem = optimizingOrgData.find(item => item.resource_no == resource_no);
			orgItem.resource_status = -1;
			if(resultCode == 1){
				Swal.fire({
					icon: "success",
					title: "진행 중인 최적화를 취소합니다.",
					text: "잠시 기다려주세요",				
					showClass: {
						popup: 'animate__animated animate__fadeIn animate__faster',
					},
					hideClass: {
						popup: 'animate__animated animate__fadeOut animate__faster',
					},         			
				});
			}			
		}
	});	
}

function optimizingOrgDataReset(){
	optimizingOrgData = selectResourceAllOptimizing(use_unstrfile);
}

function conditionBtnEvent(param){
	let title = "";
	let text = "";
	if(param.resource_condition==0){
		text = `해당 웹 콘텐츠의 상태에 문제가 있다고 판단되는 경우 상태를 미흡으로 변경할 수 있습니다.`;
	}else if(param.resource_condition==1){
		text = `해당 웹 콘텐츠의 상태가 이상이 없다고 판단되는 경우 상태를 양호로 변경할 수 있습니다.`;		
	}
	Swal.fire({
		icon: "question",
		title: "해당 웹 콘텐츠의 최적화 상태를<br />변경하시겠습니까?",
		text: text,
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
	    if (result.isConfirmed) {// 사용자가 확인(실행) 버튼을 클릭했을 때만 실행됩니다.
	    	updateResourceConditionByResourceNo(param);
	        Swal.fire({
	            icon: "success",
	            title: "해당 웹 콘텐츠의 상태를 변경했습니다.",
	            text: "",
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


function optimizeSelectedItemBtnEvent(button, param){
	Swal.fire({
		icon: "warning",
		title: "현재 검색된 웹 콘텐츠를 추천 알고리즘으로<br />최적화 하시겠습니까?",
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
		if (result.value) {
			// excuteOptimizeAll(use_unstrfile);
			selectResourceListByParentIdAjax({update : 1, is_submenu : 1});
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
