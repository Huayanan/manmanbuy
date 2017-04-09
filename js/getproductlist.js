$(function(){
  var parameter,  //发送ajax是url中的参数data对象
      categoryid,  //记录分类的商品分类的ID  这是用来存放获取的当前页面
      category,  //记录分类的商品分类的名称
      pagesize,  //记录一个一个页面存放数据的大小  这是是后台规定了一个页面数据就是10
      totalCount,  //记录总共的数据条数   根据后台数据来的
      pageCount,  //记录我们计算出来的页面总数目
      cPN=1,  //记录当前页面是第几页  currentPageNumber
      isFirst=true,  //一个标记 记录页面是否是第一次发送ajax请求
      i;

  categoryid=GetQueryString("categoryid") //从当前页面的url中获取的categoryid参数，我们根据这个从其他页面传递过来的参数请求数据
  category=GetQueryString("category");  //从当前页面的url中获取的category参数，我们根据这个从其他页面传递过来的参数请求数据
  parameter={'categoryid':categoryid,'category':category}; 
  
  request(parameter); //调用发送ajax的请求方法
  
  /*点击上一页的事件  请求的数据不同根据categoryid和pageid不同而不同
  1、首先判断当前页面是否是第一页
  2、如果当前页面是第一页，弹出提示，那么当前页面数就不自减1，且直接返回不发送ajax请求
  3、如果当前页面不是第一页，那么就可以寻找上一页的数据，当前页面数就自减1
  4、拼接修改url参数，pageid就是当前页面数 ，发送ajax请求 
  5、为了点击上一页是下拉框的值联动改变，需要把当前页面数赋值给下拉框的选中项，下拉框的选中项的值就等于当前页面数
  */
  $(".prePage").on("click",function(){    
    if(cPN<=1){  
      cPN=1;
      alert("这是第一页呢");
      return;
    }
    cPN--;
    $("select").val(cPN); 

    parameter={'categoryid':categoryid,'pageid':cPN};
    request(parameter);
  });
  $(".nextPage").on("click",function(){    
    if(cPN>=pageCount){
      cPN=pageCount;
      alert("你看的真快,已经是最后一页了");
      return;
    }
    cPN++
    $("select").val(cPN); 

    parameter={'categoryid':categoryid,'pageid':cPN};
    request(parameter);
  });
  /*点击下拉框的事件，并且下拉框的值发生改变才触发请求ajax  请求的数据不同根据categoryid和pageid不同而不同
  1、下拉框值发生改变是发送ajax请求，拼接参数ajax参数data
  2、为了下拉框值改变时下次点击上一页或者下一页是从当前页开始的，所以需要把下拉框的值赋值给当前页数 
  */
  $("select").on("change",function(){
    cPN=this.value;
    console.log((this.value));
    parameter={'categoryid':categoryid,'pageid':cPN};//修改url中的参数
    request(parameter);
  });

  /*发送ajax请求方法   参数（发送ajax的url中的参数）*/
  function request(parameter){
    $.ajax({
      url: "http://mmb.ittun.com/api/getproductlist",
      data: parameter,
      type: 'get',
      dataType: 'json',
      success: function(data){
        var html=template("getproductlistID",data);
        $("section.content>ul").html(html);
        $(".nav_list>a:nth-child(3)")[0].innerText=category;
        if(isFirst){  //如果是第一次加载的时候才需要获取这些参数，并且渲染下拉框的内容
          parameter={}; //清空parameter对象，下次释放内存
          pagesize=data.pagesize;  //获取后才传过来的数据中记录页面数据数目大小的值
          totalCount=data.totalCount;
          pageCount=Math.ceil(totalCount/pagesize); //向上取整，页面总数=数据总数/一个页面的大小
          // console.log("pagesize="+pagesize+"=="+totalCount);
          html=''; //释放内存
          for(i=0;i<pageCount;i++){
            html+='<option value="'+(i+1)+'">'+(i+1)+'/'+pageCount+'</option>'
          }
          $("select").html(html);  //把字符串形式的标签渲染到页面中去
          isFirst=false;  //第一次执行完立马把标记 是第一次加载的标记改为false，即：不是第一次加载了
        }
      }
    });
  };
  /*获取url中的传递过来的参数的方法*/
  function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    //window.location.search的值就是 url中?后面的字符串，包括？号
    //就是从url地址的=开始截取字符串
    var r = window.location.search.substr(1).match(reg);
    if(r!=null){
      return  decodeURI(r[2]);  //对url中的参数进行编码，这个我们能看懂  unescape(string)这个是对我们其中的参数进行 用Unicode 字符 \u00xx 和 \uxxxx 替换这样的字符序列进行解码
    }
    return null;
  };  
})



