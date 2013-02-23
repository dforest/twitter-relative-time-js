# twitter.relative.time.js

Convert Date to relative time the twitter display requirements with javascript

[Twitter Display Requirements](https://dev.twitter.com/terms/display-requirements)

## Usage

When using the plugin, you must first include `twitter.relative.time.js`.

```js
new Date().toTwitterRelativeTime()
//=> 7s (for 7 seconds ago)
//=> 13m (for 13 minutes ago)
//=> 19h (for 19 hours ago)
//=> 23 Jan (older than 24 hours)
```

When you want to display in Japanese, you should give the locale key `ja`.

```js
new Date().toTwitterRelativeTime('ja')
//=> 7秒前 (for 7 seconds ago)
//=> 13分前 (for 13 minutes ago)
//=> 19時間前 (for 19 hours ago)
//=> 1月23日 (older than 24 hours)
```

## LICENSE

The MIT License

Copyright (c) 2013 Keita Mori

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.