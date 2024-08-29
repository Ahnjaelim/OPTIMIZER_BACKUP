package com.wellconn.optimizer.model;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportVO {
	
	
	private Integer all_cnt;
	private Integer unopt_cnt;
	private Integer opt_cnt;
	private Double percent;
	List<Integer> site_list;
	
	private Integer org_time;
	private Integer new_time;
	
	private int no;
	private int resource_type;
	private String resource_name;
	private int resource_status;
	private int resource_new_size_type2;
	
	private String target_url;
	private String site_address;
	private String page_url;
	private int resource_org_size;
	private int greatest_type;
	private int al_type;
	private int total_bytes;
	private String algorithm_name;
	
	
	private int offset;
	private List<Map<String, Object>> sort;	
	private int row_cnt;
	private int cnt_mode;
	private Integer page;
	private int size;
	
	
	private String site_name;
	
	private double calcPercent;
	
	Integer resource_type1_size;
	
	private String page_path;
	private List<ImageData> canvasImages;
    private List<ImageData> imgImages;

//    // Getters and setters
//    public List<String> getCanvasImages() {
//        return canvasImages;
//    }
//
//    public void setCanvasImages(List<String> canvasImages) {
//        this.canvasImages = canvasImages;
//    }
//
//    public List<String> getImgImages() {
//        return imgImages;
//    }
//
//    public void setImgImages(List<String> imgImages) {
//        this.imgImages = imgImages;
//    }
	
}
