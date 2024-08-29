
function updateUserStep(data) {
	let result = "";
	$.ajax({
		type: 'POST',
		url: '/updateUserStep',
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

function selectUserBySn(lgn_sn) {
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectUserBySn',
		data: {lgn_sn : lgn_sn},
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
