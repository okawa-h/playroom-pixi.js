// Generated by Haxe 3.4.7
(function ($hx_exports) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Main = function() { };
Main.main = function() {
	jp_okawa_js_EasingTools.addJQuery();
	$(window.document).ready(Manager.init);
};
var Manager = function() { };
Manager.init = function(event) {
	display_Window.init();
	Manager._jAll = $("#all");
	Manager._jMain = $("#main");
	Manager._jFooter = $("#footer");
	Manager._scrollTop = display_Window.getScrollTop();
	Manager._background = new display_Background($("#about-bg").get(0));
	display_Window.setEvent("resize",Manager.onResize,true);
	display_Window.setEvent("scroll",Manager.onScroll,true);
};
Manager.onResize = function(event) {
};
Manager.onScroll = function(event) {
	var winH = display_Window.getHeight();
	var scrollTop = display_Window.getScrollTop();
	var startLine = Manager._jMain.offset().top;
	var endLine = Manager._jFooter.offset().top - winH;
	if(startLine <= scrollTop + winH * .5) {
		Manager._background.onSlideIn();
	}
	if(endLine <= scrollTop) {
		Manager._background.onHide();
	}
	if(scrollTop <= endLine) {
		Manager._background.onShow();
	}
	Manager._background.onScroll(scrollTop - Manager._scrollTop);
	Manager._scrollTop = scrollTop;
};
var Perf = $hx_exports["Perf"] = function(pos,offset) {
	if(offset == null) {
		offset = 0;
	}
	if(pos == null) {
		pos = "TR";
	}
	this._perfObj = window.performance;
	if(Reflect.field(this._perfObj,"memory") != null) {
		this._memoryObj = Reflect.field(this._perfObj,"memory");
	}
	this._memCheck = this._perfObj != null && this._memoryObj != null && this._memoryObj.totalJSHeapSize > 0;
	this._pos = pos;
	this._offset = offset;
	this.currentFps = 60;
	this.currentMs = 0;
	this.currentMem = "0";
	this.lowFps = 60;
	this.avgFps = 60;
	this._measureCount = 0;
	this._totalFps = 0;
	this._time = 0;
	this._ticks = 0;
	this._fpsMin = 60;
	this._fpsMax = 60;
	this._startTime = this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null ? this._perfObj.now() : new Date().getTime();
	this._prevTime = -Perf.MEASUREMENT_INTERVAL;
	this._createFpsDom();
	this._createMsDom();
	if(this._memCheck) {
		this._createMemoryDom();
	}
	if(($_=window,$bind($_,$_.requestAnimationFrame)) != null) {
		this.RAF = ($_=window,$bind($_,$_.requestAnimationFrame));
	} else if(window.mozRequestAnimationFrame != null) {
		this.RAF = window.mozRequestAnimationFrame;
	} else if(window.webkitRequestAnimationFrame != null) {
		this.RAF = window.webkitRequestAnimationFrame;
	} else if(window.msRequestAnimationFrame != null) {
		this.RAF = window.msRequestAnimationFrame;
	}
	if(($_=window,$bind($_,$_.cancelAnimationFrame)) != null) {
		this.CAF = ($_=window,$bind($_,$_.cancelAnimationFrame));
	} else if(window.mozCancelAnimationFrame != null) {
		this.CAF = window.mozCancelAnimationFrame;
	} else if(window.webkitCancelAnimationFrame != null) {
		this.CAF = window.webkitCancelAnimationFrame;
	} else if(window.msCancelAnimationFrame != null) {
		this.CAF = window.msCancelAnimationFrame;
	}
	if(this.RAF != null) {
		this._raf = this.RAF.apply(window,[$bind(this,this._tick)]);
	}
};
Perf.prototype = {
	_init: function() {
		this.currentFps = 60;
		this.currentMs = 0;
		this.currentMem = "0";
		this.lowFps = 60;
		this.avgFps = 60;
		this._measureCount = 0;
		this._totalFps = 0;
		this._time = 0;
		this._ticks = 0;
		this._fpsMin = 60;
		this._fpsMax = 60;
		this._startTime = this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null ? this._perfObj.now() : new Date().getTime();
		this._prevTime = -Perf.MEASUREMENT_INTERVAL;
	}
	,_now: function() {
		if(this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null) {
			return this._perfObj.now();
		} else {
			return new Date().getTime();
		}
	}
	,_tick: function(val) {
		var time = this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null ? this._perfObj.now() : new Date().getTime();
		this._ticks++;
		if(this._raf != null && time > this._prevTime + Perf.MEASUREMENT_INTERVAL) {
			this.currentMs = Math.round(time - this._startTime);
			this.ms.innerHTML = "MS: " + this.currentMs;
			this.currentFps = Math.round(this._ticks * 1000 / (time - this._prevTime));
			if(this.currentFps > 0 && val > Perf.DELAY_TIME) {
				this._measureCount++;
				this._totalFps += this.currentFps;
				this.lowFps = this._fpsMin = Math.min(this._fpsMin,this.currentFps);
				this._fpsMax = Math.max(this._fpsMax,this.currentFps);
				this.avgFps = Math.round(this._totalFps / this._measureCount);
			}
			this.fps.innerHTML = "FPS: " + this.currentFps + " (" + this._fpsMin + "-" + this._fpsMax + ")";
			if(this.currentFps >= 30) {
				this.fps.style.backgroundColor = Perf.FPS_BG_CLR;
			} else if(this.currentFps >= 15) {
				this.fps.style.backgroundColor = Perf.FPS_WARN_BG_CLR;
			} else {
				this.fps.style.backgroundColor = Perf.FPS_PROB_BG_CLR;
			}
			this._prevTime = time;
			this._ticks = 0;
			if(this._memCheck) {
				this.currentMem = this._getFormattedSize(this._memoryObj.usedJSHeapSize,2);
				this.memory.innerHTML = "MEM: " + this.currentMem;
			}
		}
		this._startTime = time;
		if(this._raf != null) {
			this._raf = this.RAF.apply(window,[$bind(this,this._tick)]);
		}
	}
	,_createDiv: function(id,top) {
		if(top == null) {
			top = 0;
		}
		var div = window.document.createElement("div");
		div.id = id;
		div.className = id;
		div.style.position = "absolute";
		var _g = this._pos;
		switch(_g) {
		case "BL":
			div.style.left = this._offset + "px";
			div.style.bottom = (this._memCheck ? 48 : 32) - top + "px";
			break;
		case "BR":
			div.style.right = this._offset + "px";
			div.style.bottom = (this._memCheck ? 48 : 32) - top + "px";
			break;
		case "TL":
			div.style.left = this._offset + "px";
			div.style.top = top + "px";
			break;
		case "TR":
			div.style.right = this._offset + "px";
			div.style.top = top + "px";
			break;
		}
		div.style.width = "80px";
		div.style.height = "12px";
		div.style.lineHeight = "12px";
		div.style.padding = "2px";
		div.style.fontFamily = Perf.FONT_FAMILY;
		div.style.fontSize = "9px";
		div.style.fontWeight = "bold";
		div.style.textAlign = "center";
		window.document.body.appendChild(div);
		return div;
	}
	,_createFpsDom: function() {
		this.fps = this._createDiv("fps");
		this.fps.style.backgroundColor = Perf.FPS_BG_CLR;
		this.fps.style.zIndex = "995";
		this.fps.style.color = Perf.FPS_TXT_CLR;
		this.fps.innerHTML = "FPS: 0";
	}
	,_createMsDom: function() {
		this.ms = this._createDiv("ms",16);
		this.ms.style.backgroundColor = Perf.MS_BG_CLR;
		this.ms.style.zIndex = "996";
		this.ms.style.color = Perf.MS_TXT_CLR;
		this.ms.innerHTML = "MS: 0";
	}
	,_createMemoryDom: function() {
		this.memory = this._createDiv("memory",32);
		this.memory.style.backgroundColor = Perf.MEM_BG_CLR;
		this.memory.style.color = Perf.MEM_TXT_CLR;
		this.memory.style.zIndex = "997";
		this.memory.innerHTML = "MEM: 0";
	}
	,_getFormattedSize: function(bytes,frac) {
		if(frac == null) {
			frac = 0;
		}
		var sizes = ["Bytes","KB","MB","GB","TB"];
		if(bytes == 0) {
			return "0";
		}
		var precision = Math.pow(10,frac);
		var i = Math.floor(Math.log(bytes) / Math.log(1024));
		return Math.round(bytes * precision / Math.pow(1024,i)) / precision + " " + sizes[i];
	}
	,addInfo: function(val) {
		this.info = this._createDiv("info",this._memCheck ? 48 : 32);
		this.info.style.backgroundColor = Perf.INFO_BG_CLR;
		this.info.style.color = Perf.INFO_TXT_CLR;
		this.info.style.zIndex = "998";
		this.info.innerHTML = val;
	}
	,clearInfo: function() {
		if(this.info != null) {
			window.document.body.removeChild(this.info);
			this.info = null;
		}
	}
	,destroy: function() {
		this.CAF.apply(window,[this._raf]);
		this._raf = null;
		this._perfObj = null;
		this._memoryObj = null;
		if(this.fps != null) {
			window.document.body.removeChild(this.fps);
			this.fps = null;
		}
		if(this.ms != null) {
			window.document.body.removeChild(this.ms);
			this.ms = null;
		}
		if(this.memory != null) {
			window.document.body.removeChild(this.memory);
			this.memory = null;
		}
		this.clearInfo();
		this.currentFps = 60;
		this.currentMs = 0;
		this.currentMem = "0";
		this.lowFps = 60;
		this.avgFps = 60;
		this._measureCount = 0;
		this._totalFps = 0;
		this._time = 0;
		this._ticks = 0;
		this._fpsMin = 60;
		this._fpsMax = 60;
		this._startTime = this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null ? this._perfObj.now() : new Date().getTime();
		this._prevTime = -Perf.MEASUREMENT_INTERVAL;
	}
	,_cancelRAF: function() {
		this.CAF.apply(window,[this._raf]);
		this._raf = null;
	}
};
var Reflect = function() { };
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
var pixi_plugins_app_Application = function() {
	this._animationFrameId = null;
	this.pixelRatio = 1;
	this.autoResize = true;
	this.transparent = false;
	this.antialias = false;
	this.forceFXAA = false;
	this.roundPixels = false;
	this.legacy = false;
	this.clearBeforeRender = true;
	this.preserveDrawingBuffer = false;
	this.backgroundColor = 16777215;
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.position = "static";
};
pixi_plugins_app_Application.prototype = {
	_setDefaultValues: function() {
		this._animationFrameId = null;
		this.pixelRatio = 1;
		this.autoResize = true;
		this.transparent = false;
		this.antialias = false;
		this.forceFXAA = false;
		this.roundPixels = false;
		this.legacy = false;
		this.clearBeforeRender = true;
		this.preserveDrawingBuffer = false;
		this.backgroundColor = 16777215;
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.position = "static";
	}
	,start: function(rendererType,parentDom,canvasElement) {
		if(rendererType == null) {
			rendererType = "auto";
		}
		if(canvasElement == null) {
			this.canvas = window.document.createElement("canvas");
			this.canvas.style.width = this.width + "px";
			this.canvas.style.height = this.height + "px";
			this.canvas.style.position = this.position;
		} else {
			this.canvas = canvasElement;
		}
		if(this.autoResize) {
			window.onresize = $bind(this,this._onWindowResize);
		}
		var renderingOptions = { };
		renderingOptions.width = this.width | 0;
		renderingOptions.height = this.height | 0;
		renderingOptions.view = this.canvas;
		renderingOptions.backgroundColor = this.backgroundColor;
		renderingOptions.resolution = this.pixelRatio;
		renderingOptions.antialias = this.antialias;
		renderingOptions.forceFXAA = this.forceFXAA;
		renderingOptions.autoResize = this.autoResize;
		renderingOptions.transparent = this.transparent;
		renderingOptions.clearBeforeRender = this.clearBeforeRender;
		renderingOptions.preserveDrawingBuffer = this.preserveDrawingBuffer;
		renderingOptions.roundPixels = this.roundPixels;
		renderingOptions.legacy = this.legacy;
		if(rendererType == null) {
			this.app = new PIXI.Application(renderingOptions);
		} else if(rendererType == "canvas") {
			renderingOptions.forceCanvas = true;
			this.app = new PIXI.Application(renderingOptions);
		} else {
			this.app = new PIXI.Application(renderingOptions);
		}
		this.stage = this.app.stage;
		this.renderer = this.app.renderer;
		if(parentDom == null) {
			window.document.body.appendChild(this.app.view);
		} else {
			parentDom.appendChild(this.app.view);
		}
		this.app.ticker.add($bind(this,this._onRequestAnimationFrame));
	}
	,pauseRendering: function() {
		this.app.stop();
	}
	,resumeRendering: function() {
		this.app.start();
	}
	,_onWindowResize: function(event) {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.app.renderer.resize(this.width,this.height);
		this.canvas.style.width = this.width + "px";
		this.canvas.style.height = this.height + "px";
		if(this.onResize != null) {
			this.onResize();
		}
	}
	,_onRequestAnimationFrame: function() {
		if(this.onUpdate != null) {
			this.onUpdate(this.app.ticker.deltaTime);
		}
	}
	,addStats: function() {
		if(window.Perf != null) {
			var rendererType = this.app.renderer.type;
			var renderer;
			switch(rendererType) {
			case 1:
				renderer = "WEBGL";
				break;
			case 2:
				renderer = "CANVAS";
				break;
			default:
				renderer = "UNKNOWN";
			}
			new Perf().addInfo(renderer + " - " + this.pixelRatio);
		}
	}
};
var display_Background = function(parentDom) {
	this._isScrolled = this._isHide = this._isCenter = false;
	this._containers = [];
	pixi_plugins_app_Application.call(this);
	this.autoResize = true;
	this.position = "fixed";
	this.width = display_Window.getWidth();
	this.height = display_Window.getHeight();
	this.backgroundColor = 26214;
	this.transparent = true;
	this.antialias = true;
	this.onUpdate = $bind(this,this.animate);
	this.onResize = $bind(this,this.resize);
	pixi_plugins_app_Application.prototype.start.call(this,"auto",parentDom);
	var _g = 0;
	while(_g < 500) {
		var i = _g++;
		var container = new display_ShapeContainer();
		var object = new display_ShapeObject();
		container.x = display_Window.getWidth() * .5;
		container.y = -object.getMaxPoint().y;
		container.addChild(object.getGraphics());
		container.setShapeObject(object);
		this.stage.addChild(container);
		this._containers.push(container);
	}
};
display_Background.__super__ = pixi_plugins_app_Application;
display_Background.prototype = $extend(pixi_plugins_app_Application.prototype,{
	animate: function(timestamp) {
		if(!this._isScrolled || this._isHide) {
			return;
		}
		var isParallel = true;
		var bPoint = null;
		var _g = 0;
		var _g1 = this._containers;
		while(_g < _g1.length) {
			var container = _g1[_g];
			++_g;
			container.onAnimate();
			var point = container.getPoint();
			if(bPoint == null) {
				bPoint = point;
			}
			if(100 < Math.abs(point.y - bPoint.y)) {
				isParallel = false;
			}
		}
		if(isParallel && !this._isCenter) {
			this._isCenter = true;
			haxe_Timer.delay($bind(this,this.onCenterSplash),400);
		}
	}
	,onScroll: function(scrollDiff) {
		if(!this._isScrolled) {
			return;
		}
		var _g = 0;
		var _g1 = this._containers;
		while(_g < _g1.length) {
			var container = _g1[_g];
			++_g;
			container.onScroll(scrollDiff);
		}
	}
	,onSlideIn: function() {
		if(this._isScrolled) {
			return;
		}
		this._isScrolled = true;
		var _g = 0;
		var _g1 = this._containers;
		while(_g < _g1.length) {
			var container = _g1[_g];
			++_g;
			container.onSlideIn();
		}
	}
	,onShow: function() {
		if(!this._isHide) {
			return;
		}
		this._isHide = false;
		var _g = 0;
		var _g1 = this._containers;
		while(_g < _g1.length) {
			var container = _g1[_g];
			++_g;
			container.onShow();
		}
	}
	,onHide: function() {
		if(this._isHide) {
			return;
		}
		this._isHide = true;
		var _g = 0;
		var _g1 = this._containers;
		while(_g < _g1.length) {
			var container = _g1[_g];
			++_g;
			container.onHide();
		}
	}
	,onCenterSplash: function() {
		var _gthis = this;
		var _g = 0;
		var _g1 = this._containers;
		while(_g < _g1.length) {
			var container = _g1[_g];
			++_g;
			container.onCenterSplash();
		}
		haxe_Timer.delay(function() {
			_gthis._isCenter = false;
		},5000);
	}
	,resize: function() {
		this.app.renderer.resize(display_Window.getWidth(),display_Window.getHeight());
	}
});
var display_ShapeContainer = function() {
	PIXI.Container.call(this);
	this._scrolledList = [];
	this._isOnScrolled = this._isFollow = false;
	this._acceleration = utils_Utils.getRandomRange(.005,.0005);
	this._gy = utils_Utils.getRandomRange(display_Window.getHeight(),0);
	this._vy = 0;
	this._fallTheta = 0;
	this._fallSpeed = Math.random() / 3;
	this._isFall = this.y <= this._gy;
	this._isRotation = false;
	haxe_Timer.delay($bind(this,this.loop),utils_Utils.getRandomRangeInteger(10000,0));
};
display_ShapeContainer.__super__ = PIXI.Container;
display_ShapeContainer.prototype = $extend(PIXI.Container.prototype,{
	loop: function() {
		if(.8 < Math.random()) {
			this.onRotation();
		}
		haxe_Timer.delay($bind(this,this.loop),utils_Utils.getRandomRangeInteger(5000,2000));
	}
	,setShapeObject: function(object) {
		this._shapeObject = object;
	}
	,onAnimate: function() {
		var _gthis = this;
		var reset = function() {
			_gthis._vy = 0;
			var reset1 = display_Window.getHeight();
			_gthis._gy = utils_Utils.getRandomRange(reset1,0);
			_gthis._isFall = _gthis.y <= _gthis._gy;
		};
		this._vy += this._acceleration;
		if(this._isFall) {
			this.x += this._fallSpeed * Math.sin(this._fallTheta);
			this.y += this._fallSpeed * Math.cos(this._fallTheta);
			this._fallTheta += (Math.random() * 2 - 1) * Math.PI / 12;
			if(this._fallTheta < -Math.PI * .5) {
				this._fallTheta = -Math.PI - this._fallTheta;
			}
			if(Math.PI * .5 < this._fallTheta) {
				this._fallTheta = Math.PI - this._fallTheta;
			}
			if(this.x < 0) {
				this.x = 0;
			}
			if(display_Window.getWidth() < this.x) {
				this.x = display_Window.getWidth();
			}
			if(this._gy <= this.y) {
				reset();
			}
		} else {
			this.x -= this._fallSpeed * Math.sin(this._fallTheta);
			this.y -= this._fallSpeed * Math.cos(this._fallTheta);
			this._fallTheta += (Math.random() * 2 - 1) * Math.PI / 12;
			if(this._fallTheta < -Math.PI * .5) {
				this._fallTheta = -Math.PI - this._fallTheta;
			}
			if(Math.PI * .5 < this._fallTheta) {
				this._fallTheta = Math.PI - this._fallTheta;
			}
			if(this.x < 0) {
				this.x = 0;
			}
			if(display_Window.getWidth() < this.x) {
				this.x = display_Window.getWidth();
			}
			if(this.y <= this._gy) {
				reset();
			}
		}
	}
	,onScroll: function(scrollDiff) {
		if(!this._isOnScrolled) {
			return;
		}
		this.y -= scrollDiff * Math.random();
		if(this.y < 0) {
			this.y = 0;
		}
		if(display_Window.getHeight() < this.y) {
			this.y = display_Window.getHeight();
		}
	}
	,onSlideIn: function() {
		var _gthis = this;
		var maxPoint = this._shapeObject.getMaxPoint();
		var defaultX = this.x;
		var goalX = utils_Utils.getRandomRange(display_Window.getWidth(),0);
		var goalY = utils_Utils.getRandomRange(display_Window.getHeight(),0);
		var done = function() {
			_gthis._isOnScrolled = true;
		};
		var step = function(parsent) {
			_gthis.x = defaultX + (goalX - defaultX) * parsent;
			_gthis.y = parsent * goalY;
		};
		var tmp = $({ value : 0});
		var tmp1 = utils_Utils.getRandomRange(1000,400);
		tmp.animate({ value : 1},{ duration : tmp1, step : step, done : done, easing : "easeOutQuint"});
	}
	,onShow: function() {
		var _gthis = this;
		var maxPoint = this._shapeObject.getMaxPoint();
		var defaultX = this.x;
		var defaultY = this.y;
		var goalX = utils_Utils.getRandomRange(display_Window.getWidth(),0);
		var goalY = utils_Utils.getRandomRange(display_Window.getHeight(),0);
		var done = function() {
		};
		var step = function(parsent) {
			_gthis.x = defaultX + (goalX - defaultX) * parsent;
			_gthis.y = defaultY + (goalY - defaultY) * parsent;
		};
		var tmp = $({ value : 0});
		var tmp1 = utils_Utils.getRandomRange(1000,400);
		tmp.animate({ value : 1},{ duration : tmp1, step : step, done : done, easing : "easeOutExpo"});
	}
	,onHide: function() {
		var _gthis = this;
		var maxPoint = this._shapeObject.getMaxPoint();
		var hideDiffPoint = maxPoint.x * 2;
		var defaultX = this.x;
		var defaultY = this.y;
		var goalX = .5 < Math.random() ? display_Window.getWidth() + hideDiffPoint : -hideDiffPoint;
		var goalY = display_Window.getHeight() * .5 - maxPoint.y;
		var done = function() {
		};
		var step = function(parsent) {
			_gthis.x = defaultX + (goalX - defaultX) * parsent;
			_gthis.y = defaultY + (goalY - defaultY) * parsent;
		};
		var tmp = $({ value : 0});
		var tmp1 = utils_Utils.getRandomRange(1000,400);
		tmp.animate({ value : 1},{ duration : tmp1, step : step, done : done, easing : "easeOutExpo"});
	}
	,onCenterSplash: function() {
		var _gthis = this;
		var maxPoint = this._shapeObject.getMaxPoint();
		var defaultX = this.x;
		var defaultY = this.y;
		var centerX = display_Window.getWidth() * .5;
		var centerY = display_Window.getHeight() * .5;
		var goalX = utils_Utils.getRandomRange(display_Window.getWidth(),0);
		var goalY = utils_Utils.getRandomRange(display_Window.getHeight(),0);
		var tmp = $({ value : 0});
		var tmp1 = utils_Utils.getRandomRange(1000,600);
		tmp.animate({ value : 1},{ duration : tmp1, step : function(parsent) {
			_gthis.x = defaultX + (goalX - defaultX) * parsent;
			_gthis.y = defaultY + (goalY - defaultY) * parsent;
		}, easing : "easeOutExpo"});
	}
	,onRotation: function() {
		var _gthis = this;
		if(this._isRotation) {
			return;
		}
		this._isRotation = true;
		var done = function() {
			_gthis._isRotation = false;
		};
		var step = function(value) {
			_gthis.rotation = value;
		};
		$({ rotation : this.rotation}).animate({ rotation : this.rotation + 6},{ duration : utils_Utils.getRandomRange(6000,2000), step : step, done : done, easing : "easeInOutSine"});
	}
	,getPoint: function() {
		return new PIXI.Point(this.x,this.y);
	}
});
var display_ShapeObject = function() {
	this._vertexs = [];
	var index = this.getRandomVertex();
	var bX = 0;
	var bY = 0;
	var getRandom = null;
	getRandom = function(b) {
		var value = utils_Utils.getRandomRange(50,0);
		if(value < b) {
			return getRandom(b);
		} else {
			return value;
		}
	};
	var getRandom1 = getRandom;
	this._graphics = new PIXI.Graphics();
	this._graphics.beginFill(display_ShapeObject.getRandomColor());
	this._graphics.moveTo(0,0);
	if(4 <= index) {
		var _g1 = 0;
		var _g = index;
		while(_g1 < _g) {
			var i = _g1++;
			var x = utils_Utils.getRandomRange(50,0);
			var y = utils_Utils.getRandomRange(50,0);
			this._vertexs.push(new PIXI.Point(x,y));
		}
		var topLeftP = this.getCornerPoint("top","left");
		var topRightP = this.getCornerPoint("top","right");
		var bottomRightP = this.getCornerPoint("bottom","right");
		var bottomLeftP = this.getCornerPoint("bottom","left");
		this._graphics.lineTo(topRightP.x,topRightP.y);
		this._graphics.lineTo(bottomRightP.x,bottomRightP.y);
		this._graphics.lineTo(bottomLeftP.x,bottomLeftP.y);
		this._graphics.lineTo(topLeftP.x,topLeftP.y);
		this._graphics.lineTo(0,0);
	} else {
		var aX = 1;
		var aY = Math.random();
		var aZ = Math.random() * 2 - 1;
		var l = Math.sqrt(aX * aX + aY * aY + aZ * aZ);
		aX /= l;
		aY /= l;
		aZ /= l;
		var s = Math.sqrt(aX * aX + aY * aY);
		var bX1 = 1;
		var bY1 = 0;
		var bZ = 0;
		var cX = 0;
		var cY = 1;
		var cZ = 0;
		if(s != 0) {
			bX1 = aY;
			bY1 = -aX;
			bZ = 0;
			cX = aX * aZ;
			cY = aY * aZ;
			cZ = -(s * s);
			bX1 /= s;
			bY1 /= s;
			cX /= s * l;
			cY /= s * l;
			cZ /= s * l;
		}
		var size = display_Window.getWidth() * .03;
		aX *= size;
		aY *= size;
		bX1 *= size;
		bY1 *= size;
		cX *= size;
		cY *= size;
		this._graphics.lineTo(aX,aY);
		this._graphics.lineTo(bX1,bY1);
		this._graphics.lineTo(cX,cY);
		this._vertexs.push(new PIXI.Point(aX,aY));
		this._vertexs.push(new PIXI.Point(bX1,bY1));
		this._vertexs.push(new PIXI.Point(cX,cY));
	}
	var maxPoint = this.getMaxPoint();
	this._graphics.x = -maxPoint.x * .5;
	this._graphics.y = -maxPoint.y * .5;
	this._graphics.endFill();
};
display_ShapeObject.getRandomColor = function() {
	return display_ShapeObject.SHAPE_COLORS[Math.floor(Math.random() * display_ShapeObject.SHAPE_COLORS.length)];
};
display_ShapeObject.prototype = {
	getGraphics: function() {
		return this._graphics;
	}
	,getRandomVertex: function() {
		var max = 3;
		var min = 3;
		return utils_Utils.getRandomRangeInteger(max,min);
	}
	,getMaxPoint: function() {
		var x = 0;
		var y = 0;
		var _g = 0;
		var _g1 = this._vertexs;
		while(_g < _g1.length) {
			var point = _g1[_g];
			++_g;
			if(x < point.x) {
				x = point.x;
			}
			if(y < point.y) {
				y = point.y;
			}
		}
		return new PIXI.Point(x,y);
	}
	,getCornerPoint: function(verticality,lateral) {
		var pX = null;
		var pY = null;
		var _g = 0;
		var _g1 = this._vertexs;
		while(_g < _g1.length) {
			var point = _g1[_g];
			++_g;
			if(pX == null) {
				pX = point.x;
			}
			if(pY == null) {
				pY = point.y;
			}
			if(verticality == "top" && lateral == "left") {
				if(pY < point.y && point.x < pX) {
					pY = point.y;
					pX = point.x;
				}
			}
			if(verticality == "top" && lateral == "right") {
				if(pY < point.y && pX < point.x) {
					pY = point.y;
					pX = point.x;
				}
			}
			if(verticality == "bottom" && lateral == "left") {
				if(point.y < pY && point.x < pX) {
					pY = point.y;
					pX = point.x;
				}
			}
			if(verticality == "bottom" && lateral == "right") {
				if(point.y < pY && pX < point.x) {
					pY = point.y;
					pX = point.x;
				}
			}
		}
		return new PIXI.Point(pX,pY);
	}
};
var display_Window = function() { };
display_Window.init = function() {
	display_Window._jParent = $(window);
};
display_Window.setEvent = function(eventName,func,isTrigger) {
	if(isTrigger == null) {
		isTrigger = false;
	}
	display_Window._jParent.on(eventName,null,func);
	if(isTrigger) {
		display_Window.trigger(eventName);
	}
};
display_Window.trigger = function(eventName) {
	display_Window._jParent.trigger(eventName);
};
display_Window.getScrollTop = function() {
	return display_Window._jParent.scrollTop();
};
display_Window.getWidth = function() {
	return display_Window._jParent.width();
};
display_Window.getHeight = function() {
	return display_Window._jParent.height();
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var jp_okawa_js_EasingTools = function() { };
jp_okawa_js_EasingTools.addJQuery = function() {
	$.extend($.easing,{ def : "easeOutQuad", swing : jp_okawa_js_EasingTools.swing, easeInQuad : jp_okawa_js_EasingTools.easeInQuad, easeOutQuad : jp_okawa_js_EasingTools.easeOutQuad, easeInOutQuad : jp_okawa_js_EasingTools.easeInOutQuad, easeInCubic : jp_okawa_js_EasingTools.easeInCubic, easeOutCubic : jp_okawa_js_EasingTools.easeOutCubic, easeInOutCubic : jp_okawa_js_EasingTools.easeInOutCubic, easeInQuart : jp_okawa_js_EasingTools.easeInQuart, easeOutQuart : jp_okawa_js_EasingTools.easeOutQuart, easeInOutQuart : jp_okawa_js_EasingTools.easeInOutQuart, easeInQuint : jp_okawa_js_EasingTools.easeInQuint, easeOutQuint : jp_okawa_js_EasingTools.easeOutQuint, easeInOutQuint : jp_okawa_js_EasingTools.easeInOutQuint, easeInSine : jp_okawa_js_EasingTools.easeInSine, easeOutSine : jp_okawa_js_EasingTools.easeOutSine, easeInOutSine : jp_okawa_js_EasingTools.easeInOutSine, easeInExpo : jp_okawa_js_EasingTools.easeInExpo, easeOutExpo : jp_okawa_js_EasingTools.easeOutExpo, easeInOutExpo : jp_okawa_js_EasingTools.easeInOutExpo, easeInCirc : jp_okawa_js_EasingTools.easeInCirc, easeOutCirc : jp_okawa_js_EasingTools.easeOutCirc, easeInOutCirc : jp_okawa_js_EasingTools.easeInOutCirc, easeInElastic : jp_okawa_js_EasingTools.easeInElastic, easeOutElastic : jp_okawa_js_EasingTools.easeOutElastic, easeInOutElastic : jp_okawa_js_EasingTools.easeInOutElastic, easeInBack : jp_okawa_js_EasingTools.easeInBack, easeOutBack : jp_okawa_js_EasingTools.easeOutBack, easeInOutBack : jp_okawa_js_EasingTools.easeInOutBack, easeInBounce : jp_okawa_js_EasingTools.easeInBounce, easeOutBounce : jp_okawa_js_EasingTools.easeOutBounce, easeInOutBounce : jp_okawa_js_EasingTools.easeInOutBounce});
};
jp_okawa_js_EasingTools.swing = function(x,t,b,c,d) {
	return jp_okawa_js_EasingTools.easeOutQuad(x,t,b,c,d);
};
jp_okawa_js_EasingTools.easeInQuad = function(x,t,b,c,d) {
	return c * (t /= d) * t + b;
};
jp_okawa_js_EasingTools.easeOutQuad = function(x,t,b,c,d) {
	return -c * (t /= d) * (t - 2) + b;
};
jp_okawa_js_EasingTools.easeInOutQuad = function(x,t,b,c,d) {
	if((t /= d / 2) < 1) {
		return c / 2 * t * t + b;
	}
	return -c / 2 * (--t * (t - 2) - 1) + b;
};
jp_okawa_js_EasingTools.easeInCubic = function(x,t,b,c,d) {
	return c * (t /= d) * t * t + b;
};
jp_okawa_js_EasingTools.easeOutCubic = function(x,t,b,c,d) {
	return c * ((t /= d - 1) * t * t + 1) + b;
};
jp_okawa_js_EasingTools.easeInOutCubic = function(x,t,b,c,d) {
	if((t /= d / 2) < 1) {
		return c / 2 * t * t * t + b;
	}
	return c / 2 * ((t -= 2) * t * t + 2) + b;
};
jp_okawa_js_EasingTools.easeInQuart = function(x,t,b,c,d) {
	return c * (t /= d) * t * t * t + b;
};
jp_okawa_js_EasingTools.easeOutQuart = function(x,t,b,c,d) {
	return c * (t /= d) * t * t * t + b;
};
jp_okawa_js_EasingTools.easeInOutQuart = function(x,t,b,c,d) {
	if((t /= d / 2) < 1) {
		return c / 2 * t * t * t * t + b;
	}
	return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
};
jp_okawa_js_EasingTools.easeInQuint = function(x,t,b,c,d) {
	return c * (t /= d) * t * t * t * t + b;
};
jp_okawa_js_EasingTools.easeOutQuint = function(x,t,b,c,d) {
	t = t / d - 1;
	return c * (t * t * t * t * t + 1) + b;
};
jp_okawa_js_EasingTools.easeInOutQuint = function(x,t,b,c,d) {
	if((t /= d / 2) < 1) {
		return c / 2 * t * t * t * t * t + b;
	}
	return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
};
jp_okawa_js_EasingTools.easeInSine = function(x,t,b,c,d) {
	return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
};
jp_okawa_js_EasingTools.easeOutSine = function(x,t,b,c,d) {
	return c * Math.sin(t / d * (Math.PI / 2)) + b;
};
jp_okawa_js_EasingTools.easeInOutSine = function(x,t,b,c,d) {
	return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
};
jp_okawa_js_EasingTools.easeInExpo = function(x,t,b,c,d) {
	if(t == 0) {
		return b;
	} else {
		return c * Math.pow(2,10 * (t / d - 1)) + b;
	}
};
jp_okawa_js_EasingTools.easeOutExpo = function(x,t,b,c,d) {
	if(t == d) {
		return b + c;
	} else {
		return c * (-Math.pow(2,-10 * t / d) + 1) + b;
	}
};
jp_okawa_js_EasingTools.easeInOutExpo = function(x,t,b,c,d) {
	if(t == 0) {
		return b;
	}
	if(t == d) {
		return b + c;
	}
	if((t /= d / 2) < 1) {
		return c / 2 * Math.pow(2,10 * (t - 1)) + b;
	}
	return c / 2 * (-Math.pow(2,-10 * --t) + 2) + b;
};
jp_okawa_js_EasingTools.easeInCirc = function(x,t,b,c,d) {
	return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
};
jp_okawa_js_EasingTools.easeOutCirc = function(x,t,b,c,d) {
	t = t / d - 1;
	return c * Math.sqrt(1 - t * t) + b;
};
jp_okawa_js_EasingTools.easeInOutCirc = function(x,t,b,c,d) {
	if((t /= d / 2) < 1) {
		return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	}
	return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
};
jp_okawa_js_EasingTools.easeInElastic = function(x,t,b,c,d) {
	var s = 1.70158;
	var p = 0;
	var a = c;
	if(t == 0) {
		return b;
	}
	if((t /= d) == 1) {
		return b + c;
	}
	if(p <= 0) {
		p = d * .3;
	}
	if(a < Math.abs(c)) {
		a = c;
		var s1 = p / 4;
	} else {
		var s2 = p / (2 * Math.PI) * Math.asin(c / a);
	}
	return -(a * Math.pow(2,10 * --t) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
};
jp_okawa_js_EasingTools.easeOutElastic = function(x,t,b,c,d) {
	var s = 1.70158;
	var p = 0;
	var a = c;
	if(t == 0) {
		return b;
	}
	if((t /= d) == 1) {
		return b + c;
	}
	if(p <= 0) {
		p = d * .3;
	}
	if(a < Math.abs(c)) {
		a = c;
		var s1 = p / 4;
	} else {
		var s2 = p / (2 * Math.PI) * Math.asin(c / a);
	}
	return a * Math.pow(2,-10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
};
jp_okawa_js_EasingTools.easeInOutElastic = function(x,t,b,c,d) {
	var s = 1.70158;
	var p = 0;
	var a = c;
	if(t == 0) {
		return b;
	}
	if((t /= d / 2) == 2) {
		return b + c;
	}
	if(p <= 0) {
		p = d * 0.449999999999999956;
	}
	if(a < Math.abs(c)) {
		a = c;
		var s1 = p / 4;
	} else {
		var s2 = p / (2 * Math.PI) * Math.asin(c / a);
	}
	if(t < 1) {
		return -.5 * (a * Math.pow(2,10 * --t) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	}
	return a * Math.pow(2,-10 * --t) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
};
jp_okawa_js_EasingTools.easeInBack = function(x,t,b,c,d,s) {
	if(s == null) {
		s = 1.70158;
	}
	return c * (t /= d) * t * ((s + 1) * t - s) + b;
};
jp_okawa_js_EasingTools.easeOutBack = function(x,t,b,c,d,s) {
	if(s == null) {
		s = 1.70158;
	}
	t = t / d - 1;
	return c * (t * t * ((s + 1) * t + s) + 1) + b;
};
jp_okawa_js_EasingTools.easeInOutBack = function(x,t,b,c,d,s) {
	if(s == null) {
		s = 1.70158;
	}
	if((t /= d / 2) < 1) {
		return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	}
	return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
};
jp_okawa_js_EasingTools.easeInBounce = function(x,t,b,c,d) {
	return c - jp_okawa_js_EasingTools.easeOutBounce(x,d - t,0,c,d) + b;
};
jp_okawa_js_EasingTools.easeOutBounce = function(x,t,b,c,d) {
	if((t /= d) < 0.363636363636363646) {
		return c * (7.5625 * t * t) + b;
	} else if(t < 0.727272727272727293) {
		return c * (7.5625 * (t -= 0.545454545454545414) * t + .75) + b;
	} else if(t < 0.909090909090909061) {
		return c * (7.5625 * (t -= 0.818181818181818232) * t + .9375) + b;
	} else {
		return c * (7.5625 * (t -= 0.954545454545454586) * t + .984375) + b;
	}
};
jp_okawa_js_EasingTools.easeInOutBounce = function(x,t,b,c,d) {
	if(t < d / 2) {
		return jp_okawa_js_EasingTools.easeInBounce(x,t * 2,0,c,d) * .5 + b;
	}
	return jp_okawa_js_EasingTools.easeOutBounce(x,t * 2 - d,0,c,d) * .5 + c * .5 + b;
};
var js_jquery_JqEltsIterator = function(j) {
	this.i = 0;
	this.j = j;
};
js_jquery_JqEltsIterator.prototype = {
	hasNext: function() {
		return this.i < this.j.length;
	}
	,next: function() {
		return $(this.j[this.i++]);
	}
};
var js_jquery_JqIterator = function(j) {
	this.i = 0;
	this.j = j;
};
js_jquery_JqIterator.prototype = {
	hasNext: function() {
		return this.i < this.j.length;
	}
	,next: function() {
		return this.j[this.i++];
	}
};
var pixi_core_renderers_webgl_filters_CurrentState = function() { };
var utils_Utils = function() { };
utils_Utils.getRandomRange = function(max,min) {
	return Math.random() * (max - min) + min;
};
utils_Utils.getRandomRangeInteger = function(max,min) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
utils_Utils.getRandomDiffRange = function(number,diff) {
	return utils_Utils.getRandomRange(number + diff,number - diff);
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
var typeofJQuery = typeof($);
if(typeofJQuery != "undefined" && $.fn != null) {
	$.fn.elements = function() {
		return new js_jquery_JqEltsIterator(this);
	};
}
var typeofJQuery = typeof($);
if(typeofJQuery != "undefined" && $.fn != null) {
	$.fn.iterator = function() {
		return new js_jquery_JqIterator(this);
	};
}
Perf.MEASUREMENT_INTERVAL = 1000;
Perf.FONT_FAMILY = "Helvetica,Arial";
Perf.FPS_BG_CLR = "#00FF00";
Perf.FPS_WARN_BG_CLR = "#FF8000";
Perf.FPS_PROB_BG_CLR = "#FF0000";
Perf.MS_BG_CLR = "#FFFF00";
Perf.MEM_BG_CLR = "#086A87";
Perf.INFO_BG_CLR = "#00FFFF";
Perf.FPS_TXT_CLR = "#000000";
Perf.MS_TXT_CLR = "#000000";
Perf.MEM_TXT_CLR = "#FFFFFF";
Perf.INFO_TXT_CLR = "#000000";
Perf.TOP_LEFT = "TL";
Perf.TOP_RIGHT = "TR";
Perf.BOTTOM_LEFT = "BL";
Perf.BOTTOM_RIGHT = "BR";
Perf.DELAY_TIME = 4000;
pixi_plugins_app_Application.AUTO = "auto";
pixi_plugins_app_Application.RECOMMENDED = "recommended";
pixi_plugins_app_Application.CANVAS = "canvas";
pixi_plugins_app_Application.WEBGL = "webgl";
pixi_plugins_app_Application.POSITION_STATIC = "static";
pixi_plugins_app_Application.POSITION_ABSOLUTE = "absolute";
pixi_plugins_app_Application.POSITION_FIXED = "fixed";
pixi_plugins_app_Application.POSITION_RELATIVE = "relative";
pixi_plugins_app_Application.POSITION_INITIAL = "initial";
pixi_plugins_app_Application.POSITION_INHERIT = "inherit";
display_Background.OBJECT_LENGTH = 500;
display_ShapeObject.MAX_SIZE = 50;
display_ShapeObject.SHAPE_COLORS = [16437806,10773155,14772898,1020232,14408924,3581406,15091476];
Main.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this);
