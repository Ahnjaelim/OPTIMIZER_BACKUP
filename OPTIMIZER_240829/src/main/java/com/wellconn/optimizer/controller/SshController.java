package com.wellconn.optimizer.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wellconn.optimizer.model.SiteManageVO;
import com.wellconn.optimizer.model.SshVO;
import com.wellconn.optimizer.model.UserVO;
import com.wellconn.optimizer.service.SiteManageService;
import com.wellconn.optimizer.service.SshService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class SshController {

	private final SshService sshService;
	private final SiteManageService siteManageService;

	@RequestMapping(value = "/sshManage", method = RequestMethod.GET)
	public String sshManage(Model model, HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		SiteManageVO siteManageVO = new SiteManageVO();
		siteManageVO.setCnt_mode(1);
		model.addAttribute("siteList", siteManageService.selectSiteAllForList());
		return "/setting/sshManage";
	}

	@RequestMapping(value = "/selectSshAll")
	@ResponseBody
	public Map<String, Object> selectSshAll(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("size") int size, @RequestParam("page") int page, SshVO sshVO) throws Exception {

		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		sshVO.setSite_list(site_list);

		Map<String, Object> result = new HashMap<>();
		sshVO.setOffset((page - 1) * 10);
		sshVO.setCnt_mode(1);
		int cnt = sshService.selectSshAll().size();
		int last = 1;
		if (cnt % size == 0)
			last = 0;

		sshVO.setCnt_mode(0);
		List<SshVO> volist = sshService.selectSshAll();

		result.put("data", volist);
		result.put("list_cnt", cnt);
		result.put("last_page", (cnt / size + last));

		return result;
	}

	@RequestMapping(value = "/selectSshOne")
	@ResponseBody
	public Map<String, Object> selectSshOne(HttpServletRequest request, HttpServletResponse response, SshVO sshVO)
			throws Exception {

		// 세션 받기
		HttpSession session = request.getSession();
		UserVO userVo = (UserVO) session.getAttribute("login");
		ArrayList<Integer> site_list = (ArrayList<Integer>) session.getAttribute("SiteList");
		sshVO.setSite_list(site_list);

		Map<String, Object> result = new HashMap<>();
		SshVO voValue = sshService.selectSshOne(sshVO);

		if (voValue == null) {
			result.put("data", "F");
			return result;
		}

		result.put("data", voValue);
		return result;
	}

	@RequestMapping(value = "/insertSsh")
	@ResponseBody
	public Map<String, Object> insertSsh(HttpServletRequest request, SshVO sshVO) {
		Map<String, Object> result = new HashMap<>();
		System.out.println(sshVO);

		SshVO siteNo = sshService.getSiteNo(sshVO);

		sshVO.setSite_no(siteNo.getSite_no());

		result.put("data", sshService.insertSsh(sshVO));
		return result;
	}

	@RequestMapping(value = "/updateSsh")
	@ResponseBody
	public Map<String, Object> updateSsh(HttpServletRequest request, SshVO sshVO) {
		Map<String, Object> result = new HashMap<>();
		System.out.println(sshVO);

		SshVO siteNo = sshService.getSiteNo(sshVO);

		sshVO.setSite_no(siteNo.getSite_no());

		result.put("data", sshService.updateSsh(sshVO));
		return result;
	}
}
