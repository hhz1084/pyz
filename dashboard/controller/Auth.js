define(['model/Admin','help/ModuleHelp','template','jquery'],
function(Admin,MH,template,$){
	var Auth = function(){
		this.right = $('#right');
		this.getAuthList();
		this.bind();
	}
	Auth.prototype = {
		constructor:Auth.prototype.constructor,
		bind:function(){
			var self = this,actionName=$('#actionName'),actionDesc=$('#actionDesc');
			$('#saveAction').click(function(){
				if(actionName.val() == ''){
					actionName.focus();
					return;
				}
				self.saveAction(actionName.val(),actionDesc.val());
			});
			this.right.delegate('.deleteAuth','click',function(){
				self.deleteAuth($(this).attr('data-id'));
			});
		},
		saveAction:function(name,desc){
			var self = this;
			Admin.addAuth(name,desc,function(json){
				$('#createAuth').modal('hide');
				self.getAuthList();
			});
		},
		getAuthList:function(){
			var self = this;
			Admin.getAuthList(function(json){
				self.right.find('tbody').html(template('authTable',{auth:json.result}));
			});
		},
		deleteAuth:function(authId){
			var self = this;
			if(confirm('确认删除?')){
				Admin.deleteAuth(authId,function(){
					self.getAuthList();
				});
			}
		}
	}
	return Auth;
});