<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>

<h3>최적화 적용</h3>
<p class="paragraph">이전 단계에서 수집한 웹 콘텐츠를 최적화 합니다. 약간의 시간이 소요될 수 있으며 잠시 기다려 주세요.</p>

<div class="progress" style="height:30px;">
	<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
	<div class="progress-percentage"></div>
</div>
                                           
<div class="progress-msg">
</div>                 

<div id="resource-list">
</div>