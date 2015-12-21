define(['Api'],function(API){
	var User = function(){}
	User.prototype = {
		login:function(username,password,successCall,errorCall){
			API.post('user.login',{username:username,password:password},function(json){
				successCall && successCall(json);
			},function(json){
				errorCall && errorCall(json);
			});
		}
	}
	return new User();
});