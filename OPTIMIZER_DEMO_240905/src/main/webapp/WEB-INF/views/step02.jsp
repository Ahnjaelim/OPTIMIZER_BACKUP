<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>

<h3>기본 정보 입력</h3>
<p class="paragraph">벤치마크 테스트를 진행할 웹 사이트 주소를 입력해주세요.</p>


<div class="input-group">
	<div class="label">웹 사이트 주소</div>
	<div class="input"><input type="text" class="page-url"></div>
</div>
<div class="alert alert-secondary">
	<p class="warn-msg"><ion-icon name="alert-circle"></ion-icon> 웹 사이트 주소를 입력해주세요.</p>
	<p><ion-icon name="alert-circle"></ion-icon> URL이 올바르게 입력되었는지 확인하세요. 잘못된 URL은 페이지를 찾을 수 없거나 잘못된 페이지로 연결될 수 있습니다.</p>
	<p><ion-icon name="alert-circle"></ion-icon> 벤치마크 테스트는 한번에 한 URL만 확인할 수 있습니다.</p>
</div>

