$(function() {
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getinlanddiscount',
        dataType: 'jsonp',
        success: function(data) {
            $('.load').addClass('hide');
            var html = template('discount', data);
            $('main>ul').html(html);
            //懒加载
            $('div').lazyload({
                effect:'fadeIn'
            })
             $("img.lazy").lazyload({
              effect:"fadeIn",
              placeholder:"images/jin.gif"
             }); 
        }
    })
})