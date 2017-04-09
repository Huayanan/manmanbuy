$(function () {
 // 中间详情  

    //调用上级页面传来的productid 参数  
    var url = window.location;   
    var productid = getUrlParam(url,"productid");
    // 获取本地存储的数据 存储在有这个数据名的页面里
    var categoryid = window.localStorage.getItem("categoryid");
    var category = window.localStorage.getItem("category");

    // 调用设置面包屑导航品牌 的字符串
    getname();

    // 请求数据
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getproduct',
        data: { productid: productid },
        dataType: 'jsonp',
        success: function (data) {
            // console.log(data);
            var html = template('detailsTmp', data); 
            $('.product-bijia').html(html);
            // 获取到面包屑导航商品类别名称的 链接 a 标签 并设置href 值  这里拼接用到了存储在本地的
            // 上个页面的一些数据以便获取到ajax数据 必须要获取到 点击时才能起到返回作用并可以获取到数据。
            var hf = $('#my_link')[0];            
            hf.href = "productlist.html?categoryid="+ categoryid +"&category="+ category +"";
        }
    });
       
    // 评价列表
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getproductcom',
        data: {productid: productid},
        dataType: 'jsonp',
        success: function (data) {
            // console.log(data);
            var html = template('plistTmp', data);
            $('.product-com-list ul').html(html);

             var flag = true;
                // 当数据请求完毕之后，给每个li添加点击，将一个完整的评论显示出来
                $('.com-comtent').click(function(){
                   if(flag){
                    // 移除溢出隐藏的类
                    $(this).removeClass('txt-cut');
                }else{
                    $(this).addClass('txt-cut');
                }
                flag = !flag;
                });
        }
    });

    // 面包屑导航中动态变化的参数和设置的方法 
        function getname(){
            // 商品种类字符串
            var my_link = $('#my_link')[0];
            if(category){
                my_link.innerHTML = category;
            }
            // productName  从url地址中传过来
            var productName = getUrlParam(url,'productName');
            //   用正则判断 截取的是字符串中第一个空格前的字符串 商品品牌
            var reg = /([^\s]+)\s.*/;
            var str = productName;
            str = str.replace(reg, "$1");
            var brand = $('#brand')[0];
            // 并设置给a 标签 
            if(str){
                brand.innerHTML = str;
            }
        }

      

});

