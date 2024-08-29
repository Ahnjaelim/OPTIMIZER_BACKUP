// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart").getContext('2d');
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
});


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


window.onload = function() {
    animateValue("counter", 0, 85, 2000); // 시작값, 목표값, 애니메이션 지속 시간(ms)
  };
