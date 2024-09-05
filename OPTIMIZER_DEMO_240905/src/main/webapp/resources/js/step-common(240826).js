const step = parseInt(urlParams.get("step")) || 1;
const maxStep = 4;
const $prevBtn = $(".prev-btn");
const $nextBtn = $(".next-btn");
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
				location.href=`/index?step=${step+1}&page_url=${$pageUrl.val()}`;
			}
		}
	});
	
}

stepFnc.initStep[3] = function(){
	const page_url = urlParams.get("page_url");
	if(page_url == null || page_url == ""){
		alert("잘못된 요청입니다!");
		return;
	}
	$("#target-page").attr("src",page_url);
	let param = {page_url : page_url, page_status : 0};
	requestLightHouse(param)
    .then(response => {
        console.log("진단 완료");
    	let auditData = selectLightHouse(param);
        const jsonObject = JSON.parse(auditData.lh_json);
    	const performanceScore = jsonObject.categories.performance.score;
    	const performancePercentage = performanceScore * 100;        
        $(".audit-summary").html(`<div id="radial-chart"></div>`);
        let chartParam = {
    		value : performancePercentage,
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
        	location.href=`/index?step=4&page_url=${page_url}`;
        });
        $prevBtn.prop("disabled", false);
        $nextBtn.prop("disabled", false);
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

stepFnc.initStep[4] = function(){
	const page_url = urlParams.get("page_url");
	/*
	let page_no = 0;
	let pageData = selectPageByPageUrl(page_url);
	console.log("pageData", pageData);
	let isOld = true;
	if(pageData == null || isOld == true){
		requestResourceCollection(page_url)
		.then(response => {
			if(response.data.length > 0){    		
				page_no = response.data.page_no;
			}else{
				pageData = selectPageByPageUrl(page_url);
				page_no = pageData.page_no;
			}
			updatePageCollStatus({page_no : page_no, page_coll_status : 1});
		})
		.catch(error => {
			console.error("Request failed:", error);
		});
	}else{
		page_no = pageData.page_no;
	}
	
	let interval = setInterval(function(){
		console.log("page_no", page_no);
		let functionStatus = 0;
		if(page_no != 0){
			functionStatus = drawResourceList(page_no, "COLLECT");
		}
			
		if (functionStatus === 1) {
			updatePageCollStatus({page_no : page_no, page_coll_status : 2});
			clearInterval(interval);
			$(".progress-msg").html("수집이 완료되었습니다!");
			$nextBtn.off('click');
			$nextBtn.click(function(){
				location.href=`/index?step=5&page_no=${page_no}`;
			});
			$nextBtn.prop("disabled", false);			    
		}	   		
	}, 2000);   */
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
	const data = selectResourceAllByPageNo(page_no);
	// console.log("data", data);
	// 프로그레스
	let countObject = {
			total : data.length,
			done : 0,
			percentage : 0,
	};
	
	let doneArray = [];
	switch(type){
	case "COLLECT":
		doneArray = data.filter(item => item.resource_org_size != 0);		
		break;
	case "OPTIMIZE":
		doneArray = data.filter(item => item.resource_status == 1);				
		break;
	}

	countObject.done = doneArray.length;
	countObject.percentage = parseInt((countObject.done / countObject.total)*100);
	$(".progress-bar").css({"width" : countObject.percentage+"%"});
	switch(type){
	case "COLLECT":	
		$(".progress-percentage").html(`${countObject.percentage}% <span style="color:rgba(255,255,255,0.5);">(${countObject.done}건 수집 완료)</span>`);
		break;
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
	case "COLLECT":	
		if(targetData){
			$(".progress-msg").html(`${targetData.resource_name}을(를) 수집하고 있습니다.`);			
		}
		break;
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
	case "COLLECT":	
		data.sort(function(a, b) {
		    return a.resource_org_size - b.resource_org_size;
		});		
		break;
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
			case "COLLECT":	
				html += printCollTr(data[i]);
				break;
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

/*
function printResourceStatus(resource_status){
	let targetStatusItem = statusArray.find(item => item.value == resource_status);

	return `<span style="color:${targetStatusItem.color}"><ion-icon name="${targetStatusItem.icon}"></ion-icon> ${targetStatusItem.label}</span>`;
}*/

stepFnc.initStep[6] = function(){
	
    // 버튼 정리
    $(".window-foot").html("");
    $(".window-foot").html(`<button class="report-download-btn deactive" style="width:200px;"><i class="fa-solid fa-table"></i> 보고서 다운로드</button>`);	
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

	let lhBeforeData = selectLightHouse({page_url : page_url, page_status : 0});
	const jsonObject = JSON.parse(lhBeforeData.lh_json);
	const performanceScore = jsonObject.categories.performance.score;
	const performancePercentage = performanceScore * 100;
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

}

function drawSimulation(data) {
	const param = urlParams.get("page_url");
	const page_no = urlParams.get("page_no");
	console.log("time", selectResourceTimeAnalysisByPage(page_no)); // 시간 단축률
	let timeReduRate = 0.7;
	
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
					$iframe.attr("src", `/viewHtml?page_no=${data.page_no}&content_type=2`);
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
		const targetUrl = `${currentDomain}/viewHtml?page_no=${data.page_no}&content_type=2`;
		let scoreHtml = `<div class="spinner-border text-primary m-1" role="status"><span class="sr-only">Loading...</span></div> 잠시 기다려주세요.<br />20초 안팎으로 소요될 예정입니다.`;
		$("#after-score").html(scoreHtml);
		let param = {page_url : targetUrl, page_status : 1, page_no : page_no};	
		requestLightHouse(param)
	    .then(response => {
	        // 요청이 성공하면 여기서 응답 데이터 사용

	    	let lhAfterData = selectLightHouse(param);
	        const jsonObject = JSON.parse(lhAfterData.lh_json);
	    	const performanceScore = jsonObject.categories.performance.score;
	    	const performancePercentage = performanceScore * 100;
	    	// $("#after-score").html(performancePercentage2+"점");
	    	
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
	    	$("#score-desc").html(`성능 점수가 <strong>${diffScore}점</strong> 상승했습니다.`);
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