define(['Api','Util'],function(API,Util){
	var Tag = function(){}
	Tag.prototype = {
		constructor:Tag.prototype.constructor,
		addNew:function(parentid,title,successCall,errorCall){
			var param = [];
			param.push({"title":title,"parentid":parentid});
			API.post('tag.addnew',param,successCall,errorCall);
		},
		deleteTag:function(tagid,successCall,errorCall){
			API.post('tag.delete',[tagid],successCall,errorCall);
		},
		update:function(tagid,title,successCall,errorCall){
			var param = {};
			param[tagid] = {title:title};
			API.post('tag.update',param,successCall,errorCall);
		},
		search:function(opt,successCall,errorCall){
			var param = [];
			var p = {};
			if(opt.id){
				p.id = opt.id;
			}
			if(opt.title){
				p.title = opt.title;
			}
			if(opt.parentid){
				p.parentid = opt.parentid;
			}
			param.push(p);
			API.post('tag.search',param,successCall,errorCall);
		},
		getParents:function(tagid,successCall,errorCall){
			var param = [];
			if(Util.isArray(tagid)){
				param = tagid;
			}else{
				param.push(tagid);
			}
			API.post('tag.getparents',param,successCall,errorCall);
		},
		getFullName:function(tagId,successCall,errorCall){
			API.post('tag.getfullname',[tagId],successCall,errorCall);
		},
		addMachines:function(tagid,machines,successCall,errorCall){
			var param = {};
			if(Util.isArray(machines)){
				param[tagid] = machines;
			}else{
				param[tagid] = [tagid];
			}
			API.post('tag.addmachines',param,successCall,errorCall);
		},
		delMachines:function(tagid,machines,successCall,errorCall){
			var param = {};
			if(Util.isArray(machines)){
				param[tagid] = machines;
			}else{
				param[tagid] = [machines];
			}
			API.post('tag.delmachines',param,successCall,errorCall);
		},
		getMachines:function(tagId,successCall,errorCall){
			if(!Util.isArray(tagId)){
				tagId = [tagId];
			}
			API.post('tag.getmachines',tagId,successCall,errorCall);
		},
		getChild:function(tagId,successCall,errorCall){
			API.post('tag.getchild',[tagId],successCall,errorCall);
		},
		getService:function(tagId,successCall,errorCall){
			if(!Util.isArray(tagId)){
				tagId = [tagId];
			}
			API.post('tag.getservice',tagId,successCall,errorCall);
		},
		addService:function(tagId,serviceInfo,successCall,errorCall){
			var param = {};
			param[tagId] = serviceInfo;
			API.post('tag.addservice',param,successCall,errorCall);
		},
		delService:function(tagId,serviceInfo,successCall,errorCall){
			var param = {};
			param[tagId] = serviceInfo;
			API.post('tag.delservice',param,successCall,errorCall);
		}
	}
	return new Tag();
});