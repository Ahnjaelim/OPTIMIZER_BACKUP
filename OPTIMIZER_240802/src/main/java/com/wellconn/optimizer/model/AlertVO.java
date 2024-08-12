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
public class AlertVO {

	private int site_no;
	List<Integer> site_list;
	
	private int alarm_no;
	private Integer is_new;
	private Integer category;
	private String rgtr_dt;
	private String content;
	private Integer limit;
	
	private Integer selectYear;
	private Integer selectMonth;
	private int offset;
	private int row;
	private int cnt_mode;
	private Integer page;
	private int size;
}
