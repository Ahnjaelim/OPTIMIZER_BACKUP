package com.wellconn.optimizer.config;

import java.io.InputStream;
import java.util.Properties;

public class AppProperties {

    private static Properties properties;

    static {
        try {
            // 프로퍼티 파일 로드
            properties = new Properties();
            InputStream inputStream = AppProperties.class.getClassLoader().getResourceAsStream("app.properties");
            properties.load(inputStream);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String getDriverClassName() {
        return properties.getProperty("db.driverClassName");
    }

    public static String getJdbcUrl() {
        return properties.getProperty("db.jdbcUrl");
    }

    public static String getUsername() {
        return properties.getProperty("db.username");
    }

    public static String getPassword() {
        return properties.getProperty("db.password");
    }

    public static String getSyncUrl() {
        return properties.getProperty("syncUrl");
    }

    public static String getExcel_root() {
        return properties.getProperty("excel.upload");
    }
    // 다른 필요한 메서드들도 추가 가능
}
