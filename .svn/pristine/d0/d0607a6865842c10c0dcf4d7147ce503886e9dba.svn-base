$(function() { 
    //用getUrlParam base.js里获取url参数的方法 获取相应的值
    var url = window.location;
    var category = getUrlParam(url,'category');
    var categoryid = getUrlParam(url,'categoryid'); 
        window.localStorage.setItem("categoryid",categoryid)        
        window.localStorage.setItem("category",category);
    //调用获取面包屑导航中动态变化的参数并设置
    getname(); 
    
    // 面包屑导航中动态变化的参数和设置
    function getname(){
        var variety = $('#variety')[0];
        if(category){
            variety.innerHTML = category;
        }
   }
    var sum = 1;
    response(sum);
    // 封装 ajax
    // var pageCount;
    function response(num){
        $.ajax({        
        url:'http://139.199.157.195:9090/api/getproductlist',        
        data:{categoryid:categoryid,pageid:num},
        dataType:'jsonp',
        success:function(data){
            // console.log(data);
            var html = template('productTmp',data);
            $('.product-list ul').html(html);
            //获取数据总条数            
            getpageCount(data);
            // 获取到面包屑导航商品类别名称的 链接 a 标签 并设置href 值
            var hf = $('#variety')[0];
            // console.log(hf);
            hf.href = "productlist.html?categoryid="+ categoryid +"&category="+ category +"&pageid="+ num +"";
        }        
    });          
}
    

    // 翻页
    // 动态生成option 个数
    function getpageCount(data){        
        var pageCount = data.totalCount;
        var pagesize = data.pagesize;        
        var options = Math.ceil(pageCount / pagesize);
        var str = '';
        // console.log(options);
        for(var i=1; i<= options; i++){
             str += "<option value="+ i +">"+ i +"/"+ options +"</option>";            
        }        
        $('#selectPage').html(str);  

        $('.up , .next').on('click',function (){  
            if(this.className =='up'){
                if(sum == 1){
                    return;
                } 
                sum--;           
              $('#selectPage option').eq(sum - 1).prop('selected',true);  
            }else if(this.className == 'next'){
                if(sum == options){
                    return;
                }  
                sum++;
               $('#selectPage option').eq(sum - 1).prop('selected',true);             
            }
            response1(sum);
        });
        
        $('#selectPage').change(function(){
            sum = this.value;      
            response1(sum);            
        });       
    }

    function response1(num){
        $.ajax({        
        url:'http://139.199.157.195:9090/api/getproductlist',        
        data:{categoryid:categoryid,pageid:num},
        dataType:'jsonp',
        success:function(data){
            // console.log(data);
            var html = template('productTmp',data);
            $('.product-list ul').html(html);
            //获取数据总条数            
            // getpageCount(data);
            // 获取到面包屑导航商品类别名称的 链接 a 标签 并设置href 值
            var hf = $('#variety')[0];
            // console.log(hf);
            hf.href = "productlist.html?categoryid="+ categoryid +"&category="+ category +"&pageid="+ num +"";
        }        
    });          
}
});



