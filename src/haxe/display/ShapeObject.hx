package display;

import display.Window;
import pixi.core.math.Point;
import pixi.core.graphics.Graphics;
import utils.Utils;

class ShapeObject {

	private static inline var MAX_SIZE:Int = 50;
	private static var SHAPE_COLORS:Array<Int> = [0xfad22e,0xa462a3,0xe16aa2,0x0f9148,0xdbdcdc,0x36a5de,0xe64714];
	public var _graphics:Graphics;
	private var _vertexs:Array<Point> = [];

	/* =======================================================================
		Get Random Color
	========================================================================== */
	private static function getRandomColor():Int {

		return SHAPE_COLORS[Math.floor(Math.random() * SHAPE_COLORS.length)];

	}


		/* =======================================================================
			Constractor
		========================================================================== */
		public function new() {

			var index:Int = getRandomVertex();
			var bX:Float = 0;
			var bY:Float = 0;

			function getRandom(b) {

				var value:Float = Utils.getRandomRange(MAX_SIZE,0);
				if (value < b) {
					return getRandom(b);
				} else {
					return value;
				}

			}

			_graphics = new Graphics();
			_graphics.beginFill(getRandomColor());
			_graphics.moveTo(0,0);

			if (4 <= index) {

				// for (i in 0 ... index) {

				// 	var x:Float = Utils.getRandomRange(MAX_SIZE,0);
				// 	var y:Float = Utils.getRandomRange(MAX_SIZE,0);

				// 	if (index == 4) {

				// 		if (i == 3) {
				// 			x = getRandom(bX);
				// 		}
						
				// 	}

				// 	_graphics.lineTo(x,y);
				// 	_vertexs.push(new Point(x,y));
				// 	bX = x;
				// 	bY = y;

				// }

				for (i in 0 ... index) {

					var x:Float = Utils.getRandomRange(MAX_SIZE,0);
					var y:Float = Utils.getRandomRange(MAX_SIZE,0);
					_vertexs.push(new Point(x,y));
					
				}

				var topLeftP    :Point = getCornerPoint('top','left');
				var topRightP   :Point = getCornerPoint('top','right');
				var bottomRightP:Point = getCornerPoint('bottom','right');
				var bottomLeftP :Point = getCornerPoint('bottom','left');
				// _graphics.lineTo(topLeftP.x,topLeftP.y);
				_graphics.lineTo(topRightP.x,topRightP.y);
				_graphics.lineTo(bottomRightP.x,bottomRightP.y);
				_graphics.lineTo(bottomLeftP.x,bottomLeftP.y);
				_graphics.lineTo(topLeftP.x,topLeftP.y);
				_graphics.lineTo(0,0);
				
			} else {

				var aX:Float = 1;
				var aY:Float = Math.random();
				var aZ:Float = Math.random()*2-1;
				var l :Float = Math.sqrt(aX*aX + aY*aY + aZ*aZ);
				aX /= l; aY /= l; aZ /= l;
				var s :Float = Math.sqrt(aX*aX + aY*aY);

				var bX:Float = 1; var bY:Float = 0; var bZ:Float = 0;
				var cX:Float = 0; var cY:Float = 1; var cZ:Float = 0;

				if (s != 0) {
					bX = aY; bY = -aX; bZ = 0;
					cX = aX*aZ; cY = aY*aZ; cZ = -(s*s);
					bX /= s; bY /= s;
					cX /= s*l; cY /= s*l; cZ /= s*l;
				}
				var size:Float = Window.getWidth() * .03;
				aX *= size; aY *= size;
				bX *= size; bY *= size;
				cX *= size; cY *= size;
				_graphics.lineTo(aX,aY);
				_graphics.lineTo(bX,bY);
				_graphics.lineTo(cX,cY);
				_vertexs.push(new Point(aX,aY));
				_vertexs.push(new Point(bX,bY));
				_vertexs.push(new Point(cX,cY));

			}

			var maxPoint:Point = getMaxPoint();
			_graphics.x = -maxPoint.x * .5;
			_graphics.y = -maxPoint.y * .5;

			_graphics.endFill();

		}

		/* =======================================================================
			Get Graphics
		========================================================================== */
		public function getGraphics():Graphics {

			return _graphics;

		}

	/* =======================================================================
		Get Random Vertex
	========================================================================== */
	private function getRandomVertex():Int {

		var max:Int = 3;
		var min:Int = 3;
		return Utils.getRandomRangeInteger(max,min);

	}

		/* =======================================================================
			Get Max Point
		========================================================================== */
		public function getMaxPoint():Point {

			var x:Float = 0;
			var y:Float = 0;
			for (point in _vertexs) {
				
				if (x < point.x) x = point.x;
				if (y < point.y) y = point.y;

			}
			return new Point(x,y);

		}

	/* =======================================================================
		Get Corner Point
	========================================================================== */
	private function getCornerPoint(verticality:String,lateral:String):Point {

		var pX:Float = null;
		var pY:Float = null;
		for (point in _vertexs) {

			if (pX == null) pX = point.x;
			if (pY == null) pY = point.y;
			
			if (verticality == 'top' && lateral == 'left') {
				if (pY < point.y && point.x < pX) {
					pY = point.y;
					pX = point.x;
				}
			}
			
			if (verticality == 'top' && lateral == 'right') {
				if (pY < point.y && pX < point.x) {
					pY = point.y;
					pX = point.x;
				}
			}
			
			if (verticality == 'bottom' && lateral == 'left') {
				if (point.y < pY && point.x < pX) {
					pY = point.y;
					pX = point.x;
				}
			}
			
			if (verticality == 'bottom' && lateral == 'right') {
				if (point.y < pY && pX < point.x) {
					pY = point.y;
					pX = point.x;
				}
			}

		}
		return new Point(pX,pY);

	}

}
