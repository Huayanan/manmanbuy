$(function(){
  /*这是根据折扣商品点击的商品ID生成相应的折扣商品详情页面信息
  1、首先点击商品的时候存储该商品的ID到sessionStorage中
  2、点击跳转页面后去浏览器后台获取存储的商品ID
  3、然后去后台根据商品ID获取相应的商品信息,需要传递商品ID的值
  4、获取商品信息后，使用页面中写好的模板引擎渲染出相应的HTML标签
  5、把渲染出来的html标签追加到页面相应的位置
  */


  // 获取一个浏览器sessionStorage中存储的商品ID
  var data1=window.sessionStorage.getItem("productID");  
  $.ajax({
    url: 'http://139.199.157.195:9090/api/getmoneyctrlproduct',
    dataType: 'json',
    type: 'get',
    data: {'productid':data1},  //这是我们后台需要的参数productid，data这是我们的商品ID
    success: function(data){
      // console.log(data);
      var html=template("templateMSG",data); //使用模板引擎，需要的参数是（script标签的ID,需要渲染的数据）
      $("section.content").html(html); //把渲染出来的html标签追加到页面相应的位置
    }
  })
})