package com.wellconn.optimizer.interceptor;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.wellconn.optimizer.model.InspLogVO;
import com.wellconn.optimizer.model.OptimizerMenuVO;
import com.wellconn.optimizer.model.UserVO;
import com.wellconn.optimizer.service.InspLogService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SessionInterceptor implements HandlerInterceptor {
	
	private final InspLogService inspLogService;
	// public static String[] excludes = {"/selectViewLogAll", "/tabulatorUpdateInterval"};
	public static String[] excludes = {};
	public static Map<Integer, List<OptimizerMenuVO> > MENU = null;
	
	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
	   
	    String requestURL = request.getRequestURL().toString();
	    boolean skip = false;
        for (String path : excludes) {
            if (requestURL.contains(path)) {
                skip = true;
                break;
            }
        } 
        
        
    	///////////////////////////////////////////
		// @autor : doil
        
        // reset-menu를 호출한 경우, MENU 초기화
        if(requestURL.contains("reset-menu")) MENU = null;
        
        // menu init
        if(MENU == null) {
        	MENU = inspLogService.menuInit();
        	// 메뉴 초기화 시 세션메뉴 동기화
        	request.getSession().setAttribute("menuMAP", MENU);
        }
        
        // session menu chk
        Map<Integer, List<OptimizerMenuVO> > _menuChk = (Map<Integer, List<OptimizerMenuVO>>) request.getSession().getAttribute("menuMAP"); 
        if(_menuChk == null) {
        	request.getSession().setAttribute("menuMAP", MENU);
        }
        
        //dashboardSpeed
        
        String requestURI = request.getRequestURI();
        String contextPath = request.getContextPath();

        String viewName = requestURI.substring(contextPath.length());
        viewName = viewName.replace("/", "");
        
        final String _viewName = viewName;
        
        List<OptimizerMenuVO> findMenu = null;
        
        if(_viewName.equals("")) {
        	request.getSession().removeAttribute("current_menu_1");
        	request.getSession().removeAttribute("current_menu_2");
        }
        
     
        
        
        List<OptimizerMenuVO> _2stage = MENU.get(2);
        findMenu = _2stage.stream().filter(i -> {
        	String menu_url = i.getMenu_addr_url();
        	return _viewName.equals(menu_url);
        }).collect(Collectors.toList());
        
        if(findMenu!=null && findMenu.size()>0) {
        	OptimizerMenuVO menu = findMenu.get(0);
        	
        	Integer menu_sn = menu.getMenu_sn();
        	Integer parent_menu_sn = menu.getParent_menu_sn();
        	request.getSession().setAttribute("current_menu_1", parent_menu_sn);
        	request.getSession().setAttribute("current_menu_2", menu_sn);
        }
        
        // current page 찾기
        List<OptimizerMenuVO> _1stage = MENU.get(1);
        findMenu = _1stage.stream().filter(i -> {
        	String menu_url = i.getMenu_addr_url();
        	return _viewName.equals(menu_url);
        }).collect(Collectors.toList());
        
        if(findMenu!=null && findMenu.size()>0) {
        	OptimizerMenuVO menu = findMenu.get(0);
        	
        	Integer menu_sn = menu.getMenu_sn();
        	request.getSession().setAttribute("current_menu_1", menu_sn);
        	request.getSession().removeAttribute("current_menu_2");
        }
        	
        
        
        
        ///////////////////////////////////////////END
        
        
        
        
        
    	if(!skip) {
    		System.out.println("");
    		System.out.println(request.getRequestURL());
    		System.out.println("세션 확인중........");	 
    		
        	HttpSession session = request.getSession();
        	if(session.getAttribute("login") == null) {
        		if(!skip) {
        			System.out.println("세션 없음");
        			System.out.println("");
        		}
        		response.sendRedirect("/login");
        		return false;
        	}else {
        			
        		UserVO lgninfovo = (UserVO) session.getAttribute("login");
    			// session.setMaxInactiveInterval(CommonConst.SET_SESSION_TIME);	//초단위 (60*10=10분)
        		int sessionInterval = 60*30;
        		session.setMaxInactiveInterval(sessionInterval);
    			
        	}   		
    		
	    	//사용자 로그 생성
	    	String pageUrl = ((HttpServletRequest)request).getServletPath();
	    	String userIp = ((HttpServletRequest)request).getRemoteAddr();
    		System.out.println("페이지 확인 : "+pageUrl);
    		
    		InspLogVO inspLogVO = new InspLogVO();
    		
    		inspLogVO.setMenu_addr_url(pageUrl.toLowerCase());
    		
    		InspLogVO menu = inspLogService.selectMenuSn(inspLogVO);
			UserVO userVo = (UserVO) session.getAttribute("login");
    		
    		if(menu != null) {    			
    			menu.setLgn_id(userVo.getLgn_id());
    			menu.setAcs_ip(userIp);
    			menu.setLgn_nm(userVo.getLgn_nm());
    			menu.setMessage(menu.getMenu_nm()+" 페이지 이동");
    			
    			inspLogService.insertUserLog(menu);
    		}else if(pageUrl.equals("/userListAll")) {
    			inspLogVO.setLgn_id(userVo.getLgn_id());
    			inspLogVO.setAcs_ip(userIp);
    			inspLogVO.setLgn_nm(userVo.getLgn_nm());
    			inspLogVO.setMessage("사용자 관리 검색");
    			
    			inspLogService.insertUserLog(inspLogVO);
    		}else if(pageUrl.equals("/updatePasswd")) {
    			inspLogVO.setLgn_id(userVo.getLgn_id());
    			inspLogVO.setAcs_ip(userIp);
    			inspLogVO.setLgn_nm(userVo.getLgn_nm());
    			inspLogVO.setMessage("비밀번호 변경");
    			
    			inspLogService.insertUserLog(inspLogVO);
    		}
    		
    		System.out.println("메뉴 정보 확인 : "+menu);
    	}	
        return true;
    }
    
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		String requestURL = request.getRequestURL().toString();
	    boolean skip = false;
        for (String path : excludes) {
            if (requestURL.contains(path)) {
                skip = true;
                break;
            }
        }
	    if(!skip) {
	    	System.out.println("세션 확인완료");	    	 
	    }
	}

	@Override
	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3) throws Exception {
		String requestURL = arg0.getRequestURL().toString();
	    boolean skip = false;
        for (String path : excludes) {
            if (requestURL.contains(path)) {
                skip = true;
                break;
            }
        }
	    if(!skip) {
	    	System.out.println("로그인 상태");	    	
	    }
		
	}    
}
