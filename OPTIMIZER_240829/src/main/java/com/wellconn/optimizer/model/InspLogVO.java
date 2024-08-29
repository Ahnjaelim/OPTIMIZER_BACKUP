package com.wellconn.optimizer.model;

import java.sql.Date;

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
public class InspLogVO {
	
	private int insp_log_sn;
	private int menu_sn;
	private String acs_ip;
	private String lgn_id;
	private String lgn_nm;
	private String reg_dt;
	private String message;
	private String menu_addr_url;
	private String menu_nm;
	
	private int offset;
	private int row;
	private int cnt;

	private String searchType;
	private String searchKeyword;
	
	private String search_from;
	private String search_to;
	
}
