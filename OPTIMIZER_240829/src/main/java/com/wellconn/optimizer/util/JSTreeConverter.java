package com.wellconn.optimizer.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

public class JSTreeConverter {
	
    public String convertToJSTreeFormat(List<?> objectList) {
        List<Map<String, Object>> jstreeDataList = new ArrayList<>();
        
        for (Object obj : objectList) {
            Map<String, Object> jstreeObject = convertToJSTreeObject(obj);
            jstreeDataList.add(jstreeObject);
        }
        
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(jstreeDataList);
        } catch (Exception e) {
            e.printStackTrace();
            return ""; // 예외 처리 방식에 따라 다른 값을 반환할 수 있음
        }
    }

    private Map<String, Object> convertToJSTreeObject(Object obj) {
        Map<String, Object> jstreeObject = new HashMap<>();

        // 여기에 각 객체를 jstree 형식에 맞게 변환하는 로직을 작성해야 합니다.
        // 예를 들어, 객체의 필드를 읽어서 Map으로 변환하거나 원하는 형식으로 가공합니다.

        // 예시로 toString() 메서드를 사용한 예제:
        jstreeObject.put("value", obj.toString());

        return jstreeObject;
    }
}
