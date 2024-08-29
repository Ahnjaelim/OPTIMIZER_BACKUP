package com.wellconn.optimizer.model;

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
public class OptimizerLogVO {
	
	private Integer resource_log_no;
	private Integer resource_no;
	private String resource_org;
	private String resource_new_type1;
	private String resource_new_type2;
	private int resource_org_size;
	private int resource_new_size_type1;
	private int resource_new_size_type2;
	private int resource_type;
	private String resource_log_content;
	private String rgstr_dt;
	
	private String order;
	
	// 타뷸레이터
	private int row_no;
	private Integer page;
	private int offset;
	private int size;
	private List<Map<String, Object>> sort;	
	private int row_cnt;
	private int cnt_mode;
}
