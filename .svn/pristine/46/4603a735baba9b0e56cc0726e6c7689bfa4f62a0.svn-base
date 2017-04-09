/**
 * Created by liang on 2017/3/30.
 */
 
$(function() {
    var sum = 1;
    // 获取data数据
    getSaveMoney();
   
    function getSaveMoney(num) {
        $.ajax({
            dataType: "jsonp",
            data:{pageid:num},
            url: "http://139.199.157.195:9090/api/getmoneyctrl",
            success: function(data) {
                var html = template("b-savemoney", data);
                $("#content").html(html);
                getPage(data);
            }
        })
    };

    // 动态生成option 
   
    function getPage(data){
        var counts = data.totalCount;
        var pageSize = data.pagesize;
        var pages = Math.ceil(counts/pageSize);
        var i = 1, str = "";
        while(i<=pages){
            str+="<option value="+i+">"+i+"/"+pages+"</option>";
            i++;
        }
        $("#btn-sel").html(str);
        $("#btn-sel").change(function(){
            sum = this.value;
            getAjax(sum);
        });
    // 点击下一页 获取数据且改变select的值
        // $(".down-page").click(function(){
        //     if(sum<pages){
        //         sum++;
        //         getAjax(sum);
        //         $("#btn-sel option").eq(sum-1).prop("selected","true");
        //     }
        // });
        // 点击上一页 获取数据且改变select的值
        // $(".up-page").click(function(){
        //     if(sum>1){
        //         sum--;
        //         getAjax(sum);
        //         $("#btn-sel option").eq(sum-1).prop("selected","true");
        //     }
        // });
         $(".up-page,.down-page").click(function() {
                if (this.className == "up-page") {
                    if (sum == 1) {
                        alert("这就是第一页"); 
                        return;

                    }
                    sum--;
                    $("#btn-sel option").eq(sum-1).prop("selected","true");
                } else if (this.className == "down-page") {
                    if (sum == pages) {
                        alert("没有了");
                        return;
                    }
                    sum++
                    $("#btn-sel option").eq(sum-1).prop("selected","true");
                }
                getAjax(sum);
            })
    }
    // 动态生成 商品数据
    function getAjax(num) {
        $.ajax({
            dataType: "jsonp",
            data:{pageid:num},
            url: "http://139.199.157.195:9090/api/getmoneyctrl",
            success: function(data) {
                var html = template("b-savemoney", data);
                $("#content").html(html);
            }
        })
    };


    // 返回顶部效果
    $(".get-top").click(function(){
        $("body,html").animate({scrollTop:0},500);
    })
   


})

