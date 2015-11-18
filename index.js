'use strict';

var bowerDirectory = require('bower-directory');
var path = require('path');

module.exports = function() {
  var bowerDirCache;

  function getBowerDir() {
    if (!bowerDirCache) {
      bowerDirCache = bowerDirectory.sync();
    }
    return bowerDirCache;
  }

  function renameAlias(source) {
    if (source.substr(0, 6) === 'bower:') {
      source = path.join(getBowerDir(), source.substr(6));
    }
    return source.replace(/\\/g, '/');
  }

  return {
    visitor: {
      ModuleDeclaration: {
        enter: function(path) {
          if (path.node.source) {
            path.node.source.value = renameAlias(path.node.source.value);
          }
        }
      }
    }
  };
};
