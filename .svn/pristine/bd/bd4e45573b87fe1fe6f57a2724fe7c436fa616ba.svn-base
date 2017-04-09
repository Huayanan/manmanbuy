/**
 * Created by WXH on 2017/3/31.
 */
$(function(){
        function err(){
                alert("未获得请求资源");
        }
        $.ajax({
                url:"http://139.199.157.195:9090/api/getsitenav",
                dataType:"json",
                crossDomain:true,
                error:err,
                success:function(data){
                        $("ul.navs").html( template("navs",data) );
                }
        })
})