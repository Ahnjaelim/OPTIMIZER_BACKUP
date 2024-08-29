package com.wellconn.optimizer.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.wellconn.optimizer.mapper.AlertMapper;
import com.wellconn.optimizer.mapper.CostMapper;
import com.wellconn.optimizer.model.AlertVO;
import com.wellconn.optimizer.model.CostVO;
import com.wellconn.optimizer.model.OptimizerVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class alertServiceImpl implements alertService {

	private final AlertMapper alertMapper;



	@Override
	public List<AlertVO> getAlert(AlertVO alertvo) {
		// TODO Auto-generated method stub
		return alertMapper.getAlert(alertvo);
	}



	@Override
	public int updateAlert(AlertVO alertvo) {
		// TODO Auto-generated method stub
		return alertMapper.updateAlert(alertvo);
	}



	@Override
	public int confirmUpdateAlert(AlertVO alertvo) {
		// TODO Auto-generated method stub
		return alertMapper.confirmUpdateAlert(alertvo);
	}

	
}
