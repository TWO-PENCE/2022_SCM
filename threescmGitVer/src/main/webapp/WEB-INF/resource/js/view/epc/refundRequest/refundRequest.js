// 그룹코드 페이징 설정
var pageSizeDailyOrder = 5;
var pageBlockSizeDailyOrder = 10;
	
// 상세코드 페이징 설정
var pageSizeComnDtlCod = 5;
var pageBlockSizeComnDtlCod = 10;

$(function() {
	// 일일 수주 조회
	fListDailyOrderHistroy();

	// 버튼 이벤트 등록
	fRegisterButtonClickEvent();
	    
	// datePicker
	fDatePicker();
	
});

function fModelNameSearch(){
	

	let startDate = $("#startDate").val();
    let endDate = $("#endDate").val();
	
	let url = "/epc/refundrequest.do/list/order";

	let currentPage = $("#currentPageDailyOrder").val();
	
	
	let model_name_searchbar_val = $("#model_name_searchbar").val();
	
	let datePickerClieckedFlag = $("#datePickerClieckedFlag").val() * 1;
	
	var date;
	
	if(model_name_searchbar_val.replace(/\s|　/gi, "").length == 0){
		$("#model_name_searchbar").val('');
		
		if(datePickerClieckedFlag==0){
			date = {
				    currentPage: currentPage, 
				    pageSize: pageSizeDailyOrder
				};
		} else{
			
			date = {
				startDate : startDate,
				endDate : endDate,
			    currentPage: currentPage, 
			    pageSize: pageSizeDailyOrder
			};
			
		}
		
		
		
		
		var resultCallback = function(data) {
			flistDailyOrderHistroyResult(data, currentPage);
		};
		callAjax(url, "get", "text", true, date, resultCallback);
		
		
		return
	}
	

	if(datePickerClieckedFlag==0){
		date = {
			    currentPage: currentPage, 
			    pageSize: pageSizeDailyOrder,
			    pro_name : model_name_searchbar_val
			};
	} else{
		
		date = {
				startDate : startDate,
				endDate : endDate,
			    currentPage: currentPage, 
			    pageSize: pageSizeDailyOrder,
			    pro_name : model_name_searchbar_val
			};
		
	}
	
	
	
	
	var resultCallback = function(data) {
		flistDailyOrderHistroyResult(data, currentPage);
	};
	callAjax(url, "get", "text", true, date, resultCallback);
	
	
}


function fRefundNote(selected){
	
	let refund_note = selected.value;
	
	var this_row_pro_no = $(selected).parent().parent().children().eq(1).text();
	
	let already_refund_note = $(".refund_list_"+this_row_pro_no).find('.fd_refund_note').val();
	
	if(already_refund_note != null || already_refund_note != undefined){
		$(".refund_list_"+this_row_pro_no).find('.fd_refund_note').val(refund_note);
		return
	}
	
	
	$(".refund_list_"+this_row_pro_no).append("<input type='hidden' class='fd_refund_note' value='"+refund_note+"'>");
	
}

function fRequestRefundUserInfo(){
	
	  var resultCallback = function(data) {
		  $("#refundBankInfo").text(data.refundUserInfo.bank_name + ", " + data.refundUserInfo.user_account + ", " + data.refundUserInfo.name + " 님");
		  $("#refundAddressInfo").text(data.refundUserInfo.user_address);
	  };
	  
	  callAjax("/epc/refundrequest.do/user/refund", "get", "json", true, null, resultCallback);
}

function faddRefundBtn(){
	
	$("#refundDetails").children().remove();
	
	$("#refund_tbody").children().remove();
	
	
	// 환불 사용자 정보 조회
	fRequestRefundUserInfo();
	
	
	
	let checkLength = $('input[name=refundCheck]:checked').length;
	
	if(checkLength == 0){
		swal("반품을 원하시는 제품을 체크해주세요.");
		return
	}
	
	var order_no = order_no = $("#orderDetailList").find('input[name=refundCheck]:checked').eq(0).parent().parent().children().eq(1).text();
	var pro_no = 1;
	var pro_name = 1;
	var refund_qty = 1;
	var refund_price = 1;
	
	var total_refund_price = 0;
	
	for(let i = 0; i < checkLength; i++){
		pro_no = $("#orderDetailList").find('input[name=refundCheck]:checked').eq(i).parent().parent().children().eq(2).text();
		pro_name = $("#orderDetailList").find('input[name=refundCheck]:checked').eq(i).parent().parent().children().eq(4).text();
		refund_qty = $("#orderDetailList").find('input[name=refundCheck]:checked').eq(i).parent().parent().children().eq(8).children().eq(0).val();
		refund_price = $("#orderDetailList").find('input[name=refundCheck]:checked').eq(i).parent().parent().children().eq(9).text();
		
		
		console.log(i+"번째 : "+" order_no : " + order_no + " pro_no : " + pro_no + 
				" refund_qty : " + refund_qty
				+ " pro_name : " + pro_name + " refund_price : " + refund_price);
		
		
		$("#refund_tbody").append("<tr>");
		
		$("#refund_tbody tr").eq(i).append("<td>" + order_no + "</td>");
		$("#refund_tbody tr").eq(i).append("<td>" + pro_no + "</td>");
		$("#refund_tbody tr").eq(i).append("<td>" + pro_name + "</td>");
		$("#refund_tbody tr").eq(i).append("<td>" + refund_qty + "</td>");
		
		$("#refund_tbody tr").eq(i).append("<td>" + 
				'<select onchange="fRefundNote(this)">'
				+'<option value="">사유 선택</option>'
				+'<option value="상품 불량">상품 불량</option>'
				+'<option value="상품 파손">상품 파손</option>'
				+'<option value="오 배송">오 배송</option>'
				+'<option value="지연 배송">지연 배송</option>'
				+'<option value="주문 착오">주문 착오</option>'
				+'<option value="상품 불만족">상품 불만족</option>'
				+'<option value="기타 사유">기타 사유</option>'
				+ '</select>' + "</td>");
		
		$("#refund_tbody tr").eq(i).append("<td>" + refund_price + "</td>");
		
		$("#refund_tbody").append("</tr>");
		
		total_refund_price = total_refund_price * 1 + refund_price * 1;
		

		$("#refundDetails").append("<div class='refund_list_"+ pro_no+"'>");

		$(".refund_list_"+pro_no).append("<input type='hidden' class='fd_order_no' value='"+order_no+"'>");
		$(".refund_list_"+pro_no).append("<input type='hidden' class='fd_pro_no' value='"+pro_no+"'>");
		$(".refund_list_"+pro_no).append("<input type='hidden' class='fd_refund_qty' value='"+refund_qty+"'>");

		$("#refundDetails").append("</div>");


	}
	
	$("#refundDirectionTotalPrice").text(total_refund_price);
	

	$("select").chosen({no_results_text: "검색 결과가 없습니다 :("});
	
	gfModalPop("#refundDirection");
	
}


function fsendRefundInfo(){
	
	let refundLength = $('#refundDetails').children().length;
	
	var refundInfoList = new Array(refundLength);
	
	var order_no = 1;
	var pro_no = 1;
	var refund_qty = 1;
	var refund_note = 1;
	
	for(let i = 0; i < refundLength; i++){
		order_no = $("#refundDetails").children().eq(i).children().eq(0).val();
		pro_no = $("#refundDetails").children().eq(i).children().eq(1).val();
		refund_qty = $("#refundDetails").children().eq(i).children().eq(2).val();
		refund_note = $("#refundDetails").children().eq(i).children().eq(3).val();
		
		
		if(refund_note == null || refund_note == undefined || refund_note ==''){
			swal("반품 사유를 선택해 주세요.");
			return
		}
		
		var refundInfoDTO = {
				order_no : order_no,
				pro_no : pro_no,
				refund_qty : refund_qty,
				refund_note : refund_note
		};
		
		refundInfoList[i] = refundInfoDTO;
		
		console.log(i+"번째 : "+" order_no : " + refundInfoList[i].order_no + " pro_no : " + refundInfoList[i].pro_no + 
				" refund_qty : " + refundInfoList[i].refund_qty + " refund_note : " + refundInfoList[i].refund_note);
	}
	

	
	let url = "/epc/refundrequest.do/direction/refund";
	
	$.ajax({
        url: url,
        contentType: 'application/json',
        dataType: "json", //json 형태의 타입
        data: JSON.stringify(refundInfoList),
        type: "POST",
        success: function(data){
        	fsendRefundInfoResult(data);
        },
        error: function(xhr, status, error){
            console.log("xhr:"+xhr+", status:"+ status + ", error:"+error);
        }
        
	});
	
}



function fsendRefundInfoResult(data){
	const result = data.result;
	if(result == 'SUCCESS'){
		swal(data.msg);
		
		fListDailyOrderHistroy();
		
		$("#orderDetailList").children().remove();
		
		
		
		gfCloseModal();
	} else if(result =='FAIL'){
		swal(data.msg);
	}
}


function fCheckBox(pro_no, order_qty, pro_price){
	
	let alreadyInputRefundQty = $("#orderDetailList").find('.'+pro_no).val();
	if(alreadyInputRefundQty !=0){
		$("#orderDetailList").find('.'+pro_no).val(0);
		$("#orderDetailList").find('.'+pro_no).parent().parent().children().eq(9).text('0');
		return;
	}

	$("#orderDetailList").find('.'+pro_no).val(order_qty);

	let refundPrice = (pro_price * 1) * (order_qty * 1);
	
	$("#orderDetailList").find('.'+pro_no).parent().parent().children().eq(9).text(refundPrice);
	
}
function numCheck(obj){
	 var num_check=/^[0-9]*$/;
		if(!num_check.test(obj)){
		return false;
	}
	return true;
}
function frefundAmount(pro_no, pro_price){
	
	var amount = $("#orderDetailList").find('.'+pro_no).val();
	
	let limitAmount = $("#orderDetailList").find('.'+pro_no).parent().parent().children().eq(6).text() * 1;
	
	$("input[id="+pro_no+"CheckBox]").prop("checked", true);
	
	if(amount <= 0){
		swal('1개 이상의 수량만 반품 가능합니다.');
		$("#orderDetailList").find('.'+pro_no).val(1);
		amount = 1;
	}
	
	if(amount > limitAmount){
		swal("주문 수량을 초과 하였습니다.");
		$("#orderDetailList").find('.'+pro_no).val(limitAmount);
		amount = limitAmount;
	}
	
	if(!numCheck(amount)){
		swal("소숫점은 입력할 수 없습니다.");
		return
	}
	
	let refundPrice = (pro_price * 1) * (amount * 1);
	
	$("#orderDetailList").find('.'+pro_no).parent().parent().children().eq(9).text(refundPrice);
}

function fSelectTR(order_no){
	
	  var param = {
			  order_no : order_no
	  };
	  
	  var resultCallback = function(data) {
		  fOrderDetailList(data);
	  };
	  // Ajax실행 방식
	  // callAjax("Url",type,return,async or sync방식,넘겨준거,값,Callback함수 이름)
	  // html로 받을거라 text
	  callAjax("/epc/refundrequest.do/list/product", "post", "text", true, param, resultCallback);
}

	/** 일별 수주 내역 조회 콜백 함수 */
function fOrderDetailList(data) {

	  // alert(data);
	  console.log(data);

	  // 기존 목록 삭제
	  $('#orderDetailList').empty();

	  var $data = $($(data).html());

	  $("#orderDetailList").append(data);
	  

}


function fDatePicker(){
    $.datepicker.setDefaults($.datepicker.regional['ko']); 
    $( "#startDate" ).datepicker({
         changeMonth: true, 
         changeYear: true,
         nextText: '다음 달',
         prevText: '이전 달', 
         dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
         dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], 
         monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
         monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
         showAnim: "slide", //애니메이션을 적용한다.
         dateFormat: "yy-mm-dd",
         maxDate: 0,                       // 선택할수있는 최소날짜, ( 0 : 오늘 이후 날짜 선택 불가)
         onClose: function( selectedDate ) {    
              //시작일(startDate) datepicker가 닫힐때
              //종료일(endDate)의 선택할수있는 최소 날짜(minDate)를 선택한 시작일로 지정
             $("#endDate").datepicker( "option", "minDate", selectedDate );
             
             var endDate = $("#endDate").val();
             fDateSearch(selectedDate, endDate);
             
             $("#datePickerClieckedFlag").val(1);
         }    

    });
    $( "#endDate" ).datepicker({
         changeMonth: true, 
         changeYear: true,
         nextText: '다음 달',
         prevText: '이전 달', 
         dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
         dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], 
         monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
         monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
         showAnim: "slide", //애니메이션을 적용한다.
         dateFormat: "yy-mm-dd",                    // 선택할수있는 최대날짜, ( 0 : 오늘 이후 날짜 선택 불가)
         onClose: function( selectedDate ) {    
             // 종료일(endDate) datepicker가 닫힐때
             // 시작일(startDate)의 선택할수있는 최대 날짜(maxDate)를 선택한 시작일로 지정
             $("#startDate").datepicker( "option", "maxDate", selectedDate );
             
             var startDate = $("#startDate").val();

             fDateSearch(startDate, selectedDate);

             $("#datePickerClieckedFlag").val(1);
         }    

    }); 
    
    $("#startDate").datepicker('setDate', 'today');
    $("#endDate").datepicker('setDate', 'today');
}

function fDateSearch(startDate, endDate){
	
	
	
	
	
	
		let url = "/epc/refundrequest.do/list/order";

		let currentPage = $("#currentPageDailyOrder").val();
		
		

		let model_name_searchbar_val = $("#model_name_searchbar").val();
		
		
		if(model_name_searchbar_val.replace(/\s|　/gi, "").length == 0){
			$("#model_name_searchbar").val('');
			
			let date = {
					startDate : startDate,
					endDate : endDate,
				    currentPage: currentPage, 
				    pageSize: pageSizeDailyOrder
				};
			
			var resultCallback = function(data) {
				flistDailyOrderHistroyResult(data, currentPage);
			};
			callAjax(url, "get", "text", true, date, resultCallback);
			
			
			return
		}
		
		
		
		let date = {
			startDate : startDate,
			endDate : endDate,
		    currentPage: currentPage, 
		    pageSize: pageSizeDailyOrder,
		    pro_name : model_name_searchbar_val
		};
		
		
		var resultCallback = function(data) {
			flistDailyOrderHistroyResult(data, currentPage);
		};
		callAjax(url, "get", "text", true, date, resultCallback);
		
		
	
}

/** 버튼 이벤트 등록 */
function fRegisterButtonClickEvent() {
	$('a[name=btn]').click(function(e) {
		e.preventDefault();

		var btnId = $(this).attr('id');

		switch (btnId) {
			case 'refundDoneBtn' :
				fsendRefundInfo();
				break;
			case 'searchBtn' :
				fModelNameSearch();
				break;
			case 'btnClosePurDir' :
			case 'btnClose' :
				gfCloseModal();
				break;
		}
	});
}


/** 일별 수주 내역 조회 */
function fListDailyOrderHistroy(currentPage) {
	

  currentPage = currentPage || 1;

  console.log("currentPage : " + currentPage);

  var param = {
    currentPage: currentPage
    , pageSize: pageSizeDailyOrder
  }

  var resultCallback = function(data) {
    flistDailyOrderHistroyResult(data, currentPage);
  };
  // Ajax실행 방식
  // callAjax("Url",type,return,async or sync방식,넘겨준거,값,Callback함수 이름)
  // html로 받을거라 text
  callAjax("/epc/refundrequest.do/list/order", "post", "text", true, param, resultCallback);
}

/** 일별 수주 내역 조회 콜백 함수 */
function flistDailyOrderHistroyResult(data, currentPage) {

  // alert(data);
  console.log(data);

  // 디테일 삭제
  $("#orderDetailList").children().remove();
  
  // 기존 목록 삭제
  $('#orderList').empty();

  var $data = $($(data).html());

  $("#orderList").append(data);

  // 총 개수 추출
  let totalCntDailyOrder = $("#totalCntDailyOrder").val();
  
  // 페이지 네비게이션 생성
  var paginationHtml = getPaginationHtml(currentPage, totalCntDailyOrder, pageSizeDailyOrder, pageBlockSizeDailyOrder, 'fListDailyOrderHistroy');
  console.log("paginationHtml : " + paginationHtml);

  $("#orderListPagination").empty().append(paginationHtml);

  // 현재 페이지 설정
  $("#currentPageDailyOrder").val(currentPage);
  
}
