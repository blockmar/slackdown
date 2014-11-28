QUnit.test("Plain text is unchanged", function( assert ) {
    var expected = "The quick brown fox jumps over the lazy dog";
    assert.ok(slackdown.parse('The quick brown fox jumps over the lazy dog') == expected);
});

QUnit.test("Users are parsed", function( assert ) {
    var expected = 'Hello <span class="slack_user">bill</span>!';
    assert.ok(slackdown.parse('Hello <@U123456|bill>!') == expected);
});

QUnit.test("Channels are parsed", function( assert ) {
    var expected = 'Please join <span class="slack_channel">general</span> and say hello.';
    assert.ok(slackdown.parse('Please join <#C123456|general> and say hello.') == expected);
});

QUnit.test("Commands are parsed", function( assert ) {
    var expected = 'The command is <span class="slack_cmd">join</span>';
    assert.ok(slackdown.parse('The command is <!join>') == expected );
});

QUnit.test("Multiple tags are parsed", function( assert ) {
    var expected = 'Hi <span class="slack_user">bill</span>! Please join <span class="slack_channel">general</span> and say hello.';
    assert.ok(slackdown.parse('Hi <@U12345|bill>! Please join <#C123456|general> and say hello.') == expected );
});

QUnit.test("Links with text are parsed", function( assert ) {
    var expected = 'Click <a href="http://slack.com/">here</a>';
    assert.ok(slackdown.parse('Click <http://slack.com/|here>') == expected );
});

QUnit.test("Links with NO text are parsed", function( assert ) {
    var expected = 'Click <a href="http://slack.com/">http://slack.com/</a>';
    assert.ok(slackdown.parse('Click <http://slack.com/>') == expected );
});

QUnit.test("Bold texts are parsed", function( assert ) {
    var expected = 'The third <strong>word</strong> is bold';
    assert.ok(slackdown.parse('The third *word* is bold') == expected );
});