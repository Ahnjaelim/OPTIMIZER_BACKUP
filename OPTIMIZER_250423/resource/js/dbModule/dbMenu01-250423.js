let g_temp = {
	SPEED_MAX: 1500,
	SPEED_LEVEL1: 100,
	SPEED_LEVEL2: 1000,
	UPDATE_INTERVAL: 10000,
	interval: false,
	timeblock: {},
	timeblockDataInit: false,
	chart: false,
	chartDataInit: false,
	chartBasicData: [],
	tableDataInit: false,
};

Highcharts.SVGRenderer.prototype.symbols.cross = function (x, y, w, h) {
    return ['M', x, y, 'L', x + w, y + h, 'M', x + w, y, 'L', x, y + h, 'z'];
};

// 초기화 함수
$(function() {
	g_temp.initTable();
	g_temp.initTimeblock();
	g_temp.chart = g_temp.initChart();
	g_temp.updateChart();
	g_temp.updateTable();
	g_temp.interval = setInterval(function() {
		g_temp.updateTimeblock();
		g_temp.updateChart();
		g_temp.updateTable();
	}, g_temp.UPDATE_INTERVAL);
});

// 테이블 초기화 함수
g_temp.initTable = function() {
	g_temp.table = new Tabulator("#table-container", {
		data: [],
		layout: "fitColumns",
		initialSort: [
			{ column: "transaction_duration", dir: "desc" }
		],
		columns: [
			{
				title: "쿼리 텍스트",
				field: "transaction_query",
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
				field: "transaction_duration",
				headerHozAlign: "center",
				hozAlign: "center",
				width: 200,
				sorter: "number",
				formatter: function(cell) {
					const { transaction_duration } = cell.getRow().getData();
					const classfiedItem = classifyQueryTime(transaction_duration);
					let width = (transaction_duration / g_temp.SPEED_MAX) * 100;
					if (width > 100) { width = 100; }
					let html = `<div class="table-timeline">
						<div class="${classfiedItem.class}" style="width: ${width}%;">&nbsp;</div>
						<p>${formatNumber(transaction_duration)} ms</p>
					</div>`;

					return html;
				}
			},
			{
				title: `<span class="header-sort-area">병목 상태</span> <i class="fa-solid fa-circle-question" class="header-modal-trigger"></i>
			    <span class="sort-icon-container"><i class="fa-solid fa-caret-down sort-icon"></i></span>`,
				field: "transaction_duration",
				headerHozAlign: "center",
				hozAlign: "center",
				sorter: "number",
				width: 120,
				headerSort: false,
				formatter: function(cell) {
					const { transaction_duration } = cell.getRow().getData();
					const classfiedItem = classifyQueryTime(transaction_duration);
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
							{ column: "transaction_duration", dir: newDir }
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
					const value = cell.getValue();
					return classifyQueryStatus(value);
				}
			},
			{
				title: "리소스 사용량",
				field: "resource_usage",
				headerHozAlign: "center",
				hozAlign: "left",
				width: 180,
				visible: false,
			},
			{
				title: "요청 시간",
				field: "transaction_start_time",
				headerHozAlign: "center",
				hozAlign: "center",
				width: 170,
				formatter: function(cell) {
					const value = cell.getValue();
					return formatMysqlDateTime(value);
				}				
			},
			{
				title: "상세 보기",
				field: "qm_no",
				headerHozAlign: "center",
				hozAlign: "center",
				width: 120,
				formatter: function(cell) {
				  const qm_no = cell.getValue();
				  const data = cell.getRow().getData();
				  return `<button onclick="g_detail.renderDetailModal(${qm_no});">상세 보기</button>`;
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

g_temp.updateTable = function(){
	
	let latest = g_temp.tableDataInit;
	
	fetchData(`/db/queries/latest/table?latest=${latest}`).then(response => {
		
		const data = response.data;
		// console.log("table data", data);
		
		if(!g_temp.tableDataInit){
			g_temp.tableDataInit = true;
		}
		
		if(data.length > 0){
			g_temp.table.setData(data);			
		}
		
	}).catch(error => {
		
	});
}


// 초기 타임블록 렌더링 함수
g_temp.initTimeblock = function() {
	const $container = $("#timeblock-container");
	$container.empty();
	const $ul = $("<ul></ul>");
	$container.append($ul);

	fetchData(`/db/queries/timeblock?interval=${g_temp.UPDATE_INTERVAL/1000}`).then(response => {
		const data = response.data;
		let html = "";  // 여기로 이동

		// 데이터가 빈 배열이어도 안전하게 forEach 실행
		data.forEach(item => {
			html += g_temp.formatTimeblock(item);
		});

		// 데이터가 없는 경우
		if (data.length === 0) {
			console.log("타임블록 데이터가 없습니다");
			html = "<li>NO DATA</li>";
		}

		// Promise 내부에서 HTML 추가
		$ul.html(html);

	}).catch(error => {
		console.error("타임블록 데이터 로드 실패:", error);
		$ul.html("<li>데이터 로드 실패</li>");
	});
};

g_temp.formatTimeblock = function(data) {
	const { bottleneck_rate, slow_query_count, time_block, total_query_count } = data;
	const timeStr = time_block.split(" ");
	const time = timeStr[1];
	return `<li class="${classifyBottleneckRate(bottleneck_rate).class}">
        <p data-toggle="tooltip" data-placement="top" title="" data-original-title="${time} 병목도 ${bottleneck_rate}%">${bottleneck_rate}%</p>
      </li>`;
}

// 타임블록 업데이트 함수
g_temp.updateTimeblock = function() {
	const $ul = $("#timeblock-container ul");

	if ($ul.length === 0) {
		console.error("timeblock-container ul 요소를 찾을 수 없습니다!");
		return; // 요소가 없으면 여기서 중단
	}

	const itemWidth = $ul.find("li").first().outerWidth();

	// 현재 시간 가져오기
	const now = new Date();
	const timeString = formatTime(now);

	fetchData(`/db/queries/timeblock?interval=${g_temp.UPDATE_INTERVAL / 1000}&latest=true`).then(response => {
		const data = response.data;

		let html = "";
		// 데이터 구조에 따라 처리 방식 변경
		if (!data || (Array.isArray(data) && data.length === 0)) {
			// 데이터가 없는 경우
			html = `<li class="">
		        <p>0%</p>
		        <p>${timeString}</p>
		      </li>`;
		} else {
			html = g_temp.formatTimeblock(data[0]);
		}

		$ul.append(html);
		
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
				const firstItem = $ul.find("li").first();
				firstItem.remove();

				// 강제로 레이아웃 재계산 (reflow)
				$ul[0].offsetHeight;

				// 애니메이션 재활성화
				$ul.css('transition', 'transform 0.5s ease');
			}, 500);
		});
	}).catch(error => {
		console.error("타임블록 데이터 가져오기 실패:", error);
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
	return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// 숫자 포맷팅 함수 (쿼리 실행 시간 등에 사용)
function formatNumber(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// 초기 데이터 생성 함수
function generateInitialData() {
	const series = [[], [], [], []];
	const now = Date.now();

	for (let i = 0; i < 10; i++) {
		const timePoint = now - (90 - i * 10) * 1000;

		for (let seriesIndex = 0; seriesIndex <= 3; seriesIndex++) {
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

// 차트 업데이트 함수
g_temp.updateChart = function() {
	const now = Date.now();
	const cutoffTime = now - 100 * 1000;

	let latest = g_temp.chartDataInit;

	fetchData(`/db/queries/latest/chart?latest=${latest}`).then(response => {
		
		// MySQL에서 가져온 데이터의 timestamp 포맷 변환
		const rawData = response.data;
		const data = rawData.map(item => ({
			...item,
			x: new Date(item.x).getTime(), // timestamp 문자열을 밀리초로 변환 (high차트에 맞게 파싱)
		}));

		let newData = [];
		newData[0] = data.filter(item => item.y <= 100 && item.status == 1);
		newData[1] = data.filter(item => item.y > 100 && item.y <= 1000 && item.status == 1);
		newData[2] = data.filter(item => item.y > 1000 && item.status == 1);
		newData[3] = data.filter(item => item.status != 1);

		if (!g_temp.chartDataInit) { // 데이터 초기화
			g_temp.chartBasicData = newData;
			g_temp.chartDataInit = true;
		}		
		
		// console.log("chart data", newData);

		for (let i = 0; i <= 3; i++) {
			g_temp.chartBasicData[i] = g_temp.chartBasicData[i].concat(newData[i]);
			g_temp.chartBasicData[i] = g_temp.chartBasicData[i].filter(point => point.x >= cutoffTime);
			g_temp.chart.series[i].setData(g_temp.chartBasicData[i]);
		}

		g_temp.chart.xAxis[0].setExtremes(now - 100 * 1000, now);
		
	}).catch(error => {
		console.error("차트 데이터 로드 실패:", error);
	});
};

// 차트 초기화 함수
g_temp.initChart = function() {
	
	return Highcharts.chart('chart-container', {
		chart: {
			type: 'scatter',
			animation: Highcharts.svg
		},
		boost: {
		    useGPUTranslations: true,
		    usePreAllocated: true,
		    seriesThreshold: 10000  // 시리즈가 1개 이상일 때 boost 사용
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
			min: Date.now() - 90 * 1000,
			max: Date.now()
		},
		yAxis: {
			title: {
				text: '처리 시간 (ms)'
			},
			min: 0,
			max: 100
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
		    point: {
		      events: {
		        click: function() {
		          // 클릭 이벤트 처리 코드
		          console.log('포인트 클릭됨:', this.point);
				  g_detail.renderDetailModal(this.point.qm_no);
		          
		          // 여기에 원하는 동작 추가
		          // 예: 상세 정보 표시, 다른 함수 호출 등
		        }
		      }
		    }
		  }
		},
		tooltip: {
			useHTML: true,
			formatter: function() {
				let query_idx = this.point.query_idx;
				if(!query_idx){
					query_idx = 0;	
				}
				let html = `<div class="tooltip-point">
				    <p><strong>처리 시간:</strong> ${comma(this.point.y)} ms <span style="color: ${this.series.color}"><i class="fa-solid fa-circle"></i> ${this.series.name}</span></p>
					<p><strong>요청 시간:</strong> ${formatMysqlDateTime(this.point.x)}</p>
					<p><strong>쿼리 ID:</strong> Q_${this.point.page_no}_${query_idx}</p>
					<p><strong>쿼리 유형:</strong> ${this.point.query_type}</p>
					<p><strong>응답 결과:</strong> ${classifyQueryStatus(this.point.status)}</p>
				</div>`;
				return html;
			},
			shared: true // 여러 시리즈의 포인트를 하나의 툴팁에 표시
		},
		series: [
			{
				name: '빠름',
				color: 'rgba(0, 143, 251, 0.3)',
				marker: {
					symbol: 'circle',
					radius: 5,
					lineWidth: 1
				},
				data: []
			},
			{
				name: '보통',
				color: '#ffc107',
				marker: {
					symbol: 'circle',
					radius: 5,
					lineWidth: 1
				},
				data: []
			},
			{
				name: '느림',
				color: '#f14639',
				marker: {
					symbol: 'circle',
					radius: 5,
					lineWidth: 1
				},
				data:[]
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
				data: []
			}
		]
	});
};