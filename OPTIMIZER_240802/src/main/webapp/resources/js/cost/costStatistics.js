 var today = new Date();

	    // 년, 월, 일 정보 가져오기
	    var year = today.getFullYear();
	    var month = today.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더함
	    var day = today.getDate();


function main(){
	
	setCost();
	let data =null;
	setSiteBox();
	getPerMonth_chart_data();
	getPerDay_chart_data();
	getChartCostByResource();
	getChartCostByCloud();
	tooltip();
}



function tooltip(){
		
	  
	// jQuery를 사용하여 이벤트 리스너 추가
	  $('.helpIcon').on('mouseover', showTooltip);
	  $('.helpIcon').on('mouseout', hideTooltip);

	  // 툴팁을 표시하는 함수
	  function showTooltip() {
	    // 아이콘 위치 얻기
	    var iconRect = $(this).get(0).getBoundingClientRect();
	    var target = $(this).closest('.row').next('.row').attr('id')+"Tip";
		   
	   
	    $('#'+target+'').css({
	      left: iconRect.left + iconRect.width / 2,
	      top: iconRect.bottom
	    });
	    
	    // 툴팁 표시
	    $('#'+target+'').show();
	  }

	  // 툴팁을 숨기는 함수
	  function hideTooltip() {
		  var target = $(this).closest('.row').next('.row').attr('id')+"Tip";
		   
	    // 툴팁 숨기기
	    $('#'+target+'').hide();
	  }
}



function getPerMonth_chart_data(){
	let data =[];
	$.ajax({
		type: 'POST',
		url: '/selectPerMonthChart',
		data:{
			rgstr_yyyy:year,
			//rgstr_mm:month,
		},
		async: false,
		success: function(res) {
			
			res = res.monthList;
			console.log(res);
			
			for (var i = 0; i < res.length; i++) {
				res[i].rgstr_mm = res[i].rgstr_mm+'월';
			}
			
			
			const groupedData = res.reduce((acc, item) => {
			  const key = item.rgstr_mm;

			  if (!acc[key]) {
			    acc[key] = { month: key, org: 0 , opt : 0 };
			  }
			  
			  acc[key].org += item.resource_org_size * item.resource_call_cnt * getCloud_payment(item.cloud_no); 
			  if(item.resource_status ===1 && item.resource_new_size_type2 !== item.resource_org_size){
				  acc[key].opt += item.resource_new_size_type2 * item.resource_call_cnt * getCloud_payment(item.cloud_no);
			  }
			  

			  return acc;
			}, {});

			// groupedData를 배열로 변환
			data = Object.values(groupedData);
			for (var i = 0; i < data.length; i++) {
				data[i].org = parseFloat(calcCostNew(data[i].org));	
			}
			for (var i = 0; i < data.length; i++) {
				data[i].opt = parseFloat(calcCostNew(data[i].opt));	
			}
			for (var i = 0; i < data.length; i++) {
				data[i].opt = data[i].org - data[i].opt;	
			}
			
//			data = [{"month" : "1월", opt:10,org:10 }];

			
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	
	drawBarChart("monthChart",data,"month");
}

function getPerDay_chart_data(){
	
	console.log(year,month)
	let data =[]
	$.ajax({
		type: 'POST',
		url: '/selectPerDayChart',
		data:{
			rgstr_yyyy:year,
			rgstr_mm:month,
		},
		async: false,
		success: function(res) {

			
			for (var i = 0; i < res.weeklyList.length; i++) {
				res.weeklyList[i].weekday = weekdayKor(res.weeklyList[i].weekday)+"요일"; 
			}
			
			res = res.weeklyList;
			// resource_type을 기준으로 그룹화
			const groupedData = res.reduce((acc, item) => {
			  const key = item.weekday;


			  if (!acc[key]) {
			    acc[key] = { weekday: key, org: 0 , opt : 0};
			  }
			  
			  acc[key].org += item.resource_org_size * item.resource_call_cnt * getCloud_payment(item.cloud_no); 
			  if(item.resource_status ===1 && item.resource_new_size_type2 !== item.resource_org_size){
				  acc[key].opt += item.resource_new_size_type2 * item.resource_call_cnt * getCloud_payment(item.cloud_no);
			  }
			  

			  return acc;
			}, {});

			// groupedData를 배열로 변환
			data = Object.values(groupedData);
			for (var i = 0; i < data.length; i++) {
				data[i].org = parseFloat(calcCostNew(data[i].org));	
			}
			for (var i = 0; i < data.length; i++) {
				data[i].opt = parseFloat(calcCostNew(data[i].opt));	
			}
			for (var i = 0; i < data.length; i++) {
				data[i].opt = data[i].org - data[i].opt;	
			}
			
			
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	

	
	
	drawBarChart("dayChart",data,"weekday");
	
}

function weekdayKor(number){
	switch (number) {
	case 1:
		return "월";
		break;
    case 2:
    	return "화";
    	break;
    case 3:
    	return "수";
    	break;
    case 4:
    	return "목";
    	break;
    case 5:
    	return "금";
    	break;
    case 6:
    	return "토";
    	break;
    case 7:
    	return "일";
    	break;
    default:
		break;
	}
}

function setCost(){
	
	
	
	$.ajax({
		type: 'POST',
		url: '/selectCost',
		data:{
			rgstr_yyyy:year,
			rgstr_mm:month,
			rgstr_dd:day,
			
		},
		async: false,
		success: function(res) {
			
		
			let yearOrgCost= 0 ;
			let yearOrg= 0 ;
			let monthOrgCost= 0 ;
			let monthOrg= 0 ;
			let dayOrgCost= 0 ;
			let dayOrg= 0 ;
			
			let yearOptCost= 0 ;
			let yearOpt= 0 ;
			let monthOptCost= 0 ;
			let monthOpt= 0 ;
			let dayOptCost= 0 ;
			let dayOpt= 0 ;
			
			for (var i = 0; i < res.yearList.length; i++) {
				if(res.yearList[i].resource_status === 1 && res.yearList[i].resource_new_size_type2 !== res.yearList[i].resource_org_size){
					yearOptCost += res.yearList[i].resource_new_size_type2 * res.yearList[i].resource_call_cnt * getCloud_payment(res.yearList[i].cloud_no);
					yearOpt += res.yearList[i].resource_new_size_type2 * res.yearList[i].resource_call_cnt 
				}
				yearOrgCost += res.yearList[i].resource_org_size * res.yearList[i].resource_call_cnt * getCloud_payment(res.yearList[i].cloud_no);
				yearOrg += res.yearList[i].resource_org_size * res.yearList[i].resource_call_cnt
			}
			
			
			for (var i = 0; i < res.monthList.length; i++) {
				if(res.monthList[i].resource_status === 1 && res.monthList[i].resource_new_size_type2 !== res.monthList[i].resource_org_size){
					monthOptCost += res.monthList[i].resource_new_size_type2 * res.monthList[i].resource_call_cnt  * getCloud_payment(res.monthList[i].cloud_no);
					monthOpt += res.monthList[i].resource_new_size_type2 * res.monthList[i].resource_call_cnt ;
				}
				monthOrgCost += res.monthList[i].resource_org_size * res.monthList[i].resource_call_cnt  * getCloud_payment(res.monthList[i].cloud_no);
				monthOrg += res.monthList[i].resource_org_size * res.monthList[i].resource_call_cnt  ;
			}
			
			for (var i = 0; i < res.dayList.length; i++) {
				if(res.dayList[i].resource_status === 1 && res.dayList[i].resource_new_size_type2 !== res.dayList[i].resource_org_size){
					dayOptCost += res.dayList[i].resource_new_size_type2 * res.dayList[i].resource_call_cnt  * getCloud_payment(res.dayList[i].cloud_no);
					dayOpt += res.dayList[i].resource_new_size_type2 * res.dayList[i].resource_call_cnt;  
				}
				dayOrgCost += res.dayList[i].resource_org_size * res.dayList[i].resource_call_cnt  * getCloud_payment(res.dayList[i].cloud_no);
				dayOrg += res.dayList[i].resource_org_size * res.dayList[i].resource_call_cnt;
				
			}
			
			
			//안주임님 여기보세요 여기 !!!!!!!!!!!!!
			
			//연간
			if (res.yearList.length === 0) {
				$("#annualCost").html(`<p style="color:gray;">데이터가 없습니다.</p>`);
				$("#annualSaveCost").html(`<p style="color:gray;">데이터가 없습니다.</p>`);
				
				
			} else {
				$("#annualCost").html(comma(calcCostNew(yearOrgCost))+`(<p style="color:var(--color-red);">-${comma(calcCostNew(yearOptCost))}</p>)<p>원</p>\n`+`<p class='traffic'>${fileSizeUnitFormatter(yearOrg)} (<span style="color:var(--color-red);">-${fileSizeUnitFormatter(yearOpt)}</span>)</p>`);
				if(yearOptCost ===0){
					$("#annualCost").html(comma(calcCostNew(yearOrgCost))+`<p>원</p>`);
				}
				$("#annualSaveCost").html(comma(calcCostNew(yearOrgCost-yearOptCost))+`<p>원</p>\n` + `<p class='traffic'>${fileSizeUnitFormatter(yearOrg-yearOpt)}</p>`);
				
			}
			
			
			//월간
			if (res.monthList.length === 0) {
				$("#monthlyCost").html(`<p style="color:gray;">데이터가 없습니다.</p>`);
				$("#monthlySaveCost").html(`<p style="color:gray;">데이터가 없습니다.</p>`);
			
			} else {
				$("#monthlyCost").html(comma(calcCostNew(monthOrgCost))+`(<p style="color:var(--color-red);">-${comma(calcCostNew(monthOptCost))}</p>)<p>원</p>\n`+`<p class='traffic'>${fileSizeUnitFormatter(monthOrg)}(<span style="color:var(--color-red);">-${fileSizeUnitFormatter(monthOpt)}</span>)</p>`);
				if(monthOptCost ===0){
					$("#monthlyCost").html(comma(calcCostNew(monthOrgCost))+`<p>원</p>`);
				}
				$("#monthlySaveCost").html(comma(calcCostNew(monthOrgCost - monthOptCost))+`<p>원</p>`  + `<p class='traffic'>${fileSizeUnitFormatter(monthOrg-monthOpt)}</p>`);
				
			}
			
			//금일
			if (res.dayList.length === 0) {
				$("#dayCost").html(`<p style="color:gray;">데이터가 없습니다.</p>`);
				$("#daySaveCost").html(`<p style="color:gray;">데이터가 없습니다.</p>`);
				
			} else {
				$("#dayCost").html(comma(calcCostNew(dayOrgCost))+`(<p style="color:var(--color-red);">-${comma(calcCostNew(dayOptCost))}</p>)<p>원</p>\n`+`<p class='traffic'>${fileSizeUnitFormatter(dayOrg)}(<span style="color:var(--color-red);">-${fileSizeUnitFormatter(dayOpt)}</span>)</p>`);
				if(dayOptCost ===0){
					$("#dayCost").html(comma(calcCostNew(dayOrgCost))+`<p>원</p>`);
				}
				$("#daySaveCost").html(comma(calcCostNew(dayOrgCost-dayOptCost))+`<p>원</p>`  + `<p class='traffic'>${fileSizeUnitFormatter(dayOrg-dayOpt)}</p>`);
				
				
			}
			
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
}





function drawBarChart(chartId,data,md) {
	

	am5.array.each(am5.registry.rootElements, function(root) {
		if (root) {
			if (root.dom.id == chartId) {
				root.dispose();
			}
		}
	});
	

	//Create root element
	//https://www.amcharts.com/docs/v5/getting-started/#Root_element
	var root = am5.Root.new(chartId);
	//delete logo
	root._logo.dispose();


	//Set themes
	//https://www.amcharts.com/docs/v5/concepts/themes/
	root.setThemes([
	am5themes_Animated.new(root)
	]);


	//Create chart
	//https://www.amcharts.com/docs/v5/charts/xy-chart/
	var chart = root.container.children.push(am5xy.XYChart.new(root, {
	panX: false,
	panY: false,
	paddingLeft: 0,
	wheelX: "panX",
	wheelY: "zoomX",
	layout: root.verticalLayout
	}));

	chart.get("colors").set("colors", [
		  am5.color(0xA6A6A6),
		  am5.color(0x4e73df),
		]);
	
	
	
	
	//Add legend
	//https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
	var legend = chart.children.push(
	am5.Legend.new(root, {
	 centerX: am5.p50,
	 x: am5.p50,
	 
	})
	);


	
	var xRenderer = am5xy.AxisRendererX.new(root, {
	cellStartLocation: 0.1,
	cellEndLocation: 0.9,
	minorGridEnabled: true,
	
	})

	var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
	categoryField: md,
	renderer: xRenderer,
	tooltip: am5.Tooltip.new(root, {})
	}));

	xRenderer.grid.template.setAll({
	location: 1
	})
	
	xAxis.data.setAll(data);

	  // Configure Y axis
    var yRenderer = am5xy.AxisRendererY.new(root, {
        strokeOpacity: 0.1,
    });

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: yRenderer,
        min: 0 // Y축의 시작 값을 0으로 설정
    }));

    yRenderer.labels.template.setAll({
        fill: am5.color(0xFFFFFF) // Y축 레이블 색상을 흰색으로 설정
    });
	

	function makeSeries(name, fieldName) {
	var series = chart.series.push(am5xy.ColumnSeries.new(root, {
	 name: name,
	 xAxis: xAxis,
	 yAxis: yAxis,
	 valueYField: fieldName,
	 categoryXField: md,
	}));

	series.columns.template.setAll({
	 tooltipText: "{name}, {categoryX} {valueY} 원",
	 width: am5.percent(90),
	 tooltipY: 0,
	 strokeOpacity: 0
	});

	series.data.setAll(data);

	series.appear();

	series.bullets.push(function () {
	 return am5.Bullet.new(root, {
	   locationY: 0,
	   sprite: am5.Label.new(root, {
	     text: "{valueY}",
	     fill: root.interfaceColors.get("alternativeText"),
	     centerY: 0,
	     centerX: am5.p50,
	     populateText: true
	   })
	 });
	});
	
	xRenderer.labels.template.setAll({
	    fill: am5.color(0xFFFFFF)
	});
	
	
	
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
	    //series.labels.template.set("forceHidden", true);
	  //  series.ticks.template.set("forceHidden", true);
	    
	    // Show modal
	    modal.open();
	  }
	  else {
		  
	    // Re-enable ticks/labels
	  //  series.labels.template.set("forceHidden", true);
	  //  series.ticks.template.set("forceHidden", true);
	    
	    // Hide modal
	    modal.close();
	  }
	});
	

	
		legend.data.push(series);
	}
	
	makeSeries("최적화 전 비용", "org");
	makeSeries("최적화 후 비용", "opt");
	legend.labels.template.setAll({
	    fill: am5.color(0xFFFFFF)
	});
	
	
	chart.appear(1000, 100);



	};

	
	
	
	
	
	function getChartCostByResource(){
		
		let data =[]
		$.ajax({
			type: 'POST',
			url: '/getChartCostByResource',
			data:{
//				startDate:start_Date,
//				endDate:end_Date,
				rgstr_yyyy:year,
				rgstr_mm:month,
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
		
		drawChart("test1",data);
	}

	// 페이지별 비용 차트
	function getChartCostByCloud(){
		
		let data =[]
		$.ajax({
			type: 'POST',
			url: '/getChartCostByCloud',
			data:{
//				startDate:start_Date,
//				endDate:end_Date,
				rgstr_yyyy:year,
				rgstr_mm:month,
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
		
		drawChart("test2",data);
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
		  click: false,
		  legendLabelText: "[{fill}]{category}[/]",
		  legendValueText: "[bold {fill}]{valuePercentTotal.formatNumber('0.00p')}"
		}));
		
		series.labels.template.setAll({
		  textType: "circular",
		  centerX: 0,
		  centerY: 0,
		  inside:true,
		});
		series.labels.template.set("forceHidden", true); 
		
		
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
	 legend.labels.template.setAll({
		    fill: am5.color(0xFFFFFF)
		});
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
		legend.labels.template.setAll({
		    fill: am5.color(0xFFFFFF)
		    
		});
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
