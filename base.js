/**
 * 基类库
 */
var Kg = Kg || {
        Ver:102,
        /**
         *浏览器判断
         * @id UA
         */
        UA:{
            Ie:!!document.all,
            Ie6:!!document.all && !window.XMLHttpRequest,
            Ie7:!!document.all && /msie 7.0/gi.test(window.navigator.appVersion),
            Ie8:!!document.all && /msie 8.0/gi.test(window.navigator.appVersion),
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
         * 判断是否子孙后代关系
         * @id isFather
         * @param {String | Object} 父层DOM对象或者ID
         * @param {String | Object} 子层DOM对象或者ID
         * @param {Boolean} 是否允许2个DOM对象为同一个对象
         * @return {Boolean} 返回两种是否子孙后代关系
         */
        isFather:function (father, child, bol){
            father = this.$(father);
            child = this.$(child);

            if(bol && (father == child))
                return true;

            if(father.compareDocumentPosition)
                return father.compareDocumentPosition(child) == 20;

            while(child && child.parentNode){
                child = child.parentNode;
                if(child == father) return true;
            }
            return false;
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
            document.all?
                el.style.filter = "Alpha(Opacity=" + num + ")":
                el.style.opacity = num/100;
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
            rewriteKey: function(name, key, keyVal, exp, path, domain, secure){
                var str = key;
                if(keyVal){
                    var cookie = this.read(name);
                    var reg = new RegExp("\\b" + key +"=([^&]*)\\b","g");
                    str = cookie.replace(reg,function(m1, m2){
                        return m1.replace(m2,keyVal);
                    })
                }
                if(/^\d+(s|m|h|d)$/i.test(exp)){
                    if(/^\d+s$/i.test(exp)) this.setSec(name, str, (exp.replace(/s$/i,"")), path, domain, secure);
                    if(/^\d+m$/i.test(exp)) this.setMin(name, str, (exp.replace(/m$/i,"")), path, domain, secure);
                    if(/^\d+h$/i.test(exp)) this.setHour(name, str, (exp.replace(/h$/i,"")), path, domain, secure);
                    if(/^\d+d$/i.test(exp)) this.setDay(name, str, (exp.replace(/d$/i,"")), path, domain, secure);
                } else {
                    this.write(name, str, exp, path, domain, secure);
                }
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

/*Debug*/
var log = function(obj) {
    if (window.console) {
        console.log(obj);
    } else {
        alert(obj);
    }
}

var getId = function(str) {
    return document.getElementById(str);
}

String.prototype.getBytes = function() {
    var bytes = 0;
    for (var i = 0, l = this.length; i < l; i++) {
        if (this.charCodeAt(i) > 256) { bytes += 2; }
        else { bytes += 1; }
    }
    return bytes;
};

String.prototype.trim = function(){return this.replace(/^\s*|\s*$/g,"");};

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
}

function sdnClick(num, async) {
    async = async || true;
    if(async){//异步
        try {
            setTimeout(function(){
                (new Image()).src = "http://sdn.kugou.com/link.aspx?id=" + num + "&url=&t=" + Math.random();
            },0);
        } catch (ex) { }
    } else {
        try {
            (new Image()).src = "http://sdn.kugou.com/link.aspx?id=" + num + "&url=&t=" + Math.random();
        } catch (ex) { }
    }
    return false;
};

function logClick(id, async) {
    async = async || true;
    if(async){//异步
        try {
            setTimeout(function(){
                (new Image()).src = "http://log.kugou.com/get/?t=2&v=1&sub=&ex=&md5=&id=" + id + "&d=" + Math.random();
            },0);
        } catch (ex) { }
    } else {
        try {
            (new Image()).src = "http://log.kugou.com/get/?t=2&v=1&sub=&ex=&md5=&id=" + id + "&d=" + Math.random();
        } catch (ex) { }
    }
};

Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "\u65e5",
        "1" : "\u4e00",
        "2" : "\u4e8c",
        "3" : "\u4e09",
        "4" : "\u56db",
        "5" : "\u4e94",
        "6" : "\u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

/*
 * 页面接收参数通用方法
 */
var Request = {
    QueryString: function(item) {
        var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
        return svalue ? svalue[1] : svalue;
    }
};

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
     * shareTo 分享接口
     * @param {string} siteName 分享方式: Qzone(QQ空间) | kaixin001(开心网) | renren(人人网) | itieba(i贴吧) | baiduhi(百度hi) | n51(51游戏) | weibo(新浪微博) | t163(网易微博) | w139(139) | mail163(网易邮箱) | douban(豆瓣) | digu(嘀咕) | taobao(淘宝) | feixin(飞信) | QQweibo(qq微博) | msncn(微软msn) | tsohu(搜狐微博) | qqpengyou(朋友网) | tianya(天涯)
     * @param {object} ops 参数接口
     * @return {void}
     */
    shareTo: function(siteName, ops) {
        var option = {
                //新开窗口宽度
                popupWidth:615,
                //新开窗口高度
                popupHeight:505,
                //分享标题
                title:"",
                //分享链接
                url:"",
                //分享内容
                content:"",
                //分享图片地址
                imgSrc:"",
                //分享视频swf地址
                swf:"",
                //(腾讯微博,网易微博) 用参数，您的网站地址(可选)
                site:"http://www.kugou.com/",
                //(新浪微博,腾讯微博) 用参数，您申请的应用appkey,显示分享来源(可选)
                appkey:"",
                //(139微博，网易微博) 用参数，分享来源
                source:"",
                //(新浪微博) 用参数,关联用户的UID，分享微博会@该用户(可选)
                ralateUid:""
            },
            winSrc = "",
            queryStr = "",
            showPopup = false;
        if (ops) {
            option.title = ops.title || document.title;
            option.url = ops.url || window.location.href;
            option.content = ops.content || document.title;
            option.imgSrc = ops.imgSrc || "";
            option.swf = ops.swf || "";
        } else {
            option.title = document.title;
            option.url = window.location.href;
            option.content = document.title;
            option.imgSrc = "";
            option.swf = "";
        }

        var _title = encodeURIComponent(option.title),
            _url = encodeURIComponent(option.url),
            _content = encodeURIComponent(option.content),
            _imgSrc =  encodeURI(option.imgSrc);
        _swf = encodeURI(option.swf);


        switch(siteName){
            case "Qzone"://ok
                showPopup = true;
                winSrc = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey";
                queryStr = [
                    "url=" + _url,
                    "title=" + _title,
                    "desc=" + _content,
                    "pics=" + _imgSrc
                ].join("&");
                break;

            case "kaixin001"://ok
                showPopup = true;
                winSrc = "http://www.kaixin001.com/repaste/share.php";
                queryStr = [
                    "rurl=" + _url,
                    "rtitle=" + _title,
                    "rcontent=" + _content
                ].join("&");
                break;

            case "renren"://ok
                showPopup = true;
                option.popupHeight = 460;
                winSrc = "http://widget.renren.com/dialog/share";
                queryStr = [
                    "link=" + _url,
                    "title=" + _title,
                    "image_src=" + _imgSrc,
                    "description=" + _content
                ].join("&");
                break;

            case 'itieba'://ok
                showPopup = true;
                option.popupWidth = 626;
                option.popupHeight = 436;
                if(option.title.length > 30){
                    _title = encodeURIComponent(option.title.substr(0,30));
                };
                winSrc = "http://tieba.baidu.com/i/sys/share";
                queryStr = [
                    //"type=video",
                    "link=" + _url,
                    "title=" + _title,
                    "content=" + _content

                ].join("&");
                break;

            case 'baiduhi'://ok
                showPopup = true;
                option.popupWidth = 800;
                option.popupHeight = 505;
                winSrc = "http://apps.hi.baidu.com/share/";
                queryStr = [
                    "url=" + _url
                ].join("&");
                break;

            case 'n51'://ok
                showPopup = true;
                option.popupWidth = 860;
                option.popupHeight = 505;
                winSrc = "http://share.51.com/share/out_share_video.php";
                queryStr = [
                    "vaddr=" + _url,
                    "title=" + _title,
                    "charset=utf-8"
                ].join("&");
                break;

            case 'weibo'://ok
                showPopup = true;
                option.popupWidth = 615;
                option.popupHeight = 505;
                winSrc = "http://service.weibo.com/share/share.php";
                queryStr = [
                    "url=" + _url,
                    "appkey=" + option.appkey,
                    "title=" + _title,
                    "pic=" + _imgSrc,
                    "ralateUid=" + option.ralateUid
                ].join("&");
                break;
            case 't163'://ok
                showPopup = true;
                option.popupWidth = 550;
                option.popupHeight = 330;
                winSrc = "http://t.163.com/article/user/checkLogin.do";
                queryStr = [
                    "link=" + option.site,
                    //source="encodeURIComponent(我乐网)",
                    "source=" + encodeURIComponent(option.source),
                    "info=" + _title + " " + _url,
                    new Date().getTime()
                ].join("&");
                break;

            case 'w139'://ok
                setStat('u_w139');
                showPopup = true;
                option.popupWidth = 490;
                option.popupHeight = 340;
                winSrc = "http://www.139.com/share/share.php";
                queryStr = [
                    //"tl=953010004",
                    "source=" + option.source,
                    "title=" + _title,
                    "url=" + _url
                ].join("&");
                break;

            case 'mail163':
                showPopup = true;
                option.popupWidth = 615;
                option.popupHeight = 505;
                winSrc = "http://share.mail.163.com/videomail/index.do";
                queryStr = [
                    //"from=56",
                    "vaddr=" + _url,
                    "title=" + _title
                ].join("&");
                break;

            case 'douban'://ok
                showPopup = true;
                option.popupWidth = 615;
                option.popupHeight = 320;
                winSrc = "http://www.douban.com/recommend/";
                queryStr = [
                    "url=" + _url,
                    "title=" + _title
                ].join("&");
                break;

            case 'digu'://ok
                document.getElementsByTagName('body')[0].setAttribute('sourceId','1007');
                jns.jcLoader({type:"js",url:'http://images.digu.com/web_res_v1/js/bookmark_new.js?'+new Date().getTime()});
                return;
                break;

            case 'taobao'://ok
                showPopup = true;
                option.popupWidth = 615;
                option.popupHeight = 505;
                winSrc = "http://share.jianghu.taobao.com/share/addShare.htm";
                queryStr = [
                    "url=" + _url
                ].join("&");
                break;
            case 'feixin'://ok
                showPopup = true;
                option.popupWidth = 1000;
                option.popupHeight = 505;
                winSrc = "http://space.feixin.10086.cn/api/share";
                queryStr = [
                    "source=sharelink",
                    "title=" + _title,
                    "url=" + _url
                ].join("&");
                break;
            case 'QQweibo'://ok
                showPopup = true;
                option.popupWidth = 700;
                option.popupHeight = 680;
                var _appkey = encodeURI(option.appkey);//你从腾讯获得的appkey
                var _pic = _imgSrc;//（例如：var _pic='图片url1|图片url2|图片url3....）
                winSrc = "http://v.t.qq.com/share/share.php";
                queryStr = [
                    "title=" + _title,
                    "url=" + _url,
                    "appkey=" + _appkey,
                    "site=" + option.site,
                    "pic=" + _pic
                ].join("&");
                break;
            case 'msncn':
                showPopup = true;
                option.popupWidth = 480;
                option.popupHeight = 395;
                winSrc = "http://profile.live.com/badge";
                queryStr = [
                    "url=" + _url,
                    "title=" + _title,
                    "description=" + _content,
                    "screenshot=" +  _imgSrc,
                    "swfurl=" + encodeURIComponent(_swf),
                    //"ctype=flash",
                    "height=" + option.popupWidth,
                    "width=" + option.popupHeight,
                ].join("&");
                break;
            case 'tsohu'://ok
                var url = _url.replace(/^(.*?)\.html(.*?)$/ig, "$1.html");
                (function(s,d,e,r,l,p,t,z,c){var f='http://t.sohu.com/third/post.jsp?',u=z||d.location,p=['&url=',e(u),'&title=',e(t||d.title),'&content=',c||'gb2312','&pic=',e(p||'')].join('');function a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=660,height=470,left=',(s.width-660)/2,',top=',(s.height-470)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else a();})(screen,document,encodeURIComponent,'','',_imgSrc,option.title,url,'utf-8');
                return;
                break;
            case 'qqpengyou'://ok
                showPopup = true;
                option.popupWidth = 615;
                option.popupHeight = 505;
                winSrc = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey";
                queryStr = [
                    "to=pengyou",
                    "url=" + _url
                ].join("&");
                break;
            case 'tianya'://ok
                showPopup = true;
                winSrc = "http://www.tianya.cn/new/share/compose.asp";
                queryStr = [
                    "itemtype=tech",
                    "item=665",
                    "strTitle=" + _title,
                    "strFlashURL=" + encodeURIComponent(_swf),
                    "strContent=" + _content,
                    "strFlashPageURL=" + _url,
                    "sIMG_1=" + _imgSrc
                ].join("&");
                break;
            default :
                return;

        };
        if(showPopup){
            var l = (screen.width - option.popupWidth)/2,
                t = (screen.height - option.popupHeight)/2,
                resultUrl = winSrc + "?" + queryStr;

            if(!window.open(resultUrl,"_blank","width=" + option.popupWidth + ",height=" + option.popupHeight + ",left=" + l + ",top=" + t)){
                location.href = resultUrl;
            };
        }
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
                    var timeVal = o[k].fn(hasLast);log(timeVal.toString().length)
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

Fs.debug.mode = Request.QueryString("debug");