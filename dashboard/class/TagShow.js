define(['model/Tag','help/TagHelp','help/ModuleHelp','controller/TagNew','template','jquery','Util','model/Machine'],
function(Tag,TagHelp,MH,TagNew,template,$,Util,Machine){
	var TagShow = function(tree){
		this.ajaxNum = 0;
		this.lookInfoId = 0;
		this.hostList = {};
		this.right = $('#right');
		this.tagObject = {};
		this.bind();
		this.tree = tree;
	}
	TagShow.prototype = {
		constructor:TagShow.prototype.constructor,
		bind:function(){
			var self = this;
			this.right.delegate('.table .deleteServer','click',function(){
				if(confirm('确认删除?')){
					self.removeServer($(this).attr('data-id'));
				}
			});
			this.right.undelegate('.lookMachineInfo').delegate('.lookMachineInfo','click', function () {
				self.lookInfoId = $(this).attr('data-id');
			});
			this.right.undelegate('#tagMachine').delegate('#tagMachine','show.bs.modal', function () {
				self.loadHostInfoBody(this);
			});
			this.right.undelegate('.gotoTagInTag').delegate('.gotoTagInTag','click',function(){
				self.gotoTag($(this).attr('data-id'));
			});
			this.right.undelegate('.disableMachine').delegate('.disableMachine','click', function () {
				Machine.setDisable($(this).attr('data-id'),function(){
					self.getMachines(self.tagId);
				});
			});
			this.right.undelegate('.enableMachine').delegate('.enableMachine','click', function () {
				Machine.setEnable($(this).attr('data-id'),function(){
					self.getMachines(self.tagId);
				});
			});
		},
		loadHostInfoBody:function(mymodal){
			var self = this;
			var data = this.hostList[this.lookInfoId];
			MH.loadHtml('tag/tag',function(html){
				var html = $(html);
				var render = template.compile(html.find('#tagMachineInfoTemplate').html());
				$(mymodal).find('.modal-body').html(render(data));
			});
		},
		removeServer:function(machineId){
			var self = this;
			Tag.delMachines(self.tagId,machineId,function(json){
				self.getMachines(self.tagId);
			});
		},
		setTagId:function(tagId){
			this.tagObject = {};
			this.tagId = tagId;
			this.getFullName(tagId);
			this.getMachines(tagId);
			this.getService(tagId);
		},
		getFullName:function(tagId){
			var self = this;
			Tag.getFullName(tagId,function(json){
				self.tagObject.fullName = json.result[tagId];
				self.tagObject.sfullName = json.result[tagId].split('_').pop();
				self.render();
			});
		},
		getMachines:function(tagId){
			var self = this;
			TagHelp.getMachinesByTagId(tagId,function(json){
				for(var i=0;i<json.result.length;i++){
					self.hostList[json.result[i].id] = json.result[i];
				}
				self.tagObject.machines = json.result;
				self.render();
			})
		},
		getService:function(tagId){
			var self = this;
			Tag.getService(tagId,function(json){
				self.tagObject.service = [];
				for(var i in json.result[tagId]){
					self.tagObject.service.push(json.result[tagId][i]);
					break;
				}
				self.render();
			});
		},
		render:function(){
			var self = this;
			if(!Util.isUndefined(this.tagObject.service) && 
				!Util.isUndefined(this.tagObject.machines) && 
				!Util.isUndefined(this.tagObject.fullName)){
				MH.loadHtml('tag/tag',function(html){
					var render = template.compile($(html).find('#tagMsgHeader').html());
					self.right.find('#header').html(render(self.tagObject));
					self.right.find('#body').empty();
					new TagNew(self.tagId,self);
				});	
			}
		},
		gotoTag:function(tagId){
			var self = this;
			$('#tagMachine').modal('hide');
			setTimeout(function(){
				self.tree.openParents(tagId);
			},100);
		}
	}
	return TagShow;
});