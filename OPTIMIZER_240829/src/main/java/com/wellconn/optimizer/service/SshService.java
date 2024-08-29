package com.wellconn.optimizer.service;

import java.util.List;

import com.wellconn.optimizer.model.SiteManageVO;
import com.wellconn.optimizer.model.SshVO;

public interface SshService {

	List<SshVO> selectSshAll();
	SshVO selectSshOne(SshVO sshVO);
	SshVO getSiteNo(SshVO sshVO);
	int deleteSsh(SiteManageVO siteManageVO);
	int insertSsh(SshVO sshVO);
	int updateSsh(SshVO sshVO);
}
