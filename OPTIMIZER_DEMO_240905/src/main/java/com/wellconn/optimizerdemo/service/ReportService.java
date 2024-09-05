package com.wellconn.optimizerdemo.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.wellconn.optimizerdemo.model.PageVO;

public interface ReportService {
	
	void createExcel(HttpServletResponse response, List<List<String>> data, ArrayList<Integer> rowMergeList) throws IOException;
}
