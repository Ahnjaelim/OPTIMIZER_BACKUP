// First Pie Chart
var options = {
  series: [44, 55, 13, 43, 22],
  chart: {
    height: 300,
    type: "pie"
  },
  labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
  legend: {
    position: "bottom"
  },
  dataLabels: {
    dropShadow: {
      enabled: false
    }
  },
  colors: ["#038edc", "#51d28c", "#f7cc53", "#f34e4e", "#564ab1"]
};

var chart = new ApexCharts(document.querySelector("#simple_pie_chart"), options);
chart.render();

// Second Donut Chart
options = {
  series: [44, 55, 41, 17, 15],
  chart: {
    height: 300,
    type: "donut"
  },
  legend: {
    position: "bottom"
  },
  dataLabels: {
    dropShadow: {
      enabled: false
    }
  },
  colors: ["#038edc", "#51d28c", "#f7cc53", "#f34e4e", "#564ab1"]
};

chart = new ApexCharts(document.querySelector("#simple_dount_chart"), options);
chart.render();

// Third Donut Chart
options = {
  series: [44, 55, 13, 33],
  chart: {
    height: 280,
    type: "donut"
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    position: "bottom"
  },
  colors: ["#038edc", "#51d28c", "#f7cc53", "#f34e4e"]
};

var upadatedonutchart = new ApexCharts(document.querySelector("#updating_donut_chart"), options);
upadatedonutchart.render();

// Event listeners
document.querySelector("#randomize").addEventListener("click", function() {
  upadatedonutchart.updateSeries(randomize());
});

document.querySelector("#add").addEventListener("click", function() {
  upadatedonutchart.updateSeries(appendData());
});

document.querySelector("#remove").addEventListener("click", function() {
  upadatedonutchart.updateSeries(removeData());
});

document.querySelector("#reset").addEventListener("click", function() {
  upadatedonutchart.updateSeries(reset());
});

// Fourth Donut Chart
options = {
  series: [44, 55, 41, 17, 15],
  chart: {
    height: 300,
    type: "donut",
    dropShadow: {
      enabled: true,
      color: "#111",
      top: -1,
      left: 3,
      blur: 3,
      opacity: 0.2
    }
  },
  stroke: {
    width: 0
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            showAlways: true,
            show: true
          }
        }
      }
    }
  },
  labels: ["Comedy", "Action", "SciFi", "Drama", "Horror"],
  dataLabels: {
    dropShadow: {
      blur: 3,
      opacity: 0.8
    }
  },
  fill: {
    type: "pattern",
    opacity: 1,
    pattern: {
      enabled: true,
      style: ["verticalLines", "squares", "horizontalLines", "circles", "slantedLines"]
    }
  },
  states: {
    hover: {
      filter: "none"
    }
  },
  theme: {
    palette: "palette2"
  },
  title: {
    text: "Favourite Movie Type",
    style: {
      fontWeight: 500
    }
  },
  legend: {
    position: "bottom"
  },
  colors: ["#038edc", "#51d28c", "#f7cc53", "#f34e4e", "#564ab1"]
};

chart = new ApexCharts(document.querySelector("#pattern_chart"), options);
chart.render();

// Fifth Pie Chart
options = {
  series: [44, 33, 54, 45],
  chart: {
    height: 300,
    type: "pie"
  },
  colors: ["#93C3EE", "#E5C6A0", "#669DB5", "#94A74A"],
  fill: {
    type: "image",
    opacity: 0.85,
    image: {
      src: ["./assets/images/auth-bg.jpg", "./assets/images/profile-bg.jpg", "./assets/images/small/img-5.jpg", "./assets/images/small/img-2.jpg"],
      width: 25,
      imagedHeight: 25
    }
  },
  stroke: {
    width: 4
  },
  dataLabels: {
    enabled: true,
    style: {
      colors: ["#111"]
    },
    background: {
      enabled: true,
      foreColor: "#fff",
      borderWidth: 0
    }
  },
  legend: {
    position: "bottom"
  }
};

chart = new ApexCharts(document.querySelector("#image_pie_chart"), options);
chart.render();

// Sixth Pie Chart
options = {
  series: [25, 15, 44, 55, 41, 17],
  chart: {
    height: 300,
    type: "pie"
  },
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  theme: {
    monochrome: {
      enabled: true,
      color: "#038edc",
      shadeTo: "light",
      shadeIntensity: 0.6
    }
  },
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -5
      }
    }
  },
  title: {
    text: "Monochrome Pie",
    style: {
      fontWeight: 500
    }
  },
  dataLabels: {
    formatter: function(e, t) {
      return [t.w.globals.labels[t.seriesIndex], e.toFixed(1) + "%"];
    },
    dropShadow: {
      enabled: false
    }
  },
  legend: {
    show: false
  }
};

chart = new ApexCharts(document.querySelector("#monochrome_pie_chart"), options);
chart.render();
