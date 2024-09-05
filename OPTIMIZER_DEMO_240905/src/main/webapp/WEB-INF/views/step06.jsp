<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>

<h3>최적화 미리보기 <button id="simul-btn" class="custom-btn btn-11" style="position:relative; top:-2px; opacity:0;"><ion-icon name="stopwatch" style="top:1px;"></ion-icon> 시뮬레이션 재시작</button><input type="hidden" id="simulation-status" value="0" /></h3>
<p class="paragraph">해당 웹 사이트의 최적화 전후를 비교하여 성능을 확인할 수 있는 단계입니다. 시뮬레이션은 자동으로 시작되며, 시뮬레이션이 종료된 후에는 우측 하단 <strong style="color:var(--color-yellow);">[보고서 다운로드]</strong>버튼으로 보고서를 엑셀파일로 다운로드 받을 수 있습니다. 재측정을 하고싶은 경우에는 <strong style="color:var(--color-yellow);">[시뮬레이션 재시작]</strong>버튼을 눌러 시뮬레이션을 재시작하세요. </p>

<div class="step-content-body">
   	<div id="time-simulation-head">
   	</div>
   	<div id="time-simulation">
   	</div>
   	<div id="page-summary">
   	</div>
</div>
