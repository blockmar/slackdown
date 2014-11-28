window.slackdown = (function () {

    var COMMAND = "!",
        CHANNEL = "#",
        USER = "@";

    var payloads = function(tag, start) {
        if(!start) {
            start = 0;
        }
        var length = tag.length;
        return pipeSplit(tag.substr(start, length - start));
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
        var action = match[1].substr(0,1),
            p;

        switch(action) {
            case COMMAND:
                return tag("span", { class: "slack-cmd" }, payloads(match[1], 1)[0]);
            case CHANNEL:
                p = payloads(match[1], 2);
                return tag("span", { class: "slack-channel"}, (p.length == 1 ? p[0] : p[1]));
            case USER:
                p = payloads(match[1], 2);
                return tag("span", { class: "slack-user" }, (p.length == 1 ? p[0] : p[1]));
            default:
                p = payloads(match[1]);
                return tag("a", { href: p[0] }, (p.length == 1 ? p[0] : p[1]));
        }
    };

    var matchBold = function(match) {
        return safeMatch(match, tag("strong", payloads(match[1])));
    };

    var matchItalic = function(match) {
        return safeMatch(match, tag("em", payloads(match[1])));
    };

    var matchFixed = function(match) {
        return safeMatch(match, tag("code", payloads(match[1])));
    };

    var isWhiteSpace = function(input) {
        return /^\s?$/.test(input);
    };

    var safeMatch = function(match, tag) {
        var prefix_ok = match.index == 0;
        var postfix_ok = match.index == match.input.length - match[0].length;

        if(!prefix_ok) {
            var charAtLeft = match.input.substr(match.index - 1, 1);
            prefix_ok = isWhiteSpace(charAtLeft);
        }

        if(!postfix_ok) {
            var charAtRight = match.input.substr(match.index + match[0].length, 1);
            postfix_ok = isWhiteSpace(charAtRight);
        }

        if(prefix_ok && postfix_ok) {
            return tag;
        }
        return false;
    };

    var publicParse = function (text) {

        var patterns = [
            { p: /<(.*?)>/g, cb: matchTag },
            { p: /\*([^\*]*?)\*/g, cb: matchBold },
            { p: /_([^_]*?)_/g, cb: matchItalic },
            { p: /`([^`]*?)`/g, cb: matchFixed }
        ];

        for(var p = 0; p < patterns.length; p++) {

            var pattern = patterns[p],
                original = text,
                result;

            while ((result = pattern.p.exec(original)) !== null) {
                var replace = pattern.cb(result);

                if (replace) {
                    text = text.replace(result[0], replace);
                }
            }
        }

        return text;
    };

    return {
        parse: publicParse
    };
}());