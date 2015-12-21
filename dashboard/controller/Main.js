define(['help/TreeHelp','class/MachineSearch','help/ModuleHelp','jquery','Util','class/ServiceShow'], 
function(TreeHelp,MS,MH,$,Util,ServiceShow) {
	var Main = function() {
		this.right = $('#right');
		this.tree = null;
		this.MS = null;
		this.init();
		this.bind();
	}
	Main.prototype = {
		constructor: Main.prototype.constructor,
		init: function() {
			var hash = Util.hash();
			this.tree = new TreeHelp('tree',this);
			switch(hash){
				case 'service':
					this.loadServicePage();
					break;
				default:
					this.loadDefaultPage();
					break;
			}
		},
		bind:function(){
			var self = this,tagName = $('#tagName');
			$('#serviceBtn').click(function(){
				self.loadServicePage();
			});
			$('#searchTag').click(function(){
				if(tagName.val() == ''){
					tagName.focus();
					return;
				}
				self.searchTag(tagName.val());
			});
			$('#resetTag').click(function(){
				tagName.val('');
				self.tree.resetTree();
			})
		},
		searchTag:function(tagName){
			this.tree.findTag(tagName);
		},
		loadDefaultPage:function(){
			var self = this;
			MH.loadHtml('default/default',function(html){
				self.right.find('#header').html(html);
			});
			if(this.MS === null){
				this.MS = new MS(this.right,this);
			}
		},
		loadServicePage:function(){
			var self = this;
			MH.loadHtml('default/service',function(html){
				self.right.find('#header').html(html);
			});
			new ServiceShow(this.right);
		}
	}
	return Main;
});