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
public class OptimizerVO {
	
	private Integer resource_no;
	private int resource_type;
	private int cloud_no;
	private int site_no;
	private String resource_org;
	private String resource_new_type1;
	private String resource_new_type2;
	private int resource_org_size;
	private int resource_new_size_type1;
	private int resource_new_size_type2;
	private int resource_parent_no;
	private String resource_name;
	private int resource_call_cnt;
	private int resource_status;
	private String rgstr_dt;
	private String updt_dt;
	private List<OptimizerVO> children;
	private int saving_rate;
	private int resource_condition;
	private int algorithm_sn;
	private String resource_org_display;
	private String resource_new_display;
	private String resource_type1;
	private String resource_type2;
	private String resource_type3;
	private String resource_type4;
	private String resource_type1_display;
	private String resource_type2_display;
	private String resource_type3_display;
	private String resource_type4_display;
	private int resource_type1_size;
	private int resource_type2_size;
	private int resource_type3_size;
	private int resource_type4_size;
	private String resource_type_url1;
	private String resource_type_url2;
	private String resource_type_url3;
	private String resource_type_url4;
	private int resource_type1_time;
	private int resource_type2_time;
	private int resource_type3_time;
	private int resource_type4_time;
	private int org_time;
	private int new_time;
	private String etc;
	private String page_path;
	
	// JOIN 컬럼
	private int page_no;
	private int call_cnt;
	private long traffic1;
	private long traffic2;
	private double avg_comp_rate;
	private int resource_status_cnt;
	
	// LOG 테이블 JOIN 컬럼
	private String log_rgstr_dt;
	private String resource_log_content;
	private Integer with_log; // LOG 테이블 볼건지 안볼건지
	
	// 대시보드에서 측정이 끝난 row만 가져오기
	private boolean time_not_null;
	
	
	// 통계용
	private int cnt;     // month 테이블에서 원본 리소스 제공 횟수
	private int opt_cnt; // month 테이블에서 최적화 리소스 제공 횟수
	private long total_optimized_traffic;
	private long current_total_optimized_traffic;
	private long pre_total_optimized_traffic;
	private int previous_month_opt_count;
	private int current_month_opt_count;
	private int current_opt_count;
	private int current_day_count;
	
	
	// 검색
	private ArrayList<Integer> site_list;
	private ArrayList<Integer> resource_status_array;
	private ArrayList<Integer> resource_type_array;	
	private int search_range;
	private String search_keyword;
	private int search_disable;
	private int search_type;
	private Integer search_page;
	private int startDate;
	private int endDate;
	private int rgstr_yyyy;
	private int rgstr_mm;
	private int rgstr_dd;
	private Timestamp target_date;
	private Timestamp startDate_ts;
	private Timestamp endDate_ts;
	private Integer search_date; 
	private Integer search_condition;
	private Integer precondition_status; // 전체 카운트 상태 조건
	
	// 비정형
	private Integer filemanager_type;
	private Integer use_unstrfile;
	
	// 타뷸레이터
	private int row_no;
	private Integer page;
	private int offset;
	private int size;
	private List<Map<String, Object>> sort;	
	private int row_cnt;
	private int cnt_mode;
	private int current_month_call_count;
	private int previous_month_call_count;
	private int total_log_count;
	private String sort_default;
	
}
