<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- JAVASCRIPT -->
<%-- <script src="${contextPath}/resources/vendor/bootstrap/js/bootstrap.bundle.min.js"></script> --%>
<script src="${contextPath}/resources/vendor/metismenujs/metismenujs.min.js"></script>
<%-- <script src="${contextPath}/resources/vendor/simplebar/simplebar.min.js"></script> --%>
<script src="${contextPath}/resources/vendor/feather-icons/feather.min.js"></script>
<%-- <script src="${contextPath}/resources/js/app.js"></script> --%>
<script src="${contextPath}/resources/vendor/sweetalert2/sweetalert2.min.js"></script>

<style>
#footer {position: fixed; bottom:0px; left:0px; width:100%; background: rgba(55,55,55,0.8); backdrop-filter: blur(5px); text-align: center; padding:10px 0px 10px 0px; color:rgba(255,255,255,0.5);}
</style>
<!-- <div id="footer">Copyright ⓒWELLCONN. All Rights Reserved.</div> -->

<script>
$(document).ready(function(){
	$(".layout-parent").append("<div id='footer'>Copyright ⓒWELLCONN. All Rights Reserved.</div>");
});
</script>