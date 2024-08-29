package com.wellconn.optimizer.model;

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
	private Integer site_no;
	private Integer page_no;
	private String lh_json;
	private int lh_type;
	private String rgstr_dt;
	
	private String site_address;

}
