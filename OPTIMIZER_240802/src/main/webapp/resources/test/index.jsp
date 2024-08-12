<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>



<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>WELLCONN</title>
    <link rel=" shortcut icon" href="/resource/images/favicon.ico">
    <link rel="icon" href="/resource/images/favicon.ico">
    <meta name="keywords" content="" />
    <meta name="viewport" content="initial-scale=1" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
</head>

<style>
        /* The Modal (background) */
        .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 100000; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }
    
        /* Modal Content/Box */
        .modal-content {
            background-color: #fefefe;
            margin: 2% auto; /* 15% from the top and centered */
            padding: 20px;
            border: 1px solid #888;
            width: 60%; /* Could be more or less, depending on screen size */                          
        }
 /* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}
@-webkit-keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}
</style>
<body>
	<div id="waitPage" style="display:none">

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
<style>

	body{font-family:"Open Sans", sans-serif;background-size:cover;}
		#waitBackground{position:absolute;background-color:rgba(0,0,0,0.4);width:100%;height:100%;}
		@media (max-width :420px) {
			body{
				background-position:50%;
				
			}
			.login-containerT{width:100%!important;
			
			}
			.mobile-size {
				width:90%!important;
				margin: 0 auto;
				
			}
			.text-center h3 {
				margin-top: 50px!important;
				font-size: 20px!important;
			}
			.hpanel {
				margin-top: 20px!important;
				padding: 16px 0 16px 0!important;	

			}
			.sub_text {
				font-size:0.8em!important;			
			}
			#loading3 {
				width:70%!important;
			}
			.main_logo {
				left:60%!important;
			}
			.main_logo img {
				width: 110px!important;
				height: auto!important;
			}
			



		}
		.login-containerT{max-width:none;width:560px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:99;}

		.login-containerT, .row, .col-md-12, .hpanel{margin:0;padding:0;}
		.panel-bodyT{text-align:center;padding:0px 2it_default.jsp0px 10px!important;border-radius:0;}
		
		#boxHeadLine{background:#4486d4;width:100%;height:4px;}
		#wait_value{
			color:#1e1e1e;
			font-weight:bold;
			font-size:14px;
			margin: 0 -1px 0 0;
			
		}
		#wait_time{
			color:#1e1e1e;
			font-weight:bold;
			font-size: 14px;
			margin: 0 0 0 0;
			
		}
		#stop_button{
			float: right;
			color:#1e1e1e;
			font-size:15px;
			padding: 0 0 0 45%;
		}

		.container{
			width : auto;
		}




progress:not(value) {
}


progress[value] {
    appearance: none;
    
    border: none;
    
    width: 100%; height: 20px;
    
      background-color: whiteSmoke;
      border-radius: 3px;
      box-shadow: 0 2px 3px rgba(0,0,0,.5) inset;
    
    color: royalblue;
    
    position: relative;
    margin: 0 0 1.5em; 
}


progress[value]::-webkit-progress-bar {
    background-color: whiteSmoke;
    border-radius: 3px;
    box-shadow: 0 2px 3px rgba(0,0,0,.5) inset;
}

progress[value]::-webkit-progress-value {
    position: relative;
    
    background-size: 35px 20px, 100% 100%, 100% 100%;
    border-radius:3px;
    background-color: #2457BD; 
    animation: animate-stripes 5s linear infinite;
}


progress[value]::-webkit-progress-value:after {
    content: '';
    position: absolute;
    
    width:5px; height:5px;
    top:7px; right:7px;
    
    background-color: white;
    border-radius: 100%;
}


progress[value]::-moz-progress-bar {
    background-image:
    -moz-linear-gradient( 135deg,
                                                     transparent,
                                                     transparent 33%,
                                                     rgba(0,0,0,.1) 33%,
                                                     rgba(0,0,0,.1) 66%,
                                                     transparent 66%),
    -moz-linear-gradient( top,
                                                        rgba(255, 255, 255, .25),
                                                        rgba(0,0,0,.2)),
     -moz-linear-gradient( left, #09c, #f44);
    
    background-size: 35px 20px, 100% 100%, 100% 100%;
    border-radius:3px;
    
}
.progress-bar {
    background-color: whiteSmoke;
    border-radius: 3px;
    box-shadow: 0 2px 3px rgba(0,0,0,.5) inset;

    width: 100%; height:20px;
}

.progress-bar span {
    background-color: royalblue;
    border-radius: 3px;
    
    display: block;
    text-indent: -9999px;
}

p[data-value] { 
  
  position: relative; 
}


p[data-value]:after {
    content: attr(data-value) '%';
    position: absolute; right:0;
    background-color: #2457BD;
    font-weight: bolder;
    margin: 0 auto;
    color: white;
    border-radius: 4px 4px 4px 4px;
    padding: 5px 5px 5px 5px;
	margin-top:45px;
}

/*end*/



 /*
		#loading3{display:flex;width:50%;justify-content:space-between;margin:10px auto 49px;}
	    #loading3>div{width:8px;height:40px;margin-right:7px;background-color:#033074;border-radius: 3px;
	        -webkit-animation:strechdelay 1.5s ease-in-out infinite;
	        animation:strechdelay 1.5s ease-in-out infinite;
	    }
	    #loading3 .line2{
	      -webkit-animation-delay:-1.4s;
	      animation-delay:-1.4s;
	  } #loading3 .line3{
	      -webkit-animation-delay:-1.3s;
	      animation-delay:-1.3s;
	  }#loading3 .line4{
	      -webkit-animation-delay:-1.2s;
	      animation-delay:-1.2s;
	  }#loading3 .line5{
	      -webkit-animation-delay:-1.1s;
	      animation-delay:-1.1s;
	  }#loading3 .line6{
	      -webkit-animation-delay:-1.0s;
	      animation-delay:-1.0s;
	  }#loading3 .line7{
	      -webkit-animation-delay:-0.9s;
	      animation-delay:-0.9s;
	  }#loading3 .line8{
	      -webkit-animation-delay:-0.8s;
	      animation-delay:-0.8s;
	  }#loading3 .line9{
	      -webkit-animation-delay:-0.7s;
	      animation-delay:-0.7s;
	  }#loading3 .line10{
	      -webkit-animation-delay:-0.6s;
	      animation-delay:-0.6s;
	  }#loading3 .line11{
	      -webkit-animation-delay:-0.5s;
	      animation-delay:-0.5s;
	  }#loading3 .line12{
	      -webkit-animation-delay:-0.4s;
	      animation-delay:-0.4s;
	  }#loading3 .line13{
	      -webkit-animation-delay:-0.3s;
	      animation-delay:-0.3s;
	  }#loading3 .line14{
	      -webkit-animation-delay:-0.2s;
	      animation-delay:-0.2s;
	  }#loading3 .line15{
	      -webkit-animation-delay:-0.1s;
	      animation-delay:-0.1s;
	  }#loading3 .line16{
	      -webkit-animation-delay:-0.0s;
	      animation-delay:-0.0s;
	  } */
	    
	    @keyframes strechdelay{
	        0%,50%,100%{
	            transform:scaleY(.7);
	        }
	        20%{
	            transform:scaleY(1);
	            background-color:#2d69c2;
	        }
	    }
	
	    @-webkit-keyframes strechdelay{
	        0%,50%,100%{
	            -webkit-transform:scaleY(.7);
	        }
	        20%{
	            -webkit-transform:scaleY(1);
	            background-color:#72a5f5;
	        }
	    }
	</style>

<script type="text/javascript">

playAlert = setInterval(function() {
    if ( this_isWait == "T" ) {
	 checkCntData();
    } 
}, 1000);

function getWaitTime(session_time_out, limitCnt, waitCnt) {

   if ( limitCnt == 0 ) return '알수없음';
   var aa = session_time_out/limitCnt * waitCnt;
   aa = Math.round(aa);

   var hour='00';
   var min='00'
   var sec='00';

   if ( aa >=3600 ) {
      hour=Math.floor(aa/3600); 
      if ( hour < 10 ) hour = '0'+hour;
      aa=aa-hour*3600;
   } 
   
   if ( aa >=60 ) {
      min=Math.floor(aa/60);
      if ( min < 10 ) min = '0'+min;
      aa=aa-min*60;
   } 
    
   if ( aa < 10 ) sec = '0'+aa;
   else  sec = aa;
  
   var result = hour + ":" + min + ":" + sec;
   return result;
}

function getWaitPer(limitCnt, waitCnt) {
   var result = 100-( waitCnt/limitCnt*100 );
   result = Math.floor(result);
   return result;
}

function getWaitPerNew(limitCnt, waitCnt, waitMyCnt) {
   var result = 100-( waitCnt/waitMyCnt*100 );
   result = Math.floor(result);
   return result;
}


function checkCntData() {
    var host = this_host;
    var ip =  this_ip;
    var loginId = this_loginId;
    var port = this_port;
    var pageUrl = this_pageUrl;
    var sendThis = this_sendThis

    callTracerApiInputData(host, ip, loginId, port, pageUrl, sendThis);

    var waitCnt = this_waitCnt;

    if ( waitCnt == "0" || waitCnt == "E") {
      showRealPage();
      callBackTracer();
    } else {
        var $el = $("#waitCnt");
	var $el1 = $("#wait_time_value");
        var $el2 = $("#progressbarData");
 	var $el3 = $("#progressbar"); 
	
	var waitCnt = this_waitCnt;
    	var limitCnt = this_limitCnt;
    	var session_time_out = this_session_time_out;
    	var waitQueueSize = this_waitQueueSize;
	var waitMyCnt = this_waitMyCnt;

    	//var wait_per = getWaitPer(waitQueueSize, waitCnt);
    	var wait_per = getWaitPerNew(waitQueueSize, waitCnt, waitMyCnt);
	var wait_time = getWaitTime(session_time_out, limitCnt, waitCnt);
 
	if ( $.isNumeric(waitCnt) ) {
	     $el.html(comma(Math.floor(waitCnt)));
	     $el1.html(wait_time);

	     $el2.width(wait_per+'%');	
	     $el2.attr("data-value", wait_per);

	     $el3.val(wait_per);


	} else {
	  // alert("AAA"+opener.this_waitCnt+"AAA");

	}
    }

}



function createCookie() {
	var now = new Date();
	  var time = now.getTime();
	  var expireTime = time + 1000*36000;
	  now.setTime(expireTime);
	  var tempExp = 'Wed, 31 Oct 2020 08:50:17 GMT';
	  document.cookie = 'SESSIONID=hjpark123;expires='+now.toGMTString()+';path=/';
	  //console.log(document.cookie);
}


/* setInterval(function() {
	window.location.href='login.do';
		}, 20000); */

function comma(num){
    var len, point, str; 
       
    num = num + ""; 
    point = num.length % 3 ;
    len = num.length; 
   
    str = num.substring(0, point); 
    while (point < len) { 
        if (str != "") str += ","; 
        str += num.substring(point, point + 3); 
        point += 3; 
    } 
     
    return str;
}

</script>

</head>
<body class="blank">

<form id="listForm" method="POST" class="mt-repeater form-horizontal" action="">
</form>
<div class="login-containerT" style="">
    <div class="row1" id="isWaitPage" style="display:block">
	<div class="mobile-size" style="width:100%;height:auto;overflow:hidden;">
        <div class="col-md-12" style="width:100%;height:auto;background:#fff;">
			<div class="main_logo"style="position:absolute;left:78%;top:12px; height: 50px;"> 
				<img src="/resource/tracer/logo.png" style="width:110px;height:auto;margin-top: 5px;"></div>
        	<div class="text-center" style="padding-top:20px;"></div>
            <div class="text-center m-b-md">
                
		<h3 style="font-weight:bold;font-size:26px;color:#1245AB;letter-spacing: -0.04em;text-align: center;margin-top:50px"><span style="color:#000;">서비스 </span> 접속 대기 <span style="color:#000;">중입니다.</span> </h3>
            </div>
            <h5 style="font-weight:bold; font-size:13px;color:#454545;margin: 20px 0 20px 0;letter-spacing: -0.04em;text-align: center;">잠시만 기다리시면 해당 페이지로 자동 접속됩니다. </h5>
            
			<!-- 
			            <div class="container">
			  <div class="progress">
			 			   <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:70%">
			 			   </div>
			  </div>
			</div>
			 -->
			
			<!-- HTML5 -->
			<div style="width: 88%; margin:0 auto;margin-top:-30px;">
		    <p style=" width:0%" data-value="0" id="progressbarData"><span style="">&nbsp</span></p>
		        <progress max="100" value="0" class="html5" id="progressbar">
		        </progress>
			</div>
		
            <div class="hpanel" style="width:88%;margin: 0 auto;padding: 14px 0 14px 0;margin-top:20px;">
                <div class="panel-bodyT" style="border:none; display: flex;">
					<div id="wait_value" style="border:1px solid gray; width: 60%; height: 80px;">
					<div style="margin: 12px 0 0 12px;">
						<img src="/resource/tracer/people.png" style="float: left;width:23px;height:23px;margin-right: 3px;">
						<p style="float: left; margin-top:0px;">대기자 수</p> </br></div>
						<span style="font-size:25px;color:#1245AB;font-weight:bold; line-height: 45px;" id="waitCnt">-</span> 명</div>
					<div id="wait_time" style="border:1px solid gray; width: 60%; height: 80px; "><div style="margin: 12px 0 0 12px;">
					<img src="/resource/tracer/watch.png" style="margin-right: 3px;width:23px;height:23px;float: left;">
					<p style="float: left;  margin-top:0px;">예상대기시간</p></br></div>
					<span style="font-size:25px;color:#1245AB;font-weight:bold;line-height: 45px;float: right;margin-right: 10px;" id="wait_time_value">--:--:--</span></div>

                </div>
            </div>

            <hr>
            <!-- <div style="display: flex; height: 40px;"> -->
				<div class="sub_text"style="height: 30px; letter-spacing: -0.04em;font-size:0.8em;color:#1e1e1e;padding: 0 0 0 3%;"></div>
             <!--   <div id="stop_button" onclick="self.close();"><img src="./xbox.png" style="margin-right: 3px; width:18px;height:18px;margin-bottom: 3px;">중지하기</div>
                            </div> -->
                   
        </div>
	</div>
    </div>


	<div class="row" id="isRejectPage" style="display:none">
	<div class="mobile-size" style="border: 4px solid #033074;width:100%;height:auto;overflow:hidden;">
        <div class="col-md-12" style="width:100%;background:#fff;">
		<div class="main_logo" style="position:absolute;right:2%;top:12px;"> <img src="/resource/tracer/logo2.png" style="width:90px;height:auto;margin-top: 10px;"> </div>
        	<div class="text-center" style="padding-top:20px;"></div>
            <div class="text-center m-b-md">
                <h3 style="font-weight:bold;font-size:22px;color:#033074;margin-top:5px;letter-spacing: -0.04em;text-align: center;">서비스 접속이 차단 되었습니다. </h3>
            </div>
            <div class="hpanel" style="width:88%;margin: 0 auto;padding: 16px 0 16px 0;margin-top:0px;">
                <div class="panel-bodyT" style="border:none;">
			<div id="wait_value2"></div>
                   <div class="sub_text"style="letter-spacing: -0.04em;font-weight:600;font-size:1.0em;color:#1e1e1e;">현재 접속하신 아이피에서는<br> 접속이 불가능합니다.</div>
                </div>
            </div>
        </div>
	</div>
    </div>

	<div class="row" id="isNotUse" style="display:none">
	<div class="mobile-size" style="border: 4px solid #033074;width:100%;height:auto;overflow:hidden;">
        <div class="col-md-12" style="width:100%;background:#fff;">
		<div class="main_logo" style="position:absolute;right:2%;top:12px;"> <img src="/resource/tracer/logo2.png" style="width:90px;height:auto;margin-top: 10px;"> </div>
        	<div class="text-center" style="padding-top:20px;"></div>
            <div class="text-center m-b-md">
                <h3 style="font-weight:bold;font-size:22px;color:#033074;margin-top:5px;letter-spacing: -0.04em;text-align: center;">서비스 접속이 불가합니다. </h3>
            </div>
            <div class="hpanel" style="width:88%;margin: 0 auto;padding: 16px 0 16px 0;margin-top:0px;">
                <div class="panel-bodyT" style="border:none;">
			<div id="wait_value2"></div>
                   <div class="sub_text"style="letter-spacing: -0.04em;font-weight:600;font-size:1.0em;color:#1e1e1e;">접속량이 많아 접속이 불가능합니다.<br> 잠시 후 다시 접속해주세요</div>
                </div>
            </div>
        </div>
	</div>
    </div>


</div>
<div id="waitBackground"></div>
</body>
</html>
</div>
    <div class="wrap">
        

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>WELLCONN</title>
    <meta name="keywords" content="" />
    <meta name="viewport" content="initial-scale=1" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
    
    <link rel="stylesheet" href="/resource/css/reset.css" />
    <link rel="stylesheet" href="/resource/css/font.css" />
    <link rel="stylesheet" href="/resource/css/jquery.bxslider.css">
    <link rel="stylesheet" href="/resource/css/style.css" />
    <link rel="stylesheet" href="/resource/css/so.css" />
    <script type="text/javascript" src="/resource/js/jquery-3.5.1.js"></script>
    <script type="text/javascript" src="/resource/js/jquery.bxslider.js"></script>
    <script type="text/javascript" src="/resource/js/script.js"></script>
    <script type="text/javascript" src="/resource/tracer/tracerapi.js"></script>
<style>
/* article.top h3 {
    font-size: 28px;
    font-weight: bold;
    color: #223cb5;
    line-height: 1;
    background: url(../images/h4_bg.png) no-repeat left bottom;
    padding-bottom: 20px;
    margin-bottom: 10px;
}
article.top.center h3 {
    background-position: center top;
}
.function ul li .txt {
    padding: 30px 10px 20px;
} */
.sec01 .right span {
    font-family: 'Noto Sans KR';
}
#juyo_title{
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
    letter-spacing: -0.7px;
    color: #333 !important;
    background:none;
}
#juyo_contents{
    font-size: 15px;
    font-weight: 400;
    line-height: 22px;
    margin-bottom: 20px;
    color: #000000 !important;
    padding-left: 7px;
}
.sec01 .right strong {
    font-size: 2.5em;
}
.sec01 .right strong::before {
    height: 115px;
}
.sec04 .right ul li.circle01 span {
    background: #1E3CA0;
}
.sec04 .right ul li.circle02 span {
    background: #1275E0;
}
.sec04 .right ul li.circle03 span {
    background: #32CD32;
}
.sec05 .right {
    padding-left: 40px;
}
.index_news_cont {
    position: relative;
    /* margin: -36px -40px; */
}
.index_news_item {
    position: relative;
    z-index: 1;
    float: left;
    width: 25%;
    height: 200px;
    padding: 36px 40px 0;
    transition: background-color .3s ease-out;
}
.index_news_item a {
    display: block;
    height: 100%;
}
.index_news_item a {
    text-decoration: none;
    color: #0084e1;
    background-color: transparent;
}
.index_news_item.ele_notice .ele_tit {
    color: #4076c0;
}
.index_news_item:hover .ele_tit::after, .index_news_item:focus .ele_tit::after, .index_news_item:active .ele_tit::after {
    border-left-color: rgba(255,255,255,0.5);
}
.index_news_item.ele_notice .ele_tit::after {
    border-left-color: #4076c0;
}
.index_news_cont .ele_tit::after {
    transition: border-left-color .2s;
}
.index_tit::after, .index_news_cont .ele_tit::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    height: 12px;
    border-left: 2px solid #4076c0;
}
.index_news_cont .ele_tit {
    position: relative;
    height: 28px;
    padding-left: 12px;
    transition: color .2s;
}
.index_tit, .index_news_cont .ele_tit {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.2em;
}
.index_news_cont .ele_cont {
    height: 2.8em;
    margin-bottom: 20px;
    font: 19px/1.4em 'Noto', sans-serif;
    color: #142337;
    letter-spacing: -1px;
    word-break: keep-all;
    text-overflow: ellipsis;
    overflow: hidden;
    transition: color .2s;
}
.index_news_cont .ele_date {
    color: #969fab;
    transition: color .2s;
}
.index_news_item:hover .ele_tit,
.index_news_item:focus .ele_tit,
.index_news_item:active .ele_tit,
.index_news_item:hover .ele_date,
.index_news_item:focus .ele_date,
.index_news_item:active .ele_date {
  color: rgba(255,255,255,0.5)
}
.index_news_item:hover .ele_tit::after,
.index_news_item:focus .ele_tit::after,
.index_news_item:active .ele_tit::after  {
  border-left-color: rgba(255,255,255,0.5)
}
.index_news_item:hover .ele_cont,
.index_news_item:focus .ele_cont,
.index_news_item:active .ele_cont {
  color: #fff
}
.news_h2{
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0px 15px 20px 15px;
    position: relative;
}
.sec03 {
    padding: 140px 0px 18px;
}
/* .index_news_cont_bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 25%;
  height: 200px;
  opacity: 0;
  transition: opacity .2s, top .2s, left .2s, background-color .2s;
  background: #3067ff;
  animation: newsHover 10s 0s infinite linear;
} */
.index_news_item.ele_news:hover{
    background-color: #3067ff;
}
@media all and (max-width:1024px) {
	.sec03 {
	    padding: 330px 0px 18px;
	}
}
@media all and (max-width:960px) {
	.index_news_item {
	    display: block;
	    width: 50%;
	}
}
@media (max-width: 768px){
	.sec03 {
    	padding-top: 30px;
    }
}
@media all and (max-width:767px) {
	.index_news_item {
	    display: block;
	    width: 100%;
	}
}
footer {
	padding:0px;
    position: relative;
    background-color: #282d38;
    color: #fff;
    display: block;
    font-family: 'Montserrat', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
}
#tothetop {
    position: fixed;
    z-index: 999;
    bottom: 2rem;
    right: 2rem;
    cursor: pointer;
    text-align: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #3d4556;
}
#tothetop i {
    padding-top: 15px;
    font-size: 20px;
}
.fa, .fas {
    font-weight: 900;
}
.fa, .far, .fas {
    font-family: "Font Awesome 5 Free";
}
.fa, .fab, .fal, .far, .fas {
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
}
footer .top_footer {
    background-color: #1f232b;
    height: 40px;
}
footer .top_footer .inner_01 {
    position: relative;
}
.inner_01 {
    width: 1100px;
    margin: 0 auto;
}
footer .top_footer .inner_01 ul {
    display: inline-block;
    width: 100%;
}
ul, li {
    list-style: none;
}
footer .top_footer .inner_01 ul li:nth-child(1) {
    float: left;
    margin-top: 12px;
}
footer .top_footer .inner_01 ul li:nth-child(2) {
    float: right;
    text-align: right;
}
footer .top_footer .inner_01 ul li {
    width: 50%;
}
ul, li {
    list-style: none;
}
footer .top_footer .inner_01 ul li a, footer .top_footer .inner_01 ul li span {
    font-size: 14px;
    font-weight: 400;
    color: #8a909e;
}
footer .top_footer .inner_01 ul li a, footer .top_footer .inner_01 ul li span {
    font-size: 14px;
    font-weight: 400;
    color: #8a909e;
}
footer .top_footer .inner_01 ul li:nth-child(2) a {
    background-color: #252932;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    padding: 0 15px;
}
div#select_box {
    position: relative;
    width: 200px;
    height: 40px;
    background: url(../img/select_arrow.png) 170px center no-repeat;
    border: 1px solid #2e384b;
    background-color: #252c3b;
    float: right;
    margin-left: 5px;
    cursor: pointer;
}
div#select_box label {
    position: absolute;
    font-size: 14px;
    color: #fff;
    top: 13px;
    left: 12px;
    letter-spacing: 1px;
}
div#select_box select#color {
    width: 100%;
    height: 40px;
    cursor: pointer;
    min-height: 40px;
    line-height: 40px;
    padding: 0 10px;
    opacity: 0;
}
input, select {
    vertical-align: middle;
}
select {
    border: 1px solid #999;
    font-family: inherit;
    border-radius: 0px;
    appearance: none;
}
option {
    font-weight: normal;
    display: block;
    white-space: pre;
    min-height: 1.2em;
}
footer .footer {
    padding: 40px 0;
}
.inner_01 {
    width: 1100px;
    margin: 0 auto;
}
footer .footer .inner_01 > ul {
    display: inline-block;
    width: 100%;
    position: relative;
}
footer .footer .inner_01 > ul > li:nth-child(1) {
    width: 32%;
    margin: 0 3% 0 0;
}
footer .footer .inner_01 > ul > li {
    float: left;
}
footer .footer .inner_01 > ul > li:nth-child(1) .con_tit {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #4f596f;
}
footer .footer .inner_01 > ul > li:nth-child(1) .con_tit h2 {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
}
h1, h2, h3, h4, h5 {
    letter-spacing: -0.7px;
}
footer .footer .inner_01 > ul > li:nth-child(1) > ul {
    display: inline-block;
    width: 100%;
}
footer .footer .inner_01 > ul > li:nth-child(1) > ul > li {
    float: left;
    width: 48%;
    margin: 0 1%;
}
footer .footer .inner_01 > ul > li:nth-child(1) > ul > li p {
    font-size: 14px;
    font-weight: 200;
}
footer .footer .inner_01 > ul > li:nth-child(1) > ul > li h3 {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    margin: 10px 0 3px;
    letter-spacing: 0;
}
footer .footer .inner_01 > ul > li:nth-child(1) > ul > li p {
    font-size: 14px;
    font-weight: 200;
}
p {
    line-height: 22px;
    word-break: keep-all;
}
footer .footer .inner_01 > ul > li:nth-child(2) {
    width: 63%;
    margin: 0 2% 0 0;
}
footer .footer .inner_01 > ul > li {
    float: left;
}
footer .footer .inner_01 > ul > li:nth-child(2) h3 {
    color: #8a93a8;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
}
footer .footer .inner_01 > ul > li:nth-child(2) p {
    font-size: 12px;
    color: #8a93a8;
    font-weight: 200;
}
footer .footer .inner_01 > ul > li:nth-child(2) p:last-child {
    margin-top: 21px;
}
@media (max-width: 1200px){
	.main_section03__list > ul {
	    display: flex;
	    flex-direction: column;
	    flex-wrap: wrap;
	    align-content: center;
	    justify-content: flex-start;
	}
	.main_section03__list > ul > li {
    	width: 100%;
    }
    .main_section03__list > ul > li:nth-child(2) {
	    padding-top: 50px;
	}
	.board-wrap--fc {
	 	margin-top:0 !important;
	 }
	 .basic-board-list--fc td, .webzine-board-list--fc td:nth-child(2) {
	    width: 100%;
    }
    .basic-board-list--fc tbody td.board-subject--fc a, .webzine-board-list--fc tbody td.board-subject--fc a {
	    width: 100%;
	    overflow: hidden;
    }
}
@media (max-width: 1024px){
	footer .top_footer .inner_01 ul li:nth-child(1) {
	    display: none;
	}
	footer .top_footer .inner_01 {
	    width: 100%;
	    padding: 0 20px;
	}
	.inner_01 {
	    width: 100%;
	    padding: 0 20px;
	}
	footer .footer .inner_01 > ul > li:nth-child(2) {
	    width: 53%;
	    margin: 0 2% 0 0;
	}
}
@media (max-width: 768px){
	.sec01 .right strong::before {
	    height: 70px;
	}
	footer .footer .inner_01 > ul > li:nth-child(2) {
	    width: 63%;
	}
	footer .footer .inner_01 > ul > li:nth-child(1) > ul > li {
	    width: 100%;
	}
	footer .top_footer .inner_01 ul li {
	    width: 80%;
	}
}
@media (max-width: 560px){
	.main_section03__list__inner .main_board__list .basic-board-list--fc tr {
	    display: flex;
	    flex-direction: column;
	    flex-wrap: nowrap;
	    justify-content: flex-start;
	    align-items: flex-start;
	}
}
@media (max-width: 480px){
	.sec01 .right strong {
	    font-size: 1.5em;
	}
	footer .top_footer {
	    height: auto;
	    padding-bottom: 5px;
	}
	footer .top_footer .inner_01 ul li:nth-child(1) {
    	float: none;
    	width: 100%;
    	margin-bottom: 10px;
	}
	footer .top_footer .inner_01 ul li:nth-child(2) {
	    float: none;
	    width: 100%;
	    text-align: left;
	}
	footer .top_footer .inner_01 ul li:nth-child(2) a {
	    width: 23%;
	    margin: 0 1%;
	    float: left;
	    padding: 0;
	    text-align: center;
	}
	footer .footer .inner_01 > ul > li:nth-child(1) {
	    width: 98%;
	    margin: 0 1% 20px;
	}
	footer .footer .inner_01 > ul > li:nth-child(2) {
	    width: 98%;
	    margin: 0 1%;
	}
	footer .top_footer .inner_01 ul li:nth-child(1) {
		display: none;
	}
	footer .footer .inner_01 > ul > li:nth-child(1) > ul > li {
	    width: 100%;
	}
}
@media (max-width: 375px){
	footer .top_footer .inner_01 ul li:nth-child(2) a {
	    width: 22.5%;
	    display: table;
	}
	footer .top_footer .inner_01 ul li a span {
	    /* display: none; */
	}
	p {
    	line-height: 18px;
	}
	footer .footer .inner_01 > ul > li:nth-child(1) > ul > li h3 {
	    font-size: 1.2em;
	}
}
header .gnb .sub_menu_wrap .sub_menu > li:hover {
    background: url(../images/bar.png) no-repeat left top #e0eefd;
}
header .gnb .sub_menu_wrap .sub_menu > li {
    min-width: 180px;
    margin: 0;
    text-align: center;
    border-left: 1px solid #E5EAF0;
}
header .gnb .sub_menu_wrap .sub_menu > li:last-child {
    border-right: 1px solid #E5EAF0;
}
#waitPage{
                                position:fixed;
                                width:100%;
                                height:100%;
                                z-index:999999;
}
</style>
<script>
                        function showRealPage() {
                                $("#waitPage").css("display","none");
                        }

                        function showWaitPage(type) {
                                $("#waitPage").css("display","block");
                                $("#isWaitPage").css("display","none");
                                $("#isRejectPage").css("display","none");
                                $("isNotUse").css("display","none");

                                if ( type == 'W' ) {
                                        $("#isWaitPage").css("display","block");
                                } else if ( type == 'NE' ) {
                                        $("#isNotUse").css("display","block");
                                } else if ( type == 'R' ) {
                                        $("#isRejectPage").css("display","block");
                                }
                        }

                        function checkInAPI(pageUrl) {
                                var host="www.wellconn.co.kr";
                                var port="80";
                                var ip = "121.136.244.39";
                                var loginId = "121.136.244.39";

                                callTracerApiInput(host, ip, loginId, port, pageUrl, this);
                        }

                        function checkOutAPI(pageUrl) {
                                var host="www.wellconn.co.kr";
                                var port="80";
                                var ip = "121.136.244.39";
                                var loginId = "121.136.244.39";

                                callTracerApiOutput(host, ip, loginId, port, pageUrl, this);
                        }

                        function callBackTracer() {

                        }
                </script>
</head>
<body>
	<header>
            <div class="container">
                <h1><a href="start.do"><img src="/resource/images/logo.png" alt="주식회사 웰컨"></a></h1>
                <div class="btn_menu">
                    <button class="navTrigger">
                        <i></i>
                        <i></i>
                        <i></i>
                    </button>
                </div>
                <nav class="gnb"> <!-- pc 사이즈 메뉴 -->
                    <ul class="menu">
                        <li><a href="actiontracking.do">Technology</a></li>
                        <li><a href="productTracer.do">Solution</a></li>
                        <li><a href="casestudy.do">Case Study</a></li>
                        <li><a href="support.do">Support</a></li>
                    </ul>
                    <div class="sub_menu_wrap">
                        <div class="container">
                            <ul class="sub_menu">
                                <li>
                                    <ul class="sub">
		                                <li><a href="actiontracking.do">사용자 행위 추적</a></li>
		                                <li><a href="servicesafety.do">대량접속제어</a></li>
		                                <li><a href="macrodetect.do">실사용자 산정</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <ul class="sub">
		                                <li><a href="productTracer.do">TRACER v2.0</a></li>
                                    </ul>
                                </li>
                                <li></li>
                                <li>
                                    <ul class="sub">
		                                <li><a href="support.do">문의하기</a></li>
		                                <!-- <li><a href="wellconnNews.do">뉴스</a></li> -->
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <nav class="lnb">  <!-- 모바일 사이즈 메뉴 -->
                    <ul class="dep01">
                        <li>
                            <a href="actiontracking.do">Technology</a>
                            <ul class="dep02">
                                <li><a href="actiontracking.do">사용자 행위 추적</a></li>
                                <li><a href="servicesafety.do">대량접속제어</a></li>
                                <li><a href="macrodetect.do">매크로 탐지</a></li>
                            </ul>
                        </li>
                        <li>
                        	<a href="productTracer.do">Solution</a>
                        	<ul class="dep02">
	                            <li><a href="productTracer.do">TRACER v2.0</a></li>
	                        </ul>  	
                        </li>
                        <li><a href="casestudy.do">Case Study</a></li>
                        <li>
                            <a href="support.do">Support</a>
                            <ul class="dep02">
                                <li><a href="support.do">문의하기</a></li>
                                <!-- <li><a href="wellconnNews.do">뉴스</a></li> -->
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>

        </header>
</body>
</html>
		
		
<script>
function popup(){
    var url = "./popup.jsp";
    var name = "본사사무실 이전";
    var option = "width = 740, height = 990, top = 100, left = 200, location = no"
    window.open(url, name, option);
}
$( document ).ready(function() {
	checkInAPI("index");
	//$('#myModal').show();
	//popup();
});

var chkclick = 0;

function chkCnt() {
	console.log("chkclick = "+chkclick);
	if(chkclick >= 2) {
		$('#myModal').hide();
	}
}

function close_pop() {
	$('.md1').css('display','none');
	chkclick+=1;
	//chkCnt();
	$('#myModal').hide();s
}

function close_pop2() {
	$('.md2').css('display','none');
	chkclick+=1;
	//chkCnt();
}

</script>	
        <section>
            <div class="sec01">  <!-- MAIN VISUAL --><!--  style="background-color:#44546A;" -->
            <div class="slideshow-container slideset3">
            
            	
            
                <div class="container mySlides fade">
					<div class="left">
						<div class="main_slider">
							<div><img src="/resource/images/main_slider01.png" alt="" style="width:100%; padding-bottom:60px;"></div>
							
						</div>
					</div>
					<div class="right">
						<strong>대량접속제어를 위한 최선의 선택 TRACER</strong>
						<span>중단없는 안정적인 서비스를 경험해 보세요.</span>
					</div>
          		</div>
          		</div>
          		
          		<!-- <script type="text/javascript">
	          		var slideIndex = 0;
	          		showSlides();
	
	          		function showSlides() {
	          			var i;
	          			var slides = document.getElementsByClassName("mySlides");
	          			var slidesBack = document.getElementsByClassName("sec01");
	          			
	          			for(i = 0; i < slides.length; i++) {
	          				slides[i].style.display = "none";
	          				
	          			}
	          			slideIndex++;
	          			
	          			if(slideIndex > slides.length) {
	          				slideIndex = 1
	          			}

          				if(slideIndex===1) {
    	          			$('.sec01').css('background-color','#fff8f0');
          				}
          				if(slideIndex===2) {
	          				$('.sec01').css('background-color','#1b3a4d');
          				}
	          			slides[slideIndex-1].style.display = "block";
	          			setTimeout(showSlides, 5000);
	          		}
	          		
	          		/* //상태
	          		let index = 1;
	          		let isMoved = true;
	          		const speed = 3000;
	          		
	          		// 속도
	          		const transform = "transform " + speed / 1000 + "s";
	          		
	          		// 방향
	          		let translate */
          		</script> -->
          		
            </div>
            <div class="sec02">  <!-- WHAT WE DO -->
                <div class="container">
					<ul class="whatwedo">
						<li class="first_do"><p>우리의<br>기술력</p></li>
						<li class="wwd"><a href="actiontracking.do"><b>사용자 행위 추적</b><p>웹 접속자 행위 분석부터<br> 새로운 인사이트 발굴</p><br><span style="color:#a2a2a2;">more</span>&nbsp;&nbsp;<img src="/resource/images/moreicon.svg" width="15px" height="15px"></a></li>
						<li class="wwd"><a href="servicesafety.do"><b>대량 접속 제어</b><p>대량접속 발생 시<br> 서비스 안정성 확보</p><br><span style="color:#a2a2a2;">more</span>&nbsp;&nbsp;<img src="/resource/images/moreicon.svg" width="15px" height="15px"></a></li>
						<li class="wwd"><a href="macrodetect.do"><b>매크로 탐지</b><p>접속자의 사람, Bots, Macro <br>구분을 통한 선제적 방어</p><br><span style="color:#a2a2a2;">more</span>&nbsp;&nbsp;<img src="/resource/images/moreicon.svg" width="15px" height="15px"></a></li>
					</ul>
                </div>
            </div>
            <div class="sec03"><!-- NEWS -->
                
            </div>
            <div class="sec04 gray">  <!-- Apply First, Then Safe -->
                <div class="container">
					<div class="left">
						<h2>검증된 대량접속제어 기술<span>WELLCONN</span></h2>
						<b>先 적용 後 안정성 확보</b>
						<p>1세대 웹 서비스의 안정성 확보를 위한 모니터링은 성능관리 <br> 및 인프라 확충에 의존하고 있습니다. <br><br>다양한 인터넷 대량 접속이 발생할 수 있는 환경으로 변화되고<br>
						이를 해결하기 위한 새로운 방안이 필요합니다.</p>
					</div>
					<div class="right">
						<ul>
							<li class="circle01">
								<span>95+</span>
								<b>TRACER</b>
								<p>적용된 기관 수</p>
							</li>
							<li class="circle02">
								<span>180+</span>
								<b>TRACER</b>
								<p>적용된 도메인 수</p>
							</li>
							<li class="circle03">
								<span>153+</span>
								<b>TRACER</b>
								<p>적용된 웹서버 수</p>
							</li>
						</ul>
					</div>
            	</div>
            </div>
            <article class="mid tracer white">
                <div class="container">
                    <div class="left sa sa-right">
                        <div class="img">
                            <img src="/resource/images/sub_img05.png" alt="">
                        </div>
                    </div>
                    <div class="right sa sa-left">
                        <h3>대량접속제어 TRACER v2.0</h3>
                        <span class="sub_tit">대량접속 발생 시 원활한 서비스 운영</span>
                        <p>웹 사이트 운영자 관점에서, 특정 상황에서 예상치 못한<br> 대량접속의 불안감을 해소해주는 강력한 솔루션</p>
                        <ul class="mark_ul">
                            <li><img src="/resource/images/mark01.png" alt=""></li>
                            <li><img src="/resource/images/mark02.png" alt=""></li>
                        </ul>
                        <div class="btn_group">
                            <a href="https://blog.naver.com/wellconn/221746729483" class="btn btn_gray">조달청</a>
                            <a href="support.do" class="btn btn_blue">서비스 문의하기</a>
                        </div>
                        <a class="btn_point" href="productTracer.do"><i></i><span class="txt">제품보기</span><span class="ico_arrow"></span></a>
                    </div>
                </div>
			</article>
			
			
			<div class="main_section section03 gray">
  <div class="inner">
    <div class="main_section03__list common_effect">
      <ul>
        <li class="ce_item" style="bottom: 0px; visibility: inherit; opacity: 1; position: relative;">
          <div class="main_section03__list__inner">
            <p>
              NEWS
              <a class="plus__btn" href="wellconnNews.do"></a>
            </p>

            <div class="main_board__list">
              	<!-- board-wrap -->
				<section class="board-wrap--fc" style="margin-top:40px;">
    				<!-- basic-board-list -->
				    <table class="basic-board-list--fc">
				    
        				<tbody>
  							<tr>
  								<td class="board-category--fc">
  									<span class="category_name">News</span>
  								</td>
  								<td class="board-subject--fc">
  								
  									
						        	
						        		<a style="float:left;pointer-events:none;cursor:default;">국민연금공단 TRACER 납품 수주</a>
						        	
						      	
  								</td>
                        		<td class="board-date--fc">
                        			2023-07-27
                        		</td>
                    		</tr>
					
        				<tbody>
  							<tr>
  								<td class="board-category--fc">
  									<span class="category_name">News</span>
  								</td>
  								<td class="board-subject--fc">
  								
  									
						        	
						        		<a style="float:left;pointer-events:none;cursor:default;">한국데이터산업진흥원 TRACER 납품 수주</a>
						        	
						      	
  								</td>
                        		<td class="board-date--fc">
                        			2023-03-22
                        		</td>
                    		</tr>
					
        				<tbody>
  							<tr>
  								<td class="board-category--fc">
  									<span class="category_name">News</span>
  								</td>
  								<td class="board-subject--fc">
  								
  									
						        	
						        		<a style="float:left;pointer-events:none;cursor:default;">부천문화재단 TRACER 납품 수주</a>
						        	
						      	
  								</td>
                        		<td class="board-date--fc">
                        			2023-03-20
                        		</td>
                    		</tr>
					
        				<tbody>
  							<tr>
  								<td class="board-category--fc">
  									<span class="category_name">News</span>
  								</td>
  								<td class="board-subject--fc">
  								
  									
						        	
						        		<a style="float:left;pointer-events:none;cursor:default;">대한지방행정공제회 TRACER 납품 수주</a>
						        	
						      	
  								</td>
                        		<td class="board-date--fc">
                        			2023-03-15
                        		</td>
                    		</tr>
					
        				<tbody>
  							<tr>
  								<td class="board-category--fc">
  									<span class="category_name">News</span>
  								</td>
  								<td class="board-subject--fc">
  								
  									
						        	
						        		<a style="float:left;pointer-events:none;cursor:default;">진주시청 TRACER 납품 수주</a>
						        	
						      	
  								</td>
                        		<td class="board-date--fc">
                        			2023-03-10
                        		</td>
                    		</tr>
					
			    	</table>
				</section>
            </div>
          </div>
        </li>
        <li class="ce_item" style="bottom: 0px; visibility: inherit; opacity: 1; position: relative;">
          <div class="main_section03__list__inner">
            <p>
              LOCATION
            </p>
            <address>경기도 화성시 동탄첨단산업1로 27 금강펜테리움IX타워 A동 614호</address>
            <div id="map" class="location" style="width:100%;height:280px;"></div>					
						<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=0b80a64fed3be3f60d5fa5166b3872c1&libraries=clusterer"></script>
						<script>
							var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
						    mapOption = { 
								center: new kakao.maps.LatLng(37.21042890132769, 127.08918131729577), // 지도의 중심좌표
						        //center: new kakao.maps.LatLng(37.21016018191226, 127.0896877808495), // 지도의 중심좌표
						        level: 4 // 지도의 확대 레벨
						    };
	
							var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
		
							// 마커가 표시될 위치입니다 
							//var markerPosition  = new kakao.maps.LatLng(37.291515151090756, 127.06665673305716); 
							var markerPosition  = new kakao.maps.LatLng(37.21042890132769, 127.08918131729577); 
		
							// 마커를 생성합니다
							var marker = new kakao.maps.Marker({
							    position: markerPosition
							});
		
							// 마커가 지도 위에 표시되도록 설정합니다
							marker.setMap(map);
		
							// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
							// marker.setMap(null);    
						</script>
          </div>
        </li>   
      </ul>
    </div>
  </div>
</div>
            <!-- <div class="sec05">  LOCATION
                <div class="container">
					<h2>LOCATION <span>WELLCONN</span></h2>
					<div class="left">
						<div id="map" class="location" style="width:100%;height:280px;"></div>						
						
					</div>
					<div class="right">
						<address>경기도 수원시 영통구 광교중앙로 248번지 7-2 원희캐슬 광교 D동 313호</address>
						<dl>
							<dt>Tel</dt>
							<dd>031-8009-0908</dd>
							<dt>Fax</dt>
							<dd>031-8009-0901</dd>
							<dt>제품문의</dt>
							<dd>jhs@wellconn.co.kr</dd>
						</dl>
					</div>
          		</div>
            </div> -->
        </section>
        

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>WELLCONN</title>
    <meta name="keywords" content="" />
    <meta name="viewport" content="initial-scale=1" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
<style>
.sec01 .right strong {
    font-size: 2.5em;
}
.sec01 .right strong::before {
    height: 115px;
}
.sec04 .right ul li.circle01 span {
    background: #1E3CA0;
}
.sec04 .right ul li.circle02 span {
    background: #1275E0;
}
.sec04 .right ul li.circle03 span {
    background: #32CD32;
}
.sec05 .right {
    padding-left: 40px;
}
.index_news_cont {
    position: relative;
    /* margin: -36px -40px; */
}
.index_news_item {
    position: relative;
    z-index: 1;
    float: left;
    width: 25%;
    height: 200px;
    padding: 36px 40px 0;
    transition: background-color .3s ease-out;
}
.index_news_item a {
    display: block;
    height: 100%;
}
.index_news_item a {
    text-decoration: none;
    color: #0084e1;
    background-color: transparent;
}
.index_news_item.ele_notice .ele_tit {
    color: #4076c0;
}
.index_news_item:hover .ele_tit::after, .index_news_item:focus .ele_tit::after, .index_news_item:active .ele_tit::after {
    border-left-color: rgba(255,255,255,0.5);
}
.index_news_item.ele_notice .ele_tit::after {
    border-left-color: #4076c0;
}
.index_news_cont .ele_tit::after {
    transition: border-left-color .2s;
}
.index_tit::after, .index_news_cont .ele_tit::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    height: 12px;
    border-left: 2px solid #4076c0;
}
.index_news_cont .ele_tit {
    position: relative;
    height: 28px;
    padding-left: 12px;
    transition: color .2s;
}
.index_tit, .index_news_cont .ele_tit {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.2em;
}
.index_news_cont .ele_cont {
    height: 2.8em;
    margin-bottom: 20px;
    font: 19px/1.4em 'Noto', sans-serif;
    color: #142337;
    letter-spacing: -1px;
    word-break: keep-all;
    text-overflow: ellipsis;
    overflow: hidden;
    transition: color .2s;
}
.index_news_cont .ele_date {
    color: #969fab;
    transition: color .2s;
}
.index_news_item:hover .ele_tit,
.index_news_item:focus .ele_tit,
.index_news_item:active .ele_tit,
.index_news_item:hover .ele_date,
.index_news_item:focus .ele_date,
.index_news_item:active .ele_date {
  color: rgba(255,255,255,0.5)
}
.index_news_item:hover .ele_tit::after,
.index_news_item:focus .ele_tit::after,
.index_news_item:active .ele_tit::after  {
  border-left-color: rgba(255,255,255,0.5)
}
.index_news_item:hover .ele_cont,
.index_news_item:focus .ele_cont,
.index_news_item:active .ele_cont {
  color: #fff
}
.news_h2{
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0px 15px 20px 15px;
    position: relative;
}
.sec03 {
    padding: 140px 0px 18px;
}
/* .index_news_cont_bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 25%;
  height: 200px;
  opacity: 0;
  transition: opacity .2s, top .2s, left .2s, background-color .2s;
  background: #3067ff;
  animation: newsHover 10s 0s infinite linear;
} */
.index_news_item.ele_news:hover{
    background-color: #3067ff;
}
@media all and (max-width:1024px) {
	.sec03 {
	    padding: 330px 0px 18px;
	}
}
@media all and (max-width:960px) {
	.index_news_item {
	    display: block;
	    width: 50%;
	}
}
@media (max-width: 768px){
	.sec03 {
    	padding-top: 30px;
    }
}
@media all and (max-width:767px) {
	.index_news_item {
	    display: block;
	    width: 100%;
	}
}
footer {
	padding:0px;
    position: relative;
    background-color: #282d38;
    color: #fff;
    display: block;
    font-family: 'Montserrat', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
}
#tothetop {
    position: fixed;
    z-index: 999;
    bottom: 2rem;
    right: 2rem;
    cursor: pointer;
    text-align: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #3d4556;
}
#tothetop i {
    padding-top: 15px;
    font-size: 20px;
}
.fa, .fas {
    font-weight: 900;
}
.fa, .far, .fas {
    font-family: "Font Awesome 5 Free";
}
.fa, .fab, .fal, .far, .fas {
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
}
footer .top_footer {
    background-color: #1f232b;
    height: 40px;
}
footer .top_footer .inner_01 {
    position: relative;
}
.inner_01 {
    width: 1100px;
    margin: 0 auto;
}
footer .top_footer .inner_01 ul {
    display: inline-block;
    width: 100%;
}
ul, li {
    list-style: none;
}
footer .top_footer .inner_01 ul li:nth-child(1) {
    float: left;
    margin-top: 12px;
}
footer .top_footer .inner_01 ul li:nth-child(2) {
    float: right;
    text-align: right;
}
footer .top_footer .inner_01 ul li {
    width: 50%;
}
ul, li {
    list-style: none;
}
footer .top_footer .inner_01 ul li a, footer .top_footer .inner_01 ul li span {
    font-size: 14px;
    font-weight: 400;
    color: #8a909e;
}
footer .top_footer .inner_01 ul li a, footer .top_footer .inner_01 ul li span {
    font-size: 14px;
    font-weight: 400;
    color: #8a909e;
}
footer .top_footer .inner_01 ul li:nth-child(2) a {
    background-color: #252932;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    padding: 0 15px;
}
div#select_box {
    position: relative;
    width: 200px;
    height: 40px;
    background: url(../img/select_arrow.png) 170px center no-repeat;
    border: 1px solid #2e384b;
    background-color: #252c3b;
    float: right;
    margin-left: 5px;
    cursor: pointer;
}
div#select_box label {
    position: absolute;
    font-size: 14px;
    color: #fff;
    top: 13px;
    left: 12px;
    letter-spacing: 1px;
}
div#select_box select#color {
    width: 100%;
    height: 40px;
    cursor: pointer;
    min-height: 40px;
    line-height: 40px;
    padding: 0 10px;
    opacity: 0;
}
input, select {
    vertical-align: middle;
}
select {
    border: 1px solid #999;
    font-family: inherit;
    border-radius: 0px;
    appearance: none;
}
option {
    font-weight: normal;
    display: block;
    white-space: pre;
    min-height: 1.2em;
}
footer .footer {
    padding: 40px 0;
}
.inner_01 {
    width: 1100px;
    margin: 0 auto;
}
footer .footer .inner_01 > ul {
    display: inline-block;
    width: 100%;
    position: relative;
}
footer .footer .inner_01 > ul > li:nth-child(1) {
    width: 32%;
    margin: 0 3% 0 0;
}
footer .footer .inner_01 > ul > li {
    float: left;
}
footer .footer .inner_01 > ul > li:nth-child(1) .con_tit {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #4f596f;
}
footer .footer .inner_01 > ul > li:nth-child(1) .con_tit h2 {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
}
h1, h2, h3, h4, h5 {
    letter-spacing: -0.7px;
}
footer .footer .inner_01 > ul > li:nth-child(1) > ul {
    display: inline-block;
    width: 100%;
}
footer .footer .inner_01 > ul > li:nth-child(1) > ul > li {
    float: left;
    width: 48%;
    margin: 0 1%;
}
footer .footer .inner_01 > ul > li:nth-child(1) > ul > li p {
    font-size: 14px;
    font-weight: 200;
}
footer .footer .inner_01 > ul > li:nth-child(1) > ul > li h3 {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    margin: 10px 0 3px;
    letter-spacing: 0;
}
footer .footer .inner_01 > ul > li:nth-child(1) > ul > li p {
    font-size: 14px;
    font-weight: 200;
}
p {
    line-height: 22px;
    word-break: keep-all;
}
footer .footer .inner_01 > ul > li:nth-child(2) {
    width: 63%;
    margin: 0 2% 0 0;
}
footer .footer .inner_01 > ul > li {
    float: left;
}
footer .footer .inner_01 > ul > li:nth-child(2) h3 {
    color: #8a93a8;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
}
footer .footer .inner_01 > ul > li:nth-child(2) p {
    font-size: 12px;
    color: #8a93a8;
    font-weight: 200;
}
footer .footer .inner_01 > ul > li:nth-child(2) p:last-child {
    margin-top: 21px;
}
@media (max-width: 1024px){
	footer .top_footer .inner_01 ul li:nth-child(1) {
	    display: none;
	}
	footer .top_footer .inner_01 {
	    width: 100%;
	    padding: 0 20px;
	}
	.inner_01 {
	    width: 100%;
	    padding: 0 20px;
	}
	footer .footer .inner_01 > ul > li:nth-child(2) {
	    width: 53%;
	    margin: 0 2% 0 0;
	}
}
@media (max-width: 768px){
	.sec01 .right strong::before {
	    height: 70px;
	}
	footer .footer .inner_01 > ul > li:nth-child(2) {
	    width: 63%;
	}
	footer .footer .inner_01 > ul > li:nth-child(1) > ul > li {
	    width: 100%;
	}
	footer .top_footer .inner_01 ul li {
	    width: 80%;
	}
}
@media (max-width: 480px){
	.sec01 .right strong {
	    font-size: 1.5em;
	}
	footer .top_footer {
	    height: auto;
	    padding-bottom: 5px;
	}
	footer .top_footer .inner_01 ul li:nth-child(1) {
    	float: none;
    	width: 100%;
    	margin-bottom: 10px;
	}
	footer .top_footer .inner_01 ul li:nth-child(2) {
	    float: none;
	    width: 100%;
	    text-align: left;
	}
	footer .top_footer .inner_01 ul li:nth-child(2) a {
	    width: 28%;
	    margin: 0 1%;
	    float: left;
	    padding: 0;
	    text-align: center;
	}
	footer .footer .inner_01 > ul > li:nth-child(1) {
	    width: 98%;
	    margin: 0 1% 20px;
	}
	footer .footer .inner_01 > ul > li:nth-child(2) {
	    width: 98%;
	    margin: 0 1%;
	}
	footer .top_footer .inner_01 ul li:nth-child(1) {
		display: none;
	}
	footer .footer .inner_01 > ul > li:nth-child(1) > ul > li {
	    width: 100%;
	}
}
@media (max-width: 375px){
	footer .top_footer .inner_01 ul li:nth-child(2) a {
	    width: 22.5%;
	    display: table;
	}
	footer .top_footer .inner_01 ul li a span {
	    /* display: none; */
	}
	p {
    	line-height: 18px;
	}
	footer .footer .inner_01 > ul > li:nth-child(1) > ul > li h3 {
	    font-size: 1.2em;
	}
}
</style>
</head>
<body>
<footer>
 <a href="#" id="tothetop" style=""><img src="/resource/images/top-alignment.svg" style="width:60%;margin-top:12px;"></a>
  <div class="top_footer">
    <div class="inner_01">
      <ul>
        <li>
        </li>
        <li>
          <a href="support.do"><span>상담문의</span></a>
          <a href="https://blog.naver.com/wellconn" target="_blank"><span>블로그</span></a>
          <a href="#"><span>채용공고</span></a>
          <a href="https://blog.naver.com/wellconn/221746729483" target="_blank"><span>조달청</span></a>
        </li>
      </ul>
    </div>
  </div>
  <div class="footer">
    <div class="inner_01">
      <ul>
        <li>
          <div class="con_tit">
            <h2>Contact US</h2>
          </div>
          <ul>
            <li>
              <p>서비스 상담 및 기술지원</p>
              <h3>031. 8009. 0908</h3>
              <p>jhs@wellconn.co.kr</p>
            </li>
          </ul>
        </li>
        <li>
          
          <h3>WELLCONN</h3>
          <p>
            ㈜웰컨<!--   |  사업자등록번호 :  --><br>
            본사 : 경기도 화성시 동탄첨단산업1로 27 금강펜테리움IX타워 A동 614호<br>
      Fax: 031-8009-0901<br>
          </p>
          <p>Copyright WELLCONN, All Rights Reserved.</p>
        </li>
      </ul>
    </div>
  </div>
</footer>
</body>
</html>	
    </div>
	
	<!-- <div id="myModal" class="modal" style="text-align: center;">
	
	Modal content
      <div class="modal-content md2" style="float: left; margin-left: 10px; position: absolute;">
                <div><img src="/resource/images/2023설연휴안내.PNG" style="width:100%"></div>
            <div style="width: 100%;height: 47.6px;">
            	<div style="cursor:pointer;background-color:#1b3a4d;text-align: center;padding-bottom: 6px;padding-top: 6px;margin-top: 10px;width: 80px; float: right;" onClick="close_pop2();">
                	<span class="pop_bt" style="font-size: 13pt;color: white;" >
                     	닫기
                	</span>
            	</div>
            </div>
      </div>
 
      Modal content
      <div class="modal-content md1" style="">
                <div><img src="/resource/images/2023년설날홈페이지인사.png" style="width:100%"></div>
            <div style="width: 100%;height: 47.6px;">
            	<div style="cursor:pointer;background-color:#1b3a4d;text-align: center;padding-bottom: 6px;padding-top: 6px;margin-top: 10px;width: 80px;float: right;" onClick="close_pop();">
                	<span class="pop_bt" style="font-size: 13pt;color: white;" >
                     	닫기
                	</span>
            	</div>
            </div>
      </div>
 
    </div> -->
    
    <script type="text/javascript">
    	showModal();
    	
    	function showModal() {
    		$('#myModal').show();
    		$('#myModal2').show();
    	}
    </script>
</body>
</html>