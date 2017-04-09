$(function() {
    // 获取当前页面的链接
    var url = window.location;
    // 页面初始化的时候，获取上一个页面传递过来的参数
    window.brandName = getUrlParam(url, 'brandName').replace("#", '');
    window.brandtitleid = getUrlParam(url, 'brandtitleid');

    //将当前面包屑的名字渲染到页面上来
    loadText(brandName);
    // 通过ajax获取品牌top前10的商品
    getBrand();
    // 通过ajax获取品牌top前10的商品的销售量
    getBrandSell();
    // 通过ajax获取评论
    getProductComm();
    
});

// 获取品牌top前10的商品(url当前页面的地址)
function getBrand() {
    // 通过ajax跨域的获取数据库传来的数据
    $.ajax({
        type: 'get',
        url: 'http://139.199.157.195:9090/api/getbrand',
        data: { 'brandtitleid': brandtitleid },
        json: 'jsonp',
        success: function(data) {
            console.log( data );
            // 通过模板获取html字符串
            var html = template("topTmp", data);
            $('main .ajaxTop').html(html);
        }
    });

}

// 获取品牌top前10的商品的销售量
function getBrandSell() {
    console.log( brandtitleid );
    // 通过ajax向后台请求数据
    $.ajax({
        type: 'get',
        url: 'http://139.199.157.195:9090/api/getbrandproductlist',
        data: { 'brandtitleid': brandtitleid},
        dataType : 'jsonp',
        success: function(data) {
            console.log( data );
            // 如果数据不为为空
            if(data.totalCount != 0){
               // 通过模板获取html字符串
               var html = template('sellTmp', data);
               // 渲染到页面上
               $('main .ajaxSell').html(html); 
               // 设置本地存储的数据 存储在有这个数据名的页面里
                var categoryid = window.localStorage.setItem("categoryid",data.result[0].categoryId);
                var categoryid = window.localStorage.setItem("category",brandName);


            }else{
                $('main .ajaxSell').addClass('no1');
                $('main .ajaxComm').addClass('no2');
            }
        }
    });

}
// 获取品牌商品的评论
function getProductComm(){
     $.ajax({
        type: 'get',
        url: 'http://139.199.157.195:9090/api/getbrandproductlist',
        data: { 'brandtitleid': brandtitleid},
        dataType : 'jsonp',
        success: function(data) {
            // 如果数据库没有数据，就返回
            if(data.result.length == 0){
                return;
            }
            var img = data.result[0].productImg;
            // 获取十大品牌第一个的产品的productId;
            var productid = data.result[0].productId;
            var pName = data.result[0].productName;
            $.ajax({
             url : 'http://139.199.157.195:9090/api/getproductcom',
             data : { 'productid': productid},
             dataType : 'jsonp',
             success: function(data){
                data.img = img;
                data.pName = pName;
                var html = template('commGoodTmp', data);
                $('.ajaxComm').html(html);

                var flag = true;
                // 当数据请求完毕之后，给每个li添加点击，将一个完整的评论显示出来
                $('.comm_con').click(function(){
                   if(flag){
                    // 移除溢出隐藏的类
                    $(this).removeClass('txt-cut5');
                }else{
                    $(this).addClass('txt-cut5');
                }
                flag = !flag;
                });
                // 点击加载跟多评论
                getMoreComm();
             }
            });
       

        }
    });

}
// 点击获取更多评论.
function getMoreComm(){
    // 页面初始化的时候只让前三条显示
    $('.comm:gt(2)').css('display','none');
    $('.btn').on('click',function(){
         $('.comm:gt(2)').css('display','block');
         $(this).css('display','none');
    })
}

// 获取上一个页面超链接传递过来的参数
function getUrlParam(url, name) {
    var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
    var matcher = pattern.exec(url);
    var items = null;
    if (matcher != null) {
        try {
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        } catch (e) {
            try {
                items = decodeURIComponent(matcher[1]);
            } catch (e) {
                items = matcher[1];
            }
        }
    }
    return items;
}

function loadText(brandName) {
    // 根据参数为我们的a标签赋值
    var allA = document.querySelectorAll('h3 a');
    allA[0].innerHTML = brandName + '哪个牌子好';
    allA[1].innerHTML = brandName + '产品销量排行';
    allA[2].innerHTML = brandName + '最新评论';
    // 为面包屑i标签赋值
    $('.buy_nav i').html(brandName);
}
