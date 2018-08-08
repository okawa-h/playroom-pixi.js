package utils;

class Utils {

	/* =======================================================================
		Get Random Range
	========================================================================== */
	public static function getRandomRange(max:Float,min:Float):Float {

		return Math.random() * (max - min) + min;

	}

	/* =======================================================================
		Get Random Range Integer
	========================================================================== */
	public static function getRandomRangeInteger(max:Int,min:Int):Int {

		return Math.floor(Math.random() * (max - min + 1) + min);

	}

	/* =======================================================================
		Get Random Diff Range
	========================================================================== */
	public static function getRandomDiffRange(number:Float,diff:Float):Float {

		return getRandomRange(number + diff,number - diff);

	}

}
