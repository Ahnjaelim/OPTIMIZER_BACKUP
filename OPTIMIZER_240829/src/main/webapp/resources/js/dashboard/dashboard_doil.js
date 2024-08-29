



/*
const COLOR1 = '#274c63';
const COLOR2 = '#008FFB';
*/
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
/*
// 데이터 가져오기
var resourceCountData = selectCountByResourceStatus();
var resourceCountArray = resourceCountData.data;

var trafficData = selectMonthlyTrafficByType();
var trafficArray = trafficData.data;


var alarmData = getAlertAjax(null,null);
var alarmArray = alarmData.data;
var latestAlarmArray = getAlertAjax('1',null);

var newResourceData = null;
var newResourceArray = null;
*/

// DCMT READY;
$(function() {
	// 최초 대시보드 로딩
	dashboard_init();	
});


/**
 * 대시보드 기본 데이터 init()
 */
function dashboard_init(){
	
	// init 완료시 
	if(g_DASHBOARD_COST.initialized) {
		console.log("dashboard 비용관련 데이터가 이미 init 되었습니다.");
		g_DASHBOARD_COST.preloadComplete();
		return;
	}
	
	g_DASHBOARD_COST.initialized = true;
	
	
	// 외부 라이브러리 init 영역
	g_DASHBOARD_COST.chart = drawTreemapChart();
	
	
	
	
	// 비어있는 상태 구성
	g_DASHBOARD_COST.emptyStateRender = function(){
		// 추가 예상 절감 금액
		 $(".potential_savings_amount .slot-machine .saving-cost-value").html(`
		    <div class="no-data" style="font-size:12px;">
		         <p><ion-icon name="alert-circle-outline"></ion-icon> 추가 예상 절감 가능 금액이 없거나 
		         </br>해당기간 데이터가 존재하지 않습니다.</p>
		     </div>`);
		
		// 전월 대비 절감액
	     $(".reduction-cost .slot-machine .reduction-cost-value").html(`
	             <img src="${contextPath}/resources/img/coins.png" style="width: 10%; margin-right: 5px;"/>
	             <span style="font-size: 15px;">약 <strong style="font-size: 45px;">0</strong> 원</span>
	             <p class="small-content" style="margin-top: 5px; font-size: 13px; font-weight: normal;">현재 일자까지의 비용과 </br>전 달 대비 비교한 금액을 나타냅니다.</p>`);

	    // 확인하세요!
	 	$(".alarm ul").html(`<li style="opacity:0.5;">확인해야하는 알림이 없습니다.</li>`);
		
		// 비용을 더 절감하려면 어떻게 해야 할까요 ?
	 	
		// 비용 절감 가능한 웹 컨텐츠 (맵)
	 	$("#temp-chart04").addClass("h-100");
    	$("#temp-chart04").html(`<div class="no-data"><p><ion-icon name="alert-circle-outline"></ion-icon>해당기간 데이터가 존재하지 않습니다.</p></div>`);
		
		// 웹 콘텐츠 유형별 최적화 현황
		$(`.type-status-table2 .traffic-rate`).html(`데이터가 존재하지 않습니다.`);
	};
	
	g_DASHBOARD_COST.emptyStateRender();
	
	
	//////////////////////////////////////////////////////////
	// 리소스 카운트
	g_DASHBOARD_COST.drawResourceCountEle = async function () {
		try {
	        resourceCountData = await selectCountGroupByTypeAndStatus();
	        resourceCountArray = resourceCountData.data;
			let sum = [];	
			sum[-1] = 0;
			sum[0] = 0;
			sum[1] = 0;
			sum[2] = 0;
			sum[11] = 0;
			
			for(let i=0; i<resourceCountArray.length; i++){
				const {resource_type, resource_status, type_count, status_count, percentage} = resourceCountArray[i];
				$targetEle = $(`.optimize-progress [data-type=${resource_type}]`);
			
				if(resource_status == 1){ // 실린더 밑 카운트
					$targetEle.find(".value").html(`<strong>${status_count}</strong>/${type_count}건`);			
					$targetEle.find(".percentage").html(`${percentage}%`);
					$targetEle.find(".progress-bar").css({"width" : `${percentage}%`});
				}
				if(resource_status == -1){ // 우측 하단 테이블
					let $targetTr = $(`.type-status-table2 tr[data-resource-type=${resource_type}]`);
					$targetTr.find(".optimizable-count").html(`<strong>${status_count}건 최적화 가능</strong>`);
					if(status_count == 0){
						$targetTr.find(".optimizable-count strong").addClass("zero");
					}
				}
				sum[resource_status] += status_count;
			}
			}catch (error) {
	     
			}
	}
	
	
	g_DASHBOARD_COST.drawNewResourceEle = async function(){
		try {
		    newResourceData = await selectNewResourceAll();
		    newResourceArray = newResourceData.data;	
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
			}
			$(".new-resource").html(totalNewItemHtml);
			$(".new-resource-check").html(checkNewItemHtml);
		}catch (error) {
		} 	
	
		
	}
		
	
	// 트래픽 계산
	for(let i=0; i<trafficArray.length; i++){
		let resource_type = trafficArray[i].resource_type;
		let percentage = trafficArray[i].percentage;
		let $tr = $(`.type-status-table2 tr[data-resource-type=${resource_type}]`);
		$tr.find(`.traffic-rate div`).css({"width":percentage+"%"});
		$tr.find(`.traffic-rate-value`).text(percentage+"%");
		if(percentage >= 50){
			$tr.find(`.traffic-rate div`).css({"background":"var(--color-yellow)"});
			$tr.find(`.traffic-rate-value`).css({"color":"var(--color-yellow)"});
		}
	}
	
	if(trafficData.resultCode == 204){ // 데이터 없음
		$(`.type-status-table2 .traffic-rate`).html(`데이터가 존재하지 않습니다.`);
	}
		
	newResourceData = selectNewResourceAll();
	newResourceArray = newResourceData.data;	
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
	}
	$(".new-resource").html(totalNewItemHtml);
	$(".new-resource-check").html(checkNewItemHtml);
	
	//////////////////////////////////////////////////////////
	
	
	
	// 기초데이터 로딩
	drawTreemapChart();	
	
	// 대시보드에 적용될 전체 비용 관련 데이터 로딩
	const dataContextLoading = function(){
		
	};
	
	
	// 1 tick당 실행되는 메인 dashboard 함수
	// interval 1 tick당 실행된다.
	g_DASHBOARD_COST.dashboardTickProcess = function(){

		const _t = g_DASHBOARD_COST || this;
		
		// 초기화 되지 않은 경우 실행되는 interval
		if(!_t.initialized) return;
		// target date 갱신
		const targetDate = targetDateInit();
		_t.setTargetDate(targetDate);
		
		

		// 대시보드 관련 전체 비용 데이터 로딩
		dataContextLoading();
		
		// 실시간 데이터 로딩
		loadRealtimeData();
	};
	
	// 최초 실행
	g_DASHBOARD_COST.dashboardTickProcess();
	
	// 실시간 데이터 로딩 interval 시작
	var interval_tmp = setInterval(function() {
		g_DASHBOARD_COST.dashboardTickProcess();
	}, g_DASHBOARD_COST.threshold['interval']);
	
	g_DASHBOARD_COST.interval_idList.push(interval_tmp);
	
	//drawResourceCountEle();
	
	
	
	
		
	/*
	drawResourceCountEle();
	drawNewResourceEle();
		
	// 트리맵 차트
	drawTreemapChart();	
		
	setBox();
	totalUnOptAllSize_box();
		
		
	// [확인하세요]
	$(".alarm .number strong").html(latestAlarmArray.length);
	let alarmHtml = "";
	let strLength = 18;
	if(alarmData && alarmArray.length > 0){
		for(let i = 0; i < alarmArray.length; i++){
			let content = alarmArray[i].content.length > strLength ? alarmArray[i].content.substring(0, strLength) + '...' : alarmArray[i].content;
			alarmHtml += `<li><a href="/alertCenter"><i class="fa-solid fa-bell"></i> ${content}</a></li>`;
		}
	}else{
		alarmHtml = `<li style="opacity:0.5;">확인해야하는 알림이 없습니다.</li>`;
	}
	
	$(".alarm ul").html(alarmHtml);
	*/
	
	
	
	
	
	g_DASHBOARD_COST.preloadComplete();
	
	console.log("dashboard 비용관련 데이터 init 완료");
}






// 전역
let current_month_org_size_all=0;  //현재달 미최적화
let current_month_opt_size_all=0;  //현재달 최적화
let previous_month_org_size_all=0; //지난달 최적화
let previous_month_opt_size_all=0; //지난달 미최적화

let reduceCost = 0; 
let lastSavingCost = 0; 

/* 당월 예상 비용&절감률 구하기&전월 대비 절감액 */
let TodaySavingCost = 0;
function setBox(){
	let unoptimizedData = getCurrentMonthCost();
	/*console.log(unoptimizedData)*/
	
	
	for (let i = 0; i < unoptimizedData.length; i++) {
		let resource_new_size_type1 = unoptimizedData[i].resource_new_size_type1; //파일 원본 크기
		let resource_new_size_type2 = unoptimizedData[i].resource_new_size_type2; //파일 최적화 후 크기
		let total_optimized_traffic = unoptimizedData[i].total_optimized_traffic; //알고리즘 적용된 파일 크기
		
		let current_month_call_count  = unoptimizedData[i].current_month_call_count; //이번달 호출횟수
		let previous_month_call_count  = unoptimizedData[i].previous_month_call_count; //저번달 호출횟수
		
		let current_month_opt_count = unoptimizedData[i].current_month_opt_count; //이번달 최적화 파일의 호출횟수
		let previous_month_opt_count = unoptimizedData[i].previous_month_opt_count; //저번달 최적화 파일의 호출횟수
	
		//최대 비용
		current_month_org_size_all += ((resource_new_size_type1*(current_month_call_count + current_month_opt_count))/(1024*1024*1024))* getCloud_payment(unoptimizedData[i].cloud_no);
		previous_month_org_size_all += ((resource_new_size_type1*(previous_month_call_count + previous_month_opt_count))/(1024*1024*1024))* getCloud_payment(unoptimizedData[i].cloud_no);
		
		current_month_opt_size_all += ((resource_new_size_type1 * current_month_call_count + total_optimized_traffic) / (1024*1024*1024))* getCloud_payment(unoptimizedData[i].cloud_no);
		previous_month_opt_size_all += ((resource_new_size_type1 * previous_month_call_count + total_optimized_traffic)/(1024*1024*1024))* getCloud_payment(unoptimizedData[i].cloud_no);

	 }

		TodaySavingCost = current_month_org_size_all - current_month_opt_size_all  //최적화 후 예상 비용(당월)
		lastSavingCost = previous_month_org_size_all - previous_month_opt_size_all //최적화 후 예상 비용(전월)
		reduceCost = lastSavingCost - TodaySavingCost; // 전월 대비 절감액
			
		
		// 절감률
	    let savingsRate =  (1-(current_month_opt_size_all / current_month_org_size_all))* 100;
			
			if(savingsRate <= 0 || TodaySavingCost <= 0) {
				$("#SavingsRate").html(`<strong style="color:rgba(255,255,255,0.3)";>0</strong><span>%</span>`);
				$("#TodaySavingCost").html(`<strong style="color:rgba(255,255,255,0.3)";>0</strong><span>원</span>`);

			}else {
				$("#TodaySavingCost").html(`<strong style="color:var(--color-yellow);">${comma((TodaySavingCost).toFixed(0))}</strong><span>원</span>`);
				$("#SavingsRate").html(`<strong style=" color: #75f542;">${savingsRate.toFixed(0)}</strong><span>%</span>`);
		
			}	
}



/* 추가 예상 절감 금액 */
let savingCost = 0;
let lastDiffCost = 0;

// 함수 정의
function totalUnOptAllSize_box() {
    let data = getCurrentMonthCost();
    let newSavingCost = 0;
   /* console.log(diff_cost)*/
    topDataLoad();
    let newDiffCost = diff_cost;
    

    // 새로운 절감 비용 계산
    for (let i = 0; i < data.length; i++) {
        if (data[i].resource_status === -1 || data[i].resource_org_size !== -1) {
            newSavingCost += (data[i].resource_org_size * getAvgComp(data[i].resource_type) * data[i].current_month_call_count) / (1024 * 1024 * 1024) * getCloud_payment(data[i].cloud_no);
        }
    }

    // 추가 예상 절감 금액 표시
    if (newSavingCost <= 0) {
        $(".potential_savings_amount .slot-machine .saving-cost-value").html(`
            <div class="no-data" style="font-size:12px;">
                <p><ion-icon name="alert-circle-outline"></ion-icon> 추가 예상 절감 가능 금액이 없거나 
                </br>해당기간 데이터가 존재하지 않습니다.</p>
            </div>`);
    } else {
        if (newSavingCost !== savingCost) {
            $(".potential_savings_amount .slot-machine .saving-cost-value").html(`
                <img src="${contextPath}/resources/img/coins.png" style="width: 10%; margin-right: 5px;"/>
                <span style="font-size: 15px;">약 <strong style="font-size: 45px;">${comma((newSavingCost).toFixed(0))}</strong> 원</span>
                <p class="small-content" style="margin-top: 10px; font-size: 13px; font-weight: normal;">
                    현재 웹 콘텐츠의 최대 최적화 후 최대 금액입니다. <br>사용량 변화나 조건에 따라 금액이 달라질 수 있습니다.
                </p>`);
            animateSlotMachine(newSavingCost);
           /* console.log(1)*/
        }
        savingCost = newSavingCost;
    }
    // 전월 대비 절감액 표시
    if (newDiffCost) {
        $(".reduction-cost .slot-machine .reduction-cost-value").html(`
            <img src="${contextPath}/resources/img/coins.png" style="width: 10%; margin-right: 5px;"/>
            <span style="font-size: 15px;">약 <strong style="font-size: 45px;">${comma(newDiffCost.toFixed(0))}</strong> 원</span>
            <p class="small-content" style="margin-top: 5px; font-size: 13px; font-weight: normal;">현재 일자까지의 비용과 </br>전 달 대비 비교한 금액을 나타냅니다.</p>`);

        animateSlotMachine(newDiffCost); 
        /*console.log(2)*/
    }
    lastDiffCost = newDiffCost; 
}




//슬롯 머신 애니메이션 함수
function animateSlotMachine(newCost) {
	let $slot = $(".saving-cost-value .cost");
	let $slot1 = $(".reduction-cost-value .cost");
	let currentCost = parseInt($slot.text().replace(/,/g, ''), 10);
	let currentCost1 = parseInt($slot1.text().replace(/,/g, ''), 10);

	// 비용이 변했을 때만 애니메이션 실행
	   if (currentCost !== newCost) {
		$slot.addClass("slide-animation");

		setTimeout(() => {
			$slot.text(comma(newCost.toFixed(0)));
			$slot.removeClass("slide-animation");

		}, 500); // 0.5초 후 숫자 업데이트
	   }
		if (currentCost1 !== newCost) {
			$slot1.addClass("slide-animation");
			setTimeout(() => {

				$slot1.text(comma(newCost.toFixed(0)));
				$slot1.removeClass("slide-animation");
			}, 500); // 0.5초 후 숫자 업데이트
		}
	
}

// setInterval로 함수 호출
//setInterval(totalUnOptAllSize_box, 500);

 



/** 트리맵 차트 */
function drawTreemapChart() {
	console.log('트리맵 차트 시작');
	let unoptimizedData = selectResourceAllUnoptimized();
	let unoptimizedArray = unoptimizedData.data;
	if (unoptimizedData.hasOwnProperty('msg') && unoptimizedData.msg == "replaced") {
	}
	if(unoptimizedData){
		for(let i = 0; i < unoptimizedArray.length; i++){
			unoptimizedArray[i].y = 11 - i;
		}
	}
	
    let options = {
        series: [{
            data: unoptimizedArray
        }],
        legend: {
            show: false
        },
        chart: {
            height: '100%',
            type: 'treemap',
            toolbar: {
                show: false,
                offsetY: '-20',
                offsetX: '-25',
                tools: {
                    download: false
                }
            },
            zoom: {
                enabled: true
            },
            events: {
            	dataPointSelection: function(event, chartContext, config) {
                    const index = config.dataPointIndex;
                    const chartItemData = config.w.config.series[0].data[index];
                    // console.log(chartItemData);
                    location.href=`/optimizerByContent?resource_name=${chartItemData.x}&resource_no=${chartItemData.resource_no}`;
                }
            }        
        },
        dataLabels: {
            enabled: true,
            style: {
              fontSize: '15px',
            },
            formatter: function(text, op) {
            	let traffic = (op.value/1024/1024).toFixed(1);
            	let customValue = op.w.config.series[op.seriesIndex].data[op.dataPointIndex].resource_new_size_type1; // 커스텀
																														// 값 접근
            	customValue = fileSizeUnitFormatter(customValue);
            	return [text, customValue, '최적화'];
            },
            offsetY: -4
          }, 
          tooltip: {
              enabled: true,
              y: {
                  formatter: function(value) {
                      return (value / 1024 / 1024).toFixed(1) + ' MB';
                  }
              },
              custom: function({ series, seriesIndex, dataPointIndex, w }) {
                  const data = w.config.series[seriesIndex].data[dataPointIndex];
                  const value = fileSizeUnitFormatter(data.resource_new_size_type1);
                  return `<div class="tooltip-content">
                              <p><strong>${data.x}</strong></p>
                              <p>원본 용량 : ${value}</p>
                          </div>`;
              }
          }           
    };

    let chart = new ApexCharts(document.querySelector("#temp-chart04"), options);
    var nodata = `<div class="no-data"><p><ion-icon name="alert-circle-outline"></ion-icon>해당기간 데이터가 존재하지 않습니다.</p></div>`;
    if(unoptimizedData.resultCode == 204){
    	$("#temp-chart04").addClass("h-100");
    	$("#temp-chart04").html(nodata);
    }else if(unoptimizedData.resultCode == 200){
    	chart.render();    	
    }
    
    return chart;
}


function loadRealtimeData(){
	
	$.ajax({
		type: 'GET',
		url: '/selectViewLogAll',
		data:{
			target_date : g_DASHBOARD_COST.getTargetDate()
		},
		success: function(response) {
			let { data }  = response;
			/*
			let limit = 50;
			for(let idx=0; idx <= data.length; idx++){
				if(idx > limit) break;
				let timeoutUnit = 20;
				
				setTimeout(function(){
					animationForeach([ data[idx] ]);
				}, timeoutUnit*idx );
			}
			*/		
			
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
}


/** 애니메이션 로그 불러오는 ajax * */
function selectViewLogAll(){
	// let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectViewLogAll',
		data:{
			target_date : $("#target_date").val()
		},
		// async: false,
		success: function(response) {
			let data = response.data;
			let limit = 50;
			for(let idx=0; idx <= limit; idx++){
				let timeoutUnit = 20;
				setTimeout(function(){
					animationForeach([ data[idx] ]);
				},timeoutUnit*idx );
			}		
			
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	// return result;
}


var costMonitorData = {};
costMonitorData.index = 0;
costMonitorData.sum_org_cost = 0;
costMonitorData.sum_new_cost = 0;

function animationForeach(data){
	data.forEach(item => {
		// 이미 animationData에 있는 log_sn이면 추가하지 않음
	    if (item != null && item != undefined) {
	    	/*console.log(item)*/
	    	// 이미지를 랜덤하게 선택
			/* let selectedImage = item.resource_status === -1 
	         ? contextPath + '/resources/img/paper-red.png' 
	         : contextPath + '/resources/img/paper.png';*/
	    	
	    		let selectedImage = contextPath + '/resources/img/dollar.png' 
	    	
			    let randomTop = Math.floor(Math.random() * 20) + 25; // 시작 좌표
				let randomTop2 = Math.floor(Math.random() * 5) + 40; // 실린더 좌표
				let randomTop3 = Math.floor(Math.random() * 20) + 40; // 실린더 좌표
				
				let resource_type = item.resource_type;
				let optimized = "";
				let duration = 5000;
				if(item.resource_status == 1){
					optimized = "optimized";
					duration = 1000;
				}	 
		    let $content = $(`<p class="value content before ${optimized}"><img src="${selectedImage}" /></p>`); 
		   
		    $('#top-animation').append($content); // 엘리먼트를 body에 추가
		    $content.css('top', randomTop + '%'); // 랜덤한 top 좌표 적용
		    $content.animate({
		        left: '50%',
		        top: randomTop2+"%"
		    }, {
		        duration: 5000, // 중앙까지 이동하는 애니메이션 지속 시간
		        easing: 'easeInOutQuad', // Easing 효과 (선택적)
		        complete: function() {
		        	let cnt = parseInt($(`#pig .type02 .value`).text());
		        	cnt += 1;
		        	
		        	// 특정 조건일 때만 애니메이션 함수 호출
                    if (item.resource_status === 1) {
                    	 animatePiggyBank1();
                    	 animateCoinDrop();
		        	}else {
						/*const $lastCylinder = $(`#cylinder .type0${resource_type} li`).last();
						$lastCylinder.remove();*/
						/*$lastCylinder.find("img").animate({"width":"1px"}, {
							duration: 400, 
							complete: function() {$lastCylinder.remove();}
						});*/
					}
		        	$(`#pig .type0${resource_type} .value`).text(cnt);
		            $(this).removeClass('before').addClass('after'); // 클래스변경
		            $(this).html(`<p class="content optimized"><img src="/resources/img/dollar.png" style="width:10px;"/></p>`);
		            /*if(item.resource_status === -1) {
		            	$(this).html(`<p class="content optimized"><img src="/resources/img/paper-red.png"/></p>`);
		            }else {
		            	$(this).html(`<p class="content optimized"><img src="/resources/img/paper.png" style="width:20px;"/></p>`);
		            }*/
		            
		            
		            $(this).animate({
		                left: '95%', // 우측 끝으로 이동
		                top: randomTop3+"%"
		            }, 
		            {
		                duration: duration, // 우측 끝까지 이동하는 애니메이션 지속 시간
		                easing: 'easeInOutQuad', // Easing 효과 (선택적)
		                complete: function() {
		                    $(this).remove(); // 애니메이션 종료 후 엘리먼트 삭제
		                    let cnt = parseInt($(`#pig .type0${resource_type} .value`).text());
		                    cnt -= 1;
		                    $(`#pig .type0${resource_type} .value`).text(cnt);
		                    
		                    // 서버 상태 표시(콘텐츠 양 기준)
		                    let total = $('#top-animation .value .content').length; 
		                    
							$("#top-animation .station.server .color").css({"opacity":"0.0"});
							if(total > 300){
								$("#top-animation .station.server .color.red").css({"opacity":"1.0"});
							}else if (total > 200){
								$("#top-animation .station.server .color.yellow").css({"opacity":"1.0"});					
							}else{
								$("#top-animation .station.server .color.green").css({"opacity":"1.0"});										
							}
		                }
		            });
		            costMonitorData.index++;
					costMonitorData.sum_org_cost += item.resource_new_size_type1;
					costMonitorData.sum_new_cost += item.resource_new_size_type2;
					console.log(item)
					
					/*if(costMonitorData.index > 10){
						if(costMonitorData.sum_new_cost !== 0) {
							let reduceCostMonitor = costMonitorData.sum_new_cost * 
						}
						*/
							reduceCostMonitor = comma(reduceCostMonitor.toFixed(0));
						$("#time-monitor").html(reduceCostMonitor+"원");
					}
		        
		 
	    });		        
	    }

	});	
}

// 전역 변수로 애니메이션 실행 여부를 저장할 변수 추가
let isPiggyBank1Animating = false;
/*let isPiggyBank2Animating = false;*/
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
/*function animatePiggyBank2() {
    if (!isPiggyBank2Animating) {
        isPiggyBank2Animating = true;
        $('#piggy-bank-red').animate({
            width: '+=15px',
            height: '+=15px'
        }, 1000, function () {
            $('#piggy-bank-red').animate({
                width: '-=15px',
                height: '-=15px'
            }, 1000, function () {
                isPiggyBank2Animating = false;
            });
        });
    }
}*/



/*// 미최적화 개수 구하기
let totalResourceCount = resourceCountArray.find(item => item.resource_type == "total");
let folderCount = resourceCountArray.find(item => item.resource_type == 0);
console.log(totalResourceCount)

let status_minus_count = totalResourceCount.status_minus_count - folderCount.status_minus_count;
*/

let status_minus_count = 0;
let saveCost = 0;
let currentMonthOptimizedSize = 0;
let lastMonthOptimizedSize = 0;
let cloud_cost = 0;
let cloudNo = 0;

function topDataLoad() {
	let data = getCurrentMonthCost();
	let resourceCountData = selectCountByResourceStatus();
	let resourceCountArray = resourceCountData.data;
	
	// 날짜 구하기
	let currentMonth = new Date();
	let lastMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
	currentMonth = formatMonthDisplay(currentMonth); // 이번달
	lastMonth = formatMonthDisplay(lastMonth); // 지난달

	let previous_size1_cost = 0;
	let previous_size2_cost = 0;
	let current_size1_cost = 0; 
	let current_size2_cost = 0;

	for (let i = 0; i < data.length; i++) {
		let allTypesAreZero = resourceCountArray.every(item => item.resource_type === 0);
		
		if(allTypesAreZero) {
			$("#resource_unOpt_cnt").html(0);
		}else {
			let totalResourceCount = resourceCountArray.find(item => item.resource_type == "total");
			let folderCount = resourceCountArray.find(item => item.resource_type == 0);
			let status_minus_count = totalResourceCount.status_minus_count - folderCount.status_minus_count;
			/*console.log(status_minus_count)*/
			$("#resource_unOpt_cnt").html(status_minus_count);
		}
		

		if(data[i].resource_status === -1) {
			 cloud_cost = 0;
		}else {
			// 1GB당 금액
			 cloud_cost = getCloud_payment(data[0].cloud_no);
			// 바이트당 금액
			 cloud_cost = (cloud_cost * 1.0) / (1024*1024*1024);
		}
		
		if(data.length === 0) {
			cloudNo = 0;
		}else {
			cloudNo =  getCloud_payment(data[0].cloud_no);
		}
		
		const prev_call_cnt = data[i].previous_month_call_count;
		const current_call_cnt = data[i].current_month_call_count;
		
	   previous_size1_cost += (data[i].resource_new_size_type1 * prev_call_cnt) * cloud_cost;
	   previous_size2_cost += (data[i].resource_new_size_type2 * prev_call_cnt) * cloud_cost;
	   current_size1_cost += (data[i].resource_new_size_type1 * current_call_cnt) * cloud_cost;
	   current_size2_cost += (data[i].resource_new_size_type2 * current_call_cnt) * cloud_cost;
	}
	
	let previous_cost = (previous_size1_cost - previous_size2_cost);
	let current_cost = (current_size1_cost - current_size2_cost);
	
	diff_cost = current_cost - previous_cost;
	saveCost = comma((lastMonthOptimizedSize-currentMonthOptimizedSize).toFixed(0));
	
	
	$(".optional-component").hide();
	
	// 대비 절감액
	$("#period").html(lastMonth+' ~ '+currentMonth);
	$("#pre_month").html(lastMonth);
	$("#current_month").html(currentMonth);
	$("#pre_month_cost").html(comma((previous_cost).toFixed(0)));
	$("#current_month_cost").html(comma((current_cost).toFixed(0)));
	$("#cloud_no").html(cloudNo);
	
	if(saveCost < 0) {
		$("#save_cost").html('0');
	}else {
		$("#save_cost").html(comma(diff_cost.toFixed(0)));
	}
	
	// 추가 예상 절감 금액
	$("#totalOrgCost").html(comma((current_month_org_size_all-current_month_opt_size_all+savingCost).toFixed(0)));
	$("#totalOptCost").html(comma((current_month_org_size_all-current_month_opt_size_all).toFixed(0)));
	
	if(savingCost < 0) {
		$("#reduceCost").html('0');
	}else {
		$("#reduceCost").html(comma((savingCost).toFixed(0)));
	}
	
	$(".optional-component").hide();
}

// 추가 예상 절감 금액 상위 콘텐츠
topFunctions.costPredictTopContent = function(){	
	let descHtml = `해당 수치는 아직 최적화가 적용되지 않은 웹 콘텐츠를 당월 기준으로 최적화했을 경우 산정된 금액입니다.`;
	$desc.html(descHtml);

	let topPredictContentHtml = `현재 최적화 미적용 웹 콘텐츠는 <span id="resource_unOpt_cnt"></span>건 입니다. 현재 기준으로 최적화 전 예상 금액은 약
	<span id="totalOrgCost">0</span>원 입니다.</br> 웹 콘텐츠 최적화를 진행 할 경우, 추가로 약 <span id="reduceCost">0</span>원의 절감이 예상 됩니다. 따라서 최적화 후 예상 금액은(당월 기준) 약 <span id="totalOptCost">0</span>원 입니다.`;
	$topContent.html(topPredictContentHtml);
	let topValueData = null;
	setTimeout(function(){
		topDataLoad();ㄹ

	},500);
	
    const originalUpdateButtons = updateButtons; // 기존 updateButtons 함수를 참조
    updateButtons = function() { // updateButtons 함수를 확장하여 재정의
        originalUpdateButtons();// 기존 함수 호출
       /* let currentData = $("#current-month").text(); */
	    /* console.log(currentData); */
        topDataLoad();
    }  
}


// 전월 대비 금액 상위 콘텐츠
topFunctions.costReduceTopContent = function(){
	let descHtml = `현재를 기준으로 전월 <span style="font-weight:bold;"id="period"></span> 기간의 데이터 비용을 산정한 금액입니다.`;
	$desc.html(descHtml);

	let topReduceContentHtml = `<span id="pre_month"></span>의 데이터 절감 비용은 약<span id="pre_month_cost"></span>원 이고 <span id = "current_month"></span>의 데이터 절감 비용은 
		약 <span id="current_month_cost"></span>원 으로  약 <span id= "save_cost"></span>원 절약하였습니다. 데이터 비용은 1GB당 <span id="cloud_no"></span>원 입니다.`;
	$topContent.html(topReduceContentHtml);
	let topValueData = null;
	 topDataLoad();
}



//전월 대비 절감액 타뷸레이터
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
	    sortMode: "remote",
	    ajaxURL:"/selectResourceAllWithLatestLogByTopContent", // set url for
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
	    	console.log(response)
	    	$("#list_cnt span").html(response.list_cnt);
				for (let i = 0; i < response.data.length; i++) {
					response.data[i].row_no += i+1;
					let cloud_cost = getCloud_payment(response.data[i].cloud_no);
					let previous_size1_cost = ((response.data[i].resource_new_size_type1 * response.data[i].previous_month_call_count)/1024/1024/1024)*cloud_cost;
					let previous_size2_cost	= ((response.data[i].resource_new_size_type2 * response.data[i].previous_month_call_count)/1024/1024/1024)*cloud_cost;
					let current_size1_cost = ((response.data[i].resource_new_size_type1 * response.data[i].current_month_call_count)/1024/1024/1024)*cloud_cost;
					let current_size2_cost = ((response.data[i].resource_new_size_type2 * response.data[i].current_month_call_count)/1024/1024/1024)*cloud_cost;
					
					response.data[i].previous_cost = (previous_size1_cost - previous_size2_cost).toFixed(0);
					response.data[i].current_cost = (current_size1_cost - current_size2_cost).toFixed(0);
					response.data[i].diff_cost = (response.data[i].current_cost - response.data[i].previous_cost).toFixed(0);
				}
				
	    	return response; 
	    },
	    paginationInitialPage: 1,
	    paginationLoading: "<div class='custom-pagination-loader'><div class='spinner'></div>Loading...</div>",
	    layout: "fitColumns",
	    columns: [ 		    	
	    	{
	    		title: "No",
	    		field: "row_no",
	    		width: 50,
	    		hozAlign: "center",
	    		headerSort:false,
	    		resizable:false
	    	},
	    	{
	    		title: "구분",
	    		field: "resource_type",
	    		hozAlign: "center",
	    		headerSort:true,
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
	    		hozAlign: "center",
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
	    	{
	    		title: "current",
	    		field: "current_month_call_count",
	    		width: 100,
	    		hozAlign: "left",
	    		headerSort:true,
	    		widthgrow :true,
	    		resizable:false,
	    		cellClick: function(e, cell) {
	    			return cell.getValue();
	            },
	            visible : false,
	    	},	    	
	    	{
	    		title: "previous",
	    		field: "previous_month_call_count",
	    		width: 100,
	    		hozAlign: "left",
	    		headerSort:true,
	    		widthgrow :true,
	    		resizable:false,
	    		cellClick: function(e, cell) {
	    			return cell.getValue();
	    		},
	    		visible : false,
	    	},	    	
	    	{
	    		title: "size1",
	    		field: "resource_new_size_type1",
	    		width: 100,
	    		hozAlign: "left",
	    		headerSort:true,
	    		widthgrow :true,
	    		resizable:false,
	    		cellClick: function(e, cell) {
	    			return cell.getValue();
	    		},
	    		visible : false,
	    	},	    	
	    	{
	    		title: "size2",
	    		field: "resource_new_size_type2",
	    		width: 100,
	    		hozAlign: "left",
	    		headerSort:true,
	    		widthgrow :true,
	    		resizable:false,
	    		cellClick: function(e, cell) {
	    			return cell.getValue();
	    		},
	    		visible : false,
	    	},	    	
	    	{
	    		title: "전월 절감액",
	    		field: "previous_cost",
	    		width: 150,
	    		hozAlign: "right",
	    		headerSort:true,
	    		widthgrow :true,
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return comma(cell.getValue())+"원";
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
	    			return comma(cell.getValue())+"원";
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
	    			return comma(cell.getValue())+"원";
	    		},    		
	    	},	    	
	    	{
	    		title: lasttMonthOnly+"의 데이터 전송 비용",
	    		field: "lastMonthOptimizedSize",
	    		hozAlign: "right",
	    		headerSort:false,
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return cell.getValue();
	    		},
	    		visible : false,
	    	},	    	
	    	{
	    		title: currentMonthOnly+"의 데이터 전송 비용",
	    		field: "currentMonthOptimizedSize",
	    		hozAlign: "right",
	    		headerSort:false,
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return cell.getValue();
	    		},
	    		visible : false,
	    	},	   	
	    	{
	    		title: "전월 대비 증감액",
	    		field: "plusCost",
	    		width: 250,
	    		hozAlign: "right",
	    		headerSort:false,
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return cell.getValue();
	    		},
	    		visible : false,
	    	
	    	},	
	    ],	    
	});	
	
	return result;
}

//추가 예상 절감 금액 타뷸레이터
tabulatorFunctions.costPredictTabulator = function(data){
	let result = new Tabulator("#volist", {
		height:"500px",
		selectable:false,
	    progressiveLoad:"scroll",	    
	    // pagination:true, // progressiveLoad 옵션과 양립 X
	    paginationMode:"remote", // enable remote pagination
	    paginationSize:1000, // 목록 크기
	    progressiveLoad:"scroll",	
	    sortMode: "remote",
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
	    	// console.log("page : "+this.getPage());
	    	// console.log("size : "+this.getSize());
	    	$("#list_cnt span").html(response.list_cnt);
	    	let org_size_all = 0;
			let opt_size_all = 0;
			
			
			for (let i = 0; i < response.data.length; i++) {
				response.data[i].resource_org_size = response.data[i].resource_org_size; // 최적화 전 파일 크기
				response.data[i].resource_new_size_type2 = response.data[i].resource_new_size_type2; // 최적화 후 파일 크기
				response.data[i].call_cnt = response.data[i].current_month_call_count; // 호출 횟수
				response.data[i].resource_no = response.data[i].resource_no;
				response.data[i].row_no = i + 1;	
				
				if(response.data[i].current_month_call_count === null || response.data[i].current_month_call_count === undefined) {
					response.data[i].savings_amount = '0원';
				}else {
					
					if(response.data[i].resource_status === -1) {
						opt_size_all = ((response.data[i].resource_org_size*getAvgComp(response.data[i].resource_type) * response.data[i].current_month_call_count)/(1024*1024*1024)) * getCloud_payment(response.data[i].cloud_no );
					}else {
						opt_size_all = ((response.data[i].resource_new_size_type2 * response.data[i].current_month_call_count)/(1024*1024*1024)) * getCloud_payment(response.data[i].cloud_no );
					}
					
					response.data[i].savings_amount = comma((opt_size_all).toFixed(0))+ '원';
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
	    		field: "row_no",
	    		width: 50,
	    		hozAlign: "right",
	    		headerSort:false,
	    		resizable:false
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
	    			}
	    			result += "</span>";
	    			return result;
	    		},
	    		resizable:false,
	    	},
	    	{
	    		title: "웹 콘텐츠 이름",
	    		field: "resource_name",
	    		width: 300,
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
	    	{
	    		title: "호출횟수(회)",
	    		field: "call_cnt",
	    		hozAlign: "right",
	    		headerSort:false,
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
	    		field: "resource_org_size",
	    		width: 160,
	    		hozAlign: "right",
	    		headerSort:false,
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
	    		width: 160,
	    		hozAlign: "right",
	    		headerSort:false,
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
	    		width: 160,
	    		hozAlign: "right",
	    		headerSort:false,
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return cell.getValue();
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

function selectAlgorithmType(algorithm_type){
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
}

function selectLastMonthlyTrafficByType(){
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
}

function selectResourceAllUnoptimized(){
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
}

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


function selectCountByResourceStatus(){
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

function analysisSelectAll(){
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
}

function getCurrentMonthCost() {
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
}