define(['model/Admin','help/ModuleHelp','template','jquery'],
function(Admin,MH,template,$){
	var Role = function(){
		this.right = $('#right');
		this.userNameList = [];
		this.userListBox = $('#userListBox');
		this.authList = [];
		this.roleAuthList = null;
		this.getRoleList();
		this.getAuthList();
		this.authListBox = $('#authList');
		this.showRoleId = 0; //当前显示的角色id
		this.bind();
	}
	Role.prototype = {
		constructor:Role.prototype.constructor,
		bind:function(){
			var self = this,groupName=$('#groupName'),
			userName = $('#userName');
			$('#saveRole').click(function(){
				var check = [];
				var authCheckList=self.authListBox.find(':checked');
				if(groupName.val() == ''){
					groupName.focus();
					return;
				}
				authCheckList.each(function(){
					check.push($(this).val());
				});
				self.saveRole(groupName.val(),check);
			});
			$('#updateRole').click(function(){
				var checkbox = $('#showRoleAuthList :checked');
				var authList = [];
				checkbox.each(function(){
					authList.push($(this).val());
				});
				self.updateRoleAuth(authList);
				self.updateRoleUser();
				$('#showRole').modal('hide');
			});
			$('#addUser').click(function(){
				if(userName.val() == ''){
					userName.focus();
					return;
				}
				self.addUserToBox(userName.val());
				userName.val('');
			});
			this.right.delegate('.showRole','click',function(){
				self.renderShowRoleBox($(this).attr('data-id'));
			});
			this.right.delegate('.deleteRole','click',function(){
				self.deleteRole($(this).attr('data-id'));
			});
			this.userListBox.delegate('.deleteUser','click',function(){
				self.userNameList.splice($(this).attr('index'),1);
				self.renderUserBox();
			});
			$('#showRole').delegate('#addNewUser','click',function(){
				var newUserName = $('#newUserName');
				if(newUserName.val() == ''){
					newUserName.focus();
					return;
				}
				self.addNewUserToBox(newUserName.val());
				newUserName.val('');
			});
			$('#showRole').delegate('.deleteUser','click',function(){
				self.roleAuthList[self.showRoleId].users.splice($(this).attr('index'),1);
				self.renderNewUserBox();
			});
		},
		updateRoleAuth:function(newAuth){
			var self = this;
			if(this.showRoleId == 0){
				return;
			}
			this.updateRoleAuthBool = false;
			var data = this.roleAuthList[this.showRoleId];
			var oldAuth = data.authlist;
			Admin.delRoleAuth(this.showRoleId,oldAuth,function(){
				Admin.addRoleAuth(self.showRoleId,newAuth,function(){
					self.updateRoleAuthBool = true;
					if(self.updateRoleUserBool){
						self.getRoleList();
						self.getAuthList();
					}
				});
			});
		},
		updateRoleUser:function(){
			var self = this;
			if(this.showRoleId == 0){
				return;
			}
			this.updateRoleUserBool = false;
			var data = this.roleAuthList[this.showRoleId];
			var oldUser = data.userlist;
			var newUser = data.users;
			Admin.delUserBelongRole(oldUser,this.showRoleId,function(){
				Admin.addUserBelongRole(newUser,self.showRoleId,function(){
					self.updateRoleUserBool = true;
					if(self.updateRoleAuthBool){
						self.getRoleList();
						self.getAuthList();
					}
				});
			});
		},
		addNewUserToBox:function(username){
			var data = this.roleAuthList[this.showRoleId];
			for(var i=0;i<data.users.length;i++){
				if(data.users[i] == username){
					return;
				}
			}
			data.users.push(username);
			this.renderNewUserBox();
		},
		renderShowRoleBox:function(roleId){
			var data = this.roleAuthList[roleId];
			this.showRoleId = roleId;
			data.users = [];
			for(var i=0;i<data.userlist.length;i++){
				data.users.push(data.userlist[i]);
			}
			var html = template('showRoleBody',data);
			$('#showRole .modal-body').html(html);
			var table = $('#showRole .table');
			var authHtml = this.renderAuthBox(true);
			table.html(authHtml);
			for(var i=0;i<data.authlist.length;i++){
				table.find(":checkbox[value="+data.authlist[i]+"]").prop('checked',true);
			}
			this.renderNewUserBox();
		},
		renderNewUserBox:function(){
			var data = this.roleAuthList[this.showRoleId];
			var html = [];
			var box = $('#showRole .modal-body').find('#newUserListBox');
			for(var i=0;i<data.users.length;i++){
				html.push(template('userBox',{username:data.users[i],index:i}));
			}
			box.html(html.join(''));
		},
		addUserToBox:function(userName){
			if(!this._in_userList(userName)){
				this.userNameList.push(userName);
				this.renderUserBox();
			}
		},
		renderUserBox:function(){
			var html = [];
			for(var i=0;i<this.userNameList.length;i++){
				html.push(template('userBox',{username:this.userNameList[i],index:i}));
			}
			this.userListBox.html(html.join(''));
		},
		_in_userList:function(userName){
			for(var i=0;i<this.userNameList.length;i++){
				if(this.userNameList[i] == userName){
					return true;
				}
			}
			return false;
		},
		saveRole:function(rolename,authList){
			var self = this;
			Admin.addRole(rolename,function(json){
				var roleId = 0;
				for(var i in json.result){
					roleId = i;
					break;
				}
				self.saveRoleAuthUser(roleId,authList);
				self.getRoleList();
			});
		},
		saveRoleAuthUser:function(roleId,authList){
			Admin.addRoleAuth(roleId,authList);
			Admin.addUserBelongRole(this.userNameList,roleId);
			$('#createRole').modal('hide');
		},
		getRoleList:function(){
			var self = this;
			Admin.getRoleList(function(json){
				var result = [];
				for(var i in json.result){
					result.push(json.result[i]);
				}
				self.roleAuthList = json.result;
				self.right.find('tbody').html(template('roleTable',{role:result}));
			});
		},
		getAuthList:function(){
			var self = this;
			Admin.getAuthList(function(json){
				self.authList = json.result;
				self.renderAuthBox();
			});
		},
		renderAuthBox:function(isGetHtml){
			var checkbox = [];
			var html = '<tr>';
			for(var i=0,len=this.authList.length;i<len;i++){
				checkbox.push('<td><input type="checkbox" value="'+this.authList[i].id+'"/>'+this.authList[i].actname+"</td>");
				if(checkbox.length == 3){
					html+=checkbox.join('')+"</tr><tr>";
					checkbox = [];
				}
			}
			html+='</tr>';
			if(isGetHtml){
				return html;
			}
			this.authListBox.find('table').html(html)
		},
		deleteRole:function(roleId){
			var self = this;
			if(confirm('确认删除?')){
				 Admin.deleteRole(roleId,function(){
				 	self.getRoleList();
					self.getAuthList();
				 });
			}
		}
	}
	return Role;
});