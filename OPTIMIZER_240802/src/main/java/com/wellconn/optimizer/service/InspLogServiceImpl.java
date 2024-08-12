package com.wellconn.optimizer.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.wellconn.optimizer.mapper.InspLogMapper;
import com.wellconn.optimizer.model.InspLogVO;
import com.wellconn.optimizer.model.OptimizerMenuVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InspLogServiceImpl implements InspLogService {

	private final InspLogMapper inspLogMapper;
	
	@Override
	public List<InspLogVO> selectAll(InspLogVO inspLogVO) {
		return inspLogMapper.selectAll(inspLogVO);
	}
	
	@Override
	public InspLogVO selectAllCnt(InspLogVO inspLogVO) {
		return inspLogMapper.selectAllCnt(inspLogVO);
	}
	
	@Override
	public InspLogVO selectMenuSn(InspLogVO inspLogVO) {
		return inspLogMapper.selectMenuSn(inspLogVO);
	}
	
	@Override
	public int insertUserLog(InspLogVO inspLogVO) {
		return inspLogMapper.insertUserLog(inspLogVO);
	}

	@Override
	public Map<Integer, List<OptimizerMenuVO> > menuInit() {
		// TODO Auto-generated method stub
		
		// stage, menuList
		Map<Integer, List<OptimizerMenuVO> > menu = new HashMap<>();
		
		List<OptimizerMenuVO> menuList = inspLogMapper.menuInit();
		
		
		// 2 stage list-up
		List<OptimizerMenuVO> _2stageList = menuList.stream()
				.filter(i -> i.getMenu_stage().equals(2))
				.collect(Collectors.toList());
		
		
		// 1 stage list-up
		List<OptimizerMenuVO> _1stageList = menuList.stream()
				.filter(i -> i.getMenu_stage().equals(1))
				.map(i -> {
					Integer menu_sn = i.getMenu_sn();
					
					List<OptimizerMenuVO> childList = _2stageList.stream()
							.filter(child -> child.getParent_menu_sn().equals(menu_sn))
							.collect(Collectors.toList());
					
					i.setChildList(childList);
					
					return i;
				}).collect(Collectors.toList());
		
		
		menu.put(1, _1stageList);
		menu.put(2, _2stageList);
		
		
		/*
		
		
		// find-child and put
		for(OptimizerMenuVO _menu : _1stageList) {
			Integer menu_sn = _menu.getMenu_sn();
			
			List<OptimizerMenuVO> childList = _2stageList.stream()
					.filter(i->i.getParent_menu_sn().equals(menu_sn))
					.collect(Collectors.toList());
			
			if(childList!=null)
				_menu.setChildList(childList);
			
			
			menu.put(menu_sn, _menu);
		}
		
		// 2-stage put
		for(OptimizerMenuVO _menu : _2stageList) {
			Integer menu_sn = _menu.getMenu_sn();
			
			menu.put(menu_sn, _menu);
		}
		*/		
		
		
		
		return menu;
	}

}
