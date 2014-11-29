"use strict";
require.config({
    paths: {
        'slackdown': '../../dist/slackdown.min',
        'QUnit': '../../bower_components/qunit/qunit/qunit',
        'text': '../../bower_components/requirejs-text/text',
        'tests': '../tests.js'
    },
    shim: {
        'QUnit': {
            exports: 'QUnit',
            init: function() {
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        }
    }
});

require(['QUnit', 'slackdown', 'text!tests'],
    function(QUnit, slackdown, tests) {

        //Loading the test as text and using eval to avoid having to write all tests twice

        eval(tests);

        QUnit.load();
        QUnit.start();
    }
);