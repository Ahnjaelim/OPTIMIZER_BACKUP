package com.wellconn.optimizer.service;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.wellconn.optimizer.model.OptimizerPageVO;
import com.wellconn.optimizer.model.OptimizerVO;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = "file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class OptimizerPageServiceTest {

	@Autowired
	OptimizerPageService optimizerPageService;

	// @Test
	public void test() {

        // 전체 디렉토리
        OptimizerPageVO param1 = new OptimizerPageVO();
        List<OptimizerPageVO> alllist = optimizerPageService.selectAll(param1);
        System.out.println("===== all list =====");
        alllist.forEach(vo -> System.out.println(vo));
        
        // 타겟 디렉토리
		OptimizerPageVO param2 = new OptimizerPageVO();
		param2.setResource_no(8);
		List<OptimizerPageVO> volist = optimizerPageService.selectPageAllByResourceNo(param2);
		System.out.println("===== target list =====");
		volist.forEach(vo -> System.out.println(vo));
                
        
        
        // String jstreeData = optimizerPageService.convertToJSTreeFormat(volist);		
	}
	
	@Test
	public void test2() {
		OptimizerPageVO param = new OptimizerPageVO();
		param.setResource_no(8);
		// List<OptimizerPageVO> volist = optimizerPageService.selectPageAllByResourceNoAdvanced(param);		
	}
}
