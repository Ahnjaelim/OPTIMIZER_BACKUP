
function main(){
	getCostData();
	
	$('.fc-prev-button,.fc-next-button,.fc-today-button').on('click', function() {
		makeSubTitle();
	});
}


function getCostData(){
	$.ajax({
		type: 'POST',
		url: '/selectAllResourceByDate',
		data:{
			
		},
		async: false,
		success: function(res) {
			res = res.data
			
						
			
			const groupedData = res.reduce((acc, item) => {
			  const key = item.rgstr_date;

			  if (!acc[key]) {
			    acc[key] = { rgstr_date: key, opt : 0 ,traffic : 0};
			  }
			  
			  if(item.resource_status ===1 && item.resource_new_size_type2 !== item.resource_org_size){
				  acc[key].opt += item.resource_new_size_type2 * item.resource_call_cnt * getCloud_payment(item.cloud_no);
			  }
			  
			  if(item.resource_status ===1 && item.resource_new_size_type2 !== item.resource_org_size){
				  acc[key].traffic += item.resource_new_size_type2 * item.resource_call_cnt;
			  }

			  return acc;
			}, {});

			// groupedData를 배열로 변환
			data = Object.values(groupedData);
			for (var i = 0; i < data.length; i++) {
				data[i].traffic = formatFileSize(data[i].traffic);	
			}
			
			for (var i = 0; i < data.length; i++) {
				data[i].opt = parseFloat(calcCostNew(data[i].opt))+' 원/'+data[i].traffic;
			}
			
			
			
			
			for (var i = 0; i < data.length; i++) {
				// opt를 title로 이름 변경
				data[i].title = data[i].opt;

				// rgstr_date를 start와 end로 나누고 yyyy-mm-dd 형식으로 변경
				const rgstr_date = String(data[i].rgstr_date);
				const year = rgstr_date.substring(0, 4);
				const month = rgstr_date.substring(4, 6);
				const day = rgstr_date.substring(6, 8);

				data[i].start = year + '-' + month + '-' + day;
				data[i].end = year + '-' + month + '-' + day;
				delete data[i].opt;
			    delete data[i].rgstr_date;

			}
			
			drawCalender(data);
			
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
}

var myChart="";
var myChart2="";

function drawCalender(data){
	var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
    	themeSystem: 'bootstrap5',
        initialView: 'dayGridMonth',
        locale:"kr",
        editable:false,
        selectable:true,
        headerToolbar: {
            left: 'title,prev,next',
            center: '',
            right: 'multiMonthYear,dayGridMonth,today'
          },
        buttonText:{
        	multiMonthYear:"년",
        	month:'월',
        	today:'오늘'
        },
        select: function(info) {
            //alert('selected ' + info.startStr + ' to ' + info.endStr);
    		//$("#dailydetailModal").modal("show");
        	//console.log("drag!!!");
        	
        	if(myChart) {
            	myChart.destroy(); // 이전 차트 삭제
            	myChart2.destroy(); // 이전 차트 삭제
            	
        	}
        	//alert('selected ' + info.event.start);
        	// 현재 날짜 객체 생성
        	var currentDate = info.startStr;

        	// 날짜를 원하는 형식으로 변환
        	var year = currentDate.split("-")[0];
        	var month = currentDate.split("-")[1];
        	var day = currentDate.split("-")[2];
        	
        	var endDate = info.endStr;
        	
        	var endYear = endDate.split("-")[0];
        	var endMont = endDate.split("-")[1];
        	var endYDay = endDate.split("-")[2];


           ymData = calData(year,month,null);
           crData = crDataStartEnd(year,month,day,currentDate,endDate);
           console.log(year,month,day);
           console.log(currentDate,endDate);
           
           var icon = `<i class="bx bxs-caret-up-circle" style="color:red;"></i>`;
           
           var checkEndDay = parseInt(endYDay)-1;
           var checkStartDay = parseInt(day);
           
           if(checkEndDay == checkStartDay) {
        	   $("#modal_title").html(year + "년 " + month + "월 " + day + "일");
           }else {
        	   $("#modal_title").html(year + "년 " + month + "월 " + day + "일 ~ "+endYear + "년 " + endMont + "월 " + checkEndDay + "일 ");
           }
        	
    		$("#save_money_total").html("총 절감 비용 "+icon+' '+"<b style='color:#f34e4e;'>"+crData.dayOptCost+' 원</b');
    		$("#save_traffic_total").html("총 절감 트래픽 "+icon+' '+"<b style='color:#f34e4e;'>"+crData.dayOpt+"</b>");
    		
    		drowMoneyChart(crData.dayOriginCost, crData.dayNewCost);
    		drowTrafficChart(crData.dayOrginTraffic, crData.dayNewTraffic);
    		
    		optimizerByContentInitTraffic(currentDate,endDate);
    		
    		setTimeout(function(){
    			$('#explorer .content').jstree(true).open_all();	
    		},1000);
    		
    		$("#dailydetailModal").modal("show");
        },
        eventClick: function(info) {
        	if(myChart) {
            	myChart.destroy(); // 이전 차트 삭제
            	myChart2.destroy(); // 이전 차트 삭제
            	
        	}
        	//alert('selected ' + info.event.start);
        	// 현재 날짜 객체 생성
        	var currentDate = info.event.start;

        	// 날짜를 원하는 형식으로 변환
        	var year = currentDate.getFullYear();
        	var month = currentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
        	var day = currentDate.getDate();
        	
        	var setCurrentDate = year+"-"+String(month).padStart(2, "0")+"-"+day;

           ymData = calData(year,month,null);
           crData = calData(year,month,day);
           var icon = `<i class="bx bxs-caret-up-circle" style="color:red;"></i>`;
        	
    		$("#modal_title").html(year + "년 " + month + "월 " + day + "일");
    		$("#save_money_total").html("총 절감 비용 "+icon+' '+"<b style='color:#f34e4e;'>"+crData.dayOptCost+' 원</b');
    		$("#save_traffic_total").html("총 절감 트래픽 "+icon+' '+"<b style='color:#f34e4e;'>"+crData.dayOpt+"</b>");
    		
    		drowMoneyChart(crData.dayOriginCost, crData.dayNewCost);
    		drowTrafficChart(crData.dayOrginTraffic, crData.dayNewTraffic);
    		
    		optimizerByContentInitTraffic(setCurrentDate,null);

    		setTimeout(function(){
    			$('#explorer .content').jstree(true).open_all();	
    		},1000);
    		
    		$("#dailydetailModal").modal("show");
         },
        events:data, 
//        	[
//            {
//                title: 25000,
//                start: '2024-02-20',
//                end: '2024-02-20',
//            },
//            // 다른 일정들...
//        ]
       eventContent: function(info) {
    	   
    	      // 이벤트 객체에서 title을 가져와서 HTML을 직접 추가
    	      var titleHtml = info.event.title;
    	      var cost = titleHtml.split('/')[0];
    	      var traffic = titleHtml.split('/')[1];
    	      // 이벤트의 텍스트를 변경
    	      return { html: `<div class="bg-danger cost">${cost}</div><div class="bg-warning traffic">${traffic}</div>` };
    	    },
    	    viewDidMount: function(view) {
    	    	makeSubTitle();
    	    	
    	},
    	
    	    
    });
    calendar.render();
}

function drowMoneyChart(orgCost, newCost) {

	var initialData = [orgCost,orgCost];
	var finalData = [orgCost, newCost];
	
	var data = {
            labels: ['적용 전 비용', '적용 후 절감된 비용'],
            datasets: [{
                label: '비용 (원)',
                data: initialData,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        };

        // 차트 설정 정의
        var options = {
        		animation: {
        	        duration: 2000, // 애니메이션 지속 시간 설정 (밀리초 단위)
        	        easing: 'easeInOutQuart', // 애니메이션의 이징 설정
        	      },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        $("#save_money_chart").css("display","none");
        // 막대 차트 생성
        var ctx = document.getElementById('save_money_chart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
        
     // 데이터를 업데이트하는 함수
        function updateChart() {
        	myChart.data.datasets[0].data = finalData; // 데이터 업데이트
        	myChart.update(); // 차트 업데이트
        }
     // 일정 시간이 지난 후에 데이터를 변경하여 차트를 업데이트 (수직으로 줄어드는 효과를 위해)
        setTimeout(function() {
        	$("#save_money_chart").css("display","block");
          updateChart(); // 데이터 업데이트하여 차트 다시 그리기
        }, 2000); // 2초 후에 데이터를 변경하여 차트를 업데이트
        
}

function drowTrafficChart(orgTraffic, newTraffic) {
//	console.log("orgTraffic = "+orgTraffic);
//	console.log("newTraffic = "+newTraffic);
	
	orgTraffic = orgTraffic / (1024 * 1024);
	newTraffic = newTraffic / (1024 * 1024);
	
	/*var splitVal = orgTraffic.split(" ")[0];
	var splitVal2 = newTraffic.split(" ")[0];
	var trafficUnit = newTraffic.split(" ")[1];*/

	var initialData  = [orgTraffic, orgTraffic];
	var finalData  = [orgTraffic, newTraffic];
	
	var data = {
            labels: ['적용 전 트래픽', '적용 후 절감된 트래픽'],
            datasets: [{
                label: '트래픽 (MB)',
                data: initialData,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        };

        // 차트 설정 정의
        var options = {
        		animation: {
        	        duration: 2000, // 애니메이션 지속 시간 설정 (밀리초 단위)
        	        easing: 'easeInOutQuart', // 애니메이션의 이징 설정
        	      },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        $("#save_traffic_chart").css("display","none");
        // 막대 차트 생성
        var ctx = document.getElementById('save_traffic_chart').getContext('2d');
        myChart2 = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
        
     // 데이터를 업데이트하는 함수
        function updateChart() {
        	myChart2.data.datasets[0].data = finalData; // 데이터 업데이트
        	myChart2.update(); // 차트 업데이트
        }
     // 일정 시간이 지난 후에 데이터를 변경하여 차트를 업데이트 (수직으로 줄어드는 효과를 위해)
        setTimeout(function() {
            $("#save_traffic_chart").css("display","block");
          updateChart(); // 데이터 업데이트하여 차트 다시 그리기
        }, 2000); // 2초 후에 데이터를 변경하여 차트를 업데이트
}

function clearChart() {
	myChart.destroy(); // 이전 차트 삭제
	myChart2.destroy(); // 이전 차트 삭제
}




function makeSubTitle(){
	
	
	var calDate = $("#fc-dom-1").text();
	 // 문자열에서 년도 추출
    var yearIndex = calDate.indexOf('년');
    var year = yearIndex !== -1 ? parseInt(calDate.substring(0, yearIndex)) : null;

    // 문자열에서 월 추출
    var monthIndex = calDate.indexOf('월');
    var month = monthIndex !== -1 ? parseInt(calDate.substring(yearIndex + 2, monthIndex)) : null;
    
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    var currentDay = currentDate.getDate();

    ymData = calData(year,month,null);
    crData = calData(currentYear,currentMonth,currentDay);
    
	 // subBar 클래스를 가진 div가 이미 존재하는지 확인
    var existingSubBar = document.querySelector('.subBar');
    if (existingSubBar) {
      // 이미 존재한다면 삭제
      existingSubBar.remove();
    }
    
    
    // 새로운 row div 추가
    var rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    rowDiv.classList.add('subBar');
    rowDiv.style.textAlign = 'left';
    
    var icon = `<i class="bx bxs-caret-up-circle" style="color:red;"></i>`;
    
    // col-3 클래스를 가진 div를 만들어서 row div에 추가
    for (var i = 0; i < 4; i++) {
      var colDiv = document.createElement('div');
      colDiv.classList.add('col-3');

      // 자식 div 2개를 추가
      var childDiv1 = document.createElement('div');
      
      var childDiv2 = document.createElement('div');
      
      if(i===0){
    	  if(month !==null){
    		  childDiv1.textContent = month+'월 총 절감액';
              childDiv2.innerHTML = icon+' '+ymData.monthOptCost+' 원';  
    	  }else{
    		  childDiv1.textContent = year+'년 총 절감액';
              childDiv2.innerHTML = icon+' '+ymData.yearOptCost+' 원';  
    	  }
    	  
      }else if(i ===1){
    	  if(month !==null){
    		  childDiv1.textContent = month+'월 총 트래픽 절감액';
              childDiv2.innerHTML = icon+' '+ymData.monthOpt;   
    	  }else{
    		  childDiv1.textContent = year+'년 총 트래픽 절감액';
              childDiv2.innerHTML = icon+' '+ymData.yearOpt;  
    	  }
      }else if(i === 2){
    	  childDiv1.textContent = '오늘 절감액';
          childDiv2.innerHTML = icon+' '+crData.dayOptCost+' 원';
      }else{
    	  childDiv1.textContent = '오늘 트래픽 절감액';
          childDiv2.innerHTML  = icon+' '+crData.dayOpt;  
      }
      

      // col-3 div의 자식으로 추가
      colDiv.appendChild(childDiv1);
      colDiv.appendChild(childDiv2);

      // rowDiv의 자식으로 추가
      rowDiv.appendChild(colDiv);
    }

    // fc-header-toolbar의 형제로 row div 추가
    var headerToolbar = document.querySelector('#subTitle');
    headerToolbar.insertAdjacentElement('afterbegin', rowDiv);
}


function calData(year,month,day){
	
	if(month === null)month = 0;
	if(day ===null)day =0;
	
	console.log(year,month,day);
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
		
			let yearOptCost= 0 ;
			let yearOpt= 0 ;
			let monthOptCost= 0 ;
			let monthOpt= 0 ;
			let dayOptCost= 0 ;
			let dayOpt= 0 ;
			
			let dayOriginCost = 0 ;
			let dayOrginTraffic = 0;
			let dayNewTraffic = 0;
			let dayNewCost = 0;
			
			for (var i = 0; i < res.yearList.length; i++) {
				if(res.yearList[i].resource_status === 1 && res.yearList[i].resource_new_size_type2 !== res.yearList[i].resource_org_size){
					yearOptCost += res.yearList[i].resource_new_size_type2 * res.yearList[i].resource_call_cnt * getCloud_payment(res.yearList[i].cloud_no);
					yearOpt += res.yearList[i].resource_new_size_type2 * res.yearList[i].resource_call_cnt 
				}
			}
			
			
			for (var i = 0; i < res.monthList.length; i++) {
				if(res.monthList[i].resource_status === 1 && res.monthList[i].resource_new_size_type2 !== res.monthList[i].resource_org_size){
					monthOptCost += res.monthList[i].resource_new_size_type2 * res.monthList[i].resource_call_cnt  * getCloud_payment(res.monthList[i].cloud_no);
					monthOpt += res.monthList[i].resource_new_size_type2 * res.monthList[i].resource_call_cnt ;
				}
			}
			
			for (var i = 0; i < res.dayList.length; i++) {				
				dayOriginCost += res.dayList[i].resource_org_size * res.dayList[i].resource_call_cnt  * getCloud_payment(res.dayList[i].cloud_no);
				dayOrginTraffic += res.dayList[i].resource_org_size * res.dayList[i].resource_call_cnt;
				
				if(res.dayList[i].resource_status === 1 && res.dayList[i].resource_new_size_type2 !== res.dayList[i].resource_org_size){
					dayOptCost += res.dayList[i].resource_new_size_type2 * res.dayList[i].resource_call_cnt  * getCloud_payment(res.dayList[i].cloud_no);
					dayOpt += res.dayList[i].resource_new_size_type2 * res.dayList[i].resource_call_cnt;  
				}
			}
			dayNewTraffic = dayOrginTraffic-dayOpt;
			dayNewCost = calcCostNew(dayOriginCost-dayOptCost);
						
			yearOptCost= calcCostNew(yearOptCost);
			monthOptCost= calcCostNew(monthOptCost);
			dayOptCost= calcCostNew(dayOptCost);
			dayOriginCost= calcCostNew(dayOriginCost);
			yearOpt= formatFileSize(yearOpt);
			monthOpt= formatFileSize(monthOpt);
			dayOpt= formatFileSize(dayOpt);
			//dayOrginTraffic= formatFileSize(dayOrginTraffic);
			data = {'yearOptCost':yearOptCost,'yearOpt':yearOpt,'monthOptCost':monthOptCost,'monthOpt':monthOpt,'dayOptCost':dayOptCost,'dayOpt':dayOpt, 'dayOriginCost':dayOriginCost, 'dayNewCost':dayNewCost, 'dayOrginTraffic':dayOrginTraffic, 'dayNewTraffic':dayNewTraffic};
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	return data;
}

function crDataStartEnd(year,month,day,startDate, endDate) {
	var checkStartDate = parseInt(startDate.replaceAll("-",""));
	var checkEndDate = parseInt(endDate.replaceAll("-",""))-1;
	
	var splitDate;
	
	if(checkStartDate == checkEndDate) {
		splitDate = endDate.split("-");
		
		year = splitDate[0];
		month = splitDate[1];
		day = splitDate[2]-1;
		
		startDate = 0;
		endDate = 0;
	}else {
		startDate = checkStartDate;
		endDate = checkEndDate;
		
		year = 0;
		month = 0;
		day = 0;
	}
	
	parseInt(year);
	$.ajax({
		type: 'POST',
		url: '/selectCost',
		data:{
			startDate: startDate,
			endDate: endDate,
			rgstr_yyyy : parseInt(year),
			rgstr_mm : parseInt(month),
			rgstr_dd : parseInt(day)
		},
		async: false,
		success: function(res) {
		
			let yearOptCost= 0 ;
			let yearOpt= 0 ;
			let monthOptCost= 0 ;
			let monthOpt= 0 ;
			let dayOptCost= 0 ;
			let dayOpt= 0 ;
			
			let dayOriginCost = 0 ;
			let dayOrginTraffic = 0;
			let dayNewTraffic = 0;
			let dayNewCost = 0;
			
			for (var i = 0; i < res.yearList.length; i++) {
				if(res.yearList[i].resource_status === 1 && res.yearList[i].resource_new_size_type2 !== res.yearList[i].resource_org_size){
					yearOptCost += res.yearList[i].resource_new_size_type2 * res.yearList[i].resource_call_cnt * getCloud_payment(res.yearList[i].cloud_no);
					yearOpt += res.yearList[i].resource_new_size_type2 * res.yearList[i].resource_call_cnt 
				}
			}
			
			
			for (var i = 0; i < res.monthList.length; i++) {
				if(res.monthList[i].resource_status === 1 && res.monthList[i].resource_new_size_type2 !== res.monthList[i].resource_org_size){
					monthOptCost += res.monthList[i].resource_new_size_type2 * res.monthList[i].resource_call_cnt  * getCloud_payment(res.monthList[i].cloud_no);
					monthOpt += res.monthList[i].resource_new_size_type2 * res.monthList[i].resource_call_cnt ;
				}
			}
			
			for (var i = 0; i < res.dayList.length; i++) {				
				dayOriginCost += res.dayList[i].resource_org_size * res.dayList[i].resource_call_cnt  * getCloud_payment(res.dayList[i].cloud_no);
				dayOrginTraffic += res.dayList[i].resource_org_size * res.dayList[i].resource_call_cnt;
				
				if(res.dayList[i].resource_status === 1 && res.dayList[i].resource_new_size_type2 !== res.dayList[i].resource_org_size){
					dayOptCost += res.dayList[i].resource_new_size_type2 * res.dayList[i].resource_call_cnt  * getCloud_payment(res.dayList[i].cloud_no);
					dayOpt += res.dayList[i].resource_new_size_type2 * res.dayList[i].resource_call_cnt;  
				}
			}
			dayNewTraffic = dayOrginTraffic-dayOpt;
			dayNewCost = calcCostNew(dayOriginCost-dayOptCost);
						
			yearOptCost= calcCostNew(yearOptCost);
			monthOptCost= calcCostNew(monthOptCost);
			dayOptCost= calcCostNew(dayOptCost);
			dayOriginCost= calcCostNew(dayOriginCost);
			yearOpt= formatFileSize(yearOpt);
			monthOpt= formatFileSize(monthOpt);
			dayOpt= formatFileSize(dayOpt);
			//dayOrginTraffic= formatFileSize(dayOrginTraffic);
			data = {'yearOptCost':yearOptCost,'yearOpt':yearOpt,'monthOptCost':monthOptCost,'monthOpt':monthOpt,'dayOptCost':dayOptCost,'dayOpt':dayOpt, 'dayOriginCost':dayOriginCost, 'dayNewCost':dayNewCost, 'dayOrginTraffic':dayOrginTraffic, 'dayNewTraffic':dayNewTraffic};
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	return data;
}

function optimizerByContentInitTraffic(startDate, endDate){	
	var year = 0;
	var month = 0;
	var day = 0;
	
	if(endDate) {
		var checkStartDate = parseInt(startDate.replaceAll("-",""));
		var checkEndDate = parseInt(endDate.replaceAll("-",""))-1;
		
		var splitDate;
		
		if(checkStartDate == checkEndDate) {
			splitDate = endDate.split("-");
			
			year = splitDate[0];
			month = splitDate[1];
			day = splitDate[2]-1;
			
			startDate = 0;
			endDate = 0;
		}else {
			startDate = checkStartDate;
			endDate = checkEndDate;
			
			year = 0;
			month = 0;
			day = 0;
		}
	}else {
		//startDate = parseInt(startDate.replaceAll("-",""));
		endDate = startDate;
		
		splitDate = endDate.split("-");
		
		year = splitDate[0];
		month = splitDate[1];
		day = splitDate[2];

		startDate = 0;
		endDate = 0;
	}
	
	$('#explorer').html('<div class="content"></div>');
	
	var jsonData;
	
	$.ajax({
	    url: "/getJsonData",
	    type: "POST",
	    dataType: 'json', // 반환되는 데이터 형식이 JSON임을 명시
	    async: false,
	    success: function(response) {
	        // 성공적으로 데이터를 받았을 때 실행되는 코드
	        //console.log("Received data:", response);
	        
	        jsonData = response;
	    },
	    error: function(xhr, status, error) {
	        // 요청이 실패했을 때 실행되는 코드
	        console.error("Error:", error);
	    }
	});
	
	$('#explorer .content').jstree({
		'core' : {
			'data' : jsonData,
			'themes' : {
				"variant" : "large",
			}
		},
	    /*'checkbox': {
	        'keep_selected_style': false // 선택된 스타일 유지
	    },
	    'plugins': ['checkbox', 'core'],*/
	}).on('select_node.jstree', function (e, data) {
		var selectedNodeId = data.node.id;
		//console.log('Selected Node ID:', selectedNodeId);
		// $("#viewer").html(selectedNodeId);
		selectResourceListByParentIdTraffic(startDate, endDate,year,month,day,data.node.id);
	});

	setTimeout(function(){
		$(".jstree .jstree-anchor").each(function(){
			$(this).append(` <span class="count"></span>`);
		});
		selectResourceListByParentIdTraffic(startDate, endDate,year,month,day);
		/*
		for(let i = 0; i < jsonCount.length; i++){
			let target = $(".jstree").find(`li#${jsonCount[i].resource_parent_no} a`);
			if(target.length > 0){
				target.eq(0).append(` <span class="count"></span>`);
			}
		}*/
	},1100);
}

function selectResourceListByParentIdTraffic(startDate, endDate,year,month,day,resource_parent_no){
	//console.log("startDate = "+startDate);
	//console.log("endDate = "+endDate);
	
	if(resource_parent_no == null || resource_parent_no == "undefined"){
		resource_parent_no = 0;
	}
	let search_disable = 0;
	
	// 상태 검색 설정
    let resource_status_array = [];
    $('input[name="resource_status"]:checked').each(function(){
    	resource_status_array.push($(this).val());
    });
    if (resource_status_array.length === 0) {
    	for(let i = 0; i < statusArray.length; i++){
    		resource_status_array.push(statusArray[i].value);
    	}
    }
    
    // 유형 검색 설정
    let resource_type_array = [];
    $('input[name="resource_type"]:checked').each(function(){
    	resource_type_array.push($(this).val());
    });
    if (resource_type_array.length === 0) {
    	for(let i = 0; i < typeArray.length; i++){
    		resource_type_array.push(typeArray[i].value);
    	}
    }    
    
    // console.log(resource_status_array);
	let search_range = $("select[name=search_range]").val();
	let search_keyword = $("input[name=search_keyword]").val();
	
	// 페이지 검색 추가
	let search_page = $("input[name=search_page]").val();

	let data = {
	    	resource_parent_no : resource_parent_no,
	    	resource_status_array : resource_status_array,
	    	resource_type_array : resource_type_array,
	    	search_range : search_range,
	    	search_keyword : search_keyword,
	    	search_disable : search_disable,
	    	search_page : search_page,
	    	startDate : startDate,
	    	endDate : endDate,
	    	rgstr_yyyy : year,
	    	rgstr_mm : month,
	    	rgstr_dd : day,
	    };
	
	table_resource = new Tabulator("#volist", {
		height:"100%",
		selectable:true,
	    pagination:true, //enable pagination
	    paginationMode:"remote", //enable remote pagination
	    sortMode: "remote",
	    ajaxURL:"/selectResourceListByParentIdTraffic", //set url for ajax request
	    ajaxParams:data,	    
	    paginationSize:10, //optional parameter to request a certain number of rows per page
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
	        }
	    },	    
	    ajaxContentType : "application/json; charset=utf-8",
	    ajaxContentType:"json",
	    ajaxResponse:function(url,prarm,response){
 	    	// console.log(response);
	    	// console.log(prarm);
	    	// console.log("page : "+this.getPage());
	    	// console.log("size : "+this.getSize());
	    	$("#list_cnt span").html(response.list_cnt);
	    	for(let i=0;i<response.data.length;i++){
	    		var icon = `<i class="bx bxs-caret-up-circle" style="color:red;"></i>`;
	    		// 절감률 계산
	    		//response.data[i].saving_rate = decreaseRate(response.data[i].resource_new_size_type1, response.data[i].resource_new_size_type2);
	    		response.data[i].saving_rate = icon+calcCostNew(response.data[i].resource_new_size_type2 * response.data[i].resource_call_cnt * getCloud_payment(response.data[i].cloud_no))+"원";
	    		// 상세보기 버튼
	    		response.data[i].detail_btn = `<a class="btn btn-primary  btn-sm btn-icon-split" onclick="drawResourceModal(${response.data[i].resource_no});">
	    			<span class="icon text-white-50"><i class="fas fa-search"></i></span>
	    			<span class="text">상세보기</span></a>`;
	    		if(response.data[i].resource_type==0){
	    			response.data[i].detail_btn = `<a class="btn btn-secondary btn-sm btn-icon-split" style="opacity:0.5;">
		    			<span class="icon text-white-50"><i class="fas fa-search"></i></span>
		    			<span class="text">상세보기</span></a>`;	    			
	    		}
	    		
	    	}
	    	// console.log(response);
	    	return response; 
	    },
	    paginationInitialPage: 1,
	    layout: "fitColumns",
	    columns: [
			/*{
				formatter:"rowSelection", 
				titleFormatter:"rowSelection", 
				titleFormatterParams:{
					rowRange:"active" //only toggle the values of the active filtered rows
				}, 
				hozAlign:"center", 
				headerSort:false,
				width: 50
			},	 */   	
	    	{
	    		title: "No",
	    		field: "row_no",
	    		width: 80,
	    		hozAlign: "right",
	    		headerSort:false,
	    	},
	    	{
	    		title: "No",
	    		field: "resource_no",
	    		width: 80,
	    		hozAlign: "right",
	    		headerSort:true,
	    		visible:false,
	    	},	    	
	    	{
	    		title: "구분",
	    		field: "resource_type",
	    		hozAlign: "center",
	    		headerSort:true,
	    		width: 60,
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
	    		title: "웹 컨텐츠 이름",
	    		field: "resource_name",
	    		hozAlign: "left",
	    		headerSort:true,
	    		widthgrow :true,
	    		cellClick: function(e, cell) {
	                let rowData = cell.getRow().getData(); // 클릭된 셀의 행 데이터 가져오기
	                if(rowData['resource_type'] == 0){
	                	$('#explorer .content').jstree(true).deselect_all();
	                	$('#explorer .content').jstree(true).select_node(rowData['resource_no']);	                	
	                }
	            }	    		
	    	},
	    	{
	    		title: "원본 용량",
	    		field: "resource_new_size_type1",
	    		hozAlign: "right",
	    		headerSort:true,
	    		width: 150,
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
	    		hozAlign: "right",
	    		headerSort:true,
	    		width: 150,
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
	    	{
	    		title: "호출 횟수",
	    		field: "resource_call_cnt",
	    		hozAlign: "right",
	    		headerSort:true,
	    		width: 150,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let rowData = cell.getRow().getData();
	    			let result = comma(cell.getValue())+"회";
	    			if(rowData.resource_type == 0){
	    				result = "";
	    			}
	    			
	    			return result;
	    		}	    		
	    	},	    	
	    	{
	    		// title: `비용 절감율<ion-icon name="help-circle-outline" style="font-size: 1.3em; position:relative; top:5px;"></ion-icon>`,
	    		title: "절감 비용",
	    		field: "saving_rate",
	    		hozAlign: "right",
	    		headerSort:false,
	    		width: 150,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return cell.getValue();
	    		},
	    		cellClick: function(e, cell){
	    			let result = cell.getValue();
	    			if($(result).hasClass("zero")){
	    				miniAlert(msg.savingRateInfo,"success");
	    			}
	    		}	    		
	    	},	    	
	    ]
	});	
	table_resource.on("dataLoaded", function() {
		//	상위 디렉토리 만들기
		if(search_range != 0){
			setTimeout(function(){
				let parentDir = $("#volist .tabulator-row").eq(0).clone();
				parentDir.find(".tabulator-cell").html("");
				parentDir.find(`.tabulator-cell[tabulator-field="resource_type"]`).html("📁");
				parentDir.find(`.tabulator-cell[tabulator-field="resource_name"]`).html(`<ion-icon name="arrow-up-circle-outline" style="font-size:1.2em;"></ion-icon> 상위 디렉토리`);
				let selectedNodeId = $('#explorer .content').jstree(true).get_selected()[0];
				let parentNode = $('#explorer .content').jstree(true).get_node(selectedNodeId).parent;
				//console.log(`selectedNodeId : ${selectedNodeId} | parentNode : ${parentNode}`);
				if(selectedNodeId !== undefined && parentNode != "#"){
					$("#volist .tabulator-table").prepend(parentDir);
				}
				parentDir.on("click", function(){
					// alert("!!");
					$('#explorer .content').jstree(true).deselect_all();
					$('#explorer .content').jstree(true).select_node(parentNode);
	
				});
			},100);
			// table_resource.redraw();
		}
		let countArray = countResourceFolderTraffic(data,startDate, endDate,year,month,day);
		//console.log(`===== count Array =====`)
		//console.log(data);
		//console.log(countArray);
		for(let i = 0; i < countArray.length; i++){
			let target = $(".jstree").find(`li#${countArray[i].resource_no} a`);
			if(target.length > 0){
				target.eq(0).find(".count").html(`(${comma(countArray[i].total_count)})`);
			}
		}			
	});
	table_resource.on("rowSelectionChanged", function(){
		let selectedData = table_resource.getSelectedData();
		const selectedItemOptimizeBtn = $("#selectedItemOptimizeBtn");
		const selectedItemUnbindBtn = $("#selectedItemUnbindBtn");
		//console.log(selectedData.length);
		if(selectedData.length > 0){
			selectedItemOptimizeBtn.prop("disabled", false);
			selectedItemUnbindBtn.prop("disabled", false);
		}else{
			selectedItemOptimizeBtn.prop("disabled", true);
			selectedItemUnbindBtn.prop("disabled", true);			
		}
	});

}

function countResourceFolderTraffic(data,startDate, endDate,year,month,day) {
	let result = "";
    let queryString = "";
    
    data.resource_status_array.forEach(status => {
        queryString += `&resource_status_array=${status}`;
    });
    
    data.resource_type_array.forEach(type => {
        queryString += `&resource_type_array=${type}`;
    });
    queryString += `&search_range=${data.search_range}`;
    queryString += `&search_keyword=${data.search_keyword}`;
    queryString += `&search_disable=${data.search_disable}`;
    queryString += `&search_page=${data.search_page}`;
    queryString += `&startDate=${startDate}`;
    queryString += `&endDate=${endDate}`;
    queryString += `&rgstr_yyyy=${year}`;
    queryString += `&rgstr_mm=${month}`;
    queryString += `&rgstr_dd=${day}`;
	//console.log(queryString);
	$.ajax({
		type: 'GET',
		url: '/countResourceFolderTraffic',
		data:queryString,
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