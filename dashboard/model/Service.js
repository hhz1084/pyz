define(['Api','Util'],function(API,Util){
	var Service = function(){}
	Service.prototype = {
		constructor:Service.prototype.constructor,
		addNew:function(name,describ,successCall,errorCall){
			var param = [];
			param.push({name:name,describ:describ});
			console.log(param);
			API.post('service.addnew',param,successCall,errorCall);
		},
		getList:function(successCall,errorCall){
			API.post('service.getlist',[],successCall,errorCall)
		},
		update:function(serviceid,info,successCall,errorCall){
			var param = {};
			param[serviceid] = info;
			API.post('service.update',param,successCall,errorCall);
		},
		deleteService:function(serviceId,successCall,errorCall){
			var param = [];
			if(Util.isArray(serviceId)){
				param = serviceId;
			}else{
				param = [serviceId];
			}
			API.post('service.delete',param,successCall,errorCall);
		}
	}
	return new Service();
});