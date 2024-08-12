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
public class CloudVO {

	private int cloud_no;
	private String cloud_nm;
	private int cloud_payment;
	private String cloud_url;
	private String cloud_company;
	private int lgn_sn;
	private String rgstr_dt;
	private String updt_dt;
	
	// JOIN 컬럼
	private String lgn_nm;
	
	// 검색
	private String search_type;
	private String search_keyword;
	
	// 타뷸레이터
	private int row_no;
	private Integer page;
	private int offset;
	private int size;
	private List<Map<String, Object>> sort;	
	private int row_cnt;
	private int cnt_mode;
}
