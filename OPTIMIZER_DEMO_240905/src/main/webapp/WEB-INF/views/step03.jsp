<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>

<h3>현재 상태 진단</h3>
<p class="paragraph">해당 웹 사이트를 <strong>Google Lighthouse 모듈</strong>을 활용하여 진단을 시작합니다.</p>

<div class="d-flex iframe-container">
	<div class="col col1">
		<iframe src="" id="target-page"></iframe>
	</div>
	<div class="col col2">
		<div class="audit-summary">
			<div class="spinner-border text-primary m-1" role="status"><span class="sr-only">Loading...</span></div>
			해당 페이지를 진단 중입니다. 잠시 기다려주세요.
		</div>
	</div>
</div>

<div class="accordion" id="accordionExample" style="margin-top:15px">
   <div class="accordion-item">
   <h2 class="accordion-header" id="headingOne">
       <button class="accordion-button fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
           <ion-icon name="alert-circle"></ion-icon> Google Lighthouse가 뭔가요?
       </button>
   </h2>
   <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample" style="">
       <div class="accordion-body">
           Google Lighthouse는 광범위한 데이터와 알고리즘을 바탕으로 웹 페이지의 성능을 평가합니다. 해당 모듈을 통하여 웹 페이지의 로딩 속도, 반응성, 시각적 안정성 등을 정확하게 측정할 수 있습니다.
       </div>
   </div>
   </div>
   <div class="accordion-item">
   <h2 class="accordion-header" id="headingTwo">
       <button class="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
           	<ion-icon name="alert-circle"></ion-icon> 성능 점수는 어떻게 측정되나요?
       </button>
   </h2>
   <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample" style="">
       <div class="accordion-body">
			<ol class="ordered-list" style="list-style: decimal;">
				<li>주요 성능 지표 측정: Lighthouse는 First Contentful Paint(FCP), Largest Contentful Paint(LCP), Total Blocking Time(TBT), Cumulative Layout Shift(CLS) 등 핵심 성능 지표들을 측정합니다.</li>
				<li>각 지표에 가중치 부여: 측정된 각 지표에 중요도에 따라 가중치가 부여됩니다. 예를 들어 LCP와 TBT는 25-30%로 높은 가중치를, FCP는 10%로 낮은 가중치를 가집니다.</li>
				<li>점수 산출: 가중치가 적용된 각 지표의 점수를 종합하여 0-100점 사이의 최종 성능 점수가 계산됩니다.</li>
				<li>색상 등급 부여: 최종 점수에 따라 빨강(0-49), 주황(50-89), 초록(90-100)의 색상 등급이 부여됩니다.</li>
			</ol>           
       </div>
   </div>
   </div>
   <div class="accordion-item">
   <h2 class="accordion-header" id="headingThree">
       <button class="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
           	<ion-icon name="alert-circle"></ion-icon> 주의 사항
       </button>
   </h2>
   <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample" style="">
       <div class="accordion-body">
			<ul class="unordered-list" style="list-style: disc;">
				<li>점수는 테스트 환경, 네트워크 상태, A/B 테스트 등 여러 요인에 따라 변동될 수 있습니다.</li>
				<li>구글은 사용자 경험 개선을 위해 주기적으로 지표와 가중치를 업데이트합니다.</li>
				<li>90점 이상의 녹색 등급을 받는 것이 권장됩니다.</li>
				<li>Lighthouse 점수는 웹사이트의 전반적인 성능을 객관적으로 평가할 수 있는 지표이지만, 완벽하지는 않습니다. 따라서 점수 개선과 함께 실제 사용자 경험 개선에도 초점을 맞추는 것이 중요합니다.</li>
			</ul>          
        </div>
    </div>
    </div>
</div>
