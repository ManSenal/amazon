//功能点1：对每个注册用户名输入进行验证
uname.onblur = function(){
  if(this.validity.valueMissing){
    this.nextElementSibling.innerHTML = '用户名不能为空';
    this.nextElementSibling.className = 'msg-error';
    this.setCustomValidity('用户名不能为空');
  }else if(this.validity.tooShort){
    this.nextElementSibling.innerHTML = '用户名不能少于6位';
    this.nextElementSibling.className = 'msg-error';
    this.setCustomValidity('用户名不能少于6位');
  }else {
    this.nextElementSibling.innerHTML = '用户名格式正确';
    this.nextElementSibling.className = 'msg-success';
    this.setCustomValidity('');
  }
}
uname.onfocus = function(){
  this.nextElementSibling.innerHTML = '用户名长度在6到9位之间';
  this.nextElementSibling.className = 'msg-default';
}

//功能点3：对每个用户注册密码进行提示
upwd.onblur = function(){
  if(this.validity.valueMissing){
    this.nextElementSibling.innerHTML = '用户密码不能为空';
    this.nextElementSibling.className = 'msg-error';
    this.setCustomValidity('用户密码不能为空');
  }else if(this.validity.tooShort){
    this.nextElementSibling.innerHTML = '密码长度在6到12位之间';
    this.nextElementSibling.className = 'msg-error';
    this.setCustomValidity('密码长度在6~12位之间');
  }else {
    this.nextElementSibling.innerHTML = '用户密码格式正确';
    this.nextElementSibling.className = 'msg-success';
    this.setCustomValidity('');
  }
}
upwd.onfocus = function(){
  this.nextElementSibling.innerHTML = '密码长度在6到12位之间';
  this.nextElementSibling.className = 'msg-default';
}

/*4.对邮箱地址进行验证*/
email.onblur = function(){
  if(this.validity.valueMissing){
    this.nextElementSibling.innerHTML = '邮箱不能为空';
    this.nextElementSibling.className = 'msg-error';
    this.setCustomValidity('邮箱不能为空');
  }else if(this.validity.typeMismatch){
    this.nextElementSibling.innerHTML = '邮箱格式不正确';
    this.nextElementSibling.className = 'msg-error';
    this.setCustomValidity('邮箱格式不正确');
  }else {
    this.nextElementSibling.innerHTML = '邮箱格式正确';
    this.nextElementSibling.className = 'msg-success';
    this.setCustomValidity('');
  }
}
email.onfocus = function(){
  this.nextElementSibling.innerHTML = '请输入合法的邮箱地址';
  this.nextElementSibling.className = 'msg-default';
}
//手机输入提示
phone.onfocus = function(){
  this.nextElementSibling.innerHTML = '请输入正确格式的手机号';
  this.nextElementSibling.className = 'msg-default';
}
phone.onblur= function(){
  this.nextElementSibling.innerHTML = '';
  this.nextElementSibling.className = 'hidden';
}
//年龄输入提示
age.onfocus = function(){
  this.nextElementSibling.innerHTML = '年龄在18岁到60岁之间';
  this.nextElementSibling.className = 'msg-default';
}
phone.onblur= function(){
  this.nextElementSibling.innerHTML = '';
  this.nextElementSibling.className = 'hidden';
}
//功能点2：实现异步的提交注册信息
$('#bt-register').click(function(){
  //表单序列化，获得所有的用户输入
  var data=$('#form-register').serialize();
  //异步提交请求数据
  $.ajax({
    type:'POST',
    url:'data/user_add.php',
    data:data,
  success:function(res){
      console.log('开始处理服务器端返回的注册结果');
      if(res.msg=='succ'){
        alert('注册成功');
        location.href='productlist.html';
      }else{
        alert('注册失败')
      }
    }
  });
});