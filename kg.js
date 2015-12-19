/**
* 基类库
*/
/*cdn路径设置*/
CDNS = {
	data : ["http://s1.fanxing.com","http://s2.fanxing.com","http://s3.fanxing.com"],
	result : function(){
		return CDNS.data[Math.floor(Math.random()*(CDNS.data.length))];
	},
	o : "http://image.fanxing.kugou.com"
};
window.GETCDN=CDNS.result;
window.IMGHOST=CDNS.data[1];

/*为fis资源定位编写函数__uri*/
function __uri(src){
	return src;
}
String.prototype.getBytes = function() {
    var bytes = 0;
    for (var i = 0, l = this.length; i < l; i++) {
        if (this.charCodeAt(i) > 256) { bytes += 2; }
        else { bytes += 1; }
    }
    return bytes;
};

String.prototype.replaceUnicode = function() {
	var forbidUnicode = /^823[1-8]$/g;
	var deleteUnicode = this;
    for (var i=0; i<this.length; i++) {
        if ((this.charCodeAt(i).toString().match(forbidUnicode))){
			deleteUnicode = deleteUnicode.replace(deleteUnicode.substr(i,1)," ");
		}
    }
	return deleteUnicode.replace(/ /g,"");
};

String.prototype.replaceChar = function(){
	return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
};

String.prototype.trim = function(){return this.replace(/^(\s|\u3000)*|(\s|\u3000)*$/g,"");};

String.prototype.intercept = function(length, appendStr) {
    var str = this;
    str = str.trim();
    if (str.getBytes() < length) return str;
    var countLen = 0;
    var charCount = 0;
    if (appendStr.length > 0) {
        length = length - appendStr.length;
    }
    for (var i = 0; i < str.length; i++) {
        if (this.charCodeAt(i) > 256) {
            countLen += 2;
        }
        else {
            countLen += 1;
        }
        if (countLen > length) {
            break;
        }
        charCount++;
    }
    return str.substr(0, charCount) + appendStr;
};
String.prototype.encode = function(){
    return encodeURIComponent(encodeURIComponent(this));	
};
/*判断元素是否为子元素*/
if ( typeof (HTMLElement) != "undefined") {
	HTMLElement.prototype.contains = function(obj) {
		while (obj != null && typeof (obj.tagName) != "undefind") {
			if (obj == this) {
				return true;
			}
			obj = obj.parentNode;
		}
		return false;
	};
};
/*扩展数组方法，替换元素*/
Array.prototype.replace=function(reg,rpby){
	var ta=this.slice(0),d='\0';
	var str=ta.join(d);
	str=str.replace(reg,rpby);
	return str.split(d);
};
/*扩展数组方法，判断是否包含某元素*/
Array.prototype.inArray = function(e){
	for(i=0;i<this.length && this[i]!=e;i++);  
	return !(i==this.length);
};
/*扩展数组方法，删除下标为dx的某元素*/
Array.prototype.remove = function(dx) 
{ 
    if(isNaN(dx)||dx>this.length){return false;} 
    this.splice(dx,1); 
}; 
/*扩展字符串方法，改变颜色*/
/*String.prototype.color = function(color){
	return "<label style='color:"+color+"'>"+this+"</label>";
};*/
var unique = (function () {  
    var time= (new Date()).getTime()+'-', i=0;  
    return function () {  
       return time + (i++);  
    };  
})();  
  
var imgLog = function (url,_selfParmT) {  
    var data = window['imgLogData'] || (window['imgLogData'] = {});  
    var img = new Image();  
    var uid = unique(); 
    _selfParmT = _selfParmT || '&_uid=';  
    img.onload = img.onerror = function () {//销毁一些对象  
        img.onload = img.onerror = null;  
        img = null;  
        delete data[uid];  
    };
    img.src = url + _selfParmT + uid;  
}; 

function sdnClick(num, async) 
{
	/*async = async || true;
	if(async){//异步
		try {
			//setTimeout(function(){
				//(new Image()).src = "http://sdn.kugou.com/link.aspx?id=" + num + "&url=&t=" + Math.random();
				var logUrl = "http://sdn.kugou.com/link.aspx?id=" + num + "&url=";
				imgLog(logUrl);
			//},0);
		} catch (ex) { }
	} else {
		try {
			(new Image()).src = "http://sdn.kugou.com/link.aspx?id=" + num + "&url=&t=" + Math.random();
			var logUrl = "http://sdn.kugou.com/link.aspx?id=" + num + "&url=";
			imgLog(logUrl);
		} catch (ex) { }
	}
	return false;*/
};

function logClick(id, async) {
	async = async || true;
	if(async){//异步
		try {
			setTimeout(function(){
				var logUrl = "http://tj.kugou.com/front/link.php?id=" + id;
				imgLog(logUrl);
			},0);
		} catch (ex) { }
	} else {
		try {
			var logUrl = "http://tj.kugou.com/front/link.php?id=" + id;
			imgLog(logUrl);
		} catch (ex) { }
	}
};

var Kg = Kg || {
	Ver:102,
	/**
	 *浏览器判断
	 * @id UA
	 */
	UA:{
		Ie:!!document.all || /Trident/gi.test(window.navigator.appVersion),
		Ie6:!!document.all && !window.XMLHttpRequest,
		Ie7:!!document.all && /msie 7.0/gi.test(window.navigator.appVersion),
		Ie8:!!document.all && /msie 8.0/gi.test(window.navigator.appVersion),
		Ie9:!!document.all && /msie 9.0/gi.test(window.navigator.appVersion),
		Ie10:!!document.all && /msie 10.0/gi.test(window.navigator.appVersion),
		FF:/firefox/gi.test(window.navigator.userAgent),
		Opera:/opera/gi.test(window.navigator.userAgent),
		Chrom:/Chrom/gi.test(window.navigator.userAgent),
		Maxthon:/Maxthon/gi.test(window.navigator.userAgent)
	},
	/**
	 * 通过HTML元素的id获取Dom对象
	 * @id $
	 * @param {String | Object} HTML标签的id或者Dom对象，参数可多个
	 * @return {Object | Array} HTMLElement对象 或 HTMLElement对象组
	 */
	$:function(){
		var els = [];
		for(var i = 0,l = arguments.length; i < l; i++){
			var el = arguments[i];
			if(typeof el == "string") el = document.getElementById(el);
			if(l == 1) return el;
			els.push(el);				
		}
		return els;
	},
	/**
	 * 通过HTML元素的标签名获取Dom数组对象
	 * @id $T
	 * @param {String} HTML标签名称 --此项为可选
	 * @param {String | Object} HTML标签的id或者Dom对象 --此项为可选
	 * @return {Array} HTMLElement数组对象
	 */
	$T:function(tagName, el){
		var els = (this.$(el) || document).getElementsByTagName(tagName || "*");
		return this.$A(els);
	},
	/**
	 * 通过HTML元素的className获取Dom数组对象
	 * @id $C
	 * @param {String} HTML标签的class
	 * @param {String | Object} HTML标签的id或者Dom对象 --此项为可选
	 * @param {String} HTML标签名 --此项为可选
	 * @return {Array} Dom HTMLElement数组对象
	 */
	$C:function(name, el, tagName){
		var cEls = [], i =0;
		if(!!document.getElementsByClassName){
			var arr = this.$(el || document).getElementsByClassName(name);
			arr = this.$A(arr);
			if(tagName && tagName !== "*"){
				for(var l = arr.length; i < l; i++){
					(arr[i].tagName.toLowerCase() === tagName.toLowerCase()) && cEls.push(arr[i]);
				}
			} else {
				cEls = arr;
			}
		} else {
			for(var arr = this.$T(tagName, el), l = arr.length; i < l; i++){
				new RegExp("\\b" + name + "\\b","g").test(arr[i].className) && cEls.push(arr[i]);
			}
		}
		return cEls;
	},
	/**
	 * 将HTMLCOLLECTION转为ARRAY
	 * @id $A
	 * @param {String} HTMLElement对象组
	 * @return {Array} HTMLElement数组对象
	 */
	$A:function(args){
		var arr = [];
		for(var i = 0, l = args.length; i < l; i++){
			arr.push(args[i]);
		}
		return arr;
	},
	/**
	 * 继承对象（复制属性/方法）
	 * @id extend
	 * @param {Object} 被复制对象（子对象）
	 * @param {Object} 复制对象（父对象）
	 * @param {Boolean}  是否重写属性/方法
	 * @return {Object} 返回被复制对象（子对象）
	 */
	extend:function(target, souce, rewrite){
		for(var property in souce){
			if(rewrite)	target[property] = souce[property]; 
			else if(!target[property]) target[property] = souce[property]; 
		}
		return target;
	},
	/**
	 * 获取对象样式
	 * @id getStyle
	 * @param {Object} HTML标签的id或者Dom对象
	 * @param {String} 样式名字
	 * @return {String} 样式值
	 */
	getStyle:function(el,name){
		el = this.$(el);
		if(name === "float"){
			name = Kg.UA.Ie?"styleFloat":"cssFloat";
		}

		name = name.replace(/-(\w)/, function(a, b){
			return b.toUpperCase();
		});
		
		return Kg.UA.Ie?
			el.currentStyle[name]:
			window.getComputedStyle(el,null)[name];
	},
	/**
	 * 获取页面可视宽、高、滚动全高、滚动全宽、滚动高、滚动宽
	 * @id getBodySize
	 * @return {Object} 页面宽度值、高度值、滚动全高度值、滚动全宽度值、滚动高值、滚动宽值
	 */
	getBodySize:function(){
		if(document.compatMode == "BackCompat"){
			var clientH = document.body.clientHeight;
			var clientW = document.body.clientWidth;
			var scrollH = document.body.scrollHeight;
			var scrollW = document.body.scrollWidth;
			var scrollT = document.body.scrollTop;
			var scrollL = document.body.scrollLeft;
		} else if(document.compatMode == "CSS1Compat"){
			var clientH = document.documentElement.clientHeight;
			var clientW = document.documentElement.clientWidth;
			var scrollH = document.documentElement.scrollHeight;
			var scrollW = document.documentElement.scrollWidth;
			var scrollT = document.body.scrollTop || document.documentElement.scrollTop;
			var scrollL = document.body.scrollLeft || document.documentElement.scrollLeft;
		}
		return {cH:clientH,cW:clientW,sH:scrollH,sW:scrollW,sT:scrollT,sL:scrollL};
	},
	debounce:function (func, threshold, execAsap) {  
	    var timeout;  
	    return function debounced () {  
	        var obj = this, args = arguments;  
	        function delayed () {  
	            if (!execAsap)  
	            func.apply(obj, args);  
	            timeout = null;  
	        };  
	        if (timeout)  
	            clearTimeout(timeout);  
	        else if (execAsap)  
	            func.apply(obj, args);  
	        timeout = setTimeout(delayed, threshold || 100);  
	    };  
	},
	/**
	 * 获取当前元素宽度和宽度
	 * @id getBodySize
	 * @param {Object} HTML标签的id或者Dom对象
	 * @return {Object} 元素宽度和元素高度
	 */
	getElementSize:function(el){
		var oWidth,oHeight;
		oWidth = this.$(el).offsetWidth;
		oHeight = this.$(el).offsetHeight;
		return {oW:oWidth,oH:oHeight};
	},
	/**
	 * 获取HTMLElement对象与窗口边界的距离
	 * @id getXY
	 * @param {Object} HTML标签的id或者Dom对象
	 * @return {Object} 返回HTMLElement对象四边与窗口边界的距离
	 */
	getXY:function(el){
		el = this.$(el);
		var bodySize = this.getBodySize();
		var elRect = el.getBoundingClientRect();
		return {left:bodySize.sL + elRect.left,right:bodySize.sL + elRect.right,top:bodySize.sT + elRect.top,bottom:bodySize.sT + elRect.bottom};
	},
	/**
	 * 设置监听器
	 * @id addEvent
	 * @param {Object} 监听对象,HTML标签的id或者Dom对象
	 * @param {String} 监听类型
	 * @param {Function} 监听方法
	 */
	addEvent:function(obj,type,func){
		obj = this.$(obj);
		if(obj.addEventListener){
			obj.addEventListener(type,func,true);
		} else if(obj.attachEvent){
			obj.attachEvent("on" + type,func);
		} else {
			obj["on" + type] = func;
		}
	},
	/**
	 * 清除监听器
	 * @id removeEvent
	 * @param {Object} 监听对象,HTML标签的id或者Dom对象
	 * @param {String} 监听类型
	 * @param {Function} 监听方法
	 */
	removeEvent:function(obj,type,func){
		obj = this.$(obj);
		if(obj.removeEventListener){
			obj.removeEventListener(type,func,false);
		} else if(obj.detachEvent){
			obj.detachEvent("on" + type,func);
		} else {
			obj["on" + type] = null;
		}
	},
	/**
	 * 选择环境运行函数
	 * @id bind
	 * @param {Function} 执行函数
	 * @param {Object} 运行环境
	 * @return {Function} 返回一个已被绑定运行环境的函数
	 */
	bind:function(func,environment){
		var params = Array.prototype.slice.call(arguments,2);
		return function(){
			func.apply(environment,params.concat(Array.prototype.slice.call(arguments)));
		}
	},
	/**
	 * 停止事件冒泡
	 * @id stopEvent
	 * @param {Object} Event对象
	 * @return {Object} 返回Kg对象
	 */
	stopEvent:function(event){
		event = window.event || event;
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
		return this;
	},
	/**
	 * 判断检测元素是否在数组内
	 * @id inArray
	 * @param {Array} 检测所在的数组
	 * @param {All} 检测元素 注意：不要比较内容相同但内存地址不同的元素
	 * @return {Boolean} 元素是否在数组内
	 */
	inArray:function(arr, compare){
		for(var i = 0,l = arr.length; i < l; i++){
			if(arr[i] === compare)	return true
		}
		return false;
	},
	/**
	 * 判断检测元素在数组内的位置
	 * @id indexOf
	 * @param {Array} 检测所在的数组
	 * @param {All} 检测元素 注意：不要比较内容相同但内存地址不同的元素
	 * @return {Number} 元素在数组内的位置，不存在该数组就返回-1
	 */
	indexOf:function(arr, compare){
		for(var i = 0,l = arr.length; i < l; i++){
			if(arr[i] === compare)	return i;
		}
		return -1;
	},
	/**
	 * 设置对象透明度
	 * @id setOpacity
	 * @param {Object} HTML标签的id或者Dom对象
	 * @param {Nunber} 透明值
	 * @return {Object} Dom HTMLElement对象
	 */
	setOpacity:function(el, num){
		el = this.$(el);
		var useOpacity =(typeof document.createElement("div").style.opacity != 'undefined');
		var useFilter = !useOpacity && (typeof document.createElement("div").style.filter != 'undefined');
		if (useOpacity)
      		el.style.opacity = num/100;
   		else if (useFilter)
      		el.style.filter = "alpha(opacity=" + num + ")";
		return el;
	},
	/**
	 * 对象透明渐出
	 * @id fadein
	 * @param {Object} HTML标签的id或者Dom对象
	 * @param {Nunber} 延时值
	 * @param {Nunber} 透明步长
	 * @param {Function} 回调函数(可选)
	 * @return {Number} 时间器
	 */
	fadein: function(el, speed, step, callback) {
        speed = speed || 1;
        step = step || 1;
		el = this.$(el);
        var num = 0;
        var _this = this;
        var timer = setInterval(function() {
            _this.setOpacity(el, (num += step));
            if (num >= 100) {
                clearInterval(timer);
                callback && callback(el);
            }
        },speed);
        return timer;
    },
	/**
	 * 对象透明渐隐
	 * @id fadeout
	 * @param {Object} HTML标签的id或者Dom对象
	 * @param {Nunber} 延时值
	 * @param {Nunber} 透明步长
	 * @param {Function} 回调函数(可选)
	 * @return {Number} 时间器
	 */
	fadeout: function(el, speed, step, callback) {
        speed = speed || 1;
        step = step || 1;
		el = this.$(el);
        var num = 100;
        var _this = this;
        var timer = setInterval(function() {
            _this.setOpacity(el, (num -= step));
            if (num <= 0) {
                clearInterval(timer);
                callback && callback(el);
            }
        },speed);
        return timer;
    },
	/**
	 * 对象滑动
	 * @id slide
	 * @param {Object} HTML标签的id或者Dom对象
	 * @param {String} 滑动样式
	 * @param {Nunber} 开始位置
	 * @param {Nunber} 结束位置
	 * @param {Nunber} 滑动速度
	 * @param {Number} 时间器
	 */
	slide: function(el, style, start, end, speed, callback, extra) {
		el = this.$(el);
		speed = speed || 0.1;
		var prefix = "";
		var dom = el;
		
		if(style === "height" || style === "width" || style === "top" || style === "bottom" || style === "left" || style === "right" ){
			el = el.style;
			prefix = "px";
		}

        var timer = setInterval(function(){
			if (start > end) {
				start -= Math.ceil((start - end) * speed);
				el[style] = start + prefix;
				extra && extra(dom);
				if (start <= end) {
					clearInterval(timer);
					callback && callback(dom);
				}
			} else {
				start += Math.ceil((end - start) * speed);
				el[style] = start + prefix;
				extra && extra(dom);
				if (start >= end) {
					clearInterval(timer);
					callback && callback(dom);
				}
			}
		}, 1);
		return timer;
    },
	/**
	 * JSON
	 * @id JSON
	 * stringify:将字面量对象转为string
	 * parse:将string转为字面量对象
	 */
	JSON:function() {
		if(typeof JSON != 'undefined'){
			return JSON;
		}else{
			function f(n) { return n < 10 ? '0' + n : n; }
	        Date.prototype.toJSON = function() { return this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z'; };
	        var m = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' }; function stringify(value, whitelist) {
	            var a, i, k, l, r = /["\\\x00-\x1f\x7f-\x9f]/g, v; switch (typeof value) {
	                case 'string': return r.test(value) ? '"' + value.replace(r, function(a) {
	                    var c = m[a]; if (c) { return c; }
	                    c = a.charCodeAt(); return '\\u00' + Math.floor(c / 16).toString(16) +(c % 16).toString(16);
	                }) + '"' : '"' + value + '"'; case 'number': return isFinite(value) ? String(value) : 'null'; case 'boolean': case 'null': return String(value); case 'object': if (!value) { return 'null'; }
	                    if (typeof value.toJSON === 'function') { return stringify(value.toJSON()); }
	                    a = []; if (typeof value.length === 'number' && !(value.propertyIsEnumerable('length'))) {
	                        l = value.length; for (i = 0; i < l; i += 1) { a.push(stringify(value[i], whitelist) || 'null'); }
	                        return '[' + a.join(',') + ']';
	                    }
	                    if (whitelist) { l = whitelist.length; for (i = 0; i < l; i += 1) { k = whitelist[i]; if (typeof k === 'string') { v = stringify(value[k], whitelist); if (v) { a.push(stringify(k) + ':' + v); } } } } else { for (k in value) { if (typeof k === 'string') { v = stringify(value[k], whitelist); if (v) { a.push(stringify(k) + ':' + v); } } } }
	                    return '{' + a.join(',') + '}';
	            } 
	        }
	        return { stringify: stringify, parse: function(text, filter) {
	            var j; function walk(k, v) {
	                var i, n; if (v && typeof v === 'object') { for (i in v) { if (Object.prototype.hasOwnProperty.apply(v, [i])) { n = walk(i, v[i]); if (n !== undefined) { v[i] = n; } else { delete v[i]; } } } }
	                return filter(k, v);
	            }
	            if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) { j = eval('(' + text + ')'); return typeof filter === 'function' ? walk('', j) : j; }
	            throw new SyntaxError('parseJSON');
	        } 
	        };
		}
        
    }(),
	/**
	 * Cookie
	 * @id Cookie
	 */
	Cookie:{
		write: function(name, value, exp, path, domain, secure) {
			if(!/^\w*$/.test(name)) alert("cookie格式不正确");
			if(/; /.test(value)) alert("cookie格式不正确");
			var cookieValue = name + "=" + value;
			if (exp) {
				var dt = new Date();
				dt.setTime(dt.getTime() + (exp * 1000));
				cookieValue += "; expires=" + dt.toGMTString();
			}
			if (path) {
				cookieValue += "; path=" + path;
			}
			if (domain){
				cookieValue += "; domain=" + domain;
			}
			if (secure){
				cookieValue += "; secure";
			}
			document.cookie = cookieValue;

		},
		setDay: function(name, value, exp, path, domain, secure){
			this.write(name, value, (exp * 24 * 60 * 60), path, domain, secure);
		},
		setHour: function(name, value, exp, path, domain, secure){
			this.write(name, value, (exp * 60 * 60), path, domain, secure);
		},
		setMin: function(name, value, exp, path, domain, secure){
			this.write(name, value, (exp * 60), path, domain, secure);
		},
		setSec: function(name, value, exp, path, domain, secure){
			this.write(name, value, (exp), path, domain, secure);
		},
		read: function(name, key) {
			var cookieValue = "";
			var arrStr = document.cookie.split("; ");
			for(var i = 0;i < arrStr.length;i ++){
				var temp = arrStr[i].split("=");
				if(temp[0] == name){
					cookieValue = temp[1];
					break;
				}
			}
			if(key){
				return new Kg.Param().parse(cookieValue)[key];
			}
			return cookieValue;
		},
        getValue: function(name, item){
            var cookieArr = document.cookie.match(new RegExp("(^|\\s)"+name+"=([^;]*)","i"));
            var cookieValue = cookieArr?unescape(cookieArr[2]):"";
            if(item && cookieValue){
                var value = cookieValue.match(new RegExp("(^|\\&)"+item+"=([^\\&]*)","i"));
                cookieValue = value?value[2]:"";
            }
            return cookieValue;
        },
		remove: function(name, path, domain) {
			var cookie = name + "=";
			if (path)
				cookie += '; path=' + path;
			if (domain)
				cookie += ';domain=' + domain;
			cookie += '; expires=Fri, 02-Jan-1970 00:00:00 GMT';
			document.cookie = cookie;
		}
	},
	Param:function(){
		var arr = [];
		var o = {};
		this.parse = function(str){
			var a = str.split("&");
			for(var i = 0, l = a.length; i < l; i++){
				var k = a[i].split("=");
				o[k[0]] = k[1];
			}
			return o;
		};
		this.toString = function(filter){
			filter = filter || "&";
			return arr.join(filter);
		};
		this.add = function(key, val){
			var prm = key + "=" + val;
			arr.push(prm);
			return this;
		}
	},
	Ajax: function(method, url, async, args, callback, error, docType) {
		var params = args;
		async = async == null?true:async;
		if(args){
			if(typeof args === "object"){
				args["test"] = Kg.Cookie.read('_gyhRichLevel');
				var str = "";
				for(var i in args){
					str += i + "=" + args[i] + "&";
				}
				params = str.substr(0, str.length - 1);
			}
		}
		
        method = method ? method.toUpperCase() : "POST";
        docType = docType ? docType: "text";
        var XMLHttp = null;
        if (window.XMLHttpRequest && !(window.ActiveXObject)) {
            XMLHttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            try {
                XMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(otherMSIE) {
                try {
                    XMLHttp = new ActiveXObject("Msxml2.XMLHTTP");
                } catch(NoSupport) {
                    XMLHttp = null;
                }
            }
        }
        
        XMLHttp.onreadystatechange = function() {
            if (XMLHttp.readyState == 4) {
                if (XMLHttp.status == 200 || XMLHttp.status == 0) {
                    var param = null;
                    switch (docType) {
                    case "xml":
                        param = XMLHttp.responseXML;
                        break;
                    case "json":
                        param = Kg.JSON.parse(XMLHttp.responseText);
                        break;
                    default:
                        param = XMLHttp.responseText;
                    }
                    callback && callback(param, XMLHttp);
                    XMLHttp = null;
                } else {
					error && error();
				}
            }
        };

		if (method == "GET") {
			if(url.indexOf("?") != -1){
				XMLHttp.open(method, url + (params? ("&" + params) : ''), async);
			} else {
				XMLHttp.open(method, url + (params? ("?" + params) : ''), async);
			}
            XMLHttp.send(null);
        } else {
            XMLHttp.open(method, url, async);
            XMLHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            XMLHttp.send(params);
        }
		return XMLHttp;
    },
	get:function(url, params, callback, error, async){
		return this.Ajax("get", url, async, params, callback, error);
	},
	post:function(url, params, callback, error, async){
		return this.Ajax("post", url, async, params, callback, error);
	},
	getJSON:function(url, params, callback, error, async){
		return this.Ajax("get", url, async, params, callback, error, "json");
	},
	postJSON:function(url, params, callback, error, async){
		return this.Ajax("post", url, async, params, callback, error, "json");
	},
	loadScript:function(url, args, callback){
		var params = args || "";
		if(args && (typeof args === "object")){
			var str = "";
			for(var i in args){
				str += i + "=" + args[i] + "&";
			}
			params = str.substr(0, str.length - 1);
		};
		var script = document.createElement("script");
		script.type = 'text/javascript';
		script.src = url + "?" + params;
		script.onload = script.onreadystatechange = function(){
			if(!this.readyState || (this.readyState == "complete" || this.readyState == "loaded")){
				callback && callback();
				script.onreadystatechange = script.onload = null;
				script = null;
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	},
	loadCss:function(url){
		var fileref = document.createElement('link');
	    fileref.setAttribute("rel","stylesheet");
	    fileref.setAttribute("type","text/css");
	    fileref.setAttribute("href",url);
	    if(typeof fileref != "undefined"){
	    	document.getElementsByTagName("head")[0].appendChild(fileref);
	    }
	},
	/*flash异步跨域*/
	flash:{
		ready:false,
		init:function(){
			this.ready = true;
		},
		getStr:function(name, flashUrl, width, height, params) {
				var str = "";
				var o = {
					"flashvars" : '',
					"wmode" : ''
				};
				params = params || {};
				Kg.extend(o, params, true);
				str += '<object id="' + name + '" name="' + name + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10.0.32" width="' + width + '" height="' + height + '">';
				str += '<param name="bgColor" value="#666666" />';
				str += '<param name="movie" value="' + flashUrl + '" />';
				str += '<param name="flashvars" value="' + o.flashvars + '" />';
				str += '<param name="quality" value="high" />';
				str += '<param name="allowScriptAccess" value="always" />';
				str += '<param name="WMODE" value="' + o.wmode + '"/>';
				str += '<embed id="' + name + '1" name="' + name + '1" src="' + flashUrl + '" width="' + width + '"  height="' + height + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + o.flashvars + '" type="application/x-shockwave-flash" wmode="' + o.wmode + '" ></embed>';
				str += '</object>';
				return str;
		},
		write:function(name, flashUrl, width, height, params){
			document.write(this.getStr(name, flashUrl, width, height, params));


            //$('#AudioPlayerBox').append(this.getStr(name, flashUrl, width, height, params));
		},
		getObj:function(name){
			if (Kg.UA.FF) {
				return document[name][1];
			} else if(Kg.UA.Ie){
				return window[name];
			} else {
				return window[name][1];	
			}
		},
		Ajax:function(url, params, method, callback){
			var _this = this;
			var el = Kg.$("Ajax-flash-object");
			if(el){
				(this.ready == true) && this.getObj('KugouAjaxFlash').SetParameters(url, params, method, callback);
			} else{
				var projectName = location.pathname.match(/^\/(\w+)\//)[1];
				var el = document.createElement("div");
				el.id = "Ajax-flash-object";
				document.body.appendChild(el);
				el.innerHTML = this.getStr('KugouAjaxFlash', '/' + projectName + '/static/flash/Httpreq.swf', 1, 1, {
					"flashvars":"ini=Kg.flash.init"
				});
	
				var timer = setInterval(function(){
					var flashObj = _this.getObj('KugouAjaxFlash');
					if(flashObj && flashObj.SetParameters){
						clearInterval(timer);
						flashObj.SetParameters(url, params, method, callback);
					}
				},100)
			}
		}
	},
	request:{
		hash:function(key){
			var hash = location.hash.replace("#","");
			if(!key){
				return hash;
			} else {
				var o = new Kg.Param().parse(hash);
				return o[key];
			}
		},
		search:function(key){
			var search = location.search.replace("?","");
			if(!key){
				return search;
			} else {
				var o = new Kg.Param().parse(search);
				return o[key];
			}
		}
	},
	form:{
		placeholder:function(el, editColor, emptyColor){
			if (el) {
				el.onfocus = function(){
					if(el.value == el.defaultValue){
						el.value = "";
						el.style.color = editColor;
					}
				};
				el.onblur = function(){
					if(el.value == ""){
						el.value = el.defaultValue;
						el.style.color = emptyColor;
					}
				};		
			}
		}
	},
	//冒泡算法
	bubbleSort:function(arr, key, desc){
		var arr = [].concat(arr);
		var arr1 = [];
		for(var i = 0; i < arr.length; i++){
			for(var j = i + 1; j < arr.length; j++){
				if(key){
					if(parseInt(arr[i][key]) > parseInt(arr[j][key])) break;
				} else {
					if(arr[i] > arr[j]) break;
				}
				if(j == arr.length - 1){
					arr1.push(arr[i]);
					arr.splice(i,1);
					i = -1;
				}
			}
			if(i == arr.length - 1){
				arr1.push(arr[i]);
				arr.splice(i,1);
				i = -1;
			}
		  }

		  if(desc)
			return arr1.reverse();
		  else
			return arr1;
	}
};


/**
 * 
 * 歌友会类库Fs
 * 
 */
var Fs = {
    /**
     * stop 阻止时间冒泡
     * @param {object} evt 事件对象
     * @return {void}
     */
    stop : function(evt) {
        evt = evt || window.event;
        evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
    },
   
    /**
     * @function 拖动
     * @param:   {object} target 需要拖动的目标对象
     * @param:   {function} callback 回调函数
     * @return:  {void}
     */
    drag: function(target, callback) {
        var dragElement = target;
        var parent = $(target).parent();
        var mouseX, mouseY, offsetLeft, offsetTop;
        if (!dragElement) {
            return;
        }
        $(dragElement).bind('mousedown', function(ev) {
            Fs.stop(ev);
            var offset = $(this).offset();
            offsetLeft = offset.left;
            offsetTop = offset.top;
            mouseX = ev.pageX;
            mouseY = ev.pageY;
            $(this).bind('mousemove', _dragEvent);

            function _dragEvent(ev) {
                var toX = ev.pageX - mouseX;
                var toY = ev.pageY - mouseY;
                var toLeft = offsetLeft + toX;
                var toTop = offsetTop + toY;
                if (parent) {
                    pOffset = $(parent).offset();
                    toLeft = toLeft - pOffset.left;
                    toTop = toTop - pOffset.top;
                }
                $(dragElement).css({position: 'absolute',left: toLeft + 'px',top: toTop + 'px'});
            }
        });

        $(dragElement).bind('mouseup', function(ev) {
            $(this).unbind('mousemove');

            if (callback) {
                callback.call(this, arguments);
            }
        });
    },

    tips: function(target, styleText) {
        if (!target) {
            return;
        }
        var mouseX, mouseY, offsetLeft, offsetTop;
        var $tips = $('<div class="NN"></div>').appendTo($('body'));
        $tips.get(0).style.cssText = styleText;
        $(target).mousemove(function(ev) {
            mouseX = ev.pageX;
            mouseY = ev.pageY;
            offsetLeft = mouseX + 15;
            offsetTop = mouseY + 25;
            $tips.css({'position': 'absolute', 'z-index':100000,'top': offsetTop + 'px', 'left': offsetLeft + 'px'}).show();
        });
        $(target).mouseout(function() {
            $tips.hide();
        });
    },
    /**
     * @function 输出Flash
     * @return:  {void}
     */
    writeFlash: function(flashUrl, flashBoxId, width, height, vars, params, attributes) {
        swfobject.embedSWF(flashUrl, flashBoxId, width, height, "9.0.0", "/static/swf/expressInstall.swf", vars, params, attributes);
    },
    /**
     * @function hasFlashOrNot 判断用户是否安装Flash Player
     * @return:  {void}
     */
    hasFlashPlayer: function(){
        try {
            if (window.ActiveXObject) {
                var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                if (swf) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if (navigator.plugins && navigator.plugins.length > 0) {
                    var swf = navigator.plugins["Shockwave Flash"];
                    if (swf){
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        } catch(e){
            return false;
        };
    },
    /**
     * @function getFlashVersion 获取用户Flash Player版本
     * @return:  {void}
     */
    getFlashVersion : function() {
        if (window.ActiveXObject) {
            var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if (swf) {
                var VSwf = swf.GetVariable("$version");
                var arr = VSwf.split(" ")[1].split(",");
                var version = parseFloat(arr[0] + "." + arr[1]);
                return version;
            }
        } else {
            if (navigator.plugins && navigator.plugins.length > 0){
                var swf = navigator.plugins["Shockwave Flash"];
                if (swf) {
                    var words = swf.description.split(" ");
                    for(var i = 0; i < words.length; i++){
                        if(isNaN(parseFloat(words[i]))) continue;
                        var version = parseFloat(words[i]);
                        return version;
                    }
                }
            }
        }
        return '';
    },
    /**
     * @function placeHolder 输入框占位字符
     * @param {string} 输入框选择器
     * @return {void}
     */
    placeHolder: function(selector){
        $(selector).live({
            focusout : function (){
                var _this = $(this),
                    placeholder = _this.siblings('.placeholder');
                if (_this.val() == '' && placeholder.length != 0){
                    placeholder.show();
                };
            },
            keydown : function (){
                var _this = $(this),
                    placeholder = _this.siblings('.placeholder');
                if (_this.val() == '' && placeholder.length != 0){
                    placeholder.hide();
                };
            }
        });

        $(selector).siblings('.placeholder').click(function() {
            $(this).siblings('input').focus();
        });
    },
    /**
     * @function checkPassword 检验密码的安全等级
     * @param {string} 密码字符串
     * @return {int} 返回等级
     */
    checkPasswordSecurityLevel: function(pwdStr){
        var securityLevelFlag = 0,
            p1 = 0, //等于1表示含有小写字母
            p2 = 0, //等于1表示含有大写字母
            p3 = 0, //等于1表示含有数字
            p4 = 0; //等于1表示含有特殊字符
        if (pwdStr.length < 6) {
            return 0;
        } else {
            if (/[a-z]/.test(pwdStr)){
                p1 = 1;//lowercase
            }
            if (/[A-Z]/.test(pwdStr)){
                p2 = 1;//uppercase
            }
            if (/[0-9]/.test(pwdStr)){
                p3 = 1;//digital
            }
            if (_containSpecialChar(pwdStr)){
                p4 = 1;//specialcase
            }
        }

        return securityLevelFlag = p1 + p2 + p3 + p4;

        function _containSpecialChar(pwdStr) {
            var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)(\`)(\·)]+/);
            return (containSpecial.test(pwdStr));
        }
    },
    /**
     * @function checkEmail 验证邮箱格式
     * @param {string} 邮箱字符串
     * @return {boolean} 返回是否合法
     */
    checkEmail: function(mailStr) {
        var emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        return emailReg.test(mailStr);
    },
    /**
     * @function checkMobile 验证手机格式
     * @param {string} 手机字符串
     * @return {boolean} 返回是否合法
     */
    checkMobile: function(phoneStr) {
        var phoneReg = /^1[0-9]{10}$/;
        return phoneReg.test(phoneStr);
    },
    /**
     * @function checkPostalCode 验证邮政编码
     * @param {string} 邮编字符串
     * @return {boolean} 返回是否合法
     */
    checkPostalCode: function(postalCodeStr) {
        var postalCodeReg = /^[0-9]{6}$/;
        return postalCodeReg.test(postalCodeStr);
    },
    /**
     * @function 将时间长度转化为年+月+天+小时+分+秒
     * @param {Integer} 时间长度
     * @param {String} 需要转化的格式，年+月+天+小时+分+秒中任何一种
     * @return {String} 时间字符串
     */
    formatTimeToStr: function(seconds, formatStr) {
        var o = {
            "y+" : {'hasMe': false, 'fn': _getYears},
            "M+" : {'hasMe': false, 'fn': _getMonths},
            "d+" : {'hasMe': false, 'fn': _getDays},
            "h+" : {'hasMe': false, 'fn': _getHours},
            "m+" : {'hasMe': false, 'fn': _getMinutes},
            "s+" : {'hasMe': false, 'fn': _getSeconds}
        };
        var secondsOfyear = 365 * 24 * 60 * 60;//按一年365天算
        var secondsOfMonth = 30 * 24 * 60 * 60;//按一月30天算
        var secondsOfDay = 1 * 24 * 60 * 60;
        var secondsOfHour = 60 * 60;
        var secondsOfMinute = 60;
        var timeStr = '';
        if (!formatStr) {
            if (seconds < 60) {
                var s = seconds;
                timeStr = s + '秒';
            } else if (seconds > 60 && seconds < 3600) {
                var m = parseInt(seconds / 60);
                var s = parseInt(seconds % 60);
                timeStr = m + "分" + s + "秒";
            } else if (seconds >= 3600 && seconds < 86400) {
                var h = parseInt(seconds / 3600);
                var m = parseInt(seconds % 3600 / 60);
                var s = parseInt(seconds % 3600 % 60 % 60);
                timeStr = h + "小时" + m + "分钟" + s + "秒";
            } else if (seconds >= 86400) {
                var d = parseInt(seconds / 86400);
                var h = parseInt(seconds % 86400 / 3600);
                var m = parseInt(seconds % 86400 % 3600 / 60)
                var s = parseInt(seconds % 86400 % 3600 % 60 % 60);
                timeStr = d + '天' + h + "小时" + m + "分钟" + s + "秒";
            }

            return timeStr;
        }

        if (formatStr) {
            var lastKey = '';
            for (var k in o) {
                if (new RegExp("("+ k +")").test(formatStr)){
                    o[k].hasMe = true;
                    var hasLast = o[lastKey] ? o[lastKey].hasMe : false;
                    var timeVal = o[k].fn(hasLast);
                    formatStr = formatStr.replace(RegExp.$1, timeVal.toString().length == 1 ? '0' + timeVal : timeVal);

                    //记住上一次key
                    lastKey = k;
                }
            }
        }

        return formatStr;

        function _getYears() {
            var years = 0;

            if (seconds >= secondsOfyear) {
                years = parseInt(seconds / secondsOfyear);
            }
            return years;
        }

        function _getMonths(hasYear) {
            var months = 0;
            if (seconds >= secondsOfMonth) {
                if (hasYear) {
                    months = parseInt((seconds % secondsOfyear) / secondsOfMonth);
                } else {
                    months = parseInt(seconds / secondsOfMonth);
                }
            }
            return months;
        }

        function _getDays(hasMonth) {
            var days = 0;
            if (seconds >= secondsOfDay) {
                if (hasMonth) {
                    days = parseInt((seconds % secondsOfMonth) / secondsOfDay);
                } else {
                    days = parseInt(seconds / secondsOfDay);
                }
            }
            return days;
        }

        function _getHours(hasDay) {
            var hours = 0;
            if (seconds >= secondsOfHour) {
                if (hasDay) {
                    hours = parseInt((seconds % secondsOfDay) / secondsOfHour);
                } else {
                    hours = parseInt(seconds / secondsOfHour);
                }
            }
            return hours;
        }

        function _getMinutes(hasHour) {
            var minutes = 0;
            if (seconds >= secondsOfMinute) {
                if (hasHour) {
                    minutes = parseInt((seconds % secondsOfHour) / secondsOfMinute);
                } else {
                    minutes = parseInt(seconds / secondsOfMinute);
                }
            }
            return minutes;
        }

        function _getSeconds(hasMinute) {
            if (hasMinute) {
                return seconds % secondsOfMinute;
            }
            return seconds;
        }
    },
    /**
     * @function 将时间戳转化为日+小时+分+秒
     *
     * @param {Date} 时间戳
     * @return {String} 时间字符串
     */
    formatTime: function(longTime) {//转化为 日+小时+分+秒
        var time = parseFloat(longTime);
        if (time != null && time != ""){
            if (time < 60) {
                var s = time;
                time = s + '秒';
            } else if (time > 60 && time < 3600) {
                var m = parseInt(time / 60);
                var s = parseInt(time % 60);
                time = m + "分钟" + s + "秒";
            } else if (time >= 3600 && time < 86400) {
                var h = parseInt(time / 3600);
                var m = parseInt(time % 3600 / 60);
                var s = parseInt(time % 3600 % 60 % 60);
                time = h + "小时" + m + "分钟" + s + "秒";
            } else if (time >= 86400) {
                var d = parseInt(time / 86400);
                var h = parseInt(time % 86400 / 3600);
                var m = parseInt(time % 86400 % 3600 / 60);
                var s = parseInt(time % 86400 % 3600 % 60 % 60);
                time = d + '天' + h + "小时" + m + "分钟" + s + "秒";
            }
        }

        return time;

    },
    /**
     * @function debug 页面调试
     * @return {void}
     */
    debug: function(str){
        if (Fs.debug.mode == 1){
            if(Kg.UA.FF || Kg.UA.Chrom){
                console.log(str);
            }
        }
    },
    /**
     * @function debug 毫秒转化
     * @return {string}
     */
    getDayAndHour: function(msd){  //秒转化为 日+小时+分
        var time = parseFloat(msd);
        if (!isNaN(time)){
            if (time < 60) {
                var m = 0;
                time = m + "分钟";
            } else if (time > 60 && time < 3600) {
                var m = parseInt(time / 60);
                time = m + "分钟";
            } else if (time >= 3600 && time < 86400) {
                var h = parseInt(time / 3600);
                var m = parseInt(time % 3600 / 60);
                time = h + "小时" + m + "分钟";
            } else if (time >= 86400) {
                var d = parseInt(time / 86400);
                var h = parseInt(time % 86400 / 3600);
                var m = parseInt(time % 86400 % 3600 / 60)
                time = d + '天' + h + "小时" + m + "分钟";
            }
        }
        return time;
    },
    /**
     * @function parseToMoney 任意数转化为人民币
     * @return {string}
     */
    parseToMoney: function(num){
        var money = parseFloat(num);
        if (!isNaN(money)) {
            money = '￥' + money.toFixed(2);
        }
        return money;
    },
    /**
     * @function parseToCoin 任意数转化为星币
     * @return {string}
     */
    parseToCoin: function(num){
        var money = parseFloat(num);
        if (!isNaN(money)) {
            money = money.toFixed(2) + '星币';
        }
        return money;
    }
};

/**
 * @classDescription  焦点图构造函数
 * @type {Object}
 * @param {String | Object} 焦点图父层的id或者Dom对象 
 * @param {String}  需切换显示的元素
 * @param {String | Object} 控制器父层的id或者Dom对象 
 * @param {String}  控制器元素
 * @param {Object}  参数集合（包括event,effect,scrollDir,scrollSpeed,scrollMode,timeout,index,callback）
 */ 
function Focus(focId, focTag, ctrId, ctrTag, opiton){
	this.setOption(opiton);	
	this.imgs = Kg.$T(focTag, focId);
	this.ctrs =  ctrId ? Kg.$T(ctrTag, ctrId):null;
	this.l = this.imgs.length;
	this.timer = null;

	if(this.option.effect === "fade" && this.ctrs){
		for(var i = 0; i < this.l; i++){
			Kg.addEvent(this.ctrs[i], this.option.event, Kg.bind(function(i){
				this.over(i);
			}, this, i));

			Kg.addEvent(this.ctrs[i], "mouseout", Kg.bind(function(){
				this.start();
			}, this));

			Kg.addEvent(this.ctrs[i], "mouseover", Kg.bind(function(){
				clearTimeout(this.timer);
			}, this));
		}
	}

	if(this.option.effect === "scroll"){
		this.father = Kg.$(focId);
		this.size = this.option.scrollDir === "Left"?this.imgs[0].offsetWidth:this.imgs[0].offsetHeight;
				
		if(this.option.scrollMode == 2){
			this.father.innerHTML += this.father.innerHTML;
			this.imgs = Kg.$T(focTag, focId);
			this.l = this.imgs.length
		}

		for(var i = 0; i < this.l; i++){
			this.imgs[i].style.position = "absolute";
			this.imgs[i]["style"][this.option.scrollDir.toLowerCase()] = i * this.size + "px";
			this.ctrs[i] && Kg.addEvent(this.ctrs[i], this.option.event, Kg.bind(function(i){
				i = this.currentIndex > this.realLength - 1?(i + this.realLength):i;
				this.over(i);
			}, this, i));
		}
	}
	
	this.realLength = this.option.scrollMode == 2?this.l/2:this.l;
	this.currentIndex = this.option.index === "random"?
		parseInt(Math.random() * this.realLength):
		this.option.index;
	this.ctrs && (this.ctrs[this.currentIndex].className += " current");
	this.option.effect === "fade"?
		(this.imgs[this.currentIndex].style.display = "block"):
		(this.father["scroll"+this.option.scrollDir] = this.size * this.currentIndex);

	this.start();
};

Focus.prototype.setOption = function(option){
	this.option = {
		event: "click",		//切换事件
		effect:"fade",		//切换模式
		scrollDir: "Left",  //滚动方向
		scrollSpeed: 0.1,  //滚动速度`
		scrollMode:1,	   //滚动模式，1代表滚动到尽头后往后切回，2代表无缝滚动
		timeout:3000,	//切换时间
		index:0,		//currentIndex
		onstart: null,	//开始运行前执行的函数
		callback:null   //回调函数
	};

	Kg.extend(this.option, option || {}, true);
};

Focus.prototype.start = function(){
	this.timer = setTimeout(Kg.bind(this.change, this),this.option.timeout);
};

Focus.prototype.change = function(){
	if(this.option.effect === "fade"){
		var step = Kg.UA.Ie?3:1;
		var _this = this;
		var current = this.imgs[this.currentIndex];
		this.ctrs && (this.ctrs[this.currentIndex].className = this.ctrs[this.currentIndex].className.replace(/\s*current/,""));

		var next = (this.currentIndex === this.l - 1)?
			this.imgs[(this.currentIndex = 0)]:
			this.imgs[++this.currentIndex];
		this.ctrs && (this.ctrs[this.currentIndex].className += " current");

		current.style.zIndex = 100;
		next.style.cssText = "display:block; z-index:99";
		
		this.option.onstart && this.option.onstart(this);

		current.timer = Kg.fadeout(current, 1, step, function(){
			_this.reset();
			_this.start();
			_this.option.callback && _this.option.callback(this);
		});	
	}

	if(this.option.effect === "scroll"){
		var speed = Kg.UA.Ie?this.option.scrollSpeed:(this.option.scrollSpeed-0.04);
		if(this.option.scrollMode == 2){
			if(this.currentIndex == this.l -1){
				this.father["scroll" + this.option.scrollDir] = (this.realLength - 1)*this.size;
				this.currentIndex = this.realLength - 1;
			}
		}
		
		this.ctrs && (this.ctrs[this.currentIndex % this.realLength].className = this.ctrs[this.currentIndex % this.realLength].className.replace(/\s*current/,""));
		this.currentIndex === (this.l - 1)?(this.currentIndex = 0):++this.currentIndex;
		this.ctrs && (this.ctrs[this.currentIndex % this.realLength].className += " current");
		var start = this.father["scroll" + this.option.scrollDir];
		var end = this.currentIndex * this.size;
		var _this = this;
		this.option.onstart && this.option.onstart(this);
		this.timer = Kg.slide(this.father, "scroll" + this.option.scrollDir, start, end, speed, function(){
			clearInterval(_this.timer);
			_this.option.callback && _this.option.callback(_this);
			_this.start();
		});
	}
};

Focus.prototype.reset = function(index){
	var index = index || ((this.currentIndex === 0)?this.l - 1:this.currentIndex - 1);
	var resetEl = this.imgs[index];
	resetEl.style.cssText = "display:none; z-index:1";
	clearInterval(resetEl.timer);
	Kg.setOpacity(resetEl, 100);
};

Focus.prototype.over = function(i){
	clearTimeout(this.timer);
	
	if(this.option.effect === "fade"){
		var step = Kg.UA.Ie?3:1;
		var curIndex = this.currentIndex;
		var curEl = this.imgs[curIndex];
		var nextEl = this.imgs[i];
		var _this = this;
		curEl.style.zIndex = 1000;
		clearInterval(curEl.timer);
		clearInterval(nextEl.timer);
		Kg.setOpacity(curEl, 100);

		nextEl.style.cssText = "display:block; z-index:999";

		if(this.ctrs){
			this.ctrs[this.currentIndex].className = this.ctrs[this.currentIndex].className.replace(/\s*current/,"");
			this.ctrs[i].className += " current";
		}
		this.currentIndex = i;
		this.option.onstart && this.option.onstart(this);

		curEl.timer = Kg.fadeout(curEl, 1, step, function(){
			_this.reset(curIndex);
			_this.option.callback && _this.option.callback(this);
		});	
	}

	if(this.option.effect === "scroll"){
		var speed = Kg.UA.Ie?this.option.scrollSpeed:(this.option.scrollSpeed-0.04);
		if(this.option.scrollMode == 2){
			if(this.currentIndex == this.l -1 && i == 0){
				this.father["scroll" + this.option.scrollDir] = (this.realLength - 1)*this.size;
				i = this.realLength; 
			}
			if(this.currentIndex == 0 && i == this.l - 1){
				this.father["scroll" + this.option.scrollDir] = this.realLength*this.size;
				i = this.realLength - 1; 
			}
		}

		this.ctrs && (this.ctrs[this.currentIndex % this.realLength].className = this.ctrs[this.currentIndex % this.realLength].className.replace(/\s*current/,""));
		this.currentIndex = i;
		this.ctrs && (this.ctrs[this.currentIndex % this.realLength].className += " current");
		var start = this.father["scroll" + this.option.scrollDir];
		var end = this.currentIndex * this.size;
		var _this = this;
		this.option.onstart && this.option.onstart(this);
		this.timer = Kg.slide(this.father, "scroll" + this.option.scrollDir, start, end, speed, function(){
			clearInterval(_this.timer);
			_this.option.callback && _this.option.callback(_this);
			_this.start();
		});
	}
};

Focus.prototype.prev = function(){
	var index = (this.currentIndex === 0)?this.l - 1:this.currentIndex - 1;
	this.over(index);
	this.option.effect === "fade" && this.start();
};

Focus.prototype.next = function(){
	var index = (this.currentIndex === this.l - 1)?0:this.currentIndex + 1;
	this.over(index);
	this.option.effect === "fade" && this.start();
};

/**
 * @classDescription  选项卡构造函数
 * @type {Object}
 * @param {String | Object} TAB父层的id或者Dom对象 
 * @param {String}  绑定鼠标行为的tab
 * @param {String | Object} TAB CONTENT父层的id或者Dom对象 
 * @param {String}  被切换的TAB CONTENT
 * @param {Object}  参数集合（包括event,effect,fadeStep,current,loop,index,autoPlay,timeout,callback）
 */ 
function Tab(tabId, tabTag, contentId, contentTag, option){
	this.setOption(option);

	var tabEl = Kg.$(tabId),
		tabChild = tabEl.childNodes,
		contentEl = Kg.$(contentId),
		contentChild = contentEl.childNodes;
	this.tabsFather = tabEl;
	this.tabs = [];
	this.contents = [];
	this.timer = null;

	for(var i = 0, l = tabChild.length; i < l; i++){
		if(tabChild[i].nodeType == 1 && tabChild[i].tagName.toLowerCase() == tabTag){
			this.tabs.push(tabChild[i]);
		}
	}

	for(var i = 0, l = contentChild.length; i < l; i++){
		if(contentChild[i].nodeType == 1 &&contentChild[i].tagName.toLowerCase() == contentTag){
			this.contents.push(contentChild[i]);
		}
	}
	
	this.currentIndex = this.option.index === "random"?
		parseInt(Math.random() * this.tabs.length):
		this.option.index;

	for(var i = 0, l = this.contents.length; i < l; i++){
		this.contents[i].style.display = "none";
	}

	this.tabs[this.currentIndex].className += " " + this.option.current;
	this.contents[this.currentIndex].style.display = "block";
	this.run();
};

Tab.prototype.setOption = function(option){
	this.option = {
		event:	"click",            //绑定事件
		effect:	 null,				//切换特效
		fadeStep:	 1,				//渐现步长值
		current:	"current",     //切换的className
		loop:	true,				//点击是否循环
		index:	0,					//currentIndex
		autoPlay:	false,         //是否自动切换选项卡
		timeout:	1500,		   //切换时间
		delay:		0,			   //手动切换时，延迟切换时间
		callback:	null			//回调函数
	};

	Kg.extend(this.option, option || {}, true);
};

Tab.prototype.run = function(){
	var timer = null;
	for(var i = 0, l = this.tabs.length; i < l; i++){
		Kg.addEvent(this.tabs[i], this.option.event, Kg.bind(function(index){
			if(this.option.event == "mouseover" && this.option.delay > 0){
				var _this = this;
				timer = setTimeout(function(){
					_this.change(index);
				},this.option.delay)
			} else {
				this.change(index);
			}
		}, this, i));

		if(this.option.event == "mouseover" && this.option.delay > 0){
			Kg.addEvent(this.tabs[i], "mouseout", function(){
				clearTimeout(timer);
			})
		}
	}

	if(this.option.autoPlay){
		this.auto();

		Kg.addEvent(this.tabsFather, "mouseover", Kg.bind(function(){
			clearInterval(this.timer);
		}, this));

		Kg.addEvent(this.tabsFather, "mouseout", Kg.bind(function(){
			this.auto();
		}, this));
	}
};

Tab.prototype.change = function(index){
	var current = this.option.current;
	var curIndex = this.currentIndex;
	var lastCon = this.contents[curIndex];
	var curCon = this.contents[index];
	this.tabs[curIndex].className = this.tabs[curIndex].className.replace(new RegExp("\\s*" + current,"g"), "");
	this.tabs[index].className += " " + current;
	lastCon.style.display = "none";
	curCon.style.display = "block";
	if(this.option.effect === "fade"){
		clearInterval(lastCon.timer);
		Kg.setOpacity(this.contents[index],0);
		curCon.timer = Kg.fadein(curCon,1,this.option.fadeStep);
	}
	this.currentIndex = index;
	typeof(this.option.callback) == "function" && this.option.callback();
};

Tab.prototype.auto = function(){
	this.timer = setInterval(Kg.bind(function(){
		this.next();
	}, this), this.option.timeout)
};

Tab.prototype.next = function(){
	var index = (this.currentIndex + 1) > (this.tabs.length - 1)?0:(this.currentIndex + 1);
	if(this.option.loop === false && index === 0){
		return;
	}
	this.change(index);
};

Tab.prototype.prev = function(){
	var index = (this.currentIndex - 1) >= 0?(this.currentIndex - 1):(this.tabs.length - 1);
	if(this.option.loop === false && index === this.tabs.length - 1){
		return;
	}
	this.change(index);
};

Tab.rotation = function(contentId, contentTag, timeout){
	var timer = null;
	var el = Kg.$(contentId);
	var els = Kg.$T(contentTag,el);
	var index = 0;

	Kg.addEvent(el, "mouseover", function(){
		clearInterval(timer);
	});
	Kg.addEvent(el, "mouseout", function(){
		go();
	});
	function go(){
		timer = window.setInterval(function(){
			for(var i = 0;i < els.length; i++){
				if(els[i].offsetHeight > 0) index = i;
				els[i].style.display = "none";
			}
				
			var num = (index >= els.length -1)?0:index+1;
			els[num].style.display = "block";
		}, timeout)	;
	}
	go();
};

/**
 * @classDescription  弹出层构造函数
 * @type {Object}
 * @param {String | Object} 弹出层的id或者Dom对象 
 * @param {Object}  参数集合（包括modal, modalcolor, modalOpa, effect, pos, callback）
 */ 
function LightBox(boxId, option){
	this.setOption(option);
	var box = Kg.$(boxId);
	var modalBox = Kg.$("modal_layer");
	var iframe = Kg.$("iframe_layer");
	var closeBtn = Kg.$C("close", box);
	
	var _this = this;

	if(!modalBox){
		modalBox = document.createElement("div");
		modalBox.id = "modal_layer";
		document.body.appendChild(modalBox);
	}

	modalBox.style.cssText = "display:none; position:absolute; left:0; top:0; z-index:556; background-color:" + this.option.modalcolor;

	Kg.setOpacity(modalBox, this.option.modalOpa);

	if(!iframe){
		iframe = document.createElement("iframe");
		iframe.id = "iframe_layer";
		document.body.appendChild(iframe);
	}
	if(box){
		box.className += " css3-fadeInUp";
	}
	iframe.frameBorder = 0;
	iframe.style.cssText = "display:none; position:absolute; left:0; top:0; z-index:1;";
	Kg.setOpacity(iframe, 0);
	
	//绑定close时间
	for(var i = 0; i < closeBtn.length; i++){
		Kg.addEvent(closeBtn[i], "click", Kg.bind(function(){
			this.close();
		}, this));
	}

	if(Kg.UA.Ie6 && box){
		Kg.addEvent(window, "scroll", Kg.bind(function(){
			switch(this.option.pos){
				case "center":
					box.style.top = Kg.getBodySize().sT + (Kg.getBodySize().cH/2) + "px";
					box.style.left = Kg.getBodySize().sL + (Kg.getBodySize().cW/2) + "px";
					break;
				case "top":
					box.style.top = Kg.getBodySize().sT + "px";
					box.style.left = Kg.getBodySize().sL + "px";
					break;
				case "bottom":
					box.className = box.className;
					break;
			}
		}, this));
	}

	var resize = function(){		
		var size = Kg.getBodySize();
		iframe.style.height = modalBox.style.height = size.cH + "px";
		iframe.style.width = modalBox.style.width = size.cW + "px";
		
		window.setTimeout(function(){
			var size = Kg.getBodySize();
			iframe.style.height = modalBox.style.height = Math.max(size.sH, size.cH) + "px";
			iframe.style.width = modalBox.style.width = Math.max(size.sW, size.cW) + "px";
		},0);

		if(Kg.UA.Ie6 && box && _this.option.pos === "center"){
			box.style.top = size.sT + (size.cH/2) + "px";
			box.style.left = size.sL + (size.cW/2) + "px";
		}
	};


	Kg.debounce(Kg.addEvent(window,"resize",resize));

	this.box = box;
	this.modalBox = modalBox;
	this.iframe = iframe;
};

LightBox.prototype.setOption = function(option){
	this.option = {
		modal:		true,		//是否打开黑幕层
		modalcolor:	"#000",		//黑幕层颜色
		modalOpa:	20,			//黑幕层透明度
		pos:	"center",		//弹出层出现的位置
		effect: "normal",		//显示效果
		absolute: "",            //绝对定位，而非fixed
		zIndex:"100002",         //默认zIndex为100002
		callback:	null		//回调函数
	};

	Kg.extend(this.option, option || {}, true);
};

LightBox.prototype.open = function(){
	var size = Kg.getBodySize();
	var box = this.box;
	var modalBox = this.modalBox;
	var iframe = this.iframe;
	
	if(this.option.modal){
		modalBox.style.display = "block";
		modalBox.style.height = Math.max(size.sH, size.cH) + "px";
        modalBox.style.height = Math.max(document.body.scrollHeight,size.sH, size.cH)+"px";
		modalBox.style.width = Math.max(size.sW, size.cW) + "px";
	}

	iframe.style.display = "block";
	iframe.style.height = Math.max(size.sH, size.cH) + "px";
	iframe.style.width = Math.max(size.sW, size.cW) + "px";

	box.style.display = "block";
	box.className += " popWinTrue";
	box.style.zIndex = this.option.zIndex;
	box.style.position = Kg.UA.Ie6?"absolute":"fixed";
	if(this.option.absolute == 1){
		box.style.position = "absolute";
	}
	switch(this.option.pos){
		case "center" :
			switch(this.option.effect){
				case "normal":
					if(Kg.UA.Ie6){
						box.style.top = size.sT + (size.cH/2) + "px";
						box.style.left = size.sL + (size.cW/2) + "px";
						box.style.marginTop = -(box.offsetHeight/2) + "px";
						box.style.marginLeft = -(box.offsetWidth/2) + "px";
					} else {
						box.style.top = box.style.left = "50%";
						box.style.marginTop = -(box.offsetHeight/2) + "px";
						box.style.marginLeft = -(box.offsetWidth/2) + "px";
					}
					this.option.callback && this.option.callback(this);
					break;
				case "fade":
					var _this = this;
					var end = Math.floor(size.sT + (size.cH/2));
					var speed = (Kg.UA.Ie7 || Kg.UA.Ie8)?0.5:Kg.UA.Ie6?0.3:0.1;
					Kg.setOpacity(box, 0);
					if(Kg.UA.Ie6){
						Kg.slide(box, "top", (end - 50), end, speed, function(){
							_this.option.callback && _this.option.callback(_this);
						});
					} else {
						Kg.slide(box, "top", (end - 50), end, speed, function(o){
							o.style.left = o.style.top = "50%";
							_this.option.callback && _this.option.callback(_this);
						});
					}
					Kg.fadein(box, 1, 10);
					
					box.style.left = size.sL + (size.cW/2) + "px";
					box.style.marginTop = -(box.offsetHeight/2) + "px";
					box.style.marginLeft = -(box.offsetWidth/2) + "px";
					break;
				case "slide":
					var speed = (Kg.UA.Ie7 || Kg.UA.Ie8)?0.6:Kg.UA.Ie6?0.3:0.1;
					var width = parseInt(Kg.getStyle(box, "width"));
					var height = parseInt(Kg.getStyle(box, "height"));
					var _this = this;
					box.style.width = box.style.height = box.style.margin = box.style.padding =0;
					box.style.top = Kg.UA.Ie6?(size.sT + (size.cH/2) + "px"):"50%";
					box.style.left = Kg.UA.Ie6?(size.sL + (size.cW/2) + "px"):"50%";
					box.style.padding = 0;
					box.style.borderWidth = "1px";
					Kg.slide(box, "width", 0, width, speed, function(o){
						o.style.padding = box.style.borderWidth = "";
						Kg.slide(box, "height", 0, height, (speed), function(o){
							_this.option.callback && _this.option.callback(_this);
						}, function(o){
							o.style.marginTop = -(o.offsetHeight/2) + "px";
						})

					}, function(o){
						o.style.marginLeft = -(o.offsetWidth/2) + "px";
					}
					);
					break;
			}
			break;
		case "top" :
			if(Kg.UA.Ie6){
				box.style.top = size.sT + "px";
				box.style.left = size.sL + "px";
				box.style.marginTop = box.style.marginLeft = "";
			} else {
				box.style.top = box.style.left = "0";
				box.style.marginTop = box.style.marginLeft = "";
			}
			this.option.callback && this.option.callback(this);
			break;
		case "bottom" :
			box.style.top = box.style.left = "auto";
			box.style.bottom = 0;
			box.style.right = 0;
			box.style.marginTop = box.style.marginLeft = "";
			this.option.callback && this.option.callback(this);
	}
};

LightBox.prototype.close = function(){
	var size = Kg.getBodySize();
	var _this = this;
	var box = this.box;
	switch(this.option.effect){
		case "fade":
			if(this.option.pos === "center"){
				var end = Math.floor(size.sT + (size.cH/2));
				var speed = (Kg.UA.Ie7 || Kg.UA.Ie8)?0.5:Kg.UA.Ie6?0.3:0.1;
				box.style.position = "absolute";
				Kg.slide(box, "top", end, (end - 50), speed);
				Kg.fadeout(box, 1, 10, function(o){
					!Kg.UA.Ie6 && (box.style.position = "fixed");
					o.style.display = _this.modalBox.style.display = _this.iframe.style.display = "none";
					Kg.setOpacity(o, 100);
				});
			} else {
				this.box.style.display = this.modalBox.style.display = this.iframe.style.display = "none";
			}
			break;
		case "slide":
			if(this.option.pos === "center"){
				var speed = (Kg.UA.Ie7 || Kg.UA.Ie8)?0.6:Kg.UA.Ie6?0.3:0.1;
				var width = parseInt(Kg.getStyle(box, "width"));
				var height = parseInt(Kg.getStyle(box, "height"));
				Kg.slide(box, "height", height, 0, speed, function(o){
					o.style.padding = 0;
					o.style.borderWidth = "1px";
					Kg.slide(box, "width", width, 0, speed, function(o){
						o.style.padding = "";
						o.style.width = width + "px";
						o.style.height = height + "px";
						o.style.display = _this.modalBox.style.display = _this.iframe.style.display = "none";
					}, function(){
						o.style.marginLeft = -(o.offsetWidth/2) + "px";
					})

				}, function(o){
					o.style.marginTop = -(o.offsetHeight/2) + "px";
				})
			} else {
				this.box.style.display = this.modalBox.style.display = this.iframe.style.display = "none";
			}
			break;	
		case "normal":
			if(this.box) {
				var popWin = new Array();
				popWin = Kg.$C("popWinTrue");
				for(var i=0,j=0;i<popWin.length;i++){
					if(popWin[i].style.display != "none"){
						j++;
					}
				}
				if(j>1){
					this.modalBox.style.display ="block";
				}else{
					this.modalBox.style.display ="none";
				}	
				this.box.style.display = this.iframe.style.display = "none";
			}
			break;			
	}
	//执行回调
	this.option.onclose&&this.option.onclose();
};

/**
 * @classDescription  TIPS构造函数
 * @type {Object}
 * @param {Dom | DomCellection} 需要显示TIPS的对象
 */ 
function Tips(o){
	var el = (o instanceof Array)?o:[].concat(o);
	for(var i = 0, l = el.length; i < l; i++){
		Kg.addEvent(el[i], "mousemove", Kg.bind(function(e){
			e = e || window.event;
			var layer = Kg.$C("tip", this)[0];
			Tips.showLayer(layer, (e.clientX || e.pageX), (e.clientY || e.pageY));
		}, el[i]));

		Kg.addEvent(el[i], "mouseout", Kg.bind(function(){
			var layer = Kg.$C("tip", this)[0];
			layer.style.display = "none";
		}, el[i]));
	}
};

Tips.showLayer = function(el, evtX, evtY){
	el.style.display = "block";
	var s = Kg.getBodySize();
	el.style.left = evtX + s.sL + 5 + "px";
	el.style.top = evtY + s.sT - 5 + "px";
};

/**
 * @classDescription  模拟选择框类
 * @type {Object}
 * @param {String | Object} 触发弹出层对象
 * @param {String | Object}  弹出层对象
 * @param {String} 弹出层列表标签
 * @param {String | Object}  返回值输入对象
 * @param {Object}  参数集合（包括writeInfo,onkeypress,callback）
 */
function fakeSelect(touchId, selectId, selectTag, setInId, option) {
	this.setOption(option);
	this.touch = Kg.$(touchId);
	this.select = Kg.$(selectId);
	this.set = Kg.$(setInId);
	this.li = Kg.$T(selectTag, this.select);
	this.currentIndex = -1;
	Kg.UA.Ie ? null : (this.touch.type = "text");
	var _this = this;

	var func = document.body.onclick;
	document.body.onclick = function() {
		func && func();
		if (_this.select.offsetHeight > 0) {
			_this.select.style.display = "none";
		}
	};

	Kg.addEvent(this.touch, "click", Kg.bind(function(event) {
		Kg.stopEvent(event);
		if (this.select.offsetHeight >= 0 && this.li.length > 0) {
			this.select.style.display = "block";
		}
	}, this));

	Kg.addEvent(this.touch, "keydown", Kg.bind(function(event) {
		var e = event || window.event;

		if (e.keyCode !== 37 && e.keyCode !== 38 && e.keyCode !== 39 && e.keyCode !== 40 && e.keyCode !== 13) {
			this.option.onkeypress && this.option.onkeypress(this);
		} else {
			var l = this.li.length;

			if (e.keyCode == 13) {
				this.close();
				this.option.callback && this.option.callback(this);
			}

			this.li[this.currentIndex] && (this.li[this.currentIndex].className = this.li[this.currentIndex].className.replace(/(\s*current)*/g, ""));
			if (e.keyCode == 38) {
				this.currentIndex = (this.currentIndex <= 0) ? l - 1 : --this.currentIndex;
				this.li[this.currentIndex] && (this.li[this.currentIndex].className += " current");
				this.option.writeInfo === "mouseover" && this.write();
			}
			if (e.keyCode == 40) {
				this.currentIndex = (this.currentIndex >= l - 1) ? 0 : ++this.currentIndex;
				this.li[this.currentIndex] && (this.li[this.currentIndex].className += " current");
				this.option.writeInfo === "mouseover" && this.write();
			}
		}
	}, this));

	this.bindLi();
};

fakeSelect.prototype.bindLi = function() {
	for (var i = 0; i < this.li.length; i++) {
		Kg.addEvent(this.li[i], "mouseover", Kg.bind(function(i) {
			this.li[this.currentIndex] && (this.li[this.currentIndex].className = this.li[this.currentIndex].className.replace(/(\s*current)*/g, ""));
			this.li[i].className += " current";
			this.currentIndex = i;
		}, this, i));
		Kg.addEvent(this.li[i], "mouseout", Kg.bind(function() {
			this.className = this.className.replace(/(\s*current)*/g, "");
		}, this.li[i]));
		Kg.addEvent(this.li[i], "click", Kg.bind(function() {
			this.close();
			this.option.callback && this.option.callback(this);
		}, this));
	}
};

fakeSelect.prototype.setOption = function(option) {
	this.option = {
		writeInfo : "click", //按下回车键才输入值
		onkeypress : null,
		callback : null
	};

	Kg.extend(this.option, option || {}, true);
};

fakeSelect.prototype.write = function() {
	var selected = Kg.$C("current", this.select);
	if (selected.length > 0) {
		this.touch.value = selected[0].innerHTML.trim();
		this.set.tagName.toLowerCase() === "input" ? this.set.value = this.touch.value : this.set.innerHTML = this.touch.value;
	}
};

fakeSelect.prototype.close = function() {
	this.write();
	this.select.style.display = "none";
};

fakeSelect.prototype.open = function(event) {
	Kg.stopEvent(event);
	this.touch.focus();
	if (Kg.UA.Ie) {
		this.touch.click();
	} else {
		var e = document.createEvent("MouseEvent");
		e.initEvent("click", true, true);
		this.touch.dispatchEvent(e);
	}
};

fakeSelect.email = {
	emails : [],
	func : function(o) {
		setTimeout(function() {
			var reg = /\w+(\.\w+){1,2}$/;
			var text = o.set.value;
			var el = Kg.$("email_div");
			var str = "";
			var emails = fakeSelect.email.emails;
			var index = text.indexOf("@");
			var prefix = "";
			if (index >= 0) {
				prefix = text.substr(index + 1);
				for (var i = 0; i < emails.length; i++) {
					if (new RegExp("^" + prefix).test(emails[i]))
						str += "<p>" + text + (emails[i].replace(prefix, "")) + "</p>";
				}
			} else {
				for (var i = 0; i < emails.length; i++) {
					str += "<p>" + text + "@" + emails[i] + "</p>";
				}
			}

			el.innerHTML = str;

			o.li = Kg.$T("p", el);
			o.currentIndex = -1;
			o.bindLi();
			if (o.li.length > 0) {
				o.select.style.display = "block";
			} else {
				o.select.style.display = "none";
			}
		});
	}
};

/**
 * @classDescription  文字滚动构造函数
 * @type {Object}
 * @param {String | Object} 滚动层的id或者Dom对象 
 * @param {String | Object} 克隆层的id或者Dom对象 
 * @param {Object}  参数集合（包括dir, pause, timeout, speed, stopMoving, stopSize, step, callback）
 */ 
function Scroll(id1, id2, option) {
	this.setOption(option);
    this.ori = Kg.$(id1);
    this.clone = Kg.$(id2);
    this.father = this.ori.parentNode;
    this.timer = null;
    this.clone.innerHTML = this.ori.innerHTML;
    this.father = (this.option.dir === "Left" || this.option.dir === "Right") ? 
		this.father.parentNode: 
		this.father; 
	
	!this.option.hand && setTimeout(Kg.bind(function() {
        this.run();
    },this), 0); 
	
	! this.option.hand && this.option.stopMoving && Kg.addEvent(this.father, "mouseover", Kg.bind(function() {
        this.stop();
    },this)); 
	
	! this.option.hand && this.option.stopMoving && Kg.addEvent(this.father, "mouseout", Kg.bind(function(e) {
        this.run();
    },this));
};
Scroll.prototype.setOption = function(option) {
    this.option = {
        hand: false,
        dir: "Down",
        pause: false,
        timeout: 1000,
        speed: 30,
		stopMoving: true,
        stopSize: 50,
        step: 1,
		callback: null
    };
    Kg.extend(this.option, option || {}, true);
};
Scroll.prototype.run = function() {
    switch (this.option.dir) {
    case "Up":
    case "Down":
        this.size = this.ori.offsetHeight;
        (this.size >= this.father.offsetHeight) && this["scroll" + this.option.dir]();
        break;
    case "Left":
    case "Right":
        this.size = this.ori.offsetWidth;
        this["scroll" + this.option.dir]();
        break;
    }
};
Scroll.prototype.scrollLeft = function() {
	if(this.option.hand && this.working){
		 return;
	}
	this.working = true;
    this.stop();
	this.sL = this.father.scrollLeft;
	var n = 0;
    this.timer = setInterval(Kg.bind(function() {
        if(this.sL <= 0){
			this.sL = this.father.scrollLeft = this.size;	
		} else {
			this.sL = this.father.scrollLeft = this.sL - this.option.step;
			n += this.option.step;
		}
	
		if(this.option.pause && n >= this.option.stopSize){
			clearInterval(this.timer); 
			this.working = false;
			this.option.callback && this.option.callback();
			n = 0;
			! this.option.hand && setTimeout(Kg.bind(this.run, this), this.option.timeout);	
		}
    },this), this.option.speed);
};
Scroll.prototype.scrollRight = function() {
	if(this.option.hand && this.working){
		 return;
	}
	this.working = true;
    this.stop();
	this.sL = this.father.scrollLeft;
	var n = 0;
    this.timer = setInterval(Kg.bind(function() {
        if(this.sL >= this.size){
			this.sL = this.father.scrollLeft = 0 ;
		} else {
			this.sL = this.father.scrollLeft = this.sL + this.option.step;
			n += this.option.step;
		}
		
		if(this.option.pause && n >= this.option.stopSize){
			clearInterval(this.timer); 
			this.working = false;
			this.option.callback && this.option.callback();
			n = 0;
			! this.option.hand && setTimeout(Kg.bind(this.run, this), this.option.timeout);
		}
    },this), this.option.speed);
};
Scroll.prototype.scrollUp = function() {
	if(this.option.hand && this.working){
		 return;
	}
	this.working = true;
    this.stop();
	this.sT = this.father.scrollTop;
	var n = 0;
    this.timer = setInterval(Kg.bind(function() {
        if(this.sT <= 0){
			this.sT = this.father.scrollTop = this.size;
		} else {
			this.sT = this.father.scrollTop = this.sT - this.option.step;
			n += this.option.step;
		}
			 		
        if (this.option.pause && n >= this.option.stopSize) {
			clearInterval(this.timer); 
			this.working = false;
			this.option.callback && this.option.callback();
			n = 0;
			! this.option.hand && setTimeout(Kg.bind(this.run, this), this.option.timeout);
        }
    },this), this.option.speed);
};
Scroll.prototype.scrollDown = function() {
	if(this.option.hand && this.working){
		 return;
	}
	
	this.working = true;
    this.stop();
	this.sT = this.father.scrollTop;
	var n = 0;
    this.timer = setInterval(Kg.bind(function() {
        if(this.sT >= this.size){
			this.sT = this.father.scrollTop = 0
		} else {
			this.sT = this.father.scrollTop = this.sT + this.option.step;
			n += this.option.step;
		}
		
        if (this.option.pause && n >= this.option.stopSize) {
			clearInterval(this.timer); 
			this.working = false;
			this.option.callback && this.option.callback();
			n = 0;
			! this.option.hand && setTimeout(Kg.bind(this.run, this), this.option.timeout);
        }
    },this), this.option.speed);
};
Scroll.prototype.stop = function() {
    this.timer && clearInterval(this.timer);
};
Scroll.prototype.restart = function() {
    this.clone.innerHTML = this.ori.innerHTML;
    this.run();
};

var Page = function(CurrentPage, RecordCount, DisplayPages, PageSize, func, Url) {
    this.CurrentPage = parseInt(CurrentPage);
    this.RecordCount = RecordCount;
    this.First = "首页";
    this.Prev = "上一页";
    this.Next = "下一页";
    this.Last = "尾页";
    this.DisplayPages = DisplayPages;
    this._padLeft = null;
    this._padRight = null;
    this.PageSize = PageSize;
    this.PageCount = Math.ceil(this.RecordCount / this.PageSize);
    this.Url = Url;
    this.IsShowFirstAndLast = true;
    this.IsShowPageSearch = false;
    this.GetText = function() {
        if (this.PageCount == 0 || this.CurrentPage > this.PageCount) {
        	
            return ""
        }
        var pageStr = "<span id=\"mypage\" class='my_page_box'>";
        this.Padding();
        pageStr += this.RenderBeginTag();
        pageStr += this.RenderPagingContents();
        pageStr += this.RenderEndTag();
        pageStr = pageStr + "</span>";
		if(this.RecordCount > this.PageSize)
	        return pageStr;
		else
			return "";
    };
    this.RenderBeginTag = function() {
        var str = "";
        var addition = "";
        if (this.CurrentPage > 1) {
            var temp = this.CurrentPage - 1 == 1 ? "1": (this.CurrentPage - 1);
            if (!this.Url) {
                if (this.IsShowFirstAndLast) {
                    str = "<a id=\"page_first\" title=\"首页\" class=\"direct btnPage\" href=\"javascript:void(0)\" onclick=\"" + func + "(1," + this.PageSize + ");return false;\" >" + this.First + "</a>"
                }
                str += "<span class=\"PrePageSpan\" style=\"border:0px;padding:0px;\" ><a id=\"page_pre_" + temp + "\" href=\"javascript:void(0)\" title=\"上一页\" class=\"direct btnPage\" onclick=\"" + func + "(" + temp + "," + this.PageSize + ");return false;\" >" + this.Prev + "</a></span>"
            }
        } else {
            str = "<a style='visibility:hidden' id=\"page_first\" title=\"首页\" class=\"direct btnPage\" href=\"javascript:void(0)\" onclick=\"" + func + "(1," + this.PageSize + ");return false;\" >" + this.First + "</a>";
            str += "<span style='visibility:hidden' class=\"PrePageSpan\" style=\"border:0px;padding:0px;\" ><a id=\"page_pre_\" href=\"javascript:void(0)\" title=\"上一页\" class=\"direct btnPage\" return false;\" >" + this.Prev + "</a></span>"
        }
        return str
    };
    this.RenderEndTag = function() {
        var str = "";
        var addition = "";
        if (this.CurrentPage >= 1 && this.CurrentPage != this.RecordCount) {
            var temp = this.CurrentPage + 1;
            var temp1 = Math.ceil(this.RecordCount / this.PageSize);
            if (temp > temp1) {
                str = "";
                if (this.IsShowPageSearch) {
                    str += "<span class='page_search'>Pages：" + this.CurrentPage + "/" + this.PageCount + "&nbsp;<input type='textbox' id='inputSearch' class='input'><a href='javascript:void(0)' onclick='pageGo(this)'>Go</a></span>"
                }
                str = "<span style='visibility:hidden' class=\"NextPageSpan\" style=\"border:0px;padding:0px;\" ><a id=\"page_next_" + temp + "\" href=\"javascript:void(0)\"  title=\"下一页\" class=\"direct btnPage\" onclick=\"" + func + "(" + temp + "," + this.PageSize + ");return false;\"  >" + this.Next + "</a></span>";
                str += "<a style='visibility:hidden' id=\"page_last_\" title=\"尾页\" href=\"javascript:void(0)\" class=\"direct btnPage\" >" + this.Last + "</a>"
            } else {
                if (!this.Url) {
                    str = "<span class=\"NextPageSpan\" style=\"border:0px;padding:0px;\" ><a id=\"page_next_" + temp + "\" href=\"javascript:void(0)\"  title=\"下一页\" class=\"direct btnPage\" onclick=\"" + func + "(" + temp + "," + this.PageSize + ");return false;\"  >" + this.Next + "</a></span>";
                    if (this.IsShowFirstAndLast) {
                        str += "<a id=\"page_last_" + temp1 + "\" title=\"尾页\" href=\"javascript:void(0)\" class=\"direct btnPage\" onclick=\"" + func + "(" + temp1 + "," + this.PageSize + ");return false;\" >" + this.Last + "</a>"
                    }
                }
            }
        } else {
            str = "<span style='visibility:hidden' class=\"NextPageSpan\" style=\"border:0px;padding:0px;\" ><a id=\"page_next_" + temp + "\" href=\"javascript:void(0)\"  title=\"下一页\" class=\"direct btnPage\" onclick=\"" + func + "(" + temp + "," + this.PageSize + ");return false;\"  >" + this.Next + "</a></span>";
            str += "<a style='visibility:hidden' id=\"page_last_\" title=\"尾页\" href=\"javascript:void(0)\" class=\"direct btnPage\" >" + this.Last + "</a>"
        }
        return str
    };
    this.RenderPagingContents = function() {
        var str = "";
        if (this.PageCount <= this.DisplayPages) {
            str = str + this.RenderLinkRange(1, this.PageCount)
        } else {
            if (this.CurrentPage <= this._padRight) {
                str = str + this.RenderLinkRange(1, this.DisplayPages)
            } else if (CurrentPage <= (this.PageCount - this._padRight)) {
                str = str + this.RenderLinkRange((this.CurrentPage - this._padLeft), (this.CurrentPage + this._padRight))
            } else {
                str = str + this.RenderLinkRange((this.CurrentPage - (this.DisplayPages - ((this.PageCount - this.CurrentPage) + 1))), this.PageCount)
            }
        }
        return str
    };
    this.RenderLinkRange = function(start, end) {
        var str = "";
        var addition = "";
        for (i = start; i <= end; i++) {
            if (i == this.CurrentPage) {
                str = str + "<span id=\"page_" + i + "\" class=\"current\">" + i + "</span>"
            } else {
                var temp = (i == 1 ? 1 : i);
                if (this.Url) {
                    str = str + "<a id=\"page_" + temp + "\" href = \"" + this.Url + "_" + temp + addition + ".htm\" >" + i + "</a>"
                } else {
                    str = str + "<a id=\"page_" + temp + "\" href=\"javascript:void(0)\" onclick=\"" + func + "(" + temp + "," + this.PageSize + ");return false;\" >" + i + "</a>"
                }
            }
        }
        return str
    };
    this.Padding = function() {
        this._padLeft = Math.floor(this.DisplayPages / 2);
        this._padRight = this._padLeft;
        if (this.DisplayPages % 2 == 0) this._padLeft--
    }
};
/**
 * KEQueue —— Events Queue
 * 
 * @param data事件队列中每个事件都会将该参数作为第一个参数传递下去，除非通过KEQueue.status修改它的值。
 * @method next(Function) 下一个要执行的事件。
 * @method wait(Number) 等待一定时间后执行下一个事件。
 * @method sleep() 停止事件序列的执行。
 * @method wake() 继续执行事件序列。
 */
var Queue = function(data) {
	this.staticQueue = [];
	this.asyncQueue = [];
	this.status = "running";
	this.result = [];
	return this;
};
Queue.prototype = {
	next : function(callback, async) {// 添加一个方法
		if (!!async) {
			this.staticQueue.push("async");// 如果是异步方法（会有延时效果的方法）就添加标识
			this.asyncQueue.push(callback);// 延时方法的存放数组
		} else {
			this.staticQueue.push(callback);// 直接触发的方法的存放数组
		}
		return this;
	},
	wait : function(delay) {// 延迟执行序列
		var self = this;
		this.next(function() {// 模拟添加一个延时方法
			setTimeout(function() {
				self.wake.call(self)
			}, delay);
		}, true);
		return this;
	},
	go : function() {// 按事件添加的先后顺序依次执行事件
		if (this.staticQueue.length == 0)
			return;

		while (this.staticQueue.length > 0) {
			if (this.status === "sleep")
				return;

			var fun = this.staticQueue.shift();
			if (typeof fun == "string" && fun == "async") {
				var str = this.result.shift();
				fun = this.asyncQueue.shift();
				fun(str);
				this.sleep();
			} else {
				fun(this.result);
			}
		}
	},
	sleep : function() {
		this.status = "sleep";
	},
	wake : function() {
		this.status = "running";
		this.go();
	}
};

//繁星基类库
//基于jQuery
//@2012.9.24

var FX={
	win:{//弹出窗口
		alert:function(string,callback,newButtonOption){//newButtonOption格式[{value:'按钮1'},{value:'按钮2'}...]
			if(typeof callback==='object'){
				newButtonOption=callback;
				callback=null;
			}
			var _this=this;
			//定义显示的按钮(value:''[,onclick:func,class:''])
			var btnArr=[{
				value:'确定',
				onclick:function(){
					_this.winBox.close();
					callback&&callback();
					return false;
				}
			}];
			if(newButtonOption) btnArr = btnArr.concat(newButtonOption);
			this.createWin(string,btnArr);
			this.winBox.open();
		},
		confirm:function(string,callback,newButtonOption){
			if(typeof callback==='object'){
				newButtonOption=callback;
				callback=null;
			}
			var _this=this;       
			//定义显示的按钮(value:''[,onclick:func,class:''])
			var btnArr=[{
				value:'确认',
				onclick:function(){
					_this.winBox.close();
					callback&&callback();
					return false;
				}
			}];
			var btnArrEnd=[{
				value:'取消',
				onclick:function(){
					_this.winBox.close();
					return false;
					//callback&&callback();
				}
			}];
			if(newButtonOption){
				btnArr = btnArr.concat(newButtonOption).concat(btnArrEnd);
			}else{
				btnArr = btnArr.concat(btnArrEnd);
			}
			this.createWin(string,btnArr);
			this.winBox.open();
		},
		pop:function(string,className,newButtonOption){//用于完全自定义按钮区的弹窗，即不一定有确定，取消等一类的弹窗
			if(typeof className==='object'){
				newButtonOption = className;
				className = null;
			}else if(typeof className==='undefined'||typeof newButtonOption==='undefined'){
				var _this = this;
				newButtonOption = [{
					value:'确认',
					onclick:function(){
						_this.winBox.close();
						return false;
					}
				}];
			}
			this.createWin(string,newButtonOption,className);
			this.winBox.open();
			return this.winBox;
		},
		autoClose:function(string,fn,timeout){//可自动关闭的小提示弹窗
			var $box=$('#fx_autoClose_tip');
			if(!$box.length){
				$('body').append('<div id="fx_autoClose_tip"></div>');
				$box=$('#fx_autoClose_tip');
			}
			$box.html(string);
			var posY=$(window).height()/2+$(window).scrollTop()-$box.height();
			var posX=($(window).width()-$box.width())/2;
			$box.css({left:posX,top:posY}).show();
			setTimeout(function(){$box.hide();fn&&fn()},timeout||1000);
		},
		processing:function(string){//用于显示进度信息，完全没有按钮区，且不能关闭和多了一个loading状态图
			var _this=this;
			var btnArr=[];
			this.createWin(string+'<br/><img style="margin-top:12px;" src="'+IMGHOST+'/fxstatic/images/fx_loading.gif"/>',btnArr);
			this.winBox.open();
			this.$win.find('.shut,.buttons').hide();
		},
		processingClose:function(){//用于关闭进度信息
			this.winBox.close();
			this.$win.find('.shut,.buttons').show();
		},
		init:function(id){//完全自定义html内容的窗口,并返回窗口对象
			var box = new LightBox($(id)[0],{modalOpa:40});
			$(id).find('.shut,.confirm').click(function(){
				box.close();
				return false;
			});
			return box;
		},
		createWin:function(string,btnArr,className){
			var popId = 'fx_win',$pop = $('#'+popId);
			if(!$pop.length){
				$('body').append('<div id="'+popId+'" class="fxPopwin"><h3>提示</h3><a class="shut" href="javascript:;">×</a><span class="top-icon"></span><p></p><div class="buttons"></div></div>');
				$pop = $('#'+popId);
			}
			this.$win = $pop;
			this.winBox = new LightBox(popId, {
				modalOpa : 40,
				//callback : callback,
				onclose : function(){
					if(className){
						$pop.removeClass(className);
					}
				}
			});
			//恢复默认样式
			$pop.attr('class', 'fxPopwin');
			if(className){
				$pop.addClass(className);
			}else{
				$pop.addClass('css3-fadeInUp');
			}
			$pop.find('p').html(string);
			this.initBtn(btnArr,$pop);
			//shut按钮init
			if(this.hasInitShut) return;
			this.hasInitShut=true;
			var _this=this;
			$pop.find('.shut').click(function(){
				_this.winBox.close();
				return false;//过滤IE默认的跳转
			});
		},
		initBtn:function(btnArr,$pop){
			var $box=$pop.find('.buttons');
			var s='',len=btnArr.length;
			for(var i=0;i<len;i++){
				var cls=btnArr[i]['class']||'';
				s+='<a class="confirm '+cls+'" href="###">'+btnArr[i]['value']+'</a>';
			}
			$box.html(s).find('a').each(function(i){
				$(this).click(btnArr[i].onclick);			 
			});
		},
		close:function(){
			FX.win.winBox.close();
		},
		hasInitShut:false,
		winBox:null,
		$win:null
	},
	placeholder:function(){//可传入多个参数，类似({id:'test',left:100,top:200},{id:'test2',left:300,top:10},..)
		var isSupport='placeholder' in document.createElement('input');
		if(isSupport) return;
		var args = arguments;
		$('input,textarea').each(function(){
			var text = $(this).attr('placeholder');
			var _this = this;
			if(text){
				var posX=$(this).position().left;
				var posY=$(this).position().top;
				//自定义参数
				if(args.length){
					$.each(args,function(){
						if(this.id == _this.id){
							posX=this.left?this.left:posX;
							posY=this.top?this.top:posY;
						}
					});
				}
				//var width=$(this).width();
				var $e=$('<div style="display:none;color:#A9A9A9;font-size:12px; position:absolute; left:'+(posX+4)+'px; top:'+(posY+4)+'px;">'+text+'</div>');
				$(_this).parent().append($e);
				if(this.value==='') $e.show();
				//事件
				$(this).focus(function(){
					$e.hide();	   
				}).blur(function(){
					if(this.value==='') $e.show();
				});
				$e.click(function(){
					$(_this).focus();
				});
			}							  
		});
	},
	changeVerifyCode:function(type,img){//点击更换验证码
		img=img||'#verify_img';
		var $img = $(img),
		w = $img.width(),
		h = $img.height();
		//console.log($(o))
		type=type||'register';//默认注册
		if(Kg.UA.Ie6)
			$img.bind('abort', function() {
				$(this).attr('src',$(this).attr('src'));
			}).attr('src','/image.php?w='+w+'&h='+h+'&t='+type+'&r='+Math.random());
		else
			$img.attr('src','/image.php?w='+w+'&h='+h+'&t='+type+'&r='+Math.random());
	},
	loading:{
		show:function(y){
			if(!y) return;
			var $o=$('#fx_loading');
			if(typeof y==='number'){
				$o.css('top',y).show();
			}else{
				$(y).length && $o.css('top',$(y).offset().top+10).show();
			}
		},
		hide:function(){
			$('#fx_loading').hide();
		}
	},
	tips:{//Mouseover TIPS
		fixedPos:function(tar){
			var $box=this.tips,$tar=$(tar);
			$box.addClass($(tar).attr('tips-class')||'');
			var boxH=$box.outerHeight(),boxW=$box.outerWidth();//tip高度
			var tarH=$tar.outerHeight(),tarW=$tar.outerWidth();//目标高度
			var os=$tar.offset(),left=os.left,top=os.top;//目标位移
			var scrTop=$(document).scrollTop(),cltTop=top-scrTop;
			var fixedTop,fixedLeft;
			//取得top
			fixedTop=os.top+tarH+10;
			/*if(boxH<cltTop) fixedTop=os.top-boxH;//正常
			else fixedTop=os.top+tarH;*/
			//取得left
			var right=$(document).width()-left;
			if(boxW<right){
				fixedLeft=left-5;//正常
				$box.attr('class','');
			}else{
				fixedLeft=left-(boxW-tarW)+4;
				$box.attr('class','arr-right');
			}
			//
			$box.css({left:fixedLeft,top:fixedTop});
			
			return $box;
		},
		addMsg:function(tar){
			var s=$(tar).attr('tips');
			this.tips.find('.cont').html(s);//只有一个弹出div实例，变的只是内容
			/*this.tips.css({width:'auto'});
			if(this.tips.width()>446){//最大宽度446px
				this.tips.css({width:446});
			}*/
		},
		show:function(tar){
			if($(tar).attr("tips")){
				this.fixedPos(tar).show();
				this.tips.addClass($(tar).attr('tips-class')||'');
			}else{
				this.hide();
			}
		},
		hide:function(){
			this.tips.hide();
		},
		init:function(o,fn){
			var _this=this;
			var $dom=$(o);
			this.tips=$('#fx_tips');//储存
			//
			$dom.live('mouseover',function(){
				var _o=this;
				clearTimeout(_this.timeout);
				_this.timeout=setTimeout(function(){
					_this.addMsg(_o);
					_this.show(_o);
					fn&&fn.call(_o);
				},200);
			});
			$dom.live('mouseout',function(){
				var _o=this;
				clearTimeout(_this.timeout);
				_this.timeout=setTimeout(function(){
					_this.hide(_o);
				},200);
			});
			//this.addEvent();
		}
	},
	date:{
		checkTime:function(i){
			if (i<10) i="0" + i;
			return i;
		},
		getDateString:function(num,isAll){
			var D = num?new Date(num):new Date();
			var date=D.getDate(),month=D.getMonth()+1,year=D.getFullYear();
			var h=D.getHours(),m=D.getMinutes();
			if(!isAll){
				return year+'-'+this.checkTime(month)+'-'+this.checkTime(date);
			}else{
				return year+'-'+this.checkTime(month)+'-'+this.checkTime(date)+' '+this.checkTime(h)+':'+this.checkTime(m);
			}
		},
		formatTime: function(longTime) {//转化为 日+小时+分+秒
	        var time = parseFloat(longTime);
	        if (time != null && time != ""){
	            if (time < 60) {
	                var s = time;
	                time = s + '秒';
	            } else if (time > 60 && time < 3600) {
	                var m = parseInt(time / 60);
	                var s = parseInt(time % 60);
	                time = m + "分钟" + s + "秒";
	            } else if (time >= 3600 && time < 86400) {
	                var h = parseInt(time / 3600);
	                var m = parseInt(time % 3600 / 60);
	                var s = parseInt(time % 3600 % 60 % 60);
	                time = h + "小时" + m + "分钟" + s + "秒";
	            } else if (time >= 86400) {
	                var d = parseInt(time / 86400);
	                var h = parseInt(time % 86400 / 3600);
	                var m = parseInt(time % 86400 % 3600 / 60);
	                var s = parseInt(time % 86400 % 3600 % 60 % 60);
	                time = d + '天' + h + "小时" + m + "分钟" + s + "秒";
	            }
	        }
	        return time;
	    }
	},
	kit:{
		getParameter:function(name){
			return Request.QueryString(name);
		},
		getFxUserInfo:function(){
			var userData = $.fx.server.getCurrentUser();
			if(userData){
				userData.coin = Kg.Cookie.read('FANXING_COIN');
				userData.nickName = Kg.Cookie.read('_gyh_nickName');
				userData.richLevel = Kg.Cookie.read('_gyhRichLevel');
			}
			return userData;
		},
		popRecharge:function(){
			if(!$('#fxRecharge').length){
				$('body').append('<div id="fxRecharge" class="fxPopwin" style="width:684px;"><h3>充值</h3><a class="shut" style="background:none;" href="javascript:;">×</a><div><iframe frameborder="0" scrolling="no" width="684" height="510" src=""></iframe></div></div>');
				window.fxRecharge = FX.win.init('#fxRecharge');
			}
			window.fxRecharge.open();
			$('#fxRecharge iframe').attr('src','/index.php?action=miniRecharge');
		},
		getFlash:function(o){
			swfobject.embedSWF(o.src,o.id, parseInt(o.width)+"px", parseInt(o.height)+"px", "9.0.0", "/static/swf/expressInstall.swf",null,{wmode:"transparent"});
		},
	},
	chat : {
		addMsg:function(time,cont){
			Fx.addPublicMessage("<span class='clearfix red'><em class='time'>" + Fx.dealWithTime(time) + "</em><em class='name red'>" +cont+ "</em></span>");
		},
		user: function(userId,nickName,richLevel){
			return " " +Fx.dealWithNickName(nickName,richLevel,userId)+"<a href='javascript:;' onClick='return showUserOperationList(this,event,2)' _userId='"+ userId +"' _userName='"+ nickName +"' _userLevel='"+ richLevel +"'>" + nickName + "</a> ";
		}
	},
	http: {
		getJSONP: function(url, fn){
			var url,dataType;
			if(new RegExp(vServiceUrl).test(url)){
				url = FX.http.renderURL(url);
				dataType = 'script';
			}else{
				dataType = 'jsonp';
			}
			var callbackName = 'jsonpcallback_' + url.replace(/[^\w]/g,'');
			window[callbackName] = function(json){
				fn(json);
			};

			return  $.ajax({
					  url: url,
					  cache:true,
					  dataType:dataType,
					  jsonp:'jsoncallback',
					  jsonpCallback:callbackName
					});
		},
		renderURL: function(url){
			var act = Request.QueryParam(url,"act");
			var mtd = Request.QueryParam(url,"mtd");
			var args = decodeURIComponent(Request.QueryParam(url,"args")).replace(/(\[)|(\])|(\")/g,"").replace(/\,/g,"-");
			if(args){
				url = vServiceUrl.replace(/(\.php)/g,"") +"/"+act+"."+mtd+"/"+encodeURIComponent(args)+"/";
			}else{
				url = vServiceUrl.replace(/(\.php)/g,"") +"/"+act+"."+mtd+"/";
			}
			return url;
		} 
	},
	roomAct: {
		extend: function(o){
			for(var p in o){
				this[p] = o[p];
			}
			this.init && this.init();
		},
		route: function(type, success, error, routesName){
			var tag = location.host.split('.')[0];
			var routes = this[routesName|| 'routes'];
			var root, req, url, ajaxFn;
			if(tag === 'star'|| tag === 'stardev'){
				root = routes.ROOT||'';//外网root
			}else{
				root = routes.ROOT_DEV|| routes.ROOT||'';//测试root
			}
			root = FX.roomAct.compile(root, routes);
			req = FX.roomAct.compile(routes[type], routes);
			if(req.indexOf('://') === -1){
				url = root + req;
			}else{
				url = req;
			}
			if(url.indexOf('://') === -1){//非跨域
				ajaxFn = $.getJSON;
			}else{//跨域
				ajaxFn = FX.http.getJSONP;
			}
			return ajaxFn(url, function(json){
				if(json.status == 1){
					success && success(json);
				}else{
					error && error(json);
				}
			});
		},
		compile: function(str, routes){
			return str.replace(/\{([^{}]+)\}/g, function(a, b){
				return (routes[b]||'');
			});
		},
		getFile: function(url){
			var _this = this;
			$.get(url, function(str){				
				_this.$box.append(str);
			});
		},
		handle: function(content){
			if(content.cmd === undefined){
				var type = content.type;
			}else{
				var type = content.content.actionId;
			}
			if(this[type]){
				this[type](content);
				return true;
			}
		},
		include: function(actName, dom){
			var $box = typeof dom === 'string'? $(dom): dom;
			var url = '/static/view/room/'+ actName +'.html?r='+ new Date/1;
			FX.roomAct[actName] = new FX.roomAct.Constr();
			FX.roomAct[actName].$box = $box;
			FX.roomAct[actName].getFile(url);
		},
		config: function(cfg){
			var act = FX.roomAct;
			act.Constr.prototype = {
				extend: act.extend,
				route: act.route,
				getFile: act.getFile
			};
			act.BCConstr.prototype = act.PCConstr.prototype = {
				extend: act.extend,
				handle: act.handle
			};
			//广播
			FX.roomAct.broadCast = new FX.roomAct.BCConstr();
			//公聊
			FX.roomAct.publicChat = new FX.roomAct.PCConstr();
			//活动列表
			//FX.http.getJSONP('http://act.fanxing.kugou.com/api.php?act=main.listtype&args=[]', function(json){
			//	if(json.ret == 0){
					//var actArr = json.data;
					var actArr = [];//不请求JSONP默认置空
					var $box = $('#frameRoom');
					for(var p in cfg){
						var actNum = cfg[p];
						if(p.indexOf(' ')!== -1){
							var pArr = p.split(' ');
							p = pArr[0];
							$box = $(pArr[1]);
						}
						if($.inArray(actNum, actArr) !== -1 || actNum === 0){
							FX.roomAct.include(p, $box);
						}
					}
			//	}
			//});
		},
		Constr: function(){},
	},
	isFXC : function(){
		try{
			if(external && external.isFXC()){
				return true;
			}else{
				return false;
			}
		}catch(e){
			return false;
		}
	},
	/*
		常用工具集
	*/
	util: {
		//获得一个随机数
		getRandom: function(min, max){
			var Range = max - min;
			var Rand = Math.random();
			return (min + Math.round(Rand * Range));
		}
	}
	//isIE:!!(document.all&&navigator.userAgent.indexOf('Opera')===-1)
};

/*
* 页面接收参数通用方法
*/
var Request = {
	QueryString: function(item) {
		var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
		return svalue ? svalue[1] : svalue;
	},
	QueryParam: function(url,item) {
		// if(url){

		// }
		var svalue = url.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
		return svalue ? svalue[1] : svalue;
	}
};

/*
* 获取flash对象方法
* movieName为flash在HTML中的ID
*/
function getFlashMovieObject(movieName){
	  if (!window.ActiveXObject){
		  movieName = movieName+"1";
	  }
	  if (window.document[movieName]){
	    return window.document[movieName];
	  }else if (navigator.appName.indexOf("Microsoft")==-1){
	    if (document.embeds && document.embeds[movieName])
	    return document.embeds[movieName];
	  }else{
	    return document.getElementById(movieName);
	  }
	}
/*lazyload.js*/
function Lazyload(option) {
	this.setOption(option);
	var imgs = document.images;
	var _this = this;
	this.lazyImgs = [];
	this.push();
	if (this.option.scroll) {
		this.timer = setInterval(function() {
			var l = _this.lazyImgs.length;
			var size = Kg.getBodySize();
			var arr = [];
			for (var i = 0; i < _this.lazyImgs.length; i++) {
				if (_this.lazyImgs[i].offsetHeight <= 0) continue;
				if (_this.lazyImgs[i].getBoundingClientRect().top <= (size.cH - 1)) {
					arr.push(_this.lazyImgs[i]);
					_this.lazyImgs.splice(i, 1);
					i--
				}
			}
			_this.loadPic(arr)
		},
		100)
	} else {
		this.loadPic(this.lazyImgs)
	}
};
Lazyload.prototype.push = function(arr) {
	var imgs = document.images;
	if (arr) {
		img = arr
	}
	for (var i = 0; i < imgs.length; i++) {
		var relSrc = imgs[i].getAttribute(this.option.realSrc);
		var isLoading = imgs[i].getAttribute(this.option.loading);
		if (relSrc && (relSrc != imgs[i].src) && !isLoading) {
			imgs[i].setAttribute(this.option.loading, this.option.loading);
			this.lazyImgs.push(imgs[i]);
			if (imgs[i].getAttribute(this.option.defaultSrc)) {
				imgs[i].onerror = function() {
					this.src = this.getAttribute(_this.option.defaultSrc)
				}
			}
		}
	}
};
Lazyload.prototype.loadPic = function(arr) {
	for (var i = 0, l = arr.length; i < l; i++) {
		arr[i].src = arr[i].getAttribute(this.option.realSrc);
		try{
			Kg.setOpacity(arr[i],0);
			Kg.fadein(arr[i],10,10);
		}catch(e){
			
		}
		
		arr[i].removeAttribute(this.option.loading)
	}
};
Lazyload.prototype.setOption = function(option) {
	this.option = {
		realSrc: "_src",
		defaultSrc: "_def",
		scroll: true,
		iframe: false,
		iframeId: null,
		loading: "loading"
	};
	Kg.extend(this.option, option || {},
	true)
};
/**
 * 前端模板类 v1.0
 * @data 2014/6/23
 */
;(function(){
  //Fxtpl命名空间
  var Fxtpl = {
    render : function(id, data, options){//渲染模板
      data = data || this.data;
      var elm = document.getElementById(id), fn, html;
      if(elm){
        if(id in this.cache){
          fn = this.cache[id];
        }else{
          fn = this.cache[id] = this.compile(elm.innerHTML, '', options);
        }
        try{
          html = fn(data);
        }catch(e){
          html = Fxtpl.error(e, '#'+ id, 'Render');
        }
        if(elm.nodeName.toUpperCase() !== 'SCRIPT'){
          html = html.replace(/<[^>]+>/g, function(a){
            return a.replace(/\btpl:/ig,'');//替换tpl虚构标签
          });
          elm.innerHTML = html;//TODO: 兼容IE某些tag不能innerHTML的情况
          elm.style.visibility = 'visible';
        }
        return html;
      }else{
        if(hasConsole && options && options.debug)
        	console.warn('Fxtpl cannot find \''+ id +'\'');
      }
    },
    compile : function(str, data, options){//编译字符串
      var rep = this.__proto__?
        ["var s='';", "s+='", "';", "'+(", ")+'", "return s;"]:
        ["var s=[];", "s.push('", "');", "',", ",'", "return s.join('');"];
      var o = options || {};
      var _this = this;
      var _left = o.leftTag || this.config.leftTag;
      var _right = o.rightTag || this.config.rightTag;
      if(/</.test(_left)){
        var _l = _left.replace('<','&lt;');
        var _r = _right.replace('>','&gt;');
        str = str.split(_l).join(_left).split(_r).join(_right);
      }
      var escape = o.escape || this.config.escape;
      var varString = [];
      var fnBody = rep[0] + rep[1] +
        str
        .replace(/[\r\t\n]/g, "")
        .split(_left).join("\t")
        .split(_right).join("\r")
        .replace(/((^|\r)([^\t]*))/g, function(a,b,c,d){//html处理
          return c + d.replace(/('|\\)/g, '\\$1');
        })
        .replace(/(\t)(.*?)(\r)/g, function(a,b,c){//code处理
          return _this.parsing(c
          	.replace(/&amp;/g,'&')
          	.replace(/&lt;/g,'<')
          	.replace(/&gt;/g,'>'), varString, rep, escape);
        }) +
        rep[2] + rep[5];
      fnBody = varString.join('') + fnBody;
      if(o.debug && hasConsole){
        console.log('Template HTML:' + str);
        console.log('Template Render:\nfunction(data){' + fnBody + '}');
      }
      try{
        var fn = new Function("data", fnBody);
        return data? fn(data): fn;
      }catch(e){
        var eMsg = Fxtpl.error(e, str, 'Compile');
        return function(){
          return eMsg;
        };
      }
    },
    parsing : function(code, varString, rep, escape){//编译语法
      var codeArr = code.replace(/^\s*|\s*$/g,'').replace(/\s{2,}/g,' ').split(' ');//处理多余空格后分组
      var varArr = /\$(\w+)/g.exec(code);
      if(varArr && !varString[varArr[1]]){//储存变量
        varString.push('var $',varArr[1],'=data.',varArr[1],';');
        varString[varArr[1]] = true;
      }
      switch(codeArr[0]){
        case 'if':
          return rep[2] + 'if('+ code.slice(3) +'){' + rep[1];
        case 'else':
          return rep[2] + '}else{' + rep[1];
        case 'elseif':
          return rep[2] + '}else if('+ code.slice(7) +'){' + rep[1];
        case '/if':
          return rep[2] + '}' + rep[1];
        case 'each':
          var e_o = codeArr[1];
          var e_p = codeArr[3] || '$item';
          var e_i = (codeArr[2] === 'as'? codeArr[4]: codeArr[2]) || '$index';
          return rep[2] + 'Fxtpl.each('+ e_o +',function('+ e_p +','+ e_i +'){' + rep[1];
        case '/each':
          return rep[2] + '});' + rep[1];
        case 'include':
          return rep[3] + 'Fxtpl.render('+ codeArr.slice(1).join('') +')' + rep[4];
        default://输出变量
          if(/[^|]\|[^|]/.test(code)){//helpers
            code = Fxtpl.filter(code);
          }
          return rep[3] + (escape?'Fxtpl.escape(String('+ code +'))' : code) + rep[4];
      }
    },
    filter: function(code){
      var arr = code.split('|');
      var str = arr[0];
      var len = arr.length;
      for(var i = 1; i < len; i++){
        var fnArr = arr[i].replace(/^\s+/, '').split(' ');
        var fnName = fnArr.shift();
        var args = fnArr.join(' ');
        args = args? ', ' + args : args;
        str = 'Fxtpl.helpers.' + fnName + '(' + str + args + ')';
      }
      return str;
    },
    escape : function(str){//HTML转义
      return str
          .replace(/&/g,'&amp;')
          .replace(/</g,'&lt;')
          .replace(/>/g,'&gt;')
          .replace(/"/g,'&quot;')
          .replace(/'/g,'&#39;');
    },
    each : function(data, callback){//遍历对象
      if (({}).toString.call(data) === '[object Array]') {
          for (var i = 0, len = data.length; i < len; i++) {
              callback.call(data[i], data[i], i);
          }
      } else {
          for (var p in data) {
              callback.call(data[p], data[p], p);
          }
      }
    },
    helpers: {
      escape: function(str){
        return Fxtpl.escape(String(str));
      }
    },
    error: function(e, id, type){
      var pos = id.length > 100? id.slice(0, 100)+ '...': id;
      var eMsg = 'Fxtpl '+ type +' Error: ' + e.message + ' in \'' + pos +'\'';
      hasConsole && console.error(eMsg);
      return eMsg;
    },
    cache : {},//模板函数缓存
    data : {},//模板全局数据缓存
    config: {//模板全局配置
      leftTag : '<!--[',//语法左分隔符
      rightTag : ']-->',//语法左右隔符
      escape : false//模板输出的变量是否HTML转义
    }
  };
  //浏览器调式判断
  var hasConsole = !!window.console;
  //输出全局变量
  window.Fxtpl = Fxtpl;
})();
/**
 * 繁星前端模板类改造
 */
//设置别名
FX.template = Fxtpl;
Fxtpl.__render = Fxtpl.render;
//设置display = 'block'(历史原因)
FX.template.render = function(a, b, c){
	var html = Fxtpl.__render(a, b, c),
		e = document.getElementById(a);
	if(e && e.nodeName.toUpperCase() !== 'SCRIPT'){
		e.style.display = 'block';
	}
	return html;
};
//fxtpl 一些辅助方法
Fxtpl.helpers.dateFormat = function(servertime, format){
	var date = new Date(servertime * 1000);
    var map = {
        "M": date.getMonth() + 1, //月份 
        "D": date.getDate(), //日 
        "h": date.getHours(), //小时 
        "m": date.getMinutes(), //分 
        "s": date.getSeconds(), //秒 
        "q": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    format = format.replace(/([YMDhmsqS])+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(v.length-2);
            }
            return v;
        }
        else if(t === 'Y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
};