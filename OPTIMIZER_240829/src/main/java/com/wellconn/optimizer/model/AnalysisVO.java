package com.wellconn.optimizer.model;

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
public class AnalysisVO {
	private int analysis_info_sn;
	private int analysis_type;
	private String analysis_query;
	private String analysis_name;
	private int use_yn;
}
