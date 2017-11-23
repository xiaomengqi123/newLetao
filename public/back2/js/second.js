$(function(){
  var currentPage=1;
  var pageSize=5;
  
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        $("tbody").html(template("secondTpl",info));
        
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
  
//  添加分类功能
  $(".btn-add").on("click",function(){
    $("#addModal").modal("show");
  });
  
  //  动态获取添加一级分类的列表
  $.ajax({
    type:"get",
    url:"/category/queryTopCategoryPaging",
    data:{
      page:1,
      pageSize:100
    },
    success:function(info){
      console.log(info);
        $(".dropdown-menu").html(template("categoryList",info));
    }
  });
 
  //把选到的值,添加到按钮上
  $(".dropdown-menu").on("click","a",function(){
    $(".dropdown-text").text($(this).text());
    var id=$(this).data("id");
    $("[name='categoryId']").val(id);
  });
  
  //图片上传功能
  $("#fileupload").fileupload({
    dataType:"json",
    done:function (e, data) {
      $(".uploadPic img").attr("src",data.result.picAddr);
      $("[name='brandLogo']").val(data.result.picAddr);
    }
  });
  
  $("[name='hot']").val("0");
  
//  校验表单
  var $form=$("#secondform");
  $form.bootstrapValidator({
    excluded:[],
//     //字体图标的校验
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
//     //  各个字段的提示信息
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"一级分类不能为空!"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请上传图片!"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传图片!"
          }
        }
      }
    }
  });
  
//  注册校验成功事件
  $form.on("success.form.bv",function(e){
    console.log(1111);
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$form.serialize(),
      success:function(info){
        if(info.success){
          currentPage=1;
          $("#addModal").modal("hide");
          render();
  
  
          //  重置表单
          $form[0].reset();
          $form.data("bootstrapValidator").resetForm();
          //  手动改变一级分类的值
          $(".dropdown-text").text("请选择一级分类");
          $("[name='categoryId']").val("");
          $(".uploadPic img").attr("src","./images/none.png")
          $("[name='brandLogo']").val("");
        }
      }
    })
  });
  

  

  
  
  
});
