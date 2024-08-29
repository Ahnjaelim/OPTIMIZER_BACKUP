package com.wellconn.optimizer.controller;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.wellconn.optimizer.service.OptimizerService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class WebSocketController {

    private final OptimizerService optimizerService;
    private final SimpMessagingTemplate messagingTemplate;
    
    /**
    @Scheduled(fixedRate = 2000)  // 2초마다 실행
    public void sendUsers() {
    	// 사용자의 접속 시간을 이용하여 작업 수행
    	LocalDateTime connectTime = webSocketEventListener.getConnectTime();
    	System.out.println(connectTime);
    	String data = optimizerService.selectNow();
    	messagingTemplate.convertAndSend("/topic/resource", data);	
    }
    
    // 클라이언트가 데이터를 요청할 수 있는 추가 메서드
    @MessageMapping("/test")
    @SendTo("/topic/resource")
    public String getUsersOnDemand() {
        return "websocketTest";
    }*/

    
}
