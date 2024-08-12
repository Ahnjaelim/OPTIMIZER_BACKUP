/**
 * 비용관리 페이지의 데이터를 관리하는 global object
 * @namespace g_DASHBOARD_COST
 */
let g_DASHBOARD_COST = {
    // init여부
    initialized: false,
    // 컨트롤 상한 관련
    threshold:{
   		queue		: 30,
   		interval	: 10000,
   		timeoutUnit	: 200
    },
    // 인터벌 id 관리
    interval_idList: [],
    // UI의 공통 디자인 관련
    design: {
        /**
		 * 첫 번째 색상
		 * 
		 * @type {string}
		 */
        COLOR1: '#274c63',
        /**
		 * 두 번째 색상
		 * 
		 * @type {string}
		 */
        COLOR2: '#008FFB'
    },
    lastCheckedDate:null,
    // data영역
    data: {
        /**
		 * x축 마지막 라벨 관련
		 * 
		 * @type {number}
		 */
        lastDate: 0,
        /**
		 * target date
		 */
        targetDate:null,
        // 비용관련 공통 데이터 (costCtxt)
        cost_context: {
        	cloud_cost : 0,
        	diff_cost:0, // 전월 대비 절감액
            current_month_org_size_all: 0,
            current_month_opt_size_all: 0,
            previous_month_org_size_all: 0,
            previous_month_opt_size_all: 0,
            reduceCost : 0,
        	// 당월 예상 비용&절감률 구하기&전월 대비 절감액
            lastSavingCost : 0,
        	todaySavingCost : 0,
        	monitorCost : 0
        },
        // 실시간 데이터 로딩 관련
        realtime: {
            /**
			 * 실시간 데이터 큐
			 * 
			 * @type {Array}
			 */
            queue: [],
            /**
			 * 실시간 데이터 큐에 항목을 추가
			 * 
			 * @function
			 * @param {Object}
			 *            item - 큐에 추가할 항목
			 */
            enqueueRealtime: function (item) {
                this.queue.push(item);
            },
            /**
			 * 실시간 데이터 큐에서 항목을 제거하고 반환
			 * 
			 * @function
			 * @returns {Object|null} - 큐에서 제거된 항목, 큐가 비어있는 경우 null
			 */
            dequeueRealtime: function () {
                if (this.queue.length === 0) {
                    console.error('realtime 큐에 데이터가 존재하지 않습니다.');
                    return null;
                }
                return this.queue.shift();
            }
        }
    },
    // preloading 화면 start
    preloadStart: function(){
    	setTimeout(function(){ 
    		/* console.log('preload-start'); */
    		$('#preLoader').fadeIn(300)
    	}, 0);
    },
    // preloading 화면 end(complete)
    preloadComplete: function(){
    	setTimeout(function(){ 
    		/* console.log('preload-complete'); */
    		$('#preLoader').fadeOut(300)
    	}, 0);
    },
    
    
    /**
	 * 전체 데이터 객체를 반환
	 * 
	 * @function
	 * @returns {Object} - data 객체
	 */
    getDataContext: function () {
        return this.data;
    },
    /**
	 * 비용관련 공통 데이터 객체를 반환
	 * 
	 * @function
	 * @returns {Object} - cost_context 객체
	 */
    getCostContext: function () {
        const dataCtxt = this.getDataContext();
        return dataCtxt.cost_context;
    },
    /**
	 * 마지막 날짜를 반환
	 * 
	 * @function
	 * @returns {number} - lastDate 값
	 */
    getLastDate: function () {
        const data = this.getDataContext();
        return data.lastDate;
    },
    
    setTargetDate: function(targetDate){
    	// console.warn('[Target-Date updated]',targetDate);
    	
    	if(targetDate){
    		this.data.targetDate = targetDate;	
    	}
    	
    	return;
    },
    
    getTargetDate: function () {
        return (this.data.targetDate) ? this.data.targetDate : null;
    },
    
    /**
	 * 실시간 데이터 큐를 반환
	 * 
	 * @function
	 * @returns {Array} - realtime 컨트롤 객체
	 */
    getRealtimeContext: function () {
        return this.data.realtime;
    },
};
// ///////////////////////////////

const COLOR1 = '#274c63';
const COLOR2 = '#008FFB';

var data1 = [];
var data2 = [];
var lastDate = 0; // X축 마지막 라벨 (시간)
const TICKINTERVAL = 1000; // 데이터 간의 시간 간격 (ms)
const XAXISNUMBER = 5;
const XAXISRANGE = TICKINTERVAL*XAXISNUMBER; // X축의 범위를 나타내는 변수 = X축에 라벨을
												// 몇개까지 보여줄거냐 (ms) ex :
												// 1000*n=5000, n=5개

// realtime content load stack
var parentHeight = 0;
var scrollDiv = null;
var animationData = [];

// 데이터 가져오기
var resourceCountData = selectCountByResourceStatus();
var resourceCountArray = resourceCountData.data;

var trafficData = selectMonthlyTrafficByType();
var trafficArray = trafficData.data;

let statusCountArray = {
		sum : [],
		unstrfile_sum : [],
	};
	statusCountArray.sum[-1] = 0;
	statusCountArray.sum[0] = 0;
	statusCountArray.sum[1] = 0;
	statusCountArray.sum[2] = 0;
	statusCountArray.sum[11] = 0;
	statusCountArray.unstrfile_sum[-1] = 0;
	statusCountArray.unstrfile_sum[0] = 0;
	statusCountArray.unstrfile_sum[1] = 0;
	statusCountArray.unstrfile_sum[2] = 0;
	statusCountArray.unstrfile_sum[11] = 0;
	let strfileCountArray = [];
	let unstrfileCountArray = [];

var newResourceData = null;
var newResourceArray = null;
let dataInterval = null;

let sumResourceSizeData = null;
let sumResourceSizeArray = null;
let sumResourceTypeSizeData = null;
let sumResourceTypeSizeArray = null;

/** 비정형 */
let newUnstrResourceData = null;
let newUnstrResourceArray = null;
let toggle = 1;

// DCMT READY;
$(function() {
	
	// 최초 대시보드 로딩
	dashboard_init();	
	drawTypeSizeStatusEle();
	drawUnstrSizeStatusEle();
	/*mainCommonFnc.drawHeatmapChartEle();*/
	
	if(USE_UNSTRFILE == true){
		drawUnstrfile();
		initSwitchBtnEvent(1);
		initSwitchBtnEvent(2);
	}

// 데이터 그리기 및 새로고침
	drawDataEle();
	dataInterval = setInterval(function(){
		drawDataEle();
		spin();
		
		
		/*
		if(USE_UNSTRFILE == true){
			if(toggle==0){
				$(`.switch-btn[data-no=1] .str`).click();
				$(`.switch-btn[data-no=2] .str`).click();
				toggle=1;		
			}else{
				$(`.switch-btn[data-no=1] .unstr`).click();
				$(`.switch-btn[data-no=2] .unstr`).click();
				toggle=0;						
			}
		}*/		
	},10000);
/*	setTimeout(function(){
		
		//drawPieChart({targetChartEleId : "strfile-status-pie-chart", targetListEleId : "strfile-status-top10-list", useUnstrfile : 0});	
		//drawPieChart({targetChartEleId : "unstrfile-status-pie-chart", targetListEleId : "unstrfile-status-top10-list", useUnstrfile : 1});	
	},500);	*/
	
});


function initSwitchBtnEvent(no){
	$(`.switch-btn[data-no=${no}] .str`).click(function(){
		$(`.switch-btn[data-no=${no}] button`).removeClass("active");
		$(`.switch-btn[data-no=${no}] .str`).addClass("active");
		$(`.switch-container[data-no=${no}]`).css({"left":"0%"});
	});
	$(`.switch-btn[data-no=${no}] .unstr`).click(function(){
		$(`.switch-btn[data-no=${no}] button`).removeClass("active");
		$(`.switch-btn[data-no=${no}] .unstr`).addClass("active");		
		$(`.switch-container[data-no=${no}]`).css({"left":"-100%"});
	});	
}

function drawUnstrfile (){
	$(`.animation-row2 [data-type="5"]`).removeClass("hide");
}


function drawDataEle(){
	drawTypeSizeStatusEle();
	mainCommonFnc.drawHeatmapChartEle();
	
	/*setTimeout(function(){
		drawPieChart({targetChartEleId : "strfile-status-pie-chart", targetListEleId : "strfile-status-top10-list", useUnstrfile : 0});	
		drawPieChart({targetChartEleId : "unstrfile-status-pie-chart", targetListEleId : "unstrfile-status-top10-list", useUnstrfile : 1});	
	},500);	*/
}



function drawPieChart(param){
	const {targetChartEleId, targetListEleId, useUnstrfile} = param;
	am5.ready(function() {

	$(`#${targetChartEleId}`).html("");
	 let existingRoot = am5.registry.rootElements.find(root => root.dom.id === targetChartEleId);
	    if (existingRoot) {
	        existingRoot.dispose();
	        // Clear the target element's content to ensure no residual data
	    
	    }
	
	// Create root element
	// https://www.amcharts.com/docs/v5/getting-started/#Root_element
	    let root = am5.Root.new(targetChartEleId);
		root._logo.dispose();
	
	// Set themes
	// https://www.amcharts.com/docs/v5/concepts/themes/
		root.setThemes([
			  am5themes_Animated.new(root)
			]);
	
	// Create chart
	// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
		let chart = root.container.children.push(am5percent.PieChart.new(root, {
			  radius: am5.percent(90),
			  innerRadius: am5.percent(50),
			  layout: root.horizontalLayout,
			}));
	
	// Create series
	// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
	let series = chart.series.push(am5percent.PieSeries.new(root, {
	  name: "Series",
	  valueField: "value",
	  categoryField: "statusLable",
	}));
	
	series.slices.template.events.on("click", function(ev) {
		let sliceData = ev.target.dataItem.dataContext;
		/*console.log(sliceData.status)*/
		let listData = selectResourceTop10({resource_status : sliceData.status_code , use_unstrfile : useUnstrfile});
	/*	console.log(listData)*/
		const $targetEle = $(`#${targetListEleId}`);
		let targetStatusItem = statusArray.find(item => item.value == sliceData.status_code);
		let html = `<table class="ranking-table">
			<colgroup>
				<col width="30px" />
				<col width="25px" />
				<col width="*" />
				<col width="80px" />
				${useUnstrfile != 1 ? '<col width="120px" />' : ''}
			</colgroup>
				<thead>
				<tr>
					<th colspan="5" style="background:rgba(255,255,255,0.1);">${targetStatusItem.label}</th>
				</tr>
					<tr>
						<th>#</th>
						<th colspan="2">웹 콘텐츠 이름</td>
						<th style="text-align:right;">원본 용량</th>
						${useUnstrfile != 1 ? '<th style="text-align:right;">월 예상 비용</th>' : ''}
					</tr>
				</thead>
				<tbody>
			`;
				
				
				for (let i = 0; i < listData.length; i++) {	
										
					if(i>6) break;
					
					
				    let _listData = listData[i];

				    const { resource_new_size_type1 = 0, current_month_opt_count = 0, current_month_call_count = 0 } = _listData;
				    
				    
				    let type = _listData.resource_type;
				    let avgCost = 0;  // 초기값 설정

				    if (type >= 1 && type <= 4 && resource_new_size_type1 != -1) {
				        avgCost = (resource_new_size_type1 * (current_month_opt_count + current_month_call_count)) * costCtxt.cloud_cost;
				       /* console.log(resource_new_size_type1, current_call_cnt, current_opt_cnt);*/
				    }

				    // avgCost를 리스트 아이템에 바인딩
				    _listData.avgCost = avgCost;
				}

				// avgCost를 기준으로 내림차순 정렬
				listData.sort((a, b) => b.avgCost - a.avgCost);
				
				
				
				
				
				for(let i = 0; i < listData.length; i++) {
					let iconItem = typeArray.find(item => item.value == listData[i].resource_type);
					let icon = "";
					if(iconItem.icon_type=="ion-icon"){
						icon = `<ion-icon name="${iconItem.icon}"></ion-icon>`;
					}else if (iconItem.icon_type=="img"){
						icon = `<img src="/resources/img/${iconItem.icon}" style="height:14px;" />`;						
					}
					if(listData[i].resource_type == 4){
						icon = `<i class="fa-solid fa-font"></i>`;
					}						
					
					let _listData = listData[i];
					
					const {avgCost = 0} = _listData;
					
					 let type = _listData.resource_type;
					 
					
					 html += `<tr>
							<td align="center">${i+1}</td>
						 <td align="center">${icon}</td>
							<td>${listData[i].resource_name}</td>
							<td align="right">${fileSizeUnitFormatter_v2(listData[i].resource_new_size_type1)}</td>
							 ${useUnstrfile != 1 ? `<td align=right>${comma(avgCost.toFixed(0))}원</td>` : ''}
						</tr>`;
				}
				
				
				if(listData.length === 0) {
					html += `<tr>
						<td colspan="4" align="center"><span style="color:rgba(255, 255, 255, 0.5);">데이터 없음</span></td>
					</tr>
					`;
				}
					
		
		html += `</tbody>
			</table>`;
		$targetEle.html(html);
	});	
	
	// Set data
	// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
	let data = resourceCountArray;
	series.data.setAll({});
	/*console.log(data)*/
	let statusCounts = {};   //일반
	let statusCounts2 = {};  //비정형
	
	for (let i = 0; i < data.length; i++) {
		  let status = data[i].resource_status;
		    let count = data[i].status_count;
		    let type = data[i].resource_type;
		
		    if (type >= 1 && type <= 4) {
		        if (statusCounts[status]) {
		            statusCounts[status] += count;
		        } else {
		            statusCounts[status] = count;
		        }
		    } else if (type >= 5 && type <= 9) {
		        if (statusCounts2[status]) {
		            statusCounts2[status] += count;
		        } else {
		            statusCounts2[status] = count;
		        }
		    }
		}
	/*console.log(statusCounts)*/
	if(useUnstrfile==0){
		data = [
	        {
	        	status_code : -1,
	            valueField: "test1",
	            value: statusCounts[-1] !== undefined ? statusCounts[-1] : 0,
	            statusLable: "최적화 미적용"
	        },
	        {
	        	status_code : 0,
	            valueField: "test2",
	            value: statusCounts[0] !== undefined ? statusCounts[0] : 0,
	            statusLable: "최적화 대기"
	        },
	        {
	        	status_code : 1,
	            valueField: "test3",
	            value: statusCounts[1] !== undefined ? statusCounts[1] : 0,
	            statusLable: "최적화 완료"
	        },
	        {
	        	status_code : 2,
	            valueField: "test4",
	            value: statusCounts[2] !== undefined ? statusCounts[2] : 0,
	            statusLable: "최적화 해제"
	        },
	        {
	        	status_code : 11,
	            valueField: "test5",
	            value: statusCounts[11] !== undefined ? statusCounts[11] : 0,
	            statusLable: "최적화 진행중"
	        }
	    ];
	}else {
		
		data = [
	        {
	        	status_code : -1,
	            valueField: "test1",
	            value: statusCounts2[-1] !== undefined ? statusCounts2[-1] : 0,
	            statusLable: "최적화 미적용"
	        },
	        {
	        	status_code : 0,
	            valueField: "test2",
	            value: statusCounts2[0] !== undefined ? statusCounts2[0] : 0,
	            statusLable: "최적화 대기"
	        },
	        {
	        	status_code : 1,
	            valueField: "test3",
	            value: statusCounts2[1] !== undefined ? statusCounts2[1] : 0,
	            statusLable: "최적화 완료"
	        },
	        {
	        	status_code : 2,
	            valueField: "test4",
	            value: statusCounts2[2] !== undefined ? statusCounts2[2] : 0,
	            statusLable: "최적화 해제"
	        },
	        {
	        	status_code : 11,
	            valueField: "test5",
	            value: statusCounts2[11] !== undefined ? statusCounts2[11] : 0,
	            statusLable: "최적화 진행중"
	        }
	    ];
	}
	/*console.log(statusCounts)*/
	series.data.setAll(data);
	
	
	// Disabling labels and ticks
	series.labels.template.set("visible", false);
	series.ticks.template.set("visible", false);

	series.slices.template.setAll({
	  cornerRadius: 8
	});
	series.states.create("hidden", {
	  endAngle: -90
	});

	// Create legend
	// https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
	let legend = chart.children.push(am5.Legend.new(root, {
	  centerY: am5.percent(50),
	  y: am5.percent(50),
	  layout: root.verticalLayout,

	}));
	// set value labels align to right
	legend.valueLabels.template.setAll({ 
		textAlign: "right",
		 fill: am5.color(0xFFFFFF)
	})
	// set width and max width of labels
	legend.labels.template.setAll({ 
	  maxWidth: 140,
	  width: 140,
	  oversizedBehavior: "wrap",
		fill: am5.color(0xFFFFFF)
	});
	legend.data.setAll(series.dataItems);
	
	// Play initial series animation
	// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
	series.appear(1000, 100);
	
	// Function to trigger click on a specific slice
	function clickSliceByIndex(index) {
	    if (index >= 0 && index < series._dataItems.length) {
	        let slice = series._dataItems[index];
	       /* console.log("slice 확인:", slice);*/
	        if (slice) {
	            let sliceElement = slice.get("slice");
	            /*console.log("sliceElement 확인:", sliceElement);*/
	            if (sliceElement) {
	                sliceElement.events.dispatch("click", {
	                    type: "click",
	                    target: sliceElement
	                });
	            } else {
	                console.log("slice.get('slice')가 undefined입니다.");
	            }
	        } else {
	            console.log("해당 인덱스에 데이터 항목이 없습니다.");
	        }
	    } else {
	        console.log("인덱스가 범위를 벗어났습니다.");
	    }
	}
		
	series.events.on("datavalidated", function() {

		let chartDataArray = series.data.values;
		let maxValue = 0;
		let maxIndex = 0;
		for(let i = 0; i < chartDataArray.length; i++){
			if(chartDataArray[i].value > maxValue){
				maxValue = chartDataArray[i].value;
				maxIndex = i;
			}
		}
        setTimeout(() => {
            clickSliceByIndex(maxIndex);
        }, 1500);
    });


}); // end am5.ready()
}



/**
 * 대시보드 기본 데이터 init()
 */
function dashboard_init(){
	
	// init 완료시
	if(g_DASHBOARD_COST.initialized) {
		/* console.log("Dashboard 비용관련 데이터가 이미 init 되었습니다."); */
		g_DASHBOARD_COST.preloadComplete();
		return;
	}
	
	g_DASHBOARD_COST.initialized = true;
	
	// costCtxt 호이스팅
	costCtxt = g_DASHBOARD_COST.getCostContext();
	
	// 외부 라이브러리 init 영역
	/*spin(0,0);*/
	
	
	
	// 비어있는 상태 구성
	g_DASHBOARD_COST.emptyStateRender = function(){
		// 추가 예상 절감 금액
		 $(".slot-container .slot-machine .slot-number").html(`
		    <strong style="font-size: 45px;">0</strong>`);
		
		// 전월 대비 절감액
	     $(".slot-container .slot-machine .reduce-number").html(`<strong style="font-size: 45px;">0</strong>
	             `);

	    // 확인하세요!
	 	$(".alarm ul").html(`<li style="opacity:0.5; margin-top:30px; margin-left: 20px;">확인할 알림이 없습니다.</li>`);
		
		// 비용을 더 절감하려면 어떻게 해야 할까요 ?
		// 비용 절감 가능한 웹 컨텐츠 (area-chart)
	 	$("#temp-chart04").addClass("h-100");
    	$("#temp-chart04").html(`<div class="no-data"><p><ion-icon name="alert-circle-outline"></ion-icon>해당기간 데이터가 존재하지 않습니다.</p></div>`);
		
		// 웹 콘텐츠 유형별 최적화 현황
    	$("#SavingsRate").html(`<strong style="color:rgba(255,255,255,0.3)";>0</strong><span>%</span>`);
		$("#TodaySavingCost").html(`<strong style="color:rgba(255,255,255,0.3)";>0</strong><span>원</span>`);
	};
	
	g_DASHBOARD_COST.emptyStateRender();
	
	
	// ////////////////////////////////////////////////////////
	
	// 리소스 유형별 최적화 카운트 (돼지저금통 대시보드 하단)
	g_DASHBOARD_COST.drawResourceCountEle = async function () {
		
		statusCountArray.sum[-1] = 0;
		statusCountArray.sum[0] = 0;
		statusCountArray.sum[1] = 0;
		statusCountArray.sum[2] = 0;
		statusCountArray.sum[11] = 0;
		statusCountArray.unstrfile_sum[-1] = 0;
		statusCountArray.unstrfile_sum[0] = 0;
		statusCountArray.unstrfile_sum[1] = 0;
		statusCountArray.unstrfile_sum[2] = 0;
		statusCountArray.unstrfile_sum[11] = 0;	
		
		try {
	        resourceCountData = await selectCountGroupByTypeAndStatus();
	        resourceCountArray = resourceCountData.data;
	        
	        let sum = [];	
			sum[-1] = 0;
			sum[0] = 0;
			sum[1] = 0;
			sum[2] = 0;
			sum[11] = 0;
			let unstrfile_sum = [];
			unstrfile_sum[-1] = 0;
			unstrfile_sum[0] = 0;
			unstrfile_sum[1] = 0;
			unstrfile_sum[2] = 0;
			unstrfile_sum[11] = 0;
			
			for(let i=0; i<resourceCountArray.length; i++){
				const {resource_type, resource_status, type_count, status_count, percentage} = resourceCountArray[i];
				const $targetEle = $(`.optimize-progress [data-type=${resource_type}]`);
				
				if(resource_status == 1){ // 실린더 밑 카운트
					$targetEle.find(".value").html(`<strong>${status_count}</strong>/${type_count}건`);			
					$targetEle.find(".percentage").html(`${percentage}%`);
					$targetEle.find(".progress-bar").css({"width" : `${percentage}%`});
				}
				if(resource_status == -1){ // 상단 우측 카드 & 하단 우측 하단 테이블
					const $targetLi = $(`#shortcut li[data-resource-type=${resource_type}]`);
					const $targetTr = $(`.type-status-table2 tr[data-resource-type=${resource_type}]`);
					$targetTr.find(".optimizable-count").html(`<strong>${status_count}건 최적화 가능</strong>`);
					if(status_count == 0){
						$targetLi.find("a").removeAttr("href");
						$targetLi.find(".status").html(`완료<ion-icon name="checkmark-circle"></ion-icon>`);
						$targetLi.find("button").replaceWith('<span class="badge-comp" style="float:right; position:relative; top:7px;">완료</span>');
						$targetTr.find(".optimizable-count").html(`<strong>최적화 완료<ion-icon name="checkmark-circle"></ion-icon></strong>`);
						$targetTr.find(".optimizable-count strong").addClass("zero");
						$targetTr.find(".cell-btn").html(`<span class="badge-comp">완료</span>`);
					}
					if(type_count == 0){ // 아예 데이터가 없는 경우
						$targetLi.find(".status").html(``);
						$targetLi.find(".badge-comp").html('데이터 없음');
						$targetTr.find(".optimizable-count").html(`<strong class="zero">데이터 없음</strong>`);
						$targetTr.find(".cell-btn").html(`<span class="badge-comp">데이터 없음</span>`);
					}
				}
				if(resource_type <= 4){
					sum[resource_status] += status_count;	
				}
				else if(resource_type >= 5){
					unstrfile_sum[status_count] += status_count;
				}
			}
			let total_count = 0; // 리소스 전체 카운트
			let unstrfile_total = 0; 
			strfileCountArray = [];
			unstrfileCountArray= [];
			for(let i = -1; i <= 11; i++){
				let statusItem = statusArray.find(item => item.value == i);
				if(statusCountArray.sum[i]!=undefined){
					total_count += statusCountArray.sum[i];
					strfileCountArray.push({
						statusLable : statusItem.label,
						status : i,
						value : statusCountArray.sum[i],
					});
					
				}
				if(statusCountArray.unstrfile_sum[i]!=undefined){
					unstrfile_total +=	statusCountArray.unstrfile_sum[i];
					/*unstrfileCountArray.push({
						statusLable : statusItem.label,
						status : i,
						value : statusCountArray.unstrfile_sum[i],
					});*/
				}
			}
			let unstrfileTypeCountArray = [];
			unstrfileTypeCountArray[-1] = 0;
			unstrfileTypeCountArray[0] = 0;
			unstrfileTypeCountArray[1] = 0;
			unstrfileTypeCountArray[2] = 0;
			unstrfileTypeCountArray[11] = 0;
			let unstrfileTypeCount = 0;
			let typeCount = 0;
			if(USE_UNSTRFILE == true){
				let unstrfileArray = resourceCountArray.filter(item => item.resource_type >= 5);
				for(let i = 5; i <= 9; i++){
					let typeCountItem = unstrfileArray.find(item => item.resource_type == i);
					unstrfileTypeCount += typeCountItem.type_count;
				}
				for(let j = -1; j <= 11; j++){
					for(let i = 5; i <= 9; i++){
						let typeCountItem = unstrfileArray.find(item => item.resource_type == i && item.resource_status == j);
						if(unstrfileTypeCountArray[j]!=undefined){
							unstrfileTypeCountArray[j] += typeCountItem.status_count;					
						}
					}
				}
				for(let i = -1; i <= 11; i++){
					let statusItem = statusArray.find(item => item.value == i);
					if(unstrfileTypeCountArray[i]!=undefined){
						unstrfileCountArray.push({
							statusLable : statusItem.label,
							status : i,
							value : statusCountArray.unstrfile_sum[i],
						});					
					}
				}
				const $targetEle = $(`.optimize-progress [data-type='5']`);
				const unstrfile_percent = parseInt((unstrfileTypeCountArray[1]/unstrfileTypeCount)*100);
				$targetEle.find(".value").html(`<strong>${unstrfileTypeCountArray[1]}</strong>/${unstrfileTypeCount}건`);
				if(isNaN(unstrfile_percent)){
					unstrfile_percent = 0;
				}			
				$targetEle.find(".percentage").html(`${unstrfile_percent}%`);
				$targetEle.find(".progress-bar").css({"width" : `${unstrfile_percent}%`});
			}
			$(`.type-status-table[data-file-type="strfile"] .unoptimized-count`).html(`<strong style="color:var(--color-yellow);">${statusCountArray.sum[-1]}</strong><strong>/${total_count}</strong><span>건</span>`);	
			$(`.type-status-table[data-file-type="unstrfile"] .unoptimized-count`).html(`<strong style="color:var(--color-yellow);">${unstrfileTypeCountArray[-1]}</strong><strong>/${unstrfileTypeCount}</strong><span>건</span>`);		
			}catch (error) {
	     
			}
	}
	
	
	
	g_DASHBOARD_COST.topDataLoading = function(){
    	
    	const monthCost = costCtxt.monthCost;
		let resourceCountArray = costCtxt.resourceCountArray;
		
		if(!monthCost) return;
    	
    	
    	// 날짜 구하기
    	let currentMonth = new Date();
    	let lastMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    	let today = new Date();
    	let day = today.getDate();
    	
    	currentMonth = formatMonthDisplay(currentMonth); // 이번달
    	lastMonth = formatMonthDisplay(lastMonth); // 지난달
        let formattedDay = day < 10 ? '0' + day : day; // 일자
    	

    	
    	
    	
    	let previous_size1_cost = 0;
    	let previous_size2_cost = 0;
    	let current_size1_cost = 0; 
    	let current_size2_cost = 0;
    	
    	
    	/*let cloud_cost = 0;*/
    	
    	let _cloudNo = -1;
    	
    	for(let item of monthCost){
    		let { resource_new_size_type1, cloud_no } = item;
    		if(_cloudNo<0) {
    			_cloudNo = getCloud_payment(cloud_no);
    		}
    		
    		let allTypesAreZero = resourceCountArray.every(i => i.resource_type === 0);
    		
    		if(allTypesAreZero) {
    			$("#resource_unOpt_cnt").html(0);
    		}else {
    			let totalResourceCount = resourceCountArray.find(i => i.resource_type == "total");
    			let folderCount = resourceCountArray.find(i => i.resource_type == 0);
    			let status_minus_count = totalResourceCount.status_minus_count - folderCount.status_minus_count;
    			$("#resource_unOpt_cnt").html(status_minus_count);
    		}
    	
    		const prev_call_cnt = item.previous_month_call_count;
    		const current_call_cnt = item.current_month_call_count;
    		const prev_opt_cnt = item.previous_month_opt_count;
    		const current_opt_cnt = item.current_month_opt_count;
    		
    		
    		const pre_total_optimized_traffic = item.pre_total_optimized_traffic;
    		const current_total_optimized_traffic = item.current_total_optimized_traffic;
    		
    		
    	   previous_size1_cost += (resource_new_size_type1 * (prev_call_cnt + prev_opt_cnt)) * costCtxt.cloud_cost;  // 전달 총 비용
    	  /* previous_size2_cost += ((resource_new_size_type1 * prev_call_cnt) + pre_total_optimized_traffic) * costCtxt.cloud_cost; // 전달 최적화 후 비용
*/    	   
    	   current_size1_cost += (resource_new_size_type1 * (current_call_cnt + current_opt_cnt)) * costCtxt.cloud_cost; // 이번달 총 비용
    	   /*current_size2_cost += (resource_new_size_type1 * current_call_cnt + current_total_optimized_traffic) * costCtxt.cloud_cost; // 이번달 최적화 후 비용
*/    	    	  
    	}
    	

    	
    	// 전달 대비 절감액(현재 일수까지만 계산)
    	let dayData = getDayLogByTopContent();
 	
    	let pre_cost_1 = 0;
    	let pre_cost_2 = 0;
    	let current_cost_1 = 0;
    	let current_cost_2 = 0;
    	let current_predict_cost = 0;
    	let pre_predict_cost = 0;
		
    	for(let i = 0; i < dayData.length; i++) {
    		if(dayData[i].previous_month_opt_count < 1 || !dayData[i].previous_month_opt_count) dayData[i].pre_total_optimized_traffic = 0;
    		if(dayData[i].current_month_opt_count < 1 || !dayData[i].current_month_opt_count) dayData[i].current_total_optimized_traffic = 0;
    		if(dayData[i].prev_call_cnt < 1 || !dayData[i].prev_call_cnt) dayData[i].prev_call_cnt = 0;
    		if(dayData[i].previous_month_opt_count < 1 || !dayData[i].previous_month_opt_count) dayData[i].previous_month_opt_count = 0;
    		if(dayData[i].currnet_month_call_count < 1 || !dayData[i].currnet_month_call_count) dayData[i].currnet_month_call_count = 0;
    		
    		if(dayData[i].resource_new_size_type1 !== -1) {
    			pre_cost_1 +=  (dayData[i].resource_new_size_type1*(dayData[i].previous_month_call_count + dayData[i].previous_month_opt_count))*costCtxt.cloud_cost;
        		/*pre_cost_2 +=  ((dayData[i].resource_new_size_type1 * dayData[i].previous_month_call_count) + dayData[i].pre_total_optimized_traffic) * costCtxt.cloud_cost;	*/
        		
        		pre_predict_cost += ((dayData[i].resource_new_size_type1 - dayData[i].resource_new_size_type2)*(dayData[i].previous_month_call_count  + dayData[i].previous_month_opt_count)) * costCtxt.cloud_cost;																															
         	   
        		
        		current_cost_1 += (dayData[i].resource_new_size_type1*(dayData[i].current_month_call_count + dayData[i].current_month_opt_count))*costCtxt.cloud_cost;
        		/*current_cost_2 += ((dayData[i].resource_new_size_type1 * dayData[i].currnet_month_call_count) + dayData[i].current_total_optimized_traffic) * costCtxt.cloud_cost;	*/
        		
        		current_predict_cost += ((dayData[i].resource_new_size_type1 - dayData[i].resource_new_size_type2)*(dayData[i].current_month_call_count + dayData[i].current_month_opt_count)) * costCtxt.cloud_cost;	
    		}
    		
    	}

    	if(pre_cost_1 < 0) pre_cost_1 = 0;
    	if(current_cost_1 < 0) pre_cost_1 = 0;
    	
    	let previous_cost = (pre_cost_1 - pre_predict_cost); // 전달 절감된 금액
    	let current_cost = (current_cost_1 - current_predict_cost); // 이번달 절감된 금액
    	
    	/*let pre_month_cost = pre_cost_1 - pre_cost_2;
    	let current_month_cost = current_cost_1 - current_cost_2;*/
    	/*console.log(current_cost_1, current_cost_2, current_month_cost.toFixed(0))*/

    	/*costCtxt.diff_cost = current_month_cost - pre_month_cost;*/
    	costCtxt.todaySavingCost = current_size1_cost - current_predict_cost;
    	
    	
    	
    	$(".optional-component").hide();
    	// 대비 절감액
    	$("#period").html(lastMonth+' ~ '+currentMonth);
    	$("#pre_month").html(lastMonth + formattedDay+'일');
    	$("#current_month").html(currentMonth + formattedDay+'일');
    	$("#pre_month_cost").html(comma(previous_cost.toFixed(0)));
    	$("#current_month_cost").html(comma((costCtxt.diff_cost).toFixed(0)));
    	$("#cloud_no").html(_cloudNo);
    	
    	if(costCtxt.diff_cost <= 0) {
    		$("#save_cost").html('0');
    	}else {
    		$("#save_cost").html(comma(costCtxt.diff_cost.toFixed(0)));
    	}
    	
    	/* console.log(current_size1_cost,current_size2_cost, current_cost) */
    	// 추가 예상 절감 금액
    	$("#totalOrgCost").html(comma((current_size1_cost).toFixed(0)));
    	$("#totalOptCost").html(comma((current_size1_cost-current_predict_cost).toFixed(0)));
    	
    	if(costCtxt.todaySavingCost <= 0) {
    		$("#TodaySavingCost").html(`<strong>0</strong><span>원</span>`);
    	}else {
    		$("#TodaySavingCost").html(`<strong style="color:var(--color-yellow);">${comma(costCtxt.todaySavingCost.toFixed(0))}</strong><span>원</span>`);
    	}
    	
    	
    	// costCtxt.diff_cost = current_size1_cost - costCtxt.savingCost
    	if(costCtxt.savingCost < 0) {
    		$("#reduceCost").html('0');
    	}else {
    		$("#reduceCost").html(comma(current_predict_cost.toFixed(0)));
    	}
    	
    	$(".optional-component").hide();
    	
    	/*
		 * if(previous_cost==0){ costCtxt.diff_cost = current_cost;
		 * g_DASHBOARD_COST.isOnlyThisMonthData = true; }
		 */
    }
	
	

	// 대시보드 메인화면 출력요소
	g_DASHBOARD_COST.costDashboardDataBinding = async function(){
		
		
		const monthCost = costCtxt.monthCost;
		let resourceCountArray = costCtxt.resourceCountArray;
		
		if(!monthCost) return;
		
		/* let newDiffCost = costCtxt.diff_cost; */
	    let previous_size1_cost = 0;
	    let previous_size2_cost = 0;
    	let current_size1_cost = 0; 
    	let current_size2_cost = 0;
    	
    	let newSavingCost = 0;
    	let newDiffCost = 0;


		    
		// 새로운 절감 비용 계산
		for (let item of monthCost) {

			newSavingCost += (item.resource_new_size_type1 - item.resource_new_size_type2) * (item.current_month_call_count + item.current_month_opt_count) * costCtxt.cloud_cost;

			/*if(item.previous_month_opt_count < 1) item.pre_total_optimized_traffic = 0;
			if(item.current_month_opt_count < 1) item.current_total_optimized_traffic = 0;
			
			previous_size1_cost += (item.resource_new_size_type1 * (item.previous_month_call_count + item.previous_month_opt_count)) * costCtxt.cloud_cost; 
			previous_size2_cost += ((item.resource_new_size_type1 * item.previous_month_call_count) + item.pre_total_optimized_traffic) * costCtxt.cloud_cost; 
			
			current_size1_cost += (item.resource_new_size_type1 * (item.current_month_call_count + item.current_month_opt_count)) * costCtxt.cloud_cost; 
	    	current_size2_cost += (item.resource_new_size_type1 * item.current_month_call_count + item.current_total_optimized_traffic) * costCtxt.cloud_cost; */
			
	    	/*if (item.resource_status === -1 || item.resource_new_size_type1 !== -1)
				newSavingCost += ( (item.resource_new_size_type1 * item.current_month_call_count * getAvgComp(item.resource_type)) * costCtxt.cloud_cost); */
		}
		
		
		/*let previous_cost2 = (previous_size1_cost - previous_size2_cost); // 전달 절감된 금액
		let current_cost2 = (current_size1_cost - current_size2_cost); // 이번달 절감된 금액
		console.log(current_cost2)
		
    	if(previous_cost2 < 0) {
    		newDiffCost = current_cos2t - previous_cost2;
    	}else {
    		newDiffCost = current_cost2;
    	}*/
		
    	//현재 일수까지만 계산(전월 대비 절감액)
    	let dayData = getDayLogByTopContent();
    	let diffCost = 0;
    	
    	let previous_cost_total = 0; //이전 데이터 절감 비용
    	let current_cost_total = 0; //이번달 데이터 절감 비용 
    	
    	for(let i = 0; i < dayData.length; i++) {
    		let current_total_count = dayData[i].current_month_call_count + dayData[i].current_month_opt_count;
    	    let previous_total_count = dayData[i].previous_month_call_count + dayData[i].previous_month_opt_count;
    		
    		if(dayData[i].previous_month_opt_count < 1 || !dayData[i].previous_month_opt_count) dayData[i].pre_total_optimized_traffic = 0;
    		if(dayData[i].current_month_opt_count < 1 || !dayData[i].current_month_opt_count) dayData[i].current_total_optimized_traffic = 0;
    		if(dayData[i].prev_call_cnt < 1 || !dayData[i].prev_call_cnt) dayData[i].prev_call_cnt = 0;
    		if(dayData[i].previous_month_opt_count < 1 || !dayData[i].previous_month_opt_count) dayData[i].previous_month_opt_count = 0;
    		if(dayData[i].currnet_month_call_count < 1 || !dayData[i].currnet_month_call_count) dayData[i].currnet_month_call_count = 0;
    		if(dayData[i].resource_new_size_type1 < 1) dayData[i].resource_new_size_type1 = 0;
    		
    		 previous_cost_total += (dayData[i].resource_new_size_type1 - dayData[i].resource_new_size_type2) * previous_total_count * costCtxt.cloud_cost;
    		 current_cost_total += (dayData[i].resource_new_size_type1 - dayData[i].resource_new_size_type2) * current_total_count * costCtxt.cloud_cost;
    	}
    	
    	costCtxt.diff_cost = current_cost_total - previous_cost_total; //전월 대비 절감액

    	/*if(pre_cost_1 < 0) pre_cost_1 = 0;
    	if(pre_cost_2 < 0) pre_cost_2 = 0;
    	if(current_cost_1 < 0) pre_cost_1 = 0;
    	if(current_cost_2 < 0) pre_cost_2 = 0;
    	
    	let pre_month_cost = pre_cost_1 - pre_cost_2;
    	let current_month_cost = current_cost_1 - current_cost_2;*/
	
		// 추가 예상 절감 금액 표시
		if (newSavingCost !== costCtxt.savingCost) {	
			if($(".slot-number span strong")[0]){
				$($(".slot-number .digit")[0]).html(comma(newSavingCost.toFixed(0)));
			}else{
				/*$(".slot-container .slot-machine .slot-number").html(`
			            <strong style="font-size: 45px;">${comma((newSavingCost).toFixed(0))}</strong>`);*/
			}
	     }
		
		costCtxt.savingCost = newSavingCost;
		
		// 전월 대비 절감액 표시
	    if (newDiffCost >= 0) {
	    	if($(".reduce-number span strong")[0]){
	    		$($(".reduce-number .digit")[0]).html(comma(costCtxt.diff_cost.toFixed(0)));
	    	}else{
	    	/* // div 영역이 init되지 않은 경우, html 렌더링
		        $(".reduction-cost .slot-machine .reduction-cost-value").html(`
			             <strong style="font-size: 45px;">${comma(newDiffCost.toFixed(0))}</strong>`);*/
	    	} 
	    }
	    
	    costCtxt.lastDiffCost = costCtxt.diff_cost; 
	    
	    //스핀 업데이트
	    spin(newSavingCost, costCtxt.diff_cost);
		
		// //////////////////////////////////////////////////////////////
	    // 웹 콘텐츠 유형별 최적화 현황 (BOX 데이터)
	    // 월별 데이터를 기준으로 대시보드 데이터 산정
		// 기준데이터 : monthCost
	    

	    // 계산전, 초기화
		costCtxt.current_month_org_size_all = 0;
		costCtxt.previous_month_org_size_all = 0;
		costCtxt.current_month_opt_size_all = 0;
		costCtxt.previous_month_opt_size_all = 0;
		
	    for(let item of monthCost){
	    	
	    	let allTypesAreZero = resourceCountArray.every(i => i.resource_type === 0);
			
			if(allTypesAreZero) {
				$("#resource_unOpt_cnt").html(0);
			}else {
				let totalResourceCount = resourceCountArray.find(i => i.resource_type == "total");
				let folderCount = resourceCountArray.find(i => i.resource_type == 0);
				let status_minus_count = totalResourceCount.status_minus_count - folderCount.status_minus_count;
				$("#resource_unOpt_cnt").html(status_minus_count);
			}		

			const {resource_new_size_type1, total_optimized_traffic, current_month_call_count, previous_month_call_count, current_month_opt_count, previous_month_opt_count} = item;
			
			costCtxt.current_month_org_size_all += (resource_new_size_type1 * (current_month_call_count + current_month_opt_count) ) * costCtxt.cloud_cost
			costCtxt.previous_month_org_size_all += (resource_new_size_type1 * (previous_month_call_count + previous_month_opt_count)) * costCtxt.cloud_cost
			
			costCtxt.current_month_opt_size_all += (resource_new_size_type1 * current_month_call_count + total_optimized_traffic) * costCtxt.cloud_cost
			costCtxt.previous_month_opt_size_all += (resource_new_size_type1 * previous_month_call_count + total_optimized_traffic) * costCtxt.cloud_cost
			
	    }
		

	    costCtxt.todaySavingCost = costCtxt.current_month_org_size_all - costCtxt.current_month_opt_size_all  // 최적화 후 예상 비용(당월)	  
	    costCtxt.lastSavingCost = costCtxt.previous_month_org_size_all - costCtxt.previous_month_opt_size_all // 최적화 후 예상 비용(전월)
	    costCtxt.reduceCost = costCtxt.lastSavingCost - costCtxt.todaySavingCost; // 전월 대비 절감액
	   
		let previous_cost = (costCtxt.previous_month_org_size_all - costCtxt.previous_month_opt_size_all);
		let current_cost = (costCtxt.current_month_org_size_all  - costCtxt.current_month_opt_size_all);
		
		if(previous_cost < 0) previous_cost = 0;
	
		
		/*costCtxt.diff_cost = previous_cost - current_cost;
		if(previous_cost == 0 ) costCtxt.diff_cost = current_cost;*/
		
		// 절감률
		costCtxt.savingsRate =  (1 - (costCtxt.current_month_opt_size_all / costCtxt.current_month_org_size_all) ) * 100;
		
		// //////////////////////////////////////////////////////////////////
				
		if(costCtxt.savingsRate <= 0 || costCtxt.todaySavingCost <= 0) {
			$("#SavingsRate").html(`<strong style="color:rgba(255,255,255,0.3)";>0</strong><span>%</span>`);
			$("#TodaySavingCost").html(`<strong style="color:rgba(255,255,255,0.3)";>0</strong><span>원</span>`);
		}else {
			// $("#TodaySavingCost").html(`<strong
			// style="color:var(--color-yellow);">${comma((costCtxt.todaySavingCost).toFixed(0))}</strong><span>원</span>`);
			$("#SavingsRate").html(`<strong style=" color: var(--color-blue);">${costCtxt.savingsRate.toFixed(0)}</strong><span>%</span>`);
		}
		// /////////////////////////////////////////////////////////////

		// 웹 콘텐츠 유형별 최적화 현황
		costCtxt.trafficData = selectMonthlyTrafficByType();
		const trafficArray = costCtxt.trafficData.data;
	    /* console.log(trafficArray) */

		// 트래픽 계산
		for(let item of trafficArray){
			let resource_type = item.resource_type;
			let percentage = item.percentage;
			
			let $tr = $(`.type-status-table2 tr[data-resource-type=${resource_type}]`);
			$tr.find(`.traffic-rate div`).css({"width":percentage+"%"});
			$tr.find(`.traffic-rate-value`).text(percentage+"%");
			
		}
   
		if(costCtxt.trafficData.resultCode === 204){ // 데이터 없음
			$(`.type-status-table2 .traffic-rate`).html(`데이터가 존재하지 않습니다.`);
		}
			
		try {
			/*costCtxt.newResourceData = await selectNewResourceAll();
			costCtxt.newResourceArray = newResourceData.data;	
			// 새로 추가된 리소스
			let totalNewItemHtml = `<strong style="color:rgba(255,255,255,0.3)";>0</strong><span style="color:rgba(255,255,255,0.3)";>건</span>`;
			let checkNewItemHtml = `<strong style="color:rgba(255,255,255,0.3)";>0</strong><span style="color:rgba(255,255,255,0.3)";>건</span>`;
			const totalNewItem = newResourceArray.find(item => item.resource_status == 99);
			const checkNewItem = newResourceArray.find(item => item.resource_status == 0);
			if (totalNewItem.count > 0){
				totalNewItemHtml = `<strong style="color:#ffffff;">${totalNewItem.count}</strong><span style="color:#ffffff;">건</span>`;		
			}
			if (checkNewItem !== undefined) {
				checkNewItemHtml = `<strong style="color:#ffffff;">${checkNewItem.count}</strong><span style="color:#ffffff;">건</span>`;		
			}*/
			/*$(".new-resource").html(totalNewItemHtml);
			$(".new-resource-check").html(checkNewItemHtml);*/
		}catch (error) {
		} 		
		
		// //////////////////////////////////////////////////////////
		g_DASHBOARD_COST.topDataLoading();
	
	}
	
	// 확인하세요! 렌더링 영역
	g_DASHBOARD_COST.drawAlert = function(){

		var alarmData = getAlertAjax(null,null);
		var alarmArray = alarmData.data;
		/*var latestAlarmArray = getAlertAjax('1',null);*/
		
		/* $(".alarm .number strong").html(latestAlarmArray.length); */
		let alarmHtml = "";
		let strLength = 20;
		let is_new = 0;
		if(alarmData && alarmArray.length > 0){
			const newAlarmCount = alarmArray.filter(alarm => alarm.is_new === 1).length;
				if(newAlarmCount > 0) {
					for(let i = 0; i < alarmArray.length; i++){
						if(alarmArray[i].is_new === 1) {
						is_new++;
						$(".alarm .number strong").html(is_new);
					
						let content = alarmArray[i].content.length > strLength ? alarmArray[i].content.substring(0, strLength) + '...' : alarmArray[i].content;
						alarmHtml += `<li><a href="/alertCenter"><i class="fa-solid fa-bell"></i> ${content}</a></li>`;
					 }
					}
				}else{
					alarmHtml = `<li style="opacity:0.5; margin-top:30px; margin-left: 20px;">확인할 알림이 없습니다.</li>`;
				}
			
		}else {
			alarmHtml = `<li style="opacity:0.5; margin-top:30px; margin-left: 20px;">확인할 알림이 없습니다.</li>`;
		}
		$(".alarm ul").html(alarmHtml);
	}
	

	// 새로 추가된 웹 컨텐츠
	g_DASHBOARD_COST.drawNewResourceEle = async function(){
		try {
			newResourceData = await selectNewResourceAll(0);
		    newResourceArray = newResourceData.data;	
			let totalNewItemHtml = `<strong style="color:rgba(255,255,255,0.3)";>0</strong><span style="color:rgba(255,255,255,0.3)";>건</span>`;
			let checkNewItemHtml = `<strong style="color:rgba(255,255,255,0.3)";>0</strong><span style="color:rgba(255,255,255,0.3)";>건</span>`;
			const totalNewItem = newResourceArray.find(item => item.resource_status == 99);
			const checkNewItem = newResourceArray.find(item => item.resource_status == 98);
			const noData = `<strong style="color:rgba(255,255,255,0.3);">0</trong><span style="color:rgba(255,255,255,0.3);">건</span>`;
			if (totalNewItem.count > 0){
				totalNewItemHtml = `<a><strong style="color:#ffffff;">${totalNewItem.count}</strong><span style="color:#ffffff;">건</span></a>`;		
			}
			
			if (totalNewItem.count == 0){
				totalNewItemHtml = noData;
			}
			if (checkNewItem !== undefined) {
				checkNewItemHtml = `<a><strong style="color:#ffffff;">${checkNewItem.count}</strong><span style="color:#ffffff;">건</span></a>`;		
			}
			if(checkNewItem.count == 0){
				checkNewItemHtml = noData;
			}
			$(`.type-status-table[data-file-type="strfile"] .new-resource`).html(totalNewItemHtml);
			$(`.type-status-table[data-file-type="strfile"] .new-resource-check`).html(checkNewItemHtml);
			
			
			// 비정형
			newUnstrResourceData = await selectNewResourceAll(1);
			newUnstrResourceArray = newUnstrResourceData.data;
			totalNewItemHtml = "";
			checkNewItemHtml = "";
			const totalUnstrNewItem = newUnstrResourceArray.find(item => item.resource_status == 99);
			const checkUnstrNewItem = newUnstrResourceArray.find(item => item.resource_status == 98);
			if(totalUnstrNewItem.count == 0) {
				totalNewItemHtml = noData;
			}
			if (totalUnstrNewItem.count > 0){
				totalNewItemHtml = `<a><strong style="color:#ffffff;">${totalUnstrNewItem.count}</strong><span style="color:#ffffff;">건</span></a>`;		
			}
			if (checkUnstrNewItem !== undefined) {
				checkNewItemHtml = `<a><strong style="color:#ffffff;">${checkUnstrNewItem.count}</strong><span style="color:#ffffff;">건</span></a>`;		
			}
			if(checkUnstrNewItem.count == 0){
				checkNewItemHtml = noData;
			}	
			$(`.type-status-table[data-file-type="unstrfile"] .new-resource`).html(totalNewItemHtml);
			$(`.type-status-table[data-file-type="unstrfile"] .new-resource-check`).html(checkNewItemHtml);			
			
		}catch (error) {
		} 		
	}
	

	


	// ////////////////////////////////////////////////////////
	
	
	// 대시보드에 적용될 전체 비용 관련 데이터 로딩
	g_DASHBOARD_COST.dataContextLoading = function(){
		
		const td = g_DASHBOARD_COST.getTargetDate();
		
		return new Promise((resolve, reject) => {
	        $.ajax({
	            type: 'GET',
	            url: '/dashboard-cost-dataload',
	            data: {
	                target_date: td
	            },
	            success: function(res) {
	            	const {status} = res;
	            	
	            	if(status == 'FAIL') {
	            		reject(status);
	            		return; 
	            	}
	            	
	                // console.log(td, res);
	                resolve(res); 
	            },
	            error: function(error) {
	                console.error(error);
	                reject(error); 
	            }
	        });
	    });
	};
	
	
	// 1 tick당 실행되는 메인 dashboard 함수
	// interval 1 tick당 실행된다.
	g_DASHBOARD_COST.dashboardTickProcess = function(){

		const _t = g_DASHBOARD_COST || this;
		
		// 초기화 되지 않은 경우 실행되는 interval
		if(!_t.initialized) return;
		
		_t.lastCheckedDate = new Date();
		// target date 갱신
		const targetDate = targetDateInit();
		_t.setTargetDate(targetDate);
		
		

		// 대시보드 관련 전체 비용 데이터 로딩 ( 실제 데이터 성공한 이후, 대시보드 작동 )
		g_DASHBOARD_COST.dataContextLoading().then( data => {
			/* 데이터로딩에 성공한 이후 */
			const _t = g_DASHBOARD_COST;
			
			let costCtxt = _t.getCostContext();
			

			// api-get 데이터 반영
			const { monthCost, dayCost, resourceCountArray } = data;
			costCtxt.monthCost = monthCost;
			costCtxt.dayCost = dayCost;
			costCtxt.resourceCountArray = resourceCountArray;
			
			
			// 1) cloud_cost 계산
			let { cloud_cost } = costCtxt;
			
						
			if(cloud_cost <= 0){
				// cloud_cost가 아직 계산되지 않은 경우
				for(let item of monthCost){
					// 1GB당 금액
					 const cloud_cost_gb = getCloud_payment(item.cloud_no);
					 /* console.log('cost(원) per 1 GB', cloud_cost_gb); */
					// 바이트당 금액
					 cloud_cost = (cloud_cost_gb * 1.0) / (1024 * 1024 * 1024);
					 if(cloud_cost > 0){
						 costCtxt.cloud_cost = cloud_cost;
						 break;
					 }
				}	
			}
			
			// ///////////////////////////////////////////
			
			// 돼지 저금통 하단 count 관련 리소스 렌더링
			g_DASHBOARD_COST.drawResourceCountEle();
			
			// 추가 예상 절감 금액, 전월 대비 절감액, 웹 콘텐츠 유형별 최적화 현황
			g_DASHBOARD_COST.costDashboardDataBinding();
			
			// 새로 추가된 웹 콘텐츠
			g_DASHBOARD_COST.drawNewResourceEle()

		   
		    // 확인하세요!
			g_DASHBOARD_COST.drawAlert();

			
			// 비용을 더 절감하려면 어떻게 해야 할까요 ?
		 	
			// 비용 절감 가능한 웹 컨텐츠 (area-chart)
		 	
			
		}).catch(error => {
		    console.error('Error loading data:', error);
		});
		
		// 실시간 데이터 로딩
		loadRealtimeData();
	};
	
	// 최초 실행
	g_DASHBOARD_COST.dashboardTickProcess();
	
	// 실시간 데이터 로딩 interval 시작
	var interval_tmp = setInterval(function() {
		if (document.visibilityState === 'visible') {
			// console.log('페이지가 현재 보이는 상태입니다.');
			g_DASHBOARD_COST.dashboardTickProcess();
		} else {
			// do-nothing
		}
	}, g_DASHBOARD_COST.threshold['interval']);
	
	g_DASHBOARD_COST.interval_idList.push(interval_tmp);
	
	g_DASHBOARD_COST.preloadComplete();
	
	/* console.log("dashboard 비용관련 데이터 init 완료"); */
}


/**
 * 실시간 데이터 로딩
 */
function loadRealtimeData(){
	const userCount = selectUserCount().data.count; // 접속자 수
	/*console.log(userCount);*/
	$("#user-count span").html(userCount);
	$.ajax({
		type: 'GET',
		url: '/selectViewLogAll',
		data:{
			target_date : g_DASHBOARD_COST.getTargetDate()
		},
		success: function(response) {
			let { data }  = response;
			
			let limit = g_DASHBOARD_COST.threshold['queue'];
			let timeoutUnit = g_DASHBOARD_COST.threshold['timeoutUnit'];
			
			for(let idx=0 ; idx <= data.length; idx++){
				if(idx > limit) break;
				
				// -50에서 +100 사이의 랜덤값
	            let alpha = Math.floor(Math.random() * 151) - 50; 
	            let randomTimeout = timeoutUnit + alpha;
	            
	            // 실시간 데이터를 큐로 관리
	            let queueObj = g_DASHBOARD_COST.getRealtimeContext();
	            
	            if(queueObj.queue.length > limit) {
	            	console.warn(`realtime coin의 수가 ${limit}을 초과하여 애니메이션에서 SKIP 합니다.`);
	            	g_DASHBOARD_COST.isSkiped = true;
	            	continue;
	            }
	            	
	            	
	            queueObj.enqueueRealtime(data[idx]);
	            
	            
	            
				setTimeout(function(){
					const _data = queueObj.dequeueRealtime();
					animationForeach_v2([ _data ]);
					// animationForeach_v2([ _data ]);
				}, randomTimeout * idx );
			}
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
}


/**
 * 슬롯 머신 구현 부분
 */
let previousCost = null;
let previousLastCost = null;

function formatCostToString(cost, targetElement) {
    if (!cost) cost = 0;

    cost = cost.toFixed(0);

    // 숫자를 문자열로 포맷 (천 단위 구분기호 포함)
    let costStr = new Intl.NumberFormat().format(cost);
    let numericLength = costStr.replace(/,/g, '').length;
    
    const slots = ['.slot1','.slot2', '.slot3', '.slot4', '.slot5', '.slot6', '.slot7'];
    // 초기화 (hide)
    slots.forEach(slot => $(targetElement).find(slot).hide());
    
    // 목표 값만큼 show
    for (let i = 0; i < numericLength; i++) {
        $(targetElement).find(slots[i]).show();
    }
    
    // 콤마 초기화
    const commas = ['.comma1', '.comma2', '.comma3', '.comma4'];
    commas.forEach(comma => $(targetElement).find(comma).hide());
   
    // 콤마 표시
    if (numericLength == 4) $(targetElement).find('.comma1').show();
    if (numericLength == 5) $(targetElement).find('.comma2').show();
    if (numericLength == 6) $(targetElement).find('.comma3').show();
    if (numericLength == 7) {
        $(targetElement).find('.comma1').show();
        $(targetElement).find('.comma4').show();
    }
  
    return costStr.split('');
  
}

// 슬롯의 위치를 업데이트하는 함수
function updateSlotPositions(slots, costString, offset) {
	const digitsOnly = costString.filter(char => char !== ',');
	
	let zeroArray = [];
	for(let i = 0; i < digitsOnly.length; i++){
		zeroArray.push(0);
	}
	/*console.log("digitsOnly",digitsOnly);
	console.log("zeroArray",zeroArray);*/
	slots.forEach((slot, index) => {
		let rand = Math.floor(Math.random() * 10);
		//slot.style.top = `-0.6em`;
		slot.style.top = `-${(rand * 3 + offset)}em`;
	});
	setTimeout(function(){
	
	    slots.forEach((slot, index) => {
	    	if (index < digitsOnly.length) {
	            let digit = parseInt(digitsOnly[index], 10);
	    	
	            // 숫자가 유효한지 체크
	            if (!isNaN(digit)) {
	                // 슬롯의 위치를 업데이트
	                slot.style.top = `-${(digit * 3 + offset)}em`;
	            } 
	    	}
	    });
		
	},500);
}

//비용 업데이트 함수
function updateCost(cost, lastCost) {
	
	let targetElement1 = $('.slot-container-1');
	let targetElement2 = $('.slot-container-2');
	
	let costString = formatCostToString(cost, targetElement1); // 현재 비용을 포맷팅
	let costString2 = formatCostToString(lastCost, targetElement2); // 이전 비용을 포맷팅
  
    let slots = document.querySelectorAll('.slot-machine .slot-number'); // 현재 비용을 나타내는 슬롯
    let slots2 = document.querySelectorAll('.slot-machine .reduce-number'); // 이전 비용을 나타내는 슬롯

    updateSlotPositions(slots, costString, 0.7); // 현재 비용에 따른 슬롯 위치 업데이트
    updateSlotPositions(slots2, costString2, 0.7); // 이전 비용에 따른 슬롯 위치 업데이트
}


//스핀 함수
function spin(cost, lastCost) {
   /* if (cost === undefined || lastCost === undefined) {
        return;
    }*/
	 if (cost !== previousCost || lastCost !== previousLastCost) {
	        updateCost(cost, lastCost);
	        // 현재 값을 이전 값으로 저장
	        previousCost = cost;
	        previousLastCost = lastCost;
	    } else {
	       /* console.log('비용 변화가 없습니다.');*/
	    }
}

function animationForeach_v2(datalist) {
	let $topAnimation = $('#top-animation');
    /* const $pig = $('#pig'); */
    
    for (let i = 0; i < datalist.length; i++) {
    	let item = datalist[i];
        
        if (item) {
            let selectedImage = contextPath + '/resources/img/coin.png';
            let randomTop = Math.floor(Math.random() * 20) + 25;
            let randomTop2 = Math.floor(Math.random() * 5) + 40;
            let randomTop3 = Math.floor(Math.random() * 20) + 40;
            
           /* let resource_type = item.resource_type; */
            let optimized = "";
            if (item.resource_status == 1) {
                optimized = "optimized";
            }
            
            let $content = $(`<p class="value content before ${optimized}"><img src="${selectedImage}" style="width: 50px;"/></p>`);
            $topAnimation.append($content);
            $content.css({
                'top': randomTop + '%',
                '--random-top2': randomTop2 + '%',
                '--random-top3': randomTop3 + '%'
            });
            $content.addClass('move-center');
            $content.on('animationend', function (e) {
                if (e.originalEvent.animationName === 'moveToCenter') {
                   /* let $value = $pig.find(`.type0${resource_type} .value`); */
                    /*
					 * let cnt = parseInt($value.text()); cnt += 1;
					 */
                    
                	if (item.resource_status === 1) {
                        animatePiggyBank1();
                        animateCoinDrop();
                        $(this).html(`<p class="content optimized"><img src="${selectedImage}" style="width:20px;"/></p>`);
                      
                    }else {
                    	
                    	$(this).html(`<p class="content optimized"><img src="${selectedImage}" style="width:50px;"/></p>`);
                    }
                    
                    $content.removeClass('before').addClass('after move-right');
                } else if (e.originalEvent.animationName === 'moveToRight') {
                    $content.remove();
                    // 서버 상태 표시
                    
                    let total = $topAnimation.find('.value .content').length;
                    
                    let $serverColor = $("#top-animation .station.server .color");
                    $serverColor.css({"opacity": "0.0"});
                    if (total > 12) {
                        $serverColor.filter(".red").css({"opacity": "1.0"});
                    } else if (total > 7) {
                        $serverColor.filter(".yellow").css({"opacity": "1.0"});
                    } else {
                        $serverColor.filter(".green").css({"opacity": "1.0"});
                    }
                    
                    if (g_DASHBOARD_COST.isSkiped) {
                        setMonitor(null);
                        g_DASHBOARD_COST.isSkiped = false;
                    } else {
                        setMonitor(item);
                    }
                    if (total === 0) {
            			$("#time-monitor").html("0");
            			$("#top-animation .station.server .color").css({"opacity":"0.0"});
            			}
                }
            });
        }
    }
}


/**
 * 날짜가 바뀌었는지 확인
 */
function isChangedDay(lastCheckedDate){
	if(lastCheckedDate==null)
		lastCheckedDate = g_DASHBOARD_COST.lastCheckedDate
	 // 현재 날짜
    const currentDate = new Date();

    // 연도, 월, 일 비교
    const lastYear = lastCheckedDate.getFullYear();
    const lastMonth = lastCheckedDate.getMonth();
    const lastDay = lastCheckedDate.getDate();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    // 하루가 바뀌었는지 확인
    if (lastYear !== currentYear || lastMonth !== currentMonth || lastDay !== currentDay) {
        /* console.log('하루가 바뀌었습니다.'); */
        return true;
    } else {
        // console.log('아직 같은 날입니다.');
        return false;
    }

}


function setMonitor(item){
	
	const lastCheckedDate = g_DASHBOARD_COST.lastCheckedDate;
	if(lastCheckedDate== null){
		g_DASHBOARD_COST.lastCheckedDate = new Date();
		lastCheckedDate = g_DASHBOARD_COST.lastCheckedDate;
	}
	
	// 날이 바뀌었거나, 모니터 비용이 계산되지 않았거나, 데이터를 넘기지 않은 경우
	// 모니터 출력 누적 절약 비용 재정산
	if(isChangedDay(lastCheckedDate) || costCtxt.monitorCost == 0 || item == null){
		let dayCostData =  costCtxt.dayCost;
		
		costCtxt.monitorCost = 0;
		let current_day_cost = 0;
		let pre_day_cost = 0;
		
		for(let item of dayCostData){
			let {current_day_count=0, current_opt_count=0, current_total_optimized_traffic=0, resource_new_size_type1} = item;

			// 해당 데이터 로그 기준, 다음의 값이 하나라도 falsy인 경우, 모두 0으로 초기화 (계산방지)
			if(current_opt_count < 1) total_optimized_traffic = 0;
			
			// 최적화를 적용하지 않은 경우의 최대 비용
			current_day_cost = (resource_new_size_type1 * (current_day_count + current_opt_count) ) * costCtxt.cloud_cost;
			// 실제 제공 비용
			pre_day_cost = ( (resource_new_size_type1 * current_day_count) + current_total_optimized_traffic ) * costCtxt.cloud_cost;
			
			costCtxt.monitorCost += current_day_cost - pre_day_cost;
		}
		
		$("#time-monitor").html(comma(costCtxt.monitorCost.toFixed(0)));
		
		return;
	}
	// 모니터 비용 재정산이 아닌 경우, 현재 데이터의 비용만 덧셈
	
    // 최적화 전 비용
    const orgCost = item.resource_new_size_type1 * costCtxt.cloud_cost;
    // 실제 사용 비용
    const realCost = item.resource_new_size_type2 * costCtxt.cloud_cost;
    const saving_cost = orgCost - realCost;
	
	costCtxt.monitorCost += saving_cost;
	$("#time-monitor").html(comma(costCtxt.monitorCost.toFixed(0)));
	
}



// 전역 변수로 애니메이션 실행 여부를 저장할 변수 추가
let isPiggyBank1Animating = false;
/* let isPiggyBank2Animating = false; */
let isCoinDropAnimating = false;
// 돼지 효과 애니메이션 함수
function animatePiggyBank1() {
    if (!isPiggyBank1Animating) {
        isPiggyBank1Animating = true;
        $('#piggy-bank').animate({
            width: '+=15px',
            height: '+=15px',
        }, 1000, function () {
            $('#piggy-bank').animate({
                width: '-=15px',
                height: '-=15px',
            }, 1000, function () {
                isPiggyBank1Animating = false;
            });
        });
    }
}
function animateCoinDrop(){

	if ($('#coin-drop').parent().css("display") === "none") {
	    $('#coin-drop').parent().css("display", "");
	}
	 if (!isCoinDropAnimating) {
		 isCoinDropAnimating = true;
	        $('#coin-drop').animate({
	        	opacity: '1'
	        }, 50, function () {
	            $('#coin-drop').animate({
	            	opacity: '0'
	            }, 2000, function () {
	            	isCoinDropAnimating = false;
	            });
	        });
	    }
}


// 전역
let current_month_org_size_all=0;  // 현재달 미최적화
let current_month_opt_size_all=0;  // 현재달 최적화
let previous_month_org_size_all=0; // 지난달 최적화
let previous_month_opt_size_all=0; // 지난달 미최적화

let reduceCost = 0; 
let lastSavingCost = 0; 

 

// 추가 예상 절감 금액 상위 콘텐츠
topFunctions.costPredictTopContent = function(){	
	let descHtml = `해당 수치는 아직 최적화가 적용되지 않은 웹 콘텐츠를 당월 기준으로 최적화했을 경우 산정된 금액입니다.`;
	$desc.html(descHtml);

	let topPredictContentHtml = `현재 최적화 미적용 웹 콘텐츠는 <span id="resource_unOpt_cnt"></span>건 입니다. 현재 기준으로 최적화 전 예상 금액은 약
	<span id="totalOrgCost">0</span>원 입니다.</br>웹 콘텐츠의 최적화를 진행 할 경우, 추가로 약 <span id="reduceCost">0</span>원의 절감이 예상 됩니다. 따라서 추가 예상 절감 금액까지 반영 된 예상 금액은(당월 기준) 약 <span id="totalOptCost">0</span>원 입니다.`;
	$topContent.html(topPredictContentHtml);
	let topValueData = null;
	setTimeout(function(){
		g_DASHBOARD_COST.topDataLoading();

	},500);
	
    const originalUpdateButtons = updateButtons; // 기존 updateButtons 함수를 참조
    updateButtons = function() { // updateButtons 함수를 확장하여 재정의
        originalUpdateButtons();// 기존 함수 호출
       /* let currentData = $("#current-month").text(); */
	    /* console.log(currentData); */
        g_DASHBOARD_COST.topDataLoading();
    }  
}


// 전월 대비 금액 상위 콘텐츠
topFunctions.costReduceTopContent = function(){
	let descHtml = `현재를 기준으로 전월 [<span style="font-weight:bold;"id="period"></span>] 기간의 데이터 비용을 산정한 금액입니다.`;
	$desc.html(descHtml);
	
	let topReduceContentHtml = `<span id="pre_month"></span>의 데이터 절감 비용은 약<span id="pre_month_cost"></span>원 이고 <span id = "current_month"></span>의 데이터 절감 비용은 
		약 <span id="current_month_cost"></span>원 으로  약 <span id= "save_cost"></span>원 절약하였습니다. 데이터 비용은 1GB당 <span id="cloud_no"></span>원 입니다.`;
	$topContent.html(topReduceContentHtml);
	let topValueData = null;
	
	g_DASHBOARD_COST.topDataLoading();
}



// 전월 대비 절감액 타뷸레이터
tabulatorFunctions.costReduceTabulator = function(data){
	
	let currentMonth = new Date();
	let lastMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
	
	currentMonth = formatMonthDisplay(currentMonth); // 이번달
	currentMonthArray = currentMonth.split(" ");
	currentMonthOnly = currentMonthArray[1];
		
	lastMonth = formatMonthDisplay(lastMonth) // 지난달
	lasttMonthArray = lastMonth.split(" ");
	lasttMonthOnly = lasttMonthArray[1];
	
	let result = new Tabulator("#volist", {
		height:"500px",
		selectable:false,
	    progressiveLoad:"scroll",	    
	    // pagination:true, // progressiveLoad 옵션과 양립 X
	    paginationMode:"remote", // enable remote pagination
	    paginationSize:1000, // 목록 크기
	    progressiveLoad:"scroll",	
	   /* sortMode: "remote",*/
	    ajaxURL:"/selectResourceAllWithLatestDayLogByTopContent", // set url for
																// ajax request
	    ajaxParams: data,	    
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
	    ajaxResponse: function(url,prarm,response){
	    	/*console.log(response)*/
	    	$("#list_cnt span").html(response.list_cnt);
	    	
	    	let total_diffCost = 0;
	    	
				for (let i = 0; i < response.data.length; i++) {
				
				if(response.data[i].previous_month_opt_count < 1 || !response.data[i].previous_month_opt_count) response.data[i].pre_total_optimized_traffic = 0;
				if(response.data[i].previous_month_call_count < 1 || !response.data[i].previous_month_call_count) response.data[i].previous_month_call_count = 0;
				if(response.data[i].current_month_opt_count < 1 || !response.data[i].current_month_opt_count) response.data[i].current_total_optimized_traffic = 0;
				if(response.data[i].current_month_opt_count < 1 || !response.data[i].current_month_opt_count) response.data[i].current_month_opt_count = 0;
				if(response.data[i].resource_new_size_type1 < 1) response.data[i].resource_new_size_type1 = 0;
				
				response.data[i].current_total_count =  response.data[i].current_month_call_count + response.data[i].current_month_opt_count;
				response.data[i].previous_total_count =  response.data[i].previous_month_call_count + response.data[i].previous_month_opt_count;
				
				
				let previous_cost = (response.data[i].resource_new_size_type1 - response.data[i].resource_new_size_type2) * response.data[i].previous_total_count * costCtxt.cloud_cost;
				let current_cost = (response.data[i].resource_new_size_type1 - response.data[i].resource_new_size_type2) * response.data[i].current_total_count * costCtxt.cloud_cost;
				
				response.data[i].previous_cost = previous_cost;
				response.data[i].current_cost = current_cost;
				response.data[i].diff_cost = (response.data[i].current_cost - response.data[i].previous_cost);
				total_diffCost += (response.data[i].current_cost - response.data[i].previous_cost);
				}
				/*console.log('전월대비 금액 합:', total_diffCost.toFixed(0))*/
	    	return response; 
	    },
	    paginationInitialPage: 1,
	    paginationLoading: "<div class='custom-pagination-loader'><div class='spinner'></div>Loading...</div>",
	    layout: "fitColumns",
	    columns: [ 		    	
	    	{
	    		title: "No",
	    		field: "row_no",
	    		width: 60,
	    		hozAlign: "right",
	    		headerHozAlign:"right",
	    		headerSort:true,
	    		resizable:false
	    	},
	    	{
	    		title: "구분",
	    		field: "resource_type",
	    		hozAlign: "center",
	    		headerHozAlign:"center",
	    		headerSort:false,
	    		resizable:false,
	    		resizable:false,
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
	    		}	    	
	    	},
	    	
	    	{
	    		title: "웹 콘텐츠 이름",
	    		field: "resource_name",
	    		hozAlign: "left",
	    		headerSort:true,
	    		widthgrow :true,
	    		resizable:false,
	    		cellClick: function(e, cell) {
	                let rowData = cell.getRow().getData(); // 클릭된 셀의 행 데이터 가져오기
	                if(rowData['resource_type'] == 0){
	                	$('#folderlist').jstree(true).deselect_all();
	                	$('#folderlist').jstree(true).select_node(rowData['resource_no']);	                	
	                }
	            }	    		
	    	},		
	    	/*{
	    		title: "이번달 호출횟수",
	    		field: "current_total_count",
	    		width: 150,
	    		hozAlign: "right",
	    		headerSort:true,
	    		widthgrow :true,
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return comma(cell.getValue().toFixed(0));
	    		}	    		
	    	},	
	    	{
	    		title: "저번달 호출횟수",
	    		field: "previous_total_count",
	    		width: 150,
	    		hozAlign: "right",
	    		headerSort:true,
	    		widthgrow :true,
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return comma(cell.getValue().toFixed(0));
	    		}	    		
	    	},	*/
	    	/*{
	    		title: "최적화 전 용량",
	    		field: "resource_new_size_type1",
	    		width: 150,
	    		hozAlign: "right",
	    		headerSort:true,
	    		widthgrow :true,
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return fileSizeUnitFormatter(cell.getValue());
	    		}	    		
	    	},	
	    	
	    	{
	    		title: "최적화 후 용량",
	    		field: "resource_new_size_type2",
	    		width: 150,
	    		hozAlign: "right",
	    		headerSort:true,
	    		widthgrow :true,
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return fileSizeUnitFormatter(cell.getValue());
	    		}	    		
	    	},	*/
	    	{
	    		title: "전월 절감액",
	    		field: "previous_cost",
	    		width: 150,
	    		hozAlign: "right",
	    		headerSort:true,
	    		widthgrow :true,
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return comma(cell.getValue().toFixed(0))+"원";
	    		}	    		
	    	},	    	
	    	{
	    		title: "당월 절감액",
	    		field: "current_cost",
	    		width: 150,
	    		hozAlign: "right",
	    		headerSort:true,
	    		widthgrow :true,
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return comma(cell.getValue().toFixed(0))+"원";
	    		},    		
	    	},	    	
	    	{
	    		title: "전월 대비 절감액",
	    		field: "diff_cost",
	    		width: 200,
	    		hozAlign: "right",
	    		headerSort:true,
	    		widthgrow :true,
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return `<span style="color: #FFC107;">${comma(cell.getValue().toFixed(0))}원</span>`;
	    		},    		
	    	},	    		    		
	    ],	    
	});	
	
	/*g_DASHBOARD_COST.grid = result;*/
	
	return result;
}

// 추가 예상 절감 금액 타뷸레이터
tabulatorFunctions.costPredictTabulator = function(data){
	let result = new Tabulator("#volist", {
		height:"500px",
		selectable:false,
	    progressiveLoad:"scroll",	    
	    // pagination:true, // progressiveLoad 옵션과 양립 X
	    paginationMode:"remote", // enable remote pagination
	    paginationSize:1000, // 목록 크기
	    progressiveLoad:"scroll",	
	    /*sortMode: "remote",*/
	    ajaxURL:"/selectResourceAllWithLatestLogByTopContent", // set url for
																// ajax request
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
					"loading":`<div class="spinner-border te-primary m-1" role="stus"><span class="sr-only">Loading...</span></div>`,
					"error":"Error",
				},          
	            
	        },
	    },	    
	    ajaxContentType : "application/json; charset=utf-8",
	    ajaxContentType:"json",
	    ajaxResponse:function(url,prarm,response){
	    	/*console.log(response)*/
	    	
	    	// console.log("page : "+this.getPage());
	    	// console.log("size : "+this.getSize());
	    	$("#list_cnt span").html(response.list_cnt);
	    	
			let opt_size_all = 0;
			let totalOptSizeAll = 0; 
			
			for (let i = 0; i < response.data.length; i++) {
				
				if(response.data[i].resource_org_size == -1) response.data[i].resource_new_size_type1 = 0;
				response.data[i].resource_new_size_type2 = response.data[i].resource_new_size_type2; // 최적화 후 파일 크기
				response.data[i].call_cnt = response.data[i].current_month_call_count + response.data[i].current_month_opt_count; // 호출횟수
				
				if(!response.data[i].current_month_call_count && !response.data[i].current_month_opt_count) {
					response.data[i].savings_amount = '0';
				}else {
						opt_size_all = (response.data[i].resource_new_size_type1 - response.data[i].resource_new_size_type2) * response.data[i].call_cnt * costCtxt.cloud_cost;		
						response.data[i].savings_amount = opt_size_all.toFixed(0);
						totalOptSizeAll += opt_size_all;
				}
			}
			/*console.log('추가 예상 절감 금액 합:', totalOptSizeAll.toFixed(0));*/
	    	return response; 
	    },
	    paginationInitialPage: 1,
	    paginationLoading: "<div class='custom-pagination-loader'><div class='spinner'></div>Loading...</div>",
	    layout: "fitColumns",
	    columns: [ 		    		    	
	    	{
	    		title: "No",
	    		field: "row_no",
	    		width: 60,
	    		hozAlign: "right",
	    		headerHozAlign:"right",
	    		headerSort:true,
	    		resizable:false
	    	},
	    	{
	    		title: "구분",
	    		field: "resource_type",
	    		hozAlign: "center",
	    		headerHozAlign:"center",
	    		headerSort:false,
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
	    		title: "웹 콘텐츠 이름",
	    		field: "resource_name",
	    		width: 260,
	    		hozAlign: "left",
	    		headerSort:false,
	    		resizable:false,
	    		cellClick: function(e, cell) {
	                let rowData = cell.getRow().getData(); // 클릭된 셀의 행 데이터 가져오기
	                if(rowData['resource_type'] == 0){
	                	$('#folderlist').jstree(true).deselect_all();
	                	$('#folderlist').jstree(true).select_node(rowData['resource_no']);	                	
	                }
	            }	    		
	    	},	
	    	{
	    		title: "호출횟수(회)",
	    		field: "call_cnt",
	    		hozAlign: "right",
	    		headerSort:true,
	    		resizable:false,
	    		width: 120,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			 let value = cell.getValue();
	    			
	    			 if (value === null || value === undefined) {
	    		            value = "0";
	    		        }else {
	    		        	value = Number(value).toLocaleString();
	    		        }
	    			 return value;
	    		},
	    	},	    	
	    	{
	    		title: "최적화 전 용량",
	    		field: "resource_new_size_type1",
	    		width: 160,
	    		hozAlign: "right",
	    		headerSort:true,
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = "";
	    			if(cell.getValue() <= 0){
	    				result = `<ion-icon name="close-circle-outline" style="font-size:1.3em; color:#b4b4b4;"></ion-icon>`;
	    			}else{
	    				result = fileSizeUnitFormatter(cell.getValue());
	    			}
	    			return result;
	    		},  
	    	},	   
	    	{
	    		title: "예상 최적화 후 용량",
	    		field: "resource_new_size_type2",
	    		width: 200,
	    		hozAlign: "right",
	    		headerSort:true,
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			if(cell.getValue() < 0) {
	    				result = `<ion-icon name="close-circle-outline" style="font-size:1.3em; color:#b4b4b4;"></ion-icon>`;
	    			}else {
	    				result = fileSizeUnitFormatter(cell.getValue());
	    			}
	    			return result;
	    		},
	    	},	
	    	{
	    		title: "예상 절감 가능 금액",
	    		field: "savings_amount",
	    		width: 180,
	    		hozAlign: "right",
	    		/*headerSort:true,*/
	    		sorter: "number",  //숫자 기준 정렬
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	                   return `<span style="color: #FFC107;">${comma(cell.getValue())}원</span>`;
	    			
	    		},
	    	},
	    	
	    ],	    
	});	
	
	return result;
}


// yyyy년 mm월 형식으로 변환
function formatMonthDisplay(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}년 ${month}월`;
}
// yyyy년 mm월 dd일 형식으로 변환
function formatDate(dateStr) {
    let date = new Date(dateStr);
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1,
															// 두 자리 숫자로 포맷
    let day = ('0' + date.getDate()).slice(-2); // 두 자리 숫자로 포맷

    return `${year}년 ${month}월 ${day}일`;
}

/*function selectAlgorithmType(algorithm_type){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/selectAlgorithmType',
		data:{
			algorithm_type : algorithm_type,    
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
}*/

/*function selectLastMonthlyTrafficByType(){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectLastMonthlyTrafficByType',
		data:{
			startDateParam : urlParams.get("startDate")
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
}*/

/*function selectResourceAllUnoptimized(){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectResourceAllUnoptimized',
		data:{},
		async: false,
		success: function(res) {
			result = res;
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	return result;
}*/

function totalUnOptAllSize(){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/totalUnOptAllSize',
		data:{},
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


/*function selectCountByResourceStatus(){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectCountByResourceStatus',
		data:{},
		async: false,
		success: function(res) {
			result = res;
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	return result;
}*/

async function drawTypeSizeStatusEle(){
	try {
        sumResourceTypeSizeData = await selectSizeGroupByType();
        sumResourceTypeSizeArray = sumResourceTypeSizeData.data;
		for(let i = 0; i < sumResourceTypeSizeArray.length; i++){
			const {resource_type, size1, size2, percentage} = sumResourceTypeSizeArray[i];
			if(resource_type >= 5){
				let $tr = $(`.type-status-table2 tr[data-resource-type=${resource_type}]`);
				$tr.find(".time-rate").html(`<div style="width:0%">&nbsp;</div><p>${percentage}%</p>`);
				
				$tr.find(".time-rate-value").html(`${fileSizeUnitFormatter_v2(size1)} <i class="fa-solid fa-right-long"></i> ${fileSizeUnitFormatter_v2(size2)}`);
				setTimeout(function(){
					$tr.find(".time-rate div").animate({"width":percentage+"%"});
				}, 500);
			}
		}	
	}catch (error) {
    } 	
}

function targetDateInit(){
	let now = new Date();

	// 년, 월, 일을 추출합니다.
	let year = now.getFullYear();
	let month = ('0' + (now.getMonth() + 1)).slice(-2);
	let day = ('0' + now.getDate()).slice(-2);

	// 시, 분, 초, 밀리초를 추출합니다.
	let hours = ('0' + now.getHours()).slice(-2);
	let minutes = ('0' + now.getMinutes()).slice(-2);
	let seconds = ('0' + now.getSeconds()).slice(-2);
	let milliseconds = ('00' + now.getMilliseconds()).slice(-3);

	// 출력 형식에 맞게 조합합니다.
	let formattedTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
	$("#target_date").val(formattedTime);	
	
	return formattedTime;
}

/*function analysisSelectAll(){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/analysisSelectAll',
		data:{},
		async: false,
		success: function(res) {
			result = res;
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	return result;
}*/

/*function getCurrentMonthCost() {
	let result = "";
	
	$.ajax({
		type: 'GET',
		url: '/getCurrentMonthCost',
		data:{},
		async: false,
		success: function(res) {
			result = res.data;
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});	
	return result;
}*/

function getDayLogByTopContent() {
	let result = "";
	
	$.ajax({
		type: 'GET',
		url: '/getDayLogByTopContent',
		data:{},
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


let currentDayCost_flag = false;
function getCurrentDayCost() {
	let result = [];
	if(currentDayCost_flag) return result;
	
	currentDayCost_flag = true;
	
	$.ajax({
		type: 'GET',
		url: '/getCurrentDayCost',
		data:{},
		async: false,
		success: function(res) {
			currentDayCost_flag = false;
			result = res.data;
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});	
	return result;
}


async function drawUnstrSizeStatusEle(){
	
	try {
        // 데이터 로딩 영역
        let sumUnstrResourceSizeData = await selectSumResourceSize(1);
		let sumUnstrResourceSizeArray = sumUnstrResourceSizeData.data;
		let percentage = sumUnstrResourceSizeArray.percentage;
		$("#unstr-predict-comp-rate").html(`<strong style="color:#ffffff;">${percentage.toFixed(1)}%</strong>`);
		/*console.log(sumUnstrResourceSizeArray);*/
      
    } catch (error) {
    }
}


tabulatorFunctions.latestTabulator = function(data){
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
	console.log(startDate, endDate)
	$topContent.find("#date-range").html(`(${startDate} ~ ${endDate})`);
	$("input[name=search_date]").val(1);
}



topFunctions.checkLatestTopContent = function(){	
	let descHtml = `이번달 새로 추가된 웹 콘텐츠 중 확인이 필요한 웹 콘텐츠 목록을 확인하실 수 있습니다.`;
	let topContentHtml = null;
	topContentHtml = `이번달 <span id="date-range" style="color:#ffffff; font-weight:normal;"></span> 새로 추가된 웹 콘텐츠 중 확인이 필요한 (최적화 상태가 미흡인) 웹 콘텐츠는 총 <span id="latest-count"></span>입니다.`;
	let optionalComponentHtml = ``;
	$desc.html(descHtml);
	$topContent.html(topContentHtml);
	$optionalComponent.html(optionalComponentHtml);
	let targetData = newResourceArray.find(item => item.resource_status == 98);
	$topContent.find("#latest-count").html(`${targetData.count}건`);
	let startDate = formatTsToKorean($("input[name=startDate_ts]").val());
	let endDate = formatTsToKorean($("input[name=endDate_ts]").val());
	$topContent.find("#date-range").html(`(${startDate} ~ ${endDate})`);
	$("input[name=search_date]").val(1);
	$("input[name=search_condition]").val(-1);
}