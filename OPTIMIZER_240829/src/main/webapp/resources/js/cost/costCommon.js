
//console.log(getCloud_payment(1));
let paymentData = setPayment_data();
let pageList = setPage_list();
let average_comp = {};
setAvgComp_data();
console.log(pageList);

//setSiteBox();




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



function deleteArrow(){
	var groupToggleElements = document.querySelectorAll('.tabulator-group-toggle');

	groupToggleElements.forEach(function(element) {
	    // 특정 조건을 만족하는 경우에만 삭제하지 않음
	    if (!element.classList.contains('made')) {
	        // 삭제할 요소에 대한 작업
	        element.remove();
	    }
	});
}


function renameTitle(value, count, data, group,i){
	i=i-1;
	if(i === -1){
		return `<div class="tabulator-group-toggle made" style="margin-left: 0px;"><div class="tabulator-arrow"></div></div>`
	}
	else if(i === 0 ){
		return checkType(value,null,true);
	}else if(i === 1){
		return checkType(value,count,false); 
	}else if(i === 2){
		var tmp=0;
		for (var idx = 0; idx < data.length; idx++) {
			tmp += parseInt(data[idx].resource_org_size);
		}
		return fileSizeUnitFormatter(tmp);
	}else if(i === 3){
		var tmp=0;
		for (var idx = 0; idx < data.length; idx++) {
			if(data[idx].resource_status === 1){
				tmp += parseInt(data[idx].resource_new_size_type2);
			}			
		}
		if(tmp ===0){return `  `};
		return fileSizeUnitFormatter(tmp);
	}else if(i === 4){
		var tmp=0;
		for (var idx = 0; idx < data.length; idx++) {
			tmp += parseInt(data[idx].resource_call_cnt);
		}
		return comma(tmp) + ' 회';
	}else if(i === 5){//최적화 전 비용
		var tmp=0;
		for (var idx = 0; idx < data.length; idx++) {
			tmp += parseFloat(data[idx].bfOptCost);
		}
		if (tmp % 1 === 0) {
			tmp = parseInt(tmp);
			return comma(tmp)+'원';
		}
		return comma(tmp.toFixed(2))+'원';
	}else if(i === 6){//최적화 후 비용
		var bf = 0;
		var aft=0;
		var ori=0;
		for (var idx = 0; idx < data.length; idx++) {
			if(data[idx].resource_status === 1){
				bf += parseFloat(data[idx].bfOptCost);
				aft += parseFloat(data[idx].aftOptCost);
			}
			ori += parseFloat(data[idx].bfOptCost);
		}
		if(bf ===0 ||aft ===0 ){return `  `};
		return `${comma((ori-(bf-aft)).toFixed(2))} 원`;
	}else if(i === 7){ //절감 비용
		var bf = 0;
		var aft=0;
		for (var idx = 0; idx < data.length; idx++) {
			if(data[idx].resource_status === 1){
				bf += parseFloat(data[idx].bfOptCost);
				aft += parseFloat(data[idx].aftOptCost);
			}
		}
		if(bf ===0 ||aft ===0 ){return ``};
		return `${comma((aft-bf).toFixed(2))} 원 (${Math.round((bf-aft)/bf*100)}%)`;
	}
		//else if(i === 8){//예상 절감 비용
//		var bf = 0;
//		var aft=0;
//		for (var idx = 0; idx < data.length; idx++) {
//			if(data[idx].resource_status === 1){
//				bf += parseFloat(data[idx].bfOptCost);
//				aft += parseFloat(data[idx].aftOptCost);
//			}
//		}
//		if(data.resource_status !== 1){
//			for (var idx = 0; idx < data.length; idx++) {
//				bf += parseFloat(data[idx].bfOptCost);
//				aft += parseFloat(calcCostNew(data[idx].resource_org_size*3/10* data[idx].resource_call_cnt*getCloud_payment(data[idx].cloud_no)));
//				
//			}}else{
//			for (var idx = 0; idx < data.length; idx++) {
//				bf += parseFloat(data[idx].bfOptCost);
//				aft += parseFloat(data[idx].bfOptCost);
//				
//			}
//		}
//		if(bf ===0 ||aft ===0 ){return `${comma((aft-bf).toFixed(2))} 원 (0%)`};
//		return `${comma((aft-bf).toFixed(2))} 원 (${Math.round((bf-aft)/bf*100)}%)`;
//		
//	}
	else{
		console.log("TABLE");
	}
	
	
	
}
//estimatedCost 용
function renameTitle2(value, count, data, group,i){
	i=i-1;
	if(i === -1){
		return `<div class="tabulator-group-toggle made" style="margin-left: 0px;"><div class="tabulator-arrow"></div></div>`
	}
	else if(i === 0 ){
		return checkType(value,null,true);
	}else if(i === 1){
		return checkType(value,count,false); 
	}else if(i === 2){
		var tmp=0;
		for (var idx = 0; idx < data.length; idx++) {
			tmp += parseInt(data[idx].resource_org_size);
		}
		return fileSizeUnitFormatter(tmp);
	}else if(i === 3){
		var tmp=0;
		for (var idx = 0; idx < data.length; idx++) {
			tmp += parseInt(data[idx].resource_new_size_type2);
		}
		return fileSizeUnitFormatter(tmp);
	}else if(i === 4){
		var tmp=0;
		for (var idx = 0; idx < data.length; idx++) {
			tmp += parseInt(data[idx].resource_call_cnt);
		}
		return comma(tmp) + ' 회';
	}
	else if(i === 5){//최적화 전 비용
		var tmp=0;
		for (var idx = 0; idx < data.length; idx++) {
			tmp += parseFloat(data[idx].bfOptCost);
		}
		if (tmp % 1 === 0) {
			tmp = parseInt(tmp);
			return comma(tmp)+'원';
		}
		
		return comma(tmp.toFixed(2))+'원';
	}else if(i === 6){//최적화 후 비용
		var bf = 0;
		var aft=0;
		var ori=0;
		for (var idx = 0; idx < data.length; idx++) {
			if(data[idx].resource_status === 1){
				bf += parseFloat(data[idx].bfOptCost);
				aft += parseFloat(data[idx].aftOptCost);
			}else{
				bf += parseFloat(data[idx].bfOptCost);
				aft += parseFloat(calcCostNew(data[idx].resource_org_size*3/10* data[idx].resource_call_cnt*getCloud_payment(data[idx].cloud_no)));
			}
			ori += parseFloat(data[idx].bfOptCost);
		}
		return `${comma((ori-(bf-aft)).toFixed(2))} 원`;
	}else if(i === 7){//예상 절감 비용
		var bf = 0;
		var aft=0;
		for (var idx = 0; idx < data.length; idx++) {
			if(data[idx].resource_status === 1){
				bf += parseFloat(data[idx].bfOptCost);
				aft += parseFloat(data[idx].aftOptCost);
			}
		}
		if(data.resource_status !== 1){
			for (var idx = 0; idx < data.length; idx++) {
				bf += parseFloat(data[idx].bfOptCost);
				aft += parseFloat(calcCostNew(data[idx].resource_org_size*3/10* data[idx].resource_call_cnt*getCloud_payment(data[idx].cloud_no)));
				
			}}else{
			for (var idx = 0; idx < data.length; idx++) {
				bf += parseFloat(data[idx].bfOptCost);
				aft += parseFloat(data[idx].bfOptCost);
				
			}
		}
		if(bf ===0 ||aft ===0 ){return `${comma((aft-bf).toFixed(2))} 원 (0%)`};
		return `${comma((aft-bf).toFixed(2))} 원 (${Math.round((bf-aft)/bf*100)}%)`;
		
	}
	else{
		return "";
	}
	
	
	
}


function checkType(value,count,icon){
	count = comma(count);
	if(icon){
		return `📁`;
	}else{
		switch (value) {
		case 0:
			return `폴더 (${count}개)`;
			break;
		case 1:
			return `이미지 파일 (${count}개)`;
			break;
		case 2:
			return `비디오 파일 (${count}개)`;
			break;
		case 3:
			return `텍스트 파일 (${count}개)`;
			break;
		case 4:
			return `폰트 파일 (${count}개)`;
			break;
		default:
			return value;
			break;
		}
	}
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

function formatFileSize(fileSizeInBytes) {
    if (fileSizeInBytes >= 1073741824) {
      return (fileSizeInBytes / 1073741824).toFixed(2) + ' GB';
    } else if (fileSizeInBytes >= 1048576) {
      return (fileSizeInBytes / 1048576).toFixed(2) + ' MB';
    } else {
      return (fileSizeInBytes / 1024).toFixed(2) + ' KB';
    }
}


function calcCost(bytes,costPerGB){
	
	costPerGB = costPerGB / 1073741824; 
	
	// 과금량 계산
	var totalCost = (bytes * costPerGB).toFixed(2);
	if (totalCost % 1 === 0) {
		totalCost = parseInt(totalCost);
	}
	
	var resultHTML = comma(totalCost)+'<span style="font-size:15px;">원</span>';
	
	return resultHTML;
}




function calcCostNum(bytes,costPerGB){
	
	if(bytes === 0 ){return bytes;}
	costPerGB = costPerGB / 1073741824; 
	
	// 과금량 계산
	var totalCost = (bytes * costPerGB).toFixed(2);
	
	if (totalCost % 1 === 0) {
		totalCost = parseInt(totalCost);
	}
	
	//return Math.ceil(totalCost);
	return totalCost;
}


function calcCostNew(bytes){
	
	bytes = bytes / 1073741824; 
	
	// 과금량 계산
	var totalCost = bytes.toFixed(2);
	
	if (totalCost % 1 === 0) {
		totalCost = parseInt(totalCost);
	}
	
	//return Math.ceil(totalCost);
	return totalCost;
}

function calcCostNum2(bytes,costPerGB){
	
	if(bytes > 0) {
		bytes = bytes / 1073741824;
	}
	
	// 과금량 계산
	var totalCost = (bytes * costPerGB).toFixed(2);
	
	if (totalCost % 1 === 0) {
		totalCost = parseInt(totalCost);
	}
	
	//return Math.ceil(totalCost);
	return totalCost;
}


function intDate(dateString){
	
	const dateObject = new Date(dateString);

	// 년, 월, 일을 가져와서 정수로 합치기
	const year = dateObject.getFullYear();
	const month = dateObject.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줌
	const day = dateObject.getDate();
	const formattedInt = parseInt(`${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`, 10);

	return formattedInt;
}

function setSiteBox(){
	 
    $.ajax({
        url: 'getSiteList', 
        method: 'post',
        dataType: 'json',
        success: function (data) {
        	data= data.siteList;
        	pageList = data;
        	
            // 성공적으로 데이터를 받아왔을 때 실행되는 부분
            // 셀렉트 박스 초기화
            $('#siteBox').empty();
            // '사이트 전체' 옵션 추가
            $('#siteBox').append('<option value="0" selected="selected">페이지 전체</option>');
            // 받아온 데이터를 셀렉트 박스에 추가
            for (var i = 0; i < data.length; i++) {
            	$('#siteBox').append('<option value="' + data[i].page_no + '">' + data[i].page_name + '</option>');
                
			}
                
        },
        error: function (error) {
            // 에러 처리
            console.error('Error fetching site data:', error);
        }
    });	
}




function getCloud_payment(cloudNo){
	res = paymentData.cloud_payment;

	// 배열에서 cloud_no가 주어진 cloudNo와 일치하는 요소 찾기
    let cloudItem = res.find(item => item.cloud_no === cloudNo);
    result =cloudItem ? cloudItem.cloud_payment : null;
	
    return result;
}




function setPage_list(){
	$.ajax({
        url: 'getSiteList', 
        method: 'post',
        dataType: 'json',
        async:false,
        success: function (data) {
        	data= data.siteList;
        	result = data;
        	
        },
        error: function (error) {
            // 에러 처리
            console.error('Error fetching site data:', error);
        }
    });
	
	return result;
}

function getPage_name(page_no){
	
	
	
	
	let cloudItem = pageList.find(item => item.page_no === page_no);
    result =cloudItem ? cloudItem.page_name : null;
	
    return result;
}

function setPayment_data(){
	$.ajax({
		type: 'POST',
		url: '/selectCloud_payment',
		async: false,
		success: function(res) {
			result= res;
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	return result;
}





function selectResourceListByParentId(resource_parent_no){
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
	    	search_page : search_page
	    };
	
	table_resource = new Tabulator("#volist", {
		height:"100%",
		selectable:true,
	    pagination:true, //enable pagination
	    paginationMode:"remote", //enable remote pagination
	    sortMode: "remote",
	    ajaxURL:"/selectResourceListByParentId", //set url for ajax request
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
	    		// 절감률 계산
	    		response.data[i].saving_rate = decreaseRate(response.data[i].resource_new_size_type1, response.data[i].resource_new_size_type2);
	    
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
			{
				formatter:"rowSelection", 
				titleFormatter:"rowSelection", 
				titleFormatterParams:{
					rowRange:"active" //only toggle the values of the active filtered rows
				}, 
				hozAlign:"center", 
				headerSort:false,
				width: 50
			},	    	
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
	    		title: "상태",
	    		field: "resource_status",
	    		width: 120,
	    		hozAlign: "center",
	    		headerSort:true,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			let result = "";
	    			let rowData = cell.getRow().getData();
	    			switch(cell.getValue()){
	    				case 1 : result = `<span class="status status-green">최적화 완료</span>`; break;
	    				case 11 : result = `<span class="status status-yellow">최적화 진행 중</span>`; break;
	    				case 0 : result = `<span class="status status-orage">최적화 대기</span>`; break;	    				
	    				case -1 : result = `<span class="status status-gray">미적용</span>`; break;
	    				case 2 : result = `<span class="status status-red">최적화 해제</span>`; break;
	    			}
	    			if(rowData['resource_type'] == 0){
	    				result = "";
	    			}
	    			if(rowData['resource_org_size'] < 0){
	    				result = `<ion-icon name="close-circle-outline" style="font-size:1.3em; color:#b4b4b4; position:relative; top:7px;"></ion-icon>`;
	    			}
	    			return result;
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
	    		field: "call_cnt",
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
	    		title: "비용 절감율",
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
	    	{
	    		title: "상세보기",
	    		field: "detail_btn",
	    		hozAlign: "right",
	    		headerSort:false,
	    		width: 150,
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return cell.getValue();
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
				console.log(`selectedNodeId : ${selectedNodeId} | parentNode : ${parentNode}`);
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
		let countArray = countResourceFolder(data);
		console.log(`===== count Array =====`)
		console.log(data);
		console.log(countArray);
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
		console.log(selectedData.length);
		if(selectedData.length > 0){
			selectedItemOptimizeBtn.prop("disabled", false);
			selectedItemUnbindBtn.prop("disabled", false);
		}else{
			selectedItemOptimizeBtn.prop("disabled", true);
			selectedItemUnbindBtn.prop("disabled", true);			
		}
	});

}