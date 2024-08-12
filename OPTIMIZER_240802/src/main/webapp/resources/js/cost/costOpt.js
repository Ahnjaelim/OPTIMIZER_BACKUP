const statusArray = [
	{value : 1, label : "최적화 완료", icon : "check-circle"},
	{value : 0, label : "최적화 대기", icon : "hourglass-start"},
	{value : 11, label : "최적화 진행 중", icon : "hourglass-half"},
	{value : -1, label : "최적화 미적용", icon : "minus-circle"},
	{value : 2, label : "최적화 해제", icon : "circle-xmark"},
	{value : 3, label : "없음", icon : "question-circle"},	
];

const typeArray = [
	{value : 1, label : "이미지", icon : "image"},
	{value : 2, label : "동영상", icon : "video"},
	{value : 3, label : "텍스트", icon : "code"},
	{value : 4, label : "폰트", icon : "font"},
];

function main(){
	
	
 
 setBox();
 drawContentTable();
 getChartCostByResource();
}


function drawCostChart(data){
	const ctx = document.getElementById('costChart');
    
    new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
        	maintainAspectRatio: false, // false로 설정하여 차트의 가로세로 비율 유지 해제
    	    aspectRatio: 2, // 가로세로 비율을 지정
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 50,
                    suggestedMax: 100,
                    pointLabels: {
                        color: 'white' // 축 레이블(라벨) 색상을 흰색으로 변경
                    },
                    ticks: {
                        color: 'white', // 축 눈금 색상을 흰색으로 변경
                        backdropColor: 'rgba(0, 0, 0, 0)' // 눈금 배경 색상 투명으로 설정
                    },
                    angleLines: {
                    	color: 'rgba(255, 255, 255, 0.5)', // 축 눈금 색상을 반투명 흰색으로 변경
                        backdropColor: 'rgba(0, 0, 0, 0)' // 눈금 배경 색상 투명으로 설정
                    
                    },
                    grid: {
                    	color: 'rgba(255, 255, 255, 0.5)', // 축 눈금 색상을 반투명 흰색으로 변경
                        backdropColor: 'rgba(0, 0, 0, 0)' // 눈금 배경 색상 투명으로 설정
                    
                    }
                }
            },
          elements: {
            line: {
              borderWidth: 3
            }
          },
          plugins: {
              legend: {
                  labels: {
                      color: 'white' // 범례 텍스트 색상을 흰색으로 변경
                  }
              },
              title: {
                  display: true,
                  text: '웹 컨텐츠 유형별 예상 절감액',
                  color: 'white' // 차트 제목 색상을 흰색으로 변경
              }
          },
          
        },
    });
}



function setBox(){
	var currentDate = new Date();
	var year = currentDate.getFullYear();
	var month = currentDate.getMonth() + 1;
	
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
			
			all_cnt =comma(all_cnt);
			opt_cnt = comma(opt_cnt);
			unOpt_cnt = comma(unOpt_cnt);
			
			org_size_all = calcCostNew(org_size_all);
			opt_size_all = calcCostNew(opt_size_all);
			
			let opt_size_org = comma(opt_size_all);
			opt_size_all = comma((org_size_all - opt_size_all).toFixed(2));
			org_size_all = comma(org_size_all);
			
			if(selectContentsList <= 0){

				$("#opt_contents").html(`<span style="color:gray;">데이터가 없습니다.</span>`);
				$("#unopt_contents").html(`<span style="color:gray;">데이터가 없습니다.</span>`);
				$("#origin_cost").html(`<span style="color:gray;">데이터가 없습니다.</span>`);
				$("#aft_otpCost").html(`<span style="color:gray;">데이터가 없습니다.</span>`);
				
			}else{
				$("#opt_contents").html(`<span style="color:#038edc;">${opt_cnt}<span style="color:#5A5A5A">/${all_cnt}건</span></span>`);
				$("#unopt_contents").html(`<span style="color:#f34e4e;">${unOpt_cnt}<span style="color:#5A5A5A">/${all_cnt}건</span></span>`);
				$("#origin_cost").html(`<span>${org_size_all}<span style=""> 원</span></span>`);
				$("#aft_otpCost").html(`<span style="color:#038edc;">${opt_size_all}<span style=""> 원<br></span></span> <span class="save">(${opt_size_org}원 절약 예상)</span>`);
				
			}			
			
		
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	
}





function searchInit() {

	// statusArray 뿌리기
	let html = "";
	for(let i = 0; i < statusArray.length; i++){
		html += `<li>
			<input type="checkbox" name="resource_status" class="btn-check" id="status-array-item${i}" autocomplete="off" value="${statusArray[i].value}">
			<label class="btn btn-outline-primary" for="status-array-item${i}">
				<p class="icon"><i class="fas fa-${statusArray[i].icon}"></i></p>
				<p>${statusArray[i].label}</p>			
			</label>
		</li>`;
	}
	$(".search-status").html(html);
	
	html = "";
	// typeArray 뿌리기
	for(let i = 0; i < typeArray.length; i++){
		html += `<li>
			<input type="checkbox" name="resource_type" class="btn-check" id="type-array-item${i}" autocomplete="off" value="${typeArray[i].value}">
			<label class="btn btn-outline-primary" for="type-array-item${i}">
				<p class="icon"><i class="fas fa-${typeArray[i].icon}"></i></p>
				<p>${typeArray[i].label}</p>
			</label>
		</li>`;
	}
	$(".search-type").html(html);
	
	searchCheckboxEvent("resource_status");
	searchCheckboxEvent("resource_type");
}
function searchCheckboxEvent(inputName){
    $(`input[name="${inputName}"]`).change(function(){        
        // 체크된 체크박스의 value와 label 가져오기
        const checkedValue = $(this).val();
        const checkedLabel = $(`label[for="${$(this).attr('id')}"]`).text();
        
        // 체크박스가 체크되었는지 확인
        const isChecked = $(this).prop('checked');
        
        // 다른 엘리먼트에 버튼 추가 또는 제거
        if (isChecked) {
            const buttonHtml = `<button class="remove-button btn btn-primary-subtle btn-rounded" data-checkbox-id="${$(this).attr('id')}">${checkedLabel} <ion-icon name="close-outline"></ion-icon></button>`;
            $('.filter-button-container').append(buttonHtml);
            drawContentTable();
        } else {
            // 해당 value를 가진 버튼 제거
            $(`.remove-button[data-checkbox-id="${$(this).attr('id')}"]`).remove();
            drawContentTable();
        }
    });
    
    // 추가된 버튼에 이벤트 리스너 추가
    $(document).on('click', '.remove-button', function(){
        const checkboxId = $(this).data('checkbox-id');
        // 해당 아이디를 가진 체크박스의 체크 해제
        $(`#${checkboxId}`).prop('checked', false);
        // 버튼 제거
        $(this).remove();
        drawContentTable();
        
    });	
    
}
function filterResetBtnEvent(){
	$('.remove-button').remove();
	$('.search-criteria-filter input[type="checkbox"]').prop('checked', false);
	drawContentTable();
}

function drawContentTable(){
	year = 0;
	month = 0;
	
	// 선택된 요소의 값을 저장할 변수
	let selectedValues = [];

	// btn-check 클래스를 가진 input 요소를 선택
	var checkboxes = document.querySelectorAll('.btn-check');

	// 각 체크박스를 순회하면서 선택된 체크박스의 값을 배열에 추가
	checkboxes.forEach(function(checkbox) {
	  if (checkbox.checked) {
	    selectedValues.push(checkbox.value);
	  }
	});
	
	

	
	selectedValues = selectedValues.map(function(str) {
	  return parseInt(str, 10);
	});
	
	console.log(selectedValues);
	
	table_resource = new Tabulator("#contentTable", {
		selectable:true,
	    pagination:true, //enable pagination
	    paginationMode:"remote", //enable remote pagination
	    sortMode: "remote",
	    ajaxURL:"/selectAllResourceByStatus", //set url for ajax request
	    ajaxParams:{
	    	rgstr_yyyy:year,
	    	rgstr_mm:month,
			resource_type_arr : selectedValues,
			resource_status: -1
	    },	    
	    paginationSize:10, //optional parameter to request a certain number of rows per page
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
	                    "Prev": "이전",
	                }
	            },
	        }
	    },	    
	    ajaxContentType : "application/json; charset=utf-8",
	    ajaxContentType:"json",
	    ajaxResponse:function(url,prarm,response){

	    	
	    	
	    	
	    	for (var i = 0; i < response.data.length; i++) {
	    		if(response.data[i].resource_status === 1){
	    			response.data[i].bfOptCost = calcCostNew(response.data[i].resource_org_size * response.data[i].resource_call_cnt * getCloud_payment(response.data[i].cloud_no));
	    			response.data[i].aftOptCost = calcCostNew(response.data[i].resource_new_size_type2 * response.data[i].resource_call_cnt* getCloud_payment(response.data[i].cloud_no));
	    			response.data[i].saveCost = response[i].aftOptCost - response[i].bfOptCost;
		    	}else{
		    		
		    		response.data[i].bfOptCost = calcCostNew(response.data[i].resource_org_size * response.data[i].resource_call_cnt* getCloud_payment(response.data[i].cloud_no));
		    	}
			}
	    	return response;
	    },
	    paginationInitialPage: 1,
	    layout: "fitColumns", 
	    columns: [
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
	        {title:"예상 최적화 용량", field:"resource_new_size_type2", width:200, hozAlign:"right",resizable:false,
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
	        {title:"최적화 전 비용", field:"bfOptCost",width:200, hozAlign:"right",resizable:false,
	        	 formatter: function(cell, formatterParams, onRendered) {
	        		 return comma(cell.getValue())+'원';
	        	 }},
	        {title:"최적화 후 예상 비용", field:"aftOptCost",width:200 ,hozAlign:"right",resizable:false,
	        	 formatter: function(cell, formatterParams, onRendered) {
	        		 var data = cell.getData("data");
	        		 
	        		 if(data.resource_status ===1){
	        			 return comma(cell.getValue())+'원';
	        		 }else{
	        			 return `<p style="color:gray; margin-bottom:0px; padding:0px;">
	        			${comma(calcCostNew(data.resource_org_size*3/10*data.resource_call_cnt * getCloud_payment(data.cloud_no)))}원 (예상)</p>`;
	        		 }
	        	     
	        	 }},
	        	 ,{title:"예상 절감 비용", field:"expSaveCost",width:150,hozAlign:"right",resizable:false,
	        	 formatter: function(row, formatterParams, onRendered) {
	        		 
	        		 	var data = row.getData("data");
	        		 	var bfOptCost = parseFloat(data["bfOptCost"]);
	        	        var aftOptCost = parseFloat(calcCostNew(data.resource_org_size*3/10*data.resource_call_cnt * getCloud_payment(data.cloud_no)));
	        	        var expSaveCost= "";
	        	      
	        	        
	        	        
	        	        if(parseInt(data["resource_status"])!== 1){
	        	        	if(bfOptCost ===0 && aftOptCost ===0){
	        	    			return `<p style="color:gray; margin-bottom:0px; padding:0px;">
	        	    			0 원 (0%)</p>`;
	        	    		}
	        	        	
	        	        	expSaveCost = 
	        	        		`<p style="color:#f34e4e; margin-bottom:0px; padding:0px;">
	        	        		<i class="bx bxs-caret-up-circle" style="color:red;"></i>
	        	        		${comma((bfOptCost-aftOptCost).toFixed(2))} 원(${Math.round((bfOptCost-aftOptCost)/bfOptCost * 100 )}%)
	        	        		</p>`;
	        	        		
	        	        }
	        	        
	        	        
	        	        return expSaveCost;
	        	    }	
	        },
	    ]
	});	
}



function getChartCostByResource(){
	var start_Date = 0 ;
	var end_Date = 0 ;
	var currentDate = new Date();
	var year = currentDate.getFullYear();
	var month = currentDate.getMonth() + 1;
	
	let data =[]
	$.ajax({
		type: 'POST',
		url: '/getChartCostByResource',
		data:{
			startDate:start_Date,
			endDate:end_Date,
			rgstr_yyyy:parseInt(year),
			rgstr_mm:parseInt(month),	
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
			    acc[key] = { category: key, all: 0 , opt:0 };
			  }
			  
			  if(item.resource_status >0){
				  acc[key].opt += item.resource_new_size_type2 * item.resource_call_cnt* getCloud_payment(item.cloud_no) ;
			  }
			  acc[key].all += item.resource_org_size * item.resource_call_cnt * getCloud_payment(item.cloud_no);  
			  
			  
			  

			  return acc;
			}, {});

			// groupedData를 배열로 변환
			data = Object.values(groupedData);
			for (var i = 0; i < data.length; i++) {
				data[i].opt = calcCostNew(data[i].all-data[i].opt);
				data[i].all = calcCostNew(data[i].all);
			}
			
			var labels = [];
			var all = [];
			var opt = [];
			
			data.forEach(function(item) {
			    labels.push(item.category);
			    all.push(item.all);
			    opt.push(item.opt);
			});

			console.log(data);
			
			
			let chartData = {
	                labels: labels,
	                datasets: [{
	                    label: '기존 비용',
	                    data: all,
	                    fill: true,
	                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
	                    borderColor: 'rgb(255, 99, 132)',
	                    pointBackgroundColor: 'rgb(255, 99, 132)',
	                    pointBorderColor: '#fff',
	                    pointHoverBackgroundColor: '#fff',
	                    pointHoverBorderColor: 'rgb(255, 99, 132)'
	                }, {
	                    label: '최적화 후 비용',
	                    data: opt,
	                    fill: true,
	                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
	                    borderColor: 'rgb(54, 162, 235)',
	                    pointBackgroundColor: 'rgb(54, 162, 235)',
	                    pointBorderColor: '#fff',
	                    pointHoverBackgroundColor: '#fff',
	                    pointHoverBorderColor: 'rgb(54, 162, 235)'
	                }]
	            };
			
			drawCostChart(chartData);
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
}

