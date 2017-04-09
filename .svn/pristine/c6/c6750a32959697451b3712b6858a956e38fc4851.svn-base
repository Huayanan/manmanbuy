/*
 * @Author: Administrator
 * @Date:   2017-03-30 18:51:07
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-04-05 09:04:59
 */

'use strict';
$(function() {
    var ul = $('#ul');
    // console.log(ul);
    //导航栏的滑动事件
    topSwipe(ul);

    function topSwipe(dom) {
        var domWidth = dom.width();
        var domParentWidth = dom.parent().width();
        //缓动的距离
        var buffer = 50;
        //最大最小的位置
        var maxPosition = 0;
        var minPosition = domParentWidth - domWidth;
        //最大最小的滑动距离
        var maxSwipe = 0 + buffer;
        var minSwipe = minPosition - 50;
        //开始的位置，移动的位置，结束的位置
        var startX = 0;
        var moveX = 0;
        var endX = 0;
        //移动的距离
        var distanceX = 0;
        //现在的位置
        var currentX = 0;
        //在ul下面找到所有的li
        var li = dom.find('li');

        if (currentX < minPosition) {
            currentX = minPosition
        } else if (currentX > maxPosition) {
            currentX = maxPosition;
        }
        addTransition(dom);
        setTranslateX(dom, currentX)
            //记录开始的位置
        dom[0].addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });

        dom[0].addEventListener('touchmove', function(e) {
            moveX = e.touches[0].clientX;
            distanceX = moveX - startX;
            // removeTransition(dom);
            //如果在滑动过程中，超过最大最小的滑动距离就会在最大最小的滑动位置不能移动
            if ((currentX + distanceX) > minSwipe && (currentX + distanceX) < maxSwipe) {
                addTransition(dom);
                setTranslateX(dom, (currentX + distanceX));
            }
        });
        dom[0].addEventListener('touchend', function(e) {
            //如果滑动的距离超过滑动范围就会产生吸附现象
            if ((currentX + distanceX) > maxPosition) {
                currentX = maxPosition;
                addTransition(dom);
                setTranslateX(dom, currentX);
            }
            //小于最小定位的时候
            else if ((currentX + distanceX) < minPosition) {
                currentX = minPosition;
                addTransition(dom);
                setTranslateX(dom, currentX);
            } else {
                //记录当前滑动完成后的定位
                currentX = currentX + distanceX;
            }
        });

        function addTransition(dom) {
            dom.css('transition', "all 0.2s");
        }

        function removeTransition(dom) {
            dom.css('transition', "none");
        }

        function setTranslateX(dom, x) {
            dom.css('transform', "translateX(" + (x > 0 ? x + 5 : x - 5) + "px)");
        }
    }


    apply();
    //页面渲染包装函数
    var flag = false;
    var Data = {};

    function apply() {

        $.ajax({
            url: "http://139.199.157.195:9090/api/getbaicaijiatitle",
            dataType: 'json',
            success: function(data) {
                var html = template('naviTmp', data);
                $('#ul').html(html);
                //获得当前点击的标题,进行点击事件的绑定
                var naviTitle = $('#navigation>#ulbox>#ul>li>a');
                // $('navigation>#ulbox>#ul>li:first-child>a').css({ "color": "#e4393c" });
                $('#navigation>#ulbox>#ul>li:first-child>a').addClass('special');
                //这里需要得到titleId的数据进行下面数据的请求
                var titleId = 0;
                request(titleId);
                // console.log($("#recommend>.rec-list>img"));
                // console.log(Data);
                function request(titleId) {
                    $.ajax({
                        url: "http://139.199.157.195:9090/api/getbaicaijiaproduct?titleid=" + titleId,
                        dataType: 'json',
                        success: function(data) {
                            Data = data;
                            rander();
                            // var html = template('recTmp', data);
                            // var appendbody = $("#recommend>.rec-list");
                            $("#recommend>.rec-list img").each(function(i) {
                                // console.log(this);
                                var src = this.src;
                                $(this).removeAttr('src').attr('data-original', src);
                            });
                            $("#recommend>.rec-list img").lazyload({
                                placeholder: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4225919905,1539064374&fm=23&gp=0.jpg", //未加载前的占位图片，一般就是一些“载入中……”的gif   
                                // threshold: 50,//提前200px开始加载  
                                event: "scrollstop", //触发加载的方式为滚动条  
                                effect: "fadeIn", //带淡入的动画效果  
                                failure_limit: 5 //将 failurelimit 设为 10 ，令插件找到 10 个不在可见区域的图片时才停止搜索
                            });
                            //盒子的懒加载


                        }
                    });
                }
                naviTitle.on('click', function(e) {
                    Data = {};
                    $('#recommend>.rec-list').html(' ');
                    // console.log(Data);
                    $('#navigation>#ulbox>#ul>li>a').removeClass('special')
                    $(e.target).addClass("special");
                    //             //获得当前的titleid
                    $('#navigation>#ulbox>#ul>li:first-child>a').removeClass('special');

                    var titleId = $(this).data(titleId).titleid;
                    // console.log(titleId);
                    $.ajax({
                        url: "http://139.199.157.195:9090/api/getbaicaijiaproduct?titleid=" + titleId,
                        dataType: 'json',
                        success: function(data) {
                            // var html = template('recTmp', data);
                            // var appendbody = $(e.target).parent().parent().parent().parent().parent().find('#recommend').find('.rec-list');
                            // appendbody.html(html);

                            Data = data;
                            // console.log($(Data));

                            rander();
                            // 图片的懒加载
                            $("#recommend>.rec-list img").each(function(i) {
                                // console.log(this);
                                var src = this.src;
                                $(this).removeAttr('src').attr('data-original', src);

                            });
                            $("#recommend>.rec-list img").lazyload({
                                placeholder: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4225919905,1539064374&fm=23&gp=0.jpg", //未加载前的占位图片，一般就是一些“载入中……”的gif   
                                // threshold: 50,//提前200px开始加载  
                                event: "scrollstop", //触发加载的方式为滚动条  
                                effect: "fadeIn", //带淡入的动画效果  
                                failure_limit: 5 //将 failurelimit 设为 10 ，令插件找到 10 个不在可见区域的图片时才停止搜索
                            });



                            // console.log(Data);
                        }

                    });
                });


            }
        });
    }



    // console.log($(Data));

    $(window).scroll(function() {
        backto();
        lazyload();
    });

    $('#backtop .back').on('click', function() {
        //回到顶部的动画效果
        $('body,html').animate({ scrollTop: 0 }, 400);
    })

    function rander() {
        var newData = { result: [] };
        var leng = 5;
        if (Data.result.length <= 5) {
            leng = Data.result.length;
        }
        for (var i = 0; i < leng; i++) {
            newData.result.push(Data.result.shift());
        }
        var html = template('recTmp', newData);
        $('#recommend>.rec-list').append(html);
        flag = false;
    }



    // 返回顶部

    // backto()

    function backto() {
        if ($(window).scrollTop() > 30) {
            $('#backtop .back').stop().fadeIn(100);
        } else if ($(window).scrollTop() < 30) {
            $('#backtop .back').stop().fadeOut(200);
        }

    }

    //懒加载
    function lazyload() {
        if (Data.result.length == 0 || flag) {
            return;
        }
        var downHeight =
            $("#recommend>.rec-list").height() +
            $("#header").height() +
            $('#navigation').height() +
            $('#footer').height() -
            $(document.body).height() -
            $(window).scrollTop();
        // console.log(downHeight);
        if (downHeight < 150) {
            flag = true;
            rander();
        }
    }

})
