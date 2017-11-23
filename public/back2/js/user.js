$(function(){
  var currentPage=1;
  var pageSize=5;
  
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        $("tbody").html(template("userTpl",info));
      
        //  分页功能
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(event, originalEvent, type,page){
            currentPage=page;
            render();
          }
        });
      }
    });
  };
  
//  点击禁用启用按钮的功能
   $("tbody").on("click",".btn-click",function(){
     $("#isDeleteModal").modal("show");
     var id=$(this).parent().data("id");
     var isDelete=$(this).hasClass("btn-danger")? 0:1;
     
     $(".isDelete").off().on("click",function(){
       $.ajax({
         type:"post",
         url:"/user/updateUser",
         data:{
           data:id,
           isDelete:isDelete
         },
         success:function(info){
           console.log(info);
           if(info.success){
             $("#isDeleteModal").modal("hide");
             render();
           }
         }
       });
      
     })
     
     
     
   })
  

  
  
})