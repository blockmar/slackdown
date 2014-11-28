window.slackdown = (function () {

    var COMMAND = "!",
        CHANNEL = "#",
        USER = "@";

    var payloads = function(tag, start) {
        var length = tag.length;
        return pipeSplit(tag.substr(start, length - (start + 1)));
    };

    var pipeSplit = function(payload) {
        return payload.split('|');
    };

    var tag = function(tag, attributes, payload) {
        if(!payload) {
            payload = attributes;
            attributes = {};
        }

        var html = "<".concat(tag);
        for (var attribute in attributes) {
            if (attributes.hasOwnProperty(attribute)) {
                html = html.concat(' ', attribute, '="', attributes[attribute], '"');
            }
        }
        return html.concat('>', payload, '</', tag, '>');
    };

    var matchTag = function(match) {
        var action = match.substr(1,1),
            p;

        switch(action) {
            case COMMAND:
                return tag("span", { class: "slack_cmd" }, payloads(match, 2)[0]);
            case CHANNEL:
                p = payloads(match, 3);
                return tag("span", { class: "slack_channel"}, (p.length == 1 ? p[0] : p[1]));
            case USER:
                p = payloads(match, 3);
                return tag("span", { class: "slack_user" }, (p.length == 1 ? p[0] : p[1]));
            default:
                p = payloads(match, 1);
                return tag("a", { href: p[0] }, (p.length == 1 ? p[0] : p[1]));
        }
    };

    var matchBold = function(match) {
        return tag("strong", payloads(match, 1));
    };

    var publicParse = function (text) {

        var patterns = [
            { p: /<(.*?)>/g, cb: matchTag },
            { p: /\*(.*?)\*/g, cb: matchBold }
        ];

        for(var p = 0; p < patterns.length; p++) {

            var pattern = patterns[p];
            var matches = text.match(pattern.p);

            if(matches) {
                for (var i = 0; i < matches.length; i++) {
                    var match = matches[i],
                        replace = pattern.cb(match);

                    if (replace) {
                        text = text.replace(match, replace);
                    }
                }
            }
        }

        return text;
    };

    return {
        parse: publicParse
    };
}());