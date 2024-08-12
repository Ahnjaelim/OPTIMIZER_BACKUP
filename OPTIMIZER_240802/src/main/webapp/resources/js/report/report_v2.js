const reportUtil = new ReportUtil();
let slowTable ="";
let fastTable ="";
let accordionCount = 1;
const UNOPTIMIZED = `<span style="color:rgba(255,255,255,0.3);">최적화 전</span>`;
const UNCHECKED = `<span style="color:rgba(255,255,255,0.3);">측정 전</span>`;
const CHECKING = `<span style="color:rgba(255,255,255,0.3);">측정 전</span>`;
const ERROR = `<span style="color:rgba(255,255,255,0.3);"><ion-icon name="alert-circle-outline"></ion-icon> 오류</span>`;


function rp_main(){
	
	sumo();
	addBaroGa();
	
	getCurrentDateTime(); //시간
	getSite();
	drawChart();//웹 콘텐츠 최적화 현황
	getAllWebContent();//전체 콘텐츠 목록

	//2.측정항목
	//getUrlAndCapture();
	//fetchData();
	selectAvgComp();
	
	
	selectComptable();
	drawTimeTableSlow(); //정형에서는 용량
	drawTimeTableFast();
	
	//
	
	getOptimizer();
	
	
}


async function getSite() {
	
    try {
        const res = await $.ajax({
            type: 'GET',
            url: '/selectSite',
            data: {},
        });
      
       
       $("#site_address").text(res.data[0].site_address);
       $("#site_name").text(res.data[0].site_name);
       
    } catch (error) {
        console.error('Error fetching URL:', error);
        throw error;
    }
}


function download(){
$('#preLoader').fadeIn(300);	
    
	// 모든 canvas 요소를 선택합니다.
    const canvases = document.querySelectorAll('canvas');
    const canvasDataUrls = Array.from(canvases).map(canvas => ({
        id: canvas.id,  // canvas의 id
        dataUrl: canvas.toDataURL('image/png')
    }));

//    // img 요소의 데이터 URL과 id를 수집합니다.
//    const imgs = document.querySelectorAll('img');
//    const imgDataUrls = Array.from(imgs).map(img => ({
//        id: img.id,  // img의 id
//        dataUrl: img.src
//    }));

	
	
    console.log("download");
 // AJAX 요청 보내기
    fetch('/reportDownload_v2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            canvasImages: canvasDataUrls,
//            imgImages: imgDataUrls
        })
    })
    .then(response => response.blob())
    .then(blob => {
        // 현재 날짜를 가져와서 형식에 맞게 변환
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        
        const filename = `OPTIMIZER 비정형 파일 최적화 보고서_${year}_${month}_${day}.xlsx`;

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();

        $('#preLoader').fadeOut(300);
    })
    .catch(error => console.error('파일 다운로드 오류:', error));
	
	$('#preLoader').fadeIn(300);	
    
	
//    // img 요소의 데이터 URL과 id를 수집합니다.
//    const imgs = document.querySelectorAll('img');
//    const imgDataUrls = Array.from(imgs).map(img => ({
//        id: img.id,  // img의 id
//        dataUrl: img.src
//    }));

	
	
}
/*
function addBaroGa(){
	
    var elements = $('.mCha');
    var downloadBtn = `<div id ="download">
								<button id ="downloadBtn" class="btn btn-outline-info" onclick="download()"> 엑셀 다운로드 </button>
							</div>`;
   
    
    // 각 .mCha 클래스를 가진 요소들을 처리하는 함수
    elements.each(function() {
        // 각 요소의 id와 텍스트를 사용하여 새로운 리스트 아이템을 생성합니다.
        let id = $(this).attr('id');
        let text = $(this).text();
        
        // 새로운 리스트 아이템 HTML을 생성합니다.
        let html = `<li>
                        <a href="#" id="${id}_side" onclick="scrollToTarget('${id}'); return false;"> <!-- return false를 추가하여 href="#" 클릭 시 페이지 상단으로 이동하는 기본 동작을 막습니다. -->
                            <span class="menu-item" data-key="t-sales">${text}</span>
                        </a>
                    </li>`;
        
        // 생성된 HTML을 #side-menu에 추가합니다.
        $("#navmenu").append(html);
    });
    $("#navmenu").append(downloadBtn);
    
    
    $('#navmenu li').click(function() {
        // 기존 하이라이트 제거
        $('#navmenu li').removeClass('baro');
        
        // 클릭된 항목에 하이라이트 추가
        $(this).addClass('baro');
        
        // 스크롤 시 해당 섹션으로 이동
        //let id = $(this).attr('id').replace('_side', '');
//        $('html, body').animate({
//            scrollTop: $(`#${id}`).offset().top
//        }, 500);
    });
    // 스크롤 이벤트를 감지하여 메뉴 아이템 하이라이트 처리
//    $(window).scroll(function() {
//        var scrollPosition = $(window).scrollTop();
//
//        // 각 .mCha 요소들을 순회하면서 현재 보고 있는 섹션을 파악합니다.
//        $('.mCha').each(function() {
//            let id = $(this).attr('id');
//            let element = document.getElementById(id);
//
//            if (element) {
//                // 현재 보고 있는 섹션의 상단 위치와 높이를 가져옵니다.
//                let top = $(element).offset().top;
//                let height = $(element).outerHeight();
//
//                // 현재 보고 있는 섹션을 판별합니다.
//                if (scrollPosition >= top ) {
//                    // 메뉴 아이템에 활성화 클래스를 추가하여 하이라이트 효과를 줍니다.
//                    $('#navmenu li').removeClass('baro');
//                    $(`#${id}_side`).parent().addClass('baro');
//                }
//            }
//        });
//    });
}
*/


function addBaroGa(){
	
    var elements = $('.mCha');
    var downloadBtn = `<div id ="download">
								<button id ="downloadBtn" class="btn btn-outline-info" onclick="download()"> 엑셀 다운로드 </button>
							</div>`;
   
    /*
    elements.each(function() {
        let id = $(this).attr('id');
        let text = $(this).text();
        let html = `<li>
                        <a href="#" id="${id}_side" onclick="scrollToTarget('${id}'); return false;"> <!-- return false를 추가하여 href="#" 클릭 시 페이지 상단으로 이동하는 기본 동작을 막습니다. -->
                            <span class="menu-item" data-key="t-sales">${text}</span>
                        </a>
                    </li>`;
        $("#navmenu").append(html);
    });
    
    */
    
    $("#navmenu").append(downloadBtn);
    
    
    $('#navmenu li').click(function() {
        // 기존 하이라이트 제거
        $('#navmenu li').removeClass('baro');
        
        // 클릭된 항목에 하이라이트 추가
        $(this).addClass('baro');
        
    });
}


function sumo(){
	 $('#search-type-1').SumoSelect({
         placeholder: '웹 콘텐츠 상태를 선택하세요',
        
     });
	 addIconsToSumoSelect();
};
function addIconsToSumoSelect() {
    var items = $(".SumoSelect .optWrapper .options li");
    

    items.each(function(index) {
        var $this = $(this);
        var value = $this.attr('data-val');
        
        if (index == 1) {
            $this.find('label').prepend('<ion-icon name="checkmark-circle"></ion-icon> ');
        } else if (index == 2) {
            $this.find('label').prepend('<ion-icon name="remove-circle"></ion-icon> ');
        }
    });
}




async function captureScreenshot(url) {

	const screenshotContainer = document.getElementById('captureArea');
	 screenshotContainer.innerHTML = '<div class="loader10"></div>';

	 
	if(url===null){$("#captureArea").html(`<h4>해당 조건에 맞는 데이터가 존재하지 않습니다.</h4>`); return;}
 	
 	
	//const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&t=${new Date().getTime()}`; //캐시 x
	const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true`; //캐시
	 console.log(url);
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        const screenshotUrl = data.data.screenshot.url;

        // 이미지 요소를 생성하여 화면에 추가
        const imgElement = document.createElement('img');
        imgElement.src = screenshotUrl;
        imgElement.alt = 'Captured Screenshot';
       // imgElement.style.maxWidth = '100%';
      //  imgElement.style.maxHeight = '300px';

        
        screenshotContainer.innerHTML = ''; // 기존의 내용을 지우고 새로운 이미지를 추가
        screenshotContainer.appendChild(imgElement);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function getUrl() {
    try {
        const res = await $.ajax({
            type: 'GET',
            url: '/getUrl',
            data: {},
        });
        
        if(res.data.length ==0 ){
        	return null;
        }
       
       
       let url = res.data[0].site_address+res.data[0].page_url;
       let page_url = res.data[0].page_url;
       let percent = "("+res.data[0].percent+"% 향상)";
       
       $("#page_url").text(page_url);
       $("#page_percent").text(percent);
        return url;
    } catch (error) {
        console.error('Error fetching URL:', error);
        throw error;
    }
}

async function getUrlAndCapture() {
    try {
        const url = await getUrl();
        await captureScreenshot(url);
    } catch (error) {
        console.error('Error capturing screenshot:', error);
    }
}



async function drawChart(){
	try {
        let contentChartData = await getContentChart();
        
        typeBarChart(contentChartData);
        contentChart("content_chart",contentChartData,null);
        contentChart("image_chart",contentChartData,'1');
        contentChart("video_chart",contentChartData,'2');
    	contentChart("text_content",contentChartData,'3');
    	contentChart("font_content",contentChartData,'4');
    	contentChart("hangule_chart",contentChartData,'5');
    	contentChart("word_chart",contentChartData,'6');
    	contentChart("excel_content",contentChartData,'7');
    	contentChart("ppt_content",contentChartData,'8');
    	contentChart("pdf_content",contentChartData,'9');
    } catch (error) {
        console.error('Error in fetchData:', error);
    }
	
}


function typeBarChart(data) {
	data =data.data;
    const ctx = document.getElementById('typeBarChart').getContext('2d');

    const labels = [];
    const opt_cnt = [];
    const unoptCntData = [];
    const percentData = [];

    for (let i = 0; i < data.length; i++) {
        labels.push(checkTypeKor(data[i].resource_type));
        opt_cnt.push(data[i].opt_cnt);
        unoptCntData.push(data[i].unopt_cnt);
        percentData.push(data[i].percent);
    }
    
    

    let barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
            	{
                    label: '최적화 적용 파일',
                    data: opt_cnt,
                    backgroundColor: 'rgba(92, 184, 92, 0.3)', // 밝은 초록색 (rgba(92, 184, 92, 0.7))
                    borderColor: 'rgba(92, 184, 92, 1)',
                    borderWidth: 1
                },
                {
                    label: '최적화 미적용 파일',
                    data: unoptCntData,
                    backgroundColor: 'rgba(217, 83, 79, 0.3)', // 밝은 빨간색 (rgba(217, 83, 79, 0.7))
                    borderColor: 'rgba(217, 83, 79, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
        	responsive: false,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1 // Y축 단위를 1씩 증가하도록 설정
                    }
                }
            },
            plugins: {
		          tooltip: {
		            enabled: false
		          },
		          centerText: {
		        	  text: ""
		          },
                datalabels: {
                    display: true,
                    align: 'end',
                    anchor: 'center',
                    formatter: (value, context) => {
                    	 const index = context.dataIndex;
                         const datasetLabel = context.dataset.label;
                    	
                    	if (datasetLabel === '최적화 적용 파일') {
                            return opt_cnt[index] !== 0 ? `${(opt_cnt[index] / data[index].all_cnt * 100).toFixed(0)}%` : '';
                        } else if (datasetLabel === '최적화 미적용 파일') {
                            return unoptCntData[index] !== 0 ? `${(unoptCntData[index] / data[index].all_cnt * 100).toFixed(0)}%` : '';
                        }
                        return '';
                    },
                    
                }
		          
            }
        },
        plugins: [ChartDataLabels]
    });
}
function selectAvgTime(){
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: '/selectAvgTimeGroup',
            data: {},
            success: function(res) {
                resolve(res);
                if(res.data){
                	for (var i = 0; i < res.data.length; i++) {
                		
                    	switch (res.data[i].resource_type) {
                    	
                    	case 1:
                    		$("#image_rdPercent").text(res.data[i].percent+"%");
                    		
                    		break;
                    	case 2:
                    		$("#video_rdPercent").text(res.data[i].percent+"%");
                    		break;
                    	case 3:
                    		$("#text_rdPercent").text(res.data[i].percent+"%");
                    		break;
                    	case 4:
                    		$("#font_rdPercent").text(res.data[i].percent+"%");
                    		break;
                    	
                    	default:
                    		break;
                    	}
    				}
                }else{
                	
                }
                
            },
            error: function(error) {
                console.error(error);
                reject(error);
            }
        });
    });	
}


function selectAvgComp(){
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: '/selectAvgComp',
            data: {},
            success: function(res) {
                resolve(res);
                if(res.data){
                	
                	for (var i = 0; i < res.data.length; i++) {
                		
                    	switch (res.data[i].resource_type) {
                    	
                    	case 5:
                    		$("#hangule_rdPercent").text(res.data[i].percent+"%");
                    		
                    		break;
                    	case 6:
                    		$("#word_rdPercent").text(res.data[i].percent+"%");
                    		break;
                    	case 7:
                    		$("#excel_rdPercent").text(res.data[i].percent+"%");
                    		break;
                    	case 8:
                    		$("#ppt_rdPercent").text(res.data[i].percent+"%");
                    		break;
                    	case 9:
                    		$("#pdf_rdPercent").text(res.data[i].percent+"%");
                    		break;
                    	default:
                    		break;
                    	}
    				}
                }else{
                	
                }
                
            },
            error: function(error) {
                console.error(error);
                reject(error);
            }
        });
    });	
}



function selectTimetable(){
	var resourceType = document.querySelector('input[name="resource_type2"]:checked').value;
	//var statusType = document.querySelector('input[name="status_type"]:checked').value;
	return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: '/selectTimetable',
            data: {
            	resource_status : 1,
            	resource_type : resourceType,
            	
            },
            success: function(res) {
                resolve(res);
                
                slowTable.setData(res.slowData);
                fastTable.setData(res.fastData);
                
            },
            error: function(error) {
                console.error(error);
                reject(error);
            }
        });
    });	
}

function selectComptable(){
	var resourceType = document.querySelector('input[name="resource_type2"]:checked').value;
	//var statusType = document.querySelector('input[name="status_type"]:checked').value;
	return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: '/selectCompTable',
            data: {
            	resource_status : 1,
            	resource_type : resourceType,
            	
            },
            success: function(res) {
                resolve(res);
                console.log(res);
                slowTable.setData(res.slowData);
                fastTable.setData(res.fastData);
                
            },
            error: function(error) {
                console.error(error);
                reject(error);
            }
        });
    });	
}

async function getContentChart() {
    try {
        let response = await $.ajax({
            type: 'GET',
            url: '/contentChartAll',
            data: {
                resource_type : 90 //웹 콘텐츠
                
            }
        });
        
        // Process the response here
//        console.log('Content Chart Data:', response);

        // Return the processed data if needed
        return response;
    } catch (error) {
        console.error('Error fetching content chart data:', error);
        throw error; // Propagate the error if necessary
    }
}

async function getOptimizer() {
    try {
        const res = await $.ajax({
            type: 'GET',
            url: '/getOptimizer',
            data: {
            	resource_type :90
            },
        });
        if(res.title.length!=0){
        	$("#accordionPlaceholder").hide()
        	
        }
        for (var i = 0; i < res.title.length; i++) {
        	
        	addAccordion(res.title[i].algorithm_name,res.title[i].total_bytes,filterListByTitle(res.title[i].al_type,res.title[i].resource_type,res.list));
		}
      
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

function filterListByTitle(al_type, resource_type, list) {
	
	  return list.filter(listItem => {
	    return listItem.al_type === al_type && listItem.resource_type === resource_type;
	  });
	}

function addAccordion(algorithm_name, total_bytes,data) {
	
	// 페이지에서만 써야함
	// greatest_type을 기준으로 내림차순 정렬하는 함수
	function sortByGreatestTypeDescending(a, b) {
	    return b.greatest_type - a.greatest_type;
	}

//	// 데이터 정렬
//	data.sort(sortByGreatestTypeDescending);
//
//	// 상위 10개 데이터만 선택
//	data =data.slice(0, Math.min(10, data.length));
	
	
	
    const uniqueId = accordionCount++;
    const accordionId = 'accordion' + uniqueId;
    const headerId = 'heading' + uniqueId;
    const collapseId = 'collapse' + uniqueId;
    const tableId = 'table' + uniqueId;

    const accordionHtml = `
      <div class="accordion col-md-12" id="${accordionId}" style="margin-bottom:15px">
        <div class="accordion-item">
          <h2 class="accordion-header" id="${headerId}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
              <strong><i class="fa-solid fa-triangle-exclamation" style="color:red"></i>  ${algorithm_name} - 절감 가능치 : <span style="color:yellow; font-size:20px;"> ${fileSizeUnitFormatter(total_bytes)}</span></strong>
            </button>
          </h2>
          <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${headerId}">
            <div class="accordion-body">
              <div id="${tableId}" class="table"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    if (uniqueId % 2 === 0) {
    	document.getElementById('accordionContainer2').insertAdjacentHTML('beforeend', accordionHtml);
      } else {
    	  document.getElementById('accordionContainer1').insertAdjacentHTML('beforeend', accordionHtml);
      }
  
    
    
    for (var i = 0; i < data.length; i++) {
    	console.log(data);
		data[i].ratio = ((data[i].resource_org_size-data[i].greatest_type)/data[i].resource_org_size* 100).toFixed(1);
		
		data[i].no = i+1;
	}
    // 타뷸레이터 테이블 초기화
    new Tabulator(`#${tableId}`, {
    	columnDefaults:{
	        headerSort:false,
	     //   hozAlign:"center",
	        resizable:false
	    },
	    autoResize:true,
    	data: data,
    	 placeholder:"해당 조건에 맞는 데이터가 존재하지 않습니다.",
      layout:"fitColumns",
      rowHeight:30,
      maxHeight: "386",
      columns:[
    	  {title:"No", field:"no", hozAlign: "center",width:"50"},
        {title:"웹 콘텐츠 이름", field:"resource_name", hozAlign: "left",width:""},
        {title:"원본 용량", field:"resource_org_size",hozAlign: "right",width:"150", 
        	formatter: function(cell, formatterParams, onRendered) {
    			let result = "";
    			if(cell.getValue() < 0){
    				result = `<ion-icon name="close-circle-outline" style="font-size:1.3em; color:#b4b4b4;"></ion-icon>`;
    			}else{
    				result = fileSizeUnitFormatter(cell.getValue());
    			}
    			return result;
    		},  },
        {title:"최적화 후 용량", field:"greatest_type",hozAlign: "right",width:"150",
    			formatter: function(cell, formatterParams, onRendered) {
	    			let result = "";
	    			if(cell.getValue() < 0){
	    				result = `<ion-icon name="close-circle-outline" style="font-size:1.3em; color:#b4b4b4;"></ion-icon>`;
	    			}else{
	    				result = fileSizeUnitFormatter(cell.getValue());
	    			}
	    			return result;
	    		},  },
	    		 {title:"감소율", field:"ratio",hozAlign: "right",width:"150"
	    			 ,formatter: function(cell, formatterParams, onRendered) {
	 	    			
	 	    			return `<span class="color1">${cell.getValue()}%</span>`;
	 	    		},  },
	    
      ],
    });
  }


function getColumns() {
//    var statusType = parseInt(document.querySelector('input[name="status_type"]:checked').value, 10);
    var statusType = 1;
    if (statusType < 0) {
      return [
        {title: "No", field: "no",  hozAlign: "center"},
        {title: "웹 콘텐츠 이름", field: "resource_name",  hozAlign: "left",
        	},
        {title: "기존 렌더링 시간", field: "org_time",  hozAlign: "right",
        		formatter: function(cell, formatterParams, onRendered) {
					let result = "";
					if(cell.getValue()==0){
						result = UNCHECKED;
					}else if(cell.getValue()==-1){
						result = CHECKING;
					}else{
						result = timeUnitFormatter(cell.getValue());
					}		
	    			return result;
	    		},}
      ];
    } else {
      return [
    	  {title:"No", field:"no" ,hozAlign:"center",},
	        {title:"웹 콘텐츠 이름", field:"resource_name", width:200,hozAlign:"left",},
	        {title:"원본 용량", field:"resource_org_size",hozAlign: "right",width:"200", 
	        	formatter: function(cell, formatterParams, onRendered) {
	    			let result = "";
	    			if(cell.getValue() < 0){
	    				result = `<ion-icon name="close-circle-outline" style="font-size:1.3em; color:#b4b4b4;"></ion-icon>`;
	    			}else{
	    				result = fileSizeUnitFormatter(cell.getValue());
	    			}
	    			return result;
	    		},  },
	    		{title:"최적화 후 용량", field:"resource_new_size_type2",hozAlign: "right",width:"200",
	    			formatter: function(cell, formatterParams, onRendered) {
		    			let result = "";
		    			if(cell.getValue() < 0){
		    				result = `<ion-icon name="close-circle-outline" style="font-size:1.3em; color:#b4b4b4;"></ion-icon>`;
		    			}else{
		    				result = fileSizeUnitFormatter(cell.getValue());
		    			}
		    			return result;
		    		},  },
	        {title:"감소율", field:"percent", width:200,hozAlign:"right",
	    			formatter: function(cell, formatterParams, onRendered) {
								
		    			return `<span class="color1">${cell.getValue()}%</span>`;
		    		},},
      ];
    }
  }

function updateTableColumns() {
    var columns = getColumns();
    slowTable.setColumns(columns);
    fastTable.setColumns(columns);
  }

function drawTimeTableSlow(){
	
	slowTable = new Tabulator("#top10slowTable", {
	    //height:"380px",
	    columnDefaults:{
	        headerSort:false,
	     //   hozAlign:"center",
	        resizable:false
	    },
	    layout:"fitDataStretch",
	    placeholder:"해당 조건에 맞는 데이터가 존재하지 않습니다.",
	    columns:getColumns(),
	    rowHeight:30,
	});
	 
}

function drawTimeTableFast(){
	 fastTable = new Tabulator("#top10fastTable", {
	   // height:"380px",
	    columnDefaults:{
	        headerSort:false,
	     //   hozAlign:"center",
	        resizable:false
	    },
	    layout:"fitDataStretch",
	    placeholder:"해당 조건에 맞는 데이터가 존재하지 않습니다.",
	    columns:getColumns(),
	    rowHeight:30,
	});
}


//플러그인 등록 (한 번만 수행)
Chart.register({
  id: 'centerText',
  beforeDraw: function(chart) {
    var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;
    
    ctx.restore();
    var fontSize = (height / 100).toFixed(2);
    ctx.font = fontSize + "em sans-serif";
    ctx.textBaseline = "middle";
    
    // 텍스트 색상을 흰색으로 설정합니다.
    ctx.fillStyle = "white";
    var text = chart.config.options.plugins.centerText.text,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;       
    ctx.fillText(text, textX, textY);
    ctx.save();
  }
});

function contentChart(chartName,data,desiredResourceType){
	
	
	if(desiredResourceType == null){
		// totals 객체 초기화
		let resource_type="전체";
		let all_cnt=0;
		let opt_cnt=0;
		let unopt_cnt=0;
		let percent;
		
		for (var i = 0; i < data.data.length; i++) {
			all_cnt += data.data[i].all_cnt;
			opt_cnt += data.data[i].opt_cnt;
			unopt_cnt += data.data[i].unopt_cnt;
		}
		percent = opt_cnt/all_cnt*100
		$('#progress').attr('value', percent);
		

		$('#opt_cnt').html(`<strong style="color: var(--color-blue);">${opt_cnt}</strong>/${all_cnt}건`);
		$('#all_percent').html(`${Math.round(percent)}%`);
		data = [{all_cnt:all_cnt,opt_cnt:opt_cnt,unopt_cnt:unopt_cnt,percent:percent}];
		
	}else{
		data = data.data.filter(item => item.resource_type === parseInt(desiredResourceType));
		
		if (!data || !data[0]) {
	        return ;
	    }
		var ctx = document.getElementById(chartName).getContext('2d');
		
	    
	    let color ="#007bff";
	    
	    switch (desiredResourceType) {
		
		case '1':
			color="#f14639"
			break;
		case '2':
			color="#ffc107"
			break;
		case '3':
			color="#1aa52a"
			break;
		case '4':
			color="#31a7ff"
			break;
		case '5':
			color="#1E90FF"
			break;
		case '6':
			color="#95A5A6"
			break;
		case '7':
			color="#217346"
			break;
		case '8':
			color="#D04A02"
			break;
		case '9':
			color="#FF0000"
			break;
		default:
			color="#cda4e2";
			break;
		}
	    
	    
	    var num = parseInt(color.replace("#", ""), 16),
        amt = Math.round(2.55 * 15),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
	    var backgroundColor ="#" + (0x1000000 + (R<255 ? R<1?0:R:255)*0x10000 + (G<255 ? G<1?0:G:255)*0x100 + (B<255 ? B<1?0:B:255)).toString(16).slice(1);
	    
	    
	    const optCnt = data[0].opt_cnt;
	    const unoptCnt = data[0].unopt_cnt;

	    const chartDataArray = unoptCnt === 0 ? [optCnt] : [optCnt, unoptCnt];
	    const backgroundColorArray = unoptCnt === 0 ? [color] : [color, '#e0e0e0'];
	    const hoverBackgroundColorArray = unoptCnt === 0 ? [backgroundColor] : [backgroundColor, '#c2c2c2'];
	    
	    data[0].percent = Math.round(data[0].percent);
	    
		 var myChart = new Chart(ctx, {
		      type: 'doughnut',
		      data: {
		        datasets: [{
		        	data: chartDataArray,
		            backgroundColor: backgroundColorArray,
		            hoverBackgroundColor: hoverBackgroundColorArray,
		            borderWidth: 0,  // 데이터가 하나일 경우 경계선 두께를 0으로 설정
		    		borderColor: '#ffffff',  
		    		spacing: 0  // 데이터가 하나일 경우 슬라이스 간격을 0으로 설정
		        }]
		      },
		      options: {
		        responsive: true,
		        plugins: {
		          tooltip: {
		            enabled: false
		          },
		          legend: {
		            display: false
		          },
		          centerText: {
		        	  text: data[0].percent + '%'
		          }
		        },
		        cutout: '70%',
		        rotation: -135,
		        circumference: 360,
		        responsive: true,
		        
		      }
		 });
	
	}
	
	
  
    setCurrent(desiredResourceType,data);
}






function setCurrent(type,data){
	
	
	let desiredType = checkTypeKor(type);  // type 변수의 값을 미리 저장
	
	let color = `<span class="color${type}">● </span>`;
	let typeHtml = `<span>${desiredType} 최적화 현황</span>`;
	let opt_cnt = `<span class="color${type}"> ${data[0].opt_cnt}</span>`;
	let all_cnt = `<span>/${data[0].all_cnt}</span> 건`;
	
	
	// text 변수를 문자열로 초기화
	let text = 
		color+typeHtml+opt_cnt+all_cnt;
		//`${color}${typeHtml}${opt_cnt}${all_cnt}`;
	
	switch (parseInt(type)) {
	
	case 1:
		$("#imageCnt").append(text);
		break;
	case 2:
		$("#videoCnt").append(text);
		break;
	case 3:
		$("#textCnt").append(text);
		break;
	case 4:
		$("#fontCnt").append(text);
		break;
	case 5:
		$("#hanguleCnt").append(text);
		break;
	case 6:
		$("#wordCnt").append(text);
		break;
	case 7:
		$("#excelCnt").append(text);
		break;
	case 8:
		$("#pptCnt").append(text);
		break;
	case 9:
		$("#pdfCnt").append(text);
		break;
	default:
		break;
	}
}






function getCurrentDateTime() {
    const now = new Date();
    
    // 연도, 월, 일
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = now.getDate();

    // 시간, 분
    let hours = now.getHours();
    const minutes = now.getMinutes();

    // 오전/오후
    const period = hours >= 12 ? '오후' : '오전';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0시를 12시로 변환

    // 분을 두 자리로 포맷팅
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // 결과 문자열 구성
    const currentDateTime = `${year}년 ${month}월 ${day}일`;
    
    $("#currentTime").text(currentDateTime);
}


function setAvgComp_data(){
    $.ajax({
        type: 'POST',
        url: '/selectAvgComp',
        async: false,
        success: function(res) {
            // 요청이 성공하면 result 배열과 average_comp 객체를 초기화
            result = [];
            average_comp = {};
            
            // res.data 배열을 순회하면서 result 배열과 average_comp 객체를 채움
            for (var i = 0; i < res.data.length; i++) {
                var resourceType = res.data[i].resource_type;
                var avgReductionPercentage = res.data[i].avg_reduction_percentage;
                
                var obj = {};
                obj[resourceType] = avgReductionPercentage;
                result.push(obj);

                // average_comp 객체에 값 저장
                average_comp[resourceType] = avgReductionPercentage;
            }
        },
        error: function onError (error) {
            console.error(error);
        }
    });
    return result;
}

/*
  resource_type 별 평균 압축률 구하기 
 */
function getAvgComp(resource_type){
    if (average_comp.hasOwnProperty(resource_type)) {
        return parseInt(average_comp[resource_type],10)/100; // 값을 반환하도록 수정
    } else {
        return 30/100;
    }
}



function checkTypeKor(value){
	
	
	switch (parseInt(value)) {
	case 0:
		return `폴더 `;
		break;
	case 1:
		return `이미지`;
		break;
	case 2:
		return `동영상`;
		break;
	case 3:
		return `텍스트`;
		break;
	case 4:
		return `폰트`;
		break;
	case 5:
		return `한글 `;
		break;
	case 6:
		return `워드 `;
		break;
	case 7:
		return `엑셀 `;
		break;
	case 8:
		return `PPT `;
		break;
	case 9:
		return `PDF `;
		break;
	default:
		return value;
		break;
	}
}



// 지정된 id로 스크롤 이동하는 함수
function scrollToTarget(id) {
    const element = document.getElementById(id);
    if (element) {
        const topOffset = element.getBoundingClientRect().top + window.scrollY;
        const offset = -90; // 조정할 값, 여기서는 90px 위로 이동하도록 설정했습니다.
        window.scrollTo({ top: topOffset + offset, behavior: 'smooth' });
    }
}




function searchReset(){
	if(resource_type_sumo != null){
		resource_type_sumo.sumo.unSelectAll();
	}
}
function getAllWebContent(){
	var resourceType = document.querySelector('input[name="resource_type"]:checked').value;
	
	//var statusType = document.querySelector('input[name="status_type"]:checked').value;
	var selectedValue = $('#search-type-1').val();
	
	if(selectedValue.length >1){
		selectedValue = 0;
    }else if(selectedValue.length == 1 ){
    	selectedValue= parseInt(selectedValue[0]);
    }
	
	
	table_resource = new Tabulator("#volist", {
		height:"100%",
		selectable:false,
	    pagination:true, // enable pagination
	    paginationMode:"remote", // enable remote pagination
	    paginationSize:10, // 목록 크기
	    sortMode: "remote",
	    ajaxURL:"/selectContentTableRp", // set url for ajax request
	    ajaxParams:{
	    	resource_type:resourceType,
	    	resource_status:selectedValue,
	    },	    
	    placeholder:"해당 조건에 맞는 데이터가 존재하지 않습니다.",
	    autoResize:true,
	    tooltips:false,
	    locale:true,
	    rowHeight:30,
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
	            "data":{
					"loading":`<div class="spinner-border text-primary m-1" role="status"><span class="sr-only">Loading...</span></div>`,
					"error":"Error",
				},          
	            
	        },
	    },	    
	    ajaxContentType : "application/json; charset=utf-8",
	    ajaxContentType:"json",
	    ajaxResponse:function(url,prarm,response){
	    	
	    	$("#list_cnt span").html(response.list_cnt);
	    	for(let i=0;i<response.data.length;i++){
	    		response.data[i].reduction_rate = 0;
	    		response.data[i].detail_btn = `<button class="btn btn-sm btn-detail">상세보기</button>`;
	    		response.data[i].optimize_btn = `0`;
	    		// let rand = Math.random() < 0.5 ? 0 : 1;
	    		if(response.data[i].resource_condition == 1){
	    			response.data[i].condition = `<span class="badge badge-normal">양호</span>`;	    			
	    		}else{
	    			response.data[i].condition = `<span class="badge badge-abnormal">미흡</span>`;
	    		}
	    		if(response.data[i].resource_type==0){
	    			response.data[i].resource_org_size = "";
	    			response.data[i].condition = "";
	    			response.data[i].detail_btn = "";
	    			response.data[i].optimize_btn = "";
	    		}
	    		
	    	}
	    	return response; 
	    },
	    paginationInitialPage: 1,
	    paginationLoading: "<div class='custom-pagination-loader'><div class='spinner'></div>Loading...</div>",
	    layout: "fitColumns",
	    columns: [
			 	
	    	{
	    		title: "No",
	    		field: "no",
	    		width: 100,
	    		hozAlign: "center",
	    		headerSort:false,
	    		resizable:false,
	    	},
	    	{
	    		title: "구분",
	    		field: "resource_type",
	    		hozAlign: "center",
	    		headerSort:true,
	    		width: 100,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = `<span style="font-size:1.2em;">`;
	    			switch(cell.getValue()){
		    			case 0 : result += `📁`; break;
		    			case 1 : result += `🖼️`; break;
		    			case 2 : result += `🎥`; break;
		    			case 3 : result += `📄`; break;
		    			case 4 : result += `🅰️`; break;
		    			case 5 : result += `<img src="/resources/img/icon-ext-hwp-color.png" />`; break;
		    			case 6 : result += `<img src="/resources/img/icon-ext-doc-color.png" />`; break;
		    			case 7 : result += `<img src="/resources/img/icon-ext-xls-color.png" />`; break;
		    			case 8 : result += `<img src="/resources/img/icon-ext-ppt-color.png" />`; break;
		    			case 9 : result += `<img src="/resources/img/icon-ext-pdf-color.png" />`; break;
	    			}
	    			result += "</span>";
	    			return result;
	    		},
	    		resizable:false,
	    	},
	    	{
	    		title: "웹 컨텐츠 이름",
	    		field: "resource_name",
	    		hozAlign: "left",
	    		headerSort:true,
	    		widthgrow :true,
	    		
	            resizable:false,
	    	},
	    	{
	    		title: "최적화 적용",
	    		field: "resource_status",
	    		width: 200,
	    		hozAlign: "center",
	    		headerHozAlign:"center",
	    		headerSort:true,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = "";
	    			let rowData = cell.getRow().getData();
	    			result = printResourceStatus(cell.getValue());
	    			if(rowData['resource_type'] == 0){
	    				result = "";
	    			}
	    			if(rowData['resource_org_size'] < 0){
	    				result = `<ion-icon name="close-circle-outline" style="font-size:1.3em; color:#b4b4b4; position:relative; top:7px;"></ion-icon>`;
	    			}
	    			return result;
	    		},
	    		resizable:false,
	    	},		    	
	    	{
	    		title: "원본 크기",
	    		field: "resource_org_size",
	    		hozAlign: "right",
	    		headerHozAlign:"right",
	    		headerSort:true,
	    		width: 200,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = "";
	    			if(cell.getValue() < 0){
	    				result = `<ion-icon name="close-circle-outline" style="font-size:1.3em; color:#b4b4b4;"></ion-icon>`;
	    			}else{
	    				result = fileSizeUnitFormatter(cell.getValue());
	    			}
	    			return result;
	    		},  
	    		resizable:false,
	    	},	    	    	
	    	{
	    		title: "최적화 크기",
	    		field: "resource_new_size_type2",
	    		hozAlign: "right",
	    		headerHozAlign:"right",
	    		headerSort:true,
	    		width: 200,
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let rowData = cell.getRow().getData();
	    			let result = "";
	    			if(rowData.resource_status == 1){
	    				result = fileSizeUnitFormatter(cell.getValue());
	    				if(cell.getValue() == 0){
	    					result = ERROR;
	    				}
	    			}else{
	    				result = UNOPTIMIZED;
	    			}
	    			return result;
	    		},  
	    	},	
	    	{
	    		title: "파일 경량화율",
	    		field: "reduction_rate",
	    		hozAlign: "right",
	    		headerHozAlign:"right",
	    		headerSort:false,
	    		width: 200,
	    		resizable:false,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let rowData = cell.getRow().getData();
	    			let result = "";
	    			if(rowData.resource_status == 1){
	    				result = ((rowData.resource_org_size - rowData.resource_new_size_type2)/rowData.resource_org_size)*100;
	    				result = result.toFixed(1)+"%";
	    				if(result == "100.0%" || (rowData.resource_org_size - rowData.resource_new_size_type2) < 0){
	    					result = ERROR;
	    				}else{
	    					return `<span class="color1">${result}</span>`;
	    				}
	    			}else{
	    				result = UNOPTIMIZED;
	    			}
	    			return result;
	    		},  
	    	},		    	
	    	
	    ],	    
	});	
	
	
}

