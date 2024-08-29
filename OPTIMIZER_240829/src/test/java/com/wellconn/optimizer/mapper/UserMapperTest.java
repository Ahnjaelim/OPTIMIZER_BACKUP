package com.wellconn.optimizer.mapper;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.wellconn.optimizer.model.UserVO;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = "file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class UserMapperTest {

	@Autowired
	UserMapper userMapper;
	
	// @Test
	public void selectNow() {
		System.out.println(userMapper.selectNow());
	} 
	
	// @Test
	public void selectAllTest() {
	}
	
	@Test
	public void encryptTest() {
		System.out.println(passwordEncrypt("webdnpfzjs1!"));
	}
	
	//@Test
	public void loginTest() {
		UserVO vo = new UserVO();
		vo.setLgn_id("user0adsadd1");
		vo.setLgn_pswd("9af15b336e6a9619928537df30b2e6a2376569fcf9d7e773eccede65606529a0");
		System.out.println(userMapper.login(vo));
	}
	
	// @Test
	public void insertTest() {
		UserVO vo = new UserVO();
		vo.setLgn_id("user05");
		vo.setLgn_nm("장원영");
		vo.setLgn_pswd(passwordEncrypt("1111"));
		vo.setLgn_type(0);
		vo.setCmp_nm("광동제약");
		vo.setRgtr_id("WELLCONN");
		vo.setUptr_id("WELLCONN");
		int result = userMapper.insertUser(vo);
		
		// lgn_id, lgn_nm, lgn_pswd, lgn_type, cmp_nm, show_yn, rgtr_id, reg_dt, uptr_id, updt_dt, parent_lgn_sn, first_lgn
	}
	
	public String passwordEncrypt(String password) {
		String sha256 = "";
		try {
			MessageDigest mdSHA256 = MessageDigest.getInstance("SHA-256");
			mdSHA256.update(password.getBytes());
			byte[] sha256Hash = mdSHA256.digest();
			StringBuffer hexSHA256hash = new StringBuffer();
			
			for(byte b : sha256Hash) {
				String hexString = String.format("%02x", b);
				hexSHA256hash.append(hexString);
			}
			sha256 = hexSHA256hash.toString();
		} catch (NoSuchAlgorithmException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}		
		return sha256;
	}	
}
