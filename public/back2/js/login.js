$(function(){
//  登录页的表单校验
 var $form=$("#loginForm");

  $form.bootstrapValidator({
  //字体图标的校验
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  //  各个字段的提示信息
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空!"
          },
          callback:{
            message:"用户名错误!"
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空!"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码长度要在6-12位之间!"
          },
          callback:{
            message:"密码错误!"
          }
        }
      }
    }
  });
  
//  注册表单校验成功的事件
  $form.on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$form.serialize(),
      success:function(info){
        // console.log(info);
        if(info.success){
          //成功就登录到首页
          location.href="index.html";
        };
        if(info.error==1000){
          $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
        };
        if(info.error==1001){
          $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
        
      }
    })
  })

//重置表单功能
  $(".loginFormReset").on("click",function(){
    $form.data("bootstrapValidator").resetForm();
  });
  
  
  
})