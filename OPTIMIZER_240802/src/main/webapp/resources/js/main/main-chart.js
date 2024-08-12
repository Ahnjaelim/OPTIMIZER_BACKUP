// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
/*var ctx = document.getElementById("myPieChart").getContext('2d');
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Direct", "Referral", "Social"],
    datasets: [{
      data: [85, 15],
      backgroundColor: ['#dce3f9', '#3c59ad'],
      hoverBackgroundColor: ['#ffffff', '#3853a1'],
      hoverBorderColor: "rgba(234, 236, 244, 0)",
      borderWidth: 0,
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
    	enabled: false,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: 'transparent',
      borderWidth: 0,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});*/


function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    const range = end - start;
    let currentTime = 0;
    const increment = 20; // 애니메이션 프레임 속도

    const animate = function() {
      currentTime += increment;
      const val = easeInOutQuad(currentTime, start, range, duration);
      obj.innerHTML = Math.floor(val) + '%';

      if (currentTime < duration) {
        requestAnimationFrame(animate);
      } else {
        obj.innerHTML = end + '%';
      }
    };

    animate();
  }


/*window.onload = function() {
    animateValue("counter", 0, 85, 2000); // 시작값, 목표값, 애니메이션 지속 시간(ms)
  };*/
  
/* ================================================================================ Area Chart */
  
  function number_format(number, decimals, dec_point, thousands_sep) {
	  // * example: number_format(1234.56, 2, ',', ' ');
  // * return: '1 234,56'
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

// Area Chart Example
//var costAreaChart = document.getElementById("costAreaChart");
//var myLineChart = new Chart(costAreaChart, {
//  type: 'line',
//  data: {
//    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//    datasets: [{
//      label: "Earnings",
//      lineTension: 0.3,
//      backgroundColor: "rgba(78, 115, 223, 0.05)",
//      borderColor: "rgba(78, 115, 223, 1)",
//      pointRadius: 3,
//      pointBackgroundColor: "rgba(78, 115, 223, 1)",
//      pointBorderColor: "rgba(78, 115, 223, 1)",
//      pointHoverRadius: 3,
//      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
//      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
//      pointHitRadius: 10,
//      pointBorderWidth: 2,
//      data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
//    }],
//  },
//  options: {
//    maintainAspectRatio: false,
//    layout: {
//      padding: {
//        left: 10,
//        right: 25,
//        top: 25,
//        bottom: 0
//      }
//    },
//    scales: {
//      xAxes: [{
//        time: {
//          unit: 'date'
//        },
//        gridLines: {
//          display: false,
//          drawBorder: false
//        },
//        ticks: {
//          maxTicksLimit: 7
//        }
//      }],
//      yAxes: [{
//        ticks: {
//          maxTicksLimit: 5,
//          padding: 10,
//          // Include a dollar sign in the ticks
//          callback: function(value, index, values) {
//            return '$' + number_format(value);
//          }
//        },
//        gridLines: {
//          color: "rgb(234, 236, 244)",
//          zeroLineColor: "rgb(234, 236, 244)",
//          drawBorder: false,
//          borderDash: [2],
//          zeroLineBorderDash: [2]
//        }
//      }],
//    },
//    legend: {
//      display: false
//    },
//    tooltips: {
//      backgroundColor: "rgb(255,255,255)",
//      bodyFontColor: "#858796",
//      titleMarginBottom: 10,
//      titleFontColor: '#6e707e',
//      titleFontSize: 14,
//      borderColor: '#dddfeb',
//      borderWidth: 1,
//      xPadding: 15,
//      yPadding: 15,
//      displayColors: false,
//      intersect: false,
//      mode: 'index',
//      caretPadding: 10,
//      callbacks: {
//        label: function(tooltipItem, chart) {
//          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
//          return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
//        }
//      }
//    }
//  }
//});
  
  var costAreaChart = document.getElementById("costAreaChart");

  var data = {
      labels: [],
      datasets: [{
              label: "기존 비용",
              lineTension: 0.3,
              backgroundColor: "rgba(204, 204, 204, 0.3)", // 적절한 다른 색상 사용
              borderColor: "rgba(153, 153, 153, 1)", // 적절한 다른 색상 사용
              pointRadius: 3,
              pointBackgroundColor: "rgba(153, 153, 153, 1)", // 적절한 다른 색상 사용
              pointBorderColor: "rgba(153, 153, 153, 1)", // 적절한 다른 색상 사용
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "rgba(153, 153, 153, 1)", // 적절한 다른 색상 사용
              pointHoverBorderColor: "rgba(153, 153, 153, 1)", // 적절한 다른 색상 사용
              pointHitRadius: 10,
              pointBorderWidth: 2,
              data: [],
          },
          {
          label: "최적화된 비용",
          lineTension: 0.3,
          backgroundColor: "rgba(51, 102, 204, 1)",
          borderColor: "rgba(78, 115, 223, 1)",
          pointRadius: 3,
          pointBackgroundColor: "rgba(78, 115, 223, 1)",
          pointBorderColor: "rgba(78, 115, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
          pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: [],
      }],
  };

  var options = {
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
                  display: false,
                  drawBorder: false
              },
              ticks: {
                  maxTicksLimit: 7
              }
          }],
          yAxes: [{
              ticks: {
            	  min: 0, // 최소값을 0으로 설정
                  maxTicksLimit: 5,
                  padding: 10,
                  callback: function(value, index, values) {
                      return  number_format(value)+'원';
                  }
              },
              gridLines: {
                  color: "rgb(234, 236, 244)",
                  zeroLineColor: "rgb(234, 236, 244)",
                  drawBorder: false,
                  borderDash: [2],
                  zeroLineBorderDash: [2]
              }
          }],
      },
      legend: {
          display: false
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
          mode: 'index',
          caretPadding: 10,
          callbacks: {
              label: function(tooltipItem, chart) {
                  var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                  return datasetLabel + ': ' + number_format(tooltipItem.yLabel)+'원';
              }
          }
      }
  };

  var myLineChart = new Chart(costAreaChart, {
      type: 'line',
      data: data,
      options: options
  });
  
  var currentDate_f = new Date();

  /*function updateChartData(load) {
	  console.log("첫 진입 확인 = "+load);      

      var currentDate = new Date();
      
      
	  if(load != undefined && load != null) { // 첫 로드 시점 현재 시간으로 부터 5분전 데이터 까지 가져오
		  
		  for(var i=4;i>=0;i--) {
		      var fiveMinutesAgo = new Date(currentDate_f.getTime() - i * 2 * 1000); // 10초(밀리초 단위)
			  var formattedDate = formatDate(fiveMinutesAgo);

			  var year = parseInt(fiveMinutesAgo.getFullYear());
			  var month = numberPad(parseInt(fiveMinutesAgo.getMonth() + 1),2);
			  var day = numberPad(parseInt(fiveMinutesAgo.getDate()),2);
			  var hours = numberPad(parseInt(fiveMinutesAgo.getHours()),2);
			  var minutes = numberPad(parseInt(fiveMinutesAgo.getMinutes()),2);
			  var seconds = numberPad(parseInt(fiveMinutesAgo.getSeconds()),2);
			  
			  var tenSecondsAgo = new Date(fiveMinutesAgo.getTime() - 2 * 1000); // 2초 전 시간
		      

			  var year_st = numberPad(parseInt(tenSecondsAgo.getFullYear()),2);
			  var month_st = numberPad(parseInt(tenSecondsAgo.getMonth() + 1),2);
			  var day_st = numberPad(parseInt(tenSecondsAgo.getDate()),2);
			  var hours_st = numberPad(parseInt(tenSecondsAgo.getHours()),2);
			  var minutes_st = numberPad(parseInt(tenSecondsAgo.getMinutes()),2);
			  var seconds_st = numberPad(parseInt(tenSecondsAgo.getSeconds()),2);
			  
			  console.log("날짜 확인 = "+year+month+day+hours+minutes);
			  
			  $.ajax({
					type : 'post',
					url : '/getCostChart',
					data : {
						rgstr_date: year+''+month+''+day,
						rgstr_hour: hours,
						rgstr_min: minutes,
						rgstr_dt: year+''+month+''+day+' '+hours+''+minutes+''+seconds,
						rgstr_dt_st: year_st+''+month_st+''+day_st+' '+hours_st+''+minutes_st+''+seconds_st,
						//selected_site_list: siteList
					},
					dataType : 'json',
					async: false,
					error: function(xhr, status, error){
						console.log(error);
					},
					success : function(json){
						var bytes = json.costVal;
						var orgBytes = json.costOrgVal;
						
						if(bytes == null) {
							bytes = 0;
							orgBytes = 0;
						}
						  
					    data.labels.push(formattedDate);		  
					    data.datasets[1].data.push(bytes.toFixed(2));
					    data.datasets[0].data.push(orgBytes.toFixed(2));

					    myLineChart.update();
					}
				});
			  
		  }
	  }else {

		  var year = parseInt(currentDate.getFullYear());
		  var month = numberPad(parseInt(currentDate.getMonth() + 1),2);
		  var day = numberPad(parseInt(currentDate.getDate()),2);
		  var hours = numberPad(parseInt(currentDate.getHours()),2);
		  var minutes = numberPad(parseInt(currentDate.getMinutes()),2);
		  var seconds = numberPad(parseInt(currentDate.getSeconds()),2);
		  var formattedDate = formatDate(currentDate);

	      var tenSecondsAgo = new Date(currentDate.getTime() - 2 * 1000); // 2초 전 시간


		  var year_st = numberPad(parseInt(tenSecondsAgo.getFullYear()),2);
		  var month_st = numberPad(parseInt(tenSecondsAgo.getMonth() + 1),2);
		  var day_st = numberPad(parseInt(tenSecondsAgo.getDate()),2);
		  var hours_st = numberPad(parseInt(tenSecondsAgo.getHours()),2);
		  var minutes_st = numberPad(parseInt(tenSecondsAgo.getMinutes()),2);
		  var seconds_st = numberPad(parseInt(tenSecondsAgo.getSeconds()),2);
		  
		  $.ajax({
				type : 'post',
				url : '/getCostChart',
				data : {
					rgstr_date: year+''+month+''+day,
					rgstr_hour: hours,
					rgstr_min: minutes,
					rgstr_dt: year+''+month+''+day+' '+hours+''+minutes+''+seconds,
					rgstr_dt_st: year_st+''+month_st+''+day_st+' '+hours_st+''+minutes_st+''+seconds_st,
					//selected_site_list: siteList
				},
				dataType : 'json',
				error: function(xhr, status, error){
					console.log(error);
				},
				success : function(json){
					var bytes = json.costVal;
					var orgBytes = json.costOrgVal;
					
					if(bytes == null) {
						bytes = 0;
						orgBytes = 0;
					}
					
					  
				    data.labels.push(formattedDate);		  
				    data.datasets[1].data.push(bytes.toFixed(2));
				    data.datasets[0].data.push(orgBytes.toFixed(2));

				    myLineChart.update();
				}
			});
	  }

      if (data.labels.length > 8) {
          data.labels.shift();
          data.datasets[0].data.shift();
          data.datasets[1].data.shift();
      }
  }*/

  //setInterval(updateChartData, 2000);

  // Helper function for formatting numbers
  function number_format(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function formatDate(date) {
	  const year = String(date.getFullYear()).slice(-2);
	  const month = String(date.getMonth() + 1).padStart(2, '0');
	  const day = String(date.getDate()).padStart(2, '0');
	  const hours = String(date.getHours()).padStart(2, '0');
	  const minutes = String(date.getMinutes()).padStart(2, '0');
	  const seconds = String(date.getSeconds()).padStart(2, '0');

	  return `${hours}:${minutes}:${seconds}`;
	}
  function numberPad(n, width) {
	    n = n + '';
	    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
	}

/* ================================================================================ Area Chart 2 */

//Area Chart Example
/*var trafficAreaChartDiv = document.getElementById("trafficAreaChart");
var trafficAreaChart = new Chart(trafficAreaChartDiv, {
  type: 'line',
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Earnings",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
    }],
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
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return number_format(value)+'원';
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
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
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': ' + number_format(tooltipItem.yLabel)+'원';
        }
      }
    }
  }
});*/
  
  var costAreaChart = document.getElementById("trafficAreaChart");

  var data2 = {
      labels: [],
      datasets: [{
          label: "기존 트래픽",
          lineTension: 0.3,
          backgroundColor: "rgba(204, 204, 204, 0.3)", // 적절한 다른 색상 사용
          borderColor: "rgba(153, 153, 153, 1)", // 적절한 다른 색상 사용
          pointRadius: 3,
          pointBackgroundColor: "rgba(153, 153, 153, 1)", // 적절한 다른 색상 사용
          pointBorderColor: "rgba(153, 153, 153, 1)", // 적절한 다른 색상 사용
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(153, 153, 153, 1)", // 적절한 다른 색상 사용
          pointHoverBorderColor: "rgba(153, 153, 153, 1)", // 적절한 다른 색상 사용
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: [],
      },
          {
          label: "최적화된 트래픽",
          lineTension: 0.3,
          backgroundColor: "rgba(51, 102, 204, 1)",
          borderColor: "rgba(78, 115, 223, 1)",
          pointRadius: 3,
          pointBackgroundColor: "rgba(78, 115, 223, 1)",
          pointBorderColor: "rgba(78, 115, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
          pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: [],
      }],
  };

  var options = {
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
                  display: false,
                  drawBorder: false
              },
              ticks: {
                  maxTicksLimit: 7
              }
          }],
          yAxes: [{
              ticks: {
            	  min: 0, // 최소값을 0으로 설정
                  maxTicksLimit: 5,
                  padding: 10,
                  callback: function(value, index, values) {
                      return  number_format(value)+'GB';
                  }
              },
              gridLines: {
                  color: "rgb(234, 236, 244)",
                  zeroLineColor: "rgb(234, 236, 244)",
                  drawBorder: false,
                  borderDash: [2],
                  zeroLineBorderDash: [2]
              }
          }],
      },
      legend: {
          display: false
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
          mode: 'index',
          caretPadding: 10,
          callbacks: {
              label: function(tooltipItem, chart) {
                  var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                  return datasetLabel + ': ' + number_format(tooltipItem.yLabel)+'GB';
              }
          }
      }
  };

  var myTrafficLineChart = new Chart(trafficAreaChart, {
      type: 'line',
      data: data2,
      options: options
  });

/*  function updatetrafficAreaChartData(load) {
	  console.log("첫 진입 확인 = "+load);      

      var currentDate = new Date();
      
	  if(load != undefined && load != null) { // 첫 로드 시점 현재 시간으로 부터 5분전 데이터 까지 가져오
		  
		  for(var i=4;i>=0;i--) {
		      var fiveMinutesAgo = new Date(currentDate_f.getTime() - i * 2 * 1000); // 50초(밀리초 단위)
			  var formattedDate = formatDate(fiveMinutesAgo);

			  var year = parseInt(fiveMinutesAgo.getFullYear());
			  var month = numberPad(parseInt(fiveMinutesAgo.getMonth() + 1),2);
			  var day = numberPad(parseInt(fiveMinutesAgo.getDate()),2);
			  var hours = numberPad(parseInt(fiveMinutesAgo.getHours()),2);
			  var minutes = numberPad(parseInt(fiveMinutesAgo.getMinutes()),2);
			  var seconds = numberPad(parseInt(fiveMinutesAgo.getSeconds()),2);

			  var tenSecondsAgo = new Date(fiveMinutesAgo.getTime() - 2 * 1000); // 10초 전 시간
		      

			  var year_st = numberPad(parseInt(tenSecondsAgo.getFullYear()),2);
			  var month_st = numberPad(parseInt(tenSecondsAgo.getMonth() + 1),2);
			  var day_st = numberPad(parseInt(tenSecondsAgo.getDate()),2);
			  var hours_st = numberPad(parseInt(tenSecondsAgo.getHours()),2);
			  var minutes_st = numberPad(parseInt(tenSecondsAgo.getMinutes()),2);
			  var seconds_st = numberPad(parseInt(tenSecondsAgo.getSeconds()),2);
			  
			  console.log("날짜 확인 = "+year+month+day+hours+minutes+seconds);
			  
			  $.ajax({
					type : 'post',
					url : '/getTrafficChart',
					data : {
						rgstr_date: year+''+month+''+day,
						rgstr_hour: hours,
						rgstr_min: minutes,
						rgstr_dt: year+''+month+''+day+' '+hours+''+minutes+''+seconds,
						rgstr_dt_st: year_st+''+month_st+''+day_st+' '+hours_st+''+minutes_st+''+seconds_st,
						//selected_site_list: siteList
					},
					dataType : 'json',
					async: false,
					error: function(xhr, status, error){
						console.log(error);
					},
					success : function(json){
						//costPerGB = costPerGB / 1073741824;
						var bytes = json.trafficVal;
						var orgBytes = json.orgTrafficVal;
						
						if(bytes == null) {
							bytes = 0;
						}
						
						if(bytes > 0) {
							bytes = (bytes/1073741824).toFixed(2);
							orgBytes = (orgBytes/1073741824).toFixed(2);
						}
						  
					    data2.labels.push(formattedDate);		  
					    data2.datasets[1].data.push(bytes);
					    data2.datasets[0].data.push(orgBytes);
					    myTrafficLineChart.update();
					}
				});
			  
		  }
	  }else {

		  var year = parseInt(currentDate.getFullYear());
		  var month = numberPad(parseInt(currentDate.getMonth() + 1),2);
		  var day = numberPad(parseInt(currentDate.getDate()),2);
		  var hours = numberPad(parseInt(currentDate.getHours()),2);
		  var minutes = numberPad(parseInt(currentDate.getMinutes()),2);
		  var seconds = numberPad(parseInt(currentDate.getSeconds()),2);
		  var formattedDate = formatDate(currentDate);
		  
	      var tenSecondsAgo = new Date(currentDate.getTime() - 2 * 1000); // 10초 전 시간
	      

		  var year_st = numberPad(parseInt(tenSecondsAgo.getFullYear()),2);
		  var month_st = numberPad(parseInt(tenSecondsAgo.getMonth() + 1),2);
		  var day_st = numberPad(parseInt(tenSecondsAgo.getDate()),2);
		  var hours_st = numberPad(parseInt(tenSecondsAgo.getHours()),2);
		  var minutes_st = numberPad(parseInt(tenSecondsAgo.getMinutes()),2);
		  var seconds_st = numberPad(parseInt(tenSecondsAgo.getSeconds()),2);
		  
		  $.ajax({
				type : 'post',
				url : '/getTrafficChart',
				data : {
					rgstr_date: year+''+month+''+day,
					rgstr_hour: hours,
					rgstr_min: minutes,
					rgstr_dt: year+''+month+''+day+' '+hours+''+minutes+''+seconds,
					rgstr_dt_st: year+''+month+''+day+' '+hours+''+minutes+''+seconds_st,
					rgstr_dt_st: year_st+''+month_st+''+day_st+' '+hours_st+''+minutes_st+''+seconds_st,
					//selectedSite: siteString
				},
				dataType : 'json',
				error: function(xhr, status, error){
					console.log(error);
				},
				success : function(json){
					//costPerGB = costPerGB / 1073741824;
					var bytes = json.trafficVal;
					var orgBytes = json.orgTrafficVal;
					
					if(bytes == null) {
						bytes = 0;
					}
					
					if(bytes > 0) {
						bytes = (bytes/1073741824).toFixed(2);
						orgBytes = (orgBytes/1073741824).toFixed(2);
					}
					  
				    data2.labels.push(formattedDate);		  
				    data2.datasets[1].data.push(bytes);
				    data2.datasets[0].data.push(orgBytes);
				    myTrafficLineChart.update();
				}
			});
	  }

      if (data2.labels.length > 8) {
    	  data2.labels.shift();
    	  data2.datasets[0].data.shift();
    	  data2.datasets[1].data.shift();
      }

  }*/
  
  function updateMainAllChartData(load) {
	  console.log("첫 진입 확인 = "+load);      

      var currentDate = new Date();
      
	  if(load != undefined && load != null) { // 첫 로드 시점 현재 시간으로 부터 5분전 데이터 까지 가져오
		  
		  for(var i=4;i>=0;i--) {
		      var fiveMinutesAgo = new Date(currentDate_f.getTime() - i * 1 * 1000); // 5초(밀리초 단위)
			  var formattedDate = formatDate(fiveMinutesAgo);

			  var year = parseInt(fiveMinutesAgo.getFullYear());
			  var month = numberPad(parseInt(fiveMinutesAgo.getMonth() + 1),2);
			  var day = numberPad(parseInt(fiveMinutesAgo.getDate()),2);
			  var hours = numberPad(parseInt(fiveMinutesAgo.getHours()),2);
			  var minutes = numberPad(parseInt(fiveMinutesAgo.getMinutes()),2);
			  var seconds = numberPad(parseInt(fiveMinutesAgo.getSeconds()),2);

			  var tenSecondsAgo = new Date(fiveMinutesAgo.getTime() - 1 * 1000); // 1초 전 시간
		      

			  var year_st = numberPad(parseInt(tenSecondsAgo.getFullYear()),2);
			  var month_st = numberPad(parseInt(tenSecondsAgo.getMonth() + 1),2);
			  var day_st = numberPad(parseInt(tenSecondsAgo.getDate()),2);
			  var hours_st = numberPad(parseInt(tenSecondsAgo.getHours()),2);
			  var minutes_st = numberPad(parseInt(tenSecondsAgo.getMinutes()),2);
			  var seconds_st = numberPad(parseInt(tenSecondsAgo.getSeconds()),2);
			  
			  console.log("날짜 확인 = "+year+month+day+hours+minutes+seconds);
			  
			  $.ajax({
					type : 'post',
					url : '/getMainAllChart',
					data : {
						rgstr_date: year+''+month+''+day,
						rgstr_hour: hours,
						rgstr_min: minutes,
						rgstr_dt: year+''+month+''+day+' '+hours+''+minutes+''+seconds,
						rgstr_dt_st: year_st+''+month_st+''+day_st+' '+hours_st+''+minutes_st+''+seconds_st,
						//selected_site_list: siteList
					},
					dataType : 'json',
					async: false,
					error: function(xhr, status, error){
						console.log(error);
					},
					success : function(json){
						//costPerGB = costPerGB / 1073741824;
						var costBytes = json.costVal;
						var costOrgBytes = json.costOrgVal;
						var bytes = json.trafficVal;
						var orgBytes = json.orgTrafficVal;

						if(costBytes == null) {
							costBytes = 0;
							costOrgBytes = 0;
						}
						
						if(bytes == null) {
							bytes = 0;
						}
						
						if(bytes > 0) {
							bytes = (bytes/1073741824).toFixed(3);
							orgBytes = (orgBytes/1073741824).toFixed(3);
						}

					    data.labels.push(formattedDate);		  
					    data.datasets[1].data.push(costBytes.toFixed(2));
					    data.datasets[0].data.push(costOrgBytes.toFixed(2));
					    data2.labels.push(formattedDate);		  
					    data2.datasets[1].data.push(bytes);
					    data2.datasets[0].data.push(orgBytes);
					    myLineChart.update();
					    myTrafficLineChart.update();
					}
				});
			  
		  }
	  }else {

		  var year = parseInt(currentDate.getFullYear());
		  var month = numberPad(parseInt(currentDate.getMonth() + 1),2);
		  var day = numberPad(parseInt(currentDate.getDate()),2);
		  var hours = numberPad(parseInt(currentDate.getHours()),2);
		  var minutes = numberPad(parseInt(currentDate.getMinutes()),2);
		  var seconds = numberPad(parseInt(currentDate.getSeconds()),2);
		  var formattedDate = formatDate(currentDate);
		  
	      var tenSecondsAgo = new Date(currentDate.getTime() - 2 * 1000); // 10초 전 시간
	      

		  var year_st = numberPad(parseInt(tenSecondsAgo.getFullYear()),2);
		  var month_st = numberPad(parseInt(tenSecondsAgo.getMonth() + 1),2);
		  var day_st = numberPad(parseInt(tenSecondsAgo.getDate()),2);
		  var hours_st = numberPad(parseInt(tenSecondsAgo.getHours()),2);
		  var minutes_st = numberPad(parseInt(tenSecondsAgo.getMinutes()),2);
		  var seconds_st = numberPad(parseInt(tenSecondsAgo.getSeconds()),2);
		  
		  $.ajax({
				type : 'post',
				url : '/getMainAllChart',
				data : {
					rgstr_date: year+''+month+''+day,
					rgstr_hour: hours,
					rgstr_min: minutes,
					rgstr_dt: year+''+month+''+day+' '+hours+''+minutes+''+seconds,
					rgstr_dt_st: year+''+month+''+day+' '+hours+''+minutes+''+seconds_st,
					rgstr_dt_st: year_st+''+month_st+''+day_st+' '+hours_st+''+minutes_st+''+seconds_st,
					//selectedSite: siteString
				},
				dataType : 'json',
				error: function(xhr, status, error){
					console.log(error);
				},
				success : function(json){
					//costPerGB = costPerGB / 1073741824;
					$('#preLoader').fadeOut(100);
					
					var costBytes = json.costVal;
					var costOrgBytes = json.costOrgVal;
					var bytes = json.trafficVal;
					var orgBytes = json.orgTrafficVal;

					if(costBytes == null) {
						costBytes = 0;
						costOrgBytes = 0;
					}
					
					if(bytes == null) {
						bytes = 0;
					}
					
					if(bytes > 0) {
						bytes = (bytes/1073741824).toFixed(3);
						orgBytes = (orgBytes/1073741824).toFixed(3);
					}

				    data.labels.push(formattedDate);		  
				    data.datasets[1].data.push(costBytes.toFixed(2));
				    data.datasets[0].data.push(costOrgBytes.toFixed(2));
				    data2.labels.push(formattedDate);		  
				    data2.datasets[1].data.push(bytes);
				    data2.datasets[0].data.push(orgBytes);
				    myLineChart.update();
				    myTrafficLineChart.update();
				}
			});
	  }

      if (data.labels.length > 8) {
          data.labels.shift();
          data.datasets[0].data.shift();
          data.datasets[1].data.shift();
      }
      
      if (data2.labels.length > 8) {
    	  data2.labels.shift();
    	  data2.datasets[0].data.shift();
    	  data2.datasets[1].data.shift();
      }

  }

  setInterval(updateMainAllChartData, 1000); //초마다 차트 리셋

