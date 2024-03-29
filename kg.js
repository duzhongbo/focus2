/**
 * @classDescription  焦点图构造函数
 * @type {Object}
 * @param {String | Object} 焦点图父层的id或者Dom对象 
 * @param {String}  需切换显示的元素
 * @param {String | Object} 控制器父层的id或者Dom对象 
 * @param {String}  控制器元素
 * @param {Object}  参数集合（包括event,effect,scrollDir,scrollSpeed,scrollMode,timeout,index,callback）
 */ 
function Focus(sTarget, sControl, opiton){
	this.setOption(opiton);	
	this.imgs = $(sTarget);
	this.ctrs =  sControl ? $(sControl):null;
	this.l = this.imgs.length;
	this.timer = null;
	var self = this;
	if(this.option.effect === "fade" && this.ctrs){
		for(var i = 0; i < this.l; i++){
			$(sControl).bind(this.option.event,function (i) {
				self.over(i);
			})

			$(sControl).bind('mouseout',function () {
				self.start();
			})

			$(sControl).bind('mouseover',function(){
				clearTimeout(self.timer);
			})
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

	$.extend(this.option, option || {}, true);
};

Focus.prototype.start = function(){
	var self = this;
	this.timer = setTimeout(function(){
		self.change();
	},this.option.timeout)
};

Focus.prototype.change = function(){
	if(this.option.effect === "fade"){
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

		current.timer = $(current).fadeOut("normal",function(){
			_this.reset();
			_this.start();
			_this.option.callback && _this.option.callback(this);			
		})
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
	$(resetEl).css("opacity",1);
};

Focus.prototype.over = function(i){
	clearTimeout(this.timer);
	
	if(this.option.effect === "fade"){
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

