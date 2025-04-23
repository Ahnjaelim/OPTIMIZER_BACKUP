let g_temp = {
	SPEED_MAX: 1500,
	SPEED_LEVEL1: 100,
	SPEED_LEVEL2: 1000,
	UPDATE_INTERVAL: 10000,
	interval: false,
	timeblock: {},
	chart: false,
	chartDataInit: false,
	allDataSeries: null
};

// JSON 파일에서 데이터 불러오기
let tableData = [];

// Define a custom symbol path for Highcharts
Highcharts.SVGRenderer.prototype.symbols.cross = function (x, y, w, h) {
    return ['M', x, y, 'L', x + w, y + h, 'M', x + w, y, 'L', x, y + h, 'z'];
};


// 페이지 로드시 JSON 파일 데이터 로드
function loadTableData() {
	return $.ajax({
		url: "/resource/js/dbModule/demoData.json",
		dataType: "json",
		success: function(data) {
			tableData = data.data;
			console.log("데이터 로드 성공:", tableData.length + "개의 쿼리 데이터");
		},
		error: function(xhr, status, error) {
			console.error("데이터 로드 실패:", error);
			// 로드 실패 시 기본 데이터 사용 또는 오류 처리
		}
	});
}

// 초기화 함수
$(function() {
	// JSON 데이터 로드 후 초기화 진행
	loadTableData().done(function() {
		g_temp.initTable();
		g_temp.initTimeblock();
		g_temp.chart = g_temp.initChart();
		g_temp.updateChart();
		
		g_temp.interval = setInterval(function() {
			g_temp.updateTimeblock();
		}, g_temp.UPDATE_INTERVAL);
	});
});

// 테이블 초기화 함수
g_temp.initTable = function() {
	g_temp.table = new Tabulator("#table-container", {
		data: tableData,
		layout: "fitColumns",
		initialSort: [
			{ column: "execution_time", dir: "desc" }
		],
		columns: [
			{
				title: "쿼리 텍스트",
				field: "query_text",
				headerHozAlign: "center",
				hozAlign: "left",
				widthGrow: true,
				formatter: function(cell) {
					var value = cell.getValue();
					return "<div class='query-text'>" + value + "</div>";
				}
			},
			{
				title: "성능 타임라인",
				field: "execution_time",
				headerHozAlign: "center",
				hozAlign: "center",
				width: 200,
				sorter: "number",
				formatter: function(cell) {
					const { execution_time } = cell.getRow().getData();
					const classfiedItem = classifyQueryTime(execution_time);
					let width = (execution_time / g_temp.SPEED_MAX) * 100;
					if (width > 100) { width = 100; }
					let html = `<div class="table-timeline">
						<div class="${classfiedItem.class}" style="width: ${width}%;">&nbsp;</div>
						<p>${formatNumber(execution_time)} ms</p>
					</div>`;

					return html;
				}
			},
			{
				title: `<span class="header-sort-area">병목 상태</span> <i class="fa-solid fa-circle-question" class="header-modal-trigger"></i>
			    <span class="sort-icon-container"><i class="fa-solid fa-caret-down sort-icon"></i></span>`,
				field: "execution_time",
				headerHozAlign: "center",
				hozAlign: "center",
				sorter: "number",
				width: 120,
				headerSort: false,
				formatter: function(cell) {
					const { execution_time } = cell.getRow().getData();
					const classfiedItem = classifyQueryTime(execution_time);
					return classfiedItem.text;
				},
				headerClick: function(e, column) {
					if ($(e.target).hasClass('fa-circle-question')) {
						$('#bottleneck-classfy-modal').modal('show');
						e.stopPropagation();
					} else {
						const currentSorts = g_temp.table.getSorters();
						const currentSort = currentSorts.length > 0 ? currentSorts[0] : null;
						const newDir = !currentSort || currentSort.dir === 'asc' ? 'desc' : 'asc';

						g_temp.table.setSort([
							{ column: "execution_time", dir: newDir }
						]);

						const $sortIcon = $('.sort-icon');
						if (newDir === 'asc') {
							$sortIcon.removeClass('fa-caret-down').addClass('fa-caret-up');
						} else {
							$sortIcon.removeClass('fa-caret-up').addClass('fa-caret-down');
						}
					}
				},
			},
			{
				title: "응답 결과",
				field: "status",
				width: 100,
				headerHozAlign: "center",
				hozAlign: "center",
				formatter: function(cell) {
					var value = cell.getValue();
					var className = "";

					if (value === "성공") {
						className = "query-badge-success";
					} else if (value === "실패") {
						className = "query-badge-error";
					} else if (value === "타임아웃") {
						className = "query-badge-warning";
					}

					return `<span class="query-badge ${className}">${value}</span>`;
				}
			},
			{
				title: "리소스 사용량",
				field: "resource_usage",
				headerHozAlign: "center",
				hozAlign: "left",
				width: 180,
			},
			{
				title: "요청 시간",
				field: "triggered_at",
				headerHozAlign: "center",
				hozAlign: "center",
				width: 170
			},
			{
				title: "상세 보기",
				field: "button",
				headerHozAlign: "center",
				hozAlign: "center",
				width: 120,
				formatter: function() {
					return `<button onclick="g_detail.renderDetailModal();">상세 보기</button>`;
				}
			},
		],
		rowFormatter: function(row) {
			var data = row.getData();
			if (data.execution_time >= 1000) {
				row.getElement().style.backgroundColor = "#ffe0e0";
			}
		},
	});
};

// 초기 타임블록 렌더링 함수
g_temp.initTimeblock = function() {
	const $container = $("#timeblock-container");
	$container.empty();
	const $ul = $("<ul></ul>");
	$container.append($ul);

	fetchData(`/db/queries/timeblock?interval=${g_temp.UPDATE_INTERVAL/1000}`).then(response => {
		const data = response.data;
		console.log("data", data);

		let html = "";  // 여기로 이동

		// 데이터가 빈 배열이어도 안전하게 forEach 실행
		data.forEach(item => {
			const { bottleneck_rate, slow_query_count, time_block, total_query_count } = item;
			const timeStr = time_block.split(" ");
			const time = timeStr[1];
			html += `<li class="${classifyBottleneckRate(bottleneck_rate).class}">
		        <p>${bottleneck_rate}%</p>
		        <p>${time}</p>
		      </li>`;
		});

		// 데이터가 없는 경우
		if (data.length === 0) {
			console.log("타임블록 데이터가 없습니다");
			// 기본 데이터나 메시지 표시 가능
			html = "<li>데이터가 없습니다</li>";
		}

		// Promise 내부에서 HTML 추가
		$ul.html(html);

	}).catch(error => {
		console.error("타임블록 데이터 로드 실패:", error);
		$ul.html("<li>데이터 로드 실패</li>");
	});
};

// 타임블록 업데이트 함수
g_temp.updateTimeblock = function() {
    const $ul = $("#timeblock-container ul");
    const itemWidth = $ul.find("li").first().outerWidth();
    
    // 임시 데이터 생성
    const now = new Date();
    const timeString = formatTime(now);

	fetchData(`/db/queries/timeblock?interval=${g_temp.UPDATE_INTERVAL / 1000}&latest=true`).then(response => {
		const data = response.data;
		const { bottleneck_rate, slow_query_count, time_block, total_query_count } = data;

		let html = ""
		// 데이터가 없는 경우
		if (data.length === 0) {
			// 기본 데이터나 메시지 표시 가능
			html = `<li class="">
			      <p>0%</p>
			      <p>${timeString}</p>
			  </li>`;
		}else{
			html = `<li class="${classifyBottleneckRate(bottleneck_rate).class}">
		        <p>${bottleneck_rate}%</p>
		        <p>${time}</p>
		      </li>`;
		}
		// 새 요소 추가
		$ul.append(html);

		// 왼쪽으로 이동 애니메이션
		requestAnimationFrame(() => {
			$ul.css('transform', `translateX(-${itemWidth}px)`);

			// 애니메이션 완료 후 처리
			setTimeout(() => {
				// 애니메이션을 비활성화하고 모든 작업을 한 번에 진행
				$ul.css({
					'transition': 'none',
					'transform': 'translateX(0)'
				});

				// 첫 번째 항목 제거
				$ul.find("li").first().remove();

				// 강제로 레이아웃 재계산 (reflow)
				$ul[0].offsetHeight;

				// 애니메이션 재활성화
				$ul.css('transition', 'transform 0.5s ease');
			}, 500);
		});
	}).catch(error => {

	});

};

// 병목 비율 분류 함수
function classifyBottleneckRate(bottleneckPercent) {
	const colors = {
		LIGHT_BLUE: "#e6f7ff",
		MEDIUM_BLUE: "#fff7e6",
		DARK_BLUE: "#ffe6e6"
	};

	if (bottleneckPercent < 10) {
		return {
			text: `<span style="color: #008ffb"><i class="fa-solid fa-circle"></i> 빠름</span>`,
			bgColor: colors.LIGHT_BLUE,
			class: "level1",
		};
	} else if (bottleneckPercent <= 30) {
		return {
			text: `<span style="color: #f7cc53"><i class="fa-solid fa-circle"></i> 보통</span>`,
			bgColor: colors.MEDIUM_BLUE,
			class: "level2",
		};
	} else { // 30% 초과
		return {
			text: `<span style="color: #f34e4e"><i class="fa-solid fa-circle"></i> 느림</span>`,
			bgColor: colors.DARK_BLUE,
			class: "level3",
		};
	}
}

// 쿼리 실행 시간 분류 함수
function classifyQueryTime(executionTime) {
	if (executionTime < g_temp.SPEED_LEVEL1) {
		return {
			text: `<span style="color: #008ffb"><i class="fa-solid fa-circle"></i> 빠름</span>`,
			class: "level1",
		};
	} else if (executionTime < g_temp.SPEED_LEVEL2) {
		return {
			text: `<span style="color: #f7cc53"><i class="fa-solid fa-circle"></i> 보통</span>`,
			class: "level2",
		};
	} else {
		return {
			text: `<span style="color: #f34e4e"><i class="fa-solid fa-circle"></i> 느림</span>`,
			class: "level3",
		};
	}
}

// 랜덤 숫자 생성 함수
function getRandNumber() {
	const randomValue = Math.random() * 50;
	const roundedValue = Math.round(randomValue * 10) / 10;
	return roundedValue.toFixed(1);
}

// 시간 포맷팅 함수
function formatTime(date) {
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');
	const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
	return `${hours}:${minutes}:${seconds}`;
}

// 숫자 포맷팅 함수 (쿼리 실행 시간 등에 사용)
function formatNumber(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// 차트 초기화 함수
g_temp.initChart = function() {
	g_temp.allDataSeries = generateInitialData();
	
	return Highcharts.chart('chart-container', {
		chart: {
			type: 'scatter',
			animation: Highcharts.svg
		},
		time: {
			useUTC: false
		},
		title: {
			text: ''
		},
		xAxis: {
			type: 'datetime',
			title: {
				text: ''
			},
			labels: {
				format: '{value:%H:%M:%S}'
			},
			tickInterval: 10 * 1000,
			// min: Date.now() - 90 * 1000,
			// max: Date.now()
		},
		yAxis: {
			title: {
				text: '처리 시간 (ms)'
			},
			//min: 0,
			// max: 2000
		},
		plotOptions: {
			scatter: {
				states: {
					hover: {
						marker: {
							enabled: false
						}
					}
				},
				tooltip: {
					headerFormat: '<b>{series.name}</b><br>',
					pointFormat: '시간: {point.name}<br>값: {point.y}'
				}
			}
		},
		series: [
			{
				name: '보통',
				color: 'rgba(255, 255, 0, 0.7)',
				marker: {
					symbol: 'circle',
					radius: 5,
					lineWidth: 1
				},
				data: [],
			},
			{
				name: '느림',
				color: 'rgba(255, 0, 0, 0.7)',
				marker: {
					symbol: 'circle',
					radius: 5,
					lineWidth: 1
				},
				data: [],
			},
			{
				name: '오류',
				color: 'rgba(255, 0, 0, 0.7)',
				marker: {
					symbol: 'cross',
					radius: 5,
					lineWidth: 2,  // 선 너비 증가
					lineColor: 'rgba(255, 0, 0, 1)'  // 선 색상을 더 진하게
				},
				data: [],
			}
		]
	});
};


/*
// 차트 업데이트 함수
g_temp.updateChart = function() {
    const now = Date.now();
    const cutoffTime = now - 90 * 1000; // 90초 전 시간 계산
    
    let latest = false;
    if (!g_temp.chartDataInit) {
        latest = true;
    }
    
    console.log("차트 데이터 업데이트");
    
    fetchData(`/db/queries/bottleneck?latest=${latest}`).then(response => {
        const data = response.data;
        console.log("data", data);
        
        // 데이터 필터링
        let seriesData = [];
        seriesData[0] = data.filter(item => item.y <= 1000 && item.status == 1);
        seriesData[1] = data.filter(item => item.y > 1000 && item.status == 1);
        seriesData[2] = data.filter(item => item.status != 1);
        
        if (g_temp.chartDataInit) {
            // 이미 초기화된 경우 데이터 포인트 추가
            for (let i = 0; i < 3; i++) {
                seriesData[i].forEach(point => {
                    // 새 포인트 추가 시 shift 옵션을 true로 설정하여 오래된 데이터 자동 제거
                    const shift = g_temp.chart.series[i].data.length > 0 && 
                                 g_temp.chart.series[i].data[0].x < cutoffTime;
                    g_temp.chart.series[i].addPoint(point, false, shift);
                });
            }
        } else {
            // 초기화되지 않은 경우 데이터 설정
            for (let i = 0; i < 3; i++) {
                g_temp.chart.series[i].setData(seriesData[i]);
            }
            g_temp.chartDataInit = true;
        }
        
        // X축 범위 설정 - 이것이 차트가 움직이는 핵심
        g_temp.chart.xAxis[0].setExtremes(cutoffTime, now);
        g_temp.chart.redraw();
        
    }).catch(error => {
        console.error("차트 데이터 로드 실패:", error);
    });
};*/

// 차트 업데이트 함수
g_temp.updateChart = function(chart, allDataSeries) {
	const now = Date.now();
	const newPointsSeries = generateNewDataPoints();
	const cutoffTime = now - 90 * 1000;
	
	for (let i = 0; i < 3; i++) {
		g_temp.allDataSeries[i] = g_temp.allDataSeries[i].concat(newPointsSeries[i]);
		g_temp.allDataSeries[i] = g_temp.allDataSeries[i].filter(point => point.x >= cutoffTime);
		g_temp.chart.series[i].setData(g_temp.allDataSeries[i]);
	}

	g_temp.chart.xAxis[0].setExtremes(now - 90 * 1000, now);
	return g_temp.allDataSeries;
};


// 초기 데이터 생성 함수
function generateInitialData() {
	const series = [[], [], []];
	const now = Date.now();

	for (let i = 0; i < 10; i++) {
		const timePoint = now - (90 - i * 10) * 1000;

		for (let seriesIndex = 0; seriesIndex < 3; seriesIndex++) {
			const pointCount = Math.floor(Math.random() * 3) + 1;
			for (let j = 0; j < pointCount; j++) {
				series[seriesIndex].push({
					x: timePoint,
					y: Math.random() * 100,
					name: new Date(timePoint).toISOString().substr(11, 8)
				});
			}
		}
	}
	return series;
}

// 새로운 데이터 포인트 생성 함수
function generateNewDataPoints() {
	const now = Date.now();
	const newSeries = [[], [], []];

	for (let seriesIndex = 0; seriesIndex < 3; seriesIndex++) {
		const pointCount = Math.floor(Math.random() * 3) + 1;
		for (let i = 0; i < pointCount; i++) {
			newSeries[seriesIndex].push({
				x: now,
				y: Math.random() * 100,
				name: new Date(now).toISOString().substr(11, 8)
			});
		}
	}

	return newSeries;
}
