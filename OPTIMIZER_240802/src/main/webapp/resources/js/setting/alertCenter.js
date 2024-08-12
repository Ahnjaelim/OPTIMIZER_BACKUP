function main(){
	getAlert('1',null);
	getAlert('0',null);
}



/** JSP INIT**/
var selectedValue = $('input[name="resource_type"]:checked').val();

var currentDate_alert = new Date();

//년, 월, 일 추출
var currentYear_alert = currentDate_alert.getFullYear();
var currentMonth_alert = currentDate_alert.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줌

var selectYear = currentYear_alert;
var selectMonth =currentMonth_alert;

function alertCenterMain(){
	table_alert("alertCenter_new_alert",1);
	table_alert("alertCenter_old_alert",0);
	//getAlert_jsp('1',null);
	//updateDisplay();
	$('input[name="resource_type"]').change(function(){
	    selectedValue = $(this).val();
	    //table_alert("alertCenter_new_alert",1,selectedValue);
		table_alert("alertCenter_old_alert",0,selectedValue);
	});
	addBaro();
}




function updateDisplay(){
	$("#fc-dom-1").text(`${selectYear}년 ${selectMonth}월`);
	
	if(selectYear == currentYear_alert && selectMonth == currentMonth_alert){
		$("#next").prop("disabled", true);
	}else{
		$("#next").prop("disabled", false);
	}
	//getAlert_jsp('0',selectedValue);
}

function prevBtn(){
	if (selectMonth === 1) {
      selectMonth = 12;
      selectYear--;
  } else {
      selectMonth--;
  }
  updateDisplay();
}
function nextBtn(){
	if (selectMonth === 12) {
      selectMonth = 1;
      selectYear++;
  } else {
      selectMonth++;
  }
  updateDisplay();
}



function searchInit() {

	// statusArray 뿌리기
	let html = "";
	for(let i = 0; i < statusArray.length; i++){
		html += `<option value="${statusArray[i].value}">${statusArray[i].label}</option>`;
	}
	$("#search-status-select").html(html);
	resource_type_sumo = $('#search-status-select').SumoSelect({
		placeholder: '웹 콘텐츠 상태를 선택하세요',
		arrow: true,
	});
	// sumoselect 아이콘 수동 추가
	for(let i = 0; i < statusArray.length; i++){
		$(".search-container .SumoSelect>.optWrapper>.options li").eq(i).find("label").prepend(`<ion-icon name="${statusArray[i].icon}"></ion-icon> `);
	}
	
	html = `<input type="radio" class="btn-check" name="resource_type" id="type-array-item11" autocomplete="off" value="99" checked />
			<label class="btn btn-outline-primary" for="type-array-item11">전체 보기</label>`;
	// typeArray 뿌리기
	for(let i = 0; i < typeArray.length; i++){
		html += `<input type="radio" class="btn-check" name="resource_type" id="type-array-item${typeArray[i].value}" autocomplete="off" value="${typeArray[i].value}">
			<label class="btn btn-outline-primary" for="type-array-item${typeArray[i].value}"><i class="fas fa-${typeArray[i].icon}"></i> ${typeArray[i].label}</label>`;
	}
	$(".search-type").html(html);
	
	// searchCheckboxEvent("resource_status");
	/*searchCheckboxEvent("resource_type");
	searchMultiSelectEvent();*/
}

function addBaro(){
    var elements = $('.alertCenter-text');

    // 각 .alertCenter 클래스를 가진 요소들을 처리하는 함수
    elements.each(function() {
    	
    	$("#side-menu").empty();
    	
    	 document.querySelectorAll('.navbar-menu .active > a').forEach(function(element) {
             element.style.color = 'inherit';
             element.style.background = 'none'; 
             element.style.borderColor = '#343434';
         });
    	
        // 각 요소의 id와 텍스트를 사용하여 새로운 리스트 아이템을 생성합니다.
        let id = $(this).attr('id');
        let text = $(this).text();
        
        // 새로운 리스트 아이템 HTML을 생성합니다.
        let html = `
        <li class="menu-title" data-key="t-dashboards">Optimization AlertCenter</li>
        <li class="mm-active" >
                        <a href="/alertCenter">
                            <span class="menu-item" data-key="t-sales">알림센터</span>
                        </a>
                    </li>`;
        
        // 생성된 HTML을 #side-menu에 추가합니다.
        $("#side-menu").append(html);
    });
}


/** 탑바 getAlert( is_new,category)**/
function getAlert(is_new,category){
	
	$.ajax({
		type: 'Get',
		url: "/getAlert",
		data:{
			is_new:is_new,
			category:category
		},
		async: false,
		success: function(res) {
			res= res.data;
			
			
			if(res.length == 0 ){
				
				let html =`
					<div class="card p-2 mt-2 d-flex">
					<span class="d-flex justify-content-start align-items-center">
					    <img src="${contextPath}/resources/img/new-bell.png" style="width: 20px; height: 20px; margin-right: 10px;" />
					    	확인할 알림이 없습니다 !
					</span>
					</div>
					`;
				if(is_new ==1){
					$("#alram-number").hide();
					$("#newAlert").append(html);
					$("#alram-number").text(res.length);
				}else{
					$("#prevAlert").append(html);
				}
			}
			else if( is_new == 1){
				
				$("#alram-number").text(res.length);
				for (var i = 0; i < res.length; i++) {
					
					let html =`
						<div class="card p-2 mt-2 d-flex">
						<span class="d-flex justify-content-start">
						    ${setCategoryIcon(res[i].category)}
						    	${res[i].content}
						</span>
						</div>
						`;
					
					$("#newAlert").append(html);
					
					if(i ==2 ) {break;}
				}
			}else if(is_new ==0){
				
				for (var i = 0; i < res.length; i++) {
					
					let html =`
						<div class="card p-2 mt-2 d-flex">
						<span class="d-flex justify-content-start">
						    ${setCategoryIcon(res[i].category)}
						    	${res[i].content}
						</span>
						</div>
						`;
					
					$("#prevAlert").append(html);
					
					if(i ==2 ){ break;}
				}
			}
			
			
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
}


function table_alert(name,is_new,category){
	
	if(category ===undefined || category ==0){
		category = null;
	}
	
	let html =`
		<span class="d-flex justify-content-center" style="font-weight:normal; font-size: 15px;">
		    <ion-icon name="alert-circle-outline"></ion-icon>
		    	확인할 알림이 없습니다 !
		</span>		
		`;
	
	
	table_resource = new Tabulator("#"+name, {
		selectable:false,
	    pagination:true, //enable pagination
	    paginationMode:"remote", //enable remote pagination
	    paginationSize:10,
	    sortMode: "remote",
	    headerVisible: true,
	  //setup cells to work as a spreadsheet
	    columnDefaults:{
	        headerSort:false,
	          // 헤더를 보이지 않게 설정
	    },
	    ajaxURL:"/getAlert_page", //set url for ajax request
	    ajaxParams:{
	    	is_new:is_new,
			category:category,
	    },
	    placeholder:html,
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
	                    "Prev": "이전"
	                }
	            },
	        }
	    },	    
	    ajaxContentType : "application/json; charset=utf-8",
	    ajaxContentType:"json",
	    ajaxResponse:function(url,prarm,response){
	    	
	    	let cleanedContent = '';
	    	for(let i=0;i<response.data.length;i++){
	    	let	responseContent = response.data[i].content;
	    	let title = responseContent.split(']');
	    	cleanedContent = title.map(item => item.trim().replace(/^\[/, '').trim());
		
	    	response.data[i].category2 = response.data[i].category;
            response.data[i].category = setCategoryIcon(response.data[i].category);
	    	response.data[i].title = cleanedContent[0];
	    	response.data[i].content = cleanedContent[1];
	    	
	    	}
	 
	    	if(response.list_cnt && is_new ===1){
	    		$("#newCnt").text(response.list_cnt);
	    		/*document.querySelector('.tabulator-paginator').style.display = '';*/
	    	}else if(response.list_cnt && is_new ===0){
	    		$("#prevCnt").text(response.list_cnt);
	    		/*document.querySelector('.tabulator-paginator').style.display = 'none';*/
	    	}else if(!response.list_cnt){
	    		if(is_new===1){
	    			$("#newCnt").text(0);
	    		}else{
	    			$("#prevCnt").text(0);
	    		}
	    	}
	    	var readBtn = document.getElementById("readBtn");
	    	
	    	
	    	if(readBtn.children.length == 0&& is_new!=0 &&response.data.length !== 0 && response.data !=null){
	    		
	    		var btn = `<button type="button" class="btn py-1" style="background-color:#8E5FB7; color:white;" onclick="updateAlert()">전체 읽음</button>`
	    			$("#readBtn").append(btn);
	    	}
	    	
	    	return response; 
	    },
	    layout: "fitColumns",
	    columns: [
	    	/*{
	    		title: "확인 상태",
	    		field: "is_new",
	    		resizable:false,
	    		headerHozAlign: "center",
	    		hozAlign:"center",
	    		 widthGrow: 0.1, // 비율로 너비 조정
	    		formatter: function(cell, formatterParams, onRendered) {
	    			 	let alarm_no = cell.getRow().getData().alarm_no; // 각 알림의 고유 ID 가져오기
	    		        let confirm = cell.getValue();
	    		        
	    		        if(confirm === 1) {
	    		            return `<p style="color: #fcff5d;">NEW</p>`;
	    		        } else {
	    		        	return `<p class="p-0 m-0" style="color: gray; font-size: 12px;"><img src="${contextPath}/resources/img/category-icons/checked-green.png" style="width: 15px; height: 15px; margin-right: 5px;" />읽음</p>`
	    		        }
	    				
	    		}
	    	
	    		
	    	},*/
	    	{
	    		title: "등록일자",
	    		field: "rgtr_dt",
	    		resizable:false,
	    		headerHozAlign: "center",
	    		hozAlign:"left",
	    		   widthGrow: 0.7, // 비율로 너비 조정
	    		 formatter: function (cell, formatterParams, onRendered) {
	    			  let date = cell.getValue();
	    			  return `
	    		       <div class="timeline-container">
                <div class="timeline-line"></div>
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">${date}</div>
                </div>
            </div>`;
	              }
	    
	         },
	    	{
	    		title: "알림 유형",
	    		field: "category",
	    		hozAlign:"left",
	    		resizable:false,
	    		headerHozAlign: "center",
	    		 widthGrow: 0.6, // 비율로 너비 조정
	    		formatter: function(cell, formatterParams, onRendered) {
	    			
	    				let rowData = cell.getRow().getData();
	    		        let category = rowData.category;
	    		        let title = rowData.title;
	    	        return `<div>${category} ${title}</div>`;
	    		}	
	    	},
	    	{
	    		title: "사이트명",
	    		field: "siteName",
	    		hozAlign:"center",
	    		resizable:false,
	    		visible: false,
	    		headerHozAlign: "center",
	    		 widthGrow: 0.6, // 비율로 너비 조정
	    		formatter: function(cell, formatterParams, onRendered) {
	    			
	    				let rowData = cell.getRow().getData();
	    				let content = rowData.content;
	    				let category = rowData.category2;
	    				
	    				// 정규식을 사용하여 "사이트명" 추출
	    				let siteNameMatch = content.match(/^(.*?)\s사이트/);
	    				let siteName = "";
	    				if (siteNameMatch && siteNameMatch[1] && category===2 || category===4) {
	    				   siteName = siteNameMatch[1];
	    				   /*console.log(siteName); // 추출된 사이트명 출력
*/	    				} else {
	    					siteName = ""; // 사이트명이 없으면 빈 문자열
	                        cell.getElement().classList.add("hidden-cell"); 
	    				}
	    				
	    				return `<div>${siteName}</div>`;
	    		}	
	    	},
	    	{
	    		title: "알림 내용",
	    		field: "content",
	    		hozAlign:"left",
	    		headerHozAlign: "center",
	    		resizable:false,
	    		 widthGrow: 3, // 비율로 너비 조정
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let rowData = cell.getRow().getData();
	    		    let category2 = rowData.category2;
	    		    
	    		    let content = rowData.content;
	    		    let siteName = "";
	    		    let englishPart = "";
	    		    let numberPart = "";
	    		    let siteNameMatch = content.match(/^(.*?)\s사이트/);
	    		    if (siteNameMatch && siteNameMatch[1]) {
                        siteName = siteNameMatch[1];

                        // 영어 문자열 추출
                        let englishPartMatch = content.match(/사이트의\s([a-zA-Z0-9._-]+)/);
                        if (englishPartMatch && englishPartMatch[1]) {
                            englishPart = englishPartMatch[1];
                            // 영어 부분 강조
                            content = content.replace(englishPart, `<span style="color: yellow; font-weight: bold;">${englishPart}</span>`);
                        }
                        
                        // 숫자 문자열 추출
                        let numberPartMatch = content.match(/요청이\s([\d.]+[a-zA-Z]*)/);
                        if (numberPartMatch && numberPartMatch[1]) {
                            numberPart = numberPartMatch[1];
                            // 숫자 부분 강조
                            content = content.replace(numberPart, `<span style="color: #FFA059; font-weight: bold;">${numberPart}</span>`);
                        }

                        // 사이트명을 제거한 나머지 문자열
                        content = content.replace(siteName, "").trim();
                    }
	    		    let formattedContent = content;
	    		    
	    		    
	    		   if(rowData.is_new==0) {
	    			   switch(category2) {
		    		    case 1 : return `<div class="color-line" style="background-color: #ff9999; opacity: 0.7;"></div><div class="text-highlight mx-2"></div><div style="margin-left: 15px; color: #ffd4d4; opacity: 0.7;">${formattedContent}</div>`; break;
		    		    case 2 : return `<div class="color-line" style="background-color: #3FA8E9; opacity: 0.7;"><div class="text-highlight mx-2" style="background-color: #3FA8E9; opacity: 0.3;"></div><div style="margin-left: 15px; color: white;">${formattedContent}</div>`; break;
		    		    case 3 : return `<div class="text-highlight mx-2" style="background-color: #FFCFB5; opacity: 0.7;"></div><div style="margin-left: 15px; color: white; opacity: 0.7;">${formattedContent}</div>`; break;
		    		    case 4 : return `<div class="color-line" style="background-color: #FFA059; opacity: 0.7;"><div class="text-highlight mx-2"></div><div style="margin-left: 15px; color: #fff2cc;">${formattedContent}</div>`; break;
		    		    case 5 : return `<div class="text-highlight mx-2" style="background-color: #FFCFB5; opacity: 0.7;"></div><div style="margin-left: 15px; color: #white;">${formattedContent}</div>`; break;
		    		    case 6 : return `<div class="text-highlight mx-2" style="background-color: #FFCFB5; opacity: 0.7;"></div><div style="margin-left: 15px; color: #white;">${formattedContent}</div>`; break;
		    		    default:
		    				break;
		    		    }   
	    		   }else {
	    			   switch(category2) {
		    		    case 1 : return `<div class="color-line" style="background-color: #ff9999;"></div><div class="text-highlight mx-2"></div><div style="margin-left: 15px; color: #ffd4d4;">${formattedContent}</div>`; break;
		    		    case 2 : return `<div class="color-line" style="background-color: #3FA8E9;"><div class="text-highlight mx-2" style="background-color: #3FA8E9; opacity: 0.3;"></div><div style="margin-left: 15px; color: white;">${formattedContent}</div>`; break;
		    		    case 3 : return `<div class="text-highlight mx-2" style="background-color: #FFCFB5;"></div><div style="margin-left: 15px; color: white;">${formattedContent}</div>`; break;
		    		    case 4 : return `<div class="color-line" style="background-color: #FFA059;"><div class="text-highlight mx-2"></div><div style="margin-left: 15px; color: #fff2cc;">${formattedContent}</div>`; break;
		    		    case 5 : return `<div class="text-highlight mx-2" style="background-color: #FFCFB5;"></div><div style="margin-left: 15px; color: #white;">${formattedContent}</div>`; break;
		    		    case 6 : return `<div class="text-highlight mx-2" style="background-color: #FFCFB5;"></div><div style="margin-left: 15px; color: #white;">${formattedContent}</div>`; break;
		    		    default:
		    				break;
		    		    }   
	    		   }
	    		    
	    		    //1:장애 알림, 2:작업 완료 알림 3.일일 요약 4:리소스 사용 경고 5:속도 6:비용
	    		     			
	    			
	    			/*let highlightedValue = '<span style="color: yellow;">' + value + '</span>';
	    			return highlightedValue;*/
	    		}
	    	
	    	},
	    	
	    ]
	    ,
	    rowFormatter: function(row) {
	        // 각 로우의 높이 조정
	        // row.getElement().style.height = "50px"; // 원하는 높이(px)로 설정
	    }
	});	

}



/** jsp getAlert( is_new,category)**/
function getAlert_jsp(is_new,category){
	$('#alertCenter_old_alert').empty();
	if(category == 0){category = null};
	$.ajax({
		type: 'Get',
		url: "/getAlert",
		data:{
			is_new:is_new,
			category:category,
			selectYear:selectYear,
			selectMonth:selectMonth
		},
		async: true,
		success: function(res) {
			res= res.data;
			if(res.length == 0 ){
				
				let html =`
					<div class="card large-card">
						<div class="card-body d-flex align-items-center">
							<img src="${contextPath}/resources/img/new-bell.png" style="width: 25px; height: 25px; margin-left: 10px;" />
								<span class="alert-content">확인할 알림이 없습니다 !</span>
						</div>
					</div>
					`;
				
				if(is_new ==1){
					$("#alertCenter_new_alert").append(html);
					
				}else{
					$("#alertCenter_old_alert").append(html);
				}
			}
			else if(is_new == 1){
				
				$("#alram-number").text(res.length);
				for (var i = 0; i < res.length; i++) {
					
					let html =`
						<div class="card large-card">
							<div class="card-body d-flex align-items-center">
								${setCategoryIcon(res[i].category)}
							    	${res[i].content}
									<span class="alert-content-date">${res[i].rgtr_dt}</span> 
							</div>
						</div>
						
						`;
					
					$("#alertCenter_new_alert").append(html);
					
					
				}
			}else if(is_new ==0){
				
				for (var i = 0; i < res.length; i++) {
					
					let html =`
						<div class="card large-card">
						<div class="card-body d-flex align-items-center">
							${setCategoryIcon(res[i].category)}
						    	${res[i].content}
								<span class="alert-content-date">${res[i].rgtr_dt}</span> 
							</div>
						</div>
						`;
					
					$("#alertCenter_old_alert").append(html);
					
					
				}
			}
			
			updateAlert();
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
}



//1:이미지, 2:동영상 3.텍스트 4:폰트 5 속도 6 비용
function setCategoryIcon(category){
	
	switch (category) {
	case 1:
			return `<img src="${contextPath}/resources/img/category-icons/alert-alram.png" style="width: 28px; height: 28px; margin-right: 10px;" />`;
		break;
	case 2:
			return `<img src="${contextPath}/resources/img/category-icons/checked.png" style="width: 18px; height: 18px; margin-right: 10px;" />`;
		break;
	case 3:
		return `<img src="${contextPath}/resources/img/category-icons/blank-page.png" style="width: 20px; height: 20px; margin-right: 14px;" />`;
		break;
	case 4:
		return `<img src="${contextPath}/resources/img/category-icons/warning.png" style="width: 20px; height: 20px; margin-right: 10px;" />`;
		break;
	case 5:
		return `<img src="${contextPath}/resources/img/category-icons/speed.png" style="width: 25px; height: 25px; margin-right: 10px;" />`;
		break;
	case 6:
		return `<img src="${contextPath}/resources/img/category-icons/coin.png" style="width: 25px; height: 25px; margin-right: 10px;" />`;
		break;

	default:
		break;
	}
}



function updateAlert(){
	
	/*alertify.confirm('신규 알림 확인', '신규 알림 전체를 읽음처리하시겠습니까?',
			function(){ 
		
		$.ajax({
			type: 'Get',
			url: "/updateAlert",
			data:{
				
			},
			async: false,
			success: function(res) {
							
			},
		    error: function onError (error) {
		        console.error(error);
		    }
		});
	    alertify.success('전체 읽음 처리를 완료했습니다.');
	    alertCenterMain();
	    var checkBtn = document.getElementById("checkBtn");
	    if(checkBtn){checkBtn.remove()};
	    getAlert('1',null);
		getAlert('0',null);
		}
    , function(){ alertify.error('사용자가 "아니오"를 선택했습니다');
    return});*/
	
	
	
	
	Swal.fire({
        icon: 'warning',
        /*title: '사용자 삭제',*/
        text: '신규 알림 전체를 읽음 처리 하시겠습니까?',
        showCancelButton: true,
        confirmButtonColor: '#51d28c',
        cancelButtonColor: '#f34e4e',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            text: 'custom-swal-text',
        },
        showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster',
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOut animate__faster',
        },
    }).then((result) => {
   	 if (result.isConfirmed) {
   		
   			
   			$.ajax({
   				type: 'Get',
   				url: "/updateAlert",
   				data:{
   					
   				},
   				async: false,
   				success: function(res) {
   								
   				},
   			    error: function onError (error) {
   			        console.error(error);
   			    }
   			});
   		    alertify.success('전체 읽음 처리를 완료했습니다.');
   		    alertCenterMain();
   		    var checkBtn = document.getElementById("checkBtn");
   		    if(checkBtn){checkBtn.remove()};
   		    getAlert('1',null);
   			getAlert('0',null);
   			}
        
    });
	
	
}

function getAlertAjax(is_new,category){
	let result = "";
	$.ajax({
		type: 'Get',
		url: "/getAlert",
		data:{
			is_new:is_new,
			category:category
		},
		async: false,
		success: function(res) {
			result = res;
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	return result;
}


function confirmUpdateAlert(alarm_no) {
    $.ajax({
        type: 'POST',
        url: "/confirmUpdateAlert",
        data: { alarm_no: alarm_no },
        success: function(res) {
            if (res > 0) {
                alertify.success('읽음 처리를 완료했습니다.');
            } else {
                alertify.error('읽음 처리에 실패했습니다. 다시 시도해 주세요.');
            }
        },
        error: function onError(error) {
            console.error(error);
        }
    });
    alertCenterMain();
    var confirmBtn = document.getElementById("confirmBtn");
    if(confirmBtn){confirmBtn.remove()};
    getAlert('1',null);
	getAlert('0',null);
}

