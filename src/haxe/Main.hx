package ;

import js.Browser.document;
import js.jquery.JQuery;
import jp.okawa.js.EasingTools;

class Main {

	public static function main():Void {

		EasingTools.addJQuery();
		new JQuery(document).ready(Manager.init);

	}

}
