console.log("DB ");

let g_temp = {
	SPEED_MAX: 1500,
	SPEED_LEVEL1: 100,
	SPEED_LEVEL2: 1000,
};

const tableData = [
	{
		id: "QRY001",
		execution_time: 2450,
		status: "성공",
		query_text: "SELECT o.*, c.customer_name FROM orders o JOIN customers c ON o.customer_id = c.customer_id WHERE o.order_date BETWEEN '2023-01-01' AND '2023-12-31'",
		plan_summary: "조인 최적화 필요, 인덱스 누락",
		bottleneck: "풀 테이블 스캔 (customers)",
		tables: "orders, customers",
		resource_usage: "CPU: 65%, 메모리: 120MB",
		triggered_at: "2023-04-15 14:23:45",
		recommendations: ["인덱스 생성 (customers.customer_id)", "JOIN 순서 최적화"]
	},
	{
		id: "QRY002",
		execution_time: 356,
		status: "성공",
		query_text: "UPDATE inventory SET stock_quantity = stock_quantity - 1 WHERE product_id = 12345",
		plan_summary: "인덱스 사용 (product_id)",
		bottleneck: "없음",
		tables: "inventory",
		resource_usage: "CPU: 12%, 메모리: 24MB",
		triggered_at: "2023-04-15 14:25:12",
		recommendations: []
	},
	{
		id: "QRY003",
		execution_time: 8750,
		status: "타임아웃",
		query_text: "SELECT t1.*, t2.* FROM transaction_history t1 JOIN transaction_details t2 ON t1.transaction_id = t2.transaction_id WHERE t1.transaction_date > '2022-01-01'",
		plan_summary: "다중 조인, 정렬 오버헤드",
		bottleneck: "인덱스 누락, 너무 많은 결과 반환",
		tables: "transaction_history, transaction_details",
		resource_usage: "CPU: 95%, 메모리: 480MB",
		triggered_at: "2023-04-15 14:30:08",
		recommendations: ["WHERE 조건 추가", "LIMIT 추가", "인덱스 생성"]
	},
	{
		id: "QRY004",
		execution_time: 125,
		status: "성공",
		query_text: "SELECT * FROM users WHERE username = 'admin'",
		plan_summary: "인덱스 사용 (username)",
		bottleneck: "없음",
		tables: "users",
		resource_usage: "CPU: 5%, 메모리: 8MB",
		triggered_at: "2023-04-15 14:32:21",
		recommendations: []
	},
	{
		id: "QRY005",
		execution_time: 1850,
		status: "실패",
		query_text: "DELETE FROM sales_data WHERE region_id IN (SELECT id FROM regions WHERE country_code = 'US')",
		plan_summary: "서브쿼리 사용, 인덱스 누락",
		bottleneck: "서브쿼리 최적화 필요, 잠금 경합",
		tables: "sales_data, regions",
		resource_usage: "CPU: 78%, 메모리: 210MB",
		triggered_at: "2023-04-15 14:35:46",
		recommendations: ["JOIN으로 재작성", "트랜잭션 분할"]
	},
	{
		id: "QRY006",
		execution_time: 1230,
		status: "성공",
		query_text: "SELECT p.product_name, SUM(o.quantity) as total_sold FROM products p JOIN order_items o ON p.product_id = o.product_id GROUP BY p.product_name ORDER BY total_sold DESC LIMIT 10",
		plan_summary: "집계 쿼리 최적화 필요",
		bottleneck: "그룹화 연산 오버헤드",
		tables: "products, order_items",
		resource_usage: "CPU: 55%, 메모리: 98MB",
		triggered_at: "2023-04-15 15:10:33",
		recommendations: ["복합 인덱스 고려", "집계 테이블 생성"]
	},
	{
		id: "QRY007",
		execution_time: 4680,
		status: "타임아웃",
		query_text: "INSERT INTO audit_log (user_id, action, timestamp) SELECT user_id, 'login', CURRENT_TIMESTAMP FROM user_sessions WHERE session_duration > 3600",
		plan_summary: "복잡한 삽입 쿼리",
		bottleneck: "대량 데이터 처리",
		tables: "user_sessions, audit_log",
		resource_usage: "CPU: 88%, 메모리: 350MB",
		triggered_at: "2023-04-15 15:15:47",
		recommendations: ["배치 처리 고려", "인덱스 최적화"]
	},
	{
		id: "QRY008",
		execution_time: 210,
		status: "성공",
		query_text: "SELECT COUNT(*) as active_users FROM users WHERE last_login > DATE_SUB(NOW(), INTERVAL 30 DAY)",
		plan_summary: "단순 카운트 쿼리",
		bottleneck: "없음",
		tables: "users",
		resource_usage: "CPU: 8%, 메모리: 16MB",
		triggered_at: "2023-04-15 15:20:12",
		recommendations: []
	},
	{
		id: "QRY009",
		execution_time: 5600,
		status: "실패",
		query_text: "UPDATE performance_metrics SET total_score = (SELECT AVG(individual_score) FROM performance_records WHERE department = 'sales')",
		plan_summary: "서브쿼리 성능 문제",
		bottleneck: "서브쿼리 비효율적 실행",
		tables: "performance_metrics, performance_records",
		resource_usage: "CPU: 92%, 메모리: 276MB",
		triggered_at: "2023-04-15 15:25:56",
		recommendations: ["JOIN으로 쿼리 재작성", "임시 테이블 사용"]
	},
	{
		id: "QRY010",
		execution_time: 680,
		status: "성공",
		query_text: "SELECT e.name, d.department_name, AVG(s.salary) as avg_salary FROM employees e JOIN departments d ON e.department_id = d.id JOIN salaries s ON e.employee_id = s.employee_id GROUP BY e.name, d.department_name",
		plan_summary: "복합 조인 쿼리",
		bottleneck: "다중 조인 오버헤드",
		tables: "employees, departments, salaries",
		resource_usage: "CPU: 45%, 메모리: 85MB",
		triggered_at: "2023-04-15 15:30:22",
		recommendations: ["복합 인덱스 추가", "쿼리 최적화"]
	},
	{
		id: "QRY011",
		execution_time: 2350,
		status: "부분 성공",
		query_text: "SELECT customer_id, MAX(purchase_amount) as highest_purchase FROM customer_purchases WHERE purchase_date > '2022-06-01' GROUP BY customer_id HAVING COUNT(*) > 5",
		plan_summary: "조건부 집계 쿼리",
		bottleneck: "HAVING 절 성능 저하",
		tables: "customer_purchases",
		resource_usage: "CPU: 62%, 메모리: 145MB",
		triggered_at: "2023-04-15 15:35:41",
		recommendations: ["인덱스 재구성", "파티셔닝 고려"]
	},
	{
		id: "QRY012",
		execution_time: 95,
		status: "성공",
		query_text: "SELECT * FROM product_cache WHERE product_id = 7890",
		plan_summary: "캐시 테이블 쿼리",
		bottleneck: "없음",
		tables: "product_cache",
		resource_usage: "CPU: 3%, 메모리: 6MB",
		triggered_at: "2023-04-15 15:40:15",
		recommendations: []
	},
	{
		id: "QRY013",
		execution_time: 3450,
		status: "타임아웃",
		query_text: "INSERT INTO historical_sales SELECT * FROM daily_sales WHERE sale_date < DATE_SUB(NOW(), INTERVAL 365 DAY)",
		plan_summary: "대량 데이터 이동",
		bottleneck: "대규모 데이터 처리",
		tables: "daily_sales, historical_sales",
		resource_usage: "CPU: 85%, 메모리: 420MB",
		triggered_at: "2023-04-15 15:45:30",
		recommendations: ["배치 처리 분할", "병렬 처리 고려"]
	},
	{
		id: "QRY014",
		execution_time: 550,
		status: "성공",
		query_text: "SELECT inventory_id, SUM(quantity_changed) as net_stock_change FROM inventory_log GROUP BY inventory_id",
		plan_summary: "재고 변동 집계",
		bottleneck: "대규모 그룹화",
		tables: "inventory_log",
		resource_usage: "CPU: 38%, 메모리: 72MB",
		triggered_at: "2023-04-15 15:50:47",
		recommendations: ["증분 집계 고려"]
	},
	{
		id: "QRY015",
		execution_time: 6200,
		status: "실패",
		query_text: "UPDATE customer_segments SET segment_score = (SELECT AVG(total_spend) FROM customer_transactions WHERE transaction_date > '2022-01-01' GROUP BY customer_id)",
		plan_summary: "복잡한 서브쿼리 업데이트",
		bottleneck: "서브쿼리 비효율성",
		tables: "customer_segments, customer_transactions",
		resource_usage: "CPU: 95%, 메모리: 512MB",
		triggered_at: "2023-04-15 15:55:22",
		recommendations: ["임시 테이블 사용", "쿼리 분할", "인덱스 최적화"]
	}
];

$(function() {
    g_temp.initTable();
});



g_temp.initTable = function() {
    // Tabulator 테이블 초기화
    g_temp.table = new Tabulator("#table-container", {
        data: tableData,
        layout: "fitColumns",
        initialSort: [
            { column: "execution_time", dir: "desc" }
        ],
        columns: [
            { 
                title: "인스턴스", 
                field: "id", 
                headerHozAlign: "center",
                hozAlign: "center",
                width: 100,
				visible: false,
				formatter: function(cell) {
				    var value = cell.getValue();
				    return "WAS-01";
				}
            },
            { 
                title: "쿼리 ID", 
                field: "id", 
                headerHozAlign: "center",
                hozAlign: "left",
                width: 100,
				visible: false,
            },
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
					const {execution_time} = cell.getRow().getData();
					const classfiedItem = classifyQueryTime(execution_time);
					let width = (execution_time / g_temp.SPEED_MAX) * 100;
					if(width > 100){width=100;}
					let html = `<div class="table-timeline">
						<div class="${classfiedItem.class}" style="width: ${width}%;">&nbsp;</div>
						<p>${comma(execution_time)} ms</p>
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
			        const cellData = cell.getValue();
			        const {execution_time} = cell.getRow().getData();
			        const classfiedItem = classifyQueryTime(execution_time);
			        return classfiedItem.text;
			    },
			    headerClick: function(e, column) {
			        // 물음표 아이콘을 클릭했을 때만 모달 띄우기
			        if ($(e.target).hasClass('fa-circle-question')) {
			            $('#bottleneck-classfy-modal').modal('show');
			            e.stopPropagation(); // 정렬 방지
			        } else {
			            // 현재 정렬 상태 추적
			            const currentSorts = g_temp.table.getSorters();
			            const currentSort = currentSorts.length > 0 ? currentSorts[0] : null;

			            const newDir = !currentSort || currentSort.dir === 'asc' ? 'desc' : 'asc';

			            // 정렬 수행
			            g_temp.table.setSort([
			                { column: "execution_time", dir: newDir }
			            ]);

			            // 화살표 업데이트
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
                title: "테이블", 
                field: "tables",
                headerHozAlign: "center",
                hozAlign: "left",
				visible: false,
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
                formatter: function(cell) {
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
}