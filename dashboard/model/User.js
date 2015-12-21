define(['Api'],function(API){
	var User = function(){}
	User.prototype = {
		login:function(username,password,validate,successCall,errorCall){
			API.post('User','login',{username:username,password:password,validate:validate},function(json){
				successCall && successCall(json);
			},function(json){
				errorCall && errorCall(json);
			});
		}
	}
	return new User();
});