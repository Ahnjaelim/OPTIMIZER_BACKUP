package com.wellconn.optimizerdemo.model;

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
public class ResourceVO {
	
	private Integer nid;
	private int page_no;
	private String resource_org;
	private String resource_new_type1;
	private String resource_new_type2;
	private int resource_org_size;
	private int resource_new_size_type1;
	private int resource_new_size_type2;
	private String resource_name;
	private int resource_type;
	private int resource_status;
	private String resource_new;
	private int algorithm_sn;
	private String resource_type1;
	private String resource_type2;
	private String resource_type3;
	private String resource_type4;
	private Integer resource_type1_size;
	private Integer resource_type2_size;
	private Integer resource_type3_size;
	private Integer resource_type4_size;
	private String resource_type_url1;
	private String resource_type_url2;
	private String resource_type_url3;
	private String resource_type_url4;
	private Integer org_time;
	private Integer new_time;
	private Integer resource_type1_time;
	private Integer resource_type2_time;
	private Integer resource_type3_time;
	private Integer resource_type4_time;
	private String created_at;
	
	private int row_no;
	private Integer page;
	private int offset;
	private int size;
	private List<Map<String, Object>> sort;	
	private int cnt_mode;
}
