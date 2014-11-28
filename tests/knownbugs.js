// Tests for known bugs

QUnit.test("Random underscores in texts are not parsed as italic", function( assert ) {
    var expected = 'This text _ has some_underscores';
    assert.equal(slackdown.parse('This text _ has some_underscores'), expected, "This test always fails, known bug");
});