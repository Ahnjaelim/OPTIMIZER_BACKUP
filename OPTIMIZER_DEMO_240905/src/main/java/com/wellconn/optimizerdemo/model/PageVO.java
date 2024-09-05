package com.wellconn.optimizerdemo.model;

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
public class PageVO {
	
	private Integer page_no;
	private String page_url;
	private int is_complete;
	private String created_at;
	private String html_code;
	private String html_code_after; 
	private int content_type;
	private int page_coll_status;
	private int page_opt_status;
	private String updt_dt;
	
	private Integer org_score;
	private Integer new_score;
	private Integer org_time;
	private Integer new_time;
	
	// 가상
	private Integer page_status; // 최적화 전후 구분, 최적화 전 0, 최적화 후 1
}
