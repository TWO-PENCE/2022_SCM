<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>SamplePage6</title>
<!-- sweet alert import -->
<script src='${CTX_PATH}/js/sweetalert/sweetalert.min.js'></script>
<jsp:include page="/WEB-INF/view/common/common_include.jsp"></jsp:include>
<!-- sweet swal import -->
                              
<script type="text/javascript">
    var pagesize = 10;
    var pagenavisize = 5;
   
    $(document).ready(function() {
    
    	comcombo("JOBCD","samc","sel");
    	
    	
    	fn_searchlit();
    	
    	fRegisterButtonClickEvent();
   });

	/** 버튼 이벤트 등록 */
	function fRegisterButtonClickEvent() {
		$('a[name=btn]').click(function(e) {
			e.preventDefault();

			var btnId = $(this).attr('id');

			switch (btnId) {
				case 'btnSearchlist' :
					fn_searchlit();
					break;
				case 'btnReg' :
					fn_reg();
					break;	
				case 'btnSave' :
					fn_save();
					break;	
				case 'btnDelete' :
					fn_delete();
					break;		
				case 'btnClose' :
					gfCloseModal();
					break;	
			}
		});
	}
	   
	
    function fn_searchlit(pagenum) {
    	
    	pagenum = pagenum || 1;    	
    	
    	var searchoption = $("#searchoption").val();
    	var searchword = $("#searchword").val();
    	
    	var param = {
    			pagenum : pagenum,
    			pagesize : pagesize,
    			searchoption :searchoption,
    			searchword : searchword
    	}
    	
    	var listcollback = function(returndata) {
    		fn_listcallback(returndata, pagenum);
    	}
    	
    	callAjax("/sampletest/samplepage6list.do", "post", "text", true, param, listcollback);
    	
    }
    
    function fn_listcallback(returndata, pagenum) {

    	console.log("fn_listcallback : " + returndata);
    	
    	$("#listnotice").empty().append(returndata);
    	
    	var totalcnt = $("#totalcnt").val();

		var paginationHtml = getPaginationHtml(pagenum, totalcnt, pagesize, pagenavisize, 'fn_searchlit');
		console.log("paginationHtml : " + paginationHtml);
		//swal(paginationHtml);
		$("#listnation").empty().append( paginationHtml );
		
		// 현재 페이지 설정
		//$("#currentPageComnGrpCod").val(currentPage);
    	
    	
    	
    	
    	//console.log("fn_listcallback totalcnt : " + $("#totalcnt").val());
    }
    
    function fn_reg(no) {
    	
    	if( no == "" || no == null || no == undefined) {
    		$("#action").val("I");
    		
    		// 화면 초기화  
    		fn_init();
    		
    		gfModalPop("#regform");
    		
    	} else {
    		$("#action").val("U");
    		
    		//alert(no);
    		
    		// 한건처리
    		fn_selectone(no);
    		
    	}
    	
    	
    	
    }
    
    function fn_selectone(no) {
    	
       var param = {
    		   no : no    		   
       }
    	
       var selectonecollaback = function(retundata) {
    		   fn_selectoneproc(retundata);
       }	
       
       callAjax("/sampletest/samplepage6selectone.do", "post", "json", true, param, selectonecollaback);
    	
    }
    
    function fn_selectoneproc(retundata) {
    	
    	console.log("fn_selectoneproc : " +   JSON.stringify(retundata)  );
    	
    	fn_init(retundata.resultone);
    	
    }
    
    function fn_init(object) {
    	
    	if( object == "" || object == null || object == undefined) {    // 등록
    		
    		$("#action").val("I");
    		$("#title").val("");
    		$("#cont").val("");
    		$("#noticeno").val("");
    		$('#selfile').val('');
    		
    		$("#btnDelete").hide();    		
    		
    	} else {   //수정
    		
    		$("#title").val(object.ntc_title);
    		$("#cont").val(object.ntc_content);
    		$("#noticeno").val(object.ntc_no);
    		// {"ntc_no":60,"loginID":"admin","ntc_title":"zinkkiaaaaa","ntc_content":"asasaasa","ntc_regdate":"2022-02-03"}
    		$('#selfile').val('');
    		
    		if(object.file_name == null || object.file_name == "") {    			
    			$('#filedis').empty();
    		} else {
    			var jbSplit = object.file_name.split('.');
    			var insertdiv = "";
    			if(jbSplit[1] == "jpg" || jbSplit[1] == "png" || jbSplit[1] == "gif") {
    				insertdiv = "<a href='javascript:fn_filedownload()'>" + "<img style='width:200px' id='filedisimg' name='filedisimg' src='" + object.logical_path + "'>" + "</a>";
    				
    				//$('#filedisimg').attr("src",object.logical_path);
    			} else {
    				insertdiv = "<a href='javascript:fn_filedownload()'>" + object.file_name + "</a>";
    				
    				//$('#filedis').empty().append(object.file_name);
    			}
    			 
    			$('#filedis').empty().append(insertdiv);
    			
    		}
    		
    		
    		$("#btnDelete").show();   
    		gfModalPop("#regform");
    	
    	}
    	
    }
    
    function fn_save() {
    	
    	var title = $("#title").val();
    	var cont = $("#cont").val();
    	var noticeno = $("#noticeno").val();
    	var action = $("#action").val();
    	
    	var param = {
    			  title : title,
    			  cont : cont,
    			  noticeno : noticeno,
    			  action : action
          }
       	
    	var frm = document.getElementById("noticeform");
    	frm.enctype = 'multipart/form-data';
    	var fileData = new FormData(frm);
    	
          var savecollaback = function(retundata) {
    		    console.log("fn_selectoneproc : " +   JSON.stringify(retundata)  );
    		  
    		    if(retundata.result == "SUCCESS") {
    		    	alert("저장 되었습니다");
    		    	
    		    	 gfCloseModal();
    		    	 fn_searchlit();
    		    }
    		   //fn_selectoneproc(retundata);
          }	
    	 
    	 console.log("sssssssssss : " + $("#noticeform").serialize());
    	
    	 //callAjax("/sampletest/samplepage6save.do", "post", "json", true, $("#noticeform").serialize(), savecollaback); 
         //callAjax("/sampletest/samplepage6save.do", "post", "json", true, param, savecollaback);   	
         callAjaxFileUploadSetFormData("/sampletest/samplepage6save.do", "post", "json", true, fileData, savecollaback);
    }
    
    function fn_delete() {
    	
    	if(!confirm("삭제 하겠습니까?")) {
    		return;
    	}
    	
    	//$("#action").val("D");
    	
    	var noticeno = $("#noticeno").val();
    	//var action = $("#action").val();
    	
    	var param = {
    			noticeno : noticeno,
    			action : "D"
    	}
    	
    	var savecollaback = function(retundata) {
		    console.log("fn_selectoneproc : " +   JSON.stringify(retundata)  );
		  
		    if(retundata.result == "SUCCESS") {
		    	alert("삭제 되었습니다");
		    	
		    	 gfCloseModal();
		    	 fn_searchlit();
		    }
		    
		   //fn_selectoneproc(retundata);
      }	
      
      callAjax("/sampletest/samplepage6save.do", "post", "json", true, param, savecollaback);   	
    }
    
    function fn_filedownload() {
    	var params = "";
    	params += "<input type='hidden' name='no' value='"+ $("#noticeno").val() +"' />";
    	
    	jQuery("<form action='/sampletest/samplepage6download.do' method='post'>"+params+"</form>").appendTo('body').submit().remove();
    }
    
    
</script>

</head>
<body>
   <form id="noticeform">
	   <input type="hidden" name="action" id="action" value="">
	   <input type="hidden" name="noticeno" id="noticeno" value="">
	
	   <!-- 모달 배경 -->
	   <div id="mask"></div>
	
	   <div id="wrap_area">
	
	      <h2 class="hidden">header 영역</h2>
	      <jsp:include page="/WEB-INF/view/common/header.jsp"></jsp:include>
	
	      <h2 class="hidden">컨텐츠 영역</h2>
	      <div id="container">
	         <ul>
	            <li class="lnb">
	               <!-- lnb 영역 --> <jsp:include
	                  page="/WEB-INF/view/common/lnbMenu.jsp"></jsp:include> <!--// lnb 영역 -->
	            </li>
	            <li class="contents">
	               <!-- contents -->
	               <h3 class="hidden">contents 영역</h3> <!-- content -->
	               <div class="content">
	
	                  <p class="Location">
	                     <a href="../dashboard/dashboard.do" class="btn_set home">메인으로</a> <span
	                        class="btn_nav bold">Sample</span> <span class="btn_nav bold">SampleTest3
	                        </span> <a href="/sampletest/samplepage3.do" class="btn_set refresh">새로고침</a>
	                  </p>
	                  <table style="margin-top: 10px" width="100%" cellpadding="5" cellspacing="0" border="1"
	                        align="left"
	                        style="collapse; border: 1px #50bcdf;">
	                        <tr style="border: 0px; border-color: blue">
	                           <td width="80" height="25" style="font-size: 120%;">&nbsp;&nbsp;</td>
	                           <td width="50" height="25" style="font-size: 100%; text-align:left; padding-right:25px;">
	     	                       <select id="searchoption" name="searchoption" style="width: 150px;" v-model="searchKey">
										<option value="" >전체</option>
										<option value="title" >제목</option>
										<option value="cont" >내용</option>
								  </select> 
								  
								  <select id="samc" name="samc" style="width: 150px;" v-model="samc"> </select>
								  
	     	                       <input type="text" style="width: 300px; height: 25px;" id="searchword" name="searchword">                    
		                           <a href="" class="btnType blue" id="btnSearchlist" name="btn"><span>검  색</span></a>
		                           <a href="" class="btnType blue" id="btnReg" name="btn"><span>등  록</span></a>
	                           </td> 
	                           
	                        </tr>
	                     </table>   
	                      <br>
		                 <table class="col">
								<caption>caption</caption>
								<colgroup>
									<col width="6%">
									<col width="54%">
									<col width="20%">
									<col width="20%">
								</colgroup>
								<thead>
									<tr>
										<th scope="col">글번호</th>
										<th scope="col">제목</th>
										<th scope="col">등록일자</th>
										<th scope="col">작성자</th>
									</tr>
								</thead>
								<tbody id="listnotice"></tbody>
			                 </table>
	                  
	                         <div class="paging_area"  id="listnation"> </div>
	                  
	                  
	           </div> <!--// content -->
	
	               <h3 class="hidden">풋터 영역</h3>
	               <jsp:include page="/WEB-INF/view/common/footer.jsp"></jsp:include>
	            </li>
	         </ul>
	      </div>
	   </div>
	
	   <!--// 모달팝업 -->
	   <div id="regform" class="layerPop layerType2" style="width: 600px;">
	       <dl>
				<dt>
					<strong>공지사항 관리</strong>
				</dt>
				<dd class="content">
					<!-- s : 여기에 내용입력 -->
					<table class="row">
						<caption>caption</caption>
						<colgroup>
							<col width="100px">
							<col width="200PX">
							<col width="100px">
							<col width="200PX">
						</colgroup>
	
						<tbody>
							<tr>
								<th scope="row">제목 <span class="font_red">*</span></th>
								<td colspan="3"><input type="text" class="inputTxt p200" name="title" id="title" /></td>
							</tr>
							<tr>
								<th scope="row">내용 <span class="font_red">*</span></th>
								<td colspan="3">
								       <textarea id="cont" name="cont"></textarea>
	                            </td>
							</tr>
							<tr>
								<th scope="row">파일 <span class="font_red">*</span></th>
								<td> 
								       <input type="file" id=selfile" name="selfile" />
	                            </td>
								<td colspan=2> 
								       <div  id="filedis" name="filedis"> </div>
	                            </td>
							</tr>
							
						</tbody>
					</table>
	
					<!-- e : 여기에 내용입력 -->
	
					<div class="btn_areaC mt30">
						<a href="" class="btnType blue" id="btnSave" name="btn"><span>저장</span></a> 
						<a href="" class="btnType blue" id="btnDelete" name="btn"><span>삭제</span></a> 
						<a href=""	class="btnType gray"  id="btnClose" name="btn"><span>취소</span></a>
					</div>
				</dd>
			</dl>
			<a href="" class="closePop"><span class="hidden">닫기</span></a>
	   </div>
	   
 </form>  
</body>
</html>