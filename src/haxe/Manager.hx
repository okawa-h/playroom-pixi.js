package;

import js.jquery.Event;
import js.jquery.JQuery;
import display.*;

class Manager {

	private static var _jAll      :JQuery;
	private static var _jMain     :JQuery;
	private static var _jFooter   :JQuery;
	private static var _background:Background;
	private static var _scrollTop :Float;

	/* =======================================================================
		Constractor
	========================================================================== */
	public static function init(event:Event):Void {

		Window.init();
		_jAll      = new JQuery('#all');
		_jMain     = new JQuery('#main');
		_jFooter   = new JQuery('#footer');
		_scrollTop = Window.getScrollTop();

		_background = new Background(new JQuery('#about-bg').get(0));

		Window.setEvent('resize',onResize,true);
		Window.setEvent('scroll',onScroll,true);

	}

	/* =======================================================================
		On Resize
	========================================================================== */
	public static function onResize(event:Event):Void {}

	/* =======================================================================
		On Scroll
	========================================================================== */
	public static function onScroll(event:Event):Void {

		var winH     :Float = Window.getHeight();
		var scrollTop:Float = Window.getScrollTop();
		var startLine:Float = _jMain.offset().top;
		var endLine  :Float = _jFooter.offset().top - winH;

		if (startLine <= scrollTop + winH * .5) _background.onSlideIn();
		if (endLine <= scrollTop) _background.onHide();
		if (scrollTop <= endLine) _background.onShow();

		_background.onScroll(scrollTop - _scrollTop);
		_scrollTop = scrollTop;

	}

}
