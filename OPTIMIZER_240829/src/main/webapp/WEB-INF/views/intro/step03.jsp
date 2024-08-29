<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>

<style>
h3 {font-size:20px;}
.step-container {background: var(--bs-white); border: 1px solid var(--bs-border-color-translucent); border-radius: 5px;}
.side-step {flex:0 0 300px; max-width: 300px; min-width: 300px; padding:20px; border-right: 1px solid var(--bs-border-color-translucent);}
.side-step li {margin-bottom:15px;}
.side-step span {background: rgba(255,255,255,0.1); border-radius: 30px; display: inline-block; width:30px; height:30px; padding-top:2px; margin-right:10px; text-align: center;}
.side-step .active {color:#a86eda; font-weight: bold;}
.side-step .active span {background:#a86eda; color:#ffffff;}
.side-step .done {color:#8cc054;}
.side-step .done span {background:#8cc054; color:#ffffff;}
#skip-btn {width: 100%; border-radius: 5px; padding:4px; background: transparent; border: 1px solid rgba(255,255,255,0.5); }

.step-content {}
.step-content li {display:none;}
.step-content-head {position: relative; border-bottom:1px solid var(--bs-border-color-translucent); padding:20px;}
.step-content-head p {margin:0; padding:0;}
.step-content-head .btn-container {position: absolute; right:20px; top:20px; padding:0; margin:0;}
.step-content-head .btn-container button {border-radius: 5px; padding:4px; width:60px; }
.prev-btn {background: transparent; border:1px solid rgba(255,255,255,0.5); }
.next-btn {background: #a86eda; border:1px solid #a86eda;}
.step-content-body {padding:20px;}

.iframe-container {background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius: 5px; overflow:hidden;}
.iframe-container .col1 {border-right:1px solid rgba(255,255,255,0.1); height:350px; overflow: hidden;}
.iframe-container .col2 {text-align:center; position: relative;}
.iframe-container .col2 p {padding:0; margin:0;}
#speed-insight-api-btn {position:absolute; top:50%; left: 50%; transform:translate(-50%, -50%); font-size:13.5px; width:200px;}

.count-summary {position:absolute; top:50%; left: 50%; transform:translate(-50%, -55%); width:100%; text-align:center;}
.count-summary .count {position:absolute; text-align:center; top:80px; width:100%; color:rgba(255,255,255,0.5);}
.count-summary .count .done {font-weight: bold; color:#fff;}
#radial-chart {position: relative; z-index: 1;}

iframe { transform: scale(0.5); transform-origin: 0 0; width: 200%; height:700px; border: none; background: #ffffff; position: relative; z-idex:2;}

.browser-frame {
border: 1px solid rgba(255,255,255,0.2);
border-bottom:none;
border-radius: 8px 8px 0px 0px;
overflow: hidden;
width: 100%;
margin:0px;
height:400px;
	position: relative;
}

.browser-header {
background: #f1f1f1;
padding: 10px;
display: flex;
align-items: center;
}

.browser-buttons {
display: flex;
gap: 5px;
}

.browser-button {
width: 12px;
height: 12px;
border-radius: 50%;
background: #ff5f56; /* Red button */
display: inline-block;
}

.browser-button:nth-child(2) {
background: #ffbd2e; /* Yellow button */
}

.browser-button:nth-child(3) {
background: #27c93f; /* Green button */
}

.address-bar {
flex-grow: 1;
margin-left: 10px;
padding: 5px;
border: 1px solid #ccc;
border-radius: 5px;
background: white;
color:#1e1e1e;
}

.iframe-ready {position: absolute; height:350px; width:100%; background: rgba(255,255,255,0.1); top:50px; left:0; z-index:1;}
.iframe-ready div {position:absolute; top:50%; left: 50%; transform:translate(-50%, -50%); z-index:1; }
.iframe-ready .page-time {width:200px; height:200px; background:rgba(0,0,0,0.2); border-radius: 200px; backdrop-filter: blur(5px); display:none; text-align:center; font-size:3em; font-weight: bold; padding-top:70px; z-index:2;}
.iframe-ready .page-time::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 10px solid rgba(255,255,255,0.3);
    border-top: 10px solid #ffffff;
    border-radius: 50%;
    transition: all 0.3s linear;
}

.iframe-ready .page-time.spinning::before {
    animation: spin 1s linear infinite;
}
[data-type="before"] .iframe-ready .page-time.complete::before {border-color:var(--color-red);}
[data-type="after"] .iframe-ready .page-time.complete::before {border-color:var(--color-green);}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
[data-type="before"] .iframe-ready .page-time::before {border-top-color:var(--color-red);}
[data-type="after"] .iframe-ready .page-time::before {border-top-color:var(--color-green);}

.iframe-ready .result {z-index:3; top: 40%; display:none;}
 .progress-bar {background: rgba(255,255,255,0.1); border-radius: 0px 0px 10px 10px; height:10px; border: 1px solid rgba(255,255,255,0.2);
border-top:none;}
.progress-bar div {background: var(--color-green); width:0%; height:10px;}
 [data-type="before"] .progress-bar div {background: var(--color-red);}

.data-table {width:100%;}
.data-table thead th {background: rgba(255,255,255,0.05); font-weight: bold;}
.data-table th,
.data-table td {border:1px solid  rgba(255,255,255,0.2); padding:5px; text-align: center;}
.data-table tbody th {background: rgba(255,255,255,0.05);  font-weight: bold;}
.data-table .before {background: rgba(201,49,51,0.2);}
.data-table .after {background: rgba(140,192,84,0.2);}
.data-table thead .before {background: rgba(201,49,51,0.3);}
.data-table thead .after {background: rgba(140,192,84,0.3);}
.data-table .after .value1 {display: inline-block; width:70px; text-align:right; margin-right:10px;}
.data-table .after .value2 {display: inline-block; background: rgba(140,192,84,1.0); border-radius: 30px; padding:3px 10px; line-height: 1; min-width:60px; text-align:left;}
.data-table tbody td strong {color:var(--color-yellow);}

.json-key {
    color: #ff0000;
    margin-left: 20px;
}
.json-value {
    color: #0000ff;
    display: inline-block;
}
.json-string {
    color: #ff00ff;
    display: inline-block;
}
.json-object, .json-array {
    margin-left: 20px;
    padding-left: 20px;
    border-left: 1px dotted #ccc;
}

.spinner-border  {    --bs-spinner-width: 1rem;
    --bs-spinner-height: 1rem; position: relative; top:4px; color:rgba(255,255,255,0.7) !important;}
    
.audit-summary {position:absolute; top:50%; left: 50%; transform:translate(-50%, -50%); }

.accordion-body div {border-bottom:1px solid rgba(255,255,255,0.1); padding:5px;}
.accordion-body div strong {color:#ffffff;}
.accordion-body div:last-child {border:none;}
</style>

<div class="d-flex step-container">
	<div class="side-step">
		<ul>
			<li data-step-sub="1"><span>1</span> 현재 상태 진단</li>
			<li data-step-sub="2"><span>2</span> 최적화 적용</li>
			<li data-step-sub="3"><span>3</span> 최적화 미리보기</li>
		</ul>
		<button id="skip-btn" onclick="step3Fnc.skipBtnEvent();">건너 뛰기</button>
	</div>
	<div class="col step-content">
		<div style="display:none;">
			<input type="text" value="" id="site-address" readonly style="width:33%" />
			<input type="text" value="" id="site-no" readonly style="width:33%" />
			<input type="text" value="" id="page-no" readonly style="width:33%" />
		</div>	
		<div style="display:none;">
			<select id="search-status-select" multiple="multiple"></select>
			<input type="text" name="search_range" value="0" />	
			<div class="search-type"></div>
		</div>
		<c:choose>
		    <c:when test="${param.step_sub == '1'}">
		    	<div class="step-content-head">
			       	<h3>현재 상태 진단</h3>
			       	<p>이전 단계에서 입력한 웹 사이트의 대표 웹 페이지를 진단합니다.</p>
			       	<div class="btn-container">
			       		<button class="prev-btn" disabled>이전</button>
			       		<button class="next-btn" disabled>다음</button>
			       	</div>
			    </div>
			    <div class="step-content-body">
				    <div class="d-flex iframe-container">
				    	<div class="col col1">
				    		<iframe src="" id="target-page"></iframe>
				    	</div>
				    	<div class="col col2">
				    		<div class="audit-summary">
				    			<button class="custom-btn btn-11" id="speed-insight-api-btn"><i class="fa-solid fa-magnifying-glass-chart"></i> 진단 시작하기</button>
				    		</div>
				    	</div>
				    </div>
				    <div id="jsonData" style="word-break: break-all; overflow:auto;"></div>
				    
<div class="accordion" style="margin-top:20px;">
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
             	이미지 최적화 알고리즘
            </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample" style="">
            <div class="accordion-body">
	        	<div><strong>이미지 압축 최적화</strong> - 이미지 압축 최적화는 무손실 압축 알고리즘을 적용한 기술로, 컨텐츠의 품질을 유지하고 데이터 크기를 최소화하여 랜더링 시간을 단축합니다.</div>
				<div><strong>이미지 해상도 최적화</strong> - 이미지 해상도 최적화는 이미지를 웹페이지의 해상도에 맞게 Resizing하는 기술입니다.</div>
				<div><strong>이미지 포맷 최적화</strong> - 이미지 포멧 최적화는 동일한 화질을 제공하는 이미지 포멧 중 가장 작은 크기의 포멧으로 최적화하는 기술입니다.</div>
            </div>
        </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                	동영상 최적화 알고리즘
            </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample" style="">
            <div class="accordion-body">
				<div><strong>동영상 비트레이트 최적화</strong> - 동영상 비트레이트 최적화는 동영상 해상도에 맞게 적정 비트레이트로 최적화하는 기술입니다</div>
				<div><strong>동영상 코덱 최적화</strong> - 동영상 코덱 최적화는 동영상 해상도에 맞게 최적의 코덱을 적용하여 최적화하는 기술입니다</div>
				<div><strong>동영상 확장자 최적화</strong> - 동영상 확장자 최적화는 동일한 화질을 제공하는 동영상의 확장자 중 가장 작은 크기의 확장자로 최적화하는 기술입니다</div>
            </div>
        </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
               텍스트 최적화 알고리즘
            </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample" style="">
            <div class="accordion-body">
				<div><strong>공백제거를 통한 최적화</strong> - 공백제거를 통한 최적화는 불필요한 공백을 제거하여 최적화하는 기술입니다.</div>
				<div><strong>주석제거를 통한 최적화</strong> - 주석제거를 통한 최적화는 불필요한 주석을 제거하여 최적화하는 기술입니다.</div>                
            </div>
        </div>
    </div>
	<div class="accordion-item">
	    <h2 class="accordion-header" id="headingFour">
	        <button class="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
	            폰트 최적화 알고리즘
	        </button>
	    </h2>
	    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample" style="">
	        <div class="accordion-body">
               <div><strong>폰트 포멧 최적화</strong> - 폰트 포멧 최적화는 폰트 압축을 통해 최적화하는 기술입니다.</div>
				<div><strong>서브셋 폰트를 통한 최적화</strong> - 서브셋 폰트를 통한 최적화는 서브셋 폰트를 사용하여 불필요한 폰트를 제거하는 최적화 기술입니다.</div>   	            
	        </div>
	    </div>
	</div>
</div>

				</div>
		    </c:when>
		    <c:when test="${param.step_sub == '2'}">
		    	<div class="step-content-head">
			       	<h3>최적화 적용</h3>
			       	<p>웹 페이지 성능에 영향을 주는 웹 콘텐츠의 최적화를 진행합니다. 해당 웹 페이지의 크기에 따라 다소의 시간이 소요될 수 있습니다.</p>   
			       	<div class="btn-container">
			       		<button class="prev-btn" disabled>이전</button>
			       		<button class="next-btn" disabled>다음</button>
			       	</div>
			    </div>
			    <div class="step-content-body">
				    <div class="d-flex iframe-container">
				    	<div class="col col1">
				    		<iframe src="" id="target-page"></iframe>
				    	</div>
				    	<div class="col col2">
				    		<div class="count-summary">
				    			<div class="spinner-border text-primary m-1" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
				    		</div>
				    	</div>
				    </div>	
				    <div id="resource-list"></div>	
				 </div>       	
		    </c:when>
		    <c:when test="${param.step_sub == '3'}">
		    	<div class="step-content-head">
			       	<h3>최적화 미리보기</h3>
			       	<p>OPTIMIZER로 해당 웹 페이지의 성능이 얼마나 개선됐는지 확인해보세요!</p>  
			       	<div class="btn-container">
			       		<button class="prev-btn" disabled>이전</button>
			       		<button class="next-btn" disabled>다음</button>
			       	</div>
			    </div>
			    <div class="step-content-body">
			       	<div id="time-simulation-head">
			       	</div>
			       	<div id="time-simulation">
			       	</div>
			       	<div id="page-summary">
			       	</div>
			    </div>
		    </c:when>
		    <c:otherwise>
		       	잘못된 접근입니다!
		    </c:otherwise>
		</c:choose>	
	</div>
</div>

<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<script type="text/javascript" src="${contextPath}/resources/js/intro/step03.js"></script>