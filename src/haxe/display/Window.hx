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
		public static function setEvent(eventName:String,func:Event->Void,isTrigger:Bool=false):Void {

			_jParent.on(eventName,func);
			if (isTrigger) trigger(eventName);

		}

		/* =======================================================================
			trigger
		========================================================================== */
		public static function trigger(eventName:String):Void {

			_jParent.trigger(eventName);

		}

		/* =======================================================================
			Get Scroll Top
		========================================================================== */
		public static function getScrollTop():Float return _jParent.scrollTop();

		/* =======================================================================
			Get Width
		========================================================================== */
		public static function getWidth():Float return _jParent.width();

		/* =======================================================================
			Get Height
		========================================================================== */
		public static function getHeight():Float return _jParent.height();

}
