/**
 * Created by WXH on 2017/3/30.
 */
$(function(){
        var shopid = 0 , areaid = 0, price = "all";
        function err(){
                alert("未请求到资源");
        }
        /*请求店铺信息*/
        $.ajax({
                url:"http://139.199.157.195:9090/api/getgsshop",
                dataType:"json",
                crossDomain:true,
                success:function(data){
                        $("div.shops").html(template("shops",data));
                },
                error:err
        });
        /*请求店铺区域信息*/
        $.ajax({
                url:"http://139.199.157.195:9090/api/getgsshoparea",
                dataType:"json",
                crossDomain:true,
                success:function(data){
                       $("div.shoparea").html(template("shops",data));
                },
                error:err
        });
        /*点击弹出 或 隐藏下拉列表*/
        $("div.navs").delegate("div","click",function(){
                /*排他*/
                $(this).siblings("div").each(function(){
                        var $ul = $(this).find("ul");
                        var $i = $(this).find("i");
                        if($ul.css("display") != "none"){
                                // 收回
                                $ul.hide();
                                // 旋转箭头
                                $i.removeClass("arr_top");
                        }
                });
                /*显示*/
                $(this).find("ul").slideToggle("fast");
                /*旋转箭头*/
                $(this).find("i").toggleClass("arr_top");

        });
        /*点击 商店列表 或 区域列表 或价格列表*/
        $("div.navs").delegate("div > ul > li","click",function(){
                // 更新 shopid 和 areaid
                var father = $(this).parent().parent(), changed , sid, aid;
                if(father.hasClass("shops")){
                        sid = parseInt($(this).attr("data-shopid")) , changed = 1;
                }else if(father.hasClass("shoparea")){
                        aid = parseInt($(this).attr("data-areaid")) , changed = 2;
                }else {
                        changed = 0;
                }
                shopid = sid == 0 ? 0 : ( sid ? sid : shopid ) ,
                areaid = aid == 0 ? 0 : ( aid ? aid : shopid );
                if(changed){
                        // 更新对勾
                        $(this).addClass("current").siblings("li").removeClass("current");
                        // 更新标题
                        var title = changed == 1 ? $(this).html() : getstr($(this).html(),0,2);
                        /*需要先记录 箭头的方向*/
                        var $i = father.find("i");
                        father.find("span").html(title).append($i);
                        // 刷新商品区域
                        getproducts();
                }
        })
        getproducts();

        /*获得商品信息*/
        function getproducts(){
                $.ajax({
                        url:"http://139.199.157.195:9090/api/getgsproduct",
                        data:{"shopid":shopid,"areaid":areaid},
                        crossDomain:true,
                        dataType:"json",
                        error:err,
                        success:function(data){
                                /*渲染商品部分*/
                                $(".products").html(template("products",data));
                        }
                })
        }
});
/*模板拓展方法*/
//1.获取字符串中某个字符
template.helper("slice",getstr);
function getstr( str,a,b ){
        return str.trim().slice(a,b);
}
