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
public class AlgorithmVO {
	private int algorithm_sn;
	private int algorithm_type;
	private String algorithm_name;
	private int use_yn;
	private String algorithm_desc;
}
