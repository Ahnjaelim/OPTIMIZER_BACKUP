let start_Date= 0;
let end_Date= 0;
function main(){
	//setSiteBox();
	setDatePicker();
	getDate();
	
	getChartCostByResource();
	getChartCostByCloud();
	
	web_content_table();
	//perMonthTb();
}





function reloadChart(){
	getDate();
	if(start_Date>end_Date){
		modalAlert('알림',"[시작일]이 [종료일]보다 큽니다. 기간을 다시 확인해주세요 ");
		return
	}
	
	getChartCostByResource();
	getChartCostByCloud();
	web_content_table();
}
function getDate(){
	
	start_Date = parseInt(moment($('input[name="startDates"]').val(), "YYYY년 MM월 DD일").format("YYYYMMDD"));
	end_Date = parseInt(moment($('input[name="endDates"]').val(), "YYYY년 MM월 DD일").format("YYYYMMDD"));
}

function getChartCostByResource(){
	
	let data =[]
	$.ajax({
		type: 'POST',
		url: '/getChartCostByResource',
		data:{
			startDate:start_Date,
			endDate:end_Date,
		},
		async: false,
		success: function(res) {
			
			res = res.getChartCostByResource;
			
			for (var i = 0; i < res.length; i++) {
				res[i].resource_type = checkTypeKor(res[i].resource_type);
			}	
			// resource_type을 기준으로 그룹화
			const groupedData = res.reduce((acc, item) => {
			  const key = item.resource_type;

			  if (!acc[key]) {
			    acc[key] = { category: key, value: 0 };
			  }
			  
			  
			  if(item.resource_new_size_type2 ===0){
				  acc[key].value += item.resource_org_size * item.resource_call_cnt * getCloud_payment(item.cloud_no);  
			  }else{
				  acc[key].value += item.resource_new_size_type2 * item.resource_call_cnt* getCloud_payment(item.cloud_no) ;
			  }
			  

			  return acc;
			}, {});

			// groupedData를 배열로 변환
			data = Object.values(groupedData);

			
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	
	drawChart("resource_chart",data);
}

// 페이지별 비용 차트
function getChartCostByCloud(){
	
	let data =[]
	$.ajax({
		type: 'POST',
		url: '/getChartCostByCloud',
		data:{
			startDate:start_Date,
			endDate:end_Date,		
		},
		async: false,
		success: function(res) {
			console.log(res);
			
			res = res.getChartCostByCloud;
			
			for (var i = 0; i < res.length; i++) {
				res[i].page_name = getPage_name(res[i].page_no);
				if(res[i].page_name ===null && res[i].resource_type === 4 ){
					res[i].page_name = "FONT";
				}else if(res[i].page_name ===null){
					res[i].page_name = "unknown Page";
				}
			}	
			// resource_type을 기준으로 그룹화
			const groupedData = res.reduce((acc, item) => {
			  const key = item.page_name;

			  if (!acc[key]) {
			    acc[key] = { category: key, value: 0 };
			  }
			  
		
			  if(item.resource_new_size_type2 ===0){
				  acc[key].value += item.resource_org_size * item.resource_call_cnt * getCloud_payment(item.cloud_no);  
			  }else{
				  acc[key].value += item.resource_new_size_type2 * item.resource_call_cnt * getCloud_payment(item.cloud_no);
			  }
			  

			  return acc;
			}, {});

			// groupedData를 배열로 변환
			data = Object.values(groupedData);

			
			
			
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	
	drawChart("site_chart",data);
}

function drawChart(chartId,data){
	
	am5.array.each(am5.registry.rootElements, function(root) {
		if (root) {
			if (root.dom.id == chartId) {
				root.dispose();
			}
		}
	});
	// Create root element
	// https://www.amcharts.com/docs/v5/getting-started/#Root_element
	var root = am5.Root.new(`${chartId}`);

	// delete logo
	root._logo.dispose();
	
	// Set themes
	// https://www.amcharts.com/docs/v5/concepts/themes/
	root.setThemes([
	  am5themes_Animated.new(root)
	]);

	
	// Create chart
	// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
	var chart = root.container.children.push(am5percent.PieChart.new(root, {
	  layout: root.verticalLayout,
	  innerRadius: am5.percent(1)
	}));


	// Create series
	// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
	var series = chart.series.push(am5percent.PieSeries.new(root, {
	  valueField: "value",
	  categoryField: "category",
	  alignLabels: false,
	  click: false
	}));
	
	series.labels.template.setAll({
	  textType: "circular",
	  centerX: 0,
	  centerY: 0,
	  inside:true,
	});
	series.labels.template.set("forceHidden", true); 
	
	
	

	// Set data
	// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data

// data = [{
// category: "Lithuania",
// value: 501.9
// }, {
// category: "Czechia",
// value: 301.9
// }, {
// category: "Ireland",
// value: 201.1
// }, {
// category: "Germany",
// value: 165.8
// }, {
// category: "Australia",
// value: 139.9
// }, {
// category: "Austria",
// value: 128.3
// }, {
// category: "UK",
// value: 99
// }];

	
	
// series.slices.template.setAll({
// fillOpacity: 0.5,
// stroke: am5.color(0xffffff),
// strokeWidth: 2
// });
	
	series.slices.template.setAll({
		  templateField: "sliceSettings",
		  toggleKey : "none"  
		});
	series.data.setAll(data);
	
	// Create modal for a "no data" note
	var modal = am5.Modal.new(root, {
	  content: "데이터가 없습니다"
	});
	series.events.on("datavalidated", function(ev) {
	  var series = ev.target;
	  if (ev.target.data.length < 1 || (data.sum!==undefined && data.sum!==null && data.sum===0)) {
	    // Generate placeholder data
	    var categoryField = series.get("categoryField");
	    var valueField = series.get("valueField");
	    var placeholder = [];
	    for (i = 0; i < 3; i++) {
	      var item = {};
	      item[categoryField] = "";
	      item[valueField] = 1;
	      placeholder.push(item)
	    }
	    series.data.setAll(placeholder);
	    
	    // Disable ticks/labels
	    series.labels.template.set("forceHidden", true);
	    series.ticks.template.set("forceHidden", true);
	    
	    // Show modal
	    modal.open();
	  }
	  else {
		  
	    // Re-enable ticks/labels
	    series.labels.template.set("forceHidden", true);
	    series.ticks.template.set("forceHidden", true);
	    
	    // Hide modal
	    modal.close();
	  }
	});
	
	
	
	
	
// Create legend

 var legend = chart.children.push(am5.Legend.new(root, {
 centerX: am5.percent(50),
 x: am5.percent(50),
 marginTop: 15,
 marginBottom: 15,
 }));

 legend.data.setAll(series.dataItems);

	
	// Play initial series animation
	// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
	series.appear(1000, 100);
}









function draw_optimize_chart(chartName,data){
	
	// Create root element
	// https://www.amcharts.com/docs/v5/getting-started/#Root_element
	var root = am5.Root.new(`${chartName}`);

	// delete logo
	root._logo.dispose();
	
	// Set themes
	// https://www.amcharts.com/docs/v5/concepts/themes/
	root.setThemes([
	  am5themes_Animated.new(root)
	]);

	
	// Create chart
	// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
	var chart = root.container.children.push(am5percent.PieChart.new(root, {
	  layout: root.verticalLayout,
	  innerRadius: am5.percent(70)
	}));


	// Create series
	// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
	var series = chart.series.push(am5percent.PieSeries.new(root, {
	  valueField: "value",
	  categoryField: "category",
	  alignLabels: false,
	  click: false
	}));

	series.labels.template.setAll({
	  textType: "circular",
	  centerX: 0,
	  centerY: 0,
	  inside:true,
	});
	series.labels.template.set("forceHidden", true); 
	
	let label = series.children.push(am5.Label.new(root, {
		  text: "47%",
		  fontSize: 40,
		  centerX: am5.percent(50),
		  centerY: am5.percent(50),
		  populateText: true,
		  oversizedBehavior: "fit",
		  fill: am5.color(0x4e73df),  
		}));
	
		series.onPrivate("width", function(width) {
		  label.set("maxWidth", width * 0.7);
		});
	

	// Set data
	// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
	data= [{ value: 10, category: "최적화 미적용",sliceSettings: {
	    fill: am5.color(0xff1100),
	    stroke: am5.color(0xd6e681)
	  }}, { value: 9, category: "최적화",sliceSettings: {
		    fill: am5.color(0x4e73df),
		    stroke: am5.color(0xd6e681)
		  } }];
	
	
// series.slices.template.setAll({
// fillOpacity: 0.5,
// stroke: am5.color(0xffffff),
// strokeWidth: 2
// });
	
	series.slices.template.setAll({
		  templateField: "sliceSettings",
		  toggleKey : "none"  
		});
	series.data.setAll(data);
	
	// Create modal for a "no data" note
	var modal = am5.Modal.new(root, {
	  content: "데이터가 없습니다"
	});
	series.events.on("datavalidated", function(ev) {
	  var series = ev.target;
	  if (ev.target.data.length < 1 || (data.sum!==undefined && data.sum!==null && data.sum===0)) {
	    // Generate placeholder data
	    var categoryField = series.get("categoryField");
	    var valueField = series.get("valueField");
	    var placeholder = [];
	    for (i = 0; i < 3; i++) {
	      var item = {};
	      item[categoryField] = "";
	      item[valueField] = 1;
	      placeholder.push(item)
	    }
	    series.data.setAll(placeholder);
	    
	    // Disable ticks/labels
	    series.labels.template.set("forceHidden", true);
	    series.ticks.template.set("forceHidden", true);
	    
	    // Show modal
	    modal.open();
	  }
	  else {
		  
	    // Re-enable ticks/labels
	    series.labels.template.set("forceHidden", true);
	    series.ticks.template.set("forceHidden", true);
	    
	    // Hide modal
	    modal.close();
	  }
	});
	
	
	
	
	
// // Create legend
// //
// https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
// var legend = chart.children.push(am5.Legend.new(root, {
// centerX: am5.percent(50),
// x: am5.percent(50),
// marginTop: 15,
// marginBottom: 15,
// }));

// legend.data.setAll(series.dataItems);

	
	// Play initial series animation
	// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
	series.appear(1000, 100);
}




function setDate_box(){
	let option = $('#selectBox option:selected').val();
	let date_box =$('#date_box');
	date_box.text(`${option}`);
	
	
	var currentDate = new Date();
	var currentYear = currentDate.getFullYear();
	var currentMonth = currentDate.getMonth() + 1;

	if(option == 'month'){
		date_box.text(`${currentYear}년 ${currentMonth}월 기준`);
	}else if(option== 'year'){
		date_box.text(`${currentYear}년 기준`);
	}
	
}



function web_content_table(){
	let page_no = $('#siteBox').val() || 0;
	let resource_type = $('#contentBox').val() || 0;
	let resource_status = $('#statusBox').val() || 0;
	console.log(resource_status);
	var table = new Tabulator("#web_content_table", {
		maxHeight:"600px",
	    pagination:false, // enable pagination
		 // paginationMode:"remote", //enable remote pagination
		  placeholder:"데이터가 없습니다",
		  tooltips:false,
		  locale:true,
		  selectable:false, // make rows selectable
		  autoResize:true,
		  layout: "fitColumns",
		  scrollToRowIfVisible: false,
		  groupStartOpen:false, // 시작메뉴 열닫기
		  groupClosedShowCalcs:true,
	    groupBy:"resource_type",
	    groupToggleElement:"header",
	    groupHeader: function (value, count, data, group) {
	    	let i = 0;
	    	// i가 9를 초과하면 코드 실행 중지
            
	    	// 그룹 헤더를 생성합니다.
	        var header = "<div style='display: flex; align-items: center;'>";
	        
	        // 현재 헤더의 모든 컬럼의 HTML을 가져와서 사용 (tabulator-col-sorter 제외)
	        $("#web_content_table .tabulator-col").each(function () {
	            if (!$(this).hasClass('tabulator-col-sorter')) {
	            	if (i > 8) {
	                	console.log("8 초과")
	                    return false;
	                }
	            	
	                // tabulator-col-sorter 클래스를 가진 엘리먼트를 제거한 HTML을 가져옵니다.
	                var columnHtml = $(this).clone().find('.tabulator-col-sorter').remove().end().prop('outerHTML');
	                
	                // tabulator-col-title 엘리먼트 안의 내용을 지우고 내가 원하는 내용을 추가
	                if(i>=3){
	                	
		                columnHtml = columnHtml.replace(/<div class="tabulator-col-title">.*?<\/div>/, `<div class="tabulator-col-title subtitleRight">${renameTitle(value, count, data, group,i)}</div>`);
	                }else{
	                	
		                columnHtml = columnHtml.replace(/<div class="tabulator-col-title">.*?<\/div>/, `<div class="tabulator-col-title subtitleCenter">${renameTitle(value, count, data, group,i)}</div>`);
	                }
	                header += columnHtml;
	                
	                i= i+1;
	                
	             
	            }
	        });
	        console.log("header");
	        console.log(i);
	        // 나머지 코드 계속...

	        header += "</div>";

	        return header;
           
        },
	    layout: "fitColumns",
	    ajaxURL:"/selectAllResource", // set url for ajax request
	    ajaxParams:{
	    	startDate:start_Date,
			endDate:end_Date,
			resource_type : resource_type,
			page_no : page_no,
			//resource_status:resource_status,
			resource_status:1,
	    },
	    ajaxContentType:"json",	    
	    ajaxResponse:function(url,prarm,response){
 	    	
	    	response = response.selectAllResource;
	    	
	    	
	    	
	    	for (var i = 0; i < response.length; i++) {
	    		if(response[i].resource_status === 1){
		    		response[i].bfOptCost = calcCostNew(response[i].resource_org_size * response[i].resource_call_cnt * getCloud_payment(response[i].cloud_no));
		    		response[i].aftOptCost = calcCostNew(response[i].resource_new_size_type2 * response[i].resource_call_cnt* getCloud_payment(response[i].cloud_no));
		    		response[i].saveCost = response[i].aftOptCost - response[i].bfOptCost;
		    	}else{
		    		
		    		response[i].bfOptCost = calcCostNew(response[i].resource_org_size * response[i].resource_call_cnt* getCloud_payment(response[i].cloud_no));
		    	}
			}
	    	
	    	
	    	return response; 
	    },	
	    columns:[
	    	{title:"최적화 상태", field:"resource_status", width:150, hozAlign:"center",headerSort:false, formatter:"tickCross",resizable:false},
	    	{title:"타입", field:"resource_type",width:55,hozAlign:"center",headerSort:false,resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = `<span style="font-size:1.2em;">`;
	    			
	    			switch(cell.getValue()){
	    				case 0 : 
	    					result += `📁`;
	    					break;
	    				case 1 : 
		    				result += `🖼️`;
		    				break;
		    			case 2 : 
		    				result += `<ion-icon name="videocam-outline"></ion-icon>`;
		    				break;
		    			case 3 : 
		    				result += `<ion-icon name="document-text-outline"></ion-icon>`;
		    				break;
		    			case 4 : 
		    				result += `<ion-icon name="text-outline"></ion-icon>`;
		    				break;
		    			
	    			}
	    			result += "</span>";
	    			return result;
	    		}
	    	
	    	},
	    	{title:"웹컨텐츠 이름", field:"resource_name",widthgrow :true ,hozAlign:"center",resizable:false},
	    	
	        {title:"원본 용량", field:"resource_org_size",resizable:false ,hozAlign:"right",
	        	 formatter: function(cell, formatterParams, onRendered) {
	        		 return fileSizeUnitFormatter(cell.getValue());
	        	 }},
	        {title:"최적화 용량", field:"resource_new_size_type2", hozAlign:"right",resizable:false,
	        	 formatter: function(cell, formatterParams, onRendered) {
	        		 var data = cell.getData("data");
	        		 if(data.resource_status ===1){
	        			 return fileSizeUnitFormatter(cell.getValue());
	        		 }else{
	        			 return `<p style="color:gray; margin-bottom:0px; padding:0px;">
	        			</p>`;
	        		 }
	        		 
	        	 }
	        },
	        {title:"호출 횟수", field:"resource_call_cnt" ,hozAlign:"right",resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	        		 return comma(cell.getValue())+' 회';
	        	 }},
	        {title:"최적화 전 비용", field:"bfOptCost", hozAlign:"right",resizable:false,
	        	 formatter: function(cell, formatterParams, onRendered) {
	        		 return comma(cell.getValue())+'원';
	        	 }},
	        	 {title:"최적화 후 비용", field:"aftOptCost" ,hozAlign:"right",resizable:false,
		        	 formatter: function(cell, formatterParams, onRendered) {
		        		 var data = cell.getData("data");
		        		 
		        		 if(data.resource_status ===1){
		        			 return comma(cell.getValue())+'원';
		        		 }else{
		        			 return `<p style="color:gray; margin-bottom:0px; padding:0px;">
		        			`;
		        		 }
	        	     
	        	 }},
	        {title:"절감 비용", field:"saveCost",hozAlign:"right",resizable:false,
	        	 formatter: function(row, formatterParams, onRendered) {
	        		 	var rowData = row.getData("data");
	        		 	var bfOptCost = parseFloat(rowData["bfOptCost"]);
	        	        var aftOptCost = parseFloat(rowData["aftOptCost"]);
	        	        var saveCost="";
	        	        
	        	        if(parseInt(rowData["resource_status"])=== 1){
	        	        	if(aftOptCost ===0 ){ return saveCost = `${comma((aftOptCost-bfOptCost).toFixed(2))} 원(0%)`}
	        	        	 saveCost = `${comma((aftOptCost-bfOptCost).toFixed(2))} 원(${Math.round((bfOptCost-aftOptCost)/bfOptCost * 100 )}%)`;
		        	    }
	        	        
	        	        return saveCost;
	        	    }	
	        },
	    ],
	});
	table.on("renderComplete", function() {
	    
		deleteArrow();
	});
	table.on("tableBuilt", function(){
		$(`#example-table .tabulator-footer`).removeClass('tabulator-footer');
		
	});
	table.on("headerClick", function(e, row){
		deleteArrow();
	});
	table.on("groupClick", function(e, group) {
		
	});
	table.on("groupVisibilityChanged", function(e, group,row){
		deleteArrow();		
		 // body의 높이를 가져와서 스크롤을 최하단으로 이동
        document.body.scrollTop = document.body.scrollHeight;
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
        
	});
	table.on("rowResized", function(row){
	   console.log("reszied")
	});
	
}







function setDatePicker(){
	const dtNow = new Date();
	
	$('input[name="startDates"]').daterangepicker({
	    singleDatePicker: true,
	    showDropdowns: true,
	    minYear: 2020,
	    maxDate: dtNow,
	    autoApply: true,
	    locale: {
            format: "YYYY년 MM월 DD일",
            separator: " - ",
            applyLabel: "적용",
            cancelLabel: "취소",
            fromLabel: "부터",
            toLabel: "까지",
            weekLabel: "W",
            daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
            monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            firstDay: 0
        },
	  }, function(start, end, label) {
		  // start_Date = start.format('YYYY-MM-DD');
	  });
	
	$('input[name="endDates"]').daterangepicker({
	    singleDatePicker: true,
	    showDropdowns: true,
	    minYear: 2020,
	    maxDate: dtNow,
	    autoApply: true,
	    locale: {
            format: "YYYY년 MM월 DD일",
            separator: " - ",
            applyLabel: "적용",
            cancelLabel: "취소",
            fromLabel: "부터",
            toLabel: "까지",
            weekLabel: "W",
            daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
            monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            firstDay: 0
        },
	  }, function(start, end, label) {
		 // end_Date = start.format('YYYY-MM-DD');
	  });
	
	
}

function perMonthTb(){
	let page_no = $('#siteBox').val() || 0;
	let resource_type = $('#contentBox').val() || 0;
	let resource_status = $('#statusBox').val() || 0;
	console.log(resource_status);
	var table = new Tabulator("#perMonthTb", {
		maxHeight:"600px",
	    pagination:false, // enable pagination
		 // paginationMode:"remote", //enable remote pagination
		  placeholder:"데이터가 없습니다",
		  tooltips:false,
		  locale:true,
		  selectable:false, // make rows selectable
		  autoResize:true,
		  scrollToRowIfVisible: false,
		  groupStartOpen:false, // 시작메뉴 열닫기
		  groupClosedShowCalcs:true,
	    groupBy:"month",
	    groupToggleElement:"header",
	    groupHeader: function (value, count, data, group) {
	    	let i = 0;
	    	// 그룹 헤더를 생성합니다.
	        var header = "<div style='display: flex; align-items: center;'>";
	        
	        // 현재 헤더의 모든 컬럼의 HTML을 가져와서 사용 (tabulator-col-sorter 제외)
	        $("#perMonthTb .tabulator-col").each(function () {
//	            if (!$(this).hasClass('tabulator-col-sorter')) {
//	                // tabulator-col-sorter 클래스를 가진 엘리먼트를 제거한 HTML을 가져옵니다.
//	                var columnHtml = $(this).clone().find('.tabulator-col-sorter').remove().end().prop('outerHTML');
//	                
//	                // tabulator-col-title 엘리먼트 안의 내용을 지우고 내가 원하는 내용을 추가
//	                if(i>=3){
//	                	
//		                columnHtml = columnHtml.replace(/<div class="tabulator-col-title">.*?<\/div>/, `<div class="tabulator-col-title subtitleRight">${renameTitle(value, count, data, group,i)}</div>`);
//	                }else{
//	                	
//		                columnHtml = columnHtml.replace(/<div class="tabulator-col-title">.*?<\/div>/, `<div class="tabulator-col-title subtitleCenter">${renameTitle(value, count, data, group,i)}</div>`);
//	                }
//	                header += columnHtml;
//	                
//	                i= i+1;
//	                
//	            }
	        });

	        // 나머지 코드 계속...

	        header += "</div>";

	        return header;
           
        },
	    layout: "fitColumns",
	    ajaxURL:"/selectPerMonthChart", // set url for ajax request
	    ajaxParams:{
	    	startDate:0,
			endDate:0,
			resource_type : 0,
			page_no : 0,
			resource_status:0,
	    },
	    ajaxContentType:"json",	    
	    ajaxResponse:function(url,prarm,response){
 	    	
	    	response = response.monthList;
	    	console.log(response);
	    	
	    	const groupedData = response.reduce((acc, item) => {
				 // const key = item.rgstr_mm;
				  const key = `${item.rgstr_mm}_${item.page_no}`;	
				  if (!acc[key]) {
				    acc[key] = {  month: item.rgstr_mm, page_no: item.page_no,org_byte:0,opt_byte:0, org: 0 , opt : 0 ,cnt:0};
				  }
				  
				  acc[key].org_byte += item.resource_org_size * item.resource_call_cnt  
				  acc[key].org += item.resource_org_size * item.resource_call_cnt * getCloud_payment(item.cloud_no); 
				  if(item.resource_status ===1 && item.resource_new_size_type2 !== item.resource_org_size){
					  acc[key].opt += item.resource_new_size_type2 * item.resource_call_cnt * getCloud_payment(item.cloud_no);
					  acc[key].opt_byte += item.resource_new_size_type2 * item.resource_call_cnt;
				  }
				  acc[key].cnt += item.resource_call_cnt;

				  return acc;
				}, {});
	    	
	    	// groupedData를 배열로 변환
			data = Object.values(groupedData);
			for (var i = 0; i < data.length; i++) {
				data[i].org = parseFloat(calcCostNew(data[i].org));
				data[i].opt = parseFloat(calcCostNew(data[i].opt));
				
			}
			for (var i = 0; i < data.length; i++) {
				data[i].opt = data[i].org - data[i].opt;	
			}
	    	
	    	console.log(data);
	    	return data; 
	    },	
	    columns:[
	    	{title:"페이지 명", field:"page_no" ,hozAlign:"center"},
	    	{title:"원본 총 용량", field:"org_byte" ,hozAlign:"center"},
	    	{title:"최적화후 총 용량", field:"opt_byte" ,hozAlign:"center"},
	    	{title:"기존 요금", field:"org" ,hozAlign:"center"},
	    	{title:"최적화 후 요금", field:"opt" ,hozAlign:"center"},
	    	{title:"컨텐츠 호출 횟수", field:"cnt" ,hozAlign:"center"},
	    ],
	});
	table.on("renderComplete", function() {
	    
		deleteArrow();
	});
	table.on("tableBuilt", function(){
		$(`#example-table .tabulator-footer`).removeClass('tabulator-footer');
		
	});
	table.on("headerClick", function(e, row){
		deleteArrow();
	});
	table.on("groupClick", function(e, group) {
		
	});
	table.on("groupVisibilityChanged", function(e, group,row){
		deleteArrow();		
		 // body의 높이를 가져와서 스크롤을 최하단으로 이동
        document.body.scrollTop = document.body.scrollHeight;
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
        
	});
	table.on("rowResized", function(row){
	   console.log("reszied")
	});
	
}