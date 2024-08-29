<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ include file="../includes/config.jsp"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!doctype html>
<html lang="ko">


<head>
<meta charset="utf-8" />
<title>${title }</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
<meta content="Pichforest" name="author" />
<script src="${contextPath}/resources/js/setting/optimizedManage.js"></script>


<style>
.container {display: flex; justify-content: center; margin-top: 20px;}
.container-box {max-width: 680px; height: auto; margin: 20px auto; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); background-color: var(--bs-white);}

.btn {background-color: transparent; border: 1px solid #A86EDA; color: #A86EDA; padding: 5px 35px; margin: 0 0.25rem; cursor: pointer; font-size: 1rem; transition: background-color 0.2s, color 0.2s; border-radius: 0;}
.btn:hover {background-color: #A86EDA;}
.btn.active {background-color: #A86EDA;}
/* .btn-check {display: none;} */
.btn-check:checked + .btn {background-color: #A86EDA; border: 1px solid #A86EDA;}

.site-registration {background-color: #A86EDA; color:white; padding: 8px 20px; border-radius: 2px; border: none;}
.site-registration:hover {background-color: #915ebd; color:white;}
</style>
</head>

<body>
    <h3 class="text-center mt-2">웹 사이트 등록</h3>
    <span class="text-center d-flex justify-content-center mt-2">
        OPTIMIZER를 적용할 웹 사이트의 정보를 등록해주세요.
    </span>
    <div class="container">
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" class="btn-check" name="resource_type" id="type-array-item0" autocomplete="off" value="0" checked> 
            <label class="btn" for="type-array-item0">Cloud 환경</label> 
            <input type="radio" class="btn-check" name="resource_type" id="type-array-item1" autocomplete="off" value="1"> 
            <label class="btn" for="type-array-item1">On-premise 환경</label> 
        </div>
    </div>

    <!-- Cloud환경 폼 -->
    <div class="container-box" id="cloud-form">
        <h5>사이트 등록</h5>
        <form name="cloudVO">
            <div class="input-group mb-1">
                <span class="input-group-text">클라우드 선택</span>
                <select class="form-select form-control" name="site_select" id="site_select">
                </select>
            </div>
            <div class="input-group mb-1">
                <span class="input-group-text">서버 유형</span>
                <span style="padding: 5px;"><input type="radio" name="server_type" id="server_storyge" value="1" checked="checked">스토리지</span>
                <span style="padding: 5px;"><input type="radio" name="server_type" id="server_linux" value="4">리눅스</span>
                <span style="padding: 5px;"><input type="radio" name="server_type" id="server_window" value="5">윈도우</span>
            </div>
            <div class="input-group mb-1">
                <span class="input-group-text">사이트 명</span>
                <input type="text" class="form-control" name="site_nm" id="site_nm" value="" />
            </div>
            <div class="input-group mb-1">
                <span class="input-group-text">사이트 주소</span>
                <input type="text" class="form-control" name="site_address" id="site_address" value="" />
            </div>
            <div class="input-group mb-1">
                <span class="input-group-text">담당자</span>
                <input type="hidden" class="form-control" readonly value="${sessionScope.login.lgn_sn }" name="lgn_sn" />
                <input type="text" class="form-control" id="site_manager" readonly value="${sessionScope.login.lgn_nm }" />
            </div>
        </form>

        <h5 class="mt-3">서버 정보 등록</h5>
        <form name="sshVO">
        <div class="input-group mb-1" id="ssh_id_box" style="display: none;">
			<span class="input-group-text">아이디</span> 
			<input type="text" class="form-control" name="ssh_id" value="" />
		</div>
		<div class="input-group mb-1" id="ssh_pw_box" style="display: none;">
			<span class="input-group-text">비밀번호</span> 
			<input type="text" class="form-control" name="ssh_pw" value="" />
		</div>
		<div class="input-group mb-1" id="ssh_port_box" style="display: none;"> 
			<span class="input-group-text">PORT 번호</span> 
			<input type="text" class="form-control" name="ssh_port" value="" />
		</div>
		<div class="input-group mb-1" id="ssh_server_ip_box" style="display: none;">
			<span class="input-group-text">서버 IP 주소</span> 
			<input type="text" class="form-control" name="ssh_server_ip" value="" />
		</div>
		<div class="input-group mb-1" id="resource_path_box" style="display: none;">
			<span class="input-group-text">웹 컨텐츠 경로</span> 
			<input type="text" class="form-control" name="resource_path" value="" />
		</div>
        <div class="input-group mb-1" id="access_key_box">
            <span class="input-group-text">ACCESS KEY 등록</span>
            <input type="text" class="form-control" name="access_key" value="" />
        </div>
        <div class="input-group mb-1" id="secert_key_box">
            <span class="input-group-text">SECRET KEY 등록</span>
            <input type="text" class="form-control" name="secert_key" value="" />
        </div>
        <div class="input-group mb-1" id="bucket_name_box">
            <span class="input-group-text">버킷 명 등록</span>
            <input type="text" class="form-control" name="bucket_name" value="" />
        </div>
        </form>

        <div class="text-center mt-3">
            <button type="button" class="btn site-registration" id="cloud-submit-btn">웹 사이트 등록</button>
        </div>
    </div>

    <!-- On-premise환경 폼 -->
    <div class="container-box" id="onpremise-form">
        <h5>사이트 등록</h5>
        <form name="cloudVO">
            <div class="input-group mb-1">
                <span class="input-group-text">서버 유형</span>
                <span style="padding: 5px;"><input type="radio" name="server_type2" id="server_linux" value="4" checked="checked">리눅스</span>
                <span style="padding: 5px;"><input type="radio" name="server_type2" value="5" id="server_window">윈도우</span>
            </div>
            <div class="input-group mb-1">
                <span class="input-group-text">사이트 명</span>
                <input type="text" class="form-control" name="site_nm2" id="site_nm2" value="" />
            </div>
            <div class="input-group mb-1">
                <span class="input-group-text">사이트 주소</span>
                <input type="text" class="form-control" name="site_address2" id="site_address2" value="" />
            </div>
            <div class="input-group mb-1">
                <span class="input-group-text">담당자</span>
                <input type="hidden" class="form-control" readonly value="${sessionScope.login.lgn_sn }" name="lgn_sn" />
                <input type="text" class="form-control" id="site_manager" readonly value="${sessionScope.login.lgn_nm }" />
            </div>
        </form>

        <h5 class="mt-3">서버 정보 등록</h5>
        <form name="sshVO">
            <div class="input-group mb-1" id="ssh_id_box">
                <span class="input-group-text">아이디</span>
                <input type="text" class="form-control" name="ssh_id2" value="" />
            </div>
            <div class="input-group mb-1" id="ssh_pw_box">
                <span class="input-group-text">비밀번호</span>
                <input type="password" class="form-control" name="ssh_pw2" value="" />
            </div>
            <div class="input-group mb-1" id="ssh_port_box">
                <span class="input-group-text">PORT 번호</span>
                <input type="text" class="form-control" name="ssh_port2" value="" />
            </div>
            <div class="input-group mb-1" id="ssh_server_ip_box">
                <span class="input-group-text">서버 IP 주소</span>
                <input type="text" class="form-control" name="ssh_server_ip2" value="" />
            </div>
            <div class="input-group mb-1" id="resource_path_box">
                <span class="input-group-text">웹 컨텐츠 경로</span>
                <input type="text" class="form-control" name="resource_path2" value="" />
            </div>
        </form>

        <div class="text-center mt-3">
            <button type="button" class="btn site-registration" id="premise-submit-btn">웹 사이트 등록</button>
        </div>
    </div>
 <!-- <div id="siteManageTable"></div>  --> 

<script>
document.addEventListener('DOMContentLoaded', function() {
    const cloudForm = document.getElementById('cloud-form');
    const onPremiseForm = document.getElementById('onpremise-form');
    
    const radioButtons = document.querySelectorAll('input[name="resource_type"]');
    radioButtons.forEach(button => {
        button.addEventListener('change', function() {
            if (this.value === '0') { // Cloud 환경 선택
                cloudForm.style.display = 'block';
                onPremiseForm.style.display = 'none';
            } else if (this.value === '1') { // On-premise 환경 선택
                cloudForm.style.display = 'none';
                onPremiseForm.style.display = 'block';
            }
        });
    });

    // 초기 상태 설정
    const checkedRadio = document.querySelector('input[name="resource_type"]:checked');
    if (checkedRadio) {
        if (checkedRadio.value === '0') {
            cloudForm.style.display = 'block';
            onPremiseForm.style.display = 'none';
        } else {
            cloudForm.style.display = 'none';
            onPremiseForm.style.display = 'block';
        }
    }
});
</script>

</body>
</html>