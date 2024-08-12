package com.wellconn.optimizer.model;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
public class ConfigVO {

	private int config_sn;
	private String config_key;
	private String config_value;
	private String config_name;
	private String config_category;
	
	private ArrayList<Integer> site_list;
	
	// 타뷸레이터
	private int row_no;
	private Integer page;
	private int offset;
	private int size;
	private List<Map<String, Object>> sort;	
	private boolean use_cnt;
	
}
