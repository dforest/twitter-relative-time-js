/**
 * twitter.relative.time.js Test
 * Copyright (c) 2013 Keita Mori
 * https://github.com/dforest/twitter-relative-time-js
 *
 * Released under the MIT License.
 */

 describe('Date.toTwitterRelativeTime()', function(){
  var current_date;
  var _ = {
    ms:   1,
    sec:  1000,
    min:  60000,
    hour: 3600000,
    day:  86400000
  };
  var past_date = function(ms){
    return new Date(current_date - ms);
  }
  var spy = function(){
    spyOn(window, 'Date').andReturn(current_date);
  }

  beforeEach(function(){
    current_date = new Date(1986, 7-1, 5, 3, 5, 15); //My birthday :D
  });

  it("should convert to 'now' until a second ago", function(){
    var past1 = past_date(_['ms']);
    var past2 = past_date(_['sec'] - _['ms']);
    spy();
    expect(past1.toTwitterRelativeTime()).toEqual('Now');
    expect(past2.toTwitterRelativeTime()).toEqual('Now');
  });

  it("should convert to 'Xs' until a minute ago", function(){
    var past1 = past_date(_['sec']);
    var past2 = past_date(_['min'] - _['ms']);
    spy();
    expect(past1.toTwitterRelativeTime()).toEqual('1s');
    expect(past2.toTwitterRelativeTime()).toEqual('59s');
  });

  it("should convert to 'Xm' until a hour ago", function(){
    var past1 = past_date(_['min']);
    var past2 = past_date(_['hour'] - _['ms']);
    spy();
    expect(past1.toTwitterRelativeTime()).toEqual('1m');
    expect(past2.toTwitterRelativeTime()).toEqual('59m');
  });

  it("should convert to 'Xh' until a day ago", function(){
    var past1 = past_date(_['hour']);
    var past2 = past_date(_['day'] - _['ms']);
    spy();
    expect(past1.toTwitterRelativeTime()).toEqual('1h');
    expect(past2.toTwitterRelativeTime()).toEqual('23h');
  });

  it("should convert to 'Day Month' older than 24 hours", function(){
    var past1 = past_date(_['day']);
    var past2 = past_date(_['day']*2);
    spy();
    expect(past1.toTwitterRelativeTime()).toEqual('4 July');
    expect(past2.toTwitterRelativeTime()).toEqual('3 July');
  });

    it("should convert to 'X月X日' older than 24 hours if Japanese", function(){
    var past1 = past_date(_['day']);
    var past2 = past_date(_['day']*2);
    spy();
    expect(past1.toTwitterRelativeTime('ja')).toEqual('7月4日');
    expect(past2.toTwitterRelativeTime('ja')).toEqual('7月3日');
  });

 });