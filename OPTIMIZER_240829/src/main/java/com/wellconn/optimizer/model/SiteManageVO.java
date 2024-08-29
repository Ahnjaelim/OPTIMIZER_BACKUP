package com.wellconn.optimizer.model;

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
public class SiteManageVO {

	String lgn_nm;
	int site_no;
	String site_name;
	String site_manager;
	int cloud_no;
	String site_address;
	private int lgn_sn;
	String cloud_company;
	
	// 타뷸레이터
	private String searchType;
	private int row_no;
	private Integer page;
	private int offset;
	private int size;
	private List<Map<String, Object>> sort;	
	private int row_cnt;
	private int cnt_mode;
	String searchKeyword;
	
	// JOIN 컬럼
	private int cloud_payment;
	
	List<String>[] selectedValues;
	
	private ArrayList<Integer> site_list;
}
