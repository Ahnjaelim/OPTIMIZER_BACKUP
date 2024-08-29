package com.wellconn.optimizer.model;

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
public class SshVO {

	private int nid;
	private String ssh_id;
	private String ssh_pw;
	private int ssh_port;
	private String ssh_server_ip;
	private String resource_path;
	private int cloud_no;
	private int site_no;
	private int server_type;
	private ArrayList<Integer> site_list;
	private String site_nm_ssh;
	private String access_key;
	private String secert_key;
	private String bucket_name;

	// 타뷸레이터
	private int row_no;
	private Integer page;
	private int offset;
	private int size;
	private List<Map<String, Object>> sort;	
	private int row_cnt;
	private int cnt_mode;	
	
}
