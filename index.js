'use strict';

var bowerDirectory = require('bower-directory');

module.exports = function(babel) {
  var t = babel.types;

  return {
    visitor: {
      ImportDeclaration: function(path) {
      }
    }
  };
};
