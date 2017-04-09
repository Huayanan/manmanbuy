createHeader();
function createHeader(){
  var html='<header>'+
              '<a href="index.html">'+
                  '<img src="images/icon/header_logo.png" alt="">'+
              '</a>'+
              '<a href="javascript:window.location=%27http://m.manmanbuy.com/download/%27" onclick="trackEvent("header下载");" title="手机app下载"></a>'+
            '</header>'+
            '<section class="searchBox">'+
              '<input type="text" placeholder="输入你想要比价的商品">'+
              '<input type="button" value="搜索">'+
            '</section>'
  document.write(html)
}