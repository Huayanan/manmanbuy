$(function(){


/*  导航栏加载事件*/
  $.ajax({
    url: 'http://139.199.157.195:9090/api/getindexmenu',
    type: 'get',
    dataType: 'json',
    success: function(data){
      var data=data.result;
      var tag='';
      for(var i=0;i<data.length;i++){
        tag +='<li>'+
                '<a href="'+data[i].titlehref+'">'+
                    data[i].img+
                    data[i].name+
                '</a>'+
              '</li>'
      }
      $('nav>ul').html(tag); 
    // 点击更多，显示隐藏的导航栏  
      var isShow=false; //设置标记  开始为false 即不显示
      var navLis=document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');  //获取的导航栏的所有li标签
      navLis[7].onclick=function(){   //导航栏中的更多点击事件
       if(!isShow){
         navLis[8].style.display='block';
         navLis[9].style.display='block';
         navLis[10].style.display='block';
         navLis[11].style.display='block';
         isShow=true;
       }else{
         navLis[8].style.display='none';
         navLis[9].style.display='none';
         navLis[10].style.display='none';
         navLis[11].style.display='none';
         isShow=false;
       }      
     }
    }
  })
/* 折扣商品加载事件 */
  $.ajax({
    url: 'http://139.199.157.195:9090/api/getmoneyctrl',
    type: 'get',
    dataType: 'json',
    success:function(data){
      var tag='',data=data.result,i;
      console.log(data);
      for(i=0;i<data.length;i++){
          tag +='<a href="recommenDetail.html">'+    //recommenDetail.html
                  '<div class="product-img">'+
                    data[i].productImgSm+
                  '</div>'+
                  '<div class="product-message">'+
                      '<p>'+data[i].productName+
                          '<span>'+data[i].productPinkage+'</span>'+
                      '</p>'+
                      '<p>'+
                        '<span class="product-form">'+data[i].productFrom+' |</span>'+
                        '<span class="product-time">'+data[i].productTime+'</span>'+
                        '<span class="product-comCount">'+(data[i].productComCount).replace(/[^0-9]/ig,"")+'</span>'+
                      '</p>'+
                  '</div>'+
                '</a>'
      }
      $('.recommen-product>.content').html(tag);

      var productlist=$(".recommen-product>.content>a");
      for(i=0;i<productlist.length;i++){
        productlist[i].id=data[i].productId;
        productlist[i].onclick=function(){          
          window.sessionStorage.setItem('productID',this.id);        
        }
      }


    }
  })
  
     
 
})