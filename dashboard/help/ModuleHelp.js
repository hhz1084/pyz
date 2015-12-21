define(function(){
	var ModuleHelp = function(){}
	ModuleHelp.prototype = {
		loadHtml:function(file,call){
			require(['text!module/'+file],function(html){
				call && call('<div>'+html+'</div>');
			});
		}
	}
	return new ModuleHelp();
});