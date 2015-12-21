define(function(){
	return {
		location:function(url){
			location.href = url;
		},
		isArray:function(obj){
			return Object.prototype.toString.call(obj) === '[object Array]';
		},
		isObject:function(obj){
			return Object.prototype.toString.call(obj) === '[object Object]';
		},
		isFunction:function(obj){
			return Object.prototype.toString.call(obj) === '[object Function]';
		},
		isUndefined:function(obj){
			return Object.prototype.toString.call(obj) === '[object Undefined]';
		},
		o2a:function(obj){
			var result = [];
			for(var i in obj){
				if(obj.hasOwnProperty(i)){
					result.push(obj[i]);
				}
			}
			return result;
		},
		isIP:function(hostname){
			return hostname.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
		},
		hash:function(){
			return location.hash.replace(/^#/,'');
		}
	}
});