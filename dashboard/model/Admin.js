define(['Api','Util'],function(API,Util){
	var Admin = function(){}
	Admin.prototype = {
		constructor:Admin.prototype.constructor,
		/**
		 * @param {String} username
		 * @param {Function} successCall
		 * @param {Function} errorCall
		 */
		getUserAuth:function(username,successCall,errorCall){
			API.post('admin.getuserauth',[username],successCall,errorCall);
		},
		/**
		 * @param {String} username
		 * @param {Function} successCall
		 * @param {Function} errorCall
		 */
		getUserRole:function(username,successCall,errorCall){
			API.post('admin.getuserrole',[username],successCall,errorCall);
		},
		getUserList:function(successCall,errorCall){
			API.post('admin.getuserlist',null,successCall,errorCall);
		},
		getAuthList:function(successCall,errorCall){
			API.post('admin.getauthlist','',successCall,errorCall);
		},
		getRoleList:function(successCall,errorCall){
			API.post('admin.getrolelist',null,successCall,errorCall);
		},
		addAuth:function(actname,describ,successCall,errorCall){
			var param = [];
			if(Util.isArray(actname)){
				for(var i=0;i<actname.length;i++){
					param.push({"actname":actname[i],"describ":describ[i]});
				}
			}else{
				param.push({"actname":actname,"describ":describ});
			}
			API.post('admin.addauth',param,successCall,errorCall);
		},
		addRole:function(rolename,successCall,errorCall){
			var param = [];
			if(Util.isArray(rolename)){
				for(var i=0;i<rolename.length;i++){
					param.push(rolename[i]);
				}
			}else{
				param.push(rolename);
			}
			API.post('admin.addrole',param,successCall,errorCall);
		},
		addRoleAuth:function(roleid,actids,successCall,errorCall){
			var param = {};
			if(Util.isArray(actids)){
				param[roleid] = actids;
			}else{
				param[roleid] = [actids];
			}
			API.post('admin.addroleauth',param,successCall,errorCall);
		},
		delRoleAuth:function(roleid,actids,successCall,errorCall){
			var param = {};
			if(Util.isArray(actids)){
				param[roleid] = actids;
			}else{
				param[roleid] = [actids];
			}
			API.post('admin.delroleauth',param,successCall,errorCall);
		},
		addUserBelongRole:function(usernames,roleid,successCall,errorCall){
			var param = {};
			if(Util.isArray(usernames)){
				for(var i=0;i<usernames.length;i++){
					param[usernames[i]] = [roleid];
				}
			}else{
				if(Util.isArray(roleid)){
					param[usernames] = roleid;
				}else{
					param[usernames] = [roleid];
				}
			}
			API.post('admin.adduserbelongrole',param,successCall,errorCall);
		},
		delUserBelongRole:function(usernames,roleid,successCall,errorCall){
			var param = {};
			if(Util.isArray(usernames)){
				for(var i=0;i<usernames.length;i++){
					param[usernames[i]] = [roleid];
				}
			}else{
				if(Util.isArray(roleid)){
					param[usernames] = roleid;
				}else{
					param[usernames] = [roleid];
				}
			}
			API.post('admin.deluserbelongrole',param,successCall,errorCall);
		},
		/**
		 * @param {Object} opt  {action:"x","username":"xx","starttime":"1435678902","endtime":"1435678902","start":0,"limit":10}
		 * @param {Function} successCall
		 * @param {Function} errorCall
		 */
		getActionLog:function(opt,successCall,errorCall){
			var param = {};
			if(opt.action){
				param.action = opt.action;
			}
			if(opt.username){
				param.username = opt.username;
			}
			if(opt.starttime){
				param.starttime = opt.starttime;
			}
			if(opt.endtime){
				param.endtime = opt.endtime;
			}
			if(opt.start){
				param.start = opt.start;
			}
			if(opt.limit){
				param.limit = opt.limit;
			}
			API.post('admin.getactionlog',param,successCall,errorCall);
		},
		deleteAuth:function(authId,successCall,errorCall){
			var param = [];
			if(Util.isArray(authId)){
				param = authId;
			}else{
				param.push(authId);
			}
			API.post('admin.deleteauth',param,successCall,errorCall);
		},
		deleteRole:function(roleId,successCall,errorCall){
			var param = [];
			if(Util.isArray(roleId)){
				param = roleId;
			}else{
				param.push(roleId);
			}
			API.post('admin.deleterole',param,successCall,errorCall);
		}
	}
	return new Admin();
});