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
public class ProjectVO {

	private int project_no;
	private String project_name;
	private String project_manager;
	private int cloud_no;
}
