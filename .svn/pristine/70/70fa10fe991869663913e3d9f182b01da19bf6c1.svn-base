$(function(){
    $.ajax({
        url:'http://139.199.157.195:9090/api/getcoupon',
        success:function(data){
            $('.load').css('display','none');
            var html=template('list',data);
            $('main>ul').html(html);
            //懒加载
            $('ul img').lazyload({
                effect:'fadeIn',
                placeholder:'images/loading.gif'
            })
        }
    })
})