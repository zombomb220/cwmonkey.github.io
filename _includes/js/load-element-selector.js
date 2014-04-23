(function (window) {
'use strict';

var had_jQuery = false;

// Load scripts
cwmJsload.load(
	{
		script: '//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',
		static: true,
		test: function() {
			var v1 = 1;
			var v2 = 7;
			var v3 = 2;
			var hasJquery = false;

			if ( typeof window.jQueryCwm != 'undefined' ) return true;

			if ( typeof window.jQuery != 'undefined' ) {
				var vs = window.jQuery.fn.jquery.split('.');
				if ( vs[0] > v1 ) return had_jQuery = true;
				if ( vs[0] < v1 ) return false;

				if ( vs[1] > v2 ) return had_jQuery = true;
				if ( vs[1] < v2 ) return false;

				if ( vs[2] >= v3 ) return had_jQuery = true;

				return false;
			}

			return false;
		},
		callback: function() {
			if ( had_jQuery ) {
				window.jQueryCwm = jQuery.noConflict(true);
				var jQueryOriginal = jQuery || window.jQueryCwm;
			}
		}
	},
	{
		script: window.cwmBookmarkletUrl + '/element-selector.js',
		test: function() {
console.log(typeof window.cwmElementSelector === 'object');
			return (typeof window.cwmElementSelector === 'object');
		}
	},
	// Load script callback
	function() {
		window.cwmElementSelector.main(window.jQueryCwm || window.jQuery);
	}
);

}(window));