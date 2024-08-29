var currentDate = new Date();
var year = currentDate.getFullYear();
var month = currentDate.getMonth() + 1;

function main(){
	currentDate = new Date();
	year = currentDate.getFullYear();
	month = currentDate.getMonth() + 1;
	
	addDate();
	setDate_box();
	//web_content_table();
	deleteArrow();
	setSiteBox();
}

//function drawCostTable(){
//	 $("#mySelectBox").change(function() {
//	        // 선택된 옵션의 값을 가져옴
//	        var selectedValue = $(this).val();
//
//	        // 결과를 표시할 엘리먼트에 선택된 옵션의 값을 설정
//	        $("#result").text("선택된 옵션: " + selectedValue);
//	    });
//}

function draw_optimize_chart(chartName,data){
	am5.array.each(am5.registry.rootElements, function(root) {
		if (root) {
			if (root.dom.id == chartName) {
				root.dispose();
			}
		}
	});
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
		  text: (data[1].value/(data[0].value+data[1].value)*100).toFixed(0)+'%',
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
	 
	  
	  if (ev.target.data.length < 1 || series.data._values[0].value+series.data._values[1].value ===0) {
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
	
	
	
	
	series.appear(1000, 100);
}


function addDate(){
	
	$.ajax({
        url: 'addDate', 
        method: 'post',
        dataType: 'json',
        success: function (data) {
        	
        	var dateObj = new Date(data.reg_dt);

        	// 연도 추출
        	var startYear = dateObj.getFullYear();
        	// 월 추출 (월은 0부터 시작하므로 +1 해줍니다.)
        	//var month = dateObj.getMonth() + 1;
        	
        	 // 셀렉트박스 요소를 선택합니다. 적절한 ID를 사용하세요.
            var yearBox = $('#yearBox');

         // 연도를 추가합니다.
            var currentYear = new Date().getFullYear();
            for (var newYear = startYear; newYear <= currentYear; newYear++) {
                var option = $('<option>', { value: newYear, text: newYear + '년' });

                // 올해와 같은 년도인 경우 selected 속성 추가
                if (newYear === currentYear) {
                    option.attr('selected', true);
                }

                yearBox.append(option);
            }
            
                
        },
        error: function (error) {
            // 에러 처리
            console.error('Error fetching addDate data:', error);
        }
    });	
	
	
}

function setDate_box(){
	let option = $('#selectBox option:selected').val();
	let yearBox = $('#yearBox');
	let monthBox = $('#monthBox');
	if(option == 'month'){
		$('#monthBox').css('display', 'block');
		
		year = $('#yearBox option:selected').val();
		month = $('#monthBox option:selected').val();
		
	}else if(option== 'year'){
	    $('#monthBox').css('display', 'none');
	    
	    year = $('#yearBox option:selected').val();
		month = 0;		
	}
	
	web_content_table();
	
	
	$.ajax({
		type: 'POST',
		url: '/setDate_box',
		data:{
			rgstr_yyyy:parseInt(year),
			rgstr_mm:parseInt(month),			
		},
		async: false,
		success: function(res) {
			
			let count = res.selectContentsCnt;
			let selectContentsList = res.selectContentsSize;

			
			let unOpt_cnt = 0;
			let opt_cnt = 0;
			let all_cnt = count.length;
			let org_size_all = 0;
			let opt_size_all = 0;
			for (var i = 0; i < selectContentsList.length; i++) {
				
				org_size_all += selectContentsList[i].resource_org_size * selectContentsList[i].resource_call_cnt * getCloud_payment(selectContentsList[i].cloud_no );
				if(selectContentsList[i].resource_new_size_type2 ===0){
					opt_size_all += selectContentsList[i].resource_org_size*3/10 * selectContentsList[i].resource_call_cnt * getCloud_payment(selectContentsList[i].cloud_no );
				}else{
					opt_size_all += selectContentsList[i].resource_new_size_type2 * selectContentsList[i].resource_call_cnt * getCloud_payment(selectContentsList[i].cloud_no );
				}				
			}
			
			for (var i = 0; i < count.length; i++) {
				if(count[i].resource_status ===1 ){
					opt_cnt +=1;
				}else{
					unOpt_cnt +=1;
				}
			}
			
			org_size_all = calcCostNew(org_size_all);
			opt_size_all = calcCostNew(opt_size_all);
			
			
		    
			
			console.log(selectContentsList);
			
			if(selectContentsList <= 0){

				$("#opt_contents").html(`<p style="color:gray;">데이터가 없습니다.</p>`);
				$("#unopt_contents").html(`<p style="color:gray;">데이터가 없습니다.</p>`);
				$("#origin_cost").html(`<p style="color:gray;">데이터가 없습니다.</p>`);
				$("#aft_otpCost").html(`<p style="color:gray;">데이터가 없습니다.</p>`);
				
			}else{
				$("#opt_contents").html(`<p style="color:blue;">${opt_cnt}<span style="color:#5A5A5A">/${all_cnt}건</span></p>`);
				$("#unopt_contents").html(`<p style="color:orangered;">${unOpt_cnt}<span style="color:#5A5A5A">/${all_cnt}건</span></p>`);
				$("#origin_cost").html(`<p>${org_size_all}<span style="font-size:18px;"> 원</span></p>`);
				$("#aft_otpCost").html(`<p style="color:blue;">${(org_size_all-opt_size_all).toFixed(2)}<span style="font-size:18px;"> 원</span></p> <p style="font-size:20px; color:orangered">(${opt_size_all}원 절약 예상)</p>`);
				
			}			
			
			
			let data= [{ value: unOpt_cnt, category: "최적화 미적용",sliceSettings: {
			    fill: am5.color(0xff1100),
			    stroke: am5.color(0xd6e681)
			  }}, { value: opt_cnt, category: "최적화",sliceSettings: {
				    fill: am5.color(0x4e73df),
				    stroke: am5.color(0xd6e681)
				  } }];
			
			draw_optimize_chart("optimize_chart",data);
			
			
			
		
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	
}



function web_content_table(){
	if(year === undefined || year === null){
		year = currentDate.getFullYear();
	}
	
	let page_no = $('#siteBox').val() || 0;
	let resource_type = $('#contentBox').val() || 0;
	
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
	    ajaxURL:"/selectAllResourceByStatus", // set url for ajax request
	    ajaxParams:{
	    	rgstr_yyyy:year,
	    	rgstr_mm:month,
			resource_type : resource_type,
			page_no : page_no,
			resource_status: -1
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
	    	{title:"타입", field:"resource_type",width:55,hozAlign:"center",resizable:false,headerSort:false,
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
	    	{title:"웹컨텐츠 이름", field:"resource_name" ,widthgrow :true,hozAlign:"center",resizable:false},
	        {title:"원본 용량", field:"resource_org_size", width:150 ,hozAlign:"right",resizable:false,
	        	 formatter: function(cell, formatterParams, onRendered) {
	        		 return fileSizeUnitFormatter(cell.getValue());
	        	 }},
	        {title:"최적화 용량", field:"resource_new_size_type2", width:150, hozAlign:"right",resizable:false,
	        	 formatter: function(cell, formatterParams, onRendered) {
	        		 var data = cell.getData("data");
	        		 if(data.resource_status ===1){
	        			 return fileSizeUnitFormatter(cell.getValue());
	        		 }else{
	        			 return `<p style="color:gray; margin-bottom:0px; padding:0px;">
	        			${fileSizeUnitFormatter(data.resource_org_size*3/10)} (예상)</p>`;
	        		 }
	        		 
	        	 }
	        },
	        {title:"호출 횟수", field:"resource_call_cnt", width:150 ,hozAlign:"right",resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	        		 return comma(cell.getValue())+' 회';
	        	 }},
	        {title:"최적화 전 비용", field:"bfOptCost",width:150, hozAlign:"right",resizable:false,
	        	 formatter: function(cell, formatterParams, onRendered) {
	        		 return comma(cell.getValue())+'원';
	        	 }},
	        {title:"최적화 후 비용", field:"aftOptCost",width:150 ,hozAlign:"right",resizable:false,
	        	 formatter: function(cell, formatterParams, onRendered) {
	        		 var data = cell.getData("data");
	        		 
	        		 if(data.resource_status ===1){
	        			 return comma(cell.getValue())+'원';
	        		 }else{
	        			 return `<p style="color:gray; margin-bottom:0px; padding:0px;">
	        			${comma(calcCostNew(data.resource_org_size*3/10*data.resource_call_cnt * getCloud_payment(data.cloud_no)))}원 (예상)</p>`;
	        		 }
	        	     
	        	 }},
//	        {title:"절감 비용", field:"saveCost",width:150,hozAlign:"right",
//	        	 formatter: function(row, formatterParams, onRendered) {
//	        		 	var rowData = row.getData("data");
//	        		 	var bfOptCost = parseFloat(rowData["bfOptCost"]);
//	        	        var aftOptCost = parseFloat(rowData["aftOptCost"]);
//	        	        var saveCost="";
//	        	        if(parseInt(rowData["resource_status"])=== 1){
//	        	        	 saveCost = `${comma((aftOptCost-bfOptCost).toFixed(2))} 원(${Math.round((bfOptCost-aftOptCost)/bfOptCost * 100 )}%)`;
//		        	    }
//	        	        
//	        	        return saveCost;
//	        	    }	
//	        }
	        	 ,{title:"예상 절감 비용", field:"expSaveCost",width:150,hozAlign:"right",resizable:false,
	        	 formatter: function(row, formatterParams, onRendered) {
	        		 
	        		 	var data = row.getData("data");
// var bfOptCost = parseFloat(data["bfOptCost"]);
// var aftOptCost = parseFloat(data["aftOptCost"]);
	        		 	var bfOptCost = parseFloat(data["bfOptCost"]);
	        	        var aftOptCost = parseFloat(calcCostNew(data.resource_org_size*3/10*data.resource_call_cnt * getCloud_payment(data.cloud_no)));
	        	        var expSaveCost= "";
	        	      
	        	        
	        	        
	        	        if(parseInt(data["resource_status"])!== 1){
	        	        	if(bfOptCost ===0 && aftOptCost ===0){
	        	    			return `<p style="color:gray; margin-bottom:0px; padding:0px;">
	        	    			0 원 (0%)</p>`;
	        	    		}
	        	        	
	        	        	expSaveCost = 
	        	        		`<p style="color:gray; margin-bottom:0px; padding:0px;">
	        	        		${comma((aftOptCost-bfOptCost).toFixed(2))} 원(${Math.round((bfOptCost-aftOptCost)/bfOptCost * 100 )}%)
	        	        		</p>`;
	        	        		
	        	        }
	        	        
	        	        
	        	        return expSaveCost;
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
	
}











