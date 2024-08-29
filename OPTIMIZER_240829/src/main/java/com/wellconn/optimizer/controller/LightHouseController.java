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
public class LightHouseController {
	
	private final UserService userService;

}
