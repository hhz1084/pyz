define(['model/Admin','template','jquery'],function(Admin,template,$){
	var User = function(){
		this.roleList = null;
		this.searchBody = $('#searchBody');
		this.right = $('#right');
		this.userRole = null;
		this.loadRole();
		this.bind();
	}
	User.prototype = {
		bind:function(){
			var self=this,searchInput=$('#userEmail');
			$('#seachUser').click(function(){
				if(searchInput.val() == ''){
					searchInput.focus();
					return;
				}
				self.searchUser(searchInput.val());
			});
			this.right.delegate('#updateUserRole','click',function(){
				self.updateUserRole();
			});
		},
		updateUserRole:function(){
			var username=null,oldRole=[],newRole=[],checkbox=$('#roleBox :checked');
			for(var i in this.userRole){
				username = i;
				break;
			}
			for(var i in this.userRole[username]){
				oldRole.push(i);
			}
			checkbox.each(function(){
				newRole.push($(this).val());
			});
			if(username == $.cookie('username')){
				for(var i=0;i<oldRole.length;i++){
					if(oldRole[i] == 1){
						oldRole.splice(i,1);
					}
				}
			}
			if(oldRole.length > 0){
				Admin.delUserBelongRole(username,oldRole,function(){
					Admin.addUserBelongRole(username,newRole,function(){});
				});
			}else{
				Admin.addUserBelongRole(username,newRole,function(){});
			}
		},
		searchUser:function(username){
			var self = this;
			this.username = username;
			Admin.getUserRole(username,function(json){
				self.userRole = json.result;
				self.renderBox(json.result[username],username);
			});
		},
		renderBox:function(data,username){
			var role = [];
			var _data = {};
			_data.username = username;
			if(username == $.cookie('username')){
				_data.isSelf = true;
			}else{
				_data.isSelf = false;
			}
			for(var i in this.roleList){
				role.push({id:i,rolename:this.roleList[i].rolename,checked:data[i] ? true:false});
			}
			_data.roles = role;
			this.searchBody.html(template('searchTemplate',_data));
		},
		loadRole:function(){
			var self = this;
			Admin.getRoleList(function(json){
				self.roleList = json.result;
			});
		}
	}
	return User;
});