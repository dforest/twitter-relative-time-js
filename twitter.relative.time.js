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
    return localize(delta, unit_key, this < now);

  };

  var t = function(key){
    return LOCALES[locale][key];
  };

  var localize = function(delta, unit_key, is_past){
    if(unit_key === 'month'){

      if(locale === 'ja'){
        return [t('month')[delta.getMonth()], delta.getDate(), t('day')].join('');
      }
      return [delta.getDate(), t('month')[delta.getMonth()]].join(' ');

    }else if (unit_key === 'now'){

      return t(unit_key);

    }else{

      var unit = delta === 1 ? t(unit_key)['one'] : t(unit_key)['other'];
      return [delta, unit, is_past ? t('ago') : ''].join(t('spacing'));

    }
  };

  var CONVERSIONS = {
    now: 1,         // ms    -> ms
    second: 1000,   // ms    -> sec
    minute: 60,     // sec   -> min
    hour:   60      // min   -> hour
  };
  var LOCALES = {
    def: {
      spacing: '',
      ago: '',
      now: 'Now',
      second: {one: 's', other: 's'},
      minute: {one: 'm', other: 'm'},
      hour:   {one: 'h', other: 'h'},
      day: '',
      month: ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec']
    },
    en: {
      spacing: ' ',
      ago: 'ago',
      now: 'Now',
      second: {one: 'second', other: 'seconds'},
      minute: {one: 'minute', other: 'minutes'},
      hour:   {one: 'hour'  , other: 'hours'},
      day: '',
      month: ['January','February','March','April','May','June','July','August','September','Octover','November','December']
    },
    ja: {
      spacing: '',
      ago: '前',
      now: '今',
      second: {one: '秒', other: '秒'},
      minute: {one: '分', other: '分'},
      hour:   {one: '時間', other: '時間'},
      day: '日',
      month: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    }
  }

  return _;

})();
