define(['model/Tag','model/Machine','Util'],function(Tag,Machine,Util){
	var TagHelp = function(){}
	TagHelp.prototype = {
		constructor:TagHelp.prototype.constructor,
		getMachinesByTagId:function(tagId,call){
			this.getMachinesId(tagId,call);
		},
		getMachinesId:function(tagId,call){
			var self = this;
			Tag.getMachines(tagId,function(json){
				if(json.result[tagId].length > 0){
					self.getMachindesByMachinesIds(json.result[tagId],call);
				}else{
					json.result = [];
					call&&call(json);
				}
			});
		},
		getMachindesByMachinesIds:function(ids,call){
			var param = [];
			if(!Util.isArray(ids)){
				ids = [ids];
			}
			for(var i=0,len=ids.length;i<len;i++){
				param.push({id:ids[i]});
			}
			Machine.getMsg(param,function(json){
				var result = [];
				for(var i in json.result){
					result.push(json.result[i]);
				}
				json.result = result;
				call && call(json);
			});
		}
	}
	return new TagHelp();
});