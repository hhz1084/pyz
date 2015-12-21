define(['jquery','cookie'],function($){
	var logout = function(){
		$(function(){
			$('#logout').on('click',function(){
				$.removeCookie('auth',{path:'/'});
				$.removeCookie('username',{path:'/'});
				location.href = ROOT_PATH.match(/\/$/) ? ROOT_PATH : (ROOT_PATH+'/');
			});
		});
	}
	return new logout();
});