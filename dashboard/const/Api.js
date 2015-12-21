define(['jquery','Util','help/loadingHelp','cookie'],function($,Util,loadingHelp){
	var constApi = {
		url:"/api/api.php?",
		version:"1.0"
	}
	var Api = function(){}
	Api.prototype = {
		constructor : Api.prototype.constructor,
		post:function(module,action,param,successCall,errorCall){
			var self = this;
			loadingHelp.ajaxStart();
			$.ajax({
				type:"post",
				url:constApi.url+'m='+module+'&a='+action,
				data:param,
				//processData:false,
				complete:function(XHR,TS){
					switch(XHR.status){
						case 200:
							successCall && successCall(XHR.responseJSON);
							break;
						default:
							self.errorDo(errorCall,XHR.responseJSON);
							break;
					}
					loadingHelp.ajaxStop();
				}
			});
		},
		errorDo:function(errorCall,JSON){
			if(errorCall){
				errorCall(JSON);
			}else{
				switch(JSON.code){
					case 401:
						Util.location('/index.html');
						break;
					case 40901:
						alert(JSON.error_message);
						break;
					default:
						alert(JSON.error_message);
						break;
				}
			}
		}
	}
	return new Api();
});