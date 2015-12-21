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
			this.validate = $('#validate');
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
			}else if(this.validate.val() == ''){
				this.validate.focus();
			}else{
				User.login(this.username.val(),this.password.val(),this.validate.val(),function(json){
					
				},function(json){
					self.errorMsg.html(json.msg);
					self.errorMsg.parent().css({display:'block'});
				});
			}
		}
	}
	return Login;
});