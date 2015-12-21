define(['Util'],function(Util){
	var EnterHelp = function(listen,triggerBtn){
		if(Util.isArray(listen)){
			for(var i=0;i<listen.length;i++){
				this.listen(listen[i]);
			}
		}else{
			this.listen(listen);
		}
		this.btn = triggerBtn;
	}
	EnterHelp.prototype = {
		constructor:EnterHelp.prototype.constructor,
		listen:function(dom){
			var self = this;
			dom.keyup(function(e){
				if(e.keyCode == 13){
					self.trigger();
				}
			});
		},
		trigger:function(){
			this.btn.trigger('click');
		}
	}
	return EnterHelp;
});