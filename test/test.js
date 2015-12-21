'use strict';

var assert = require('assert');
var babel = require('babel-core');
var plugin = require('../index');

module.exports = {
  testBowerImport: function(test) {
    var code = 'import foo from "bower:bar/src/foo";';
    var result = babel.transform(code, {plugins: [plugin]});

    var expected = 'import foo from "/path/to/bower/bar/src/foo";';
    assert.strictEqual(expected, result.code);
    assert.strictEqual('/path/to/bower/bar/src/foo', result.metadata.modules.imports[0].source);
    test.done();
  },

  testNotBowerImport: function(test) {
    var code = 'import foo from "../bar/src/foo";';
    var result = babel.transform(code, {plugins: [plugin]});

    var expected = 'import foo from "../bar/src/foo";';
    assert.strictEqual(expected, result.code);
    assert.strictEqual('../bar/src/foo', result.metadata.modules.imports[0].source);
    test.done();
  },

  testBowerExport: function(test) {
    var code = 'export * from "bower:bar/src/foo";';
    var result = babel.transform(code, {plugins: [plugin]});

    var expected = 'export * from "/path/to/bower/bar/src/foo";';
    assert.strictEqual(expected, result.code);
    assert.strictEqual('/path/to/bower/bar/src/foo', result.metadata.modules.exports.specifiers[0].source);
    test.done();
  },

  testNotBowerExport: function(test) {
    var code = 'export * from "../bar/src/foo";';
    var result = babel.transform(code, {plugins: [plugin]});

    var expected = 'export * from "../bar/src/foo";';
    assert.strictEqual(expected, result.code);
    assert.strictEqual('../bar/src/foo', result.metadata.modules.exports.specifiers[0].source);
    test.done();
  },

  testNoSourceExport: function(test) {
    var code = 'export default foo;';
    var result = babel.transform(code, {plugins: [plugin]});

    var expected = 'export default foo;';
    assert.strictEqual(expected, result.code);
    test.done();
  }
};
