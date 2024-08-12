<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ include file="/WEB-INF/views/preLoader.jsp"%>
<script src="${contextPath}/resources/js/setting/alertCenter.js"></script>
<head>
<style> 
.icon-btn {display: inline-block; background: rgba(255,255,255,0.0); border:1px solid rgba(255,255,255,0.2); width:33px; height:33px; border-radius: 5px; text-align:center; position: relative; margin:5px 10px 0px 0px; color:rgba(255,255,255,1.0); cursor:pointer;}
.icon-btn i {position:absolute; top:50%; left: 50%; transform:translate(-50%, -50%); }
.dropdown {top: 0; right: -405px;}
.dropdown-menu-lg {width: 340px;}

#alram-toggle {cursor: pointer;}
#alram-number {cursor: pointer; position: absolute; top: -5px; right: -10px; background-color: var(--color-blue); color: white; border-radius: 30px; padding: 2px 8px; font-size: 10px;}

#latest-alram {background: var(--bs-white); border: 1px solid rgba(204, 204, 204, 0.3); width: 337px;  position: absolute; top: 50px; right:0; display:none;}
</style>
</head>

<header id="page-topbar">
    <div class="navbar-header">
        <div class="navbar-item col1">
            <a href="/"><img src="${contextPath}/resources/img/logo.png" style="height:30px;" /></a>
        </div>
        <div class="navbar-item col2">
            <ul class="navbar-menu">
            	<c:forEach var="entry" items="${sessionScope.menuMAP}">
				    <c:if test="${entry.key == 1}">
				        <c:forEach var="menu" items="${entry.value}">
				            <li <c:if test="${sessionScope.current_menu_1 == menu.menu_sn}">class="active"</c:if>>
				                <a href="${menu.menu_addr_url}">
				                 <!-- icon 영역 -->
					            <c:choose>
					                <c:when test="${fn:startsWith(menu.menu_icon, 'ion')}">
					                    <ion-icon name="${fn:substringAfter(menu.menu_icon, '@')}"></ion-icon>
					                </c:when>
					                <c:when test="${fn:startsWith(menu.menu_icon, 'fa')}">
					                    <i class="${fn:substringAfter(menu.menu_icon, '@')}"></i>
					                </c:when>
					                <c:otherwise>
					                </c:otherwise>
					            </c:choose> 
				                <!--  icon 영역 end -->
				                    ${menu.menu_nm}
								</a>
								<!-- child list -->
								<c:if test="${not empty menu.childList}">
					            <ul>
					                <c:forEach var="child" items="${menu.childList}">
					                    <li>
					                        <a href="${child.menu_addr_url}"> ${child.menu_nm}</a>
					                    </li>
					                </c:forEach>
					            </ul>
					        </c:if>
				            </li>
				        </c:forEach>
				    </c:if>
				</c:forEach>
            </ul>
        </div>
        <div class="navbar-item d-flex col4" style="padding-left: 0px;" id="site-select">
            <div class="site-select header-item" style="opacity: 0;">
                <label class="col-form-label select-title">사이트</label>
                <select class="form-control" name="site-no" id="site-no" multiple="multiple"></select>
                <button id="site-confirm-btn" class="site-confirm-btn">확인</button>
            </div>
        </div>
        <!-- 알람 -->
        <div class="navbar-item" style="position: relative;">
            <a href="#" id="alram-toggle" class="icon-btn"><i class="fa-solid fa-bell"></i><span id="alram-number"></span></a>
            <div id="latest-alram">
                <h5 class="text-start p-2" style="margin-bottom:-0.5rem;">확인하세요 !</h5>
                <div class="p-2">
                    <span class="font-bold text-white" id="newAlert">신규 알림</span>
                    <div style="background-color: rgba(255, 255, 255, 0.1);">
                        <a class="dropdown-item" href="/alertCenter">
                            <span class="d-flex p-2 justify-content-center fw-bold">+ 더보기</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="navbar-item">
        	<a href="#" onclick="openPopup(event, '/optimizer_menual')" class="icon-btn"><i class="fa-solid fa-circle-question"></i></a>
        </div>
        <div class="navbar-item">
        	<a onclick="logoutBtnEvent();" class="icon-btn"><i class="fa-solid fa-right-from-bracket"></i></a>
        </div>
        <div class="navbar-item col3" style="margin-left:10px;">
            <span><strong>${sessionScope.login.lgn_nm }님</strong></span>
        </div>
    </div>
</header>

<script>

function openPopup(event, url) {
    event.preventDefault(); // 기본 링크 동작을 막음
    // 팝업 창의 크기 설정
    var width = 830;
    var height = 600;
    
    // 팝업 창을 화면 중앙에 위치시키기 위한 좌표 계산
    var left = (screen.width / 2) - (width / 2);
    var top = (screen.height / 2) - (height / 2);
    
    // 팝업 창 열기
   var options = 'width=' + width + ',height=' + height + ',top=0,left=0,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes';
     window.open(url, 'popupWindow', options);
}

$(document).ready(function() {
    
	// 알림 이벤트
	$('#alram-toggle').click(function() {
        $('#latest-alram').stop().fadeToggle(200);
    });
    $(document).click(function(event) {
        if (!$(event.target).closest('#alram-toggle, #latest-alram').length) {
            $('#latest-alram').stop().fadeOut(200);
        }
    });
    
    $(".navbar-menu li").each(function() {
        if ($(this).find("ul").length > 0) {
            $(this).mouseenter(function() {
                $(this).find("ul").stop().fadeIn(300).css("top", "70px");
            });
            $(this).mouseleave(function() {
                $(this).find("ul").stop().fadeOut(300).css("top", "80px");
            });
        }
    });

    $('#site-no').SumoSelect({
        csvDispCount: 3,
        captionFormat: '{0} 개 선택',
        captionFormatAllSelected: '{0} 개 모두 선택',
        selectAll: false,
        locale: ['확인', '취소', '전체'],
    });

    $(".navbar-menu li").each(function() {
        if ($(this).find("ul").length > 0) {
            $(this).mouseenter(function() {
                $(this).find("ul").stop().fadeIn(300).css("top", "70px");
            });
            $(this).mouseleave(function() {
                $(this).find("ul").stop().fadeOut(300).css("top", "80px");
            });
        }
    });

    $('#site-no').SumoSelect({
        csvDispCount: 3,
        captionFormat: '{0} 개 선택',
        captionFormatAllSelected: '{0} 개 모두 선택',
        okCancelInMulti: false,
        selectAll: false,
    });

    setTimeout(function() {
        $("#site-select .options li").each(function(index, item) {
            $(this).click(function() {
                $("#site-select .options li").each(function(jndex, jtem) {
                    if (index != jndex) {
                        $('#site-no')[0].sumo.unSelectItem(jndex);
                    }
                });
            });
        });
    }, 0);

    $(".site-select").animate({
        "opacity": "1.0"
    }, 150);

    $.ajax({
        url: 'selectTopbarSiteList',
        type: 'post',
        dataType: 'json',
        async: false,
        success: function(data) {
            sessionSiteList = data.sessionSiteList;
            data = data.data;

            if (sessionSiteList && sessionSiteList.length > 0) {
                MySelect = $('#site-no').SumoSelect();
                $.each(data, function(index, item) {
                    $('#site-no')[0].sumo.add(item.site_no, item.site_name);
                    if (sessionSiteList.includes(item.site_no.toString())) {
                        $('#site-no')[0].sumo.selectItem(item.site_no.toString());
                    }
                });
            } else {
                $.each(data, function(index, item) {
                    $('#site-no')[0].sumo.add(item.site_no, item.site_name);
                    if (index === 0 && $('#site-no').find(':selected').length === 0) {
                        $('#site-no')[0].sumo.selectItem(item.site_no.toString());
                    }
                });
                getSelectedValues(); // 세션 세팅
            }
            $('#site-no')[0].sumo.reload();
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });

    $('#site-confirm-btn').click(function() {
        getSelectedValues();
        location.reload();
    });

    main();
    
    $("#site-select select").change(function(){
    	$('#site-confirm-btn').click();
    });
});

function activeTopMenu(mn) {
    $(".navbar-menu > li:eq(" + mn + ")").addClass("active");
}

function getSelectedValues() {
    var selectedValues = $('#site-no').val();
    setSession(selectedValues);
    return selectedValues;
}

function getAllSessionStorageItems() {
    const items = {};
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
        items[key] = value;
    }
    return items;
}

function setSession(selectedValues) {
    $.ajax({
        url: 'setSession',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            selectedValues: selectedValues
        }),
        success: function(data) {},
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}

function logoutBtnEvent(){
	Swal.fire({
		icon: "question",
		title: "현재 계정에서 로그아웃 하시겠습니까?",
		text: "",
		showCancelButton: true,
		confirmButtonColor: "#51d28c",
		cancelButtonColor: "#f34e4e",
		confirmButtonText: "로그아웃",
		cancelButtonText: "취소",
		showClass: {
			popup: 'animate__animated animate__fadeIn animate__faster',
		},
		hideClass: {
			popup: 'animate__animated animate__fadeOut animate__faster',
		},        
	}).then(function(result) {
	    if (result.isConfirmed) {// 사용자가 확인(실행) 버튼을 클릭했을 때만 실행됩니다.
	    	window.location.href = '/logout';
	    }
	});	
}
</script>

