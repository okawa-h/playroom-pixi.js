package display;

import haxe.Timer;
import js.jquery.JQuery;
import pixi.core.display.Container;
import pixi.core.math.Point;
import utils.Utils;

class ShapeContainer extends Container {

	private var _shapeObject:ShapeObject;
	private var _acceleration:Float;
	private var _gy        :Float;
	private var _vy        :Float;
	private var _fallTheta :Float;
	private var _fallSpeed :Float;
	private var _isFall    :Bool;
	private var _isRotation:Bool;
	private var _isOnScrolled:Bool;
	private var _isFollow:Bool;

	private var _scrolledList:Array<Float>;

		/* =======================================================================
			On Slide In
		========================================================================== */
		public override function new():Void {

			super();

			_scrolledList = [];
			_isOnScrolled = _isFollow = false;
			_acceleration = Utils.getRandomRange(.005,.0005);
			_gy     = Utils.getRandomRange(Window.getHeight(),0);
			_vy     = 0;

			_fallTheta = 0;
			_fallSpeed = Math.random() / 3;

			_isFall = y <= _gy;
			_isRotation = false;
			Timer.delay(loop,Utils.getRandomRangeInteger(10000,0));

		}

	/* =======================================================================
		Loop
	========================================================================== */
	public function loop():Void {

		if (.8 < Math.random()) onRotation();
		Timer.delay(loop,Utils.getRandomRangeInteger(5000,2000));

	}

		/* =======================================================================
			Set Shape Object
		========================================================================== */
		public function setShapeObject(object:ShapeObject):Void {

			_shapeObject = object;

		}

		/* =======================================================================
			On Animate
		========================================================================== */
		public function onAnimate():Void {

			function reset() {

				_vy   = 0;
				_gy   = Utils.getRandomRange(Window.getHeight(),0);
				_isFall = y <= _gy;

			}

			_vy += _acceleration;

			if (_isFall) {

				x += _fallSpeed * Math.sin(_fallTheta);
				y += _fallSpeed * Math.cos(_fallTheta);
				_fallTheta += (Math.random() * 2 - 1) * Math.PI/12;

				if (_fallTheta < -Math.PI*.5) _fallTheta = -Math.PI - _fallTheta;
				if (Math.PI*.5 < _fallTheta) _fallTheta = Math.PI - _fallTheta;

				if (x < 0) x = 0;
				if (Window.getWidth() < x) x = Window.getWidth();

				if (_gy <= y) reset();

			} else {

				// y -= _vy;


				x -= _fallSpeed * Math.sin(_fallTheta);
				y -= _fallSpeed * Math.cos(_fallTheta);
				_fallTheta += (Math.random() * 2 - 1) * Math.PI/12;

				if (_fallTheta < -Math.PI*.5) _fallTheta = -Math.PI - _fallTheta;
				if (Math.PI*.5 < _fallTheta) _fallTheta = Math.PI - _fallTheta;

				if (x < 0) x = 0;
				if (Window.getWidth() < x) x = Window.getWidth();
				if (y <= _gy) reset();

			}

		}

		/* =======================================================================
			On Scroll
		========================================================================== */
		public function onScroll(scrollDiff:Float):Void {

			if (!_isOnScrolled) return;

			y -= scrollDiff * Math.random();
			if (y < 0) y = 0;
			if (Window.getHeight() < y) y = Window.getHeight();

		}

		/* =======================================================================
			On Slide In
		========================================================================== */
		public function onSlideIn():Void {

			var maxPoint:Point = _shapeObject.getMaxPoint();
			var defaultX:Float = x;

			var goalX:Float = Utils.getRandomRange(Window.getWidth(),0);
			var goalY:Float = Utils.getRandomRange(Window.getHeight(),0);

			function done() {

				_isOnScrolled = true;

			}

			function step(parsent:Float) {

				x = defaultX + (goalX - defaultX) * parsent;
				y = parsent * goalY;

			}

			new JQuery({ value:0 }).animate({ value:1 },{
				duration:Utils.getRandomRange(1000,400),
				step    :step,
				done    :done,
				easing  :'easeOutQuint'
			});

		}

		/* =======================================================================
			On Show
		========================================================================== */
		public function onShow():Void {

			var maxPoint:Point = _shapeObject.getMaxPoint();
			var defaultX:Float = x;
			var defaultY:Float = y;
			var goalX   :Float = Utils.getRandomRange(Window.getWidth(),0);
			var goalY   :Float = Utils.getRandomRange(Window.getHeight(),0);

			function done() {}

			function step(parsent:Float) {

				x = defaultX + (goalX - defaultX) * parsent;
				y = defaultY + (goalY - defaultY) * parsent;

			}

			new JQuery({ value:0 }).animate({ value:1 },{
				duration:Utils.getRandomRange(1000,400),
				step    :step,
				done    :done,
				easing  :'easeOutExpo'
			});

		}

		/* =======================================================================
			On Hide
		========================================================================== */
		public function onHide():Void {

			var maxPoint:Point = _shapeObject.getMaxPoint();
			var hideDiffPoint:Float = maxPoint.x * 2;
			var defaultX:Float = x;
			var defaultY:Float = y;
			var goalX:Float = .5 < Math.random() ? Window.getWidth() + hideDiffPoint : -hideDiffPoint;
			var goalY:Float = Window.getHeight() * .5 - maxPoint.y;

			function done() {}

			function step(parsent:Float) {

				x = defaultX + (goalX - defaultX) * parsent;
				y = defaultY + (goalY - defaultY) * parsent;

			}

			new JQuery({ value:0 }).animate({ value:1 },{
				duration:Utils.getRandomRange(1000,400),
				step    :step,
				done    :done,
				easing  :'easeOutExpo'
			});

		}

		/* =======================================================================
			On Center Splash
		========================================================================== */
		public function onCenterSplash():Void {

			var maxPoint:Point = _shapeObject.getMaxPoint();
			var defaultX:Float = x;
			var defaultY:Float = y;
			var centerX :Float = Window.getWidth() * .5;
			var centerY :Float = Window.getHeight() * .5;
			var goalX   :Float = Utils.getRandomRange(Window.getWidth(),0);
			var goalY   :Float = Utils.getRandomRange(Window.getHeight(),0);

			// function done() {

				new JQuery({ value:0 }).animate({ value:1 },{
					duration:Utils.getRandomRange(1000,600),
					step    :function(parsent:Float) {

						x = defaultX + (goalX - defaultX) * parsent;
						y = defaultY + (goalY - defaultY) * parsent;

					},
					easing  :'easeOutExpo'
				});

			// }

			// function step(parsent:Float) {

			// 	x = defaultX + (centerX - defaultX) * parsent;
			// 	y = defaultY + (centerY - defaultY) * parsent;

			// }

			// new JQuery({ value:0 }).animate({ value:1 },{
			// 	duration:Utils.getRandomRange(400,200),
			// 	step    :step,
			// 	done    :done,
			// 	easing  :'easeOutExpo'
			// });

		}

		/* =======================================================================
			On Rotation
		========================================================================== */
		public function onRotation():Void {

			if (_isRotation) return;
			_isRotation = true;

			function done() {

				_isRotation = false;

			}

			function step(value:Float) {

				rotation = value;

			}

			new JQuery({ rotation:rotation }).animate({ rotation:rotation + 6 },{
				duration:Utils.getRandomRange(6000,2000),
				step    :step,
				done    :done,
				easing  :'easeInOutSine'
			});

		}

		/* =======================================================================
			Get Point
		========================================================================== */
		public function getPoint():Point {

			return new Point(x,y);

		}

}
