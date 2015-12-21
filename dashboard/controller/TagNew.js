define(['model/Service','jquery','template','model/Tag','model/Machine','Util','help/ModuleHelp','help/EnterHelp'],
function(Service,$,template,Tag,Machine,Util,MH,EH){
	var TagNew = function(parentTagId,tagShow){
		this.server = [];
		this.service = [];
		this.tagShow = tagShow;
		this.parentTagId = parentTagId;
		this.serviceOneTypeDom = $('#tagservicetype');
		this.serviceTypeDom = $('#sservicetype');
		this.serverBox = $('#server-box');
		this.serviceDom = $('#showService');
		this.serviceBox = $('#service-box');
		this.tagNameDom = $('#tagname');
		this.boxDiv = '<div class="box-div"><span class="data">{{key}}</span><i index={{index}} class="delete">x</i></div>';
		this.getService();
		this.bind();
	}
	TagNew.prototype = {
		constructor:TagNew.prototype.constructor,
		getService:function(){
			var self  = this;
			Service.getList(function(json){
				self.createOption(json.result);
			});
		},
		bind:function(){
			var serverInput = $('#server'),serviceInputOne=$('#service-one'),serviceInput=$('#service'),self=this;
			$('#add-server').click(function(){
				var val = serverInput.val();
				if(val != '' && !self._in_server(val)){
					var param = [];
					if(Util.isIP(val)){
						param.push({ip:val});
					}else{
						param.push({hostname:val});
					}
					Machine.getMsg(param,function(json){
						if(Util.isArray(json.result) && json.result.length == 0){
							alert('机器不存在');
							return;
						}
						var mid = 0;
						for(var i in json.result){
							mid = i;
							break;
						}
						self.server.push({machineId:mid,hostname:val});
						self.renderServerBox();
						serverInput.val('');
						serverInput.focus();
					});
				}
			});
			$('#add-server-one').click(function(){
				var d = $('#server-one');
				var val = d.val();
				var param = [];
				if(val == '') {
					d.focus();
					return;
				}
				if(Util.isIP(val)){
					param.push({ip:val});
				}else{
					param.push({hostname:val});
				}
				Machine.getMsg(param,function(json){
					if(Util.isArray(json.result) && json.result.length == 0){
						alert('机器不存在');
						return;
					}
					var mid = 0;
					for(var i in json.result){
						mid = i;
						break;
					}
					self.addOneMachines(mid);
				});
			});
			
			$('#add-service-one').click(function(){
				var val = serviceInputOne.val();
				var name = self.serviceOneTypeDom.find("option:selected").text();
				if(val != '' && !self._in_service(name,val)){
					self.service.push({name:name,serviceId:self.serviceOneTypeDom.val(),value:val});
					self.renderServiceBox();
					serviceInputOne.val('');
					serviceInputOne.focus();
				}
			});
			$('#add-service').click(function(){
				var val = serviceInput.val();
				serviceInput.val('');
				self.addService(self.serviceTypeDom.val(),val);
			});
			$('#change').click(function(){
				self.changeTagName($(this).attr('value'),this);
			});
			$('#saveNewTag').click(function(){
				self.saveTag();
			});
			$('#deleteTag').click(function(){
				if(confirm('确认删除?')){
					self.deleteTag();
				}
			});
			self.serverBox.delegate('.delete','click',function(){
				var index = $(this).attr('index');
				self.server.splice(index,1);
				self.renderServerBox();
			});
			self.serviceBox.delegate('.delete','click',function(){
				var index = $(this).attr('index');
				self.service.splice(index,1);
				self.renderServiceBox();
			});
			self.serviceDom.delegate('.deleteService','click',function(e){
				if(confirm('确认删除?')){
					self.deleteServiceFromTag($(this).attr('serviceid'),$(this).attr('servicevalue'));
				}
			});
			new EH($('#server-one'),$('#add-server-one'));
			new EH($('#tagname'),$('#saveNewTag'));
			new EH($('#server'),$('#add-server'));
			new EH($('#service-one'),$('#add-service-one'));
			new EH($('#service'),$('#add-service'));
		},
		deleteTag:function(){
			var self = this;
			Tag.deleteTag(this.parentTagId,function(){
				self.tagShow.tree.parentController.loadDefaultPage();
				self.tagShow.tree.node.tree('removeNode',self.tagShow.tree.node.tree("getNodeById",self.parentTagId));
			});
		},
		deleteServiceFromTag:function(serviceId,serviceValue){
			var serviceInfo = {},self=this;
			serviceInfo[serviceId] = [serviceValue];
			Tag.delService(this.parentTagId,serviceInfo,function(){
				self.renderServiceTable();
			});
		},
		changeTagName:function(old,dom){
			var sinput = $(dom).siblings('input'),self = this;
			if($(dom).siblings('input').size() == 0){
				$(dom).before('<input type="text" id="newTagName" class="form-control" value="'+old+'" />').text('保存');
				new EH($('#newTagName'),$(dom));
			}else{
				var newTagName = sinput.val();
				if(newTagName == ''){
					sinput.focus();
				}else if(newTagName.match(/_/)){
					alert('tag name不能包含"_"');
					sinput.focus();
				}else{
					Tag.update(this.parentTagId,newTagName,function(json){
						self.tagShow.tree.updateNode(self.parentTagId,newTagName);
						self.tagShow.setTagId(self.parentTagId);
					});
				}
			}
		},
		saveTag:function(){
			var self = this;
			if(this.tagNameDom.val() == ''){
				this.tagNameDom.focus();
				return;
			}
			Tag.addNew(this.parentTagId,this.tagNameDom.val(),function(json){
				var newTagId = 0;
				for(var i in json.result){
					newTagId = i;
					break;
				}
				if(self.tagShow.tree.isOpen(self.parentTagId)){
					self.tagShow.tree.appendNode(newTagId,json.result[newTagId].title,json.result[newTagId].parentid);
				}
				self.addMachines(newTagId);
				self.addOneService(newTagId);
			});
			$('#tagNew').modal('hide');
		},
		addMachines:function(newTagId){
			var mids = [];
			for(var i=0,len=this.server.length;i<len;i++){
				mids.push(this.server[i].machineId);
			}
			Tag.addMachines(newTagId,mids,function(json){
				
			});
		},
		addOneMachines:function(machineId){
			var self = this;
			Tag.addMachines(this.parentTagId,[machineId],function(json){
				self.tagShow.getMachines(self.parentTagId);
			});
		},
		addService:function(serviceId,value){
			var serviceInfo = {},self = this;
			serviceInfo[serviceId] = [value]
			Tag.addService(this.parentTagId,serviceInfo,function(){
				self.renderServiceTable();
			});
		},
		addOneService:function(newTagId){
			var serviceInfo = {};
			for(var i=0,len=this.service.length;i<len;i++){
				if(serviceInfo[this.service[i].serviceId]){
					serviceInfo[this.service[i].serviceId].push(this.service[i].value);
				}else{
					serviceInfo[this.service[i].serviceId] = [this.service[i].value];
				}
			}
			Tag.addService(newTagId,serviceInfo,function(){
				
			});
		},
		renderServerBox:function(){
			var render = template.compile(this.boxDiv);
			var html = [];
			for(var i=0,len=this.server.length;i<len;i++){
				html.push(render({key:this.server[i].hostname,index:i}));
			}
			this.serverBox.html(html.join(''));
		},
		renderServiceBox:function(){
			var render = template.compile(this.boxDiv);
			var html = [];
			for(var i=0,len=this.service.length;i<len;i++){
				html.push(render({key:this.service[i].name+"->"+this.service[i].value,index:i}));
			}
			this.serviceBox.html(html.join(''));
		},
		renderServiceTable:function(){
			var self = this;
			Tag.getService(this.parentTagId,function(json){
				var service = [];
				for(var i in json.result[self.parentTagId]){
					service.push(json.result[self.parentTagId][i]);
				}
				MH.loadHtml('tag/service',function(html){
					var render = template.compile($(html).find('#serviceTable').html());
					$('#showService tbody').html(render({service:service}));
				});
			});
		},
		_in_service:function(name,val){
			for(var i=0,len=this.service.length;i<len;i++){
				if(this.service[i].value == val && this.service[i].name == name){
					return true;
				}
			}
			return false;
		},
		_in_server:function(val){
			for(var i=0,len=this.server.length;i<len;i++){
				if(this.server[i].hostname == val){
					return true;
				}
			}
			return false;
		},
		createOption:function(options){
			var html = [];
			for(var i in options){
				html.push('<option value="'+options[i].id+'">'+options[i].name+'</option>');
			}
			$('.servicetype').html(html.join(''));
		}
	}
	return TagNew;
});