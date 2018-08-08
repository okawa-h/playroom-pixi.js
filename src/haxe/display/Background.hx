package display;

import haxe.Timer;
import js.html.Element;
import display.Window;
import pixi.core.display.Container;
import pixi.core.graphics.Graphics;
import pixi.core.textures.Texture;
import pixi.core.math.Point;
import pixi.core.sprites.Sprite;
import pixi.plugins.app.Application;
import utils.Utils;

class Background extends Application {

	private static inline var OBJECT_LENGTH:Int = 500;

	private var _graphic     :Graphics;
	private var _containers  :Array<ShapeContainer>;

	private var _isScrolled:Bool;
	private var _isHide    :Bool;
	private var _isCenter  :Bool;

	/* =======================================================================
		Constractor
	========================================================================== */
	public function new(parentDom:Element) {

		_isScrolled = _isHide = _isCenter = false;
		_containers = [];

		super();

		autoResize = true;
		position   = Application.POSITION_FIXED;
		width      = Window.getWidth();
		height     = Window.getHeight();

		backgroundColor = 0x006666;
		transparent = true;
		antialias   = true;
		onUpdate    = animate;
		onResize    = resize;

		super.start('auto',parentDom);

		for (i in 0 ... OBJECT_LENGTH) {

			var container:ShapeContainer = new ShapeContainer();
			var object   :ShapeObject    = new ShapeObject();
			container.x = Window.getWidth() * .5;
			container.y = -object.getMaxPoint().y;
			container.addChild(object.getGraphics());
			container.setShapeObject(object);
			stage.addChild(container);

			_containers.push(container);
			
		}

	}

		/* =======================================================================
			Animate
		========================================================================== */
		public function animate(timestamp:Float):Void {

			if (!_isScrolled || _isHide) return;

			var isParallel:Bool  = true;
			var bPoint    :Point = null;
			for (container in _containers) {
				
				container.onAnimate();
				var point:Point = container.getPoint();
				if (bPoint == null) bPoint = point;

				if (100 < Math.abs(point.y - bPoint.y)) isParallel = false;
				
			}

			if (isParallel && !_isCenter) {
				_isCenter = true;
				Timer.delay(onCenterSplash,400);
			}

		}

		/* =======================================================================
			On Scroll
		========================================================================== */
		public function onScroll(scrollDiff:Float):Void {

			if (!_isScrolled) return;

			for (container in _containers) {
				
				container.onScroll(scrollDiff);
				
			}

		}

		/* =======================================================================
			On Scrolled
		========================================================================== */
		public function onSlideIn():Void {

			if (_isScrolled) return;
			_isScrolled = true;

			for (container in _containers) {

				container.onSlideIn();
				
			}

		}

		/* =======================================================================
			On Show
		========================================================================== */
		public function onShow():Void {

			if (!_isHide) return;
			_isHide = false;
			
			for (container in _containers) {

				container.onShow();
				
			}

		}

		/* =======================================================================
			On Hide
		========================================================================== */
		public function onHide():Void {

			if (_isHide) return;
			_isHide = true;

			for (container in _containers) {

				container.onHide();
				
			}

		}

		/* =======================================================================
			On Center Splash
		========================================================================== */
		public function onCenterSplash():Void {

			for (container in _containers) {

				container.onCenterSplash();
				
			}

			Timer.delay(function() {
				_isCenter = false;
			},5000);

		}

	/* =======================================================================
		Resize
	========================================================================== */
	public function resize() {

		app.renderer.resize(Window.getWidth(),Window.getHeight());

	}

}
