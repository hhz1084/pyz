define(['Api'],function(API){
	var Machine = function(){}
	Machine.prototype = {
		constructor:Machine.prototype.constructor,
		/**
		 * @param {Object} param
		 * @param {Function} successCall
		 * @param {Function} errorCall
		 */
		getMsg:function(param,successCall,errorCall){
			API.post('machine.getmsg',param,successCall,errorCall);
		},
		/**
		 * @param {Object} hostinfo
		 * @param {Function} successCall
		 * @param {Function} errorCall
		 */
		addNew:function(hostinfo,successCall,errorCall){
			API.post('machine.addnew',[hostinfo],successCall,errorCall);
		},
		/**
		 * @param {int} hostid
		 * @param {Object} info
		 * @param {Function} successCall
		 * @param {Function} errorCall
		 */
		updateMsg:function(hostid,info,successCall,errorCall){
			var param = {};
			param[hostid] = info;
			API.post('machine.updatemsg',param,successCall,errorCall);
		},
		/**
		 * @param {int} hostid
		 * @param {Function} successCall
		 * @param {Function} errorCall
		 */
		getTags:function(hostid,successCall,errorCall){
			API.post('machine.gettags',[hostid],successCall,errorCall)
		},
		/**
		 * @param {int} hostid
		 * @param {Array} tagids
		 * @param {Function} successCall
		 * @param {Function} errorCall
		 */
		addTags:function(hostid,tagids,successCall,errorCall){
			var param = {};
			param[hostid] = tagids;
			API.post('machine.addtags',param,successCall,errorCall);
		},
		/**
		 * @param {int} hostid
		 * @param {Array} tagids
		 * @param {Function} successCall
		 * @param {Function} errorCall
		 */
		delTags:function(hostid,tagids,successCall,errorCall){
			var param = {};
			param[hostid] = tagids;
			API.post('machine.deltags',param,successCall,errorCall);
		},
		/**
		 * @param {int} hostid
		 * @param {Function} successCall
		 * @param {Function} errorCall
		 */
		setEnable:function(hostid,successCall,errorCall){
			API.post('machine.setenable',[hostid],successCall,errorCall);
		},
		/**
		 * @param {int} hostid
		 * @param {Function} successCall
		 * @param {Function} errorCall
		 */
		setDisable:function(hostid,successCall,errorCall){
			API.post('machine.setdisable',[hostid],successCall,errorCall);
		}
	}
	return new Machine();
});