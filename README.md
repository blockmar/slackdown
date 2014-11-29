# Slackdown

Slackdown is a simple javascript parser for translating messages from the slack.com API into html.

Basic formatting like bold, italic, underscore, fixed width and slack.com ```<>``` tags are supported. See TODO for unsupported formatting.

The parser is intended to be used when you want to display messages from slack.com on an html page. The parser
can not translate message from html to slack format. The script is stand alone and does not use jQuery or any other frameworks (except for testing).

Formatting-rules are found here https://api.slack.com/docs/formatting

## Usage

### Including

#### In Browser:

```html
<script src="slackdown.min.js"></script>
```

#### With Require.js:

```javascript
define(['slackdown'], function(slackdown) {
    //Your code
});
```

#### With Node.js

```javascript
var slackdown = require('slackdown');
```

Slackdown is not published as a npm package. Include by github reference.

```json
{
  "dependencies": {
    "slackdown": "blockmar/slackdown"
  }
}
```

### Parsing text

```javascript
var html = slackdown.parse("This is a text from <http://slack.com|Slack>");
```

## Testing

Tests are runmed using [QUnit](http://qunitjs.com/). Open test/index.html in your browser. Dependencies are handled using [Bower](http://bower.io).

## Build/Distribute

The minified version of Slackdown is created by a [Grunt](http://gruntjs.com/)-task using uglify.

## TODO

* Add support for Emojis
* Add support for more styling from https://slack.zendesk.com/hc/en-us/articles/202288908-How-can-I-add-formatting-to-my-messages-
* Refactoring

## Known bugs

* None right now