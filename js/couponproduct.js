var couponId = GetQueryString('couponid');
$(function () {
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getcouponproduct',
        data: {
            couponid: couponId
        },
        success: function (data) {
            $('.load').css('display', 'none');
            var html = template('list', data);
            $('main>ul').html(html);

            //懒加载
            $('ul img').lazyload({
                effect: 'fadeIn',
                placeholder: 'images/loading.gif'
            })
        }
    })
    //jquery代理函数
    var cuttent;
    $('main>ul').delegate('a', 'click', function (e) {
        var target = e.currentTarget;
        current = $(target);
        var src = $(target).find('img').prop('src');
        $('.layer').show().find('img.img').prop('src', src);
    })
    $('body .layer').on('click', function (e) {
        var currentImg;
        if ($(e.target).prop('class') == 'r') {
            //右边
            if (current.parent().next()[0]) {
                currentImg = $(current).parent().next().find('img').prop('src');
                current = $(current).parent().next().find('a');
                $('.layer .img').prop('src', currentImg);
            }
        } else if ($(e.target).prop('class') == 'l') {
            //左边
            if (current.parent().prev()[0]) {
                currentImg = $(current).parent().prev().find('img').prop('src');
                current = $(current).parent().prev().find('a');
                $('.layer .img').prop('src', currentImg);
            }
        } else if (e.currentTarget.nodeName.toString() == 'DIV') {
            $(this).css('display', 'none');
        }
    })
})