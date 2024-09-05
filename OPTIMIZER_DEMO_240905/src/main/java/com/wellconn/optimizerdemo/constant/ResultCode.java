package com.wellconn.optimizerdemo.constant;


public enum ResultCode {
	SUCCESS(200),
	NO_DATA(204),
	NOT_FOUND(404);

 private final int value;

    // Enum 생성자
    ResultCode(int value) {
        this.value = value;
    }

    // 해당 enum 상수의 값을 반환하는 메서드
    public int getValue() {
        return value;
    }
};