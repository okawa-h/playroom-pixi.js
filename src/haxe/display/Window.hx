package display;

import js.Browser;
import js.jquery.Event;
import js.jquery.JQuery;

class Window {

	private static var _jParent:JQuery;

		/* =======================================================================
			Constractor
		========================================================================== */
		public static function init():Void {

			_jParent = new JQuery(Browser.window);

		}

		/* =======================================================================
			Set Event
		========================================================================== */
		public static function setEvent():Void {

			_jParent.on({
				'resize':Manager.onResize,
				'scroll':Manager.onScroll
			}).trigger('resize').trigger('scroll');

		}

		/* =======================================================================
			Get Scroll Top
		========================================================================== */
		public static function getScrollTop():Float {

			return _jParent.scrollTop();

		}

		/* =======================================================================
			Get Width
		========================================================================== */
		public static function getWidth():Float {

			return _jParent.width();

		}

		/* =======================================================================
			Get Height
		========================================================================== */
		public static function getHeight():Float {

			return _jParent.height();

		}

}
