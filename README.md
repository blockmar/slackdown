# Slackdown

Slackdown is a simple javascript parser for translating messages from the slack.com API into html.

The parser is intended to be used when you want to display messages from slack.com on an html page. The parser
can not translate message from html to slack format.

Formatting-rules are found here https://api.slack.com/docs/formatting

## Changelog

### v 0.0.1
Initial version. Support for Users, Channels, Commands and links.

## TODO

* Add support for Emojis
* Add support for bold, italic etc from here https://slack.zendesk.com/hc/en-us/articles/202288908-How-can-I-add-formatting-to-my-messages-
* Add usage examples to readme
* Add info about testing and requirements (none except for testing)
* Add support for requirejs (AMD)