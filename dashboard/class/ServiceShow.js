define(['model/Service','help/ModuleHelp','template','jquery'],
function(Service,MH,template,$){
	var ServiceShow = function(box){
		this.right = box;
		this.bind();
		this.getService();
		this.serviceList = null;
		this.updateId = null;
	}
	ServiceShow.prototype  = {
		constructor:ServiceShow.prototype.constructor,
		bind:function(){
			var self=this;
			this.right.delegate('.updateService','click',function(){
				self.updateId = $(this).attr('data-id');
				$('#serviceDesc').val(self.serviceList[self.updateId].describ);
			});
			this.right.delegate('#addService','click',function(){
				var name = $('#name'),describ=$('#describ');
				if(name.val() == ''){
					name.focus();return;
				}
				self.addService(name.val(),describ.val());
				name.val('');describ.val('');
			});
			this.right.delegate('#saveUpdateService','click',function(){
				var describ = $('#serviceDesc').val();
				$('#updateService').modal('hide');
				self.updateService(self.updateId,describ);
				
			});
			this.right.delegate('#selectAll','click',function(){
				self.right.find(':checkbox').prop('checked',$(this).prop('checked'));
			});
			this.right.delegate('.deleteOneService','click',function(){
				self.deleteService($(this).attr('data-id'));
			});
			this.right.delegate('#deleteMoreService','click',function(){
				var checkbox = self.right.find('.checkbox:checked');
				if(checkbox.size() == 0){
					alert('选择要删除的服务');
				}else{
					var box = [];
					checkbox.each(function(){
						box.push($(this).attr('data-id'));
					});
					self.deleteService(box);
				}
			});
		},
		getService:function(){
			var self = this;
			Service.getList(function(json){
				self.serviceList = json.result;
				MH.loadHtml('service/table',function(html){
					var render = template.compile($(html).find('#serviceTable').html());
					self.right.find('#body').html(render({services:json.result}));
				})
			});
		},
		addService:function(name,describ){
			var self = this;
			Service.addNew(name,describ,function(){
				self.getService();
			});
		},
		updateService:function(id,describ){
			var self = this;
			Service.update(id,{describ:describ},function(){
				self.getService();
			})
		},
		deleteService:function(serviceIds){
			var self = this;
			if(confirm('确认删除这些服务吗?')){
				Service.deleteService(serviceIds,function(){
					self.getService();
				});
			}
		}
	}
	return ServiceShow;
});