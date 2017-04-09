$(function(){
	// 通过ajax获取商品排行标题的数据
	getBrandTitle();
	// 为template添加获取数字的方法
	template.helper('getBrandName',getBrandName);
});

// 通过ajax获取商品排行标题的数据
function getBrandTitle(){
	// 发送ajax异步请求
	$.ajax({
		type : 'get',
		url : 'http://139.199.157.195:9090/api/getbrandtitle',
		dataType : 'jsonp',
		success : function(data){
			// 通过模板获取到html代码
			var html = template('brandTmp',data);
			$('.buy_main ul').html(html);
		}
	});
}


    // 截取十大排行之前的商品名称
   function getBrandName(str){
			if(str.indexOf('十大品牌')>-1){
				return str.split('十大品牌')[0];
			}
		}
 

