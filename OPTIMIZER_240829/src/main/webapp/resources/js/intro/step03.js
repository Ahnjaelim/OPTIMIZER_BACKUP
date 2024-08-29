let step3Fnc = {};
step3Fnc.initContent = [];
let fileManagerType = 1;
let global = {};

const UNOPTIMIZED = `<span style="color:rgba(255,255,255,0.3);">최적화 전</span>`;
const UNCHECKED = `<span style="color:rgba(255,255,255,0.3);">측정 전</span>`;
const ERROR = `<span style="color:rgba(255,255,255,0.3);"><ion-icon name="alert-circle-outline"></ion-icon>오류</span>`;


const fistSite = selectFirstSite();
$("#site-address").val(fistSite.site_address);
global.site_no = fistSite.site_no;
$("#site-no").val(global.site_no);
const firstPage = selectFirstPage(global.site_no);
global.page_no = firstPage.page_no;
$("#page-no").val(global.page_no);

$(function(){
	
	$(".side-step li").each(function(){
		const itemStepSub = parseInt($(this).attr("data-step-sub"));
		if(itemStepSub < step_sub){ // 지난 단계
			$(this).addClass("done");
			$(this).find("span").html(`<ion-icon name="checkmark-outline"></ion-icon>`);
		}else if(itemStepSub == step_sub){ // 현재 단계
			$(this).addClass("active");
		}else if(itemStepSub > step_sub){ // 앞에 단계
		}		
	});
	
	if(step_sub == 1){
		step3Fnc.initContent[1]();
	}
	if(step_sub == 2){
		step3Fnc.initContent[2]();
	}
	if(step_sub == 3){
		step3Fnc.initContent[3]();
	}
});

step3Fnc.initContent[1] = function(){
	$("#target-page").attr("src", fistSite.site_address);
	
	const requestData = {site_no : global.site_no, page_no : global.page_no, lh_type : 0, site_address : fistSite.site_address};
	
	$("#speed-insight-api-btn").click(function(){
		
		$(".audit-summary").html(`<div class="spinner-border text-primary m-1" role="status"><span class="sr-only">Loading...</span></div> 사이트 진단 중입니다.<br />20초 안팎의 시간이 소요될 예정입니다.`);
		requestLightHouse(requestData)
	    .then(response => {
	        // 요청이 성공하면 여기서 응답 데이터 사용
	    	let logData = selectLightHouse(requestData);
	        const jsonObject = JSON.parse(logData.lh_json);
	    	const performanceScore = jsonObject.categories.performance.score;
	    	const performancePercentage = performanceScore * 100;
	    	$(".audit-summary").html(`<p  style="width:400px !important;">진단이 완료되었습니다!<br />우측 상단 다음 버튼을 눌러 다음 단계를 진행하세요.</p>
	    		<div id="radial-chart"></div>`);
	    	step3Fnc.drawRadialChart(performancePercentage, "점", 10);
	    	// $("#jsonData").html(html);	
	    	
	    	$(".next-btn").prop("disabled", false);
	    })
	    .catch(error => {
	        // 요청이 실패하면 여기서 에러 처리
	        console.error("Request failed:", error);
	    });
	});
    
	$(".next-btn").click(function(){
		Swal.fire({
			icon: "question",
			title: "다음 단계로 이동하시겠습니까?",
			text: "",
			showCancelButton: true,
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
		}).then(function(result) {
			setStep({step : 3, step_sub : 2});
		});
	});    
}

step3Fnc.initContent[2] = function(){
	step3Fnc.initSearchForm();
	step3Fnc.initTabulator();
	$("#target-page").attr("src",`/viewLogFile2?page_no=${global.page_no}&content_type=1`);
	
	$(".next-btn").click(function(){
		Swal.fire({
			icon: "question",
			title: "다음 단계로 이동하시겠습니까?",
			text: "",
			showCancelButton: true,
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
		}).then(function(result) {
			setStep({step : 3, step_sub : 3});
		});
	});		
	
	let tabulatorInterval = setInterval(function(){
		step3Fnc.loadTabulatorData();
		let statusCountArray = selectResourceStatusSummaryByPage(global.page_no);
		let total = 0;
		let wait = 0;
		let done = 0;
		for(let i = 0; i < statusCountArray.length; i++){
			total += statusCountArray[i].count;
		}
		const $countEle = $(".count-summary");
		const doneItem = statusCountArray.find(item => item.resource_status == 1);
		if(doneItem != undefined){
			done = doneItem.count;
		}
		const waitItemArray = statusCountArray.filter(item => item.resource_status == 0 || item.resource_status == 11 );
		wait = waitItemArray.reduce((accumulator, item) => {return accumulator + item.count;}, 0);
		if(done == 0 && wait == 0){ // 시작 전
			let html = `<button id="deactive-optimize-btn">최적화 해제 (테스트용)</button>
				<button id="active-optimize-btn">최적화 적용</button>`;
			$countEle.html(html);
			$("#deactive-optimize-btn").click(function(){
				step3Fnc.activeOptimizeBtnEvent(this, {page_no : global.page_no, resource_status : 2});
			});
			$("#active-optimize-btn").click(function(){
				step3Fnc.activeOptimizeBtnEvent(this, {page_no : global.page_no, resource_status : 0});
			});				
		}else if(done < total){ // 진행 중
			const percentage = ((done/total)*100).toFixed(1);
			console.log("percentage",percentage);
			if($countEle.find("#radial-chart").length == 0 || $countEle.find("#radial-chart").attr("data-status")=="1"){
				let html = `<div id="radial-chart" data-status="0">
					</div>
					<div class="count"><span class="done">0</span>/<span class="total">0</span>건</div>
					<p>최적화를 진행 중입니다.</p>
					<p>잠시 기다려주세요.</p>`;
				$countEle.html(html);
				step3Fnc.drawRadialChart(percentage, "%", 25);	
			}else{
				step3Fnc.updateRadialChartValue(percentage);				
			}
			$countEle.find(".total").html(total);
			$countEle.find(".done").html(done);
		}else if(total == done){ // 최적화 완료
			if($countEle.find("#radial-chart").length == 0 || $countEle.find("#radial-chart").attr("data-status")=="0"){
				let html = `<div id="radial-chart" data-status="1"></div>
					<p>최적화가 완료되었습니다!</p>
					<p>우측 상단 다음 버튼을 눌러 다음 단계로 이동하세요.</p>`;
				$countEle.html(html);
				step3Fnc.drawRadialChart(100, "%", 10);				
			}
			$(".next-btn").prop("disabled", false);
		}
	}, 2000);		
}

step3Fnc.drawRadialChart = function(value, unit, offsetY) {
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
            height: 280,
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
                        fontSize: '38px',
                        show: true,
                    }
                }
            }
        },
        labels: ['최적화'],
    };

    let chart = new ApexCharts(document.querySelector("#radial-chart"), options);
    chart.render();
    
    step3Fnc.updateRadialChartValue = function(newValue) {
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

step3Fnc.drawRadialChartMini = function(value, unit, offsetY, targetEle) {
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
            height: 150,
            type: 'radialBar',
        },
        colors: [chartColor],  // 여기서 색상을 설정합니다.
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '50%',
                },
                track: {
                    background: '#f2f2f2',  // 트랙 배경색을 고정값으로 설정
                    
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
                        fontSize: '15px',
                        show: true,
                    }
                }
            }
        },
        labels: ['최적화'],
    };

    let chart = new ApexCharts(document.querySelector(targetEle), options);
    chart.render();
    
    step3Fnc.updateRadialChartValue = function(newValue) {
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



step3Fnc.initContent[3] = function(){
	step3Fnc.drawSimulation();
	// $("#simul-btn").click();

	let countArray = selectResourceTypeCountByPage(global.page_no).data;
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
					시뮬레이션 시작을 눌러주세요.
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
			percentageHtml = `<span class="value2"><i class="fa-solid fa-arrow-down"></i> ${percentage}%</span>`;
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

	
	let requestData = {};
	requestData.before = {site_no : global.site_no, page_no : global.page_no, lh_type : 0, site_address : ""};
	let beforeData = selectLightHouse(requestData.before);
	console.log("beforeData",beforeData);
	const jsonObject1 = JSON.parse(beforeData.lh_json);
	const performanceScore1 = jsonObject1.categories.performance.score;
	const performancePercentage1 = performanceScore1 * 100;
	$("#before-score").attr("data-score", performancePercentage1);
	$("#before-score").html(`<div id="before-chart"></div>`);	
	step3Fnc.drawRadialChartMini(performancePercentage1, "점", 5, "#before-chart");
	
	$(".prev-btn").click(function(){
		Swal.fire({
			icon: "question",
			title: "이전 단계로 이동하시겠습니까?",
			text: "",
			showCancelButton: true,
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
		}).then(function(result) {
			setStep({step : 3, step_sub : 2});
		});
	});	
	$(".prev-btn").prop("disabled", false);
	
	$(".next-btn").click(function(){
		Swal.fire({
			icon: "success",
			title: "OPTIMIZER 설치가 완료되었습니다!",
			text: "'확인'버튼을 누르면 시작페이지로 이동합니다.",
			showCancelButton: true,
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
		}).then(function(result) {
			// setStep({step : 3, step_sub : 2});
			setStep({step : 4, step_sub : 1});
		});
	});	
	$(".next-btn").prop("disabled", false);	
}

step3Fnc.initTabulator = function(){
	let data = step3Fnc.setSearchData();
	table = new Tabulator("#resource-list", {
		height: 300,
		selectable:false,
	    // pagination:true,
		progressiveLoad:"scroll",	
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
	    		response.data[i].reducible_size = 0;
	    		
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
	    		title: "절감 가능치",
	    		field: "reducible_size",
	    		hozAlign: "right",
	    		headerHozAlign:"right",
	    		headerSort:true,
	    		width: 120,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			//cell.getValue()
	    			let result = "";
	    			let rowData = cell.getRow().getData();		
	    			return cell.getValue();
	    		},  
	    		resizable:false,
	    		visible: false,
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
	    ],	    
	});	
}

step3Fnc.initSearchForm = function (){
	
	// statusArray 뿌리기
	let html = "";
	for(let i = 0; i < statusArray.length; i++){
		html += `<option value="${statusArray[i].value}">${statusArray[i].label}</option>`;
	}
	$("#search-status-select").html(html);
	$('#search-status-select').SumoSelect({
		placeholder: '웹 콘텐츠 상태를 선택하세요',
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
}

step3Fnc.setSearchData = function (){
	
	const page_no = global.page_no;
	
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
    
    let search_range = $("input[name=search_range]").val();
	let search_keyword = "";
	
	let data = {
			size: 15,
	    	resource_status_array : resource_status_array,
	    	resource_type_array : resource_type_array,
	    	search_range : search_range,
	    	search_keyword : search_keyword,
	    	filemanager_type : fileManagerType,
	    	page_no : page_no,
	    };	
	return data;
}

step3Fnc.loadTabulatorData = function (){
	let result = null;
	let currentData = table.getData();
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
			step3Fnc.updateTabulator(result);
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	
	return result;
}

step3Fnc.updateTabulator = function(result){
	let rows = table.getRows();
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
		} else {
		    console.log("해당 값의 행을 찾을 수 없습니다.");
		}				
	
	}	
}

step3Fnc.activeOptimizeBtnEvent = function(button, param){
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


step3Fnc.drawSimulation = function(){
	
	
	/*
	let timeTypeArray = [];
	timeTypeArray[0] = data.all[0];
	timeTypeArray[1] = data.image[0];
	timeTypeArray[2] = data.video[0];
	timeTypeArray[3] = data.text[0];
	timeTypeArray[4] = data.font[0];
	*/
	
	const page_no = global.page_no;
	const page_name = "INDEX TEST";
	let data = getPageRenderingData(page_no); 
	let timeReduRate = (1-(data.all[0].percent/100)).toFixed(2); // 시간 단축률
	
	$("#time-simulation-head").html(`<span id="page_name">등록된 도메인 대표 페이지에 대한 렌더링 속도</span> 시뮬레이션 <button id="simul-btn" class="custom-btn btn-11" style="position:relative; top:-2px;"><i class="fa-solid fa-cube"></i> 시뮬레이션 시작</button>`);
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
	    
		
		const currentDomain = `${window.location.protocol}//${window.location.host}`;
		const targetUrl = `${currentDomain}/viewLogFile2?page_no=${global.page_no}&content_type=2`;
		let requestData = {};	
		requestData.before = {site_no : global.site_no, page_no : global.page_no, lh_type : 0, site_address : targetUrl};
		requestData.after =	{site_no : global.site_no, page_no : global.page_no, lh_type : 1, site_address : targetUrl};
		
		let scoreHtml = `<div class="spinner-border text-primary m-1" role="status"><span class="sr-only">Loading...</span></div> 잠시 기다려주세요.<br />20초 안팎으로 소요될 예정입니다.`;
		$("#after-score").html(scoreHtml);
		requestLightHouse(requestData.after)
	    .then(response => {
	        // 요청이 성공하면 여기서 응답 데이터 사용

	    	let afterData = selectLightHouse(requestData.after);
	        const jsonObject2 = JSON.parse(afterData.lh_json);
	    	const performanceScore2 = jsonObject2.categories.performance.score;
	    	const performancePercentage2 = performanceScore2 * 100;
	    	// $("#after-score").html(performancePercentage2+"점");
	    	
	    	$("#after-score").html(`<div id="after-chart"></div>`);	
	    	step3Fnc.drawRadialChartMini(performancePercentage2, "점", 5, "#after-chart");	    	
	    	
	    	let beforeScore = parseInt($("#before-score").attr("data-score"));
	    	let diffScore = performancePercentage2 - beforeScore;
	    	$("#score-desc").html(`성능 점수가 <strong>${diffScore}점</strong> 상승했습니다.`);
	    	$(".next-btn").prop("disabled", false);
	    	$("#simul-btn").prop("disabled", false);
	    	$("#simul-btn").css({"opacity":"1.0"});
	    })
	    .catch(error => {
	        // 요청이 실패하면 여기서 에러 처리
	        console.error("Request failed:", error);
	    });	    
	});
	
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


step3Fnc.skipBtnEvent = function(){
	Swal.fire({
		icon: "question",
		title: "남은 단계를 생략하고<br />시작페이지로 이동하시겠습니까?",
		text: "",
		showCancelButton: true,
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
	}).then(function(result) {
		if (result.value) { // 실행을 눌렀을 때만 동작
			setStep({step : 4, step_sub : 1});
		}
	});		
} 