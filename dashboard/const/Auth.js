define(['jquery','model/Admin','help/AuthHelp','cookie'],function($,Admin,authHelp){
	var Auth = function(){
		var _auth = $.cookie('auth');
		if(!_auth){
			location.href = ROOT_PATH.match(/\/$/) ? ROOT_PATH : (ROOT_PATH+'/');
		}
	}
	Auth.prototype = {
		loadAuthLink:function(){
			var username = $.cookie('username'),self=this;
			if(username){
				Admin.getUserRole(username,function(json){
					if(json.result[username][1] == 'admin'){
						authHelp.loadAuthTemp();
					}
				});
			}
		}
	}
	return new Auth();
});