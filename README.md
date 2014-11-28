# Slackdown

Slackdown is a simple javascript parser for translating messages from the slack.com API into html.

The parser is intended to be used when you want to display messages from slack.com on an html page. The parser
can not translate message from html to slack format. The script is stand alone and does not use jQuery or any other frameworks when distributed.

Formatting-rules are found here https://api.slack.com/docs/formatting

## Usage

### In browser

Including:

```html
<script src="stockdown.min.js"></script>
```

Parsing text:

```javascript
var html = slackdown.parse("This is a text from <http://slack.com|Slack>");
```

## Testing

Tests are runmed using [QUnit](http://qunitjs.com/). Open test/index.html in your browser. Dependencies are handled using [Bower](http://bower.io).

## Build/Distribute

The minified version of Slackdown is created by a [Grunt](http://gruntjs.com/)-task using uglify.

## Changelog

### v 0.0.2
Support for bold, italic and fixed width.

### v 0.0.1
Initial version. Support for Users, Channels, Commands and links.

## TODO

* Add support for Emojis
* Add support for -bold-, -italic- etc from here https://slack.zendesk.com/hc/en-us/articles/202288908-How-can-I-add-formatting-to-my-messages-
* Add better usage examples to readme
* Add support for requirejs (AMD)
* Support nodejs

## Known bugs

* If the text includes underscores/asterisks not a part of styling the output get unexpected italic/bold.