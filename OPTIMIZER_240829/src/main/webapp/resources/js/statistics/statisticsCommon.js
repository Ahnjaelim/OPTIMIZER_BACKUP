

function st_main(){
	
	updateDisplay_st();
	drawBarChart("barChartMonth");
	drawBarChart("barChartWeek");
	drawDoughnutChart("doughnutChartWeek");
	drawDoughnutChart("doughnutChartMonth");
	drawContentTable("contentTable");
	drawPageTable("pageTable");
}



function wc_main(){
	
	
	getUseData();
	draw_contentTypeTable();
	draw_contentTable();
}


function ct_main(){
	
	draw_costChart("weekSaveChart","week");
	draw_costChart("monthSaveChart","month");
	draw_costTable("weekSaveTable","week");
	draw_costTable("monthSaveTable","month");
}

let currentDate_st = new Date();

//년, 월, 일 추출
const currentYear_st = currentDate_st.getFullYear();
const currentMonth_st = currentDate_st.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줌

let selectYear_st = currentYear_st;
let selectMonth_st =currentMonth_st;

function updateDisplay_st(){
	$("#fc-dom-1").text(`${selectYear_st}년 ${selectMonth_st}월`);
	
	if(selectYear_st == currentYear_st && selectMonth_st == currentMonth_st){
		$("#next").prop("disabled", true);
	}else{
		$("#next").prop("disabled", false);
	}
	
	if(sn ===2){
		ct_main();
		
	}else if(sn ===3){
		wc_main();
	}
}



function prevBtn_st(){
	if (selectMonth_st === 1) {
        selectMonth_st = 12;
        selectYear_st--;
    } else {
        selectMonth_st--;
    }
    updateDisplay_st();
}
function nextBtn_st(){
	if (selectMonth_st === 12) {
        selectMonth_st = 1;
        selectYear_st++;
    } else {
        selectMonth_st++;
    }
    updateDisplay_st();
}

function drawBarChart(chartName){
	 // Chart.js Stacked Bar Chart 설정
    var ctx = document.getElementById(chartName).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
                {
                    label: '이미지',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: '비디오',
                    data: [2, 3, 20, 5, 1, 4],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: '폰트',
                    data: [3, 10, 13, 15, 22, 30],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: false,
                    text: 'Stacked Bar Chart Example'
                },
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            }
        }
    });
}



function drawDoughnutChart(chartName){
	 var ctx = document.getElementById(chartName).getContext('2d');
     var myDoughnutChart = new Chart(ctx, {
         type: 'doughnut',
         data: {
             labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
             datasets: [{
                 label: 'Dataset 1',
                 data: [300, 50, 100, 80, 120, 90],
                 backgroundColor: [
                     'rgba(255, 99, 132, 0.2)',
                     'rgba(54, 162, 235, 0.2)',
                     'rgba(255, 206, 86, 0.2)',
                     'rgba(75, 192, 192, 0.2)',
                     'rgba(153, 102, 255, 0.2)',
                     'rgba(255, 159, 64, 0.2)'
                 ],
                 borderColor: [
                     'rgba(255, 99, 132, 1)',
                     'rgba(54, 162, 235, 1)',
                     'rgba(255, 206, 86, 1)',
                     'rgba(75, 192, 192, 1)',
                     'rgba(153, 102, 255, 1)',
                     'rgba(255, 159, 64, 1)'
                 ],
                 borderWidth: 1
             }]
         },
         options: {
             plugins: {
                 title: {
                     display: false,
                     text: 'Doughnut Chart Example'
                 },
                 legend: {
                     display: true,
                     position: 'right' // 레이블을 차트 우측에 배치
                 }
             },
             responsive: true,
             maintainAspectRatio: false
         }
     });
}



function drawContentTable(tableName){
	 var tabledata = [
		 	{id:1, name:"이미지", percent :"12%"},
		 	{id:1, name:"동영상", percent :"50%"},
		 	{id:1, name:"텍스트", percent :"30%"},
		 	{id:1, name:"폰트", percent :"24%"},
		 	
		 ];
	
	var table = new Tabulator("#"+tableName, {
	 	height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
	 	data:tabledata, //assign data to table
	 	layout:"fitColumns", //fit columns to width of table (optional)
	 	columns:[ //Define Table Columns
		 	{title:"유형", field:"name", width:100},
		 	{title:"로딩시간 향상률", field:"percent", hozAlign:"center"},
	 	],
	});
}


function drawPageTable(tableName){
	 var tabledata = [
		 	{no:1, name:"/index.do", percent :"12%"},
		 	{no:2, name:"/ilia.do", percent :"50%"},
		 	{no:3, name:"/kmain.do", percent :"30%"},
		 	{no:4, name:"/aman.do", percent :"24%"},
		 	{no:4, name:"/talia.do", percent :"24%"},
		 	
		 ];
	
	var table = new Tabulator("#"+tableName, {
	 	height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
	 	data:tabledata, //assign data to table
	 	layout:"fitColumns", //fit columns to width of table (optional)
	 	columns:[ //Define Table Columns
	 		{title:"순번", field:"no", width:100},
		 	{title:"유형", field:"name", width:100},
		 	{title:"로딩시간 향상률", field:"percent", hozAlign:"center"},
	 	],
	});
}





function draw_contentTypeTable(){
	
	
	table_resource = new Tabulator("#contentTypeTable", {
		selectable:false,
	    pagination:false, //enable pagination
	    paginationMode:"remote", //enable remote pagination
	    sortMode: "remote",
	  //setup cells to work as a spreadsheet
	    columnDefaults:{
	        headerSort:false,
	       
	    },
	    ajaxURL:"/selectContentAll", //set url for ajax request
	    ajaxParams:{
	    	rgstr_yyyy: selectYear_st,
	    	rgstr_mm:selectMonth_st,
	    },
	    placeholder:"해당 조건에 맞는 데이터가 존재하지 않습니다.",
	    autoResize:true,
	    tooltips:false,
	    langs:{
	        "default":{
	            "pagination":{
	                "counter":{
	                    "showing": "Showing",
	                    "of": "of",
	                    "rows": "rows",
	                    "pages": "pages",
	                    "Prev": "이전"
	                }
	            },
	        }
	    },	    
	    ajaxContentType : "application/json; charset=utf-8",
	    ajaxContentType:"json",
	    ajaxResponse:function(url,prarm,response){
	    	response = response.data;
	    	for (var i = 0; i < response.length; i++) {
	    		response[i].in_use_count  = comma(response[i].in_use_count)+" 건"; 
	    		response[i].not_in_use_count = comma(response[i].not_in_use_count)+" 건"; 
	    		response[i].negative_size_count = comma(response[i].negative_size_count)+" 건"; 
			}
	    	return response; 
	    },
	    layout: "fitColumns", 
	    columns: [
	    	{
	    		title: "웹 콘텐츠 유형",
	    		field: "resource_type",
	    		hozAlign:"center",
	    		formatter: function(cell, formatterParams, onRendered) {
	    			
	    			return checkTypeKor(cell.getValue());
	    		}		    		
	    		
	    	},
	    	{
	    		title: "사용 콘텐츠",
	    		field: "in_use_count",
	    		hozAlign:"right",
	    		
	    	},
	    	{
	    		title: "미사용 콘텐츠",
	    		field: "not_in_use_count",
	    		hozAlign:"right",
	    		
	    	},
	    	{
	    		title: "없는 콘텐츠",
	    		field: "negative_size_count",
	    		hozAlign:"right",
	    	},
	    	
	    ]
	    ,
	    rowFormatter: function(row) {
	        // 각 로우의 높이 조정
	        row.getElement().style.height = "50px"; // 원하는 높이(px)로 설정
	    }
	});	

	
}


function draw_contentTable(searchKeyword){
	
	table_resource = new Tabulator("#contentTable", {
		selectable:false,
	    pagination:true, //enable pagination
	    paginationMode:"remote", //enable remote pagination
	    sortMode: "remote",
	    ajaxURL:"/selectContentTable", //set url for ajax request
	    ajaxParams:{
	    	searchKeyword:searchKeyword,
	    	rgstr_yyyy: selectYear_st,
	    	rgstr_mm:selectMonth_st,
	    },	    
	    paginationSize:5, //optional parameter to request a certain number of rows per page
	    placeholder:"해당 조건에 맞는 데이터가 존재하지 않습니다.",
	    autoResize:true,
	    tooltips:false,
	    columnDefaults:{
	        
	       
	    },
	    langs:{
	        "default":{
	            "pagination":{
	                "counter":{
	                    "showing": "Showing",
	                    "of": "of",
	                    "rows": "rows",
	                    "pages": "pages",
	                    "Prev": "이전"
	                }
	            },
	        }
	    },	    
	    ajaxContentType : "application/json; charset=utf-8",
	    ajaxContentType:"json",
	    ajaxResponse:function(url,prarm,response){
	    	
	    	for (var i = 0; i < response.data.length; i++) {
	    		
	    		if(response.data[i].resource_status == 1){
	    			response.data[i].resource_status = `<span class="badge badge-normal">양호</span>`;	    			
	    		}else{
	    			response.data[i].resource_status = `<span class="badge badge-abnormal">미흡</span>`;
	    		}
			}
	    	
	    	return response; 
	    },
	    paginationInitialPage: 1,
	    layout: "fitColumns", 
	    columns: [
	    	{
	    		title: "No",
	    		field: "row",
	    		width:"75",
	    		hozAlign:"right",
	    		headerSort:false,
	    		
	    	},
	    	{
	    		title: "웹 콘텐츠 유형",
	    		field: "resource_type",
	    		width:"150",
	    		hozAlign:"center",
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
	    	},
	    	{
	    		title: "웹 콘텐츠 명",
	    		field: "resource_name",
	    		hozAlign:"center",
	    		
	    	},
	    	{
	    		title: "최적화 상태",
	    		field: "resource_status",
	    		width:"150",
	    		hozAlign:"center",
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return cell.getValue();
	    		},
	    		
	    	},
	    	{
	    		title: "원본 용량",
	    		field: "resource_org_size",
	    		hozAlign:"right",
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = "";
	    			if(cell.getValue() < 0){
	    				result = `<ion-icon name="close-circle-outline" style="font-size:1.3em; color:#b4b4b4;"></ion-icon>`;
	    			}else{
	    				result = fileSizeUnitFormatter(cell.getValue());
	    			}
	    			return result;
	    		},  
	    		
	    	},
	    	{
	    		title: "최적화 용량",
	    		field: "resource_new_size_type2",
	    		hozAlign:"right",
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = "";
	    			if(cell.getValue() < 0){
	    				result = `<ion-icon name="close-circle-outline" style="font-size:1.3em;"></ion-icon>`;
	    			}else{
	    				result = fileSizeUnitFormatter(cell.getValue());
	    			}
	    			return result;
	    		},
	    		
	    	},
	    	
	    		    	

	    ]
	});	
}


function checkTypeKor(value){
	
	switch (value) {
	case 0:
		return `폴더 `;
		break;
	case 1:
		return `이미지 파일`;
		break;
	case 2:
		return `비디오 파일`;
		break;
	case 3:
		return `텍스트 파일`;
		break;
	case 4:
		return `폰트 파일`;
		break;
	default:
		return value;
		break;
	}
}


function getUseData(){
	
	let data =[]
	$.ajax({
		type: 'POST',
		url: '/selectUseOrNot',
		data:{
			rgstr_yyyy: selectYear_st,
	    	rgstr_mm:selectMonth_st,
		},
		async: false,
		success: function(data) {
			
			
			
			data= {
            labels: ['미사용 콘텐츠', '사용 콘텐츠', '없는 콘텐츠'],
            datasets: [{
               // label: 'Dataset 1',
                data: [data.data[0].not_in_use_count, data.data[0].in_use_count, data.data[0].negative_size_count],
                backgroundColor: [
                	'rgba(178, 34, 34, 1)',    // 진한 빨강
                    'rgba(0, 0, 139, 1)',      // 진한 파랑
                    'rgba(255, 165, 0, 1)'     // 진한 주황(노랑에 가까운 색)
                	
                ],
                borderColor: [
                	'rgba(241, 70, 57, 1)',   // 진한 빨강
                    'rgba(0, 0, 248, 1)',     // 진한 파랑
                    'rgba(255, 193, 7, 1)'    // 진한 주황(노랑에 가까운 색)
                ],
                borderWidth: 1
            }]
        }
			wc_drawDoughnutChart("doughnutChartConetent",data);	
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	

	
	
}


function wc_drawDoughnutChart(chartName,data){
	 var ctx = document.getElementById(chartName).getContext('2d');
	   // 기존 차트 객체를 찾거나 생성
	    var existingChart = Chart.getChart(ctx);

	    if (existingChart) {
	        // 기존 차트가 존재하면 destroy하여 삭제
	        existingChart.destroy();
	    }
	 
	 if (data.labels.length === 0 || data.datasets[0].data[0]+data.datasets[0].data[1]+data.datasets[0].data[2] === 0) {
          ctx.font = '20px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'white';
          ctx.fillText('데이터가 존재하지 않습니다.', ctx.canvas.width/ 2, ctx.canvas.height );
      } else {
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data:data
//        {
//            labels: ['Red', 'Blue', 'Orange'],
//            datasets: [{
//                label: 'Dataset 1',
//                data: [300, 50, 90],
//                backgroundColor: [
//                    'rgba(255, 99, 132, 0.2)',
//                    'rgba(54, 162, 235, 0.2)',
//                    'rgba(255, 159, 64, 0.2)'
//                ],
//                borderColor: [
//                    'rgba(255, 99, 132, 1)',
//                    'rgba(54, 162, 235, 1)',
//                    'rgba(255, 159, 64, 1)'
//                ],
//                borderWidth: 1
//            }]
//        }
        	,
        options: {
            plugins: {
                title: {
                    display: false,
                    text: 'Doughnut Chart Example'
                },
                legend: {
                    display: true,
                    position: 'right' // 레이블을 차트 우측에 배치
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const chart = elements[0].element.$context.chart;
                    const index = elements[0].index;

                    // 인덱스에 따라 다른 함수 실행
                    switch (index) {
                        case 0:
                            handleRedClick();
                            break;
                        case 1:
                            handleBlueClick();
                            break;
                        case 2:
                            handleYellowClick();
                            break;
                        default:
                            console.log('Unknown slice');
                    }
                }
            }
        }
    });
    
    // 각각의 클릭 시 실행할 함수
    function handleRedClick() {
    	draw_contentTable("dontuse");
    }

    function handleBlueClick() {
    	draw_contentTable("use");
    }

    function handleYellowClick() {
    	draw_contentTable("gone");
    }
}
}


function draw_costChart(name,gubun){
	if(gubun ==="month"){
		month = 0;
	}else{
		month = selectMonth_st;
	}
	let data;
	$.ajax({
        url: 'selectCost', 
        method: 'post',
        dataType: 'json',
        async:false,
        data:{
			rgstr_yyyy:selectYear_st,
			rgstr_mm:month,
		},
        success: function (data) {
        	data=data.data;
        	// 데이터 그룹화 함수
        	
        	console.log("data");
        	console.log(data);
        	console.log(selectYear_st,month)
        	let groupedData = data.reduce((acc, item) => {
        		let key;
        		if(gubun ==="week"){
        			key = `${getWeekOfMonth(item.yyyy, item.mm, item.dd)} 주차`;
        	    }else{
        	    	key = item.mm+" 월";
        	    }
        		
        		

        	    if (!acc[key]) {
        	        acc[key] = { month: key, image_cost: 0, video_cost: 0, text_cost: 0, font_cost: 0 };
        	    }

        	    const _cost = item.resource_new_size_type2 * item.resource_call_cnt * getCloud_payment(item.cloud_no) / 1024 / 1024 / 1024;

        	    if (item.resource_type === 1) {
        	        acc[key].image_cost += _cost;
        	    } else if (item.resource_type === 2) {
        	        acc[key].video_cost += _cost;
        	    } else if (item.resource_type === 3) {
        	        acc[key].text_cost += _cost;
        	    } else if (item.resource_type === 4) {
        	        acc[key].font_cost += _cost;
        	    } else {
        	        console.log("지정되지 않은 타입입니다");
        	    }

        	    return acc;
        	}, {});
        	
        	let groupedDataArray = Object.values(groupedData);


        	// month 기준으로 오름차순 정렬
        	groupedDataArray.sort((a, b) => {
        	    // ' 월' 문자열을 제거한 후 숫자로 변환하여 비교 (예: '3 월' -> 3)
        	    let monthA = parseInt(a.month.replace(' 월', ''));
        	    let monthB = parseInt(b.month.replace(' 월', ''));
        	    return monthA - monthB;
        	});
	    	
        	// Chart.js 데이터 준비
        	let labels = groupedDataArray.map(item => item.month);
        	let imageCosts = groupedDataArray.map(item => item.image_cost);
        	let videoCosts = groupedDataArray.map(item => item.video_cost);
        	let textCosts = groupedDataArray.map(item => item.text_cost);
        	let fontCosts = groupedDataArray.map(item => item.font_cost);

        	let ctx = document.getElementById(name).getContext('2d');
        	// 기존 차트 객체를 찾거나 생성
       	 var existingChart = Chart.getChart(ctx);

    	    if (existingChart) {
    	        // 기존 차트가 존재하면 destroy하여 삭제
    	        existingChart.destroy();
    	    }
        	if (data.length ===0) {
                ctx.font = '20px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = 'white';
                ctx.fillText('데이터가 존재하지 않습니다.', ctx.canvas.width/ 2, ctx.canvas.height / 2);
            }else{
            
            
        	
        	
        	
        	 myChart = new Chart(ctx, {
        	    type: 'bar',
        	    data: {
        	        labels: labels,
        	        datasets: [
        	        	{
        	                label: '이미지',
        	                data: imageCosts,
        	                backgroundColor: 'rgba(241, 70, 57, 1)',  // 진한 빨강
        	                borderColor: 'rgba(241, 70, 57, 0.5)',
        	                borderWidth: 1
        	            },
        	            {
        	                label: '동영상',
        	                data: videoCosts,
        	                backgroundColor: 'rgba(255, 193, 7, 1)',  // 노랑
        	                borderColor: 'rgba(255, 193, 7, 0.5)',
        	                borderWidth: 1
        	            },
        	            {
        	                label: '텍스트',
        	                data: textCosts,
        	                backgroundColor: 'rgba(26, 165, 42, 1)',  // 초록
        	                borderColor: 'rgba(26, 165, 42, 0.5)',
        	                borderWidth: 1
        	            },
        	            {
        	                label: '폰트',
        	                data: fontCosts,
        	                backgroundColor: 'rgba(205, 232, 248, 1)',  // 파랑
        	                borderColor: 'rgba(205, 232, 248, 0.5)',
        	                borderWidth: 1
        	            }
        	        ]
        	    },
        	    options: {
        	        scales: {
        	            y: {
        	                beginAtZero: true
        	            }
        	        }
        	    }
        	});
            }
        },
        error: function (error) {
            // 에러 처리
            console.error('Error fetching site data:', error);
        }
    });
	
}


function draw_costTable(name,gubun){
	if(gubun ==="month"){
		month = 0;
	}else{
		month = selectMonth_st
	}
	table_resource = new Tabulator("#"+name, {
		selectable:false,
	    pagination:false, //enable pagination
	    paginationMode:"remote", //enable remote pagination
	    sortMode: "remote",
	    ajaxURL:"/selectCost", //set url for ajax request
	    ajaxParams:{
	    	rgstr_yyyy: selectYear_st,
	    	rgstr_mm:month,
	    },
	    placeholder:"해당 조건에 맞는 데이터가 존재하지 않습니다.",
	    autoResize:true,
	    tooltips:false,
	    columnDefaults:{
	        headerSort:false,
	       
	    },
	    langs:{
	        "default":{
	            "pagination":{
	                "counter":{
	                    "showing": "Showing",
	                    "of": "of",
	                    "rows": "rows",
	                    "pages": "pages",
	                    "Prev": "이전"
	                }
	            },
	        }
	    },	    
	    ajaxContentType : "application/json; charset=utf-8",
	    ajaxContentType:"json",
	    ajaxResponse:function(url,prarm,response){
	    	response =response.data;
	    	if(response.length ===0){
	    		return response;
	    	}
	    	for (var i = 0; i < response.length; i++) {
	    	
	    	let groupedDataArray;
	    	
	    	if(gubun ==="month"){
	    		
	    		let groupedData = response.reduce((acc, item) => {
					  const key = item.mm;

					  if (!acc[key]) {
					    acc[key] = { date: key, image_cost: 0 ,video_cost:0 ,text_cost:0,font_cost:0};
					  }
					  
					 
					  
					  const _cost = item.resource_new_size_type2 * item.resource_call_cnt * getCloud_payment(item.cloud_no)/1024/1024/1024;
					  
					 
					  
					  if(item.resource_type ===1){
						  acc[key].image_cost += _cost ; 
					  }else if(item.resource_type ===2){
						  acc[key].video_cost += _cost ; 
					  }else if(item.resource_type ===3){
						  acc[key].text_cost += _cost ; 
					  }else if(item.resource_type ===4){
						  acc[key].font_cost += _cost ; 
					  }else{
						  console.log("지정되지 않은 타입입니다");
					  }
					  

					  return acc;
					}, {});
		    	
		    	for (var i = 0; i < groupedData.length; i++) {
		    		groupedData[i].font_cost = calcCostNum(groupedData[i].font_cost);
		    		groupedData[i].image_cost = calcCostNum(groupedData[i].image_cost);
		    		groupedData[i].text_cost = calcCostNum(groupedData[i].text_cost);
		    		groupedData[i].video_cost = calcCostNum(groupedData[i].video_cost);
				}
		    	 groupedDataArray = Object.values(groupedData);
		    	
	    	}else{  
	    		
	    		let groupedData = response.reduce((acc, item) => {
	    		    const key = `${getWeekOfMonth(item.yyyy, item.mm, item.dd)}`;

	    		    if (!acc[key]) {
	    		        acc[key] = { date: key, image_cost: 0, video_cost: 0, text_cost: 0, font_cost: 0 };
	    		    }

	    		    const _cost = item.resource_new_size_type2 * item.resource_call_cnt * getCloud_payment(item.cloud_no) / 1024 / 1024 / 1024;
	    		    
	    		    if (item.resource_type === 1) {
	    		        acc[key].image_cost += _cost;
	    		    } else if (item.resource_type === 2) {
	    		        acc[key].video_cost += _cost;
	    		    } else if (item.resource_type === 3) {
	    		        acc[key].text_cost += _cost;
	    		    } else if (item.resource_type === 4) {
	    		        acc[key].font_cost += _cost;
	    		    } else {
	    		        console.log("지정되지 않은 타입입니다");
	    		    }

	    		    return acc;
	    		}, {});
	    		
	    		groupedDataArray = Object.values(groupedData);
	    		
	    	}
	    	
	    	return groupedDataArray; 
	    	}
	    },
	    layout: "fitColumns", 
	    columns: [
	    	{
	    		title: "",
	    		field: "date",
	    		formatter: function(cell, formatterParams, onRendered) {
	    			if(gubun==="month"){
	    				return cell.getValue()+" 월";
	    			}else{
	    				return cell.getValue()+" 주차";
	    			}
	    		}		 
	    		
	    	},
	    	{
	    		title: "이미지",
	    		field: "image_cost",
	    		formatter: function(cell, formatterParams, onRendered) {
	    			
	    			if(cell.getValue!= 0){
	    				return comma(cell.getValue().toFixed(2))+" 원";
	    			}
	    			return cell.getValue();
	    		}		 
	    		
	    	},
	    	{
	    		title: "동영상",
	    		field: "video_cost",
	    		formatter: function(cell, formatterParams, onRendered) {
	    			
	    			if(cell.getValue!= 0){
	    				return comma(cell.getValue().toFixed(2))+" 원";
	    			}
	    			return cell.getValue();
	    		}		 
	    		
	    	},
	    	{
	    		title: "텍스트",
	    		field: "text_cost",
	    		formatter: function(cell, formatterParams, onRendered) {
	    			if(cell.getValue!= 0){
	    				return comma(cell.getValue().toFixed(2))+" 원";
	    			}
	    			return cell.getValue();
	    		}		
	    		
	    	},
	    	{
	    		title: "폰트",
	    		field: "font_cost",
	    		formatter: function(cell, formatterParams, onRendered) {
	    			if(cell.getValue!= 0){
	    				return comma(cell.getValue().toFixed(2))+" 원";
	    			}
	    			return cell.getValue();
	    		}		
	    		
	    	},
	    ],
	    rowFormatter: function(row) {
	        
		        row.getElement().style.height = "40px"; // 원하는 높이(px)로 설정
	    	
	    }
	});	

	
}


function getWeekOfMonth(year, month, day) {
    const date = new Date(year, month - 1, day); // month - 1 because month is 0-indexed in JavaScript
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek = firstDay.getDay();
    const adjustedDate = day + dayOfWeek - 1;
    const weekNumber = Math.ceil(adjustedDate / 7);
    return weekNumber;
}
