
function selectAvgCompRate_v2(){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectAvgCompRate_v2',
		data:{},
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

function updateVisitDate() {
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/updateVisitDate',
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

function selectOptimizedAvgCompRate() {
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectOptimizedAvgCompRate',
		data:{},
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

function analysisSelectAll(){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/analysisSelectAll',
		data:{},
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

function selectNewResourceAll(use_unstrfile){
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: '/selectNewResourceAll',
            data: {use_unstrfile : use_unstrfile},
            success: function(res) {
                resolve(res);
            },
            error: function(error) {
                console.error(error);
                reject(error);
            }
        });
    });	
}

function selectResourceAllUnoptimized(){
	/*
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectResourceAllUnoptimized',
		data:{},
		async: false,
		success: function(res) {
			result = res;
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	return result;*/
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: '/selectResourceAllUnoptimized',
            data: {},
            success: function(res) {
                resolve(res);
            },
            error: function(error) {
                console.error(error);
                reject(error);
            }
        });
    });	
}

function selectMonthlyTrafficPredict(){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectMonthlyTrafficPredict',
		data:{
			startDateParam : urlParams.get("startDate")				
			
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

function selectCountByResourceStatus(){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectCountByResourceStatus',
		data:{},
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

function selectMonthlyTrafficByType(){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectMonthlyTrafficByType',
		data:{
			startDateParam : urlParams.get("startDate")
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

function selectFolderAll(){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectFolderAll',
		data:{},
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

/*
function selectSumResourceSize(param){
	let result = "";
	let data = {};
	if (param && param.hasOwnProperty('endDate_ts') && param.endDate_ts !== null && param.endDate_ts !== undefined) {
		data.endDate_ts = param.endDate_ts;
	}
	if (param && param.hasOwnProperty('startDate_ts') && param.startDate_ts !== null && param.startDate_ts !== undefined) {
		data.startDate_ts = param.startDate_ts;
	}
	$.ajax({
		type: 'GET',
		url: '/selectSumResourceSize',
		data: data,
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
*/


function selectSumResourceSize(use_unstrfile) {
	/*
    let data = {};
    if (param && param.hasOwnProperty('endDate_ts') && param.endDate_ts !== null && param.endDate_ts !== undefined) {
        data.endDate_ts = param.endDate_ts;
    }
    if (param && param.hasOwnProperty('startDate_ts') && param.startDate_ts !== null && param.startDate_ts !== undefined) {
        data.startDate_ts = param.startDate_ts;
    }
    data.use_unstrfile
	*/
	if(use_unstrfile == undefined){
		use_unstrfile = 0;
	}
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: '/selectSumResourceSize',
            data: {use_unstrfile : use_unstrfile},
            success: function(res) {
                resolve(res);
            },
            error: function(error) {
                console.error(error);
                reject(error);
            }
        });
    });
}


function selectSumResourceSizeTemp(){
	console.log("왜이래");
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectSumResourceSize',
		data:{},
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


function selectAvgTime(){
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: '/selectAvgTime',
            data: {},
            success: function(res) {
                resolve(res);
            },
            error: function(error) {
                console.error(error);
                reject(error);
            }
        });
    });	
}

function selectAvgTimeByType(){
	/*
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectAvgTimeByType',
		data:{},
		async: false,
		success: function(res) {
			result = res;
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	return result;*/
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: '/selectAvgTimeByType',
            data: {},
            success: function(res) {
                resolve(res);
            },
            error: function(error) {
                console.error(error);
                reject(error);
            }
        });
    });	
}

function updateResourceTimeReset(){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/updateResourceTimeReset',
		data:{},
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

function optimizerCheckTimeAgent(param){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/optimizerCheckTimeAgent',
		data: param,
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

function selectSumResourceSize_v2(param){
	let result = "";
	let data = {};
	if (param && param.hasOwnProperty('endDate_ts') && param.endDate_ts !== null && param.endDate_ts !== undefined) {
		data.endDate_ts = param.endDate_ts;
	}
	if (param && param.hasOwnProperty('startDate_ts') && param.startDate_ts !== null && param.startDate_ts !== undefined) {
		data.startDate_ts = param.startDate_ts;
	}
	
	$.ajax({
		type: 'GET',
		url: '/selectSumResourceSize_v2',
		data: data,
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

function selectLatestCheckTimeAgent(){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectLatestCheckTimeAgent',
		data: {},
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

function optimizerCheckTimeAgentProcess(){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/optimizerCheckTimeAgentProcess',
		data: {},
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

function selectResourceListByParentIdAjax(paramData){
	let result = "";
	let selectedNodeId = null; 
	if($('#explorer .content').jstree(true)){
		selectedNodeId = $('#explorer .content').jstree(true).get_selected()[0];		
	}
	let param = searchDataInit();
	param.page = 1;
	param.size = 2000;
    let queryString = "page=1&size=2000";
    
    if (paramData && 'is_submenu' in paramData && paramData.is_submenu !== undefined) {
    }else{
    	queryString += `&time_not_null=true`;
    }
    
    if (paramData && 'update' in paramData && paramData.update !== undefined && paramData.update == 1) {
    	queryString += `&update=1`;
    }else{
    	queryString += `&update=0`;    	
    }
    
    if(selectedNodeId != undefined){
    	queryString += `&resource_parent_no=${selectedNodeId}`;
    }
    
    param.resource_status_array.forEach(status => {
        queryString += `&resource_status_array=${status}`;
    });
    
    param.resource_type_array.forEach(type => {
        queryString += `&resource_type_array=${type}`;
    });
    queryString += `&search_range=${param.search_range}`;
    queryString += `&search_keyword=${param.search_keyword}`;
    queryString += `&search_disable=${param.search_disable}`;
    queryString += `&search_page=${param.search_page}`;
    if(param.with_log && param.with_log != undefined){
    	queryString += `&with_log=${param.with_log}`;    	
    }
    if(param.startDate_ts && param.startDate_ts != undefined){
    	queryString += `&startDate_ts=${param.startDate_ts}`;    	
    }      
    if(param.endDate_ts && param.endDate_ts != undefined){
    	queryString += `&endDate_ts=${param.endDate_ts}`;    	
    }
    if(param.precondition_status && param.precondition_status != undefined){
    	queryString += `&precondition_status=${param.precondition_status}`;    	
    } 
    
    
    
	$.ajax({
		type: 'GET',
		url: '/selectResourceListByParentIdAjax',
		data: queryString,
		contentType: 'application/json',
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

function selectCountGroupByTypeAndStatus() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: '/selectCountGroupByTypeAndStatus',
            data: {},
            success: function(res) {
                resolve(res);
            },
            error: function(error) {
                console.error(error);
                reject(error);
            }
        });
    });
}

function selectResourceByResourceNo(resource_no){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/selectResourceByResourceNo',
		data:{
			resource_no : resource_no,
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

function selectResourceLogAllByResourceNo(resource_no){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/selectResourceLogAllByResourceNo',
		data:{
			resource_no : resource_no,
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

function selectByPageNo(page_no){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectByPageNo',
		data:{
			page_no : page_no,
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


function selectResourceByResourceOrg(resource_org){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/selectResourceByResourceOrg',
		data:{
			resource_org : resource_org,
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

/***
 * 1. 함수명 : savedTraffic
 * 2. 작성일: 2023-05-23
 * 3. 작성자: 김조은
 * 4. 설명: 트래픽 받아오기
 * 5. 수정일: 
 * ***/	
function savedTraffic(){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/savedTraffic',
		data:{},
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

function selectPageAllByResourceNo(resource_no){
	let result = [];
	$.ajax({
		type: 'POST',
		url: '/selectPageAllByResourceNo',
		data:{
			resource_no : resource_no,
		},
		async: false,
		success: function(res) {
			result.push(res.data);
			result.push(res.jstreeData);
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	return result;
}

/***
 * 1. 함수명 : selectResourceAllByPageNo
 * 2. 작성일: 2023-12-27
 * 3. 작성자: 안재림
 * 4. 설명: 페이지 번호로 해당 페이지의 리소스 받아오기
 * 5. 수정일: 
 * ***/	
function selectResourceAllByPageNo(page_no){
	let result = null;
	$.ajax({
		type: 'POST',
		url: '/selectResourceAllByPageNo',
		data:{
			page_no : page_no,
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

function selectResourceAllByCloudNo(){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/selectResourceAllByCloudNo',
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

function selectResourceAllByResourceStatus(resource_status){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/selectResourceAllByResourceStatus',
		data:{
			resource_status : resource_status
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

function intervalTest(){
	let result = null;
	let currentData = table_resource.getData();
	let testdata = [{resource_no : 1}, {resource_no : 2}];
	
	$.ajax({
		type: 'POST',
		url: '/intervalTest',
		contentType: 'application/json', // 데이터 형식을 JSON으로 지정
		data:JSON.stringify(currentData),
		async: false,
		success: function(res) {
	
		},
	    error: function onError (error) {
	        console.error(error);
	    }
	});
	return result;
}

function sendRequestToController(url) {
	let result = "";
    $.ajax({
    	async: false,
        type: "GET", // GET 또는 POST 등 적절한 HTTP 메서드를 선택
        url: url,
        success: function(response) {
            console.log("Controller Response:", response);
            result = response+"...";
            // 여기에서 서버 응답(response)에 대한 처리를 수행할 수 있습니다.
        },
        error: function() {
            console.error("Failed to send request to the controller.");
            result = "해당 파일을 찾을 수 없습니다.";
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
}

function updateResourceStatusByResourceNo(data) {
	let result = "";
	console.log(data);
    if (data) { // resource_no와 resource_status가 유효한지 확인
        $.ajax({
            type: 'GET',
            url: '/updateResourceStatusByResourceNo',
            data: data,
            async: false,
            success: function(res) {
                result = res.data;
                // console.log(result);
            },
            error: function onError (error) {
                console.error(error);
            }
        });
        return result;
    } else {
        console.error('Invalid data: resource_no and resource_status are required');
        return null; // 또는 원하는 기본값을 반환
    }
}

function countResourceFolder() {
	let data = searchDataInit();
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
    if(data.with_log && data.with_log != undefined){
    	queryString += `&with_log=${data.with_log}`;    	
    }
    if(data.startDate_ts && data.startDate_ts != undefined){
    	queryString += `&startDate_ts=${data.startDate_ts}`;    	
    }      
    if(data.endDate_ts && data.endDate_ts != undefined){
    	queryString += `&endDate_ts=${data.endDate_ts}`;    	
    }
    if(data.search_date && data.search_date != undefined){
    	queryString += `&search_date=${data.search_date}`;    	
    }    
    if(data.search_condition && data.search_condition != undefined){
    	queryString += `&search_condition=${data.search_condition}`;    	
    }    
    if(data.precondition_status && data.precondition_status != undefined){
    	queryString += `&precondition_status=${data.precondition_status}`;    	
    }   
    if(fileManagerType && fileManagerType != undefined){
    	queryString += `&filemanager_type=${fileManagerType}`;    	
    }else{
    	queryString += `&filemanager_type=1`;
    }
	// console.log(queryString);
	$.ajax({
		type: 'GET',
		url: '/countResourceFolder',
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

function selectPageByPageNo(page_no) {
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectPageByPageNo',
		data:{
			page_no : page_no
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

function selectPageByPageName(page_name) {
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectPageByPageName',
		data:{
			page_name : page_name
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

function selectResourceAllOptimizing(use_unstrfile) {
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectResourceAllOptimizing',
		data:{use_unstrfile : use_unstrfile},
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

function cancelOptimizingResourceAll() {
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/cancelOptimizingResourceAll',
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

function excuteOptimizeAll(use_unstrfile) {
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/excuteOptimizeAll',
		data:{use_unstrfile : use_unstrfile},
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

function updateLazyloadButton(page_no, use_lazyload){
	let result = "";

	$.ajax({
		type: 'POST',
		url: '/updateLazyloadButton',
		data:{
			page_no : page_no,
			use_lazyload : use_lazyload
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
function updateLazyloadButtonAll(use_lazyload){
	let result = "";

	$.ajax({
		type: 'POST',
		url: '/updateLazyloadButtonAll',
		data:{
			use_lazyload : use_lazyload
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

function updateLazyloadStatus() {
	let result = "";

	$.ajax({
		type: 'GET',
		url: '/updateLazyloadStatus',
		data:[],
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
/*function selectResourceAllWithLatestLogByParentId_v2(endDate_ts) {
	let result = "";

	$.ajax({
		type: 'GET',
		url: '/updateLazyloadStatus',
		data:{endDate_ts : endDate_ts},
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


function updateResourceConditionByResourceNo(param){
	console.log(param);
    // 유효성 검사
    if (!param || typeof param !== 'object') {
        console.error("Invalid parameter: param must be an object.");
        return "Invalid parameter";
    }

    if (param.resource_no === null || param.resource_no === undefined || typeof param.resource_no !== 'number') {
        console.error("Invalid parameter: resource_no must be a number.");
        return "Invalid parameter";
    }

    if (param.resource_condition === null || param.resource_condition === undefined || typeof param.resource_condition !== 'number') {
        console.error("Invalid parameter: resource_condition must be a number.");
        return "Invalid parameter";
    }
    
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/updateResourceConditionByResourceNo',
		data:{
			resource_no : param.resource_no,
			resource_condition : param.resource_condition
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

function updateResourceTimeReset() {
	let result = "";

	$.ajax({
		type: 'POST',
		url: '/updateResourceTimeReset',
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

function selectResourceTop10(data) {
	let result = "";

	$.ajax({
		type: 'GET',
		url: '/selectResourceTop10',
		data: data,
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

function selectSizeGroupByType() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: '/selectSizeGroupByType',
            data: {},
            success: function(res) {
                resolve(res);
            },
            error: function(error) {
                console.error(error);
                reject(error);
            }
        });
    });
}

function selectUserCount(){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectUserCount',
		data:{},
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

function selectResourceTypeCountByPage(page_no){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectResourceTypeCountByPage',
		data:{
			page_no : page_no
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

function selectResourceCountByPage(){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectResourceCountByPage',
		data:{},
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

/**
 * 페이지 병목현상 가져오기
 * @param {Object} data
 * @property {number} startIndex : 값이 없으면 오늘 데이터 전체 가져옴
 * @property {number} limit : 리밋
 * @returns {number} data : 응답 코드
 */
function selectPageSpeedLog(data){
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: '/selectPageSpeedLog',
            data: data,
            success: function(res) {
                resolve(res);
            },
            error: function(error) {
                console.error(error);
                reject(error);
            }
        });
    });	
}

/**
 * 페이지 단위로 리소스 상태 업데이트
 * @param {Object} data
 * @property {number} page_no : 업데이트 할 페이지 sn
 * @property {number} resource_status : 업데이트 할 상태값 
 * @returns {number} data : 응답 코드
 */
function updateResourceStatusByPageNo(data){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/updateResourceStatusByPageNo',
		data: data,
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

function selectResourceAllOptimizingByPage(page_no){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectResourceAllOptimizingByPage',
		data: {page_no: page_no},
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

async function selectQueryTest() {
    try {
        const result = await $.ajax({
            type: 'GET',
            url: '/selectQueryTest',
            data: {}
        });
        return result;
    } catch (error) {
        console.error(error);
        throw error; // 에러를 호출한 곳으로 전달
    }
}

function selectResourceStatusSummaryByPage(page_no){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectResourceStatusSummaryByPage',
		data: {page_no: page_no},
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

function selectFirstPage(site_no){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectFirstPage',
		data: {site_no : site_no},
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

function requestLightHouse(data){
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: '/requestLightHouse',
            data: data,
            success: function(res) {
                resolve(res);
            },
            error: function(error) {
                console.error(error);
                reject(error);
            }
        });
    });	
}

function selectLightHouse(data){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectLightHouse',
		data: data,
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