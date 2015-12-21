define(['jquery'],function($){
	var AuthHelp = function(){
		this.dom = $('#top');
	}
	AuthHelp.prototype = {
		loadAuthTemp:function(){
			var self = this;
			require(['text!module/public/Auth','domReady'],function(html,domReady){
				domReady(function(){
					self.dom.prepend(html);
				});
			});
		}
	}
	return new AuthHelp();
});