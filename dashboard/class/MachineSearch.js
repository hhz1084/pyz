define(['help/ModuleHelp','model/Machine','template','Util','bootstrap'],
function(MH,Machine,template,Util){
	var MachineSearch = function(box,controller){
		this.right = box;
		this.hostList = {};
		this.lookInfoId = 0;
		this.parentController = controller;
		this.bind();
	}
	MachineSearch.prototype = {
		constructor:MachineSearch.prototype.constructor,
		bind:function(){
			var self = this;
			this.right.undelegate('#searchHost').delegate('#searchHost','click',function(){
				self.searchHost();
			});
			this.right.undelegate('.lookinfo').delegate('.lookinfo','click', function () {
				self.lookInfoId = $(this).attr('data-id');
			});
			this.right.undelegate('#myModal').delegate('#myModal','show.bs.modal', function () {
				self.loadHostInfoBody(this);
			});
			this.right.undelegate('.disable').delegate('.disable','click', function () {
				Machine.setDisable($(this).attr('data-id'),function(){
					self.searchHost();
				});
			});
			this.right.undelegate('.enable','click').delegate('.enable','click', function () {
				Machine.setEnable($(this).attr('data-id'),function(){
					self.searchHost();
				});
			});
			this.right.undelegate('.gotoTag','click').delegate('.gotoTag','click',function(){
				self.gotoTag($(this).attr('data-id'));
			});
			this.right.undelegate('.editParentIp','dblclick').delegate('.editParentIp','dblclick',function(){
				self.editParentIp($(this));
			});
			this.right.undelegate('.editIdrac','dblclick').delegate('.editIdrac','dblclick',function(){
				self.editIdrac($(this));
			});
			this.right.undelegate('.searchByParentIp','click').delegate('.searchByParentIp','click',function(){
				$('#hostKey').val($(this).attr('data-ip'));
				$('#myModal').modal('hide');
				setTimeout(function(){
					self.searchHost();
				},100);
			});
		},
		editParentIp:function(td){
			var id = td.attr('data-id');
			var self = this;
			if(td.find('input').size() == 0){
				td.html('<input class="form-control newParentIP" value="'+this.hostList[id].parentip+'" />');
				td.undelegate('.newParentIP','blur').delegate('.newParentIP','blur',function(){
					var newIP = $(this).val();
					if(newIP != self.hostList[id].parentip){
						self.updateParentIP(id,newIP);
					}
					$(this).replaceWith('<img src="/fe/img/edit.png" style="cursor: pointer;" alt="" />'+self.hostList[id].parentip);
				});
			}
			
		},
		editIdrac:function(td){
			var id = td.attr('data-id');
			var self = this;
			if(td.find('input').size() == 0){
				td.html('<input class="form-control newIdrac" value="'+this.hostList[id].idrac+'" />');
				td.undelegate('.newIdrac','blur').delegate('.newIdrac','blur',function(){
					var newIdrac = $(this).val();
					if(newIdrac != self.hostList[id].idrac){
						self.updateIdrac(id,newIdrac);
					}
					$(this).replaceWith('<img src="/fe/img/edit.png" style="cursor: pointer;" alt="" />'+self.hostList[id].idrac);
				});
			}
			
		},
		updateIdrac:function(id,newIdrac){
			var self = this;
			Machine.updateMsg(id,{idrac:newIdrac},function(){
				self.searchHost();
			});
		},
		updateParentIP:function(id,newIP){
			var self = this;
			Machine.updateMsg(id,{parentip:newIP},function(){
				self.searchHost();
			});
		},
		loadHostInfoBody:function(mymodal){
			var self = this;
			var data = this.hostList[this.lookInfoId];
			MH.loadHtml('machine/table',function(html){
				var html = $(html);
				var render = template.compile(html.find('#infotemplate').html());
				$(mymodal).find('.modal-body').html(render(data));
			});
		},
		searchHost:function(){
			var key = $('#hostKey').val(),param = [],self=this;
			if(key == ''){
				param.push({});
			}else if(Util.isIP(key)){
				param.push({"ip":key});
			}else{
				param.push({"hostname":key});
			}
			Machine.getMsg(param,function(json){
				self.hostList = json.result;
				MH.loadHtml('machine/table',function(html){
					var html = $(html);
					var render = template.compile(html.find('#listTemplate').html());
					self.right.find('#body').html(render({list:Util.o2a(json.result)}));
				});
			});
		},
		gotoTag:function(tagId){
			var self = this;
			$('#myModal').modal('hide');
			setTimeout(function(){
				self.parentController.tree.openParents(tagId);
			},100);
		}
	}
	return MachineSearch;
});