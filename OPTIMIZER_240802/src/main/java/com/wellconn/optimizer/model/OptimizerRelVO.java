package com.wellconn.optimizer.model;

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
public class OptimizerRelVO {
	
	private int resource_no;
	private int page_no;
	private int rel_no;
}
