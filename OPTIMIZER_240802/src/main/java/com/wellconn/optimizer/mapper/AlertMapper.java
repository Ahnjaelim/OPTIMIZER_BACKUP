package com.wellconn.optimizer.mapper;

import java.util.HashMap;
import java.util.List;

import com.wellconn.optimizer.model.AlertVO;


public interface AlertMapper {

	List<AlertVO> getAlert(AlertVO alertvo);

	int updateAlert(AlertVO alertvo);
	int confirmUpdateAlert(AlertVO alertvo);
	
}
