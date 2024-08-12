package com.wellconn.optimizer.controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.wellconn.optimizer.interceptor.SessionInterceptor;
import com.wellconn.optimizer.model.InspLogVO;
import com.wellconn.optimizer.model.LgnInfoVO;
import com.wellconn.optimizer.model.OptimizerMenuVO;
import com.wellconn.optimizer.model.OptimizerVO;
import com.wellconn.optimizer.model.UserVO;
import com.wellconn.optimizer.service.InspLogService;
import com.wellconn.optimizer.service.UserService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	private final InspLogService inspLogService;

	/***
	 * 1. 함수명 : loginGET, loginPOST, logout
	 * 2. 작성일: 2023-11-22
	 * 3. 작성자: 안재림
	 * 4. 설명: 로그인, 로그아웃
	 * 5. 수정일: 
	 * ***/	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String loginGET() {		
		return "/user/login";
	}
	@RequestMapping(value = "/loginPost", method = RequestMethod.POST)
	public String loginPOST(Model model, HttpServletRequest request, RedirectAttributes rttr, UserVO userVO) {
		HttpSession session = request.getSession();
		ModelAndView mv = new ModelAndView();
		UserVO selectedUser = null;
		userVO.setLgn_pswd(passwordEncrypt(userVO.getLgn_pswd()));
		selectedUser = userService.login(userVO);
		if(selectedUser==null || selectedUser.equals(null)) {
			System.out.println("Login Fail!");
			rttr.addFlashAttribute("msg","아이디 또는 비밀번호를 잘못 입력했습니다. <br/>입력하신 내용을 다시 확인해주세요.");
			session.setAttribute("login", null);
			return "redirect:/login";
		}
		
		//사용자 로그인 로그 생성
    	String userIp = ((HttpServletRequest)request).getRemoteAddr();

		InspLogVO inspLogVO = new InspLogVO();
		
		inspLogVO.setLgn_id(selectedUser.getLgn_id());
		inspLogVO.setAcs_ip(userIp);
		inspLogVO.setLgn_nm(selectedUser.getLgn_nm());
		inspLogVO.setMessage("사용자 로그인");
		
		inspLogService.insertUserLog(inspLogVO);
		
		System.out.println(userVO);
		session.setAttribute("login", selectedUser);
		
		//////////////////////////////////////////////////
		// 로그인 성공시 최초 이동되는 페이지 
		// @autor:doil
		
		String firstUrl = "/index";
		Map<Integer, List<OptimizerMenuVO> > _menuChk = (Map<Integer, List<OptimizerMenuVO>>) request.getSession().getAttribute("menuMAP");
		
		if(_menuChk!=null) {
			List<OptimizerMenuVO> _1stage = _menuChk.get(1);
			OptimizerMenuVO firstMenu = _1stage.get(0);
			Integer menu_sn = firstMenu.getMenu_sn();
			String menu_url = firstMenu.getMenu_addr_url();
			firstUrl = "redirect:/" + menu_url;
			session.setAttribute("current_menu_1", menu_sn);
			
			List<OptimizerMenuVO> childList = firstMenu.getChildList();
			if(childList!=null && childList.size() > 0) {
				OptimizerMenuVO firstChild = childList.get(0);
				session.setAttribute("current_menu_2", firstChild.getMenu_sn());
			}else {
				session.setAttribute("current_menu_2", null);
			}
		}
		//////////////////////////////////////////////////
		
		return firstUrl;
	}
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		Object obj = session.getAttribute("login");
		if(obj!=null) {
			session.removeAttribute("login");
			session.removeAttribute("current_menu_1");
			session.removeAttribute("current_menu_2");
			session.removeAttribute("menuMAP");
			
			SessionInterceptor.MENU = null;
			
			session.invalidate();
			System.out.println("로그아웃 완료");
		}		
		return "redirect:/login";
	}
	
	/***
	 * 1. 함수명 : userManage
	 * 2. 작성일: 2023-11-22
	 * 3. 작성자: 안재림
	 * 4. 설명: 설정 > 사용자 관리
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value = "/userManage", method = RequestMethod.GET)
	public String userManage(Model model, UserVO userVO) {	
		model.addAttribute("userList", userService.selectAll(userVO));
		return "/setting/userManage";
	}	

	/***
	 * 1. 함수명 : userListAll
	 * 2. 작성일: 2023-11-22
	 * 3. 작성자: 안재림
	 * 4. 설명: 설정 > 사용자 관리 > 테이블 조회
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value ="/userListAll")
	@ResponseBody
	public Map<String,Object> userListAll(HttpServletRequest request,  HttpServletResponse response, UserVO userVO, @RequestParam("size")int size, @RequestParam("page")int page) throws Exception{
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		Map<String,Object> result = new HashMap<>();
		userVO.setOffset((page-1)*10);
		int cnt = userService.selectAllCnt(userVO).getCnt();
		int last = 1;
		if(cnt%size==0) last = 0;
		
		result.put("data", userService.selectAll(userVO));
		result.put("list_cnt", cnt);
		result.put("last_page", (cnt/size+last)); 
		
		return result;
	}

	/***
	 * 1. 함수명 : insertUser
	 * 2. 작성일: 2023-11-22
	 * 3. 작성자: 안재림
	 * 4. 설명: 설정 > 사용자 관리 > 사용자 추가
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value ="/insertUser")
	@ResponseBody
	public Map<String,Object> insertUser(HttpServletRequest request,  HttpServletResponse response, UserVO userVO) throws Exception{
		HttpSession session = request.getSession();
		Map<String,Object> result = new HashMap<>();
		
		//아이디 중복체크
		List<String> userId = userService.selectUserId();
		for(int i=0; i<userId.size(); i++) {
			if(userId.get(i).equals(userVO.getLgn_id())) {
				result.put("checkId", "F");
				
				return result;
			}
		}
		
		/*비밀번호 조건 체크*/
		String lgn_pswd = userVO.getLgn_pswd();
		
		Map<String,Object> checkPasswd = checkPasswd(lgn_pswd);
		
		if(!checkPasswd.isEmpty()) {
			return checkPasswd;
		}
		
		userVO.setLgn_pswd(passwordEncrypt(userVO.getLgn_pswd()));
		
		//관리자 추가한 계정 정보 (로그인한 계정)
		UserVO sessioninfo = (UserVO) session.getAttribute("login");
		userVO.setRgtr_id(sessioninfo.getLgn_id());
		userVO.setUptr_id(sessioninfo.getLgn_id());
		
		
		userService.insertUser(userVO);
		
		result.put("checkId", "T");
		result.put("responseMessage", "T");
		return result;
	}
	
	/***
	 * 1. 함수명 : updateUser
	 * 2. 작성일: 2023-11-22
	 * 3. 작성자: 안재림
	 * 4. 설명: 설정 > 사용자 관리 > 사용자 수정
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value ="/updateUser")
	@ResponseBody
	public Map<String,Object> updateUser(HttpServletRequest request,  HttpServletResponse response, UserVO userVO) throws Exception{
		HttpSession session = request.getSession();
		Map<String,Object> result = new HashMap<>();
		
		/*비밀번호 조건 체크*/
		String lgn_pswd = "";
		lgn_pswd = userVO.getLgn_pswd();
		
		if(!lgn_pswd.equals("") && lgn_pswd != null) {
			Map<String,Object> checkPasswd = checkPasswd(lgn_pswd);
			
			if(!checkPasswd.isEmpty()) {
				return checkPasswd;
			}else {
				userVO.setLgn_pswd(passwordEncrypt(userVO.getLgn_pswd()));
			}
		}		
		
		//이전 비밀번호와 동일한지 체크
		UserVO checkRePasswd = userService.login(userVO);
		
		if(checkRePasswd != null) {
			result.put("responseMessage", "이전에 사용하던 비밀번호와 동일합니다.<br>다른 비밀번호를 입력해주세요.");
			return result;
		};
		
		//관리자 추가한 계정 정보 (로그인한 계정)
		UserVO sessioninfo = (UserVO) session.getAttribute("login");
		userVO.setRgtr_id(sessioninfo.getLgn_id());
		userVO.setUptr_id(sessioninfo.getLgn_id());
		
		
		userService.updateUser(userVO);
		
		InspLogVO inspLogVO = new InspLogVO();
    	String userIp = ((HttpServletRequest)request).getRemoteAddr();
		
		inspLogVO.setLgn_id(sessioninfo.getLgn_id());
		inspLogVO.setAcs_ip(userIp);
		inspLogVO.setLgn_nm(sessioninfo.getLgn_nm());
		inspLogVO.setMessage("["+userVO.getLgn_id()+"] 사용자 정보 수정");
		
		inspLogService.insertUserLog(inspLogVO);
		
		result.put("responseMessage", "T");
		return result;
	}

	/***
	 * 1. 함수명 : userIdCheck
	 * 2. 작성일: 2023-11-22
	 * 3. 작성자: 안재림
	 * 4. 설명: 설정 > 사용자 관리 > 사용자 추가 > 아이디 중복 확인
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value ="/userIdCheck")
	@ResponseBody
	public Map<String,Object> userIdCheck(HttpServletRequest request,  HttpServletResponse response, UserVO userVO) throws Exception{
		HttpSession session = request.getSession();
		// UserVO userVo = (UserVO) session.getAttribute("login");
		Map<String,Object> result = new HashMap<>();
		result.put("data", userService.userIdCheck(userVO));
		return result;
	}	
	
	/***
	 * 1. 함수명 : passwordEncrypt
	 * 2. 작성일: 2023-11-22
	 * 3. 작성자: 안재림
	 * 4. 설명: 패드워드 암호화
	 * 5. 수정일: 
	 * ***/		
	public String passwordEncrypt(String password) {
		String sha256 = "";
		try {
			MessageDigest mdSHA256 = MessageDigest.getInstance("SHA-256");
			mdSHA256.update(password.getBytes());
			byte[] sha256Hash = mdSHA256.digest();
			StringBuffer hexSHA256hash = new StringBuffer();
			
			for(byte b : sha256Hash) {
				String hexString = String.format("%02x", b);
				hexSHA256hash.append(hexString);
			}
			sha256 = hexSHA256hash.toString();
		} catch (NoSuchAlgorithmException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}		
		return sha256;
	}
	
	/***
	 * 1. 함수명 : deletedUser
	 * 2. 작성일: 2023-11-22
	 * 3. 작성자: 박정우
	 * 4. 설명: 설정 > 사용자 관리 > 사용자 삭제
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value ="/deletedUser")
	@ResponseBody
	public Map<String,Object> deletedUser(HttpServletRequest request,  HttpServletResponse response, UserVO userVO) throws Exception{
		HttpSession session = request.getSession();
		Map<String,Object> result = new HashMap<>();
		//관리자 추가한 계정 정보 (로그인한 계정)
		UserVO sessioninfo = (UserVO) session.getAttribute("login");
		
		userService.deletedUser(userVO);
		
		InspLogVO inspLogVO = new InspLogVO();
    	String userIp = ((HttpServletRequest)request).getRemoteAddr();
		
		inspLogVO.setLgn_id(sessioninfo.getLgn_id());
		inspLogVO.setAcs_ip(userIp);
		inspLogVO.setLgn_nm(sessioninfo.getLgn_nm());
		inspLogVO.setMessage("["+userVO.getLgn_id()+"] 사용자 삭제");
		
		inspLogService.insertUserLog(inspLogVO);
		
		return result;
	}
	
	/***
	 * 1. 함수명 : checkPasswd
	 * 2. 작성일: 2023-11-22
	 * 3. 작성자: 박정우
	 * 4. 설명: 비밀번호 정책 확인
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value ="/checkPasswd")
	@ResponseBody
	public Map<String,Object> checkPasswd(String lgn_pswd) throws Exception{
		Map<String,Object> result = new HashMap<>();
		
		//비밀번호 길이 체크
				if (lgn_pswd.length() < 10 || lgn_pswd.length() > 20) {
					result.put("responseMessage", "비밀번호 길이는 10~20자여야 합니다.");
				    return result;
				}

				// 영문 대,소문자, 숫자, 특수문자 중 3개 이상 조합
				int charTypeCount = 0;
				if (Pattern.compile("[a-z]").matcher(lgn_pswd).find()) charTypeCount++;
				if (Pattern.compile("[A-Z]").matcher(lgn_pswd).find()) charTypeCount++;
				if (Pattern.compile("[0-9]").matcher(lgn_pswd).find()) charTypeCount++;
				if (Pattern.compile("[~!@#$%^*()_\\-=]").matcher(lgn_pswd).find()) charTypeCount++;
				if (charTypeCount < 3) {
					result.put("responseMessage", "비밀번호는 영문 대,소문자, 숫자, 특수문자 중 3개 이상 조합해야 합니다.");
				    return result;
				}
				
				// 허용된 특수문자만 사용했는지 검사
				if (!Pattern.compile("^[a-zA-Z0-9~!@#$%^*()_\\-=]{10,20}$").matcher(lgn_pswd).matches()) {
					result.put("responseMessage", "비밀번호에 사용가능한 특수문자는 ~!@#$%^*()_-=입니다.");
				    return result;
				}
		
		return result;
	}
	
	/***
	 * 1. 함수명 : updatePasswdChk
	 * 2. 작성일: 2024-01-04
	 * 3. 작성자: 박정우
	 * 4. 설명: 비밀번호 변경 전 현재 비밀번호 확인
	 * 5. 수정일: 
	 * ***/	
	@RequestMapping(value ="/updatePasswdChk")
	@ResponseBody
	public Map<String,Object> updatePasswdChk(HttpServletRequest request,  HttpServletResponse response, UserVO userVO) throws Exception {
		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		
		ModelAndView mv = new ModelAndView();
		UserVO selectedUser = null;
		
		Map<String,Object> result = new HashMap<>();
		
		userVO.setLgn_pswd(passwordEncrypt(userVO.getLgn_pswd()));
		userVO.setLgn_id(userVo.getLgn_id());
		
		selectedUser = userService.login(userVO);
		
		if(selectedUser==null || selectedUser.equals(null)) {
			System.out.println("Login Fail!");
			result.put("msg","현재 비밀번호가 일치하지 않습니다. \r\n입력하신 내용을 다시 확인해주세요.");
			return result;
		}
		
		result.put("msg","T");
		
		return result;
	}
	
	/***
	 * 1. 함수명 : updatePasswd
	 * 2. 작성일: 2024-01-04
	 * 3. 작성자: 박정우
	 * 4. 설명: 비밀번호 변경
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value ="/updatePasswd")
	@ResponseBody
	public Map<String,Object> updatePasswd(HttpServletRequest request,  HttpServletResponse response, UserVO userVO) throws Exception{
		HttpSession session = request.getSession();
		Map<String,Object> result = new HashMap<>();
		
		/*비밀번호 조건 체크*/
		String lgn_pswd = userVO.getLgn_pswd();
		
		Map<String,Object> checkPasswd = checkPasswd(lgn_pswd);
		
		if(!checkPasswd.isEmpty()) {
			return checkPasswd;
		}
		
		userVO.setLgn_pswd(passwordEncrypt(userVO.getLgn_pswd()));
		
		//관리자 추가한 계정 정보 (로그인한 계정)
		UserVO sessioninfo = (UserVO) session.getAttribute("login");
		userVO.setRgtr_id(sessioninfo.getLgn_id());
		userVO.setUptr_id(sessioninfo.getLgn_id());
		userVO.setLgn_id(sessioninfo.getLgn_id());
		
		//이전 비밀번호와 동일한지 체크
		UserVO checkRePasswd = userService.login(userVO);
		
		if(checkRePasswd != null) {
			result.put("responseMessage", "이전에 사용하던 비밀번호와 동일합니다. 다른 비밀번호를 입력해주세요.");
			return result;
		};
		
		
		userService.updatePasswd(userVO);
		
		result.put("responseMessage", "T");
		return result;
	}
	
	/***
	 * 1. 함수명 : 
	 * 2. 작성일: 
	 * 3. 작성자: 
	 * 4. 설명: 
	 * 5. 수정일: 
	 * ***/		
	@RequestMapping(value = "/updateVisitDate", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateVisitDate(HttpServletRequest request) {
		HttpSession session = request.getSession();
		UserVO sessioninfo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
        // optimizerVO.setSite_list(site_list);
		
        int data = userService.updateVisitDate(sessioninfo);
        
        Map<String,Object> result = new HashMap<>();
	    result.put("data", data);        
		return result;
	}	

	
	@RequestMapping(value = "/passwordManage", method = RequestMethod.GET)
	public String passwordManage() {		
		return "/setting/passwordManage";
	}
}
