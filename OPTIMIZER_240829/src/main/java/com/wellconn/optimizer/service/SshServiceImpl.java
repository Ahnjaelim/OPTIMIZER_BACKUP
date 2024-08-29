package com.wellconn.optimizer.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.wellconn.optimizer.mapper.OptimizerLogMapper;
import com.wellconn.optimizer.mapper.SshMapper;
import com.wellconn.optimizer.model.SiteManageVO;
import com.wellconn.optimizer.model.SshVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SshServiceImpl implements SshService {

	private final SshMapper sshMapper;
	
	@Override
	public List<SshVO> selectSshAll() {
		return sshMapper.selectSshAll();
	}
	
	@Override
	public SshVO selectSshOne(SshVO sshVO) {
		return sshMapper.selectSshOne(sshVO);
	}
	
	@Override
	public SshVO getSiteNo(SshVO sshVO) {
		return sshMapper.getSiteNo(sshVO);
	}
	
	@Override
	public int deleteSsh(SiteManageVO siteManageVO) {
		return sshMapper.deleteSsh(siteManageVO);
	}

	@Override
	public int insertSsh(SshVO sshVO) {
		return sshMapper.insertSsh(sshVO);
	}
	
	@Override
	public int updateSsh(SshVO sshVO) {
		return sshMapper.updateSsh(sshVO);
	}

}
