const step = parseInt(urlParams.get("step")) || 1;
const maxStep = 4;
const $prevBtn = $(".prev-btn");
const $nextBtn = $(".next-btn");
const MAX_SELECTED_ROW = 10;
let stepFnc = {};
stepFnc.initStep = [];

$(function(){
	$(".process-tab li").each(function(){
		const itemStep = parseInt($(this).attr("data-step"));
		if(itemStep < step){ // 지난 단계
			$(this).addClass("done");
			$(this).find(".step-no").html(`<ion-icon name="checkmark-outline"></ion-icon>`);
		}else if(itemStep == step){ // 현재 단계
			$(this).addClass("active");
		}else if(itemStep > step){ // 앞에 단계
			
		}
	});
	$prevBtn.click(function(){
		if(step > 0){
			location.href=`/index?step=${step-1}`;			
		}
	});
	$nextBtn.click(function(){
		if(step < maxStep){
			location.href=`/index?step=${step+1}`;			
		}
	});
	
	switch(step){
	case 1:
		$nextBtn.prop("disabled", false);
		break;
	case 2:
		stepFnc.initStep[2]();
		break;
	case 3:
		stepFnc.initStep[3]();
		break;
	case 4:
		stepFnc.initStep[4]();
		break;
	case 5:
		stepFnc.initStep[5]();
		break;
	case 6:
		stepFnc.initStep[6]();
		break;
	}
		
});

stepFnc.initStep[2] = function(){
	$prevBtn.prop("disabled", false);
	$nextBtn.off('click');
	const $pageUrl = $(".page-url");
	
	$pageUrl.keyup(function(){
	    if (!$pageUrl.val()){
	    	$(".warn-msg").show();
	    	$(".input").addClass("input-warn");
	    	$nextBtn.prop("disabled", true);
	    }else{
	    	$(".warn-msg").hide();
	    	$(".input").removeClass("input-warn");
	    	$nextBtn.prop("disabled", false);
	    }
	});
	
	$nextBtn.click(function(){
		if (!$pageUrl.val()){
			return;
		}else{
			if(step < maxStep){
				const page_no = insertPage($pageUrl.val());
				if(page_no > 0){
					location.href=`/index?step=${step+1}&page_no=${page_no}`;					
				}else{
					Swal.fire({
						icon: "error",
						title: "사이트 등록이 정상적으로 이루어지지 않았습니다!",
						text: "처음부터 다시 시도하거나 관리자에게 문의하세요.",	
						showClass: {
							popup: 'animate__animated animate__fadeIn animate__faster',
						},
						hideClass: {
							popup: 'animate__animated animate__fadeOut animate__faster',
						},         			
					});
					return;
				}
			}
		}
	});
	
}

stepFnc.initStep[3] = function(){
	const page_no = urlParams.get("page_no");
	if(page_no == null || page_no == ""){
		alert("잘못된 요청입니다!");
		return;
	}

	let pageData = selectPageByPageNo(page_no);
	const page_url = pageData.page_url;
	const resourceData = selectResourceAllByPageNo(page_no);
	if(resourceData.length==0){
		requestResourceCollection(page_url)
		.then(response => {
			console.log("<SYSTEM> 리소스 수집 요청 완료!");
		})
		.catch(error => {
			console.error("<SYSTEM> 리소스 수집 요청 실패!", error);
		});			
	}
	
	$("#target-page").attr("src", pageData.page_url);
	requestLightHouse({page_no : page_no, page_status : 0})
    .then(response => {
        console.log("<SYSTEM> Lighthouse 진단 완료");   
        const org_score = response.data;
        if(org_score > 0){
        	$(".audit-summary").html(`<div id="radial-chart"></div>`);
        	let chartParam = {
        			value : org_score,
        			unit : "점",
        			offsetY : 10,
        			height: 200,
        			fontSize : "32px",
        			targetEle : "#radial-chart",
        	};
        	drawRadialChart(chartParam);
        	let html = `<p>값은 추정치이며 달라질 수 있습니다.</p>
        		<p><ion-icon name="triangle" style="color:var(--color-red);"></ion-icon> 0~49 
        		<ion-icon name="square" style="color:var(--color-yellow);"></ion-icon> 50~89
        		<ion-icon name="ellipse" style="color:var(--color-green);"></ion-icon> 90~100</p>`;
        	$(".audit-summary").append(html);
        	$nextBtn.off('click');
        	$nextBtn.click(function(){
        		location.href=`/index?step=4&page_no=${page_no}`;
        	});
        	$prevBtn.prop("disabled", false);
        	$nextBtn.prop("disabled", false);        	
        }else{
        	Swal.fire({
				icon: "error",
				title: "웹 사이트 진단 중 오류가 발생했습니다!",
				text: "처음부터 다시 시도하거나 관리자에게 문의하세요.",	
				showClass: {
					popup: 'animate__animated animate__fadeIn animate__faster',
				},
				hideClass: {
					popup: 'animate__animated animate__fadeOut animate__faster',
				},         			
			});
        	$(".audit-summary").html(`<p>웹 사이트 진단 중 오류가 발생했습니다!</p>
        		<p>처음부터 다시 시도해주세요.</p>
        		<p style="margin-top:20px;"><button class="btn-default" onclick="location.href='/';">처음으로</button>`);
        	return;
        }
    })
    .catch(error => {
        // 요청이 실패하면 여기서 에러 처리
        console.error("Request failed:", error);
    });
}

drawRadialChart = function(param) {
	
	const {value, unit, offsetY, targetEle, height, fontSize} = param;
	
    let chartColor;
    if (value >= 90) {
        chartColor = '#8cc054';  // 예: 초록색 (75% 이상)
    } else if (value >= 50) {
        chartColor = '#e5e32a';  // 예: 노란색 (50% 이상)
    } else {
        chartColor = '#c93133';  // 예: 빨간색 (50% 미만)
    }
    
    let options = {
        series: [value],
        chart: {
            height: height,
            type: 'radialBar',
        },
        colors: [chartColor],  // 여기서 색상을 설정합니다.
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%',
                },
                track: {
                    background: '#f2f2f2'  // 트랙 배경색을 고정값으로 설정
                },
                dataLabels: {
                    name: {
                        offsetY: 0,
                        show: false,
                        color: '#888',
                        fontSize: '17px'
                    },
                    value: {
                        formatter: function(val) {
                            return parseInt(val) + unit;
                        },
                        offsetY: offsetY,
                        color: '#fff',  // value의 색상을 차트 색상과 대비되도록 설정
                        fontSize: fontSize,
                        show: true,
                    }
                }
            }
        },
        labels: ['최적화'],
    };

    let chart = new ApexCharts(document.querySelector(targetEle), options);
    chart.render();
    
    updateRadialChartValue = function(newValue) {
        let newColor;
        if (newValue >= 90) {
            newColor = '#8cc054';
        } else if (newValue >= 50) {
            newColor = '#e5e32a';
        } else {
            newColor = '#c93133';
        }
        
        chart.updateOptions({
            colors: [newColor]
        });
        chart.updateSeries([newValue]);
    }    
}

let table = null;
stepFnc.initStep[4] = function(){
	const page_url = urlParams.get("page_url");
	const page_no = urlParams.get("page_no");
	let selectedIds = new Set(); // 선택된 행의 ID를 저장할 Set
	let orgSelectedIds = new Set();
	table = new Tabulator("#resource-list", {
		height:"510px",
	    // pagination:false, // enable pagination
	    progressiveLoad:"scroll",
	    paginationSize:20, // 목록 크기
	    // sortMode: "remote",
	    ajaxURL:"/selectResourceAllByPageNoTabulator", // set url for ajax request
	    ajaxParams:{
	    	page_no : page_no
	    },	    
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
	    	// console.log("response", response);
	    	// console.log("page : "+this.getPage());
	    	// console.log("size : "+this.getSize());
	    	$("#list_cnt span").html(response.list_cnt);
	    	for(let i=0; i<response.data.length; i++){
	    		response.data[i].collect_status = 0;	  
	    		const resource_org_size = response.data[i].resource_org_size;
	    		if(resource_org_size == 0){
	    			response.data[i].collect_status = 0;
				}else if(resource_org_size > 0){
					response.data[i].collect_status = 1;
				}else if(resource_org_size < 0){
					response.data[i].collect_status = -1;
				}else{
					response.data[i].collect_status = 2;
				}	    		
	    	}
	    	return response; 
	    },
	    paginationInitialPage: 1,
	    paginationLoading: "<div class='custom-pagination-loader'><div class='spinner'></div>Loading...</div>",
		selectable: MAX_SELECTED_ROW,
		selectableRowsRollingSelection:false, 	  
		rowFormatter: function(row) {
	        if (selectedIds.has(row.getData().nid)) {
	            row.select();
	        }
	    },
		index:"nid",
	    layout: "fitColumns",	    
	    columns: [	    	
	    	{
	    		formatter:"rowSelection", 
	    		titleFormatter:"rowSelection", 
	    		hozAlign:"center", 
	    		headerSort:false, 
	    		cellClick:function(e, cell){
	    			cell.getRow().toggleSelect();
	    		},
	    		width: 30,
	    		headerHozAlign:"center",
	    	},
	    	{
	    		title: "구분",
	    		field: "resource_type",
	    		hozAlign: "center",
	    		headerSort:true,
	    		visible:true,
	    		resizable:false,
	    		width: 70,
	    		headerHozAlign:"center",
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = "";
	    			let cellValue = cell.getValue();
	    			let targetTypeItem = typeArray.find(item => item.value == cellValue);
	    			if(targetTypeItem){
	    				result = `<ion-icon name="${targetTypeItem.icon}"></ion-icon>`;
	    			}
	    			return result;
	    		}	    		
	    	},	    	
	    	{
	    		title: "웹 콘텐츠 이름",
	    		field: "resource_name",
	    		hozAlign: "left",
	    		headerSort:true,
	    		visible:true,
	    		resizable:false,
	    		widthGrow: true,
	    		headerHozAlign:"center",
	    	},	    	
	    	{
	    		title: "수집 상태",
	    		field: "collect_status",
	    		hozAlign: "center",
	    		headerSort:true,
	    		visible:true,
	    		resizable:false,
	    		width: 100,
	    		headerHozAlign:"center",
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = "";
	    			let cellValue = cell.getValue();
	    			switch(cellValue){
	    			case 0 : result = `<span style="color:rgba(255,255,255,1.0);"><ion-icon name="stop-circle"></ion-icon> 수집 대기</span>`;
	    				break;
	    			case 1 : result = `<span style="color:var(--color-green);"><ion-icon name="checkmark-circle"></ion-icon> 수집 완료</span>`;
	    				break;
	    			case -1 : result = `<span style="color:rgba(255,255,255,0.3);"><ion-icon name="close-circle"></ion-icon> 수집 실패</span>`;
	    				break;
	    			case 2 : result = `<span style="color:rgba(255,255,255,0.3);"><ion-icon name="alert-circle"></ion-icon> 수집 오류</span>`;
	    				break;
	    			}
	    			return result;
	    		}
	    	},	    	
	    	{
	    		title: "파일 용량",
	    		field: "resource_org_size",
	    		hozAlign: "right",
	    		headerSort:true,
	    		visible:true,
	    		resizable:false,
	    		width: 100,
	    		headerHozAlign:"right",
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = fileSizeUnitFormatter(cell.getValue());
	    			return result;
	    		}
	    	},	    	

    	],	    
    });	

	// 행 선택 변경 이벤트 수정
	table.on("rowSelectionChanged", function(data, rows) {
	    selectedIds.clear();
	    table.getSelectedRows().forEach(row => {
	        selectedIds.add(row.getData().nid);
	    });
	    updateFloatingMsg(selectedIds.size);
	});

	// 스크롤 이벤트 시 선택 상태를 복원하도록 수정
	table.on("scrollVertical", function() {
	    restoreSelection();
	    setTimeout(restoreSelection, 50);  // 추가로 한번 더 호출해서 선택이 확실히 복원되도록 함
	});

	// 데이터 로드 완료 이벤트 수정
	table.on("dataLoaded", function(data) {
	    restoreSelection();
	});
	
	// rowFormatter에서도 선택 상태를 확실히 반영하도록 수정
	table.on("rowFormatter", function(row) {
	    if (selectedIds.has(row.getData().nid)) {
	        row.select();
	    }
	});	

	// 선택 상태 복원 함수 수정
	function restoreSelection() {
	    table.getRows().forEach(row => {
	        if (selectedIds.has(row.getData().nid)) {
	            row.select();
	        } else {
	            row.deselect();
	        }
	    });
	    updateFloatingMsg(selectedIds.size);
	}
	
	// 부동 메시지 업데이트 함수
	function updateFloatingMsg(count) {
	    if ($(".floating-msg").length > 0) {
	        $(".floating-msg strong").html(count);
	    }
	}	
	
	let interval = setInterval(function(){
		// 진행률 계산
		const data = selectResourceAllByPageNo(page_no);
		let countObject = {
				total : data.length,
				done : 0,
				percentage : 0,
		};		
		let doneArray = data.filter(item => item.resource_org_size != 0);		
		countObject.done = doneArray.length;
		countObject.percentage = parseInt((countObject.done / countObject.total)*100);
		$(".progress-bar").css({"width" : countObject.percentage+"%"});
		$(".progress-percentage").html(`${countObject.percentage}% <span style="color:rgba(255,255,255,0.5);">(${countObject.done}건 수집 완료)</span>`);
		
		// 현재 진행 중인 요소
		const sortedData = [...data]; // 또는 const sortedData = data.slice();
		sortedData.sort((a, b) => {
		    return new Date(b.created_at) - new Date(a.created_at);
		});	
		const targetData = sortedData[0];
		$(".progress-msg").html(`${targetData.resource_name}을(를) 수집하고 있습니다.`);			
		
		if(countObject.total > 0 && countObject.done > 0 && countObject.total == countObject.done){ // 수집 완료
			updatePageCollStatus({page_no : page_no, page_coll_status : 1});
			clearInterval(interval);
			clearInterval(tableInterval);
			table.setSort("resource_org_size", "desc");
			let tableData = table.getData();
			let tableDataClone = [...tableData];
			tableDataClone.sort((a, b) => b.resource_org_size - a.resource_org_size);

			// 기존 선택 초기화
	        selectedIds.clear();
	        table.deselectRow();
	        setTimeout(function(){
	        	// 상위 10개 행 선택
	        	for(let i = 0; i < Math.min(10, tableDataClone.length); i++){
	        		const rowId = tableDataClone[i].nid;
	        		selectedIds.add(rowId);
	        		orgSelectedIds.add(rowId);
	        		table.selectRow(rowId);
	        	}
	        	// restoreSelection();	     
	        	// console.log("orgSelectedIds", orgSelectedIds);
	        }, 1000);
	
	        
			$(".progress-msg").html("수집이 완료되었습니다!");
			Swal.fire({
				icon: "success",
				title: `컨텐츠 수집이 완료되었습니다!<br />최적화를 원하는 웹 콘텐츠 ${MAX_SELECTED_ROW}개를 선택해주세요.`,
				text: "",	
				showClass: {
					popup: 'animate__animated animate__fadeIn animate__faster',
				},
				hideClass: {
					popup: 'animate__animated animate__fadeOut animate__faster',
				},         			
			});	
			$(".process-content").append(`<div class="floating-msg"><strong>10</strong>/${MAX_SELECTED_ROW}개 선택</div>`);
			$nextBtn.off('click');
			$nextBtn.click(function(){
				let selectedData = table.getSelectedData();
				if(selectedData.length == MAX_SELECTED_ROW){
					let promises = selectedData.map(item => {
				        return updateResourceStatusByNid({nid: item.nid, resource_status: 0});
				    });	
					 Promise.all(promises)
			        .then(() => {
			            // 모든 업데이트가 완료된 후 다음 동작을 실행
			        	location.href=`/index?step=5&page_no=${page_no}`;
			        })
			        .catch(error => {
			            // 에러 처리 (선택사항)
			            console.error("업데이트 중 오류 발생:", error);
			        });
				}else{
					Swal.fire({
						icon: "error",
						title: `웹 콘텐츠 ${MAX_SELECTED_ROW}개를 선택해주세요.`,
						text: "",	
						showClass: {
							popup: 'animate__animated animate__fadeIn animate__faster',
						},
						hideClass: {
							popup: 'animate__animated animate__fadeOut animate__faster',
						},         			
					});		
					return;
				}
			});
			$nextBtn.prop("disabled", false);	
		}			
	},5000);
	
	
	
	let tableInterval = setInterval(function(){
		let latestData = selectResourceAllByPageNoTabulator({size : 1000, page : 1, page_no : page_no});
		latestData.forEach(function(latestItem) {
             let targetRow = table.getRows().find(function(row) {
                 return row.getData().nid === latestItem.nid;
             });
             if(targetRow){
				let orgRowData = targetRow.getData();
				let latestRowData = Object.assign({}, latestItem);
				latestRowData.row_no = orgRowData.row_no; 
				const resource_org_size = latestRowData.resource_org_size;
				if(resource_org_size == 0){
					latestRowData.collect_status = 0;
				}else if(resource_org_size > 0){
					latestRowData.collect_status = 1;
				}else if(resource_org_size < 0){
					latestRowData.collect_status = -1;
				}else{
					latestRowData.collect_status = 2;
				}
				targetRow.update(latestRowData);     	
				targetRow.reformat();
             }
        });		
		
		// 소팅
		table.setSort("collect_status", "asc");
		
		// 특정 조건에 맞는 행을 찾고 삭제하기
		let rows = table.getRows();
	    rows.forEach(function(row) {
	        let data = row.getData();
	        if(data.resource_org_size == -1) {
	            table.deleteRow(row);
	        }
	    });		

	}, 5000);
}

stepFnc.initStep[5] = function(){
	const page_no = urlParams.get("page_no");
	let pageData = selectPageByPageNo(page_no);
	if(pageData.page_opt_status != 1 && pageData.page_opt_status != 2){
		requestResourceOptimize(page_no);
		updatePageOptStatus({page_no : page_no, page_opt_status : 1});
	}
	drawResourceList(page_no, "OPTIMIZE");	
	let interval = setInterval(function(){
		let functionStatus = drawResourceList(page_no, "OPTIMIZE");
		if (functionStatus === 1) {
			updatePageOptStatus({page_no : page_no, page_opt_status : 2});
			clearInterval(interval);
			$(".progress-msg").html("최적화가 완료되었습니다!");
			$nextBtn.off('click');
			$nextBtn.click(function(){
				location.href=`/index?step=6&page_no=${page_no}`;
			});
			$nextBtn.prop("disabled", false);			    
		}	   		
	}, 2000);	
}

function drawResourceList(page_no, type){
	let result = 0;
	const orgData = selectResourceAllByPageNo(page_no);
	const data = orgData.filter(item => item.resource_status !== -1);
	// console.log("data", data);
	// 프로그레스
	let countObject = {
			total : data.length,
			done : 0,
			percentage : 0,
	};
	
	let doneArray = [];
	switch(type){
	case "OPTIMIZE":
		doneArray = data.filter(item => item.resource_status == 1);				
		break;
	}

	countObject.done = doneArray.length;
	countObject.percentage = parseInt((countObject.done / countObject.total)*100);
	$(".progress-bar").css({"width" : countObject.percentage+"%"});
	switch(type){
	case "OPTIMIZE":			
		$(".progress-percentage").html(`${countObject.percentage}% <span style="color:rgba(255,255,255,0.5);">(${countObject.done}/${countObject.total})</span>`);
		break;
	}
	if(countObject.total > 0 && countObject.done > 0 && countObject.total == countObject.done){
		result = 1;
	}
	// console.log("countObject", countObject);
	
	// 현재 진행 중인 요소
	const sortedData = [...data]; // 또는 const sortedData = data.slice();
	sortedData.sort((a, b) => {
	    return new Date(b.created_at) - new Date(a.created_at);
	});	
	
	const targetData = sortedData[0];
	switch(type){
	case "OPTIMIZE":
		if(targetData){
			let optimizingData = data.filter(item => item.resource_status == 11);
			let optimizingCount = optimizingData.length - 1;
			if(optimizingCount > 0){
				$(".progress-msg").html(`${targetData.resource_name} 외 ${optimizingCount}건을 최적화하고 있습니다.`);				
			}else{
				$(".progress-msg").html(`${targetData.resource_name}을(를) 최적화하고 있습니다.`);
			}
		}
		break;
	}
	
	// 데이터 정렬 
	switch(type){
	case "OPTIMIZE":			
		const order = [11, 0, -1, 1];  // 원하는 정렬 순서
		data.sort(function(a, b) {
		    return order.indexOf(a.resource_status) - order.indexOf(b.resource_status);
		});
		break;
	}	
	
	if($("#resource-list table").length == 0){
		let html = `<table>`;
		switch(type){
		case "COLLECT":	
			html += `<colgroup>
				<col width="*" />
				<col width="120px" />
				<col width="120px" />
			</colgroup>
			<thead>
				<th>웹 콘텐츠 이름</th>
				<th>상태</th>
				<th>용량</th>
			</thead>`;
			break;
		case "OPTIMIZE":			
			html += `<colgroup>
				<col width="*" />
				<col width="150px" />
				<col width="120px" />
				<col width="120px" />
				<col width="120px" />
			</colgroup>
			<thead>
				<th>웹 콘텐츠 이름</th>
				<th>최적화 상태</th>
				<th>최적화 전 용량</th>
				<th>최적화 후 용량</th>
				<th>경량화율</th>
			</thead>`;
			break;
		}		
		for(let i = 0; i < data.length; i++){
			switch(type){
			case "OPTIMIZE":			
				html += printOptTr(data[i]);
				break;
			}			
		}
		html += `</table>`;
		$("#resource-list").html(html);		
	}else{
		let html = "";
		for(let i = 0; i < data.length; i++){
			switch(type){
			case "COLLECT":	
				html += printCollTr(data[i]);
				break;
			case "OPTIMIZE":			
				html += printOptTr(data[i]);
				break;
			}				
			/*let $targetTr = $("#resource-list table").find(`tr[data-nid=${data[i].nid}]`);
			let html = "";
			switch(type){
			case "COLLECT":	
				html = printCollTr(data[i]);
				break;
			case "OPTIMIZE":			
				html = printOptTr(data[i]);
				break;
			}					
			if($targetTr.length==0){
				$("#resource-list table tbody").append(html);
			}else{
				$targetTr.replaceWith(html);
			}*/
		}
		$("#resource-list table tbody").html(html);
	}
	
	return result;
}

function printOptTr(item){
	let reduRate = parseInt(((item.resource_new_size_type1 - item.resource_new_size_type2)/item.resource_new_size_type1)*100);
	let result = `<tr data-nid="${item.nid}">
		<td class="name">${printResourceType(item.resource_type)} ${item.resource_name}</td>
		<td class="status">${printResourceStatus(item.resource_status)}</td>
		<td class="size1">${fileSizeUnitFormatter(item.resource_new_size_type1)}</td>
		<td class="size2">${item.resource_status == 1 ? `${fileSizeUnitFormatter(item.resource_new_size_type2)}` : `<span class="zero">최적화 전</span>`}</td>
		<td class="rate">${item.resource_status == 1 ? `<strong style="color:var(--color-yellow);">${reduRate}%</strong>` : `<span class="zero">최적화 전</span>`}</td>
	</tr>`;
	return result;
}

function printCollTr(item){
	let reduRate = parseInt(((item.resource_new_size_type1 - item.resource_new_size_type2)/item.resource_new_size_type1)*100);
	let result = `<tr data-nid="${item.nid}">
		<td>${printResourceType(item.resource_type)} ${item.resource_name}</td>
		<td style="text-align:center;">${item.resource_org_size == 0 ? `<span class="zero">수집 대기</span>` : `<ion-icon name="checkmark-circle"></ion-icon> 수집 완료`}</td>
		<td style="text-align:right;">${item.resource_org_size == 0 ? `<span class="zero">수집 대기</span>` : `${fileSizeUnitFormatter(item.resource_org_size)}`}</td>
	</tr>`;
	return result;
}

stepFnc.initStep[6] = function(){
	
    // 버튼 정리
    $(".window-foot").html("");
    $(".window-foot").html(`<button class="report-download-btn deactive" style="width:200px;">보고서 다운로드</button>`);	
    $(".report-download-btn").click(function(){
    	reportDownloadBtnEvent();
    });
	
	const page_no = urlParams.get("page_no");
	let data = selectPageByPageNo(page_no);
	const page_url = data.page_url;
	drawSimulation(data);
	let countArray = selectResourceTypeCountByPage(page_no);
	let html = `<table class="data-table" style="margin-top:20px;">
		<colgroup>
			<col width="25%" />
			<col width="25%" />
			<col width="25%" />
			<col width="25%" />
		</colgroup>
		<thead>
			<tr>
				<th>구분</th>
				<th class="before">최적화 전</th>
				<th class="after">최적화 후</th>
				<th>비고</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th>점수</th>
				<td id="before-score"  class="before">
					<div class="spinner-border text-primary m-1" role="status"><span class="sr-only">Loading...</span></div> 잠시 기다려주세요.
				</td>
				<td id="after-score"  class="after">
				</td>
				<td id="score-desc" style="text-align:left; padding-left:15px;"></td>
			</tr>
		`;
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
		let percentage = parseInt(((size1 - size2)/size1)*100);
		let percentageHtml = "";
		if(isNaN(percentage)){
			percentageHtml = "";
		}else{
			percentageHtml = `<span class="value2"><ion-icon name="arrow-down-outline"></ion-icon> ${percentage}%</span>`;
		}
		html += `<tr>
			<th>${typeItem.label}</th>
			<td class="before">${size1 > 0 ? `${fileSizeUnitFormatter(size1)}` : `<span style="color:rgba(255,255,255,0.3);">데이터 없음</span>`}</td>
			<td class="after">${size2 > 0 ? `<span class="value1">${fileSizeUnitFormatter(size2)}</span>${percentageHtml}` : `<span style="color:rgba(255,255,255,0.3);">데이터 없음</span>`}</td>
			<td style="text-align:left; padding-left:15px;">${size2 > 0 ? `${typeItem.label} 용량을 <strong>${percentage}%</strong> 경량화했습니다.` : `<span style="color:rgba(255,255,255,0.3);">데이터 없음</span>`}</td>
		</tr>`;
	}
	html += `</table>`;
	$("#page-summary").html(html);	
	const performancePercentage = data.org_score;
	console.log("data", data);
	$("#before-score").attr("data-score", performancePercentage);
	$("#before-score").html(`<div id="before-chart"></div>`);	
    let chartParam = {
    		value : performancePercentage,
    		unit : "점",
    		offsetY : 10,
    		height: 150,
    		fontSize : "20px",
    		targetEle : "#before-chart",
        };
    drawRadialChart(chartParam);
	Swal.fire({
		icon: "warning",
		title: "최적화 전후 비교를 위해 시뮬레이션을 시작합니다.",
		text: "잠시 기다려주세요.",	
		showClass: {
			popup: 'animate__animated animate__fadeIn animate__faster',
		},
		hideClass: {
			popup: 'animate__animated animate__fadeOut animate__faster',
		},         			
	});
    setTimeout(function(){
    	$("#simul-btn").click();
    }, 1000);

}

function drawSimulation(data) {
	const param = urlParams.get("page_url");
	const page_no = urlParams.get("page_no");
	const timeData = selectResourceTimeAnalysisByPage(page_no); 
	console.log("time", selectResourceTimeAnalysisByPage(page_no)); // 시간 단축률
	let timeReduRate = 1-(timeData.percentage/100);
	console.log("timeReduRate", timeReduRate);
	
	// $("#time-simulation-head").html(``);
	
	const NO_DATA = `<span style="color:rgba(255,255,255,0.2);">데이터가 없습니다</span>`;

	let html = "";
	html += `<div class="d-flex">`;
	for(let i = 0; i < 2; i++){
		html += `<div class="col simul-preview" data-type="${i == 0 ? `before` : `after`}">
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
		</div>`;
	}
	html += `</div>`;
	
	$("#time-simulation").html(html);

	$("#simul-btn").off('click').on('click', function(){
		$("#simul-btn").prop("disabled", true);
		$("#simul-btn").css({"opacity":"0.0"});
		
	    const $testRendering = $("#time-simulation");
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
                        resolve(); // Resolve the promise when this iframe is fully loaded and processed
                    });
                    
                    const iframeContent = $iframe[0].contentDocument || $iframe[0].contentWindow.document;
                    const images = $(iframeContent).find('img');
                    images.each(function(index) {});
                });
                
                switch (type) {
				case "before" :
					$iframe.attr("src", data.page_url);
					break;
				case "after" :
					// $iframe.attr("src", `/viewHtml?page_no=${data.page_no}&content_type=1`);
					$iframe.attr("src", data.page_url);
					break;
				default:
					break;
				}
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
	    	// const afterTime = iframes['after'].loadTime;
	    	console.log("timeReduRate", timeReduRate);
	    	const afterTime = iframes['before'].loadTime * timeReduRate;
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
	    
		
		const currentDomain = `${window.location.protocol}//${window.location.host}`;
		const targetUrl = `${currentDomain}/viewHtml?page_no=${data.page_no}&content_type=2`;
		let scoreHtml = `<div class="spinner-border text-primary m-1" role="status"><span class="sr-only">Loading...</span></div> 잠시 기다려주세요.<br />20초 안팎으로 소요될 예정입니다.`;
		$("#after-score").html(scoreHtml);
		let param = {page_url : targetUrl, page_status : 1, page_no : page_no};	
		requestLightHouse({page_no : page_no, page_status : 1})
	    .then(response => {
	        // 요청이 성공하면 여기서 응답 데이터 사용
	    	const performancePercentage = response.data;
	    	$("#after-score").attr("data-score", performancePercentage);
	    	$("#after-score").html(`<div id="after-chart"></div>`);	
	        let chartParam = {
	        		value : performancePercentage,
	        		unit : "점",
	        		offsetY : 10,
	        		height: 150,
	        		fontSize : "20px",
	        		targetEle : "#after-chart",
	            };
	        drawRadialChart(chartParam);	
	        
	    	let beforeScore = parseInt($("#before-score").attr("data-score"));
	    	let diffScore = performancePercentage - beforeScore;
	    	let scoreResult = "상승";
	    	if(diffScore < 0){scoreResult = "하락";}
	    	$("#score-desc").html(`성능 점수가 <strong>${diffScore}점</strong> ${scoreResult}했습니다.`);
	    	$(".next-btn").prop("disabled", false);
	    	$("#simul-btn").prop("disabled", false);
	    	$("#simul-btn").css({"opacity":"1.0"});
	    	
	    	updatePageResult({
	    	    page_no: page_no,
	    	    org_time: parseInt(iframes['before'].loadTime),
	    	    new_time: parseInt(iframes['before'].loadTime * timeReduRate),
	    	    org_score: $("#before-score").attr("data-score"),
	    	    new_score: $("#after-score").attr("data-score"),
	    	})
	    	.then((result) => {
	    	    console.log("처리가 완료되었습니다:", result);
	    	    $("#simulation-status").val(1);
	    	    $(".report-download-btn").removeClass("deactive");
	    		Swal.fire({
	    			icon: "success",
	    			title: "OPTIMIZER 벤치마크 테스트가 완료되었습니다!",
	    			html: "이제 보고서를 다운로드 받을 수 있습니다.<br />해당 화면 우측 하단에서 보고서 다운로드 버튼을 눌러주세요.",	
	    			showClass: {
	    				popup: 'animate__animated animate__fadeIn animate__faster',
	    			},
	    			hideClass: {
	    				popup: 'animate__animated animate__fadeOut animate__faster',
	    			},         			
	    		});	    	    
	    	})
	    	.catch((error) => {
	    	    // 오류 처리
	    	    console.error("오류 발생:", error);
	    	});
	    })
	    .catch(error => {
	        // 요청이 실패하면 여기서 에러 처리
	        console.error("Request failed:", error);
	    });	    
	});
	

	
}

function reportDownloadBtnEvent(){
	const page_no = urlParams.get("page_no");
	const simulation_status = parseInt($("#simulation-status").val());
	if(simulation_status==0){
		Swal.fire({
			icon: "warning",
			title: "최소 한 번의 시뮬레이션 결과를 확인해야<br />보고서를 다운받을 수 있습니다!",
			text: "",	
			showClass: {
				popup: 'animate__animated animate__fadeIn animate__faster',
			},
			hideClass: {
				popup: 'animate__animated animate__fadeOut animate__faster',
			},         			
		});
	}else if(simulation_status==1){
		location.href=`/report-download?page_no=${page_no}`;
	}else{
		Swal.fire({
			icon: "error",
			title: "잘못된 접근입니다.",
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