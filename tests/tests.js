QUnit.test("Plain text is unchanged", function( assert ) {
    var expected = "The quick brown fox jumps over the lazy dog";
    assert.equal(slackdown.parse('The quick brown fox jumps over the lazy dog'), expected);
});

QUnit.test("Users are parsed", function( assert ) {
    var expected = 'Hello <span class="slack-user">bill</span>!';
    assert.equal(slackdown.parse('Hello <@U123456|bill>!'), expected);
});

QUnit.test("Channels are parsed", function( assert ) {
    var expected = 'Please join <span class="slack-channel">general</span> and say hello.';
    assert.equal(slackdown.parse('Please join <#C123456|general> and say hello.'), expected);
});

QUnit.test("Commands are parsed", function( assert ) {
    var expected = 'The command is <span class="slack-cmd">join</span>';
    assert.equal(slackdown.parse('The command is <!join>'), expected );
});

QUnit.test("Multiple tags are parsed", function( assert ) {
    var expected = 'Hi <span class="slack-user">bill</span>! Please join <span class="slack-channel">general</span> and say hello.';
    assert.equal(slackdown.parse('Hi <@U12345|bill>! Please join <#C123456|general> and say hello.'), expected );
});

QUnit.test("Links with text are parsed", function( assert ) {
    var expected = 'Click <a href="http://slack.com/">here</a>';
    assert.equal(slackdown.parse('Click <http://slack.com/|here>'), expected );
});

QUnit.test("Links with NO text are parsed", function( assert ) {
    var expected = 'Click <a href="http://slack.com/">http://slack.com/</a>';
    assert.equal(slackdown.parse('Click <http://slack.com/>'), expected );
});

QUnit.test("Bold texts are parsed", function( assert ) {
    var expected = 'The third <strong>word</strong> is bold';
    assert.equal(slackdown.parse('The third *word* is bold'), expected );
});

QUnit.test("Italic texts are parsed", function( assert ) {
    var expected = 'Surround text with <em>underscores</em> for italics';
    assert.equal(slackdown.parse('Surround text with _underscores_ for italics'), expected);
});

QUnit.test("Inline texts are parsed", function( assert ) {
    var expected = 'Surround text with <code>single backticks</code> for inline fixed-width text';
    assert.equal(slackdown.parse('Surround text with `single backticks` for inline fixed-width text'), expected);
});

QUnit.test("Multiline texts are parsed", function( assert ) {
    var expected = 'Surround text with <pre>triple backticks</pre> for multiline text';
    assert.equal(slackdown.parse('Surround text with ```triple backticks``` for multiline text'), expected);
});

QUnit.test("Styling in start and end of texts are parsed", function( assert ) {
    assert.equal(slackdown.parse('_underscores_ for italics'), '<em>underscores</em> for italics');
    assert.equal(slackdown.parse('underscores for _italics_'), 'underscores for <em>italics</em>');
    assert.equal(slackdown.parse('asterisks for *bold*'), 'asterisks for <strong>bold</strong>');
    assert.equal(slackdown.parse('*asterisks* for bold'), '<strong>asterisks</strong> for bold');
});

QUnit.test("Styling before punctuation are correctly parsed", function( assert ) {
    assert.equal(slackdown.parse('Hey *John*, how are you?'), 'Hey <strong>John</strong>, how are you?');
    assert.equal(slackdown.parse('Hey _John_, how are you?'), 'Hey <em>John</em>, how are you?');
    assert.equal(slackdown.parse('Hey <@U12345|John>, how are you?'), 'Hey <span class=\"slack-user\">John</span>, how are you?');
});

QUnit.test("Text with duplicated styling are not parsed", function( assert ) {
    assert.equal(slackdown.parse('Hey **John**, how are you?'), 'Hey **John**, how are you?');
    assert.equal(slackdown.parse('Hey __John__, how are you?'), 'Hey __John__, how are you?');
});

QUnit.test("Random underscores in texts are not parsed as italic", function( assert ) {
    var expected = 'This text _ has some_underscores';
    assert.equal(slackdown.parse('This text _ has some_underscores'), expected);
});

QUnit.test("Method names with underscore are not parsed", function( assert ) {
    var expected = 'was created for method __48-[BIViewController _setupBasicViewModelBindings]_block_invoke123.';
    assert.equal(slackdown.parse('was created for method __48-[BIViewController _setupBasicViewModelBindings]_block_invoke123.'), expected);
});

QUnit.test("If input is not a String return it unchanged", function( assert ) {
    var json = { one: "one", two: { three: 3, four: 4 }};
    assert.deepEqual(slackdown.parse(json), json);
    assert.equal(slackdown.parse(null), null);
});