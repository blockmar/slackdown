window.slackdown = (function () {

    var COMMAND = "!",
        CHANNEL = "#",
        USER = "@";

    var tagRegexp = /<(.*?)>/g;

    var cmdPayload = function(tag) {
        var length = tag.length;
        return tag.substr(2, length - 3);
    };

    var channelUserPayloads = function(tag) {
        var length = tag.length;
        return pipeSplit(tag.substr(3, length - 4));
    };

    var pipeSplit = function(payload) {
        return payload.split('|');
    };

    var tagClass = function(tag, css, payload) {
        return "<" + tag + ' class="' + css + '">' + payload + "</" + tag + ">";
    };

    var aHref = function(match) {
        var length = match.length,
            p = pipeSplit(match.substr(1, length - 2));
        return '<a href="' + p[0] + '">' + (p.length == 1 ? p[0] : p[1]) + '</a>';
    };

    var slackdown = {
        parse: function (text) {

            var matches = text.match(tagRegexp);

            if(matches) {
                for(var i = 0; i < matches.length; i++) {
                    var replace,
                        match = matches[i],
                        action = match.substr(1,1);

                    switch(action) {
                        case COMMAND:
                            replace = tagClass("span", "slack_cmd", cmdPayload(match));
                            break;
                        case CHANNEL:
                            var p = channelUserPayloads(match);
                            replace = tagClass("span", "slack_channel", (p.length == 1 ? p[0] : p[1]));
                            break;
                        case USER:
                            var p = channelUserPayloads(match);
                            replace = tagClass("span", "slack_user", (p.length == 1 ? p[0] : p[1]));
                            break;
                        default:
                            replace = aHref(match);
                    }

                    if(replace) {
                        text = text.replace(match, replace);
                    }
                }
            }

            return text;
        }
    };

    return slackdown;
}());