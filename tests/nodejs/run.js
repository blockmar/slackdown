var slackdown = require('../../dist/slackdown.min');

// Simple test to verify that slackdown loads correctly

var expected = 'Hi <span class="slack-user">bill</span>! Please join <span class="slack-channel">general</span> and say hello.';

var actual = slackdown.parse('Hi <@U12345|bill>! Please join <#C123456|general> and say hello.');

if(actual == expected) {
    console.info("All OK! Output:", actual);
} else {
    console.error("Test failed:", actual, "!=", expected);
}