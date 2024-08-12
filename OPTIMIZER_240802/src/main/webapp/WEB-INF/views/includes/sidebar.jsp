<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<%@ page import="java.util.List, java.util.Map" %>
<%@ page import="com.wellconn.optimizer.model.OptimizerMenuVO" %>

<style>
#controlSideBarBtn {width:50px; height:50px; border-radius: 50px; position:absolute; top:50%; right:-25px; transform:translate(0%, -50%); border:none; background: rgba(60,60,60,0.9); backdrop-filter: blur(5px); border:1px solid rgba(255,255,255,0.2); transition: all 0.3s ease-in-out;}
#controlSideBarBtn:hover {background: rgba(90,90,90,0.9);}
</style>
<script>
</script>

<!-- ========== Left Sidebar Start ========== -->
<div class="vertical-menu">

    <!-- LOGO -->
    <div class="navbar-brand-box">
        <a href="/" class="logo logo-dark">
            <span class="logo-sm">
                <img src="${contextPath}/resources/img/logo-sm.jpg" alt="" height="22">
            </span>
            <span class="logo-lg">
                <img src="${contextPath}/resources/img/logo.jpg" alt="" height="22">
            </span>
        </a>

        <a href="/" class="logo logo-light">
            <span class="logo-lg">
                <img src="${contextPath}/resources/img/logo.jpg" alt="" height="22">
            </span>
            <span class="logo-sm">
                <img src="${contextPath}/resources/img/logo.jpg" alt="" height="22">
            </span>
        </a>
    </div>

    <div data-simplebar class="sidebar-menu-scroll" style="relative">
		<button id="controlSideBarBtn"><ion-icon name="chevron-back-outline"></ion-icon></button>
        <!--- Sidemenu -->
        <div id="sidebar-menu">
            <!-- Left Menu Start -->
            <ul class="metismenu list-unstyled" id="side-menu">
                <c:forEach var="entry" items="${sessionScope.menuMAP}">
				    <c:if test="${entry.key == 1}">
				        <c:forEach var="menu" items="${entry.value}">
					        <c:if test="${sessionScope.current_menu_1 == menu.menu_sn}">
						        <li class="menu-title" data-key="t-dashboards">${menu.menu_title}</li>
						        <c:forEach var="child" items="${menu.childList}" varStatus="status">
								    <li 
								        <c:if test="${sessionScope.current_menu_2 == child.menu_sn or (sessionScope.current_menu_2 == null and status.index == 0)}">
								            class="active mm-active"
								        </c:if>
								    >
								        <a href="${child.menu_addr_url}">
								            <span class="menu-item" data-key="t-sales">${child.menu_nm}</span>
								        </a>
								    </li>
								</c:forEach>
					        </c:if>  
				        </c:forEach>
				    </c:if>
				</c:forEach>
            </ul>
            
            
            
       
        </div>
        <!-- Sidebar -->
    </div>
</div>
<!-- Left Sidebar End -->

<script>


let sidebarHide = false;
$("#controlSideBarBtn").click(function(){
	controlSidebar();
});
function controlSidebar(){
	if(sidebarHide==false){
		$(".vertical-menu").css({"left":"-255px"});	
		$("#controlSideBarBtn").css({"right":"-50px"});	
		$("#controlSideBarBtn").html("<ion-icon name='chevron-forward-outline'></ion-icon>");
		$(".main-content").css({"margin-left":"0"});	
		sidebarHide=true;
	}else{
		$(".vertical-menu").css({"left":"0px"});	
		$("#controlSideBarBtn").css({"right":"-25px"});
		$("#controlSideBarBtn").html("<ion-icon name='chevron-back-outline'></ion-icon>");
		$(".main-content").css({"margin-left":"255px"});
		sidebarHide=false;
	}
}
</script>
