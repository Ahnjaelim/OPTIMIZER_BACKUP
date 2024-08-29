
function selectFirstSite() {
	let result = "";
	$.ajax({
		type: 'GET',
		url: '/selectFirstSite',
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

