
$(function(){
	$("#search-btn").click(function(){
		userList();
	});
	$("#search-init").click(function(){
		$("#search-keyword").val("");
		userList();
	});
	
})

function userList(){
	table_resource = new Tabulator("#userManageTable", {
	    pagination:true, //enable pagination
	    paginationMode:"remote", //enable remote pagination
	    sortMode: "remote",
	    ajaxURL:"/userListAll", //set url for ajax request
	    ajaxParams:{
	    	searchType : $("#search-type").val(),
	    	searchKeyword : $("#search-keyword").val(),
	    },	    
	    paginationSize:10, //optional parameter to request a certain number of rows per page
	    placeholder:"해당 조건에 맞는 데이터가 존재하지 않습니다.",
	    autoResize:true,
	    tooltips:false,
	    locale:true,
	    langs:{
	        "default":{
	            "pagination":{
	                "counter":{
	                    "showing": "Showing",
	                    "of": "of",
	                    "rows": "rows",
	                    "pages": "pages",
	                    "Prev": "이전",
	                }
	            },
	        }
	    },	    
	    ajaxContentType : "application/json; charset=utf-8",
	    ajaxContentType:"json",
	    ajaxResponse:function(url,prarm,response){
			$('#preLoader').fadeOut(100);
 	    	console.log(response);
	    	// console.log(prarm);
	    	// console.log("page : "+this.getPage());
	    	// console.log("size : "+this.getSize());
	    	$("#list-cnt").html(response.list_cnt);
	    	
	    	let currentPage = this.getPage();
	        let pageSize = this.getPageSize();
	    	for(let i=0;i<response.data.length;i++){
	    		response.data[i].row_no = (currentPage - 1) * pageSize + i + 1;
	    	}
	    	return response; 
	    },
	    paginationInitialPage: 1,
	    layout: "fitColumns",
	    columns: [
	    	{
	    		title: "No",
	    		field: "row_no",
	    		width: 100,
	    		hozAlign: "left",
	    		title: "No",
	    		field: "row_no",
	    		width: 70,
	    		headerHozAlign: "center",
	    		hozAlign: "left",
	    		resizable:false,
	    		headerSort:true
	    	},
	    	/*{
	    		title: "유형",
	    		field: "lgn_type",
	    		headerSort:true,
	    		visible: false
	    	},
	    	{
	    		title: "회사명",
	    		field: "cmp_nm",
	    		headerSort:true,
	    		visible: false
	    	},*/
	    	{
	    		title: "등록일",
	    		field: "reg_dt",
	    		width: 250,
	    		headerSort:true,
	    		resizable:false,
	    		headerSort:true,
	    		headerHozAlign: "center",
	    		hozAlign: "center",
	    		formatter: function(cell, formatterParams, onRendered) {
	    			return dateFormatterType2(cell.getValue());
	    		},
	    	},
	    	{
	    		title: "아이디",
	    		field: "lgn_id",
	    		resizable:false,
	    		headerSort:true,
	    		headerHozAlign: "center",
	    		hozAlign: "center"
	    	},
	    	{
	    		title: "이름",
	    		field: "lgn_nm",
	    		headerSort:true,
	    		headerHozAlign: "center",
	    		hozAlign: "center",
	    		resizable:false
	    	},
	    	{
	    		title: "등록자",
	    		field: "rgtr_id",
	    		headerSort:true,
	    		headerHozAlign: "center",
	    		hozAlign: "center",
	    		resizable:false
	    	},
	    	
	    	{ 
	    		title: "수정",
	    		field: "modify_btn",
	    		hozAlign: "center",
	    		width:150, 
	    		minWidth:100, 
	    		cssClass: "text-center", 
	    		resizable:false, 
	    		headerSort:false,
	    		formatter:function(cell, formatterParams){
	    	        return "<button class='btn btn-info-subtle btn-rounded px-2 py-1' style='font-size:12px;'>수정</button>";
	    	    },
	    		
	    	    cellClick:function(e, cell){
	    	    	var rowData = cell.getRow().getData();
	    	        var lgnId = rowData.lgn_id; // lgn_id 값을 가져옴
	    	        var lgnNm = rowData.lgn_nm; // lgn_nm 값을 가져옴
	    	        var lgnType = rowData.lgn_type; // lgn_nm 값을 가져옴
	    	        var cmpNm = rowData.cmp_nm; // lgn_nm 값을 가져옴
	    	        
	    	        if($("#login_type_top").val() >= 1 && lgnId != $("#login_id_top").val()) {
	    	        	alertify.warning('다른 사용자의 정보를 수정하실 수 없습니다.');
	    	        }else {
		    	        
		    	        $("input[name=lgn_id_up]").val(lgnId);
		    	        $("input[name=lgn_nm_up]").val(lgnNm);
		    	        $("select[name=lgn_type_up]").val(lgnType);
		    	        $("input[name=cmp_nm_up]").val(cmpNm);
		    	        $("input[name=lgn_pswd_up]").val('');
		    	        $("input[name=lgn_pswdCheck_up]").val('');
		    	        
		    	        $('#userUpdatetModal').modal('show');
	    	        }
	    	    }
	    	},
	    	{ 
	    		title: "삭제",
	    		field: "delete_btn",
	    		headerSort:false,
	    		width:150, 
	    		minWidth:100, 
	    		cssClass: "text-center", 
	    		resizable:false, 
	    		headerSort:false,
	    		formatter:function(cell, formatterParams){
	    	        return "<button class='btn btn-danger-subtle btn-rounded px-2 py-1' style='font-size:12px;'><i class='uil uil-ban mr-2' style='font-style: normal; margin-right:2px;'></i>삭제</button>";
	    	    },
	    	    cellClick:function(e, cell){
	    	    	var rowData = cell.getRow().getData();
	    	        var lgnId = rowData.lgn_id; // lgn_id 값을 가져옴
	    	        var lgnNm = rowData.lgn_nm; // lgn_nm 값을 가져옴
	    	        var lgnType = rowData.lgn_type; // lgn_type 값을 가져옴
	    	        var cmpNm = rowData.cmp_nm; // cmp_nm 값을 가져옴
	    	        
	    	        if($("#login_type_top").val() >= 1 && lgnId != $("#login_id_top").val()) {
	    	        	alertify.warning('다른 사용자를 삭제 하실 수 없습니다.');
	    	        }else {
		    			
		    			alertify.confirm('사용자 삭제', '해당 사용자를 삭제 하시겠습니까?',
		    					function(){ 
		    				deletedUser(lgnId);
		    			    alertify.success('해당 사용자를 삭제했습니다.');
		    				}
		    		    , function(){ alertify.error('사용자가 "아니오"를 선택했습니다');
		    		    return});
	    	        }
	    	        
	    	        
//	    	        if (!confirm("관리자를 삭제 하시겠습니까?", `deletedUser("`+lgnId+`")"`)) {
//	    	            //alert("취소(아니오)를 누르셨습니다.");
//	    	        } else {
//	    	            //alert("확인(예)을 누르셨습니다.");
//	    	            ;
//	    	        }
	    	    }
	    	},

	    ]
	});	
}