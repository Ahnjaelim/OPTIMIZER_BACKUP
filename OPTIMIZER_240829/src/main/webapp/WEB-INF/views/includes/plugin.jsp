<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<script>
var contextPath = '${pageContext.request.contextPath}';
</script>

<!-- App favicon -->
<link rel="shortcut icon" href="${contextPath}/resources/img/favicon.ico">

<!-- JQuery & Bootstrap Css -->
<script src="${contextPath}/resources/vendor/jquery/jquery.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script type="text/javascript" src="${contextPath}/resources/vendor/jQueryRotate.js"></script>
<script src="${contextPath}/resources/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<link href="${contextPath}/resources/css/bootstrap.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
<link href="${contextPath}/resources/css/app.css" id="app-style" rel="stylesheet" type="text/css" />

<!-- Icons Css -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x.x/css/materialdesignicons.min.css">
<link href="${contextPath}/resources/css/icons.css" rel="stylesheet" type="text/css" />
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
<script src="https://kit.fontawesome.com/bef43e3a8e.js" crossorigin="anonymous"></script>

<!-- 지도 plugin css -->
<link href="${contextPath}/resources/vendor/jsvectormap/css/jsvectormap.min.css" rel="stylesheet" type="text/css" />

<!-- 타뷸레이터 -->
<script src="${contextPath}/resources/vendor/tabulator/js/tabulator.js"></script>
<link href="${contextPath}/resources/vendor/tabulator/css/tabulator_midnight.css" rel="stylesheet">

<!-- JS TREE -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script>
<link rel="stylesheet" href="${contextPath}/resources/vendor/jstree/style.css" />

<!-- sumoselect -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery.sumoselect/3.1.6/sumoselect.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.sumoselect/3.1.6/jquery.sumoselect.min.js"></script>

<!-- AlertifyJS  -->
<script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css"/>
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css"/>

<!-- calender -->
<script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js'></script>
<script src="${contextPath}/resources/vendor/fullcalendar/boot.global.min.js"></script>

<!-- chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>
<!-- amChart5 -->
<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
<script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
<script src="https://cdn.amcharts.com/lib/5/locales/de_DE.js"></script>
<script src="https://cdn.amcharts.com/lib/5/geodata/germanyLow.js"></script>
<script src="https://cdn.amcharts.com/lib/5/fonts/notosans-sc.js"></script>
<script src="https://cdn.amcharts.com/lib/5/percent.js"></script>

<!-- 스윗앨럿 -->
<%-- <link href="${contextPath}/resources/vendor/sweetalert2/sweetalert2.min.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" /> --%>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>


<!-- 웹소켓 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.5.0/sockjs.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>

<!-- 글라이트 박스 -->
<link rel="stylesheet" href="/resources/vendor/glightbox/css/glightbox.min.css">
<script src="/resources/vendor/glightbox/js/glightbox.min.js"></script>

<!-- 프리즘 -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/plugins/line-numbers/prism-line-numbers.min.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/components/prism-javascript.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/plugins/line-numbers/prism-line-numbers.min.js"></script>
<link href="${contextPath}/resources/vendor/prism/prism.akaidia.css" rel="stylesheet">

<link rel="stylesheet" href="${contextPath}/resources/css/style.css" />
<script src="${contextPath}/resources/js/common.js"></script>
