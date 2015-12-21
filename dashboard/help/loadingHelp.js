define(['jquery'],function($){
	var loadingHelp = function(){
		this.ajaxNum = 0;
		this.gif = ROOT_PATH+"/img/loading.gif";
		this.html = '<div id="loading-gif" style="position:fixed;left:0;top:0;bottom:0;right:0;z-index:9999;"><div style="filter:alpha(opacity=0);opacity:0;background:#fff;width:100%;height:100%;"></div><img style="position:absolute;left:45%;top:30%;" src="'+this.gif+'" /></div>';
	}
	loadingHelp.prototype = {
		ajaxStart:function(){
			if(this.ajaxNum == 0){
				$('body').append(this.html);
			}
			this.ajaxNum++;
		},
		ajaxStop:function(){
			this.ajaxNum--;
			if(this.ajaxNum == 0){
				$('#loading-gif').remove();
			}
		}
	}
	return new loadingHelp();
});