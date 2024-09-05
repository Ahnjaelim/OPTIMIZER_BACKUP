package com.wellconn.optimizerdemo.model;

import java.sql.Timestamp;

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
public class LightHouseVO {

	private int lh_sn;
	private String lh_json;
	private int lh_score;
	private String page_url;
	private int page_status;
	private Integer page_no;
	private String rgstr_dt;

}
