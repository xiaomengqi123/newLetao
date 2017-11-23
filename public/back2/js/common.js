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
  

  
  
  
  
})
