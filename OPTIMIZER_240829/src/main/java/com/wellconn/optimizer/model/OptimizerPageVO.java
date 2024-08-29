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
public class OptimizerPageVO {
	
	private int page_no;
	private String page_url;
	private String page_path;
	private String page_name;
	private int page_type;
	private int page_parent_no;
	private List<OptimizerPageVO> children;
	private String content;
	private String content_replaced;
	private ArrayList<Integer> site_list;
	private int use_lazyload;
	private int site_no;
	
	// html replace
	private Integer content_type;
	private String content_type1;
	private String content_type2;
	
	// 외부 JOIN 데이터
	private int resource_no;
	
	// 계층 구조 테이터
	private String indented_page_name;
	private int top_parent_page_no;
	private int level;
	
	// 타뷸레이터
	private int row_no;
	private Integer page;
	private int offset;
	private int size;
	private List<Map<String, Object>> sort;	
	private int row_cnt;
	private int cnt_mode;
	
	private Timestamp startDate;
	private Integer startIndex;
	private Integer limit;
}
