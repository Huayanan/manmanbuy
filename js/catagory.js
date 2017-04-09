$(function(){
  $.ajax({
    url:'http://139.199.157.195:9090/api/getcategorytitle',
    dataType: 'json',
    type: 'get',
    success: function(data){
      // data=data.result;   注意：模板引擎使用的数据是原来的数据，不需要我们另外处理  数据对象中有result，所以末班中each的是result
      var html=template("templateTT",data); //使用模板引擎渲染成页面标签，参数(模板引擎的ID,需要渲染的数据)
      $(".category>.categoryList").html(html);  //把模板引擎渲染出来的页面标签追加到页面中相应的位置
      
      var titles=$(".category>.categoryList>li>a");  //获取所有的分类按钮 是a标签
      for(var i=0;i<titles.length;i++){
        titles[i].isFirst=true;    //给所有的分类a标签按钮设置一个自定义属性用来辨别是否加载过其中的详细分类，初始默认为是真，还没有加载过

        titles[i].titleID=(data.result)[i].titleId;
        titles[i].addEventListener('click',function(){   //遍历所有的分类a标签按钮，给他们绑定点击事件
          if(this.isFirst){  //点击的时候如果还没有加载过，那么执行异步加载
            var that=this;
            $.ajax({
              url: 'http://139.199.157.195:9090/api/getcategory',
              data: {"titleid":that.titleID},   //传递参数 分类ID，获取相应的详细分类
              dataType: 'json',
              type: 'get',
              success: function(data){
                console.log(data);
                var source='<ul>'+        //模板创建，字符串拼接
                              '{{each result as value}}'+
                                '<li><a href="productlist.html">{{value.category}}</a></li>'+
                              '{{/each}}'+
                           '</ul> ';
                var render=template.compile(source);  //根据模板生成渲染函数
                var html=render(data);  //把数据传递给渲染函数，生成渲染出页面标签
                $(that).after(html);  //把渲染出的页面标签追加到页面的相应位置
                that.isFirst=false;   //数据加载出来之后当前的分类标签的详细分类就是已经加载过了，设置的标记就要修改，以后再点击就不在加载了
                
      /*点击详细分类中任意按钮，进入相应的页面，这个时候需要传递参数，
      根据点击的详细分类ID,跳转到模板页面，然后再分类模板页面根据传递的ID发送ajax请求相应的数据*/    
                //能点击这些按钮肯定是他们加载成功了，在他们加载成功的时候给他们添加点击url修改的
                var detail=$(that).next().get(0).getElementsByTagName('a'),i;//获取所有的详细分类a标签按钮
                for(i=0;i<detail.length;i++){
                  detail[i].categoryId=data.result[i].categoryId; //需要向另一个页面传递的参数 categoryId
                  detail[i].category=data.result[i].category; //需要向另一个页面传递的参数 category

                  detail[i].addEventListener('click',function(){
                    //在url后面拼接参数，即修改url
                    this.href=this.href+'?categoryid='+this.categoryId+'&category='+this.category
                    console.log(this.href); //getproductlist.html                     
                  })
                }  
              }
            })
          }else{    //点击分类标签，如果是加载过详细分类数据的
            $(this).next().toggleClass('noshow');  //判断是否存在这个隐藏的类名，如果不存在就说明是显示的，那么就加上这个隐藏的类名让他不显示，如果存在就说明当前的详细分类是隐藏的，那么就添加这个类名让他显示
          }
        })
      }
    }
  });
})