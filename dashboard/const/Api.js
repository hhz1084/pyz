define(['jquery','Util','help/loadingHelp','cookie'],function($,Util,loadingHelp){
	var constApi = {
		url:"/lianjia/machine/api",
		version:"1.0"
	}
	var Api = function(){}
	Api.prototype = {
		constructor : Api.prototype.constructor,
		post:function(method,param,successCall,errorCall){
			var self = this;
			loadingHelp.ajaxStart();
			$.ajax({
				type:"post",
				url:constApi.url,
				data:this._makeParam(method,param),
				processData:false,
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
			switch(JSON.error_code){
				case 40101:
					$.removeCookie('auth',{path:'/'});
					$.removeCookie('username',{path:'/'});
					Util.location('../index.html');
					break;
				case 40901:
					alert(JSON.error_message);
					break;
				default:
					alert(JSON.error_message);
					break;
			}
		},
		_makeParam:function(method,param,auth){
			var data = {
				version:constApi.version,
				method:method,
				auth:auth ? auth : ($.cookie('auth') ? decodeURI($.cookie('auth')) : '')
			}
			if(param){
				data.params = param;
			}else{
				data.params = {};
			}
			return JSON.stringify(data);
		}
	}
	return new Api();
});