/**
 * twitter.relative.time.js 0.1.2
 * Copyright (c) 2013 Keita Mori
 * https://github.com/dforest/twitter-relative-time-js
 *
 * Includes data.extentions.js
 * Copyright (c) 2009 James F. Herdman
 * https://github.com/jherdman/javascript-relative-time-helpers
 *
 * Released under the MIT License.
 */
 Date.prototype.toTwitterRelativeTime = (function() {
  var locale = 'def';

  var _ = function(locale_key) {
    if (locale_key !== undefined && LOCALES.hasOwnProperty(locale_key)) { locale = locale_key;}
    var now = new Date();
    var delta = now - this;
    delta = Math.abs(delta);

    var unit_key = 'now';
    for (var key in CONVERSIONS) {
      if (delta < CONVERSIONS[key])
        break;
      unit_key = key;
      delta = delta / CONVERSIONS[key];
    }

    if (unit_key === 'hour' && delta/24 >= 1) {
      //older than 24 hours
      return localize(this, 'month', true);
    }

    delta = Math.floor(delta);
    return localize(delta, unit_key);

  };

  var t = function(key){
    return LOCALES[locale][key];
  };

  var localize = function(delta, unit_key){
    var unit = t(unit_key)
    if(unit_key === 'month'){
      unit = unit[delta.getMonth()];
      delta = delta.getDate();
    }else if(unit_key !== 'now'){
      unit = delta === 1 ? t(unit_key)['one'] : t(unit_key)['other'];
    }
    return unit.replace('%n', delta+"");
  };

  var CONVERSIONS = {
    now: 1,         // ms    -> ms
    second: 1000,   // ms    -> sec
    minute: 60,     // sec   -> min
    hour:   60      // min   -> hour
  };
  var LOCALES = {
    def: {
      now: 'Now',
      second: {one: '%ns', other: '%ns'},
      minute: {one: '%nm', other: '%nm'},
      hour:   {one: '%nh', other: '%nh'},
      month: ['%n Jan','%n Feb','%n Mar','%n Apr','%n May','%n June','%n July','%n Aug','%n Sept','%n Oct','%n Nov','%n Dec']
    },
    en: {
      now: 'Now',
      second: {one: '%n second ago', other: '%n seconds ago'},
      minute: {one: '%n minute ago', other: '%n minutes ago'},
      hour:   {one: '%n hour ago'  , other: '%n hours ago'},
      day: '',
      month: ['%n January','%n February','%n March','%n April','%n May','%n June','%n July','%n August','%n September','%n Octover','%n November','%n December']
    },
    ja: {
      now: '今',
      second: {one: '%n秒前', other: '%n秒前'},
      minute: {one: '%n分前', other: '%n分前'},
      hour:   {one: '%n時間前', other: '%n時間前'},
      month: ['1月%n日','2月%n日','3月%n日','4月%n日','5月%n日','6月%n日','7月%n日','8月%n日','9月%n日','10月%n日','11月%n日','12月%n日']
    }
  }

  return _;

})();
