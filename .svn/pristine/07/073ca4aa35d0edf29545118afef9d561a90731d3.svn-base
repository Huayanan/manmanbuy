function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
var id=GetQueryString('productId');


  $.ajax({
    url:'http://139.199.157.195:9090/api/getdiscountproduct',
    data:{productid:id},
    success:function(data){
      var html=template('discountItem',data);
      $('.content').html(html);
      console.log(data);
    }
  })
