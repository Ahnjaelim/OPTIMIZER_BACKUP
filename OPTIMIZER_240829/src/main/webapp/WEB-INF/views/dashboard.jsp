<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="/WEB-INF/views/includes/config.jsp"%>
<!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="utf-8" />
<title>${title }</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="Premium Multipurpose Admin & Dashboard Template"
	name="description" />
<meta content="Pichforest" name="author" />
<%@ include file="/WEB-INF/views/includes/plugin.jsp"%>

<link rel="stylesheet"
	href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet"
	href="${contextPath}/resources/css/dashboard/dashboard-cost.css">
<script src="${contextPath}/resources/js/cost/costCommon.js"></script>

<style>
</style>
</head>

<body class="dashboard" data-bs-theme="dark" data-topbar="dark"
	data-sidebar="dark">
	<div id="layout-wrapper">
		<%@ include file="/WEB-INF/views/includes/topbar.jsp"%>
	<div class="layout-parent">
			<!--  ==================================================================================================== -->

		<div class="row row1">
			<div class="col-lg-12 h-100">
				<div class="card h-100">
					<div class="card-body">
						<h4 class="card-title">실시간 최적화 현황 <input type="hidden" id="target_date" size="30" /></h4>
						<div id="top-animation" class="animation-row1">
							<div class="station server">
								<p style="position: absolute; z-index: 9000; top: 120px; left: 15px;">서버 안내<buttton class="btn-info btn-popover" data-popover-content="<span class='narrow'>설정된 인원수에 맞게 동전이 표시되며 동전의 개수에 따라 서버의 색상이 달라집니다.</span><br />0~10개 : 서비스가 정상적으로 운영되고 있습니다.</br />11~30개 : 서비스 운영에 주의가 필요합니다.<br />31~50개 : 서비스 운영에 위험이 있을 수 있습니다." id="popover-reduction-rate"><ion-icon name="help-circle"></ion-icon></buttton></p>
								<p class="org"><img src="${contextPath}/resources/img/dashboard-server.png" /></p>
								<p class="color red"><img src="${contextPath}/resources/img/dashboard-server-red.png" /></p>
								<p class="color yellow"><img src="${contextPath}/resources/img/dashboard-server-yellow.png" /></p>
								<p class="color green"><img src="${contextPath}/resources/img/dashboard-server-green.png" /></p>
							</div>
							<div class="station monitor">
								<div class="img"><img src="${contextPath}/resources/img/dashboard-monitor.png" /></div>
								<div class="value">
									<p><strong id="time-monitor">0</strong>원</p>
									<p>비용 절감<buttton class="btn-info btn-popover" data-popover-right="true" data-popover-top="100" data-popover-width="300" data-popover-content="현재 호출 중인 웹 콘텐츠를 오늘 날짜 기준으로 산정한 값 입니다." id="popover-reduction-rate"><ion-icon name="help-circle-outline"></ion-icon></buttton></p>
								</div>
							</div>
							<div id="pig">
								<div class="wrap">
									<div class="type01">
										<ul class="position-relative">
											<li class="position-absolute" style="top: -16px; right: -68px;"><img src="${contextPath}/resources/img/icon-pig5.png" id="piggy-bank" style="height: 204px;" /></li>
											<li style="display: none;" class="position-absolute start-0"><img src="${contextPath}/resources/img/coin-drop-effect.gif" id="coin-drop" /></li>
										</ul>
									</div>
								</div>
								<div id="user-count"><ion-icon name="person"></ion-icon>접속자 <span style="color: yellow">0</span>명</div>
							</div>
						</div>
						<div class="animation-row2 d-flex optimize-progress">
						<div class="col col-item d-flex align-items-center" data-type="1">
							<div class="col col-title">
								<p><ion-icon name="image"></ion-icon> 이미지 최적화 현황</p>
							</div>				
							<div class="col col-percent">
								<div class="count d-flex">
									<div class="col value"><strong>0</strong>/0건</div>
									<div class="col text-end percentage">0%</div>
								</div>							
								<div class="progress animated-progess custom-progress mt-2">
									<div class="progress-bar" role="progressbar" style="width: 1%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="75"></div>
								</div>
							</div>
						</div>
						<div class="col  col-item d-flex align-items-center" data-type="2">
							<div class="col col-title">
								<p><ion-icon name="videocam"></ion-icon> 동영상 최적화 현황</p>
							</div>				
							<div class="col col-percent">
								<div class="count d-flex">
									<div class="col value"><strong>0</strong>/0건</div>
									<div class="col text-end percentage">0%</div>
								</div>							
								<div class="progress animated-progess custom-progress mt-2">
									<div class="progress-bar" role="progressbar" style="width: 1%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="75"></div>
								</div>
							</div>
						</div>
						<div class="col col-item d-flex align-items-center" data-type="3">
							<div class="col col-title">
								<p><ion-icon name="document-text"></ion-icon> 텍스트 최적화 현황</p>
							</div>				
							<div class="col col-percent">
								<div class="count d-flex">
									<div class="col value"><strong>0</strong>/0건</div>
									<div class="col text-end percentage">0%</div>
								</div>							
								<div class="progress animated-progess custom-progress mt-2">
									<div class="progress-bar" role="progressbar" style="width: 1%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="75"></div>
								</div>
							</div>
						</div>
						<div class="col col-item d-flex align-items-center" data-type="4">
							<div class="col col-title">
								<p><ion-icon name="text"></ion-icon> 폰트 최적화 현황</p>
							</div>				
							<div class="col col-percent">
								<div class="count d-flex">
									<div class="col value"><strong>0</strong>/0건</div>
									<div class="col text-end percentage">0%</div>
								</div>							
								<div class="progress animated-progess custom-progress mt-2">
									<div class="progress-bar" role="progressbar" style="width: 1%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="75"></div>
								</div>
							</div>
						</div>
						<div class="col col-item d-flex align-items-center hide" data-type="5">
							<div class="col col-title">
								<p><ion-icon name="receipt"></ion-icon> 비정형 최적화 현황</p>
							</div>				
							<div class="col col-percent">
								<div class="count d-flex">
									<div class="col value"><strong>0</strong>/0건</div>
									<div class="col text-end percentage">0%</div>
								</div>							
								<div class="progress animated-progess custom-progress mt-2">
									<div class="progress-bar" role="progressbar" style="width: 1%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="75"></div>
								</div>
							</div>
						</div>					
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="d-flex" style="height: 60%; padding: 5px 15px 0px 10px;">
				<!--  ============================================================================================================== COL1 -->
		<div class="col" style="height: 100%; margin-right: 10px;">
			<div class="d-flex" style="height: 40%; margin-bottom: 10px;">
				<div class="col" style="margin-right: 10px;">
					<div class="card h-100">
						<div class="card-body">
							<h4 class="card-title">추가 예상 절감 금액</h4>
							<button class="more" onclick="detailModalBtnEvent({modalTitle : '추가 절감 예상 금액', tabulatorFunction : 'costPredictTabulator', topFunction : 'costPredictTopContent', monthSelectable : true});">상세보기</button>
							<div class="card-content mx-3" id="card-content-1">
								<div class="d-flex mt-1">
									<div class="slot-container-1 justify-content-start">
										<img src="${contextPath}/resources/img/coins.png" style="width: 10%; margin-right: 5px;" /><span style="font-size: 15px; margin-right: 5px;">약 </span>
										<div class="slot-machine slot1">
											<div class="slot-number">
												<div class="digit">0</div>
												<div class="digit">1</div>
												<div class="digit">2</div>
												<div class="digit">3</div>
												<div class="digit">4</div>
												<div class="digit">5</div>
												<div class="digit">6</div>
												<div class="digit">7</div>
												<div class="digit">8</div>
												<div class="digit">9</div>
											</div>
										</div>
										<span class="comma1" style="font-size: 3em; display: none;">,</span>
										<div class="slot-machine slot2">
											<div class="slot-number">
												<div class="digit">0</div>
												<div class="digit">1</div>
												<div class="digit">2</div>
												<div class="digit">3</div>
												<div class="digit">4</div>
												<div class="digit">5</div>
												<div class="digit">6</div>
												<div class="digit">7</div>
												<div class="digit">8</div>
												<div class="digit">9</div>
											</div>
										</div>
										<span class="comma2" style="font-size: 3em; display: none;">,</span>
										<div class="slot-machine slot3">
											<div class="slot-number">
												<div class="digit">0</div>
												<div class="digit">1</div>
												<div class="digit">2</div>
												<div class="digit">3</div>
												<div class="digit">4</div>
												<div class="digit">5</div>
												<div class="digit">6</div>
												<div class="digit">7</div>
												<div class="digit">8</div>
												<div class="digit">9</div>
											</div>
										</div>
										<span class="comma3" style="font-size: 3em; display: none;">,</span>
										<div class="slot-machine slot4">
											<div class="slot-number">
												<div class="digit">0</div>
												<div class="digit">1</div>
												<div class="digit">2</div>
												<div class="digit">3</div>
												<div class="digit">4</div>
												<div class="digit">5</div>
												<div class="digit">6</div>
												<div class="digit">7</div>
												<div class="digit">8</div>
												<div class="digit">9</div>
											</div>
										</div>
										<span class="comma4" style="font-size: 3em; display: none;">,</span>
										<div class="slot-machine slot5">
											<div class="slot-number">
												<div class="digit">0</div>
												<div class="digit">1</div>
												<div class="digit">2</div>
												<div class="digit">3</div>
												<div class="digit">4</div>
												<div class="digit">5</div>
												<div class="digit">6</div>
												<div class="digit">7</div>
												<div class="digit">8</div>
												<div class="digit">9</div>
											</div>
										</div>
										<div class="slot-machine slot6">
											<div class="slot-number">
												<div class="digit">0</div>
												<div class="digit">1</div>
												<div class="digit">2</div>
												<div class="digit">3</div>
												<div class="digit">4</div>
												<div class="digit">5</div>
												<div class="digit">6</div>
												<div class="digit">7</div>
												<div class="digit">8</div>
												<div class="digit">9</div>
											</div>
										</div>
										<div class="slot-machine slot7">
											<div class="slot-number">
												<div class="digit">0</div>
												<div class="digit">1</div>
												<div class="digit">2</div>
												<div class="digit">3</div>
												<div class="digit">4</div>
												<div class="digit">5</div>
												<div class="digit">6</div>
												<div class="digit">7</div>
												<div class="digit">8</div>
												<div class="digit">9</div>
											</div>
										</div>
										<span style="font-size: 15px; margin-left: 5px;">원</span>
									</div>
								</div>
								<p class="small-content text-start">현재 웹 콘텐츠의 최대 최적화 후 최대 금액입니다. <br>사용량 변화나 조건에 따라 금액이 달라질 수 있습니다.</p>
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card h-100">
						<div class="card-body">
							<h4 class="card-title">전월 대비 절감액</h4>
							<button class="more" onclick="detailModalBtnEvent({modalTitle : '전월 대비 절감액', tabulatorFunction : 'costReduceTabulator', topFunction : 'costReduceTopContent', monthSelectable : true});">상세보기</button>
							<div class="card-content mx-3">
								<div class="d-flex mt-2">
									<div class="slot-container-2 justify-content-start">
										<img src="${contextPath}/resources/img/coins.png" style="width: 10%; margin-right: 5px;" /> <span style="font-size: 15px; margin-right: 5px;">약 </span>
										<div class="slot-machine slot1">
											<div class="reduce-number">
												<div class="digit">0</div>
												<div class="digit">1</div>
												<div class="digit">2</div>
												<div class="digit">3</div>
												<div class="digit">4</div>
												<div class="digit">5</div>
												<div class="digit">6</div>
												<div class="digit">7</div>
												<div class="digit">8</div>
												<div class="digit">9</div>
											</div>
										</div>
										<span class="comma1" style="font-size: 3em; display: none;">,</span>
										<div class="slot-machine slot2">
											<div class="reduce-number">
												<div class="digit">0</div>
												<div class="digit">1</div>
												<div class="digit">2</div>
												<div class="digit">3</div>
												<div class="digit">4</div>
												<div class="digit">5</div>
												<div class="digit">6</div>
												<div class="digit">7</div>
												<div class="digit">8</div>
												<div class="digit">9</div>
											</div>
										</div>
										<span class="comma2" style="font-size: 3em; display: none;">,</span>
										<div class="slot-machine slot3">
											<div class="reduce-number">
														<div class="digit">0</div>
												<div class="digit">1</div>
												<div class="digit">2</div>
												<div class="digit">3</div>
												<div class="digit">4</div>
												<div class="digit">5</div>
												<div class="digit">6</div>
												<div class="digit">7</div>
												<div class="digit">8</div>
												<div class="digit">9</div>
											</div>
										</div>
										<span class="comma3" style="font-size: 3em; display: none;">,</span>
										<div class="slot-machine slot4">
											<div class="reduce-number">
												<div class="digit">0</div>
												<div class="digit">1</div>
												<div class="digit">2</div>
												<div class="digit">3</div>
												<div class="digit">4</div>
												<div class="digit">5</div>
												<div class="digit">6</div>
												<div class="digit">7</div>
												<div class="digit">8</div>
												<div class="digit">9</div>
											</div>
										</div>
										<span class="comma4" style="font-size: 3em; display: none;">,</span>
										<div class="slot-machine slot5">
											<div class="reduce-number">
												<div class="digit">0</div>
												<div class="digit">1</div>
												<div class="digit">2</div>
												<div class="digit">3</div>
												<div class="digit">4</div>
												<div class="digit">5</div>
												<div class="digit">6</div>
												<div class="digit">7</div>
												<div class="digit">8</div>
												<div class="digit">9</div>
											</div>
										</div>
										<div class="slot-machine slot6">
											<div class="reduce-number">
												<div class="digit">0</div>
												<div class="digit">1</div>
												<div class="digit">2</div>
												<div class="digit">3</div>
												<div class="digit">4</div>
												<div class="digit">5</div>
												<div class="digit">6</div>
												<div class="digit">7</div>
												<div class="digit">8</div>
												<div class="digit">9</div>
											</div>
										</div>
										<div class="slot-machine slot7">
											<div class="reduce-number">
												<div class="digit">0</div>
												<div class="digit">1</div>
												<div class="digit">2</div>
												<div class="digit">3</div>
												<div class="digit">4</div>
												<div class="digit">5</div>
												<div class="digit">6</div>
												<div class="digit">7</div>
												<div class="digit">8</div>
												<div class="digit">9</div>
											</div>
										</div>
										<span style="font-size: 15px; margin-left: 5px;">원</span>
									</div>
								</div>
								<p class="small-content text-start">현재 일자까지의 비용과 전 달 대비 비교한 금액으로,</br> 전 월 데이터가 없을 경우에는 당월 순 절감액을 나타냅니다.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
					<!-- COL1 ROW2 -->
			<div style="height: 60%;">
					<div class="card h-100" style="position: relative;">
					<div class="card-body">
						<h4 class="card-title">웹 페이지 병목 현황<input type="hidden" id="startIndex" /></h4>
						<div id="heatmap-chart-legend">
						<ul>
							<li data-level="1" data-status="on"><span style="color:var(--color-green);  ">●</span> 빠름(0~1초)</li>
							<li data-level="2" data-status="on"><span style="color:var(--color-yellow);">●</span> 보통(1~3초)</li>
							<li data-level="3" data-status="on"><span style="color:var(--color-orange);">●</span> 느림(3~5초)</li>
							<li data-level="4" data-status="on"><span style="color:var(--color-red);;">●</span> 매우 느림(5~초)</li>
						</ul>
						</div>
						<div id="heatmap-chart-container"></div>
					</div>
				</div>
			</div>
		</div>
		<!--  ============================================================================================================== COL2 -->
		<div class="col" style="height: 100%;">
			<!-- COL2 ROW1 -->
			<div style="height: 60%; margin-bottom: 10px;">
				<div class="card h-100">
					<div class="card-body">
						<h4 class="card-title">웹 콘텐츠 유형별 최적화 현황</h4>
						<div style="width: 100%; overflow: hidden;">
							<div class="d-flex switch-container" data-no="2">
								<div class="type-status-table col" data-file-type="strfile">
									<table class="type-status-table1" style="margin-top: 10px;">
										<colgroup>
											<col width="26%" />
											<col width="24%" />
											<col width="26%" />
											<col width="24%" />
										</colgroup>
										<tbody>
											<tr class="tr1">
												<th class="col1"><img src="${contextPath}/resources/img/flow_arrow.png" style="width: 10%; margin-right: 5px;" /> 최적화 후 예상 비용(당월) <buttton class="btn-info btn-popover" data-popover-content="당월을 기준으로 최적화 후의 월 예상 비용을 나타냅니다."><ion-icon name="help-circle-outline"></ion-icon></buttton></th>
												<td class="col2 TodaySavingCost" id="TodaySavingCost">0000</td>
												<th class="col3">이번달 새로 추가된 웹 콘텐츠<buttton class="btn-info btn-popover" data-popover-content="이번달 새로 추가된 웹 콘텐츠의 건수를 나타냅니다."><ion-icon name="help-circle-outline"></ion-icon></buttton></th>
												<td class="col4 new-resource td-clickable" id="new-resource-btn"><strong>0</strong><span>건</span></td>
											</tr>
											<tr class="tr2">
												<th class="col1 narrow"><img src="${contextPath}/resources/img/percent.png" style="width: 8%; margin-right: 5px;" /> 웹 콘텐츠 절감률<buttton class="btn-info btn-popover" data-popover-content="웹 콘텐츠의 절감율은 최적화 후 절감된 용량을 백분율로 나타낸 값입니다."><ion-icon name="help-circle-outline"></ion-icon></buttton></th>
												<td class="col2 predict-comp-rate" id="SavingsRate"></td>
												<th class="col3 narrow">이번달 확인이 필요한 웹 콘텐츠 <buttton class="btn-info btn-popover" data-popover-content="이번달 새로 추가된 웹 콘텐츠 중 아직 최적화가 되지 않은 웹 콘텐츠 건수를 나타냅니다."><ion-icon name="help-circle-outline"></ion-icon></buttton></th>
												<td class="col4 new-resource-check td-clickable" id="check-new-resource-btn"><strong>0</strong><span>건</span></td>
											</tr>
										</tbody>
									</table>
									<table class="type-status-table2" style="margin-top: 25px;">
										<colgroup>
											<col width="100px" />
											<col width="*" />
											<col width="150px" />
											<col width="200px" />
											<col width="95px" />
										</colgroup>
										<thead>
											<tr>
												<th>유형</th>
												<th colspan="2">웹 콘텐츠 사용 비율</th>
												<th>최적화 가능 건수</th>
												<th>바로가기</th>
											</tr>
										</thead>
										<tbody>
											<tr data-resource-type="1">
												<th><ion-icon name="image"></ion-icon> 이미지</th>
												<td><div class="traffic-rate"><div>&nbsp;</div></div></td>
												<td class="traffic-rate-value">0%</td>
												<td class="optimizable-count">최적화 완료</td>
												<td class="cell-btn"><button class="btn-shortcut" onclick="location.href='/optimizerByContent?resource_type=1&resource_status=-1';">바로가기<ion-icon name="enter-outline"></ion-icon></button></td>
											</tr>
											<tr data-resource-type="2">
												<th><ion-icon name="videocam"></ion-icon> 동영상</th>
												<td><div class="traffic-rate"><div>&nbsp;</div></div></td>
												<td class="traffic-rate-value">0%</td>
												<td class="optimizable-count">최적화 완료</td>
												<td class="cell-btn"><button class="btn-shortcut" onclick="location.href='/optimizerByContent?resource_type=2&resource_status=-1';">바로가기<ion-icon name="enter-outline"></ion-icon></button></td>
											</tr>
											<tr data-resource-type="3">
												<th><ion-icon name="document-text"></ion-icon> 텍스트</th>
												<td><div class="traffic-rate"><div>&nbsp;</div></div></td>
												<td class="traffic-rate-value">0%</td>
												<td class="optimizable-count">최적화 완료</td>
												<td class="cell-btn"><button class="btn-shortcut" onclick="location.href='/optimizerByContent?resource_type=3&resource_status=-1';">바로가기<ion-icon name="enter-outline"></ion-icon></button></td>
											</tr>
											<tr data-resource-type="4">
												<th><ion-icon name="text"></ion-icon> 폰트</th>
												<td><div class="traffic-rate"><div>&nbsp;</div></div></td>
												<td class="traffic-rate-value">0%</td>
												<td class="optimizable-count">최적화 완료</td>
												<td class="cell-btn"><button class="btn-shortcut" onclick="location.href='/optimizerByContent?resource_type=4&resource_status=-1';">바로가기<ion-icon name="enter-outline"></ion-icon></button></td>
											</tr>
										</tbody>
									</table>
								</div>
								<div class="type-status-table" data-file-type="unstrfile">
									<table class="type-status-table1" style="margin-top: 10px;">
										<colgroup>
											<col width="26%" />
											<col width="24%" />
											<col width="26%" />
											<col width="24%" />
										</colgroup>
										<tbody>
											<tr class="tr1">
												<th class="col1">최적화 미적용 웹 콘텐츠 <buttton class="btn-info btn-popover" data-popover-content="최적화가 아직 적용되지 않은 웹 콘텐츠 건수를 나타냅니다."><ion-icon name="help-circle-outline"></ion-icon></buttton></th>
												<td class="col2 unoptimized-count"><strong>0</strong><strong>/0</strong><span>건</span></td>
												<th class="col3">이번달 새로 추가된 웹 콘텐츠<buttton class="btn-info btn-popover" data-popover-content="이번달 새로 추가된 웹 콘텐츠의 건수를 나타냅니다."><ion-icon name="help-circle-outline"></ion-icon></buttton></th>
												<td class="col4 new-resource td-clickable" id="new-unstrresource-btn"><strong>0</strong><span>건</span></td>
											</tr>
											<tr class="tr2">
												<th class="col1"><img src="${contextPath}/resources/img/percent.png" style="width: 8%; margin-right: 5px;" />웹 콘텐츠 절감률<buttton class="btn-info btn-popover predict-rate" data-popover-content="최적화가 아직 진행되지 않은 웹 콘텐츠를 최적화 했을 경우 예상되는 렌더링 시간 단축 비율입니다."><ion-icon name="help-circle-outline"></ion-icon></buttton></th>
												<td class="col2 predict-comp-rate" id="unstr-predict-comp-rate"><strong>0%</strong></td>
												<th class="col3 narrow">이번달 확인이 필요한 웹 콘텐츠 <buttton class="btn-info btn-popover" data-popover-content="이번달 새로 추가된 웹 콘텐츠 중 아직 최적화가 되지 않은 웹 콘텐츠 건수를 나타냅니다."><ion-icon name="help-circle-outline"></ion-icon></buttton></th>
												<td class="col4 new-resource-check td-clickable" id="check-new-unstrresource-btn"><strong>0</strong><span>건</span></td>
											</tr>
										</tbody>
									</table>
									<table class="type-status-table2">
										<colgroup>
											<col width="100px" />
											<col width="*" />
											<col width="160px" />
											<col width="200px" />
											<col width="95px" />
										</colgroup>
										<thead>
											<tr>
												<th>유형</th>
												<th colspan="2">파일 용량 경량화율</th>
												<th>최적화 가능 건수</th>
												<th>바로가기</th>
											</tr>
										</thead>
										<tbody>
											<tr data-resource-type="5">
												<th><img src="/resources/img/icon-ext-hwp.png">한글</th>
												<td><div class="time-rate">해당 데이터가 없습니다.</div></td>
												<td class="time-rate-value">-</td>
												<td class="optimizable-count">최적화 완료</td>
												<td class="cell-btn"><button class="btn-shortcut" onclick="location.href='/unstructedFileManager?resource_type=5&resource_status=-1';">바로가기 <ion-icon name="enter-outline"></ion-icon></button></td>
											</tr>
											<tr data-resource-type="6">
												<th><img src="/resources/img/icon-ext-doc.png">워드</th>
												<td><div class="time-rate">해당 데이터가 없습니다.</div></td>
												<td class="time-rate-value">-</td>
												<td class="optimizable-count">최적화 완료</td>
												<td class="cell-btn"><button class="btn-shortcut" onclick="location.href='/unstructedFileManager?resource_type=6&resource_status=-1';">바로가기 <ion-icon name="enter-outline"></ion-icon></button></td>
											</tr>
											<tr data-resource-type="7">
												<th><img src="/resources/img/icon-ext-xls.png">엑셀</th>
												<td><div class="time-rate">해당 데이터가 없습니다.</div></td>
												<td class="time-rate-value">-</td>
												<td class="optimizable-count">최적화 완료</td>
												<td class="cell-btn"><button class="btn-shortcut" onclick="location.href='/unstructedFileManager?resource_type=7&resource_status=-1';">바로가기 <ion-icon name="enter-outline"></ion-icon></button></td>
											</tr>
											<tr data-resource-type="8">
												<th><img src="/resources/img/icon-ext-ppt.png">PPT</th>
												<td><div class="time-rate">해당 데이터가 없습니다.</div></td>
												<td class="time-rate-value">-</td>
												<td class="optimizable-count">최적화 완료</td>
												<td class="cell-btn"><button class="btn-shortcut" onclick="location.href='/unstructedFileManager?resource_type=8&resource_status=-1';">바로가기 <ion-icon name="enter-outline"></ion-icon></button></td>
											</tr>
											<tr data-resource-type="9">
												<th><img src="/resources/img/icon-ext-pdf.png">PDF</th>
												<td><div class="time-rate">해당 데이터가 없습니다.</div></td>
												<td class="time-rate-value">-</td>
												<td class="optimizable-count">최적화 완료</td>
												<td class="cell-btn"><button class="btn-shortcut" onclick="location.href='/unstructedFileManager?resource_type=9&resource_status=-1';">바로가기 <ion-icon name="enter-outline"></ion-icon></button></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						<div class="switch-btn" data-no="2">
								<button class="str active">일반</button>
								<button class="unstr">비정형</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="d-flex" style="height: 40%; width: calc(100% - 10px);">
				<div class="col-lg-6" style="margin-right: 10px;">
					<div class="card h-100 alarm">
						<div class="card-body">
							<h4 class="card-title">확인하세요!</h4>
							<div class="d-flex h-100">
								<div class="col" style="position: relative; width: 180px; max-width: 180px;">
									<div style="position: absolute; top: 45%; left: 50%; transform: translate(-50%, -50%); width: 100%; text-align: center;">
										<p class="number" id="number"><strong>0</strong></p>
										<p class="desc" style="padding: 5px 0px 0px 0px;">등록된 확인 사항</p>
									</div>
								</div>
								<ul class="col" style="padding: 15px 0px 0px 0px;"></ul>
							</div>
							<button class="more" onclick="location.href='/alertCenter';">바로가기</button>
							</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="card h-100 shortcut">
						<div class="card-body">
							<h4 class="card-title narrow">비용을 더 절감하려면 어떻게 해야 할까요 ?</h4>
							<ul id="shortcut">
								<li data-resource-type="1">
									<a href="/optimizerByContent?resource_type=1&resource_status=-1">
										<ion-icon name="image"></ion-icon> 이미지 웹 콘텐츠 최적화 <span class="status">진행</span>
										<button class="btn-shortcut">바로가기<ion-icon name="enter-outline"></ion-icon></button>
											</a>
										</li>
										<li data-resource-type="2">
											<a href="/optimizerByContent?resource_type=2&resource_status=-1">
												<ion-icon name="videocam"></ion-icon> 동영상 웹 콘텐츠 최적화 <span class="status">진행</span>
												<button class="btn-shortcut">바로가기<ion-icon name="enter-outline"></ion-icon></button>
											</a>
										</li>
										<li data-resource-type="3">
											<a href="/optimizerByContent?resource_type=3&resource_status=-1">
												<ion-icon name="document-text"></ion-icon> 텍스트 웹 콘텐츠 최적화 <span class="status">진행</span>
												<button class="btn-shortcut">바로가기<ion-icon name="enter-outline"></ion-icon></button>
											</a>
										</li>
										<li data-resource-type="4">
											<a href="/optimizerByContent?resource_type=4&resource_status=-1">
												<ion-icon name="text"></ion-icon> 폰트 웹 콘텐츠 최적화 <span class="status">진행</span>
												<button class="btn-shortcut">바로가기<ion-icon name="enter-outline"></ion-icon></button>
											</a>
										</li>
									</ul>
									<button class="more" style="display: none;">상세보기</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- // end of col2 -->
			</div>


<div class="modal fade detail-modal" id="detail-modal" tabindex="-1" role="dialog" aria-labelledby="alertModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document" style="max-width: 1400px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"></h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body"></div>
			<div class="modal-footer">
				<button class="btn btn-primary btn-sm" type="button" data-bs-dismiss="modal" aria-label="Close">닫기</button>
			</div>
		</div>
	</div>
</div>

<script>
window.onload = function() {
	activeTopMenu(1);
	$('#preLoader').fadeOut(300);
};

$("#new-resource-btn").click(function(){
    detailModalBtnEvent({
    	modalId : "latestResourceModal",
        modalTitle : '이번달 새로 추가된 웹 콘텐츠', 
        tabulatorFunction : 'latestTabulator', 
        topFunction : 'latestTopContent'
    });        
});

$("#check-new-resource-btn").click(function(){
    detailModalBtnEvent({
    	modalId : "checkLatestResourceModal",
        modalTitle : '이번달 확인이 필요한 웹 콘텐츠', 
        tabulatorFunction : 'checkLatestTabulator', 
        topFunction : 'checkLatestTopContent'
    });        
});

// 비정형
$("#new-unstrresource-btn").click(function() {
	detailModalBtnEvent({
		modalId : "latestUnstrResourceModal",
		modalTitle : '이번달 새로 추가된 웹 콘텐츠',
		tabulatorFunction : 'latestTabulator',
		topFunction : 'latestUnstrTopContent'
	});
});
$("#check-new-unstrresource-btn").click(function() {
	detailModalBtnEvent({
	modalId : "checkLatestUnstrResourceModal",
	modalTitle : '이번달 확인이 필요한 웹 콘텐츠',
	tabulatorFunction : 'checkLatestTabulator',
	topFunction : 'checkLatestTopContent'
	});
});
</script>
<script type="text/javascript">var contextPath = '${contextPath}';</script>
<script src="${contextPath}/resources/vendor/apexcharts/apexcharts.min.js"></script>
<script type="text/javascript" src="${contextPath}/resources/js/api/optimizer-api.js"></script>
<script type="text/javascript" src="${contextPath}/resources/js/dashboard/dashboard-common.js"></script>
<script type="text/javascript" src="${contextPath}/resources/js/dashboard/dashboard-cost.js"></script>
<script src="${contextPath}/resources/vendor/simplebar/simplebar.min.js"></script>
<script src="${contextPath}/resources/vendor/sweetalert2/sweetalert2.min.js"></script>

<!--  ==================================================================================================== -->
		</div>
	</div>
</body>
</html>
