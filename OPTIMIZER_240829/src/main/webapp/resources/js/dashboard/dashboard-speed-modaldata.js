
tabulatorFunctions.timeTabulator = function(data){
	let result = new Tabulator("#volist", {
		height:"500px",
		selectable:false,
	    progressiveLoad:"scroll",	    
	    // pagination:true, // progressiveLoad 옵션과 양립 X
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
	    	}
	    	return response; 
	    },
	    paginationInitialPage: 1,
	    paginationLoading: "<div class='custom-pagination-loader'><div class='spinner'></div>Loading...</div>",
	    layout: "fitColumns",
	    columns: [ 	
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
				headerHozAlign:"right",
	    		headerSort:false,
				resizable:false,
	    	},
	    	{
	    		title: "구분",
	    		field: "resource_type",
	    		hozAlign: "center",
				headerHozAlign:"center",
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
	                	$('#folderlist').jstree(true).deselect_all();
	                	$('#folderlist').jstree(true).select_node(rowData['resource_no']);	                	
	                }
	            },
				resizable:false,	    		
	    	},
	    	{
	    		title: "기존 렌더링 시간",
	    		field: "org_time",
	    		hozAlign: "right",
				headerHozAlign:"right",
	    		headerSort:false,
	    		width: 150,
	    		formatter: function(cell, formatterParams, onRendered) {
					let result = "";
					if(cell.getValue()==0){
						result = UNCHECKED;
					}else if(cell.getValue()==-1){
						result = CHECKING;
					}else{
						result = timeUnitFormatter(cell.getValue());
					}		
	    			return result;
	    		},
				resizable:false,
	    	},		
	    	{
	    		title: "최적화 렌더링 시간",
	    		field: "new_time",
	    		hozAlign: "right",
				headerHozAlign:"right",
	    		headerSort:false,
	    		width: 150,
	    		formatter: function(cell, formatterParams, onRendered) {
					let result = "";
					if(cell.getValue()==0){
						result = UNCHECKED;
					}else if(cell.getValue()==-1){
						result = CHECKING;
					}else{
						result = timeUnitFormatter(cell.getValue());
					}		
	    			return result;
	    		},
				resizable:false,
	    	},		
	    	{
	    		title: "렌더링 시간 단축률",
	    		field: "time_reduction_rate",
	    		hozAlign: "right",
				headerHozAlign:"right",
	    		headerSort:false,
	    		width: 150,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			//let result = cell.getValue();
	    			let result = null;
	    			let rowData = cell.getRow().getData();
	    			let org_time = parseFloat(rowData.org_time);
		    		let new_time = parseFloat(rowData.new_time);
		    		result = ((org_time - new_time) / org_time)*100;
		    		result = result.toFixed(1);
	    			if(isNaN(result)){
	    				result = UNCHECKED;
	    			}else{
	    				result += "%";
	    			}
					if(rowData.org_time == -1 || rowData.new_time == -1){
						result = CHECKING;
					}
	    			return `<strong style="color:var(--color-yellow);">${result}</strong>`;
	    		},
				resizable:false,
	    	},	
	    	{
	    		title: "시간 측정",
	    		field: "time_check_btn",
	    		hozAlign: "center",
				headerHozAlign:"center",
	    		headerSort:false,
	    		width: 100,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			//let result = cell.getValue();
	    			let result = null;
	    			let rowData = cell.getRow().getData();
	    			let org_time = rowData.org_time;
		    		let new_time = rowData.new_time;
	    			if(org_time >= 0 && new_time >= 0){
	    				result = `<button class="btn btn-primary btn-sm" style="width:75px;" onclick="singleTimeCheckBtnEvent({resource_no : ${rowData.resource_no}});">시간 측정</button>`;
	    			}else{
	    				result = `<button class="btn btn-success btn-sm" style="width:75px;" onclick="singleTimeCheckBtnEvent({resource_no : ${rowData.resource_no}, retry : 1});">측정 중</button>`;	    				
	    			}
	    			return result;
	    		},
				resizable:false,
	    	},		    	
	    	
	    ],	    
	});	
	
	return result;
}

const sizeStatusTopContent = `OPTIMIZER로 웹 콘텐츠를 <span id="type1_size">0</span> <i class="fa-solid fa-right-long"></i> <span id="type2_size">0</span> <span id="percentage" class="border-yellow">0</span> 경량화하여, 더욱 빠르게 렌더링 하고 있습니다.`;
topFunctions.topContentGenerator1 = function(){	
	let descHtml = `웹 콘텐츠를 최적화하여 해당 파일이 얼만큼 경량화 되었는지 확인할 수 있습니다.`;
	$desc.html(descHtml);

	$topContent.html(sizeStatusTopContent);
	let topValueData = null;
	setTimeout(function(){
		sizeStatusDataLoad();
	},1000);

    const originalUpdateButtons = updateButtons; // 기존 updateButtons 함수를 참조
    updateButtons = function() { // updateButtons 함수를 확장하여 재정의
        originalUpdateButtons(); // 기존 함수 호출
        sizeStatusDataLoad();
    }
}

function sizeStatusDataLoad(){
	let data = {endDate_ts : $("input[name=endDate_ts]").val()}
	let result = selectSumResourceSize(data);
	let resultData = result.data;
	let resultCode = result.result_code;
	if(resultCode==200){
		$topContent.html(sizeStatusTopContent);
		$("#type1_size").html(fileSizeUnitFormatter(resultData.type1_size));
		$("#type2_size").html(fileSizeUnitFormatter(resultData.type2_size));
		$("#percentage").html(`${resultData.percentage.toFixed(1)}%`);			
	}
	else {
		$topContent.html("데이터가 없습니다.");
	}
}

topFunctions.timeTopContent = function(){	
	let descHtml = `웹 콘텐츠를 최적화하여 웹 콘텐츠의 렌더링 시간이 얼마나 단축되었는지 확인할 수 있습니다. (최적화가 완료된 웹 콘텐츠만 표시됩니다.)`;
	let topContentHtml = null;
	topContentHtml = `<div>OPTIMIZER로 웹 콘텐츠를 최적화하여, 평균 <span id="org_time">0</span> <i class="fa-solid fa-right-long"></i> <span id="new_time">0</span> <span id="percentage" class="border-yellow">0</span> 빠르게 렌더링 하고 있습니다.</div>	`;
	let optionalComponentHtml = `<div style="text-align:right;">
		<ion-icon name="time-outline"></ion-icon> 마지막 측정 시간 <span id="latest-check-time">0000-00-00 00:00:00</span>
		<button class="btn btn-primary btn-sm" id="check-time-btn" onclick="checkTimeBtnEvent();">렌더링 시간 측정</button>
		<button class="btn btn-success btn-sm" id="check-time-processing-btn" style="display:none;">렌더링 시간을 측정 중</span>
	</div>`;
	$desc.html(descHtml);
	$topContent.html(topContentHtml);
	$optionalComponent.html(optionalComponentHtml);
	if(avgTimeData.result_code==200){
		$topContent.find("#org_time").html(`${timeUnitFormatter(avgTimeArray.org_time)}`);
		$topContent.find("#new_time").html(`${timeUnitFormatter(avgTimeArray.new_time)}`);
		$topContent.find("#percentage").html(`${avgTimeArray.percentage}%`);		
	}else if (avgTimeData.result_code==204){
		$topContent.html(`해당 데이터가 없습니다.`);
	}
	let latestCheckDateData = selectLatestCheckTimeAgent().data;
	let latestCheckDateArray = null;
	if (latestCheckDateData && latestCheckDateData.rgtr_dt) {
	    latestCheckDateArray = latestCheckDateData.rgtr_dt.split(".");
	} else {
	    console.error("latestCheckDateData is null or rgtr_dt is not defined");
	    // 적절한 대체 로직을 추가할 수 있습니다.
	    latestCheckDateArray = []; // 기본값 또는 다른 로직으로 초기화
	}
	let latestCheckDate = latestCheckDateArray[0];
	$optionalComponent.find("#latest-check-time").html(latestCheckDate);
	
	// 시간 체크 에이전트 상태 확인
	timeAgentInterval = setInterval(function(){
		timeAgentStatus = optimizerCheckTimeAgentProcess().data.replace("\n","");
		// console.log("timeAgentStatus : "+timeAgentStatus);
		if(timeAgentStatus==0){
			$optionalComponent.find("#check-time-btn").css({"display":"inline-block"});		
			$optionalComponent.find("#check-time-processing-btn").css({"display":"none"});		
		}else{
			$optionalComponent.find("#check-time-btn").css({"display":"none"});		
			$optionalComponent.find("#check-time-processing-btn").css({"display":"inline-block"});	
		}
		let latestData = selectResourceListByParentIdAjax().data;
		latestData.forEach(function(latestItem) {
             let targetRow = table_resource.getRows().find(function(row) {
                 return row.getData().resource_no === latestItem.resource_no;
             });
             if(targetRow){
            	 let orgRowData = targetRow.getData();
            	 let latestRowData = Object.assign({}, latestItem);
            	 latestRowData.row_no = orgRowData.row_no; 
            	 targetRow.update(latestRowData);     	
            	 targetRow.reformat();
            	 // console.log("해당 row를 찾았습니다. "+orgRowData.resource_no);
             }

        });		
	},10000);
	
}

topFunctions.sizeTopContent = function(){	
	let descHtml = `웹 콘텐츠를 최적화하여 관리 중인 서비스의 웹 콘텐츠가 얼마나 경량화 되었는지 확인할 수 있습니다. (최적화가 완료된 웹 콘텐츠만 표시됩니다.)`;
	let topContentHtml = null;
	topContentHtml = `OPTIMIZER로 웹 콘텐츠를 <span id="type1_size">0</span> <i class="fa-solid fa-right-long"></i> <span id="type2_size">0</span> <span id="percentage" class="border-yellow">0</span> 경량화하여, 더욱 빠르게 렌더링 하고 있습니다.`;
	let optionalComponentHtml = ``;
	$desc.html(descHtml);
	$topContent.html(topContentHtml);
	$optionalComponent.html(optionalComponentHtml);
	let resultData = sumResourceSizeData.data;
	let resultCode = sumResourceSizeData.result_code;
	if(resultCode==200){
		$topContent.html(topContentHtml);
		$("#type1_size").html(fileSizeUnitFormatter(resultData.type1_size));
		$("#type2_size").html(fileSizeUnitFormatter(resultData.type2_size));
		$("#percentage").html(`${resultData.percentage.toFixed(1)}%`);			
	}
	else {
		$topContent.html("해당 데이터가 없습니다.");
	}
}

tabulatorFunctions.sizeTabulator = function(data){
	let result = new Tabulator("#volist", {
		height:"500px",
		selectable:false,
	    progressiveLoad:"scroll",	    
	    // pagination:true, // progressiveLoad 옵션과 양립 X
	    paginationMode:"remote", // enable remote pagination
	    paginationSize:14, // 목록 크기
	    progressiveLoad:"scroll",	
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
	    		let size1 = parseFloat(response.data[i].resource_new_size_type1);
	    		let size2 = parseFloat(response.data[i].resource_new_size_type2);
	    		response.data[i].reduction_rate = null;
	    		if(size2 > 0){
	    			response.data[i].reduction_rate = ((size1 - size2) / size1)*100;	    
	    			response.data[i].reduction_rate = response.data[i].reduction_rate.toFixed(1)+"%";
	    		}else{
	    			response.data[i].reduction_rate = UNOPTIMIZED;
	    		}
				if(size2 > size1){
					response.data[i].reduction_rate = ERROR;
				}
	    	}
	    	return response; 
	    },
	    paginationInitialPage: 1,
	    paginationLoading: "<div class='custom-pagination-loader'><div class='spinner'></div>Loading...</div>",
	    layout: "fitColumns",
	    columns: [ 	
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
	    		hozAlign: "right",
				headerHozAlign:"right",
	    		width: 50,
	    		headerSort:false,
				resizable:false,
	    	},
	    	{
	    		title: "구분",
	    		field: "resource_type",
	    		hozAlign: "center",
				headerHozAlign:"center",
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
	                	$('#folderlist').jstree(true).deselect_all();
	                	$('#folderlist').jstree(true).select_node(rowData['resource_no']);	                	
	                }
	            },
				resizable:false,	    		
	    	},
	    	{
	    		title: "원본 크기",
	    		field: "resource_new_size_type1",
	    		hozAlign: "right",
				headerHozAlign:"right",
	    		headerSort:false,
	    		width: 100,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = cell.getValue();
	    			if(result > 0){
	    				result = fileSizeUnitFormatter(result);
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
	    		headerSort:false,
	    		width: 100,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = cell.getValue();
	    			if(result > 0){
	    				result = fileSizeUnitFormatter(result);
	    			}
	    			if(result == 0){
	    				result = UNOPTIMIZED;
	    			}
	    			return result;
	    		},
				resizable:false,
	    	},		
	    	{
	    		title: "파일 경량화율",
	    		field: "reduction_rate",
	    		hozAlign: "right",
				headerHozAlign:"right",
	    		headerSort:false,
	    		width: 120,
	    		formatter: function(cell, formatterParams, onRendered) {
					let result = cell.getValue(); 
	    			return `<strong style="color:var(--color-yellow);">${result}</span>`;
	    		},
				resizable:false,
	    	},
	    	{
	    		title: "마지막 최적화 일시",
	    		field: "updt_dt",
	    		hozAlign: "center",
				headerHozAlign:"center",
	    		headerSort:false,
	    		width: 180,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let dateArray = cell.getValue().split('.');
	    			let result = dateArray[0];
	    			if(result == null || result == undefined || result == ""){
	    				result = UNOPTIMIZED;
	    			}
	    			return result;
	    		},
				resizable:false,
	    	},		    	
	    	
	    ],	    
	});	
	
	return result;
}


function singleTimeCheckBtnEvent(param){
	let title = "렌더링 시간 측정을 시작합니다.";
	if (param && param.retry !== undefined && param.retry === 1) {
		title = "렌더링 시간을 다시 측정합니다.";
	}
	Swal.fire({
		icon: "warning",
		title: title,
		text: "잠시 기다려주세요.",
		showCancelButton: false,
		confirmButtonColor: "#51d28c",
		cancelButtonColor: "#f34e4e",
		confirmButtonText: "확인",
		cancelButtonText: "취소",
		showClass: {
			popup: 'animate__animated animate__fadeIn animate__faster',
		},
		hideClass: {
			popup: 'animate__animated animate__fadeOut animate__faster',
		},        
	});
	let targetRow = table_resource.getRows().find(function(row) {
        return row.getData().resource_no === param.resource_no;
    });
	if(targetRow){
		console.log("해당 row가 존재합니다.");
		let updateData = Object.assign({}, targetRow.getData());
		updateData.org_time = -1;
		updateData.new_time = -1;
		targetRow.update(updateData);
		targetRow.reformat();
	}
	optimizerCheckTimeAgent(param);
}

topFunctions.latestTopContent = function(){	
	let descHtml = `이번달 새로 추가된 웹 콘텐츠 목록을 확인하실 수 있습니다.`;
	let topContentHtml = null;
	topContentHtml = `이번달 <span id="date-range" style="color:#ffffff; font-weight:normal;"></span> 새로 추가된 웹 콘텐츠는 총 <span id="latest-count"></span>입니다.`;
	let optionalComponentHtml = ``;
	$desc.html(descHtml);
	$topContent.html(topContentHtml);
	$optionalComponent.html(optionalComponentHtml);
	let targetData = newResourceArray.find(item => item.resource_status == 99);
	if(modalId == "latestUnstrResourceModal"){
		
	}	
	
	$topContent.find("#latest-count").html(`${targetData.count}건`);
	let startDate = formatTsToKorean($("input[name=startDate_ts]").val());
	let endDate = formatTsToKorean($("input[name=endDate_ts]").val());
	$topContent.find("#date-range").html(`(${startDate} ~ ${endDate})`);
	$("input[name=search_date]").val(1);
}

tabulatorFunctions.latestTabulator = function(data){
	data.sort_default = "rgstr_dt DESC";
	let result = new Tabulator("#volist", {
		height:"500px",
		selectable:false,
	    progressiveLoad:"scroll",	    
	    // pagination:true, // progressiveLoad 옵션과 양립 X
	    paginationMode:"remote", // enable remote pagination
	    paginationSize:14, // 목록 크기
	    progressiveLoad:"scroll",	
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
	    		let size1 = parseFloat(response.data[i].resource_new_size_type1);
	    		let size2 = parseFloat(response.data[i].resource_new_size_type2);
	    		response.data[i].reduction_rate = null;
	    		if(size2 > 0){
					let rate = (((size1 - size2) / size1)*100).toFixed(1);
					response.data[i].reduction_rate = rate+"%";
	    		}else{
	    			response.data[i].reduction_rate = UNOPTIMIZED;
	    		}
				if(size2 > size1){
					response.data[i].reduction_rate = ERROR;
				}
	    	}
	    	return response; 
	    },
	    paginationInitialPage: 1,
	    paginationLoading: "<div class='custom-pagination-loader'><div class='spinner'></div>Loading...</div>",
	    layout: "fitColumns",
	    columns: [ 	
	    	{
	    		title: "No",
	    		field: "resource_no",
	    		hozAlign: "right",
				headerHozAlign:"center",
	    		headerSort:true,
	    		visible:false,
				resizable:false,
	    	},	    	
	    	{
	    		title: "No",
	    		field: "row_no",
	    		width: 50,
	    		hozAlign: "right",
				headerHozAlign:"center",
	    		headerSort:false,
				resizable:false,
	    	},
	    	{
	    		title: "구분",
	    		field: "resource_type",
	    		hozAlign: "center",
				headerHozAlign:"center",
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
			    		case 5 : result += `<img src="/resources/img/icon-ext-hwp-color.png" style="height:16px; position:relative; top:-3px;" />`; break;
		    			case 6 : result += `<img src="/resources/img/icon-ext-doc-color.png" style="height:16px; position:relative; top:-3px;" />`; break;
		    			case 7 : result += `<img src="/resources/img/icon-ext-xls-color.png" style="height:16px; position:relative; top:-3px;" />`; break;
		    			case 8 : result += `<img src="/resources/img/icon-ext-ppt-color.png" style="height:16px; position:relative; top:-3px;" />`; break;
		    			case 9 : result += `<img src="/resources/img/icon-ext-pdf-color.png" style="height:16px; position:relative; top:-3px;" />`; break;	
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
	                	$('#folderlist').jstree(true).deselect_all();
	                	$('#folderlist').jstree(true).select_node(rowData['resource_no']);	                	
	                }
	            },
				resizable:false,	    		
	    	},
	    	{
	    		title: "최적화 적용",
	    		field: "resource_status",
	    		hozAlign: "center",
	    		headerSort:false,
	    		width: 150,
	    		formatter: function(cell, formatterParams, onRendered) {
					let result = cell.getValue();
					result = printResourceStatus(result);
					return result;
	    		},
				resizable:false,
				headerHozAlign:"center",
	    	},		
	    	{
	    		title: "원본 크기",
	    		field: "resource_new_size_type1",
	    		hozAlign: "right",
	    		headerSort:false,
	    		width: 100,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = cell.getValue();
	    			if(result > 0){
	    				result = fileSizeUnitFormatter(result);
	    			}
	    			return result;
	    		},
				resizable:false,
				headerHozAlign:"right",
	    	},		
	    	{
	    		title: "최적화 크기",
	    		field: "resource_new_size_type2",
	    		hozAlign: "right",
	    		headerSort:false,
	    		width: 100,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = cell.getValue();
	    			if(result > 0){
	    				result = fileSizeUnitFormatter(result);
	    			}
	    			if(result == 0){
	    				result = UNOPTIMIZED;
	    			}
	    			return result;
	    		},
				resizable:false,
				headerHozAlign:"right",
	    	},		
	    	{
	    		title: "파일 경량화율",
	    		field: "reduction_rate",
	    		hozAlign: "right",
				headerHozAlign:"right",
	    		headerSort:false,
	    		width: 120,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return `<strong style="color:var(--color-yellow);">${cell.getValue()}</span>`;
	    		},
				resizable:false,
	    	},
	    	{
	    		title: "등록 일시",
	    		field: "rgstr_dt",
	    		hozAlign: "center",
				headerHozAlign:"center",
	    		headerSort:false,
	    		width: 180,
	    		formatter: function(cell, formatterParams, onRendered) {
					let result = cell.getValue();
					let resultArray = result.split("."); 
	    			return resultArray[0];
	    		},
				resizable:false,
	    	},		    	
	    	
	    ],	    
	});	
	
	return result;
}

topFunctions.checkLatestTopContent = function(){	
	let descHtml = `이번달 새로 추가된 웹 콘텐츠 중 확인이 필요한 웹 콘텐츠 목록을 확인하실 수 있습니다.`;
	let topContentHtml = null;
	topContentHtml = `이번달 <span id="date-range" style="color:#ffffff; font-weight:normal;"></span> 새로 추가된 웹 콘텐츠 중 확인이 필요한 (최적화 미적용 상태인) 웹 콘텐츠는 총 <span id="latest-count"></span>입니다.`;
	let optionalComponentHtml = ``;
	$desc.html(descHtml);
	$topContent.html(topContentHtml);
	$optionalComponent.html(optionalComponentHtml);
	let targetData = newResourceArray.find(item => item.resource_status == 98);
	if(modalId == "checkLatestUnstrResourceModal"){
		targetData = newUnstrResourceArray.find(item => item.resource_status == 98);
	}
	
	$topContent.find("#latest-count").html(`${targetData.count}건`);
	let startDate = formatTsToKorean($("input[name=startDate_ts]").val());
	let endDate = formatTsToKorean($("input[name=endDate_ts]").val());
	$topContent.find("#date-range").html(`(${startDate} ~ ${endDate})`);
	$("input[name=search_date]").val(1);
	// $("input[name=search_condition]").val(-1);
}

tabulatorFunctions.checkLatestTabulator = function(data){
	let result = new Tabulator("#volist", {
		height:"500px",
		selectable:false,
	    progressiveLoad:"scroll",	    
	    // pagination:true, // progressiveLoad 옵션과 양립 X
	    paginationMode:"remote", // enable remote pagination
	    paginationSize:14, // 목록 크기
	    progressiveLoad:"scroll",	
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
	    		let size1 = parseFloat(response.data[i].resource_new_size_type1);
	    		let size2 = parseFloat(response.data[i].resource_new_size_type2);
	    		response.data[i].reduction_rate = null;
	    		if(size2 > 0){
	    			response.data[i].reduction_rate = ((size1 - size2) / size1)*100;	    
	    			response.data[i].reduction_rate = response.data[i].reduction_rate.toFixed(1)+"%";
	    		}else{
	    			response.data[i].reduction_rate = UNOPTIMIZED;
	    		}
	    	}
	    	return response; 
	    },
	    paginationInitialPage: 1,
	    paginationLoading: "<div class='custom-pagination-loader'><div class='spinner'></div>Loading...</div>",
	    layout: "fitColumns",
	    columns: [ 	
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
	    		hozAlign: "right",
				headerHozAlign:"right",
	    		width: 50,
	    		headerSort:false,
				resizable:false,
	    	},
	    	{
	    		title: "구분",
	    		field: "resource_type",
	    		hozAlign: "center",
				headerHozAlign:"center",
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
						case 5 : result += `<img src="/resources/img/icon-ext-hwp-color.png" style="height:16px; position:relative; top:-3px;" />`; break;
		    			case 6 : result += `<img src="/resources/img/icon-ext-doc-color.png" style="height:16px; position:relative; top:-3px;" />`; break;
		    			case 7 : result += `<img src="/resources/img/icon-ext-xls-color.png" style="height:16px; position:relative; top:-3px;" />`; break;
		    			case 8 : result += `<img src="/resources/img/icon-ext-ppt-color.png" style="height:16px; position:relative; top:-3px;" />`; break;
		    			case 9 : result += `<img src="/resources/img/icon-ext-pdf-color.png" style="height:16px; position:relative; top:-3px;" />`; break;		
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
	                	$('#folderlist').jstree(true).deselect_all();
	                	$('#folderlist').jstree(true).select_node(rowData['resource_no']);	                	
	                }
	            },
				resizable:false,	    		
	    	},
	    	{
	    		title: "최적화 적용",
	    		field: "resource_status",
	    		hozAlign: "center",
				headerHozAlign:"center",
	    		headerSort:false,
	    		width: 150,
	    		formatter: function(cell, formatterParams, onRendered) {
					let result = cell.getValue();
					result = printResourceStatus(result); 
	    			return result;
	    		},
				resizable:false,
	    	},		
	    	{
	    		title: "원본 크기",
	    		field: "resource_new_size_type1",
	    		hozAlign: "right",
				headerHozAlign:"right",
	    		headerSort:false,
	    		width: 100,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = cell.getValue();
	    			if(result > 0){
	    				result = fileSizeUnitFormatter(result);
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
	    		headerSort:false,
	    		width: 100,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = cell.getValue();
	    			if(result > 0){
	    				result = fileSizeUnitFormatter(result);
	    			}
	    			if(result == 0){
	    				result = UNOPTIMIZED;
	    			}
	    			return result;
	    		},
				resizable:false,
	    	},		
	    	{
	    		title: "파일 경량화율",
	    		field: "reduction_rate",
	    		hozAlign: "right",
				headerHozAlign:"right",
	    		headerSort:false,
	    		width: 120,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return `<strong style="color:var(--color-yellow);">${cell.getValue()}</span>`;
	    		},
				resizable:false,
	    	},
	    	{
	    		title: "최적화 상태",
	    		field: "resource_condition",
	    		hozAlign: "center",
				headerHozAlign:"center",
	    		headerSort:false,
	    		width: 120,
	    		formatter: function(cell, formatterParams, onRendered) {
					let cellValue = cell.getValue();
					let result = "";
					if(cellValue == 1){
	    				result = `<span class="badge badge-normal">양호</span>`;	    			
	    			}else{
	    				result = `<span class="badge badge-abnormal">미흡</span>`;
	    			}
	    			return result;

	    		},
				resizable:false,
				visible:false,
				
	    	},
	    	{
	    		title: "등록 일시",
	    		field: "rgstr_dt",
	    		hozAlign: "center",
				headerHozAlign:"center",
	    		headerSort:false,
	    		width: 180,
	    		formatter: function(cell, formatterParams, onRendered) {
					let result = cell.getValue();
					let resultArray = result.split("."); 
	    			return resultArray[0];
	    		},
				resizable:false,
	    	},		    	
	    	
	    ],	    
	});	
	
	return result;
}


topFunctions.latestUnstrTopContent = function(){	
	let descHtml = `이번달 새로 추가된 웹 콘텐츠 목록을 확인하실 수 있습니다.`;
	let topContentHtml = null;
	topContentHtml = `이번달 <span id="date-range" style="color:#ffffff; font-weight:normal;"></span> 새로 추가된 웹 콘텐츠는 총 <span id="latest-count"></span>입니다.`;
	let optionalComponentHtml = ``;
	$desc.html(descHtml);
	$topContent.html(topContentHtml);
	$optionalComponent.html(optionalComponentHtml);
	let targetData = newUnstrResourceArray.find(item => item.resource_status == 99);

	$topContent.find("#latest-count").html(`${targetData.count}건`);
	let startDate = formatTsToKorean($("input[name=startDate_ts]").val());
	let endDate = formatTsToKorean($("input[name=endDate_ts]").val());
	$topContent.find("#date-range").html(`(${startDate} ~ ${endDate})`);
	$("input[name=search_date]").val(1);
}