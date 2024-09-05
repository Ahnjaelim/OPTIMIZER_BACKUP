
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

function requestResourceCollection(page_url){
	/*
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/requestResourceCollection',
		data: {page_url : page_url},
		async: false,
		success: function(res) {
			result = res.data;
		},
		error: function onError (error) {
			console.error(error);
		}
	});
	return result;*/
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: '/requestResourceCollection',
            data: {page_url : page_url},
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

function selectPageByPageUrl(page_url){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectPageByPageUrl',
		data: {page_url : page_url},
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

function selectResourceAllByPageNo(page_no){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectResourceAllByPageNo',
		data: {page_no : page_no},
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

function requestResourceOptimize(page_no){
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: '/requestResourceOptimize',
            data: {page_no : page_no},
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

function selectPageByPageNo(page_no){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectPageByPageNo',
		data: {page_no : page_no},
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

function selectResourceTypeCountByPage(page_no){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectResourceTypeCountByPage',
		data: {page_no : page_no},
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

function updatePageCollStatus(data){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/updatePageCollStatus',
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

function updatePageOptStatus(data){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/updatePageOptStatus',
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

function selectResourceTimeAnalysisByPage(page_no){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectResourceTimeAnalysisByPage',
		data: {page_no : page_no},
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

function test(){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/test',
		data: {},
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

function updatePageResult(data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: '/updatePageResult',
            data: data,
            success: function(res) {
                resolve(res.data); // 성공 시 결과를 resolve
            },
            error: function onError(error) {
                reject(error); // 오류 발생 시 reject
            }
        });
    });
}

function selectResourceAllByPageNoTabulator(data){
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectResourceAllByPageNoTabulator',
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

function insertPage(page_url){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/insertPage',
		data: {page_url : page_url},
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

function updateResourceStatusByPageNo(data){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/updateResourceStatusByPageNo',
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

/**
 * 
 * @param nid, resource_status
 * @returns
 */
function updateResourceStatusByNid(data){
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/updateResourceStatusByNid',
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