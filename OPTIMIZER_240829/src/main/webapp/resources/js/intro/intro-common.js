
const userData = selectUserBySn(user.lgn_sn);
user.step = userData.step;
user.step_sub = userData.step_sub;
console.log("user", user);

const step = urlParams.get("step");
const step_sub = urlParams.get("step_sub");

$(function(){
	if(urlParams.get("step") == null){
		setStep({step : 3, step_sub : 1});
	}
	if(user.step == 0 || user.step_sub == 0){
		setStep({step : 1, step_sub : 1});
	}else{
		if(user.step != step || user.step_sub != step_sub ){
			location.href=`/intro?step=${user.step}&step_sub=${user.step_sub}`;
		}
	}
	
	$(".intro-tab li").each(function(){
		const itemStep = parseInt($(this).attr("data-step"));
		$(this).click(function(){ // click 이벤트
			setStep({step : itemStep, step_sub : 1});
		});
		
		if(itemStep < step){ // 지난 단계
			$(this).addClass("done");
			$(this).find("span").html(`<ion-icon name="checkmark-outline"></ion-icon>`);
		}else if(itemStep == step){ // 현재 단계
			$(this).addClass("active");
		}else if(itemStep > step){ // 앞에 단계
			
		}
	});
	
	
});

function setStep(param){
	updateUserStep({lgn_sn : user.lgn_sn, step : param.step, step_sub : param.step_sub});
	if(param.step < 4){
		location.href=`/intro?step=${param.step}&step_sub=${param.step_sub}`;		
	}else{
		location.href=`/`;
	}
}