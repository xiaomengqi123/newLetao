$(function(){
//  进度条功能
    //注册ajax全局事件
    //禁用进度环
  NProgress.configure({ showSpinner: false });
   $(document).ajaxStart(function(){
     NProgress.start();
   });
   $(document).ajaxStop(function(){
     setTimeout(function(){
       NProgress.done();
     },500);
   });
  
  //判断管理员是否登录
  if(location.href.indexOf("login.html")==-1){
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      success:function(info){
        if(info.error==400) {
          location.href = "login.html";
        };
      }
    })
  }




// 首页中的下拉列表
  $(".dropmenu").on("click",function(){
    $(".child").slideToggle();
  });
// 点击菜单按钮,全屏功能
  $(".icon-menu").on("click",function(){
    $(".lt-aside").toggleClass("now");
    $(".lt-main").toggleClass("now");
  });
//点击退出按钮,退出功能
   $(".icon-logout").on("click",function(){
     $("#logoutModal").modal("show");
      //  再注册点击事件
     $(".logout").off().on("click",function(){
       $.ajax({
         type:"get",
         url:"/employee/employeeLogout",
         success:function(info){
           console.log(info);
           if(info.success){
             location.href="login.html";
           }
         }
       });
       
     });
     
     
     
     
   })
  
  
  

  
  
  
  
})
