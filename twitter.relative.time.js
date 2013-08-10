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

    var units = t('now');
    for (var key in CONVERSIONS) {
      if (delta < CONVERSIONS[key])
        break;
      units = t(key);
      delta = delta / CONVERSIONS[key];
    }

    if (units === t('hour') && delta/24 >= 1) {
      //older than 24 hours
      return localize(this);
    }

    delta = Math.floor(delta);
    if (units === t('now')) { delta = ''; }
    else if (delta !== 1) { units += t('prural'); }
    return [delta, units, this < now ? t('ago') : ''].join(t('spacing'));

  };

  var t = function(key){
    return LOCALES[locale][key];
  };

  var localize = function(date){
    if(locale === 'ja'){
      return [t('month')[date.getMonth()], date.getDate(), t('day')].join('');
    }
    return [date.getDate(), t('month')[date.getMonth()]].join(' ');
  };

  var CONVERSIONS = {
    now: 1,         // ms    -> ms
    second: 1000,   // ms    -> sec
    minute: 60,     // sec   -> min
    hour:   60      // min   -> hour
  };
  var LOCALES = {
    def: {
      prural: '',
      spacing: '',
      ago: '',
      now: 'Now',
      second: 's',
      minute: 'm',
      hour:   'h',
      day: '',
      month: ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec']
    },
    en: {
      prural: 's',
      spacing: ' ',
      ago: 'ago',
      now: 'Now',
      second: 'second',
      minute: 'minute',
      hour:   'hour',
      day: '',
      month: ['January','February','March','April','May','June','July','August','September','Octover','November','December']
    },
    ja: {
      prural: '',
      spacing: '',
      ago: '前',
      now: '今',
      second: '秒',
      minute: '分',
      hour:   '時間',
      day: '日',
      month: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    }
  }

  return _;

})();
