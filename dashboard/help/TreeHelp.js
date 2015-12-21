define(['jquery','model/Tag','class/TagShow','Util','jqtree'],function($,Tag,TagShow,Util){
	var rootTagId = 1;
	var TreeHelp = function(treeid,controller){
		this.resetNode = false;
		this.rootTagId = rootTagId;
		this.treeid = treeid;
		this.node = $('#'+treeid);
		this.nodeCache = {};
		this.createRoot();
		this.bindEvent();
		this.tagShow = new TagShow(this);
		this.openParentTagOnSelect = [];
		this.parentController = controller;
		
	}
	TreeHelp.prototype = {
		createRoot:function(){
			var self = this;
			Tag.search({id:this.rootTagId},function(json){
				self.replaceTree();
				self.bindEvent();
				if(json.result[self.rootTagId]){
					self.node.tree({
						autoOpen:false,
//						closedIcon:'+',
//						openedIcon:'-',
						data:[self.createNode(self.rootTagId,json.result[self.rootTagId].title)]
					});
				}
			});
		},
		bindEvent:function(){
			var self = this;
			this.node.unbind('tree.select').bind('tree.select',function(e){
				if(!self.resetNode){ //如果是重置树 什么都不做
					if(e.node){
						self.tagShow.setTagId(e.node.id);
					}else{
						self.parentController.loadDefaultPage();
					}
					if(!self.isOpen(e.node.id)){
						self.node.tree('openNode',e.node);
					}
				}
				self.resetNode = false;
			});
			this.node.unbind('tree.open').bind('tree.open',function(e){
				self.getChild(e.node);
			});
		},
		getChild:function(node){
			var self = this;
			if(!this.hasCache(node.id)){
				Tag.getChild(node.id,function(json){
					if(json.result[node.id]){
						self.createChildNode(json.result[node.id],node);
						self.nodeCache[node.id] = json.result[node.id];
					}
					/*循环打开父级*/
					self._openParentsCall();
				});
			}else{
				self._openParentsCall();
			}
		},
		createChildNode:function(nodearr,parentNode){
			for(var i=0,len=nodearr.length;i<len;i++){
				var id = nodearr[i].id;
				var label = nodearr[i].title;
				this.node.tree('appendNode',this.createNode(id,label),parentNode);
			}
		},
		updateNode:function(id,label){
			this.node.tree('updateNode',this.node.tree('getNodeById',id),label);
		},
		createNode:function(id,label){
			return {
				id:id,
				label:label
			}
		},
		hasCache:function(nodeId){
			return (typeof this.nodeCache[nodeId] != 'undefined');
		},
		findTag:function(tagName){
			var self = this;
			Tag.search({title:tagName},function(json){
				if(Util.isObject(json.result)){
					var tagId = [];
					for(var i in json.result){
						tagId.push(i);
					}
					self.openParents(tagId);
				}
			});
		},
		replaceTree:function(){
			this.node.replaceWith('<div class="tree" id="'+this.treeid+'"></div>');
			this.node = $('#'+this.treeid);
			this.nodeCache = [];
		},
		isOpen:function(nodeid){
			var stat = this.node.tree('getState');
			for(var i in stat.open_nodes){
				if(stat.open_nodes[i] == nodeid){
					return true;
				}
			}
			return false;
		},
		appendNode:function(id,label,parentNodeId){
			var parent = this.node.tree('getNodeById',parentNodeId);
			this.node.tree('appendNode',{label:label,id:id},parent);
		},
		openParents:function(tagId){
			var self = this;
			if(!Util.isArray(tagId)){
				var tagId = [tagId];
			}
			this.resetTree();
			this.openParentsNode = [];
			this.openParentTagOnSelect = tagId;
			this.openParentTagOnSelect.sort(function(a,b){
				return a > b;
			});
			Tag.getParents(tagId,function(json){
				var parentId = [];
				for(var i in json.result){
					for(var j in json.result[i]){
						if(!self._inParentArr(parentId,j)){
							parentId.push(parseInt(j));
						}
					}
				}
				parentId.sort(function(a,b){
					return a > b ? 1:-1;
				});
				self.openParentsNode = parentId;
				self._openParentsCall();
			});
			
		},
		_inParentArr:function(data,id){
			for(var i=0;i<data.length;i++){
				if(data[i] == id){
					return true;
				}
			}
			return false;
		},
		_openParentsCall:function(){
			if(this.openParentsNode){
				if(this.openParentsNode.length > 0){
					var id = this.openParentsNode.shift(),self=this;
					if(this.isOpen(id)){
						this._openParentsCall();
					}else{
						this.node.tree('openNode',this.node.tree('getNodeById',id));
					}
					return;
				}
				this.node.tree('selectNode',this.node.tree('getNodeById',this.openParentTagOnSelect.shift()));
				this.openParentTagOnSelect = [];
			}
		},
		resetTree:function(){
			this.resetNode = true;
			this.node.tree('selectNode',this.node.tree('getNodeById',this.rootTagId));
			var openNode = this.node.tree('getState').open_nodes;
			for(var i=0; i<openNode.length;i++){
				this.node.tree('closeNode',this.node.tree('getNodeById',openNode[i]));
			}
		}
	}
	return TreeHelp;
});