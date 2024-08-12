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
public class UserVO {

	int lgn_sn;
	String lgn_id;
	String lgn_nm;
	String lgn_pswd;
	int lgn_type;
	String cmp_nm; // 회사 이름
	int show_yn;
	String rgtr_id;
	String reg_dt;
	String uptr_id;
	String updt_dt;
	int quota;
	int parent_lgn_sn;
	int first_lgn;
	Timestamp visit_dt;
	
	int offset;
	int row;
	int cnt;
	
	String searchType;
	String searchKeyword;

}
