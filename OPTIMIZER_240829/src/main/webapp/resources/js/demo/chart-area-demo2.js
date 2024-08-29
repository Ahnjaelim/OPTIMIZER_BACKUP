// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

var dateCntArray = countResourceByRgstrDate(13353);
var dates = dateCntArray.map(item => item.rgstr_date);
var counts = dateCntArray.map(item => item.count);

var datasets = [];

var logList = selectResourceLogAllByResourceNo(13353);
var originalData = {};
originalData.label = `최적화 전`;
originalData.data = [];
originalData.borderColor = "#dc3545";
originalData.backgroundColor = transparentize(originalData.borderColor, 0.5);
originalData.fill = "1";
for(let j = 0; j < dateCntArray.length; j++){
	let value = dateCntArray[j].count * logList[0].resource_org_size;
	originalData.data.push(value);
}

datasets.push(originalData);

var afterCntArray = countResourceLogAllByResourceNo(13353);
var afterData = {};
afterData.label = `최적화 후`;
afterData.data = [];
afterData.borderColor = "#0d6efd";
afterData.backgroundColor = transparentize(afterData.borderColor, 0.5);	
for(let j = 0; j < dateCntArray.length; j++){
	let value = dateCntArray[j].count * afterCntArray[j].size2;
	afterData.data.push(value);
}
datasets.push(afterData);

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

var ctx = document.getElementById("myAreaChart");
function drawChart(){
	var myLineChart = new Chart(ctx, {
	  type: 'line',
	  data: {
	      labels: dates,
	      datasets: datasets,
	  },
	  options: {
	    maintainAspectRatio: false,
	    layout: {
	      padding: {
	        left: 10,
	        right: 25,
	        top: 25,
	        bottom: 0
	      }
	    },
	    scales: {
	      xAxes: [{
	        time: {
	          unit: 'date'
	        },
	        gridLines: {
	          display: true,
	          drawBorder: true
	        },
	        ticks: {
	          // maxTicksLimit: 7
	        }
	      }],
	      yAxes: [{
	        ticks: {
	          maxTicksLimit: 5,
	          padding: 10,
	          
	        },
	        gridLines: {
	        	display:true,
	          color: "rgb(200, 200, 200)",
	          zeroLineColor: "rgb(200, 200, 200)",
	          drawBorder: true,
	          borderDash: [2],
	          zeroLineBorderDash: [2]
	        }
	      }],
	    },
	    legend: {
	      display: true
	    },
	    tooltips: {
	      backgroundColor: "rgb(255,255,255)",
	      bodyFontColor: "#858796",
	      titleMarginBottom: 10,
	      titleFontColor: '#6e707e',
	      titleFontSize: 14,
	      borderColor: '#dddfeb',
	      borderWidth: 1,
	      xPadding: 15,
	      yPadding: 15,
	      displayColors: false,
	      intersect: false,
	      mode: 'point',
	      caretPadding: 10,
	      callbacks: {}
	    }
	  }
	});	
}


// 색상의 투명도를 조절하는 함수
function transparentize(color, transparency) {
    var alpha = transparency || 0.5;
    return Color(color).alpha(alpha).rgbString();
}

function generateColors() {
    var borderColor = getRandomColorFromPalette();
    var backgroundColor = transparentize(borderColor, 0.5);

    return {
        borderColor: borderColor,
        backgroundColor: backgroundColor,
    };
}

function countResourceByRgstrDate(resource_no){
	let result = null;
	$.ajax({
		type: 'POST',
		url: '/countResourceByRgstrDate',
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
	let result = null;
	$.ajax({
		type: 'POST',
		url: '/selectResourceLogAllByResourceNo',
		data:{
			resource_no : resource_no,
			order : "ASC",
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

function countResourceLogAllByResourceNo(resource_no){
	let result = null;
	$.ajax({
		type: 'POST',
		url: '/countResourceLogAllByResourceNo',
		data:{
			resource_no : resource_no,
			order : "ASC",
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

