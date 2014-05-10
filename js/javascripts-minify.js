/*!
 * Simple History v0.5.0
 *
 * Copyright 2011, Jörn Zaefferer
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function(window,undefined){var initial=location.href;window.SimpleHistory={supported:!!(window.history&&window.history.pushState),pushState:function(fragment,state){state=state||{};history.pushState(state,null,fragment);this.notify(state);},replaceState:function(fragment,state){state=state||{};history.replaceState(state,null,fragment);},notify:function(state){this.matcher(location.pathname+location.search,state);},start:function(matcher){this.matcher=matcher;window.addEventListener("popstate",function(event){if(initial&&initial===location.href){initial=null;return;}
SimpleHistory.notify(event.state||{});},false);}};}(window));(function(window,$,undefined){var has_transitionend=('TransitionEvent'in window);$.addClassWait=function($el,name){var deferred=new $.Deferred();var duration=parseFloat($el.css('transition-duration'));if(!has_transitionend||isNaN(duration)||!duration){$el.addClass(name);deferred.resolve();return deferred;}
var transitionender=function(){$el.unbind('transitionend',transitionender);deferred.resolve();};$el.bind('transitionend',transitionender).addClass(name);return deferred;}})(window,jQuery);(function(window,$,undefined){$.load=function($el,path){var deferred=new $.Deferred();$el.load(path,function(){deferred.resolve();});return deferred;};})(window,jQuery);(function(window,$,undefined){var $body=$('body');$body.delegate('#secondary .item','mouseenter focusin',function(){var $this=$(this);$this.addClass('has_focus');}).delegate('#secondary .item','mouseleave focusout',function(){var $this=$(this);$this.removeClass('has_focus');}).delegate('#secondary .item','click',function(){var $this=$(this);$this.closest('.has_focus').removeClass('has_focus');});if(!SimpleHistory.supported){return;}
var $main=$('#main');var $title=$('title');var $div=$('<div/>');var path;var load_page=function(path){$.when($.load($div,path+' #main, title'),$.addClassWait($main,'loading')).done(function(){$main.html($div.find('#main').html());$title.html($div.find('title').html());$main.addClass('unloaded').removeClass('loading').removeClass('unloaded');ga('send','pageview',path);});};$body.delegate('a[href^="/"]','click',function(event){if(event.metaKey||event.shiftKey||event.ctrlKey){return;}
event.preventDefault();path=$(event.target).attr("href");SimpleHistory.pushState(event.target.href);}).delegate('#secondary .headline a','click',function(event){event.preventDefault();if($body.is('.navopen')){$body.removeClass('navopen');}else{$body.addClass('navopen');}}).delegate('#secondary .list a','click',function(event){$body.removeClass('navopen');});SimpleHistory.start(function(path){load_page(path);});})(window,jQuery);