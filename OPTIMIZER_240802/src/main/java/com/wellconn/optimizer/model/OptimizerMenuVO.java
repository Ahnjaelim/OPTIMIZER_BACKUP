package com.wellconn.optimizer.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OptimizerMenuVO {

	Integer menu_sn;
	Integer menu_stage;
	String menu_nm;
	String menu_addr_url;
	String menu_type;
	String menu_icon;
	Integer menu_sort;
	Integer parent_menu_sn;
	Integer use_yn;
	String menu_title;
	
	
	List<OptimizerMenuVO> childList;

}
