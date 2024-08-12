
const statusArray = [
	{value : 1, label : "최적화 완료", icon : "checkmark-circle"},
	{value : 0, label : "최적화 대기", icon : "pause-circle"},
	{value : 11, label : "최적화 진행 중", icon : "play-circle"},
	{value : -1, label : "최적화 미적용", icon : "remove-circle"},
	{value : 2, label : "최적화 해제", icon : "close-circle"},
	// {value : 3, label : "없음", icon : "question-circle"},
];

const typeArray = [
	{value : 1, label : "이미지", icon : "image", icon_type : "ion-icon"},
	{value : 2, label : "동영상", icon : "videocam", icon_type : "ion-icon"},
	{value : 3, label : "텍스트", icon : "document-text", icon_type : "ion-icon"},
	{value : 4, label : "폰트", icon : "text", icon_type : "ion-icon"},
	{value : 5, label : "한글", icon : "icon-ext-hwp.png", icon_type : "img"},
	{value : 6, label : "워드", icon : "icon-ext-doc.png", icon_type : "img"},
	{value : 7, label : "엑셀", icon : "icon-ext-xls.png", icon_type : "img"},
	{value : 8, label : "PPT", icon : "icon-ext-ppt.png", icon_type : "img"},
	{value : 9, label : "PDF", icon : "icon-ext-pdf.png", icon_type : "img"},
];

const urlParams = new URLSearchParams(window.location.search);
const sampleCloud = selectCloudByCloudNo(1);
const gigabyte = 1024*1024*1024;
const costPerByte = (sampleCloud.cloud_payment) / gigabyte;
const siteList = selectSiteAllBySiteNo();
const msg = {};
msg.savingRateInfo = `원본 웹 컨텐츠가 이미 최적화된 경우, 원본 컨텐츠를 사용하므로 비용 절감율이 0%로 표시됩니다.`;

const algorithmArray = selectAlgorithmAll();

// 비정형 사용여부
let USE_UNSTRFILE = false; // 비정형 사용 여부
if (getConfigValue("USE_UNSTRFILE")==1){
	USE_UNSTRFILE = true;
}


$(document).ready(function() {
	popoverInit();
});

let utilFnc = {};

function popoverInit() {
    var $popoverContent = $('#popover-content');
    if ($popoverContent.length === 0) { // 엘리먼트가 존재하지 않는다면 새로 추가
        var $newPopoverContent = $('<div>', {
            id: 'popover-content',
            class: 'popover',
            text: 'This is a popover content.',
        });
        $('body').append($newPopoverContent); // 새로운 엘리먼트를 body의 맨 끝에 추가합니다.
    }

    // 팝오버 버튼 클릭 시 이벤트 핸들러
    $('.btn-popover').each(function() {
        var $button = $(this);
        // 데이터 속성을 통해 이벤트 핸들러가 이미 추가되었는지 확인
        if (!$button.data('popover-initialized')) {
            $button.on('click', function(e) {
                var buttonPosition = $button.offset();// 클릭한 버튼의 위치 계산
                var content = $button.data('popover-content'); // 팝오버 내용을 버튼의 data-popover-content 속성에서 가져오기
                $('#popover-content').html(content);
                
                let popoverContentWidth = 500;
                if($button.attr("data-popover-width") != undefined){
                	popoverContentWidth = $button.attr("data-popover-width");
                }
                $('#popover-content').css({"max-width": popoverContentWidth+"px"});
                
                var popoverWidth = $('#popover-content').outerWidth();
                var popoverHeight = $('#popover-content').outerHeight();
                var top = buttonPosition.top - popoverHeight;
                var left = buttonPosition.left;

                if($button.attr("data-popover-right") != undefined){
                	left = buttonPosition.left-popoverContentWidth+20;
                }
                if($button.attr("data-popover-top") != undefined){
                	let topOption = parseInt($button.attr("data-popover-top")); 
                	console.log(top,topOption);
                	top = top+topOption;
                }                
                // 팝오버 내용 표시
                $('#popover-content').css({
                    top: top - 15,
                    left: left
                }).fadeIn(150);  
                


                // 문서의 다른 곳을 클릭하면 팝오버를 숨김
                $(document).on('click.popover', function(e) {
                    if (!$(e.target).closest('.popover, .btn-popover').length) {
                        $('#popover-content').fadeOut(150);
                        $(document).off('click.popover');
                    }
                });

                // 팝오버 버튼의 클릭 이벤트 중지
                e.stopPropagation();
            });

            // 이벤트 핸들러가 추가되었음을 표시
            $button.data('popover-initialized', true);
        }
    });
}

function popoverSingleEvent(param){
	const {element, content, xaxis} = param;
	let $popoverContent = $('#popover-content');
    if ($popoverContent.length === 0) { // 엘리먼트가 존재하지 않는다면 새로 추가
        let $newPopoverContent = $('<div>', {
            id: 'popover-content',
            class: 'popover',
            text: 'This is a popover content.',
        });
        $('body').append($newPopoverContent); // 새로운 엘리먼트를 body의 맨 끝에 추가합니다.
        $popoverContent = $('#popover-content');        
    }
    
    let buttonPosition = $(element).offset();
    $('#popover-content').html(content);
    $('#popover-content').css({"max-width": 500+"px"});
    
    let popoverWidth = $('#popover-content').outerWidth();
    let popoverHeight = $('#popover-content').outerHeight();
    let top = buttonPosition.top - popoverHeight;
    let left = buttonPosition.left;
    
    if(xaxis != undefined && xaxis == "right"){
    	left = buttonPosition.left - popoverWidth + $(element).width();
    }else{
    }

    $('#popover-content').css({
        top: top - 10,
        left: left
    }).fadeIn(150);  
    
    // 다른 곳을 클릭하면 팝오버를 숨깁니다.
    $(document).on('click.popoverEvent', function(event) {
        if (!$(event.target).closest('#popover-content').length && 
            !$(event.target).closest('a[onclick]').length) {
            $('#popover-content').fadeOut(150);
            // 이벤트 리스너 제거
            $(document).off('click.popoverEvent');
        }
    });    
}

function findSiteBySiteNo(site_no){
	let foundItem = siteList.find(item => item.site_no === site_no);
	
	if (foundItem) {
		foundItem.costPerByte = foundItem.cloud_payment / gigabyte;
		return foundItem; // 조건을 만족하는 객체 반환
	} else {
		return null; // 해당하는 항목을 찾을 수 없을 때 null 반환
	}
}

function modalAlert(title, message){

	$("#alertModal .modal-title").html(title);
	$("#alertModal .modal-body").html(message);
	$('#alertModal').modal('show');
	console.log($(".modal-backdrop").length);
	if($(".modal-backdrop").length > 1){
		//$(".modal-backdrop").eq(0).css({"display":"none"});
	}	
}

function modalConfirm(message, onConfirm, onCancel) {
    const modalYesButton = $('#confirmModal-yes');
    const modalNoButton = $('#confirmModal-no');
    const modalText = $('#confirmModal-text');

    modalText.text(message);

    modalYesButton.off("click");
    modalYesButton.on('click', () => {
        onConfirm();
        $('#confirmModal').modal('hide'); // 부트스트랩 모달 닫기
    });
    
    modalNoButton.off("click");
    modalNoButton.on('click', () => {
        onCancel();
        $('#confirmModal').modal('hide'); // 부트스트랩 모달 닫기
    });

    $('#confirmModal').modal('show'); // 부트스트랩 모달 열기
}


/***
 * 1. 함수명 : displayData
 * 2. 작성일: 2023-12-13
 * 3. 작성자: 안재림
 * 4. 설명: 로우데이터 html로 뿌리는 함수
 * 5. 수정일: 
 * ***/	
function displayData(data) {
    var htmlString = ''; // 초기화된 HTML 문자열

    if (Array.isArray(data)) {
        data.forEach(function(obj) {
            htmlString += '<ul style="border:1px solid #c8c8c8;">'; // 객체마다 UL 태그로 리스트 생성

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    htmlString += '<li>' + key + ': ' + obj[key] + '</li>'; // 키-값 쌍을 LI 태그에 추가
                }
            }

            htmlString += '</ul>'; // UL 태그 닫기
        });
    } else if (typeof data === 'object') {
        htmlString += '<ul>'; // 객체마다 UL 태그로 리스트 생성

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                htmlString += '<li>' + key + ': ' + data[key] + '</li>'; // 키-값 쌍을 LI 태그에 추가
            }
        }

        htmlString += '</ul>'; // UL 태그 닫기
    } else {
        htmlString = '<p>Invalid data format.</p>'; // 유효하지 않은 데이터 형식에 대한 처리
    }

    return htmlString; // HTML 문자열 반환
}

function comma(number) {
	if (number % 1 === 0) {
		number = parseInt(number);
	}
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function fileSizeUnitFormatter(bytes){
	  let resultValue, resultUnit;

	  if (bytes == 0){
		  resultValue = "0";
		  resultUnit = "byte";
	  } else if (bytes < 1024) {
	    resultValue = bytes.toFixed(0);
	    resultUnit = 'byte';
	  } else if (bytes < 1024 * 1024) {
	    resultValue = (bytes / 1024).toFixed(1);
	    resultUnit = 'KB';
	  } else if (bytes < 1024 * 1024 * 1024) {
	    resultValue = (bytes / (1024 * 1024)).toFixed(1);
	    resultUnit = 'MB';
	  } else {
	    resultValue = (bytes / (1024 * 1024 * 1024)).toFixed(1);
	    resultUnit = 'GB';
	  }

	  return `${resultValue}<sub>${resultUnit}</sub>`;
}

function fileSizeUnitFormatter_v2(bytes){
	  let resultValue, resultUnit;

	  if (bytes == 0){
		  resultValue = "0";
		  resultUnit = "byte";
	  } else if (bytes < 1024) {
	    resultValue = bytes.toFixed(0);
	    resultUnit = 'byte';
	  } else if (bytes < 1024 * 1024) {
	    resultValue = (bytes / 1024).toFixed(1);
	    resultUnit = 'KB';
	  } else if (bytes < 1024 * 1024 * 1024) {
	    resultValue = (bytes / (1024 * 1024)).toFixed(1);
	    resultUnit = 'MB';
	  } else {
	    resultValue = (bytes / (1024 * 1024 * 1024)).toFixed(1);
	    resultUnit = 'GB';
	  }

	  return `${resultValue} ${resultUnit}`;
}

utilFnc.formatFileSize = function(bytes){
	  let resultValue, resultUnit;
	  let result = {};
	  if (bytes == 0){
		  resultValue = "0";
		  resultUnit = "byte";
	  } else if (bytes < 1024) {
	    resultValue = bytes.toFixed(0);
	    resultUnit = 'byte';
	  } else if (bytes < 1024 * 1024) {
	    resultValue = (bytes / 1024).toFixed(1);
	    resultUnit = 'KB';
	  } else if (bytes < 1024 * 1024 * 1024) {
	    resultValue = (bytes / (1024 * 1024)).toFixed(1);
	    resultUnit = 'MB';
	  } else {
	    resultValue = (bytes / (1024 * 1024 * 1024)).toFixed(1);
	    resultUnit = 'GB';
	  }
	  result = {
		value : resultValue,
		unit : resultUnit
	  }
	  return result;
}

function decreaseRate(number1, number2){
	let decreaseValue = number1 - number2;
	let result = decreaseValue * 100 / number1;
	result = result.toFixed(1);
	let arrow = `<ion-icon name="caret-up-outline"></ion-icon>`;
	let spanClass = `up`;
	if(number1 > number2){
		result = result * -1;
		arrow = `<ion-icon name="caret-down-outline"></ion-icon>`;
		spanClass = `down`;
	}else if(number1 == number2){
		result = 0;
		//arrow = `<ion-icon name="help-circle-outline"></ion-icon>`;
		arrow = "";
		spanClass = "zero";
		
	}
	if(isNaN(result)){
		result = `<span class="no-data"></span>`;
	}else{
		result = `<span class="${spanClass}">${result}% ${arrow}</span>`;
	}
	if(number1 <= 0 || number2 <= 0){
		result = "";
	}
	return result;
}

function savingRate(){
	
}

function dateFormatter(date){
	date = new Date(date);
	return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}<br />${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function dateFormatterType2(date){
	date = new Date(date);
	let year = date.getFullYear();
	let month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1, 두 자리 숫자로 변환
	let day = ('0' + date.getDate()).slice(-2); // 두 자리 숫자로 변환
	let hours = ('0' + date.getHours()).slice(-2); // 두 자리 숫자로 변환
	let minutes = ('0' + date.getMinutes()).slice(-2); // 두 자리 숫자로 변환
	
	// 원하는 형식으로 조합하여 반환
	return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;	
}

function nullCheck(variable) {
    return variable !== undefined && variable !== null && variable !== "";
}

/***
 * 1. 함수명 : selectCloudByCloudNo
 * 2. 작성일: 2023-12-07
 * 3. 작성자: 안재림
 * 4. 설명: 클라우드 번호로 클라우드 정보 받아오기
 * 5. 수정일: 
 * ***/	
function selectCloudByCloudNo(cloud_no){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/selectCloudByCloudNo',
		data:{
			cloud_no : cloud_no,
		},
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

function selectSiteAllBySiteNo(){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/selectSiteAllBySiteNo',
		data:{},
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

//mini Alert 
function miniAlert(text,type){
	
	console.log(type);
	
	if(!type) type = 'success'
	if($('body').find('mini-alert-wrap').length < 0){
		$('body').append($('.mini-alert-wrap'));
	}

	if(!type) type = 'success';

	var area = $('.mini-alert-wrap');
	if(area.length < 1){
		area = $('<div class="mini-alert-wrap">');
		$('body').append(area);
	}
	var item = $('<div class="mini-alert">');
	var items = $('.mini-alert', area);

	item.html(text);
	item.addClass(type);

	area.append(item);
	
	item.css({
		marginLeft: item.outerWidth() / 2 * -1,
		top: '-40px'
	});

	if(items.length > 0){
		items.each(function(idx, elm){
			$(this).css('top', (items.length-idx+1) * -40);
		});
	}

	setTimeout(function(){
		item.fadeOut(400,function(){
			item.remove();
		});
	},3000);
}

function escapeHtml(unsafe) {
	if (unsafe == null){
		return '';
	}
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

//슬롯 머신처럼 숫자를 올리는 함수
function animateNumber(element, from, to, duration, fixed, suffix) {
    $({value: from}).animate({value: to}, {
        duration: duration,
        easing: 'swing',
        step: function() {
            $(element).html(this.value.toFixed(fixed) + suffix);
        }
    });
}


/*function algorithmSelectTest(){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/algorithm/selectAll',
		data:{},
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

function selectAlgorithmType(algorithm_type){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/selectAlgorithmType',
		data:{
			algorithm_type : algorithm_type,    
		},
		async: false,
		success: function(res) {
			result = res.data;
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	return result;	
}*/

function selectAlgorithmAll(){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectAlgorithmAll',
		data:{},
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

function findAlgorithmBySn(algorithm_sn){
	algorithm_sn = parseInt(algorithm_sn);
	let result = algorithmArray.find(item => item.algorithm_sn==algorithm_sn);
	if(!result || Number.isNaN(algorithm_sn)){
		result = {
		    "algorithm_sn": null,
		    "algorithm_type": null,
		    "algorithm_name": null,
		    "use_yn": null
		}		
	}
	return result;
}


function timeUnitFormatter(time){
    if (typeof time !== 'number' || isNaN(time)) {
        return '유효한 숫자가 아닙니다';
    }
    return (time / 1000).toFixed(3) + '<sub>초</sub>';
    /*
    if (time >= 1000) {
        // 초 단위로 변환
        return (time / 1000).toFixed(2) + 's';
    } else {
        // ms 단위로 유지
        return time + 'ms';
    }*/
}

function printResourceStatus(resource_status){
	result = "";
	const foundItem = statusArray.find(item => item.value === resource_status);
	switch(resource_status){
	case 1 : 
		result = `<span class="status status-blue"><ion-icon name="${foundItem.icon}"></ion-icon> 최적화 완료</span>`; 
		break;
	case 11 : 
		result = `<span class="status status-green"><ion-icon name="${foundItem.icon}"></ion-icon> 최적화 진행 중</span>`; 
		break;
	case 0 : 
		result = `<span class="status status-yellow"><ion-icon name="${foundItem.icon}"></ion-icon> 최적화 대기</span>`; 
		break;	    				
	case -1 : 
		result = `<span class="status status-gray"><ion-icon name="${foundItem.icon}"></ion-icon> 미적용</span>`; 
		break;
	case 2 : 
		result = `<span class="status status-red"><ion-icon name="${foundItem.icon}"></ion-icon> 최적화 해제</span>`; 
		break;
	}	
	return result;
}

function selectConfigByKey(config_key){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectConfigByKey',
		data:{config_key : config_key},
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

function getConfigValue(config_key){
	return parseInt(selectConfigByKey(config_key).data.config_value);
}