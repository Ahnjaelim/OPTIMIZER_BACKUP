package com.wellconn.optimizer.util;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;

@Component
public class EntryTimeFilter implements Filter {


    private static final ConcurrentHashMap<String, LocalDateTime> userEntryTimes = new ConcurrentHashMap<>();

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // 초기화 코드 (필요한 경우)
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String sessionId = httpRequest.getSession().getId();
        Cookie[] cookies = httpRequest.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("entryTime")) {
                    long entryTimestamp = Long.parseLong(cookie.getValue());
                    LocalDateTime entryTime = LocalDateTime.ofEpochSecond(entryTimestamp / 1000, 0, ZoneOffset.UTC);
                    userEntryTimes.put(sessionId, entryTime);
                }
            }
        }

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        // 정리 코드 (필요한 경우)
    }

    public static LocalDateTime getEntryTime(String sessionId) {
        return userEntryTimes.get(sessionId);
    }

}
