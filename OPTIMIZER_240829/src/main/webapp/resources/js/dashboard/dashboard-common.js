const NODATA = `<div class="no-data"><p><ion-icon name="alert-circle-outline"></ion-icon> 해당 데이터가 존재하지 않습니다.</p></div>`;
const ERROR = `<span style="color:rgba(255,255,255,0.3);"><ion-icon name="alert-circle-outline"></ion-icon>오류</span>`;
const UNOPTIMIZED = `<span style="color:rgba(255,255,255,0.3);">최적화 전</span>`;
const UNCHECKED = `<span style="color:rgba(255,255,255,0.3);">측정 전</span>`;
const CHECKING = `<span style="color:rgba(255,255,255,0.3);">측정 중</span>`;

let mainCommonFnc = {};
let mainGlobal = {};
mainGlobal.orgSpeedLogArray = null;

var modalId = null;
var tabulatorFunctions = {};
var tabulatorFunction = null;
var topFunctions = {};
var topFunction = null;
var monthBtnFunction = null;
var monthBtnFunctions = {};
let fileManagerType = 1;

// 모달 설정
const $detailModal = $('#detail-modal');
var $desc = null;
var $topContent = null;
var $optionalComponent = null;

// JSTREE
var $jstree = $("#folderlist");

// 테뷸레이터 전역 변수
var table_resource = null;

// 날짜 설정
var currentDate = new Date();
var firstDay = getFirstDayOfMonth(currentDate);
var lastDay = getLastDayOfMonth(currentDate);
var with_log = false;

// 에이전트 체크
var timeAgentInterval = null;
var timeAgentStatus = null;

/** 모달 생성 * */
function detailModalBtnEvent(param){
	
	with_log = false; 
	modalId = null;
	timeAgentInterval = null;
	fileManagerType = 1;
	
	if (param && param.hasOwnProperty('modalId')) {
		modalId = param.modalId;
		if(modalId == "latestUnstrResourceModal" || modalId == "checkLatestUnstrResourceModal" || modalId == "unstrfileSizeStatusModal"){
			fileManagerType = 2;
		}
	}else{
		console.warn("detailModalBtnEvent : 지정된 modalId가 없습니다.");
	}
	
	if (param && param.hasOwnProperty('fileManagerType')){
		if(param.fileManagerType==2){
			fileManagerType = 2;
		}
	}
	
	// 1. 모달 초기화 및 생성
	let html = `
		<input type="text" name="startDate_ts" value="" style="display:none;" />
		<input type="text" name="endDate_ts" value="" style="display:none;" />
		<input type="text" name="search_date" value="0" style="display:none;" />
		<div class="desc">
		</div>
		<div class="top-content">
		</div>
		<div class="optional-component">
		</div>
		<div class="d-flex">
			<div class="col btn-group search-type" role="group" aria-label="Basic radio toggle button group"></div>
			<div class="col">
				<div class="search-keyword">
					<input type="text" class="" name="search_keyword" value="" placeholder="파일 이름을 입력하세요." />
					<button id="search-btn" class="search-btn"><ion-icon name="search-outline"></ion-icon></button>
				</div>
			</div>
		</div>
		<div class="d-flex content-container">
			<div class="col" id="folderlist" style="padding:10px 0px 0px 0px;">
			</div>
			<div class="col">
				<div class="search-container" style="display:none;">
					<select id="search-status-select" multiple="multiple"></select>
					<input type="text" name="search_range" value="0" />
					<input type="text" name="search_page" value="" />
					<input type="text" name="search_condition" value="" />
					<input type="text" name="precondition_status" value="" >
				</div>
				<div class="volist-container">
					<div id="volist"></div>
				</div>
			</div>
		</div>`;
	$detailModal.find(".modal-title").html(param.modalTitle);
	$detailModal.find(".modal-body").html(html);
	$desc = $detailModal.find(".desc");
	$topContent = $detailModal.find(".top-content");
	$optionalComponent = $detailModal.find(".optional-component");
	
	$detailModal.modal("show");
    
	// 월별 검색 활성화
	$("input[name=endDate_ts]").val(formatTimestamp(lastDay));
	$("input[name=startDate_ts]").val(formatTimestamp(firstDay, true));
	let dateControlHtml = "";
    if (param && param.hasOwnProperty('monthSelectable') && param.monthSelectable === true) {
    	with_log = true;
        dateControlHtml = `<button id="prev-month-btn" class="month-btn"><ion-icon name="chevron-back-outline"></ion-icon></button>
        	<span id="current-month">${formatMonthDisplay(currentDate)}</span>
        	<button id="next-month-btn" class="month-btn"><ion-icon name="chevron-forward-outline"></ion-icon></button>`;
        $optionalComponent.html(dateControlHtml);
        $("#prev-month-btn").click(handlePrevClick);
        $("#next-month-btn").click(handleNextClick);
        updateButtons();
    }
	
	// 함수 스코프 관리를 위해 타뷸레이터 함수는 tabulatorFunctions 객체 안에서만 선언
	if (typeof tabulatorFunctions[param.tabulatorFunction] === 'function') { 
		tabulatorFunction = tabulatorFunctions[param.tabulatorFunction];
    } else {
        console.error('해당 함수가 tabulatorFunctions 객체에 없습니다.');
        return;
    }
	
	// 함수 스코프 관리를 위해 타뷸레이터 함수는 tabulatorFunctions 객체 안에서만 선언
	if (typeof topFunctions[param.topFunction] === 'function') { 
		topFunction = topFunctions[param.topFunction];
		topFunction();
    } else {
        console.error('해당 함수가 topFunctions 객체에 없습니다.');
        return;
    }	
	
	// 2. 검색 조건 초기화
	searchInit();
	$detailModal.find("#search-btn").click(function(){
		tabulatorInit();
	});
	 $(`input[name=search_keyword]`).on('keypress', function(event) {
         if (event.which === 13) { // 13은 Enter 키의 키코드입니다.
             event.preventDefault(); // 엔터키의 기본 동작을 방지 (옵션)
             tabulatorInit();
         }
     });	
	
	// 3. JSTREE 초기화
	let jsonString = selectFolderAll().data;
	let jsonData = JSON.parse(jsonString);
	$(`#folderlist`).jstree({
		'core' : {
			'data' : jsonData,
			'themes' : {
				"variant" : "large",
			}
		},
	}).on('select_node.jstree', function (e, data) { // 노드 클릭 이벤트
		let selectedNodeId = data.node.id;
		$("input[name=search_range]").val(1); // 폴더를 클릭하는 경우 강제로 폴더 검색으로 전환
		tabulatorInit(selectedNodeId);
	}).on('ready.jstree', function(e, data) { // 트리 로드 이벤트
		$("#folderlist").jstree(true).open_all(); // JSTREE 모두 열기
		jstreeCountInit(); // JSTREE 카운트 추가
		tabulatorInit(); // 타뷸레이터 초기화		
	});			
	
	// jstree 카운트 초기화 문제 해결
	$('#folderlist').on("click.jstree", ".jstree-ocl", function (e)  {
	    if ((this).parentElement.classList.contains('jstree-closed')) {
	    	selectedNode = ($(this).nextAll(".jstree-anchor").attr("id"))
		     var node = $('#JSTree').jstree("get_node", selectedNode);
	    	// console.log("닫힘"+node.id);
	     }else{
	    	 jstreeCountInit();
	    	 tabulatorInit();
	     }
	});
	
	// 비정형 버튼 이벤트 설정
    $("#unstrfile-switch-btn").click(function(){
        detailModalBtnEvent({
        	modalId : "unstrfileSizeStatusModal",
            modalTitle : '웹 콘텐츠 최적화 현황', 
            tabulatorFunction : 'sizeTabulator', 
            topFunction : 'sizeTopContent', 
            monthSelectable : false
        });         
    });	
}

function tabulatorInit(resource_parent_no){
	// $("#volist").css({"opacity":"0"});
	let data = searchDataInit(resource_parent_no);
	let search_range = $("select[name=search_range]").val();
	
    table_resource = tabulatorFunction(data);
    // console.log(table_resource);
    
	// 카운트
	let countArray = countResourceFolder(countResourceFolder);
	for(let i = 0; i < countArray.length; i++){
		let target = $(".jstree").find(`li#${countArray[i].resource_no} a`);
		if(target.length > 0){
			const selectedCount = countArray[i].total_count;
			const totalCount = countArray[i].entire_count;
			target.eq(0).find(".count").html(`<span class="${selectedCount == 0 ? `zero` : `number selected`}">${comma(selectedCount)}</span>/<span class="number total">${comma(totalCount)}</span>`);
			if(totalCount == 0){
				target.eq(0).find(".count").css({"opacity":"0.3"});
			}
		}
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
    let search_page = $("input[name=search_page]").val();
	let search_range = $("input[name=search_range]").val();
	let search_keyword = $("input[name=search_keyword]").val();
	let startDate_ts = $("input[name=startDate_ts]").val();
	let endDate_ts = $("input[name=endDate_ts]").val();
	let precondition_status = $("input[name=precondition_status]").val();
	let search_date = $("input[name=search_date]").val();
	let search_condition = $("input[name=search_condition]").val();

	let data = {
		size: 15,
    	resource_parent_no : resource_parent_no,
    	resource_status_array : resource_status_array,
    	resource_type_array : resource_type_array,
    	search_range : search_range,
    	search_keyword : search_keyword,
    	search_disable : search_disable,
    	search_page : search_page,
    	startDate_ts : startDate_ts,
    	endDate_ts : endDate_ts,
    	search_date : search_date,
    	search_condition : search_condition,
    	filemanager_type : 1,
	};	
	if(with_log){
		data.with_log = 1;
	}
	if(precondition_status != "" && precondition_status != null){
		data.precondition_status = precondition_status;
	}
	return data;
}

function searchInit() {

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
	
	// searchCheckboxEvent("resource_status");
	searchCheckboxEvent("resource_type");
    $('#search-status-select').change(function(){
        let selectedNodeId = $('#folderlist').jstree(true).get_selected()[0];
        tabulatorInit(selectedNodeId);
    });
    
    if(modalId=="sizeStatusModal" || modalId=="timeStatusModal"){ // status 1 검색
    	$("input[name=precondition_status]").val(1);
    	$("#search-status-select")[0].sumo.selectItem("1"); 
    }
    if(modalId=="checkLatestResourceModal" || modalId=="checkLatestUnstrResourceModal"){ 
    	$("#search-status-select")[0].sumo.selectItem("-1"); 
    }
    if(modalId=="checkLatestResourceModal"){ // status 1 검색
    	// $("#search-status-select")[0].sumo.selectItem("-1"); 
    }
}

function searchCheckboxEvent(inputName){
    $(`input[name="${inputName}"]`).change(function(){
    	$("input[name=search_range]").val(0); // 유형별 선택이므로 강제 전체 선택 설정
    	$("#folderlist").jstree(true).deselect_all();
    	let selectedNodeId = $('#folderlist').jstree(true).get_selected()[0];
        tabulatorInit();
        
        // 체크된 체크박스의 value와 label 가져오기
        const checkedValue = $(this).val();
        const checkedLabel = $(`label[for="${$(this).attr('id')}"]`).text();
        
        // $(`label[for="${$(this).attr('id')}"]`).css({"background":"#ff0000"});
        // 체크박스가 체크되었는지 확인
        const isChecked = $(this).prop('checked');
        console.log(checkedValue);
    });
}

function jstreeCountInit(){
	$(".jstree .jstree-anchor").each(function(){
		if (!$(this).children(".count").length) {
			$(this).append(` <span class="count"></span>`);
		}
	});	
}

// 현재 월의 마지막 날을 구하는 함수
function getLastDayOfMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0);
}

// 현재 월의 첫째 날을 구하는 함수
function getFirstDayOfMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1);
}

//타임스탬프를 yyyy-MM-dd HH:mm:ss 형식으로 변환
function formatTimestamp(date, firstOfDay = false) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = firstOfDay ? '00' : '23';
    const minutes = firstOfDay ? '00' : '59';
    const seconds = firstOfDay ? '00' : '59';
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatTsToKorean(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-indexed month
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
}

// prev 버튼 클릭 핸들러
function handlePrevClick() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    lastDay = getLastDayOfMonth(currentDate);
    firstDay = getFirstDayOfMonth(currentDate);
    $("input[name=startDate_ts]").val(formatTimestamp(firstDay, true));
    $("input[name=endDate_ts]").val(formatTimestamp(lastDay));
    updateButtons();
    tabulatorInit();
}

// next 버튼 클릭 핸들러
function handleNextClick() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    lastDay = getLastDayOfMonth(currentDate);
    firstDay = getFirstDayOfMonth(currentDate);
    $("input[name=startDate_ts]").val(formatTimestamp(firstDay, true));
    $("input[name=endDate_ts]").val(formatTimestamp(lastDay));
    updateButtons();
    tabulatorInit();
}

// 버튼 상태 업데이트 및 currentMonth 업데이트
function updateButtons() {
    const now = new Date();
    const currentLastDay = getLastDayOfMonth(now);

    const dateValue = new Date($("input[name=endDate_ts]").val());
    const displayText = formatMonthDisplay(dateValue);
    $("#current-month").text(displayText);

    // 현재 월과 비교하여 next 버튼 비활성화
    if (dateValue.getFullYear() === now.getFullYear() && dateValue.getMonth() === now.getMonth()) {
        $("#next-month-btn").prop('disabled', true);
    } else {
        $("#next-month-btn").prop('disabled', false);
    }    
}

// yyyy년 mm월 형식으로 변환
function formatMonthDisplay(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}년 ${month}월`;
}

function devMode(){
	$("input[name=startDate_ts]").css({"display":"block"});
	$("input[name=endDate_ts]").css({"display":"block"});
}

function checkTimeBtnEvent(){
	Swal.fire({
		icon: "question",
		title: "렌더링 시간 측정을 시작하시겠습니까?",
		text: "웹 콘텐츠의 양에 따라 측정 시간이 길어질 수 있습니다.",
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
	        optimizerCheckTimeAgent();
	        Swal.fire({
	            icon: "success",
	            title: "렌더링 시간을 측정합니다.",
	            text: "잠시 기다려주세요.",
	            showClass: {
	                popup: 'animate__animated animate__fadeIn animate__faster',
	            },
	            hideClass: {
	                popup: 'animate__animated animate__fadeOut animate__faster',
	            },             
	        });
	        setTimeout(function(){
	            tabulatorInit();
	            avgTimeData = selectAvgTime();
	            topFunction();
	        }, 3000);
	    }
	});	
}


function drawHitmapChartEle(){
	$targetEle = $("#heatmap-chart");
	$targetEle.html("");
	let data = selectDailyPagePerformance().data;
	let html = "";
	for(let i = 0; i < data.length; i++){
		html += `<div class="col">${data[i].avg}</div>`;
	}

	let col = 40;
  
    let options = {
      series: [{
      name: 'Metric1',
      data: generateData(col, {
        min: 0,
        max: 35
      })
    },
    {
      name: 'Metric2',
      data: generateData(col, {
        min: 0,
        max: 50
      })
    },
    {
      name: 'Metric3',
      data: generateData(col, {
        min: 0,
        max: 90
      })
    },
    {
      name: 'Metric4',
      data: generateData(col, {
        min: 0,
        max: 35
      })
    },
    {
      name: 'Metric5',
      data: generateData(col, {
        min: 0,
        max: 100
      })
    },
    {
      name: 'Metric5',
      data: generateData(40, {
        min: 0,
        max: 35
      })
    },
    {
      name: 'Metric5',
      data: generateData(40, {
        min: 0,
        max: 100
      })
    },
    {
      name: 'Metric5',
      data: generateData(40, {
        min: 0,
        max: 35
      })
    },
    {
      name: 'Metric5',
      data: generateData(40, {
        min: 0,
        max: 35
      })
    },
    ],
      chart: {
      height: 265,
      type: 'heatmap',
		toolbar: {
                show: false // 오른쪽 상단 메뉴 숨기기
            },
		events: {
                    dataPointSelection: function(event, chartContext, config) {
                        // 클릭한 데이터 포인트의 정보를 로그로 출력
                        console.log('Clicked on: ', config.seriesIndex, config.dataPointIndex, config.w.config.series[config.seriesIndex].data[config.dataPointIndex]);
						location.href='/optimizerByContent';
                    }
                }
    },
    stroke: {
      width: 0
    },
    plotOptions: {
      heatmap: {
        radius: 30,
        enableShades: false,
        colorScale: {
          ranges: [{
              from: 0,
              to: 25,
              color: '#7ccf7c'
            },
            {
              from: 26,
              to: 50,
              color: '#ffff00'
            },
            {
              from: 51,
              to: 75,
              color: '#ff9c00'
            },
            {
              from: 76,
              to: 100,
              color: '#ff0000'
            },
          ],
        },
    
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff']
      }
    },
    xaxis: {
      type: 'category',
            labels: {
                show: false // Y축 레이블 표시
            }
    },
        yaxis: {
            labels: {
                show: false // Y축 레이블 표시
            }
        },
    title: {
      text: ''
    },
      dataLabels: {
            enabled: false // 데이터 레이블 숨기기
        },

        legend: {
            show: false // 범례 숨기기
        },
        tooltip: {
            enabled: false // 툴팁 숨기기
        }        
    };

    let chart = new ApexCharts(document.querySelector("#heatmap-chart"), options);
    chart.render();
}

function generateData(count, { min, max }) {
	  const data = [];
	  
	  for (let i = 0; i < count; i++) {
	    const randomValue = Math.random() * (max - min) + min;
	    data.push(parseInt(randomValue));
	  }
	  
	  return data;
}

/*
mainCommonFnc.drawHeatmapChartEle = function(){
	const $containerEle = $("#heatmap-chart-container");
	const colMax = 80;
	let $targetEle = $("#heatmap-chart");
	$targetEle.find("ul").html("");
	let $bgEle = $containerEle.find("#heatmap-bg");
	let itemWidth = 0;
	let itemHeight = 0;
	if($targetEle.length == 0){
		$containerEle.append(`<div id="heatmap-chart"><ul></ul></div>`);
		$targetEle = $("#heatmap-chart");
	}
	
	if($bgEle.length == 0){ // 배경 그리기
		$containerEle.append(`<div id="heatmap-bg"><ul></ul></div>`);
		$bgEle = $containerEle.find("#heatmap-bg");
	}
	
	bgWidth = $bgEle.width();
	bgHeight = $bgEle.height();
	itemWidth = (100/colMax)+"%";
	itemHeight = bgWidth/colMax;
	let rowMax = parseInt(bgHeight/itemHeight);
	itemHeight += "px";
	let itemLimit = colMax*rowMax;
	let bgHtml = "";
	for(let i = 0; i < itemLimit; i++){
		bgHtml += "<li><a></a></li>";
	}
	$bgEle.find("ul").html(bgHtml);
	$bgEle.find("li").css({"width": `${itemWidth}`,"height": `${itemHeight}`});
	
    // legend 이벤트 초기화
    const $legendEle = $("#heatmap-chart-legend");
    if($legendEle.attr("data-init") != 1){
    	$legendEle.attr("data-init", 1);
    	$legendEle.find("li").each(function(){
    		$(this).click(function(){
    			const level = $(this).attr("data-level");
    			const status = $(this).attr("data-status");
    			if(status == "on"){
    				$(this).addClass("off");
    				$(this).attr("data-status", "off");
    				$targetEle.find(`.level${level}`).addClass("off");
    			}else{
    				$(this).removeClass("off");
    				$(this).attr("data-status", "on");
    				$targetEle.find(`.level${level}`).removeClass("off");
    			}
    		});
    	});
    }	
	
	let data = selectPageSpeedLog().data;
	if(mainGlobal.orgSpeedLogArray == null){
		// mainGlobal.orgSpeedLogArray = [...data];
	}
	// let newSpeedLogArray = data.filter(item => !mainGlobal.orgSpeedLogArray.includes(item));
	
	let html = "";
	let dataLimit = data.length;
	if(dataLimit > itemLimit){
		dataLimit = itemLimit;
	}
	for(let i = 0; i < dataLimit; i++){
		html += `<li data-page-url="${data[i].page_url}" data-created-at="${data[i].created_at}" data-duration="${data[i].duration}" data-page-no="${data[i].page_no}" data-log-sn="${data[i].log_sn}"><a href="#">&nbsp;</a></li>`;
	}
	$targetEle.find("ul").html(html);
	$targetEle.find("li").each(function(index, item){
		const duration = parseInt($(this).attr("data-duration"));
		const $aEle = $(item).find("a");
		if(duration <= 1000){
			$(item).addClass("level1");
			if($legendEle.find("li[data-level=1]").attr("data-status")=="off"){
				$(item).addClass("off");
			}
		}else if(duration <= 3000){
			$(item).addClass("level2");	
			if($legendEle.find("li[data-level=2]").attr("data-status")=="off"){
				$(item).addClass("off");
			}			
		}else if(duration <= 5000){
			$(item).addClass("level3");	
			if($legendEle.find("li[data-level=3]").attr("data-status")=="off"){
				$(item).addClass("off");
			}			
		}else{
			$(item).addClass("level4");		
			if($legendEle.find("li[data-level=4]").attr("data-status")=="off"){
				$(item).addClass("off");
			}			
		}
		$(item).css({"width": `${itemWidth}`,"height": `${itemHeight}`});
		setTimeout(function(){	
			$aEle.css({"opacity":"1.0"});		
		}, index*1);
	});
	
	if($("#heatmap-tooltip").length == 0){
		$("body").append(`<div id="heatmap-tooltip"></div>`);	
	}
	
	const $tooltip = $("#heatmap-tooltip");
    $targetEle.on("mouseenter", "li", function(e) {
        const tooltipText = $(this).attr("data-tooltip");
		const created_at = mainCommonFnc.formatTimestamp($(this).attr("data-created-at"));
		const duration = parseInt($(this).attr("data-duration"));
		const duration_str = timeUnitFormatter(duration);
		let duration_class = "";
		if(duration <= 1000){
			duration_class = "level1";
		}else if(duration <= 3000){
			duration_class = "level2";		
		}else if(duration <= 5000){
			duration_class = "level3";	
		}else{
			duration_class = "level4";
		}		
        $tooltip.html(`
			${$(this).attr("data-page-url")}<br />
			${created_at}<br />
			<strong class="${duration_class}">● ${duration_str}</strong><br />
		`);
		$tooltip.css({
		    top: $(this).offset().top - $tooltip.outerHeight() -10 + 'px', // 위치 조정
		    left: $(this).offset().left + 'px',
		});
		$tooltip.stop().fadeIn(200);
    });
    $targetEle.on("mouseleave", "li", function() {
		$tooltip.stop().fadeOut(200);
    });
    $targetEle.on("click", "li", function() {
		const page_no = $(this).attr("data-page-no");
		location.href=`/optimizerByPage?page_no=${page_no}`;
    });
   
}
*/

mainCommonFnc.drawHeatmapChartEle = function(){

	const $containerEle = $("#heatmap-chart-container");
	const colMax = 80;
	let $targetEle = $("#heatmap-chart");
	let $bgEle = $containerEle.find("#heatmap-bg");
	let itemWidth = 0;
	let itemHeight = 0;
	
	// 차트 요소 초기화 (처음 실행 시에만)
	if($targetEle.length == 0){
		$containerEle.append(`<div id="heatmap-chart"><ul></ul></div>`);
		$targetEle = $("#heatmap-chart");
	}
	
	// 배경 요소 초기화 (처음 실행 시에만)
	if($bgEle.length == 0){
		$containerEle.find(".loading").remove();
		$containerEle.append(`<div id="heatmap-bg"><ul></ul></div>`);
		$bgEle = $containerEle.find("#heatmap-bg");
	}	
	// 배경 그리기
	bgWidth = $bgEle.width();
	bgHeight = $bgEle.height();
	itemWidth = (100/colMax)+"%";
	itemHeight = bgWidth/colMax;
	let rowMax = parseInt(bgHeight/itemHeight);
	itemHeight += "px";
	let itemLimit = colMax*rowMax;
	let bgHtml = "";
	
	if($bgEle.find("li").length == 0){
		for(let i = 0; i < itemLimit; i++){
			bgHtml += "<li><a></a></li>";
		}
		$bgEle.find("ul").html(bgHtml);
		$bgEle.find("li").css({"width": `${itemWidth}`,"height": `${itemHeight}`});		
	}
	
	// legend 이벤트 초기화 (처음 실행 시에만)
	const $legendEle = $("#heatmap-chart-legend");
	if($legendEle.attr("data-init") != 1){
		$legendEle.attr("data-init", 1);
		$legendEle.find("li").each(function(){
			$(this).click(function(){
				const level = $(this).attr("data-level");
				const status = $(this).attr("data-status");
				if(status == "on"){
					$(this).addClass("off");
					$(this).attr("data-status", "off");
					$targetEle.find(`.level${level}`).addClass("off");
				}else{
					$(this).removeClass("off");
					$(this).attr("data-status", "on");
					$targetEle.find(`.level${level}`).removeClass("off");
				}
			});
		});
	}  
	
	// 전역 변수로 마지막으로 그려진 데이터의 인덱스를 저장
	if (typeof mainGlobal.lastDrawnIndex === 'undefined') {
		mainGlobal.lastDrawnIndex = -1;
	}	
	
	// 데이터 가져오기
	const $startIndexInput = $("#startIndex");
	const startIndex = $startIndexInput.val();
	// let result = await selectPageSpeedLog(startIndex);
		
	selectPageSpeedLog({startIndex : startIndex, limit : colMax*rowMax})
		.then( result => {
			let data = result.data;		
			
			// 새로운 데이터만 선택
			let newData = data.slice(mainGlobal.lastDrawnIndex + 1);
			let $ul = $targetEle.find("ul");
			
			// 새로운 데이터 처리 및 추가
			let html = "";
			for(let i = 0; i < newData.length; i++){
				let item = newData[i];
				if(i == 0){
					$startIndexInput.val(item.log_sn);
				}
				html += `<li data-page-url="${item.page_url}" data-created-at="${item.created_at}" data-duration="${item.duration}" data-page-no="${item.page_no}" data-log-sn="${item.log_sn}"><a href="#">&nbsp;</a></li>`;
			}
			$ul.prepend(html);
			
			// 새로 추가된 요소들에 대해서만 스타일 적용
			$ul.children("li:lt(" + newData.length + ")").each(function(index, item){
				const duration = parseInt($(this).attr("data-duration"));
				const $aEle = $(item).find("a");
				if(duration <= 1000){
					$(item).addClass("level1");
					if($legendEle.find("li[data-level=1]").attr("data-status")=="off"){
						$(item).addClass("off");
					}
				}else if(duration <= 3000){
					$(item).addClass("level2");    
					if($legendEle.find("li[data-level=2]").attr("data-status")=="off"){
						$(item).addClass("off");
					}           
				}else if(duration <= 5000){
					$(item).addClass("level3");    
					if($legendEle.find("li[data-level=3]").attr("data-status")=="off"){
						$(item).addClass("off");
					}           
				}else{
					$(item).addClass("level4");        
					if($legendEle.find("li[data-level=4]").attr("data-status")=="off"){
						$(item).addClass("off");
					}           
				}
				$(item).css({"width": `${itemWidth}`,"height": `${itemHeight}`});
				setTimeout(function(){    
					$aEle.css({"opacity":"1.0"});        
				}, index*1);
			});
			
			// 마지막으로 그려진 인덱스 업데이트
			mainGlobal.lastDrawnIndex = data.length - 1;
			
			// 최대 표시 개수를 넘어선 요소들은 제거
			let $items = $ul.children("li");
			let itemLimit = colMax * parseInt(bgHeight/parseFloat(itemHeight));
			if ($items.length > itemLimit) {
				$items.slice(itemLimit).remove();
			}
			
			// 툴팁 초기화 (처음 실행 시에만)
			if($("#heatmap-tooltip").length == 0){
				$("body").append(`<div id="heatmap-tooltip"></div>`);    
			}
			
			// 툴팁 및 클릭 이벤트 처리
			const $tooltip = $("#heatmap-tooltip");
			$targetEle.off("mouseenter mouseleave click", "li").on({
				mouseenter: function(e) {
					const created_at = mainCommonFnc.formatTimestamp($(this).attr("data-created-at"));
					const duration = parseInt($(this).attr("data-duration"));
					const duration_str = timeUnitFormatter(duration);
					let duration_class = duration <= 1000 ? "level1" : 
						duration <= 3000 ? "level2" : 
							duration <= 5000 ? "level3" : "level4";
					$tooltip.html(`
							${$(this).attr("data-page-url")}<br />
							${created_at}<br />
							<strong class="${duration_class}">● ${duration_str}</strong><br />
					`);
					$tooltip.css({
						top: $(this).offset().top - $tooltip.outerHeight() -10 + 'px',
						left: $(this).offset().left + 'px',
					}).stop().fadeIn(200);
				},
				mouseleave: function() {
					$tooltip.stop().fadeOut(200);
				},
				click: function() {
					const page_no = $(this).attr("data-page-no");
					location.href=`/optimizerByPage?page_no=${page_no}`;
				}
			}, "li");
		}).catch( err => {
			  console.error("Error in drawHeatmapChartEle:", error);
			    // 에러 스택 트레이스 출력
			    console.error(error.stack);
		});
		
	
}

mainCommonFnc.formatTimestamp = function(timestamp) {
    // 타임스탬프를 밀리초 단위로 변환
    const date = new Date(parseInt(timestamp, 10));

    // 연도, 월, 일, 시간, 분, 초를 추출
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // 원하는 포맷으로 조합
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}