define(['jquery','model/User','Util'],function($,User,Util){
	var Login = function(){};
	Login.prototype = {
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			var self = this;
			this.username = $('#username');
			this.password = $('#password');
			this.errorMsg = $('#errorMsg');
			$('#login').on('click',function(){
				self.submit();
			});
		},
		submit:function(){
			var self = this;
			if(this.username.val() == ''){
				this.username.focus();
			}else if(this.password.val() == ''){
				this.password.focus();
			}else{
				User.login(this.username.val(),this.password.val(),function(json){
					$.cookie('auth',encodeURI(json.result.auth),{path:'/',expires:3600});
					$.cookie('username',self.username.val(),{path:'/',expires:3600});
					Util.location('main/index.html');
				},function(json){
					self.errorMsg.html(json.error_message);
					self.errorMsg.parent().css({display:'block'});
				});
			}
		}
	}
	return Login;
});