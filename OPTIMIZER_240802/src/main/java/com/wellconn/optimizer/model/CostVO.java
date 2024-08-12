package com.wellconn.optimizer.model;

import java.sql.Timestamp;
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
public class CostVO {

	private int lgn_sn;
	private String lgn_id;
	private String lgn_nm;
	private String lgn_pswd;
	private int lgn_type;
	private String cmp_nm; // 회사 이름
	private int show_yn;
	private String rgtr_id;
	private String reg_dt;
	private String uptr_id;
	private String updt_dt;
	private int quota;
	private int parent_lgn_sn;
	private int first_lgn;
	private int offset;
	private int row;
	private int cnt;
	private String searchType;
	private String searchKeyword;
	private int year;
	private int month;
	private int day;
	private int weekday;
	private int test;	
	private int resource_no;
	private int resource_type;
	private int cloud_no;
	private String resource_org;
	private String resource_new_type1;
	private String resource_new_type2;
	
	private int resource_parent_no;
	private String resource_name;
	private int resource_status;
	private String rgstr_dt_st;	
	private String rgstr_dt;	
	private int resource_call_cnt;
	private String resource_new;
	private int rgstr_date;	
	private int rgstr_hour;	
	private int rgstr_min;		
	private int site_no;
	private int row_no;

	String selectedSite;
	List<Integer> selected_site_list;
	List<Integer> site_list;
	
	int opt_cnt;
	int unOpt_cnt;
	int all_cnt;
	
	long resource_org_size;
	long resource_org_size_all_opt        ;
	long resource_new_size_type2_all_opt  ;
	long resource_org_size_all_unopt      ;
	long resource_new_size_type2_all_unopt;
	long resource_new_size_type1;
	long resource_new_size_type2;
	long all_opt_size;
	
	int bfOptCost;
	int aftOptCost;
	int saveCost;
	int expSaveCost;
	
	
	int cloud_payment;
	
	int startDate;
	int endDate;
	
	int page_no;
	String page_name;
	int rgstr_yyyy;
	int rgstr_mm;
	int rgstr_dd;
	
	
	private Integer yyyy;
	private Integer mm;
	private Integer dd;
	
	

	
	private List<Map<String, Object>> sort;	
	private int row_cnt;
	private int cnt_mode;
	private Integer page;
	private int size;
	List<Integer> resource_type_arr;
	
	private Integer in_use_count ;
	private Integer not_in_use_count;
	private Integer negative_size_count;
	private String avg_reduction_percentage;
}
